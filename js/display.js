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