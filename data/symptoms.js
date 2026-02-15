// Symptom data organized by Five Elements (anonymized for assessment)
const symptomData = {
    wood: {
        name: "SECTION 1",
        displayName: "Wood Element - Liver & Gallbladder",
        color: "#4a7c59",
        description: "Rate each symptom based on your personal experience.",
        subsections: [
            {
                title: "1A",
                symptoms: [
                    "Irritability, anger, or frustration",
                    "Difficulty making decisions or planning ahead",
                    "Muscle tension, stiffness, or spasms",
                    "Headaches (especially on sides or top of head)",
                    "Sighing frequently"
                ]
            },
            {
                title: "1B",
                symptoms: [
                    "Difficulty digesting fats or greasy foods",
                    "Bitter or metallic taste in mouth, especially morning",
                    "Pain or tenderness under right rib cage",
                    "Greasy or high-fat foods cause distress",
                    "Stool color alternates from clay colored to normal",
                    "History of gallbladder attacks, stones, or removal"
                ]
            },
            {
                title: "1C",
                symptoms: [
                    "Acne or unhealthy skin",
                    "Excessive hair loss",
                    "Overall sense of bloating or bodily swelling",
                    "Hormone imbalances",
                    "Excessively foul-smelling sweat",
                    "Intolerance to smells, chemicals, or jewelry",
                    "Multiple chemical sensitivities"
                ]
            },
            {
                title: "1D",
                symptoms: [
                    "Thyroid problems (underactive or overactive)",
                    "Menstrual irregularities or PMS (women)",
                    "Painful menstrual cramps (women)",
                    "Low testosterone or male hormone symptoms (men)",
                    "Eye problems (dry eyes, blurry vision, floaters)"
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
                title: "2A",
                symptoms: [
                    "Heart palpitations or irregular heartbeat",
                    "Chest tightness or discomfort",
                    "Excessive sweating during the day",
                    "Speech difficulties (stuttering, word-finding)"
                ]
            },
            {
                title: "2B",
                symptoms: [
                    "Insomnia or difficulty falling asleep",
                    "Cannot stay asleep / wake frequently",
                    "Night sweats",
                    "Inability to fall into deep, restful sleep",
                    "Wake up tired despite adequate sleep hours"
                ]
            },
            {
                title: "2C",
                symptoms: [
                    "Poor nutrient absorption despite good diet",
                    "Lower abdominal pain or cramping",
                    "Difficulty absorbing or processing information",
                    "Poor concentration or memory issues"
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
                title: "3A",
                symptoms: [
                    "Stomach pain, burning, or aching 1-4 hours after eating",
                    "Heartburn when lying down or bending forward",
                    "Temporary relief from antacids, food, milk",
                    "Acid reflux, heartburn, or GERD",
                    "Excessive belching, burping, or bloating",
                    "Offensive breath"
                ]
            },
            {
                title: "3B",
                symptoms: [
                    "Sense of fullness during and after meals",
                    "Indigestion lasting 2-4 hours after eating",
                    "Undigested food found in stools",
                    "Difficulty digesting fruits and vegetables",
                    "Pain or soreness on left side under rib cage",
                    "Nausea or vomiting"
                ]
            },
            {
                title: "3C",
                symptoms: [
                    "Chronic fatigue or lethargy",
                    "Digestive bloating or abdominal distension",
                    "Loose stools or undigested food in stool",
                    "Weight gain or difficulty losing weight",
                    "Weak muscles or fatigue in limbs",
                    "Pale, sallow, or yellowish complexion",
                    "Overthinking, excessive worry, or preoccupation",
                    "Easy bruising or bleeding",
                    "Appetite fluctuations (poor or excessive hunger)"
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
                title: "4A",
                symptoms: [
                    "Frequent colds, flu, or respiratory infections",
                    "Weakened immune system (frequent infections)",
                    "Chronic cough, wheezing, or asthma",
                    "Shortness of breath or shallow breathing",
                    "Sinus congestion or chronic nasal issues"
                ]
            },
            {
                title: "4B",
                symptoms: [
                    "Skin problems (dryness, eczema, acne, rashes)",
                    "Excessive daytime sweating (unrelated to temperature)",
                    "Poor nail health or thinning hair",
                    "Dry and unhealthy skin or dandruff"
                ]
            },
            {
                title: "4C",
                symptoms: [
                    "Constipation or irregular bowel movements",
                    "Diarrhea or loose stools",
                    "Alternating constipation and diarrhea",
                    "Hemorrhoids or rectal issues",
                    "Pass large amount of foul-smelling gas",
                    "Abdominal cramping or discomfort"
                ]
            },
            {
                title: "4D",
                symptoms: [
                    "Increasing frequency of food reactions",
                    "Unpredictable food reactions",
                    "Aches, pains, swelling throughout the body",
                    "Unpredictable abdominal swelling",
                    "Frequent bloating and distention after eating"
                ]
            },
            {
                title: "4E",
                symptoms: [
                    "Feelings of grief, sadness, or inability to let go",
                    "Weak voice or reluctance to express oneself"
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
                title: "5A",
                symptoms: [
                    "Lower back pain or weakness (kidney area)",
                    "Bone or teeth problems (brittle, weak)",
                    "Premature graying or hair loss",
                    "Low libido or sexual dysfunction",
                    "Extreme exhaustion or inability to handle stress",
                    "Difficulty waking up despite adequate sleep",
                    "Low blood pressure or dizziness upon standing"
                ]
            },
            {
                title: "5B",
                symptoms: [
                    "Frequent urination or nighttime urination",
                    "Urinary incontinence or urgency",
                    "Bladder infections or UTIs",
                    "Swelling or water retention (limbs, face)",
                    "Cold hands and feet or feeling cold easily"
                ]
            },
            {
                title: "5C",
                symptoms: [
                    "Fearfulness, anxiety, or persistent phobias",
                    "Hearing problems or ringing in ears",
                    "Feeling of dread or existential anxiety",
                    "Lack of willpower or drive"
                ]
            }
        ]
    },
    endocrineUnder: {
        name: "SECTION 6",
        displayName: "Endocrine - Underactivity - Thyroid • Adrenal • Blood Sugar • Reproductive",
        color: "#8b6f47",
        description: "Rate each symptom based on your personal experience.",
        subsections: [
            {
                title: "6A",
                symptoms: [
                    "Tired / sluggish",
                    "Feel cold — hands, feet, all over",
                    "Require excessive sleep to function",
                    "Gain weight easily / weight loss resistant",
                    "Difficult, infrequent bowel movements",
                    "Depression / lack of motivation",
                    "Morning headaches that wear off during the day",
                    "Outer third of eyebrow thins",
                    "Thinning of hair on scalp or excessive hair loss",
                    "Dryness of skin and/or scalp",
                    "Mental sluggishness"
                ]
            },
            {
                title: "6B",
                symptoms: [
                    "Cannot stay asleep",
                    "Crave salt or salty foods",
                    "Slow starter in the morning",
                    "Afternoon fatigue",
                    "Dizziness when standing up quickly",
                    "Afternoon headaches",
                    "Headaches with exertion or stress",
                    "Weak nails"
                ]
            },
            {
                title: "6C",
                symptoms: [
                    "Crave sweets during the day",
                    "Irritable if meals are missed",
                    "Get light-headed if meals are missed",
                    "Eating relieves fatigue",
                    "Feel shaky, jittery, or have tremors",
                    "Depend on coffee to keep going / get started",
                    "Energy crashes after meals"
                ]
            },
            {
                title: "6D",
                symptoms: [
                    "Irregular or absent menstrual periods (women)",
                    "Diminished libido or sexual desire",
                    "Vaginal dryness or painful intercourse (women)",
                    "Difficulty conceiving or history of infertility",
                    "Hot flashes or night sweats",
                    "Mood changes — flat affect, depression, apathy",
                    "Decreased erectile function or morning erections (men)"
                ]
            }
        ]
    },
    endocrineOver: {
        name: "SECTION 7",
        displayName: "Endocrine - Overactivity - Thyroid • Adrenal • Blood Sugar • Reproductive",
        color: "#b8860b",
        description: "Rate each symptom based on your personal experience.",
        subsections: [
            {
                title: "7A",
                symptoms: [
                    "Heart palpitations or inward trembling",
                    "Increased pulse even at rest",
                    "Nervous and emotional",
                    "Night sweats",
                    "Difficulty gaining weight",
                    "Insomnia"
                ]
            },
            {
                title: "7B",
                symptoms: [
                    "Cannot fall asleep",
                    "Perspire easily",
                    "Under high amount of stress",
                    "Weight gain when under stress",
                    "Excessive perspiration with little activity"
                ]
            },
            {
                title: "7C",
                symptoms: [
                    "Fatigue after meals",
                    "Eating sweets does not relieve sugar cravings",
                    "Must have sweets after meals",
                    "Waist girth equal or larger than hip girth",
                    "Frequent urination with increased thirst",
                    "Difficulty losing weight despite effort",
                    "Increased appetite"
                ]
            },
            {
                title: "7D",
                symptoms: [
                    "Heavy or prolonged menstrual periods (women)",
                    "Breast tenderness, swelling, or fibrocystic changes",
                    "Weight gain concentrated in hips and thighs",
                    "History of fibroids, endometriosis, or ovarian cysts",
                    "Acne, oily skin, or skin breakouts",
                    "Facial hair growth or male-pattern hair changes",
                    "Irritability or rage, especially premenstrually",
                    "Gynecomastia or breast tissue development (men)"
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
    "SECTION 5": "Water Element - Kidney & Urinary Bladder (Essence, Reproduction, Willpower)",
    "SECTION 6": "Endocrine - Underactivity - Thyroid • Adrenal • Blood Sugar • Reproductive",
    "SECTION 7": "Endocrine - Overactivity - Thyroid • Adrenal • Blood Sugar • Reproductive"
};