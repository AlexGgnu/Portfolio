let navItems = document.querySelectorAll('#nav-items .item');

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

window.addEventListener('DOMContentLoaded', setActiveItem);
window.addEventListener('popstate', setActiveItem);