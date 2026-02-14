// Print Document Function
function printDocument() {
    window.print();
}

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

    // Update the total in the readonly field
    const totalField = document.querySelector(`input[name="${section}_total"]`);
    if (totalField) {
        totalField.value = total;
        console.log(`Section ${section} total updated to: ${total}`);
    }

    // Reflect the total in the imbalance grid
    const imbalanceDisplay = document.getElementById(`imbalance-${section}-total`);
    if (imbalanceDisplay) {
        imbalanceDisplay.textContent = total;
    }

    return total;
}

// Helper function to get section number from element key
function getSectionNumber(elementKey) {
    const sectionMap = {
        'wood': '1',
        'fire': '2',
        'earth': '3',
        'metal': '4',
        'water': '5'
    };
    return sectionMap[elementKey] || elementKey;
}

// Update "Five Element Theory" interactions dynamically
function updateFiveElementInteractions() {
    console.log("Updating Five Element interactions...");

    const totals = {
        wood: parseInt(document.getElementById("imbalance-wood-total")?.textContent || "0", 10),
        fire: parseInt(document.getElementById("imbalance-fire-total")?.textContent || "0", 10),
        earth: parseInt(document.getElementById("imbalance-earth-total")?.textContent || "0", 10),
        metal: parseInt(document.getElementById("imbalance-metal-total")?.textContent || "0", 10),
        water: parseInt(document.getElementById("imbalance-water-total")?.textContent || "0", 10),
    };

    const summaryList = document.getElementById("five-element-summary");
    summaryList.innerHTML = "";

    // Calculate average and determine threshold
    const totalSum = Object.values(totals).reduce((a, b) => a + b, 0);
    const average = totalSum / 5;
    const threshold = Math.max(6, average * 1.2); // At least 6 or 20% above average

    const interactions = [];

    // Find the highest and lowest scores
    const maxScore = Math.max(...Object.values(totals));
    const minScore = Math.min(...Object.values(totals));
    const maxElements = Object.keys(totals).filter(k => totals[k] === maxScore);
    const minElements = Object.keys(totals).filter(k => totals[k] === minScore);

    // Five Element Theory interactions based on generating and controlling cycles
    
    // CONTROLLING CYCLE IMBALANCES (Overacting/Insulting)
    
    // Wood overacting on Earth (Wood controls Earth)
    if (totals.wood >= threshold && totals.earth >= threshold) {
        interactions.push(`Section 1 and Section 3 imbalance: Liver stress may be impairing digestive function and weakening the Spleen system.`);
    }

    // Earth overacting on Water (Earth controls Water)
    if (totals.earth >= threshold && totals.water >= threshold) {
        interactions.push(`Section 3 and Section 5 imbalance: Digestive dampness may be affecting kidney function and fluid metabolism.`);
    }

    // Water overacting on Fire (Water controls Fire)
    if (totals.water >= threshold && totals.fire >= threshold) {
        interactions.push(`Section 5 and Section 2 imbalance: Kidney deficiency creating heart symptoms or Water failing to properly control Fire.`);
    }

    // Fire overacting on Metal (Fire controls Metal)
    if (totals.fire >= threshold && totals.metal >= threshold) {
        interactions.push(`Section 2 and Section 4 imbalance: Heart fire or emotional stress may be affecting lung function and immunity.`);
    }

    // Metal overacting on Wood (Metal controls Wood)
    if (totals.metal >= threshold && totals.wood >= threshold) {
        interactions.push(`Section 4 and Section 1 imbalance: Respiratory or grief issues may be suppressing liver function and emotional flow.`);
    }

    // GENERATING CYCLE IMBALANCES (Mother not nourishing Child)
    
    // Water not generating Wood properly
    if (totals.water >= threshold && totals.wood >= threshold) {
        interactions.push(`Section 5 and Section 1 deficiency: Kidney essence depletion affecting liver blood and hormone regulation.`);
    }

    // Wood not generating Fire properly
    if (totals.wood >= threshold && totals.fire >= threshold) {
        interactions.push(`Section 1 and Section 2 connection: Liver qi stagnation affecting heart spirit and creating heat symptoms.`);
    }

    // Fire not generating Earth properly
    if (totals.fire >= threshold && totals.earth >= threshold) {
        interactions.push(`Section 2 and Section 3 connection: Heart/circulation weakness may be affecting digestive function and mental clarity.`);
    }

    // Earth not generating Metal properly
    if (totals.earth >= threshold && totals.metal >= threshold) {
        interactions.push(`Section 3 and Section 4 imbalance: Digestive weakness affecting lung qi and immune function.`);
    }

    // Metal not generating Water properly
    if (totals.metal >= threshold && totals.water >= threshold) {
        interactions.push(`Section 4 and Section 5 deficiency: Lung qi weakness affecting kidney function and vital essence.`);
    }

    // SPECIAL PATTERNS - only show if scores are significantly different
    
    // Individual element analysis - only if there's a significant difference AND they're different sections
    if (maxScore - minScore >= 12 && maxElements[0] !== minElements[0]) {
        const maxSection = getSectionNumber(maxElements[0]);
        const minSection = getSectionNumber(minElements[0]);
        interactions.push(`Notable pattern: Section ${maxSection} score (${maxScore}) is significantly higher than Section ${minSection} score (${minScore}), suggesting a primary imbalance in that system.`);
    }

    // Specific element interpretations - only add these if the section is notably elevated
    if (totals.wood >= threshold && totals.wood === maxScore) {
        interactions.push(`Section 1 primary imbalance: Focus on stress management, liver detoxification, hormone balance, and ensuring smooth flow of energy.`);
    }
    if (totals.fire >= threshold && totals.fire === maxScore) {
        interactions.push(`Section 2 primary imbalance: Attention needed for cardiovascular health, sleep quality, emotional regulation, and nutrient absorption.`);
    }
    if (totals.earth >= threshold && totals.earth === maxScore) {
        interactions.push(`Section 3 primary imbalance: Strengthen digestive function, reduce overthinking, stabilize blood sugar, and nourish the center.`);
    }
    if (totals.metal >= threshold && totals.metal === maxScore) {
        interactions.push(`Section 4 primary imbalance: Support respiratory health, strengthen immunity, improve elimination, and address grief/letting go.`);
    }
    if (totals.water >= threshold && totals.water === maxScore) {
        interactions.push(`Section 5 primary imbalance: Restore vital essence, support adrenal/kidney function, address fear, and strengthen bones.`);
    }

    // Filter out duplicate interactions and prioritize
    const uniqueInteractions = [...new Set(interactions)];
    
    // Prioritize: 
    // 1. Specific dual-element patterns (most relevant)
    // 2. Notable pattern differences
    // 3. Single element interpretations
    const prioritizedInteractions = uniqueInteractions.sort((a, b) => {
        const aIsDual = a.includes('and Section');
        const bIsDual = b.includes('and Section');
        const aIsNotable = a.includes('Notable pattern');
        const bIsNotable = b.includes('Notable pattern');
        
        if (aIsDual && !bIsDual) return -1;
        if (!aIsDual && bIsDual) return 1;
        if (aIsNotable && !bIsNotable) return -1;
        if (!aIsNotable && bIsNotable) return 1;
        return 0;
    });

    // Display top 5 most relevant interactions to avoid overwhelming
    const displayInteractions = prioritizedInteractions.slice(0, 5);
    
    if (displayInteractions.length > 0) {
        displayInteractions.forEach((interaction) => {
            const li = document.createElement("li");
            li.textContent = interaction;
            summaryList.appendChild(li);
        });
    } else {
        summaryList.innerHTML = "<li>No significant imbalances detected at this time. Scores are relatively balanced across all sections.</li>";
    }

    console.log("Interactions updated successfully.");
    console.log("Current totals:", totals);
    console.log("Threshold:", threshold);
    console.log("Displaying interactions:", displayInteractions);
}

