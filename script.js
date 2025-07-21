document.addEventListener('DOMContentLoaded', () => {
    const desktop = document.getElementById('desktop');
    const taskbarItems = document.getElementById('taskbar-items');
    const clock = document.getElementById('clock');
    const startButton = document.getElementById('start-button');
    const startMenu = document.getElementById('start-menu');
    const startMenuApps = document.querySelector('#start-menu .start-menu-apps');

    let zIndexCounter = 100;
    let activeWindow = null;

    // Clock functionality
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        clock.textContent = `${hours}:${minutes}:${seconds}`;
    }
    setInterval(updateClock, 1000);
    updateClock(); // Initial call

    // Start Button and Menu
    startButton.addEventListener('click', () => {
        startMenu.classList.toggle('show');
    });

    desktop.addEventListener('click', (e) => {
        if (!startMenu.contains(e.target) && e.target !== startButton) {
            startMenu.classList.remove('show');
        }
    });

    // App Data (including new apps and App Store)
    const apps = [
        { id: 'my-computer', name: '내 컴퓨터', icon: 'https://img.icons8.com/ios-filled/50/000000/computer.png', content: '<h2>내 컴퓨터</h2><p>여기에 시스템 정보가 표시됩니다.</p>' },
        { id: 'recycle-bin', name: '휴지통', icon: 'https://img.icons8.com/ios-filled/50/000000/trash.png', content: '<h2>휴지통</h2><p>삭제된 파일이 여기에 표시됩니다.</p>' },
        { id: 'notepad', name: '메모장', icon: 'https://img.icons8.com/ios-filled/50/000000/notepad.png', content: '<h2>메모장</h2><textarea style="width:100%; height:calc(100% - 30px); resize:none;"></textarea>' },
        { id: 'browser', name: '브라우저', icon: 'https://img.icons8.com/ios-filled/50/000000/internet.png', content: '<h2>브라우저</h2><iframe src="https://www.google.com" style="width:100%; height:calc(100% - 30px); border:none;"></iframe>' },
        { id: 'calculator', name: '계산기', icon: 'https://img.icons8.com/ios-filled/50/000000/calculator.png', content: '<h2>계산기</h2><p>간단한 계산기 기능이 여기에 구현됩니다.</p>' },
        { id: 'settings', name: '설정', icon: 'https://img.icons8.com/ios-filled/50/000000/settings.png', content: '<h2>설정</h2><p>시스템 설정을 변경할 수 있습니다.</p>' }
    ];

    const installedApps = new Set(apps.map(app => app.id)); // Initially all defined apps are installed

    // App Store App Data
    const appStoreApp = {
        id: 'app-store', 
        name: '앱 스토어', 
        icon: 'https://img.icons8.com/ios-filled/50/000000/shopping-bag.png',
        content: `
            <h2>앱 스토어</h2>
            <div id="app-list"></div>
        `
    };
    // Add App Store to desktop icons and installed apps
    apps.push(appStoreApp);
    installedApps.add(appStoreApp.id);

    // Render Desktop Icons
    function renderDesktopIcons() {
        desktop.innerHTML = ''; // Clear existing icons
        apps.filter(app => installedApps.has(app.id)).forEach(appData => {
            const iconElement = document.createElement('div');
            iconElement.className = 'desktop-icon';
            iconElement.id = `icon-${appData.id}`;
            iconElement.innerHTML = `<img src="${appData.icon}" alt="${appData.name}"><span>${appData.name}</span>`;
            // Use stored positions if available, otherwise random
            const storedPos = localStorage.getItem(`icon-${appData.id}-pos`);
            if (storedPos) {
                const pos = JSON.parse(storedPos);
                iconElement.style.left = `${pos.left}px`;
                iconElement.style.top = `${pos.top}px`;
            } else {
                iconElement.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
                iconElement.style.top = `${Math.random() * (window.innerHeight - 150)}px`;
            }
            desktop.appendChild(iconElement);

            iconElement.addEventListener('dblclick', () => openWindow(appData));

            // Make icons draggable
            let isDraggingIcon = false;
            let currentIcon = null;
            let initialX, initialY, currentX, currentY, xOffset, yOffset;

            iconElement.addEventListener('mousedown', (e) => {
                if (e.button === 0) { // Left click
                    isDraggingIcon = true;
                    currentIcon = iconElement;
                    initialX = e.clientX;
                    initialY = e.clientY;
                    xOffset = iconElement.offsetLeft;
                    yOffset = iconElement.offsetTop;
                    currentIcon.classList.add('dragging');
                }
            });

            desktop.addEventListener('mousemove', (e) => {
                if (isDraggingIcon && currentIcon) {
                    e.preventDefault();
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;

                    currentIcon.style.left = `${xOffset + currentX}px`;
                    currentIcon.style.top = `${yOffset + currentY}px`;
                }
            });

            desktop.addEventListener('mouseup', () => {
                if (isDraggingIcon && currentIcon) {
                    isDraggingIcon = false;
                    currentIcon.classList.remove('dragging');
                    // Save position to localStorage
                    localStorage.setItem(`icon-${currentIcon.id}-pos`, JSON.stringify({
                        left: currentIcon.offsetLeft,
                        top: currentIcon.offsetTop
                    }));
                    currentIcon = null;
                }
            });
        });
    }

    // Render Start Menu Apps
    function renderStartMenuApps() {
        startMenuApps.innerHTML = '';
        apps.filter(app => installedApps.has(app.id)).forEach(appData => {
            const appItem = document.createElement('div');
            appItem.className = 'start-menu-app-item';
            appItem.innerHTML = `<img src="${appData.icon}" alt="${appData.name}"><span>${appData.name}</span>`;
            appItem.addEventListener('click', () => {
                openWindow(appData);
                startMenu.classList.remove('show');
            });
            startMenuApps.appendChild(appItem);
        });
    }

    // Render App Store Content
    function renderAppStoreContent(windowElement) {
        const appListDiv = windowElement.querySelector('#app-list');
        if (!appListDiv) return;

        appListDiv.innerHTML = '';
        apps.forEach(appData => {
            if (appData.id === 'app-store') return; // Don't list App Store in itself

            const appItem = document.createElement('div');
            appItem.className = 'app-store-item';
            appItem.style.display = 'flex';
            appItem.style.alignItems = 'center';
            appItem.style.padding = '10px';
            appItem.style.borderBottom = '1px solid #eee';
            appItem.style.marginBottom = '5px';

            appItem.innerHTML = `
                <img src="${appData.icon}" alt="${appData.name}" style="width:32px; height:32px; margin-right:10px;">
                <div style="flex-grow:1;">
                    <div style="font-weight:bold;">${appData.name}</div>
                    <div style="font-size:0.9em; color:#666;">${appData.id}</div>
                </div>
                <button class="app-install-button" data-app-id="${appData.id}">${installedApps.has(appData.id) ? '설치됨' : '설치'}</button>
            `;
            appListDiv.appendChild(appItem);
        });

        appListDiv.querySelectorAll('.app-install-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const appId = e.target.dataset.appId;
                if (installedApps.has(appId)) {
                    // Uninstall (for demonstration, just remove from desktop/start menu)
                    installedApps.delete(appId);
                    e.target.textContent = '설치';
                } else {
                    // Install
                    installedApps.add(appId);
                    e.target.textContent = '설치됨';
                }
                renderDesktopIcons();
                renderStartMenuApps();
            });
        });
    }

    // Window Management
    function openWindow(appData) {
        // Prevent opening multiple instances of the same app for simplicity
        if (document.getElementById(`window-${appData.id}`)) {
            const existingWindow = document.getElementById(`window-${appData.id}`);
            focusWindow(existingWindow);
            return;
        }

        const windowElement = document.createElement('div');
        windowElement.className = 'window';
        windowElement.id = `window-${appData.id}`;
        windowElement.style.width = '600px';
        windowElement.style.height = '400px';
        windowElement.style.left = `${(window.innerWidth - 600) / 2}px`;
        windowElement.style.top = `${(window.innerHeight - 400) / 2}px`;
        windowElement.style.zIndex = ++zIndexCounter;

        windowElement.innerHTML = `
            <div class="window-titlebar">
                <span>${appData.name}</span>
                <div class="window-buttons">
                    <div class="window-button minimize">—</div>
                    <div class="window-button maximize">□</div>
                    <div class="window-button close">✕</div>
                </div>
            </div>
            <div class="window-content">${appData.content}</div>
        `;
        desktop.appendChild(windowElement);

        const titlebar = windowElement.querySelector('.window-titlebar');
        const minimizeButton = windowElement.querySelector('.minimize');
        const maximizeButton = windowElement.querySelector('.maximize');
        const closeButton = windowElement.querySelector('.close');

        // Taskbar item
        const taskbarItem = document.createElement('div');
        taskbarItem.className = 'taskbar-item';
        taskbarItem.id = `taskbar-item-${appData.id}`;
        taskbarItem.textContent = appData.name;
        taskbarItems.appendChild(taskbarItem);

        taskbarItem.addEventListener('click', () => {
            if (windowElement.style.display === 'none') {
                windowElement.style.display = 'flex';
                focusWindow(windowElement);
            } else if (activeWindow === windowElement) {
                windowElement.style.display = 'none'; // Minimize
                taskbarItem.classList.remove('active');
                activeWindow = null;
            } else {
                focusWindow(windowElement);
            }
        });

        focusWindow(windowElement);

        // Drag functionality for windows
        let isDraggingWindow = false;
        let windowOffsetX, windowOffsetY;

        titlebar.addEventListener('mousedown', (e) => {
            if (e.button === 0) { // Left click
                isDraggingWindow = true;
                windowOffsetX = e.clientX - windowElement.getBoundingClientRect().left;
                windowOffsetY = e.clientY - windowElement.getBoundingClientRect().top;
                titlebar.style.cursor = 'grabbing';
                focusWindow(windowElement);
            }
        });

        desktop.addEventListener('mousemove', (e) => {
            if (!isDraggingWindow) return;
            windowElement.style.left = `${e.clientX - windowOffsetX}px`;
            windowElement.style.top = `${e.clientY - windowOffsetY}px`;
        });

        desktop.addEventListener('mouseup', () => {
            isDraggingWindow = false;
            titlebar.style.cursor = 'grab';
        });

        // Window buttons
        minimizeButton.addEventListener('click', () => {
            windowElement.style.display = 'none';
            taskbarItem.classList.remove('active');
            activeWindow = null;
        });

        let isMaximized = false;
        let originalWidth, originalHeight, originalLeft, originalTop;

        maximizeButton.addEventListener('click', () => {
            if (!isMaximized) {
                originalWidth = windowElement.style.width;
                originalHeight = windowElement.style.height;
                originalLeft = windowElement.style.left;
                originalTop = windowElement.style.top;

                windowElement.style.width = '100vw';
                windowElement.style.height = 'calc(100vh - 40px)';
                windowElement.style.left = '0';
                windowElement.style.top = '0';
                windowElement.style.borderRadius = '0';
                windowElement.style.resize = 'none';
                isMaximized = true;
            } else {
                windowElement.style.width = originalWidth;
                windowElement.style.height = originalHeight;
                windowElement.style.left = originalLeft;
                windowElement.style.top = originalTop;
                windowElement.style.borderRadius = '5px';
                windowElement.style.resize = 'both';
                isMaximized = false;
            }
        });

        closeButton.addEventListener('click', () => {
            windowElement.remove();
            taskbarItem.remove();
            if (activeWindow === windowElement) {
                activeWindow = null;
            }
        });

        function focusWindow(targetWindow) {
            if (activeWindow) {
                activeWindow.querySelector('.window-titlebar').classList.remove('active');
                document.getElementById(`taskbar-item-${activeWindow.id.replace('window-', '')}`).classList.remove('active');
            }
            targetWindow.style.zIndex = ++zIndexCounter;
            targetWindow.querySelector('.window-titlebar').classList.add('active');
            document.getElementById(`taskbar-item-${targetWindow.id.replace('window-', '')}`).classList.add('active');
            activeWindow = targetWindow;

            // If App Store, render its content
            if (appData.id === 'app-store') {
                renderAppStoreContent(windowElement);
            }
        }

        windowElement.addEventListener('mousedown', () => focusWindow(windowElement));
    }

    // Initial rendering
    renderDesktopIcons();
    renderStartMenuApps();
});
