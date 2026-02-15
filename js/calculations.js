// Print Document Function
function printDocument() {
    window.print();
}

// Global object to track subsection boundaries
const subsectionBoundaries = {};

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

// Determine category based on percentage and thresholds
function determineCategory(percentage) {
    if (percentage < 30) return 'Healthy';
    if (percentage >= 30 && percentage < 50) return 'Mild';
    if (percentage >= 50 && percentage < 70) return 'Moderate';
    if (percentage >= 70) return 'Severe';
    
    return 'Unknown';
}

// Generate practitioner recommendations
function generatePractitionerRecommendations() {
    if (typeof diagnosticData === 'undefined') {
        console.warn('Diagnostic data not loaded. Make sure diagnostic-logic.js is included.');
        return;
    }

    console.log("=== Generating Practitioner Recommendations ===");

    const recommendations = {
        subsectionAnalysis: {},
        recommendedTests: new Set(),
        totalCost: 0,
        tcmPatterns: [],
        endocrineSquareFindings: [],
        clinicalPatterns: []
    };

    // Analyze each section and subsection
    Object.keys(diagnosticData).forEach(sectionKey => {
        const sectionData = diagnosticData[sectionKey];
        const subsections = sectionData.subsections;
        
        recommendations.subsectionAnalysis[sectionKey] = {};

        Object.keys(subsections).forEach(subsectionKey => {
            const subsection = subsections[subsectionKey];
            
            // Calculate subsection score
            const subsectionScore = calculateSubsectionScore(sectionKey, subsectionKey);
            const percentage = subsectionScore.maxScore > 0 
                ? (subsectionScore.total / subsectionScore.maxScore) * 100 
                : 0;
            const category = determineCategory(percentage);

            console.log(`${sectionKey} ${subsectionKey}: ${subsectionScore.total}/${subsectionScore.maxScore} = ${percentage.toFixed(1)}% (${category})`);

            recommendations.subsectionAnalysis[sectionKey][subsectionKey] = {
                name: subsection.name,
                score: subsectionScore.total,
                maxScore: subsectionScore.maxScore,
                percentage: percentage.toFixed(1),
                category: category,
                pattern: subsection.pattern,
                keyLabs: subsection.keyLabs,
                tests: subsection.tests,
                testCodes: subsection.testCodes
            };

            // Add recommended tests if category is Mild or higher (>30%)
            if (percentage >= 30) {
                console.log(`  Elevated! Adding tests: ${subsection.tests}`);
                if (subsection.testCodes && Array.isArray(subsection.testCodes)) {
                    subsection.testCodes.forEach(code => recommendations.recommendedTests.add(code));
                }
                
                // Add TCM pattern
                recommendations.tcmPatterns.push({
                    section: sectionKey,
                    subsection: subsectionKey,
                    category: category,
                    pattern: subsection.pattern,
                    percentage: percentage.toFixed(1)
                });
            }
        });
    });

    // Analyze Endocrine Square patterns
    analyzeEndocrineSquare(recommendations);

    // Analyze Clinical Pattern Combinations
    analyzeClinicalPatterns(recommendations);

    // Calculate total cost
    calculateTestCosts(recommendations);

    // Display recommendations
    displayPractitionerRecommendations(recommendations);

    return recommendations;
}

