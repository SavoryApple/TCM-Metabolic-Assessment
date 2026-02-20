// Helper function to get section number from element key
function getSectionNumber(elementKey) {
    const sectionMap = {
        'wood': '1',
        'fire': '2',
        'earth': '3',
        'metal': '4',
        'water': '5',
        'endocrineUnder': '6',
        'endocrineOver': '7'
    };
    return sectionMap[elementKey] || elementKey;
}

// Helper function to get section display name
function getSectionDisplayName(elementKey) {
    const displayMap = {
        'wood': { main: 'WOOD', sub: 'Liver & Gallbladder' },
        'fire': { main: 'FIRE', sub: 'Heart & Small Intestine' },
        'earth': { main: 'EARTH', sub: 'Spleen & Stomach' },
        'metal': { main: 'METAL', sub: 'Lung & Large Intestine' },
        'water': { main: 'WATER', sub: 'Kidney & Urinary Bladder' },
        'endocrineUnder': { main: 'ENDOCRINE — UNDERACTIVITY', sub: 'Thyroid • Adrenal • Blood Sugar • Reproductive' },
        'endocrineOver': { main: 'ENDOCRINE — OVERACTIVITY', sub: 'Thyroid • Adrenal • Blood Sugar • Reproductive' }
    };
    return displayMap[elementKey] || { main: 'SECTION', sub: '' };
}

// Determine category based on percentage and thresholds
function determineCategory(percentage) {
    if (percentage < 30) return 'Healthy';
    if (percentage >= 30 && percentage < 50) return 'Mild';
    if (percentage >= 50 && percentage < 70) return 'Moderate';
    if (percentage >= 70) return 'Severe';
    
    return 'Unknown';
}

// Print Document Function
function printDocument() {
    window.print();
}