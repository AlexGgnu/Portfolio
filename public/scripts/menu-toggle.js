const menuToggleButton = document.getElementById('menu-toggle');
const header = document.querySelector('header');
let hasToggled = false;

menuToggleButton.addEventListener('click', () => {
    const menuState = header.getAttribute('data-menu-state');
    console.log(menuState);

    if(!menuState) header.setAttribute('data-menu-state', hasToggled ? 'closed' : 'open');
    else header.setAttribute('data-menu-state', menuState === 'closed' ? 'open' : 'closed');

    hasToggled = !hasToggled;
});