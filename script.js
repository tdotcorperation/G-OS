const apps = [
    { id: 'my-computer', name: '내 컴퓨터', icon: 'https://img.icons8.com/ios-filled/50/000000/computer.png', content: '<h2>내 컴퓨터</h2><p>여기에 시스템 정보가 표시됩니다.</p>', preInstalled: true },
    { id: 'recycle-bin', name: '휴지통', icon: 'https://img.icons8.com/ios-filled/50/000000/trash.png', content: '<h2>휴지통</h2><p>삭제된 파일이 여기에 표시됩니다.</p>', preInstalled: true },
    { id: 'notepad', name: '메모장', icon: 'https://img.icons8.com/ios-filled/50/000000/notepad.png', content: '<h2>메모장</h2><textarea id="notepad-textarea" style="width:100%; height:calc(100% - 60px); resize:none;"></textarea><button id="notepad-save-button" style="margin-top:10px;">저장</button>', preInstalled: true },
    { id: 'browser', name: '브라우저', icon: 'https://img.icons8.com/ios-filled/50/000000/internet.png', content: '<h2>브라우저</h2><div style="display:flex; margin-bottom:10px;"><input type="text" id="browser-url-input" placeholder="URL 또는 검색어 입력" style="flex-grow:1; padding:5px;"><button id="browser-go-button" style="margin-left:5px;">이동</button></div><iframe id="browser-iframe" src="about:blank" style="width:100%; height:calc(100% - 60px); border:none;"></iframe>', preInstalled: true },
    { id: 'calculator', name: '계산기', icon: 'https://img.icons8.com/ios-filled/50/000000/calculator.png', content: '<h2>계산기</h2><div id="calculator-app"></div>', preInstalled: true },
    { id: 'settings', name: '설정', icon: 'https://img.icons8.com/ios-filled/50/000000/settings.png', content: '<h2>설정</h2><div id="settings-app"></div>', preInstalled: true },
    { id: 'files', name: '파일', icon: 'https://img.icons8.com/ios-filled/50/000000/folder.png', content: '<h2>파일</h2><div id="files-list"></div>', preInstalled: true },
    { id: 'camera', name: '카메라', icon: 'https://img.icons8.com/ios-filled/50/000000/camera.png', content: '<h2>카메라</h2><p>카메라 기능이 여기에 구현됩니다.</p>', preInstalled: false },
    { id: 'photos', name: '사진', icon: 'https://img.icons8.com/ios-filled/50/000000/image.png', content: '<h2>사진</h2><p>사진 갤러리가 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'music', name: '음악', icon: 'https://img.icons8.com/ios-filled/50/000000/music.png', content: '<h2>음악</h2><p>음악 플레이어가 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'video', name: '비디오', icon: 'https://img.icons8.com/ios-filled/50/000000/video.png', content: '<h2>비디오</h2><p>비디오 플레이어가 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'calendar', name: '달력', icon: 'https://img.icons8.com/ios-filled/50/000000/calendar.png', content: '<h2>달력</h2><p>달력 앱이 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'mail', name: '메일', icon: 'https://img.icons8.com/ios-filled/50/000000/mail.png', content: '<h2>메일</h2><p>메일 클라이언트가 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'maps', name: '지도', icon: 'https://img.icons8.com/ios-filled/50/000000/map.png', content: '<h2>지도</h2><p>지도 앱이 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'weather', name: '날씨', icon: 'https://img.icons8.com/ios-filled/50/000000/partly-cloudy-day.png', content: '<h2>날씨</h2><p>날씨 정보가 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'store', name: 'Microsoft Store', icon: 'https://img.icons8.com/ios-filled/50/000000/microsoft-store.png', content: '<h2>Microsoft Store</h2><p>Microsoft Store 앱이 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'xbox', name: 'Xbox', icon: 'https://img.icons8.com/ios-filled/50/000000/xbox.png', content: '<h2>Xbox</h2><p>Xbox 앱이 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'onenote', name: 'OneNote', icon: 'https://img.icons8.com/ios-filled/50/000000/onenote-2019.png', content: '<h2>OneNote</h2><p>OneNote 앱이 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'paint', name: '그림판', icon: 'https://img.icons8.com/ios-filled/50/000000/paint.png', content: '<h2>그림판</h2><p>그림판 앱이 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'alarms-clock', name: '알람 및 시계', icon: 'https://img.icons8.com/ios-filled/50/000000/alarm-clock.png', content: '<h2>알람 및 시계</h2><p>알람 및 시계 앱이 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'feedback-hub', name: '피드백 허브', icon: 'https://img.icons8.com/ios-filled/50/000000/feedback.png', content: '<h2>피드백 허브</h2><p>피드백 허브 앱이 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'groove-music', name: 'Groove 음악', icon: 'https://img.icons8.com/ios-filled/50/000000/groove-music.png', content: '<h2>Groove 음악</h2><p>Groove 음악 앱이 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'movies-tv', name: '영화 및 TV', icon: 'https://img.icons8.com/ios-filled/50/000000/movie-projector.png', content: '<h2>영화 및 TV</h2><p>영화 및 TV 앱이 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'people', name: '피플', icon: 'https://img.icons8.com/ios-filled/50/000000/user-male-circle.png', content: '<h2>피플</h2><p>피플 앱이 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'phone-companion', name: '사용자 휴대폰', icon: 'https://img.icons8.com/ios-filled/50/000000/smartphone.png', content: '<h2>사용자 휴대폰</h2><p>사용자 휴대폰 앱이 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'skype', name: 'Skype', icon: 'https://img.icons8.com/ios-filled/50/000000/skype.png', content: '<h2>Skype</h2><p>Skype 앱이 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'solitaire', name: '솔리테어', icon: 'https://img.icons8.com/ios-filled/50/000000/solitaire.png', content: '<h2>솔리테어</h2><p>솔리테어 게임이 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'sticky-notes', name: '스티커 메모', icon: 'https://img.icons8.com/ios-filled/50/000000/sticky-notes.png', content: '<h2>스티커 메모</h2><p>스티커 메모 앱이 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'voice-recorder', name: '음성 녹음기', icon: 'https://img.icons8.com/ios-filled/50/000000/microphone.png', content: '<h2>음성 녹음기</h2><p>음성 녹음기 앱이 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'whiteboard', name: '화이트보드', icon: 'https://img.icons8.com/ios-filled/50/000000/whiteboard.png', content: '<h2>화이트보드</h2><p>화이트보드 앱이 여기에 표시됩니다.</p>', preInstalled: false },
    { id: 'your-phone', name: '사용자 휴대폰', icon: 'https://img.icons8.com/ios-filled/50/000000/smartphone.png', content: '<h2>사용자 휴대폰</h2><p>사용자 휴대폰 앱이 여기에 표시됩니다.</p>', preInstalled: false }
];

const appStoreApp = {
    id: 'app-store',
    name: '앱 스토어',
    icon: 'https://img.icons8.com/ios-filled/50/000000/shopping-bag.png',
    content: `
        <h2>앱 스토어</h2>
        <div id="app-list"></div>
    `,
    preInstalled: true
};
// Add App Store to desktop icons and installed apps
apps.push(appStoreApp);

// Function to get installed apps from localStorage or default to preInstalled
function getInitialInstalledApps() {
    const storedInstalledApps = localStorage.getItem('installedApps');
    if (storedInstalledApps) {
        return new Set(JSON.parse(storedInstalledApps));
    } else {
        return new Set(apps.filter(app => app.preInstalled).map(app => app.id));
    }
}

let installedApps = getInitialInstalledApps();

function saveInstalledApps() {
    localStorage.setItem('installedApps', JSON.stringify(Array.from(installedApps)));
}

// File storage for Notepad
function saveFile(filename, content) {
    const files = JSON.parse(localStorage.getItem('notepadFiles') || '{}');
    files[filename] = content;
    localStorage.setItem('notepadFiles', JSON.stringify(files));
    alert(`'${filename}' 파일이 저장되었습니다.`);
}

function loadFile(filename) {
    const files = JSON.parse(localStorage.getItem('notepadFiles') || '{}');
    return files[filename] || '';
}

function getSavedFiles() {
    const files = JSON.parse(localStorage.getItem('notepadFiles') || '{}');
    return Object.keys(files);
}

// OS Reset Function
function resetOS() {
    if (confirm('정말 G-OS를 초기화하시겠습니까? 모든 데이터가 삭제됩니다.')) {
        localStorage.clear();
        alert('G-OS를 초기화하는 중입니다. 페이지를 새로고침합니다.');
        window.location.reload();
    }
}

// Screen Management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const desktop = document.getElementById('desktop');
    const taskbarItems = document.getElementById('taskbar-items');
    const clock = document.getElementById('clock');
    const startButton = document.getElementById('start-button');
    const startMenu = document.getElementById('start-menu');
    const startMenuApps = document.querySelector('#start-menu .start-menu-apps');

    const bootScreen = document.getElementById('boot-screen');
    const lockScreen = document.getElementById('lock-screen');
    const loginScreen = document.getElementById('login-screen');
    const mainOsContainer = document.getElementById('main-os-container');

    const lockTime = document.querySelector('#lock-screen .lock-time');
    const lockDate = document.querySelector('#lock-screen .lock-date');
    const passwordInput = document.querySelector('#login-screen .password-input');
    const loginButton = document.querySelector('#login-screen .login-button');
    const loginMessage = document.querySelector('#login-screen .login-message');

    let zIndexCounter = 100;
    let activeWindow = null;

    // Boot Sequence
    setTimeout(() => {
        bootScreen.classList.remove('active');
        lockScreen.classList.add('active');
        updateLockScreenTime();
        setInterval(updateLockScreenTime, 1000);
    }, 3000); // 3 seconds boot time

    // Lock Screen Time Update
    function updateLockScreenTime() {
        const now = new Date();
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        lockTime.textContent = now.toLocaleTimeString('ko-KR', timeOptions);
        lockDate.textContent = now.toLocaleDateString('ko-KR', dateOptions);
    }

    // Clock functionality (for taskbar)
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
    startButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent desktop click from closing menu immediately
        startMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!startMenu.contains(e.target) && e.target !== startButton) {
            startMenu.classList.remove('show');
        }
    });

    // Keyboard shortcuts for Lock/Unlock
    document.addEventListener('keydown', (e) => {
        if (lockScreen.classList.contains('active') && e.key === ' ') { // Spacebar on lock screen
            lockScreen.classList.remove('active');
            loginScreen.classList.add('active');
            passwordInput.focus();
        } else if (loginScreen.classList.contains('active') && e.key === ' ') { // Spacebar on login screen
            e.preventDefault(); // Prevent space from being typed in password field
            attemptLogin();
        } else if (e.shiftKey && e.key === 'L') { // Shift + L to lock
            showScreen('lock-screen');
            mainOsContainer.style.display = 'none'; // Hide desktop when locked
        }
    });

    // Login Logic (simple for now)
    loginButton.addEventListener('click', attemptLogin);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            attemptLogin();
        }
    });

    function attemptLogin() {
        // For simplicity, any password works or no password needed
        // In a real app, you'd check against a stored hash
        if (passwordInput.value === '' || passwordInput.value === 'password') { // Example password
            loginScreen.classList.remove('active');
            mainOsContainer.style.display = 'flex'; // Show desktop
            loginMessage.textContent = '';
            passwordInput.value = ''; // Clear password field
            renderDesktopIcons(); // Re-render icons after login
            renderStartMenuApps(); // Re-render start menu apps after login
            applySavedBackground(); // Apply saved background after login
        } else {
            loginMessage.textContent = '잘못된 암호입니다.';
        }
    }

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
            let initialX, initialY, xOffset, yOffset;

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

            document.addEventListener('mousemove', (e) => {
                if (!isDraggingIcon) return;
                e.preventDefault();
                const currentX = e.clientX - initialX;
                const currentY = e.clientY - initialY;

                currentIcon.style.left = `${xOffset + currentX}px`;
                currentIcon.style.top = `${yOffset + currentY}px`;
            });

            document.addEventListener('mouseup', () => {
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
                    // Uninstall
                    installedApps.delete(appId);
                    e.target.textContent = '설치';
                } else {
                    // Install
                    installedApps.add(appId);
                    e.target.textContent = '설치됨';
                }
                saveInstalledApps(); // Save changes to localStorage
                renderDesktopIcons();
                renderStartMenuApps();
            });
        });
    }

    // Render Files App Content
    function renderFilesAppContent(windowElement) {
        const filesListDiv = windowElement.querySelector('#files-list');
        if (!filesListDiv) return;

        filesListDiv.innerHTML = '';
        const savedFiles = getSavedFiles();

        if (savedFiles.length === 0) {
            filesListDiv.innerHTML = '<p>저장된 파일이 없습니다.</p>';
            return;
        }

        savedFiles.forEach(filename => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.style.padding = '8px';
            fileItem.style.borderBottom = '1px solid #eee';
            fileItem.style.cursor = 'pointer';
            fileItem.innerHTML = `<img src="https://img.icons8.com/ios-filled/24/000000/document.png" style="vertical-align:middle; margin-right:5px;"><span>${filename}</span>`;
            fileItem.addEventListener('dblclick', () => {
                const notepadApp = apps.find(app => app.id === 'notepad');
                if (notepadApp) {
                    openWindow(notepadApp, filename); // Pass filename to openWindow
                }
            });
            filesListDiv.appendChild(fileItem);
        });
    }

    // Render Settings App Content
    function renderSettingsAppContent(windowElement) {
        const settingsAppDiv = windowElement.querySelector('#settings-app');
        if (!settingsAppDiv) return;

        settingsAppDiv.innerHTML = `
            <h3>배경화면 설정</h3>
            <div id="background-options">
                <button data-bg="#0078D7">기본 파랑</button>
                <button data-bg="#333">어두운 회색</button>
                <button data-bg="https://source.unsplash.com/random/1920x1080/?nature">랜덤 자연</button>
                <button data-bg="https://source.unsplash.com/random/1920x1080/?city">랜덤 도시</button>
            </div>
            <h3 style="margin-top:20px;">G-OS 초기화</h3>
            <button id="reset-os-button" style="background-color:red; color:white; padding:10px; border:none; cursor:pointer;">G-OS 초기화</button>
        `;

        settingsAppDiv.querySelectorAll('#background-options button').forEach(button => {
            button.addEventListener('click', (e) => {
                const bg = e.target.dataset.bg;
                desktop.style.backgroundImage = bg.startsWith('#') ? 'none' : `url(${bg})`;
                desktop.style.backgroundColor = bg.startsWith('#') ? bg : 'transparent';
                desktop.style.backgroundSize = 'cover';
                desktop.style.backgroundPosition = 'center';
                localStorage.setItem('desktopBackground', bg);
            });
        });

        settingsAppDiv.querySelector('#reset-os-button').addEventListener('click', resetOS);
    }

    // Render Calculator App Content (Basic Placeholder)
    function renderCalculatorAppContent(windowElement) {
        const calculatorAppDiv = windowElement.querySelector('#calculator-app');
        if (!calculatorAppDiv) return;

        calculatorAppDiv.innerHTML = `
            <input type="text" id="calculator-display" style="width:calc(100% - 20px); margin-bottom:10px; padding:5px; font-size:1.5em; text-align:right;" disabled>
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:5px;">
                <button class="calc-btn">7</button><button class="calc-btn">8</button><button class="calc-btn">9</button><button class="calc-btn">/</button>
                <button class="calc-btn">4</button><button class="calc-btn">5</button><button class="calc-btn">6</button><button class="calc-btn">*</button>
                <button class="calc-btn">1</button><button class="calc-btn">2</button><button class="calc-btn">3</button><button class="calc-btn">-</button>
                <button class="calc-btn">0</button><button class="calc-btn">.</button><button class="calc-btn">=</button><button class="calc-btn">+</button>
                <button class="calc-btn" style="grid-column:span 2;">C</button>
            </div>
        `;

        const display = calculatorAppDiv.querySelector('#calculator-display');
        calculatorAppDiv.querySelectorAll('.calc-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const value = e.target.textContent;
                if (value === '=') {
                    try {
                        display.value = eval(display.value);
                    } catch (e) {
                        display.value = 'Error';
                    }
                } else if (value === 'C') {
                    display.value = '';
                } else {
                    display.value += value;
                }
            });
        });
    }

    // Window Management
    function openWindow(appData, fileToOpen = null) {
        // Prevent opening multiple instances of the same app for simplicity
        if (document.getElementById(`window-${appData.id}`)) {
            const existingWindow = document.getElementById(`window-${appData.id}`);
            focusWindow(existingWindow);
            // If it's notepad and a file is specified, load it
            if (appData.id === 'notepad' && fileToOpen) {
                existingWindow.querySelector('#notepad-textarea').value = loadFile(fileToOpen);
            }
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

        // App-specific initializations
        if (appData.id === 'browser') {
            const urlInput = windowElement.querySelector('#browser-url-input');
            const goButton = windowElement.querySelector('#browser-go-button');
            const browserIframe = windowElement.querySelector('#browser-iframe');

            const navigate = (url) => {
                if (url.startsWith('http://') || url.startsWith('https://')) {
                    browserIframe.src = url;
                } else if (url.includes('.')) { // Simple check for potential domain
                    browserIframe.src = `https://${url}`;
                } else {
                    browserIframe.src = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
                }
            };

            goButton.addEventListener('click', () => navigate(urlInput.value));
            urlInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    navigate(urlInput.value);
                }
            });
            // Set initial browser content
            navigate('https://www.google.com');
        } else if (appData.id === 'notepad') {
            const textarea = windowElement.querySelector('#notepad-textarea');
            const saveButton = windowElement.querySelector('#notepad-save-button');

            // Load file if specified (from Files app)
            if (fileToOpen) {
                textarea.value = loadFile(fileToOpen);
            }

            saveButton.addEventListener('click', () => {
                const filename = prompt('파일 이름을 입력하세요:', '새 메모.txt');
                if (filename) {
                    saveFile(filename, textarea.value);
                }
            });

            // Shift + S to save
            textarea.addEventListener('keydown', (e) => {
                if (e.shiftKey && e.key === 'S') {
                    e.preventDefault(); // Prevent default Shift+S behavior
                    const filename = prompt('파일 이름을 입력하세요:', '새 메모.txt');
                    if (filename) {
                        saveFile(filename, textarea.value);
                    }
                }
            });
        } else if (appData.id === 'files') {
            renderFilesAppContent(windowElement);
        } else if (appData.id === 'settings') {
            renderSettingsAppContent(windowElement);
        } else if (appData.id === 'calculator') {
            renderCalculatorAppContent(windowElement);
        }

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

        document.addEventListener('mousemove', (e) => {
            if (!isDraggingWindow) return;
            windowElement.style.left = `${e.clientX - windowOffsetX}px`;
            windowElement.style.top = `${e.clientY - windowOffsetY}px`;
        });

        document.addEventListener('mouseup', () => {
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
            } else if (appData.id === 'files') {
                renderFilesAppContent(windowElement);
            } else if (appData.id === 'settings') {
                renderSettingsAppContent(windowElement);
            } else if (appData.id === 'calculator') {
                renderCalculatorAppContent(windowElement);
            }
        }

        windowElement.addEventListener('mousedown', () => focusWindow(windowElement));
    }

    // Initial rendering
    renderDesktopIcons();
    renderStartMenuApps();

    // Apply saved background
    const savedBackground = localStorage.getItem('desktopBackground');
    if (savedBackground) {
        desktop.style.backgroundImage = savedBackground.startsWith('#') ? 'none' : `url(${savedBackground})`;
        desktop.style.backgroundColor = savedBackground.startsWith('#') ? savedBackground : 'transparent';
        desktop.style.backgroundSize = 'cover';
        desktop.style.backgroundPosition = 'center';
    }
});