// Handle button clicks for symptoms
function handleButtonClick(event) {
    const button = event.target;
    const buttonGroup = button.closest(".button-group");
    const symptomKey = buttonGroup.getAttribute("data-symptom");

    if (!symptomKey) {
        console.error("Symptom key not recognized!");
        return;
    }

    const hiddenField = document.querySelector(`input[name="${symptomKey}"]`);
    if (hiddenField) {
        hiddenField.value = button.getAttribute("data-value");
    }

    // Remove "active" class and highlight selected button
    buttonGroup.querySelectorAll("button").forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Calculate totals
    const section = symptomKey.split("_")[0];
    calculateSectionTotal(section);
    updateFiveElementInteractions();
}

// Generate symptom sections from data
function generateSymptomSections() {
    const container = document.getElementById("symptom-sections");
    let symptomCounter = 0;

    Object.keys(symptomData).forEach(elementKey => {
        const element = symptomData[elementKey];
        
        const section = document.createElement("div");
        section.className = "element-section";
        section.style.marginBottom = "10px";
        section.style.padding = "5px";

        const header = document.createElement("div");
        header.className = `element-header ${elementKey}-header`;
        header.style.padding = "5px";
        header.style.fontSize = "12px";
        header.style.backgroundColor = element.color;
        header.style.color = "white";
        header.textContent = element.name; // Uses anonymized name

        const description = document.createElement("div");
        description.className = "element-description";
        description.textContent = element.description;

        section.appendChild(header);
        section.appendChild(description);

        element.subsections.forEach(subsection => {
            // Only add subsection header if it has content
            if (subsection.title) {
                const subsectionHeader = document.createElement("div");
                subsectionHeader.className = "subsection-header";
                subsectionHeader.textContent = subsection.title;
                section.appendChild(subsectionHeader);
            }

            const table = document.createElement("table");
            table.className = "symptoms-table";

            subsection.symptoms.forEach(symptom => {
                symptomCounter++;
                const symptomKey = `${elementKey}_${symptomCounter}`;

                const row = document.createElement("tr");
                
                const nameCell = document.createElement("td");
                nameCell.className = "symptom-name";
                nameCell.textContent = symptom;

                const scoreCell = document.createElement("td");
                scoreCell.className = "symptom-score";

                const buttonGroup = document.createElement("div");
                buttonGroup.className = "button-group";
                buttonGroup.setAttribute("data-symptom", symptomKey);

                for (let i = 0; i <= 3; i++) {
                    const btn = document.createElement("button");
                    btn.type = "button";
                    btn.setAttribute("data-value", i);
                    btn.textContent = i;
                    if (i === 0) btn.className = "active";
                    buttonGroup.appendChild(btn);
                }

                const hiddenInput = document.createElement("input");
                hiddenInput.type = "hidden";
                hiddenInput.name = symptomKey;
                hiddenInput.value = "0";

                scoreCell.appendChild(buttonGroup);
                scoreCell.appendChild(hiddenInput);

                row.appendChild(nameCell);
                row.appendChild(scoreCell);
                table.appendChild(row);
            });

            // Add total row
            const totalRow = document.createElement("tr");
            totalRow.className = "total-row";
            
            const totalLabelCell = document.createElement("td");
            totalLabelCell.textContent = `${element.name.toUpperCase()} TOTAL:`;
            
            const totalValueCell = document.createElement("td");
            totalValueCell.className = "symptom-score";
            
            const totalInput = document.createElement("input");
            totalInput.type = "number";
            totalInput.name = `${elementKey}_total`;
            totalInput.min = "0";
            totalInput.readOnly = true;
            totalInput.style.background = "#f0f0f0";
            totalInput.value = "0";
            
            totalValueCell.appendChild(totalInput);
            totalRow.appendChild(totalLabelCell);
            totalRow.appendChild(totalValueCell);
            
            table.appendChild(totalRow);
            section.appendChild(table);
        });

        container.appendChild(section);
        
        // Reset counter for each element
        symptomCounter = 0;
    });

    // Add the key at the bottom
    generateSectionKey();
}

