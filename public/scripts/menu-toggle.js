const menuToggleButton = document.getElementById('menu-toggle');
const header = document.querySelector('header');
let isToogle = false;
let closeTimer = null;

menuToggleButton.addEventListener('click', () => {
    const menuState = header.getAttribute('data-menu-state');

    if(!menuState) header.setAttribute('data-menu-state', !isToogle ? 'open' : 'closed');

    if(menuState === 'open') {
        header.setAttribute('data-menu-state', 'closing');

        clearTimeout(closeTimer);
        closeTimer = setTimeout(() => {
            if (header.getAttribute('data-menu-state') === 'closing') {
                header.setAttribute('data-menu-state', 'closed');
                isToogle = false;
            }
        }, toMs(getCSSVariable('--motion-duration')));
    } else if(menuState === 'closed') {
        header.setAttribute('data-menu-state', 'open');
        isToogle = true;
    };
});
