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