// Generate the section key at the bottom
function generateSectionKey() {
    const container = document.getElementById("symptom-sections");
    
    const keySection = document.createElement("div");
    keySection.className = "imbalance-section";
    keySection.style.marginTop = "30px";
    keySection.style.pageBreakBefore = "always";

    const keyHeader = document.createElement("h3");
    keyHeader.style.fontSize = "14px";
    keyHeader.style.marginBottom = "10px";
    keyHeader.style.color = "#2c5f2d";
    keyHeader.textContent = "Assessment Section Key (For Practitioner Use)";

    keySection.appendChild(keyHeader);

    const keyList = document.createElement("div");
    keyList.style.fontSize = "11px";
    keyList.style.lineHeight = "1.8";

    Object.keys(sectionKey).forEach(section => {
        const keyItem = document.createElement("p");
        keyItem.style.marginBottom = "8px";
        keyItem.innerHTML = `<strong>${section}:</strong> ${sectionKey[section]}`;
        keyList.appendChild(keyItem);
    });

    keySection.appendChild(keyList);
    container.appendChild(keySection);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    generateSymptomSections();
    
    // Add event listeners to all buttons
    setTimeout(() => {
        const allButtons = document.querySelectorAll(".button-group button");
        allButtons.forEach((button) => {
            button.addEventListener("click", handleButtonClick);
        });
        console.log(`Initialized ${allButtons.length} buttons for dynamic updates.`);
    }, 100);
});