// Analyze Endocrine Square patterns
function analyzeEndocrineSquare(recommendations) {
    if (typeof endocrineSquarePatterns === 'undefined') return;

    const under6 = recommendations.subsectionAnalysis['endocrineUnder'] || {};
    const over7 = recommendations.subsectionAnalysis['endocrineOver'] || {};

    // Check for Endocrine Square patterns
    Object.keys(endocrineSquarePatterns).forEach(patternKey => {
        const pattern = endocrineSquarePatterns[patternKey];
        let detected = false;
        let details = '';

        // HPT pattern (6A/7A)
        if (patternKey === 'HPT (6A/7A)') {
            const sixA = under6['6A'];
            const sevenA = over7['7A'];
            if ((sixA && parseFloat(sixA.percentage) >= 30) || (sevenA && parseFloat(sevenA.percentage) >= 30)) {
                detected = true;
                details = `6A: ${sixA?.percentage || 0}%, 7A: ${sevenA?.percentage || 0}%`;
            }
        }

        // HPA pattern (6B/7B)
        if (patternKey === 'HPA (6B/7B)') {
            const sixB = under6['6B'];
            const sevenB = over7['7B'];
            if ((sixB && parseFloat(sixB.percentage) >= 30) || (sevenB && parseFloat(sevenB.percentage) >= 30)) {
                detected = true;
                details = `6B: ${sixB?.percentage || 0}%, 7B: ${sevenB?.percentage || 0}%`;
            }
        }

        // HPF pattern (6C/7C)
        if (patternKey === 'HPF (6C/7C)') {
            const sixC = under6['6C'];
            const sevenC = over7['7C'];
            if ((sixC && parseFloat(sixC.percentage) >= 30) || (sevenC && parseFloat(sevenC.percentage) >= 30)) {
                detected = true;
                details = `6C: ${sixC?.percentage || 0}%, 7C: ${sevenC?.percentage || 0}%`;
            }
        }

        // HPO pattern (6D/7D)
        if (patternKey === 'HPO (6D/7D)') {
            const sixD = under6['6D'];
            const sevenD = over7['7D'];
            if ((sixD && parseFloat(sixD.percentage) >= 30) || (sevenD && parseFloat(sevenD.percentage) >= 30)) {
                detected = true;
                details = `6D: ${sixD?.percentage || 0}%, 7D: ${sevenD?.percentage || 0}%`;
            }
        }

        if (detected) {
            recommendations.endocrineSquareFindings.push({
                pattern: patternKey,
                fullName: pattern.fullName,
                symptoms: pattern.symptoms,
                tcm: pattern.tcm,
                details: details
            });
        }
    });
}

// Analyze Clinical Pattern Combinations
function analyzeClinicalPatterns(recommendations) {
    if (typeof clinicalPatterns === 'undefined') return;

    const under6 = recommendations.subsectionAnalysis['endocrineUnder'] || {};
    const over7 = recommendations.subsectionAnalysis['endocrineOver'] || {};

    // Check for specific clinical pattern combinations
    Object.keys(clinicalPatterns).forEach(patternName => {
        const pattern = clinicalPatterns[patternName];
        let detected = false;
        let reasoning = '';

        // Pure Hypo
        if (patternName === 'Pure Hypo') {
            const sixA = under6['6A'];
            const sixB = under6['6B'];
            const sixC = under6['6C'];
            const sixD = under6['6D'];
            const allUnderElevated = [sixA, sixB, sixC, sixD].every(sub => 
                sub && parseFloat(sub.percentage) >= 30
            );
            const allOverLow = ['7A', '7B', '7C', '7D'].every(key => {
                const sub = over7[key];
                return !sub || parseFloat(sub.percentage) < 30;
            });
            if (allUnderElevated && allOverLow) {
                detected = true;
                reasoning = 'All Section 6 subsections elevated (≥30%), all Section 7 subsections low (<30%)';
            }
        }

        // Pure Hyper
        if (patternName === 'Pure Hyper') {
            const sevenA = over7['7A'];
            const sevenB = over7['7B'];
            const sevenC = over7['7C'];
            const sevenD = over7['7D'];
            const allOverElevated = [sevenA, sevenB, sevenC, sevenD].every(sub => 
                sub && parseFloat(sub.percentage) >= 30
            );
            const allUnderLow = ['6A', '6B', '6C', '6D'].every(key => {
                const sub = under6[key];
                return !sub || parseFloat(sub.percentage) < 30;
            });
            if (allOverElevated && allUnderLow) {
                detected = true;
                reasoning = 'All Section 7 subsections elevated (≥30%), all Section 6 subsections low (<30%)';
            }
        }

        // Mixed (easy)
        if (patternName === 'Mixed (easy)') {
            const bothElevatedCount = ['A', 'B', 'C', 'D'].filter(letter => {
                const under = under6[`6${letter}`];
                const over = over7[`7${letter}`];
                return under && over && 
                       parseFloat(under.percentage) >= 30 && 
                       parseFloat(over.percentage) >= 30;
            }).length;
            if (bothElevatedCount >= 1 && bothElevatedCount <= 2) {
                detected = true;
                reasoning = `${bothElevatedCount} subsection(s) with both under/over elevated`;
            }
        }

        // HPT cycling
        if (patternName === 'HPT cycling') {
            const sixA = under6['6A'];
            const sevenA = over7['7A'];
            if (sixA && sevenA && 
                parseFloat(sixA.percentage) >= 30 && 
                parseFloat(sevenA.percentage) >= 30) {
                detected = true;
                reasoning = 'Both 6A and 7A elevated (Hashitoxicosis pattern)';
            }
        }

        // HPA cycling
        if (patternName === 'HPA cycling') {
            const sixB = under6['6B'];
            const sevenB = over7['7B'];
            if (sixB && sevenB && 
                parseFloat(sixB.percentage) >= 30 && 
                parseFloat(sevenB.percentage) >= 30) {
                detected = true;
                reasoning = 'Both 6B and 7B elevated (Cortisol rhythm disruption)';
            }
        }

        // Dysglycemia
        if (patternName === 'Dysglycemia') {
            const sixC = under6['6C'];
            const sevenC = over7['7C'];
            if (sixC && sevenC && 
                parseFloat(sixC.percentage) >= 30 && 
                parseFloat(sevenC.percentage) >= 30) {
                detected = true;
                reasoning = 'Both 6C and 7C elevated (Blood sugar dysregulation)';
            }
        }

        // HPO square
        if (patternName === 'HPO square') {
            const sixD = under6['6D'];
            const sevenD = over7['7D'];
            if (sixD && sevenD && 
                parseFloat(sixD.percentage) >= 30 && 
                parseFloat(sevenD.percentage) >= 30) {
                detected = true;
                reasoning = 'Both 6D and 7D elevated (Reproductive hormone imbalance)';
            }
        }

        // Estrogen dominance
        if (patternName === 'Estrogen dominance') {
            const sixD = under6['6D'];
            const sevenD = over7['7D'];
            if (sixD && sevenD && 
                parseFloat(sixD.percentage) < 30 && 
                parseFloat(sevenD.percentage) >= 50) {
                detected = true;
                reasoning = '6D low, 7D high (Estrogen dominance pattern)';
            }
        }

        // Female collapse
        if (patternName === 'Female collapse') {
            const allSections = ['6A', '6B', '6C', '6D'].every(key => {
                const sub = under6[key];
                return sub && parseFloat(sub.percentage) >= 50;
            });
            if (allSections) {
                detected = true;
                reasoning = 'All Section 6 subsections ≥50% (Multi-system collapse)';
            }
        }

        if (detected) {
            recommendations.clinicalPatterns.push({
                pattern: patternName,
                range: pattern.range,
                tcm: pattern.tcm,
                clinicalSignificance: pattern.clinicalSignificance,
                reasoning: reasoning
            });
        }
    });
}

