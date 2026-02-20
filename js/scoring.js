// Global object to track subsection boundaries
const subsectionBoundaries = {};

// Maximum possible scores for each section (number of questions * 3)
const maxScores = {
    wood: 69,          // 23 questions * 3
    fire: 42,          // 14 questions * 3
    earth: 63,         // 21 questions * 3
    metal: 66,         // 22 questions * 3
    water: 48,         // 16 questions * 3
    endocrineUnder: 99, // 33 questions * 3
    endocrineOver: 78   // 26 questions * 3
};

// Calculate total for each section dynamically
function calculateSectionTotal(section) {
    console.log(`Calculating total for section: ${section}`);
    let total = 0;

    // Count all symptoms for this section
    const inputs = document.querySelectorAll(`input[name^="${section}_"]`);
    inputs.forEach(input => {
        if (input.name !== `${section}_total` && input.value) {
            total += parseInt(input.value, 10) || 0;
        }
    });

    // Calculate percentage of maximum possible
    const maxScore = maxScores[section];
    const percentage = maxScore > 0 ? ((total / maxScore) * 100).toFixed(1) : 0;

    // Update the total in the readonly field
    const totalField = document.querySelector(`input[name="${section}_total"]`);
    if (totalField) {
        totalField.value = `${total} / ${maxScore}`;
        console.log(`Section ${section} total updated to: ${total}`);
    }

    // Reflect the total in the imbalance grid with percentage
    const imbalanceDisplay = document.getElementById(`imbalance-${section}-total`);
    if (imbalanceDisplay) {
        imbalanceDisplay.textContent = `${total} / ${maxScore} (${percentage}%)`;
    }

    return total;
}

// Calculate subsection score by counting symptoms within boundaries
function calculateSubsectionScore(sectionKey, subsectionKey) {
    if (!subsectionBoundaries[sectionKey] || !subsectionBoundaries[sectionKey][subsectionKey]) {
        console.warn(`No boundaries found for ${sectionKey} - ${subsectionKey}`);
        return { total: 0, maxScore: 0 };
    }

    const { start, end, maxScore } = subsectionBoundaries[sectionKey][subsectionKey];
    let total = 0;

    console.log(`Calculating ${sectionKey} ${subsectionKey}: symptoms ${start} to ${end}`);

    // Sum up all symptom scores within this subsection's range
    for (let i = start; i <= end; i++) {
        const inputName = `${sectionKey}_${i}`;
        const input = document.querySelector(`input[name="${inputName}"]`);
        if (input && input.value) {
            const value = parseInt(input.value, 10) || 0;
            total += value;
            console.log(`  ${inputName} = ${value}`);
        }
    }

    console.log(`  Total: ${total}/${maxScore}`);
    return { total, maxScore };
}

// Update "Five Element Theory" interactions dynamically
function updateFiveElementInteractions() {
    console.log("Updating Five Element interactions...");

    // Get raw totals (extract numeric value before slash)
    const rawTotals = {
        wood: parseInt(document.getElementById("imbalance-wood-total")?.textContent.split('/')[0]?.trim() || "0", 10),
        fire: parseInt(document.getElementById("imbalance-fire-total")?.textContent.split('/')[0]?.trim() || "0", 10),
        earth: parseInt(document.getElementById("imbalance-earth-total")?.textContent.split('/')[0]?.trim() || "0", 10),
        metal: parseInt(document.getElementById("imbalance-metal-total")?.textContent.split('/')[0]?.trim() || "0", 10),
        water: parseInt(document.getElementById("imbalance-water-total")?.textContent.split('/')[0]?.trim() || "0", 10),
        endocrineUnder: parseInt(document.getElementById("imbalance-endocrineUnder-total")?.textContent.split('/')[0]?.trim() || "0", 10),
        endocrineOver: parseInt(document.getElementById("imbalance-endocrineOver-total")?.textContent.split('/')[0]?.trim() || "0", 10),
    };

    console.log("Raw totals:", rawTotals);
    console.log("Interactions calculation skipped - Pattern Analysis section removed.");

    // Generate practitioner recommendations after updating interactions
    generatePractitionerRecommendations();
}