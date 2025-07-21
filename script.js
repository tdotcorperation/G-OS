document.addEventListener('DOMContentLoaded', () => {
    const desktop = document.getElementById('desktop');
    const taskbarItems = document.getElementById('taskbar-items');
    const clock = document.getElementById('clock');

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

    // Desktop Icons
    const icons = [
        { id: 'my-computer', name: '내 컴퓨터', icon: 'https://img.icons8.com/ios-filled/50/000000/computer.png', content: '<h2>내 컴퓨터</h2><p>여기에 시스템 정보가 표시됩니다.</p>' },
        { id: 'recycle-bin', name: '휴지통', icon: 'https://img.icons8.com/ios-filled/50/000000/trash.png', content: '<h2>휴지통</h2><p>삭제된 파일이 여기에 표시됩니다.</p>' },
        { id: 'notepad', name: '메모장', icon: 'https://img.icons8.com/ios-filled/50/000000/notepad.png', content: '<h2>메모장</h2><textarea style="width:100%; height:calc(100% - 30px); resize:none;"></textarea>' }
    ];

    icons.forEach(iconData => {
        const iconElement = document.createElement('div');
        iconElement.className = 'desktop-icon';
        iconElement.id = `icon-${iconData.id}`;
        iconElement.innerHTML = `<img src="${iconData.icon}" alt="${iconData.name}"><span>${iconData.name}</span>`;
        iconElement.style.left = `${Math.random() * (window.innerWidth - 100)}px`; // Random position
        iconElement.style.top = `${Math.random() * (window.innerHeight - 150)}px`; // Random position
        desktop.appendChild(iconElement);

        iconElement.addEventListener('dblclick', () => openWindow(iconData));
    });

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

        // Drag functionality
        let isDragging = false;
        let offsetX, offsetY;

        titlebar.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - windowElement.getBoundingClientRect().left;
            offsetY = e.clientY - windowElement.getBoundingClientRect().top;
            titlebar.style.cursor = 'grabbing';
            focusWindow(windowElement);
        });

        desktop.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            windowElement.style.left = `${e.clientX - offsetX}px`;
            windowElement.style.top = `${e.clientY - offsetY}px`;
        });

        desktop.addEventListener('mouseup', () => {
            isDragging = false;
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
        }

        windowElement.addEventListener('mousedown', () => focusWindow(windowElement));
    }
});
