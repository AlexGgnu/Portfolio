const hero = document.getElementById('hero');
const memojiBg = document.getElementById('hero-memoji-bg');
const memoji = document.getElementById('hero-memoji');
const title = document.getElementById('hero-title');
const tagline = document.getElementById('hero-tagline');

let progress = 0;
let radius, memojiBgCenter, titleTopOffset, titleBottomOffset, taglineTopOffset, taglineBottomOffset, scrollableHeight;

function initHero() {
    scrollableHeight = hero.offsetHeight - window.innerHeight;
    radius = memojiBg.offsetWidth / 2;

    memojiBgCenter = memojiBg.getBoundingClientRect().top + radius;
    titleTopOffset = title.getBoundingClientRect().top - memojiBgCenter;
    titleBottomOffset = title.getBoundingClientRect().bottom - memojiBgCenter;
    taglineTopOffset = tagline.getBoundingClientRect().top - memojiBgCenter;
    taglineBottomOffset = tagline.getBoundingClientRect().bottom - memojiBgCenter;
}

function updateHero() {
    const scaleMax = Math.hypot(document.documentElement.clientWidth, document.documentElement.clientHeight) / memojiBg.offsetWidth;
    const memojiBgScale = 1 + (scaleMax - 1) * progress;

    // NOTE: Scale and morph the memoji background
    memojiBg.style.transform = `scale(${memojiBgScale})`;
    memojiBg.style.borderRadius = `${50 * (1 - progress)}%`;
    if(memojiBg.hasAttribute('data-clip-path')) memojiBg.style.clipPath = `circle(${50 * (1 + progress)}% at center)`;

    // NOTE: Scale the memoji image
    memoji.style.transform = `scale(${1/memojiBgScale * (1 - progress)})`;

    // NOTE: Fade out the text
    const titleStart = (titleTopOffset / radius - 1) / (scaleMax - 1);
    const titleEnd = (titleBottomOffset / radius - 1) / (scaleMax - 1);
    const taglineStart = (taglineTopOffset / radius - 1) / (scaleMax - 1);
    const taglineEnd = (taglineBottomOffset / radius - 1) / (scaleMax - 1);

    const titleProgress = clamp((progress - titleStart) / (titleEnd - titleStart), 0, 1);
    const taglineProgress = clamp((progress - taglineStart) / (taglineEnd - taglineStart), 0, 1);

    title.style.opacity = 1 - titleProgress;
    tagline.style.opacity = 1 - taglineProgress;
}

function clampProgress() {
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;
}

window.addEventListener('scroll', () => {
    scrollableHeight = hero.offsetHeight - window.innerHeight;
    progress = window.scrollY / scrollableHeight;
    clampProgress();
    updateHero();
});
window.addEventListener('load', () => {
    initHero();
    updateHero();
});