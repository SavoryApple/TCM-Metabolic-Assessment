# TCM Metabolic Assessment

A comprehensive Traditional Chinese Medicine (TCM) metabolic assessment form based on the Five Element Theory (Wu Xing - 五行).

## Overview

This fillable assessment form helps TCM practitioners evaluate patient health through the lens of the Five Elements:
- **Wood (木)** - Liver & Gallbladder
- **Fire (火)** - Heart & Small Intestine  
- **Earth (土)** - Spleen & Stomach
- **Metal (金)** - Lung & Large Intestine
- **Water (水)** - Kidney & Bladder

## Files

- `tcm_metabolic_assessment.html` - Interactive HTML form with auto-calculating totals (can be printed as 2-page PDF)

## Features

### Structured Assessment
- **50 symptoms** organized across the 5 elements (10 symptoms per element)
- Each symptom rated 0-3 based on frequency and severity
- Auto-calculating section totals
- Patient information fields
- Date and practitioner tracking

### TCM-Aligned Content
Each element section includes:
- Associated organ systems (Zang-Fu organs)
- Characteristic emotions
- Physical manifestations
- Common imbalances

### Clinical Tools
- **Imbalance Pattern Identification**: Check boxes for excess/deficiency patterns
- **Dominant Element Tracking**: Identify which elements need most attention
- **Clinical Notes Section**: Document observations and treatment recommendations
- **Five Element Cycle Reference**: Visual guide to generating and controlling cycles

## Usage Instructions

### For Practitioners

1. **Open the Form**: Open `tcm_metabolic_assessment.html` in any modern web browser
2. **Patient Information**: Fill in patient details at the top
3. **Assessment**: Have the patient rate each symptom 0-3:
   - **0** = Never or almost never
   - **1** = Occasionally, mild (1-2x/month)
   - **2** = Frequently, moderate (1-2x/week)  
   - **3** = Constantly, severe (daily)
4. **Totals**: Section totals calculate automatically
5. **Analysis**: 
   - Identify dominant element(s) with highest scores
   - Check applicable imbalance patterns
   - Note treatment strategies in clinical notes
6. **Save/Print**: Print to PDF or save directly from browser

### Interpreting Results

**Score Interpretation:**
- **0-5**: Minimal imbalance in that element
- **6-10**: Mild imbalance, monitor
- **11-15**: Moderate imbalance, treatment recommended
- **16+**: Significant imbalance, priority treatment area

**Pattern Recognition:**
- **High scores** typically indicate excess or stagnation
- **Associated deficiency symptoms** may indicate underlying deficiency
- **Multiple high elements** suggest interactions per the Five Element cycles

### Five Element Theory Basics

**Generating Cycle (相生)**: Each element nourishes the next
- Wood → Fire → Earth → Metal → Water → Wood

**Controlling Cycle (相克)**: Each element controls another
- Wood Controls Earth | Fire Controls Metal | Earth Controls Water | Metal Controls Wood | Water Controls Fire

**Clinical Application:**
- Tonify the mother to strengthen the child (Generating Cycle)
- Sedate/drain the controlling element to reduce excess
- Consider element relationships when treating multiple imbalances

## Element Details

### Wood Element (Liver/Gallbladder)
- **Season**: Spring
- **Emotion**: Anger/Frustration
- **Tissue**: Tendons, Ligaments, Nails
- **Sense Organ**: Eyes
- **Key Functions**: Smooth flow of Qi, blood storage, planning

### Fire Element (Heart/Small Intestine)
- **Season**: Summer
- **Emotion**: Joy/Anxiety
- **Tissue**: Blood Vessels
- **Sense Organ**: Tongue
- **Key Functions**: Consciousness, circulation, discernment

### Earth Element (Spleen/Stomach)
- **Season**: Late Summer
- **Emotion**: Worry/Pensiveness
- **Tissue**: Muscles, Flesh
- **Sense Organ**: Mouth/Lips
- **Key Functions**: Transformation, transportation, nourishment

### Metal Element (Lung/Large Intestine)
- **Season**: Autumn
- **Emotion**: Grief/Sadness
- **Tissue**: Skin, Body Hair
- **Sense Organ**: Nose
- **Key Functions**: Respiration, Qi distribution, boundaries

### Water Element (Kidney/Bladder)
- **Season**: Winter
- **Emotion**: Fear
- **Tissue**: Bones, Marrow, Teeth
- **Sense Organ**: Ears
- **Key Functions**: Essence storage, reproduction, willpower

## Customization

The HTML form can be customized by editing:
- **Symptoms**: Modify the symptom descriptions in each element table
- **Styling**: Adjust CSS in the `<style>` section
- **Scoring**: Change min/max values or scoring descriptions
- **Notes**: Add additional sections as needed

## Technical Notes

- Compatible with all modern browsers (Chrome, Firefox, Safari, Edge)
- Uses HTML5 form inputs for fillable fields
- JavaScript auto-calculates totals
- Print-optimized CSS for PDF generation
- No external dependencies required

## Best Practices

1. Complete the assessment in a quiet, focused environment
2. Take time to ensure accurate symptom ratings
3. Consider timing (symptoms may vary with time of day, season, menstrual cycle)
4. Compare with previous assessments to track progress
5. Use alongside other TCM diagnostic methods (pulse, tongue, etc.)

## License

For professional TCM practice use. Please consult with qualified TCM practitioners for proper interpretation and treatment planning.

## Version

Version 1.0 - January 2026
