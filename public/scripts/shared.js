function getCSSVariable(variable) {
    return getComputedStyle(document.body).getPropertyValue(variable).trim();
}

function toMs(value) {
    if(value.endsWith('ms')) return parseFloat(value);
    else if(value.endsWith('s')) return parseFloat(value) * 1000;
    
    return Number(value) || 0;
}