const hero = document.getElementById('hero');
const memojiBg = document.getElementById('hero-memoji-bg');
const memoji = document.getElementById('hero-memoji');
const title = document.getElementById('hero-title');
const tagline = document.getElementById('hero-tagline');

let progress = 0;
let scrollableHeight, radius, memojiBgCenter, headerBottomOffset, titleTopOffset, titleBottomOffset, taglineTopOffset, taglineBottomOffset;

function initHero() {
    scrollableHeight = hero.offsetHeight - window.innerHeight;
    radius = memojiBg.offsetWidth / 2;

    memojiBgCenter = memojiBg.getBoundingClientRect().top + radius;
    headerBottomOffset = memojiBgCenter - header.getBoundingClientRect().bottom;
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

    // NOTE: Fade header background and text color light to dark
    const headerStart = (headerBottomOffset / radius - 1) / (scaleMax - 1);
    const headerProgress = clamp((progress - headerStart) / (1 - headerStart), 0, 1);

    const headerBgR = Math.round(247 - (247 - 10) * headerProgress);
    const headerBgG = Math.round(247 - (247 - 10) * headerProgress);
    const headerBgB = Math.round(247 - (247 - 10) * headerProgress);
    header.style.backgroundColor = `rgba(${headerBgR}, ${headerBgG}, ${headerBgB}, 0.8)`;

    const textColor = Math.round(26 + (255 - 26) * headerProgress);
    header.style.color = `rgb(${textColor}, ${textColor}, ${textColor})`;
    menuToggleButton.querySelectorAll('span').forEach(span => span.style.backgroundColor = `rgb(${textColor}, ${textColor}, ${textColor})`);
}

window.addEventListener('scroll', () => {
    scrollableHeight = hero.offsetHeight - window.innerHeight;
    progress = clamp(window.scrollY / scrollableHeight, 0, 1);
    updateHero();
});
window.addEventListener('load', () => {
    initHero();
    updateHero();
});