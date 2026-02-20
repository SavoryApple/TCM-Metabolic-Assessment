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