// Symptom data organized by Five Elements (anonymized for assessment)
const symptomData = {
    wood: {
        name: "SECTION 1",
        displayName: "Wood Element - Liver & Gallbladder",
        color: "#4a7c59",
        description: "Rate each symptom based on your personal experience.",
        subsections: [
            {
                title: "",
                symptoms: [
                    "Irritability, anger, or frustration",
                    "Headaches (especially on sides or top of head)",
                    "Eye problems (dry eyes, blurry vision, floaters)",
                    "Muscle tension, stiffness, or spasms",
                    "Difficulty making decisions or planning ahead",
                    "Stones or poor bile flow in digestive system",
                    "Bitter metallic taste in mouth, especially in morning",
                    "Difficulty digesting fats or greasy foods",
                    "Thyroid problems (underactive or overactive)",
                    "Blood sugar swings, sugar cravings, or feeling shaky when hungry",
                    "Menstrual irregularities or PMS (for women)",
                    "Painful menstrual cramps",
                    "Low testosterone or male hormone symptoms (for men)",
                    "Rib pain or hypochondriac discomfort",
                    "Tendon problems (weakness, tightness)"
                ]
            }
        ]
    },
    fire: {
        name: "SECTION 2",
        displayName: "Fire Element - Heart & Small Intestine",
        color: "#d64545",
        description: "Rate each symptom based on your personal experience.",
        subsections: [
            {
                title: "",
                symptoms: [
                    "Anxiety, panic attacks, or restlessness",
                    "Insomnia or poor sleep patterns",
                    "Heart palpitations or irregular heartbeat",
                    "Chest tightness or discomfort",
                    "Speech difficulties (stuttering, incoherence)",
                    "Poor concentration or memory issues",
                    "Excessive sweating during the day",
                    "Difficulty absorbing, processing, or discerning information",
                    "Lower abdominal pain or cramping",
                    "Poor nutrient absorption despite good diet",
                    "Hot flashes and night sweats (for women)",
                    "Mood swings or depression during menopause",
                    "Frequent nighttime urination (for men)",
                    "Prostate enlargement or difficulty urinating (for men)"
                ]
            }
        ]
    },
    earth: {
        name: "SECTION 3",
        displayName: "Earth Element - Spleen & Stomach",
        color: "#c49b44",
        description: "Rate each symptom based on your personal experience.",
        subsections: [
            {
                title: "",
                symptoms: [
                    "Chronic fatigue or lethargy",
                    "Digestive bloating or abdominal distension",
                    "Loose stools or undigested food in stool",
                    "Weight gain or difficulty losing weight",
                    "Poor nutrient absorption (hair thinning, weak nails)",
                    "Overthinking, excessive worry, or preoccupation",
                    "Weak muscles or fatigue in limbs",
                    "Pale, sallow, or yellowish complexion",
                    "Easy bruising or bleeding",
                    "Appetite fluctuations (poor or excessive hunger)",
                    "Stomach pain, burning, or bloating after eating",
                    "Acid reflux, heartburn, or GERD",
                    "Nausea or vomiting",
                    "Sugar cravings or feeling shaky, irritable when hungry (low blood sugar)",
                    "Excessive thirst, frequent urination (high blood sugar)",
                    "Energy crashes after meals"
                ]
            }
        ]
    },
    metal: {
        name: "SECTION 4",
        displayName: "Metal Element - Lung & Large Intestine",
        color: "#9a9a9a",
        description: "Rate each symptom based on your personal experience.",
        subsections: [
            {
                title: "",
                symptoms: [
                    "Shortness of breath or shallow breathing",
                    "Frequent colds, flu, or respiratory infections",
                    "Chronic cough, wheezing, or asthma",
                    "Skin problems (dryness, eczema, acne, rashes)",
                    "Weakened immune system (frequent infections)",
                    "Sinus congestion, sinusitis, or chronic nasal issues",
                    "Excessive daytime sweating (unrelated to temperature)",
                    "Weak voice or reluctance to express oneself",
                    "Feelings of grief, sadness, or inability to let go",
                    "Constipation or irregular bowel movements",
                    "Diarrhea or loose stools",
                    "Hemorrhoids or rectal issues",
                    "Abdominal cramping or discomfort",
                    "Nasal polyps or chronic sinus infections",
                    "Poor sense of smell",
                    "Mucus in stool or excessive phlegm production",
                    "Autoimmune skin conditions (psoriasis, vitiligo)"
                ]
            }
        ]
    },
    water: {
        name: "SECTION 5",
        displayName: "Water Element - Kidney & Urinary Bladder",
        color: "#3b5998",
        description: "Rate each symptom based on your personal experience.",
        subsections: [
            {
                title: "",
                symptoms: [
                    "Lower back pain or weakness (especially in kidney area)",
                    "Fearfulness, anxiety, or persistent phobias",
                    "Hearing problems or ringing in ears",
                    "Bone or teeth problems (brittle, weak structure)",
                    "Premature graying or hair loss",
                    "Cold hands and feet or feeling cold easily",
                    "Swelling or water retention (swollen limbs, face)",
                    "Low libido or sexual dysfunction",
                    "Frequent urination or nighttime urination",
                    "Urinary incontinence or urgency",
                    "Bladder infections or UTIs",
                    "Difficulty urinating or weak stream",
                    "Extreme exhaustion or inability to handle stress",
                    "Difficulty waking up in the morning despite adequate sleep",
                    "Craving salt or salty foods",
                    "Low blood pressure or dizziness upon standing",
                    "Dark circles under eyes or puffy eyes"
                ]
            }
        ]
    }
};

// Key for practitioners (hidden from initial view)
const sectionKey = {
    "SECTION 1": "Wood Element - Liver & Gallbladder (Planning, Detoxification, Hormones)",
    "SECTION 2": "Fire Element - Heart & Small Intestine (Circulation, Spirit, Joy, Absorption)",
    "SECTION 3": "Earth Element - Spleen & Stomach (Digestion, Transformation, Nourishment)",
    "SECTION 4": "Metal Element - Lung & Large Intestine (Respiration, Immunity, Elimination)",
    "SECTION 5": "Water Element - Kidney & Urinary Bladder (Essence, Reproduction, Willpower)"
};