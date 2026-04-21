const menuToggleButton = document.getElementById('menu-toggle');
const header = document.querySelector('header');
let isToggleOpen = false;
let closeTimer = null;

function getMotionDurationMs() {
    if (typeof getCSSVariable === 'function' && typeof toMs === 'function') return toMs(getCSSVariable('--motion-duration'));
    return 300;
}

function openMenu() {
    clearTimeout(closeTimer);
    header.setAttribute('data-menu-state', 'open');
    isToggleOpen = true;
}
function closeMenu() {
    if (header.getAttribute('data-menu-state') === 'closed') {
        isToggleOpen = false;
        return;
    }

    header.setAttribute('data-menu-state', 'closing');

    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
        if (header.getAttribute('data-menu-state') === 'closing') {
            header.setAttribute('data-menu-state', 'closed');
            isToggleOpen = false;
        }
    }, getMotionDurationMs());
}
function toggleMenu() {
    if (header.getAttribute('data-menu-state') === 'open') {
        closeMenu();
        return;
    }

    openMenu();
}

if (header) isToggleOpen = header.getAttribute('data-menu-state') === 'open';
if (menuToggleButton && header) menuToggleButton.addEventListener('click', toggleMenu);
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && header.getAttribute('data-menu-state') !== 'closed') {
        header.setAttribute('data-menu-state', 'closed');
        isToggleOpen = false;
    }
});