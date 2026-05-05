const header = document.querySelector('header');
const navItems = document.querySelectorAll('#nav-items .item');
const menuToggleButton = document.getElementById('menu-toggle');

let isToggleOpen = false;
let closeTimer = null;

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
    }, toMs(getCSSVariable('--motion-duration')));
}
function toggleMenu() {
    if (header.getAttribute('data-menu-state') === 'open') {
        closeMenu();
        return;
    }

    openMenu();
}

function setActiveItem() {
    const currentPath = window.location.hash === "" ? "#hero" : window.location.hash;

    navItems.forEach(item => {
        const itemPath = item.querySelector('a').getAttribute('href');

        if (itemPath === currentPath) {
            item.setAttribute('data-active-item', 'true');
            if (window.innerWidth < 768) closeMenu();
        } else item.removeAttribute('data-active-item');
    });
}

if (header) isToggleOpen = header.getAttribute('data-menu-state') === 'open';
if (menuToggleButton && header) menuToggleButton.addEventListener('click', toggleMenu);
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && header.getAttribute('data-menu-state') !== 'closed') {
        header.setAttribute('data-menu-state', 'closed');
        isToggleOpen = false;
    }
});

window.addEventListener('DOMContentLoaded', setActiveItem);
window.addEventListener('popstate', setActiveItem);