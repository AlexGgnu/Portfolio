const memojiBg = document.getElementById('hero-memoji-bg');
const memoji = document.getElementById('hero-memoji');
const title = document.getElementById('hero-title');
const tagline = document.getElementById('hero-tagline');

let progress = 0;
let startClientY = 0;

function updateHero() {
    const scaleMax = Math.hypot(document.documentElement.clientWidth, document.documentElement.clientHeight) / memojiBg.offsetWidth;
    const memojiBgScale = 1 + (scaleMax - 1) * progress;

    memojiBg.style.transform = `scale(${memojiBgScale})`;
    memojiBg.style.borderRadius = `${50 * (1 - progress)}%`;
    if(memojiBg.hasAttribute('data-clip-path')) memojiBg.style.clipPath = `circle(${50 * (1 + progress)}% at center)`;

    memoji.style.transform = `scale(${1/memojiBgScale * (1 - progress)})`;
}

function clampProgress() {
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;
}
function updateProgress(deltaY) {
    progress += deltaY / 600;
    clampProgress();
    updateHero();
}

window.addEventListener('wheel', (event) => {
    event.preventDefault();
    updateProgress(event.deltaY);
});

window.addEventListener('touchstart', (event) => startClientY = event.touches[0].clientY);
window.addEventListener('touchmove', (event) => {
    event.preventDefault();
    const newClientY = event.touches[0].clientY;
    const deltaY = startClientY - newClientY;
    startClientY = newClientY;
    updateProgress(deltaY);
});