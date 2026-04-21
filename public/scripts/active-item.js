let navItems = document.querySelectorAll('#nav-items .item');

function setActiveItem() {
    const currentPath = window.location.hash || '/';

    navItems.forEach(item => {
        const itemPath = item.querySelector('a').getAttribute('href');

        if (itemPath === currentPath) item.setAttribute('data-active-item', 'true');
        else item.removeAttribute('data-active-item');
    });
}

window.addEventListener('DOMContentLoaded', setActiveItem);
window.addEventListener('popstate', setActiveItem);