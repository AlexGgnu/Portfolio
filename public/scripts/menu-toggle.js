const menuToggleButton = document.getElementById('menu-toggle');
const header = document.querySelector('header');
let isToogle = false;

menuToggleButton.addEventListener('click', () => {
    const menuState = header.getAttribute('data-menu-state');

    if(!menuState) header.setAttribute('data-menu-state', !isToogle ? 'open' : 'closed');
    else header.setAttribute('data-menu-state', menuState === 'closed' ? 'open' : 'closed');
    
    isToogle = !isToogle;
});