// Calculate test costs based on recommended tests
function calculateTestCosts(recommendations) {
    if (typeof testCatalog === 'undefined') return;

    const testSet = new Set();
    
    recommendations.recommendedTests.forEach(testCode => {
        // Find the test in the catalog
        Object.keys(testCatalog).forEach(catalogKey => {
            if (catalogKey === testCode || testCatalog[catalogKey].name.includes(testCode)) {
                const test = testCatalog[catalogKey];
                if (!testSet.has(test.name)) {
                    testSet.add(test.name);
                    recommendations.totalCost += test.price || 0;
                }
            }
        });
    });
}

// Display practitioner recommendations in the UI
function displayPractitionerRecommendations(recommendations) {
    const container = document.getElementById('practitioner-recommendations');
    if (!container) {
        console.warn('Practitioner recommendations container not found');
        return;
    }

    let html = '<h3>Practitioner Diagnostic Recommendations</h3>';

    // Subsection Analysis
    html += '<div class="subsection-analysis"><h4>Subsection Analysis</h4>';
    
    let hasElevatedSubsections = false;
    
    Object.keys(recommendations.subsectionAnalysis).forEach(sectionKey => {
        const section = recommendations.subsectionAnalysis[sectionKey];
        const displayName = getSectionDisplayName(sectionKey);
        
        // Check if this section has any elevated subsections
        const elevatedSubsections = Object.keys(section).filter(subsectionKey => {
            const subsection = section[subsectionKey];
            return parseFloat(subsection.percentage) >= 30;
        });
        
        if (elevatedSubsections.length > 0) {
            hasElevatedSubsections = true;
            html += `<div class="section-analysis"><h5>${displayName.main}</h5>`;
            html += '<table class="analysis-table"><thead><tr><th>Subsection</th><th>Score</th><th>%</th><th>Category</th><th>TCM Pattern</th><th>Key Labs</th><th>Tests</th></tr></thead><tbody>';
            
            Object.keys(section).forEach(subsectionKey => {
                const subsection = section[subsectionKey];
                if (parseFloat(subsection.percentage) >= 30) {
                    html += `<tr class="category-${subsection.category.toLowerCase()}">`;
                    html += `<td><strong>${subsectionKey}</strong>: ${subsection.name}</td>`;
                    html += `<td>${subsection.score}/${subsection.maxScore}</td>`;
                    html += `<td><strong>${subsection.percentage}%</strong></td>`;
                    html += `<td><strong>${subsection.category}</strong></td>`;
                    html += `<td>${subsection.pattern}</td>`;
                    html += `<td>${subsection.keyLabs}</td>`;
                    html += `<td>${subsection.tests}</td>`;
                    html += '</tr>';
                }
            });
            
            html += '</tbody></table></div>';
        }
    });
    
    if (!hasElevatedSubsections) {
        html += '<p><em>No elevated subsections detected. All scores are below 30% threshold.</em></p>';
    }
    
    html += '</div>';

    // TCM Patterns Summary
    if (recommendations.tcmPatterns.length > 0) {
        html += '<div class="tcm-patterns"><h4>TCM Pattern Diagnosis</h4><ul>';
        recommendations.tcmPatterns.forEach(pattern => {
            html += `<li><strong>${pattern.pattern}</strong> (${pattern.category}, ${pattern.percentage}%)</li>`;
        });
        html += '</ul></div>';
    }

    // Endocrine Square Findings
    if (recommendations.endocrineSquareFindings.length > 0) {
        html += '<div class="endocrine-square"><h4>Endocrine Square Analysis</h4>';
        recommendations.endocrineSquareFindings.forEach(finding => {
            html += `<div class="square-finding">`;
            html += `<strong>${finding.pattern}:</strong> ${finding.fullName}<br>`;
            html += `Symptoms: ${finding.symptoms}<br>`;
            html += `TCM: ${finding.tcm}<br>`;
            html += `Details: ${finding.details}`;
            html += `</div>`;
        });
        html += '</div>';
    }

    // Clinical Pattern Combinations
    if (recommendations.clinicalPatterns.length > 0) {
        html += '<div class="clinical-patterns"><h4>Clinical Pattern Combinations</h4>';
        recommendations.clinicalPatterns.forEach(pattern => {
            html += `<div class="clinical-pattern">`;
            html += `<strong>${pattern.pattern}</strong><br>`;
            html += `TCM: ${pattern.tcm}<br>`;
            html += `Clinical Significance: ${pattern.clinicalSignificance}<br>`;
            html += `Reasoning: ${pattern.reasoning}`;
            html += `</div>`;
        });
        html += '</div>';
    }

    // Recommended Tests and Key Labs - Grouped by Subsection
    html += '<div class="recommended-tests"><h4>Recommended Laboratory Tests</h4>';
    
    let totalCost = 0;
    let hasRecommendations = false;
    
    // Iterate through each section and subsection
    Object.keys(recommendations.subsectionAnalysis).forEach(sectionKey => {
        const section = recommendations.subsectionAnalysis[sectionKey];
        
        Object.keys(section).forEach(subsectionKey => {
            const subsection = section[subsectionKey];
            
            // Only show if elevated (≥30%)
            if (parseFloat(subsection.percentage) >= 30) {
                hasRecommendations = true;
                
                html += `<div class="subsection-test-group">`;
                html += `<h5 class="subsection-test-header"><strong>${subsectionKey}</strong> ${subsection.name}<br><span class="subsection-subtitle">${diagnosticData[sectionKey].subsections[subsectionKey].subtitle}</span><br><span class="subsection-status">(${subsection.percentage}% - ${subsection.category})</span></h5>`;
                
                // Key Labs
                html += `<div class="key-labs-section">`;
                html += `<p class="labs-label"><strong>Key Labs to Monitor:</strong></p>`;
                html += `<p class="labs-content">${subsection.keyLabs}</p>`;
                html += `</div>`;
                
                // Recommended Test Panels
                html += `<div class="test-panels-section">`;
                html += `<p class="labs-label"><strong>Recommended Test Panels:</strong></p>`;
                html += `<ul class="test-list-with-prices">`;
                
                // Get unique tests for this subsection
                const subsectionTests = new Map();
                
                if (subsection.testCodes && Array.isArray(subsection.testCodes)) {
                    subsection.testCodes.forEach(testCode => {
                        // Find the test in the catalog
                        Object.keys(testCatalog).forEach(catalogKey => {
                            if (catalogKey === testCode || testCatalog[catalogKey].name.includes(testCode)) {
                                const test = testCatalog[catalogKey];
                                if (!subsectionTests.has(test.name)) {
                                    subsectionTests.set(test.name, test.price);
                                }
                            }
                        });
                    });
                }
                
                // Display tests with prices
                let subsectionCost = 0;
                subsectionTests.forEach((price, testName) => {
                    html += `<li><span class="test-name">${testName}</span><span class="test-price">$${price.toFixed(2)}</span></li>`;
                    subsectionCost += price;
                    totalCost += price;
                });
                
                html += `</ul>`;
                html += `<p class="subsection-subtotal">Subsection ${subsectionKey} Subtotal: <strong>$${subsectionCost.toFixed(2)}</strong></p>`;
                html += `</div>`;
                
                html += `</div>`; // Close subsection-test-group
            }
        });
    });
    
    if (!hasRecommendations) {
        html += '<p><em>No test recommendations at this time.</em></p>';
    } else {
        html += `<p class="total-cost"><strong>Estimated Total Cost: $${totalCost.toFixed(2)}</strong></p>`;
    }
    
    html += '</div>';

    container.innerHTML = html;
}

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

    Object.keys(symptomData).forEach(elementKey => {
        const element = symptomData[elementKey];
        const sectionNum = getSectionNumber(elementKey);
        const displayNames = getSectionDisplayName(elementKey);
        let symptomCounter = 0;
        
        // Initialize subsection boundaries for this section
        subsectionBoundaries[elementKey] = {};
        
        const section = document.createElement("div");
        section.className = "element-section";

        // Create header with proper format: "SECTION 1: WOOD ■" on left, "Liver & Gallbladder" on right
        const header = document.createElement("div");
        header.className = `element-header ${elementKey}-header`;
        
        const titleSpan = document.createElement("span");
        titleSpan.className = "section-title";
        titleSpan.innerHTML = `SECTION ${sectionNum}: ${displayNames.main} &#9632;`; // &#9632; is a black square
        
        const subtitleSpan = document.createElement("span");
        subtitleSpan.className = "section-subtitle";
        subtitleSpan.textContent = displayNames.sub;
        
        header.appendChild(titleSpan);
        header.appendChild(subtitleSpan);
        section.appendChild(header);

        // Create a table for all symptoms in this section
        const mainTable = document.createElement("table");
        mainTable.className = "symptoms-table";

        element.subsections.forEach((subsection, subsectionIndex) => {
            // Record the starting symptom index for this subsection
            const subsectionStart = symptomCounter + 1;
            
            // Add subsection header row
            const subsectionRow = document.createElement("tr");
            subsectionRow.className = "subsection-row";
            
            const subsectionCell = document.createElement("td");
            subsectionCell.colSpan = 2;
            subsectionCell.className = "subsection-header-cell";
            subsectionCell.textContent = subsection.title;
            
            subsectionRow.appendChild(subsectionCell);
            mainTable.appendChild(subsectionRow);

            // Add symptom rows for this subsection
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
                mainTable.appendChild(row);
            });
            
            // Record the ending symptom index and max score for this subsection
            const subsectionEnd = symptomCounter;
            const subsectionMaxScore = subsection.symptoms.length * 3;
            
            // Store with the subsection title as the key
            subsectionBoundaries[elementKey][subsection.title] = {
                start: subsectionStart,
                end: subsectionEnd,
                maxScore: subsectionMaxScore
            };
        });

        section.appendChild(mainTable);

        // Add total row
        const totalRow = document.createElement("div");
        totalRow.className = "total-row";
        
        const totalLabel = document.createElement("span");
        totalLabel.textContent = `SECTION ${sectionNum} TOTAL:`;
        
        const totalValueContainer = document.createElement("span");
        const totalInput = document.createElement("input");
        totalInput.type = "text";
        totalInput.name = `${elementKey}_total`;
        totalInput.readOnly = true;
        totalInput.value = `______ / ${maxScores[elementKey]}`;
        
        totalValueContainer.appendChild(totalInput);
        totalRow.appendChild(totalLabel);
        totalRow.appendChild(totalValueContainer);
        section.appendChild(totalRow);

        container.appendChild(section);
    });

    console.log("Subsection boundaries:", subsectionBoundaries);
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