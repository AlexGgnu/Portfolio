// MARK: - Utilities
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// MARK: - Conversions
function toMs(value) {
    if(value.endsWith('ms')) return parseFloat(value);
    else if(value.endsWith('s')) return parseFloat(value) * 1000;
    
    return Number(value) || 0;
}

// MARK: - CSS Variables
const getCSSVariable = (variable) => getComputedStyle(document.body).getPropertyValue(variable).trim();
