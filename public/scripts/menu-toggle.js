const menuToggleButton = document.getElementById('menu-toggle');
const header = document.querySelector('header');

menuToggleButton.addEventListener('click', () => {
    const menuState = header.getAttribute('data-menu-state');
    header.setAttribute('data-menu-state', menuState === 'closed' ? 'open' : 'closed');
});