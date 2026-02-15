// Diagnostic Logic and Lab Recommendations
// Based on 5 Element Assessment v3 - Practitioner Scoring Key

const diagnosticData = {
    wood: {
        subsections: {
            '1A': {
                name: 'Liver Qi & Emotional Regulation',
                subtitle: '[Stress / HPA / Detox]',
                maxScore: 15,
                pattern: 'Liver Qi Stagnation',
                keyLabs: 'Liver enzymes, cortisol, ALT/AST',
                tests: 'Inflammatory Triad, Hormone Panel',
                testCodes: ['Inflammatory Triad', 'Hormone Panel']
            },
            '1B': {
                name: 'Gallbladder & Bile Function',
                subtitle: '[Biliary / Fat Digestion]',
                maxScore: 18,
                pattern: 'LV-GB Damp-Heat',
                keyLabs: 'GGT, Alk Phos, bilirubin, amylase',
                tests: 'CMP, GI-MAP (steatocrit)',
                testCodes: ['CMP', 'GI-MAP']
            },
            '1C': {
                name: 'Detoxification & Hormonal Balance',
                subtitle: '[Phase I/II Detox / Estrogen]',
                maxScore: 21,
                pattern: 'LQB + Toxin Accumulation',
                keyLabs: 'Liver enzymes, E2/P4 ratio, testosterone',
                tests: 'Hormone Panel, CMP',
                testCodes: ['Hormone Panel', 'CMP']
            },
            '1D': {
                name: 'Liver-Endocrine Connection',
                subtitle: '[Thyroid-Liver Axis]',
                maxScore: 15,
                pattern: 'Wood overacting',
                keyLabs: 'Complete thyroid, sex hormones',
                tests: 'Thyroid + Hormone Panel',
                testCodes: ['Complete Thyroid', 'Hormone Panel']
            }
        }
    },
    fire: {
        subsections: {
            '2A': {
                name: 'Heart Qi & Shen (Spirit)',
                subtitle: '[Cardiovascular / Nervous System]',
                maxScore: 12,
                pattern: 'Heart-Gallbladder Def',
                keyLabs: 'Magnesium, iron, B12, folate, cortisol',
                tests: 'CBC, Iron Panel, Inflammatory',
                testCodes: ['CBC', 'Iron Panel', 'Inflammatory Triad']
            },
            '2B': {
                name: 'Heart & Circulation Rhythm',
                subtitle: '[Circadian / Central Rhythm]',
                maxScore: 15,
                pattern: 'Heart-Kidney',
                keyLabs: 'Melatonin, cortisol rhythm, DHEA',
                tests: 'Hormone Panel (melatonin)',
                testCodes: ['Hormone Panel']
            },
            '2C': {
                name: 'Small Intestine & Absorption',
                subtitle: '[Nutrient Absorption / Gut]',
                maxScore: 15,
                pattern: 'Spleen-Heart Mixed Def',
                keyLabs: 'Albumin, folate, proteins, ferritin, B12',
                tests: 'CMP, Iron Panel, GI-MAP',
                testCodes: ['CMP', 'Iron Panel', 'GI-MAP']
            }
        }
    },
    earth: {
        subsections: {
            '3A': {
                name: 'Spleen & Stomach (Upper GI)',
                subtitle: '[HCl / Gastric Integrity]',
                maxScore: 18,
                pattern: 'Stomach Yi Def/ST Heat',
                keyLabs: 'H. pylori, gastrin markers',
                tests: 'GI-MAP (H. pylori)',
                testCodes: ['GI-MAP']
            },
            '3B': {
                name: 'Pancreatic & Enzyme Function',
                subtitle: '[Exocrine / Digestive Enzymes]',
                maxScore: 18,
                pattern: 'Spleen Qi Def',
                keyLabs: 'Elastase, lipase, amylase',
                tests: 'GI-MAP (elastase critical)',
                testCodes: ['GI-MAP']
            },
            '3C': {
                name: 'Spleen Qi & Transformation',
                subtitle: '[Malabsorption / Poverty]',
                maxScore: 27,
                pattern: 'Spleen Qi Deficiency',
                keyLabs: 'Albumin, +/- lipid, proteins <6.5, CBC',
                tests: 'CMP, CBC, Iron Panel',
                testCodes: ['CMP', 'CBC', 'Iron Panel']
            }
        }
    },
    metal: {
        subsections: {
            '4A': {
                name: 'Lung Qi, Wei Qi',
                subtitle: '[Immunity / Respiratory]',
                maxScore: 15,
                pattern: 'Lung Qi Def, Wei Qi',
                keyLabs: 'WBC, lymph %, nt CD, IgA',
                tests: 'CBC + Vitamin D + GI-MAP',
                testCodes: ['CBC', 'Vitamin D', 'GI-MAP']
            },
            '4B': {
                name: 'Skin & External Expression',
                subtitle: '[Dermatological / Inflammation]',
                maxScore: 12,
                pattern: 'Lung Yin Def, Blood',
                keyLabs: 'Iron <35, +/- eosinophils, anti-thyroid Ab',
                tests: 'Inflammatory Triad, thyroid Ab',
                testCodes: ['Inflammatory Triad', 'Thyroid Ab']
            },
            '4C': {
                name: 'Large Intestine & Elimination',
                subtitle: '[Bowel / Microbiome]',
                maxScore: 18,
                pattern: 'LI excess / deficiency',
                keyLabs: 'Dysbiosis markers, opportunistic bacteria',
                tests: 'GI-MAP',
                testCodes: ['GI-MAP']
            },
            '4D': {
                name: 'Gut-Immune & Sensitivity',
                subtitle: '[Gut/Lung / Leaky Gut]',
                maxScore: 15,
                pattern: 'Lung-Spleen Disharmony',
                keyLabs: 'Zonulin, IgA',
                tests: 'GI-MAP with Zonulin',
                testCodes: ['GI-MAP with Zonulin']
            },
            '4E': {
                name: 'Grief & Emotional Regulation',
                subtitle: '[Letting Go / Loss]',
                maxScore: 6,
                pattern: 'LU Qi stagnated',
                keyLabs: 'Cortisol, IgA',
                tests: 'Hormone Panel',
                testCodes: ['Hormone Panel']
            }
        }
    },
    water: {
        subsections: {
            '5A': {
                name: 'Kidney Essence / Jing',
                subtitle: '[Jing / Bone Health]',
                maxScore: 21,
                pattern: 'Kidney Jing Deficiency',
                keyLabs: 'Sex hormones, vit D, B12, albumin',
                tests: 'Hormone Panel + Vit D + B12',
                testCodes: ['Hormone Panel', 'Vitamin D', 'B12']
            },
            '5B': {
                name: 'Urinary & Fluid Metabolism',
                subtitle: '[Urinary / Kidney]',
                maxScore: 15,
                pattern: 'KD Qi not consolidating',
                keyLabs: 'BUN, creatinine, Na, K, UA',
                tests: 'CMP + Urinalysis',
                testCodes: ['CMP', 'Urinalysis']
            },
            '5C': {
                name: 'Kidney Emotional & Sensory',
                subtitle: '[Fear / Hearing / Ear]',
                maxScore: 12,
                pattern: 'KD deficiency (combined)',
                keyLabs: 'Cortisol, DHEA, vit D',
                tests: 'Hormone Panel',
                testCodes: ['Hormone Panel']
            }
        }
    },
    endocrineUnder: {
        subsections: {
            '6A': {
                name: 'Hypothyroid Pattern',
                subtitle: '[Thyroid Hypofunction]',
                maxScore: 33,
                pattern: 'Kidney Yin Def',
                keyLabs: 'TSH, fT3, fT4, P4 low, rT3',
                tests: 'Complete Thyroid + rT3 + Antibodies',
                testCodes: ['Complete Thyroid', 'rT3', 'Inflammatory Panel']
            },
            '6B': {
                name: 'HPA — Adrenal Hypofunction',
                subtitle: '[Adrenal Fatigue]',
                maxScore: 24,
                pattern: 'KD Yang Def (adrenal)',
                keyLabs: 'Low AM cortisol, low DHEA, fat',
                tests: '4-Point Cortisol, Hormone Panel',
                testCodes: ['4-Point Cortisol', 'Hormone Panel']
            },
            '6C': {
                name: 'HYP — Hypoglycemia Pattern',
                subtitle: '[Reactive Hypoglycemia]',
                maxScore: 21,
                pattern: 'Spleen Qi Def (+ KD Yang)',
                keyLabs: 'Glucose, insulin, LOFG <5, TrigLG',
                tests: 'Glucose + Insulin + HgA1c',
                testCodes: ['Glucose', 'Insulin', 'HgA1c']
            },
            '6D': {
                name: 'HPO — Gonadal Insufficiency',
                subtitle: '[Reproductive Hypofunction]',
                maxScore: 21,
                pattern: 'Kidney Essence Deficiency',
                keyLabs: 'Estradiol <50, progesterone low, testosterone low, FSH elevated, LH, SHBG',
                tests: 'Full Reproductive Panel (E2, P4, DHEA-S, SHBG)',
                testCodes: ['FSH', 'LH', 'DHEA']
            }
        }
    },
    endocrineOver: {
        subsections: {
            '7A': {
                name: 'HPT — Hyperthyroid Pattern',
                subtitle: '[Thyroid Hyperfunction]',
                maxScore: 18,
                pattern: 'KD Yin Def / Liver Fire',
                keyLabs: 'TSH suppressed, FT3 high, low-t3T',
                tests: 'Complete Thyroid + TSI + Inflammatory Triad',
                testCodes: ['Complete Thyroid', 'TSI', 'Inflammatory Triad']
            },
            '7B': {
                name: 'HPA — Adrenal Hyperfunction',
                subtitle: '[High Stress / Cortisol]',
                maxScore: 15,
                pattern: 'Liver Fire / KD Yin Def',
                keyLabs: 'Elevated PM cortisol, low DHEA:c ratio',
                tests: '4-Point Cortisol, Hormone Panel',
                testCodes: ['4-Point Cortisol', 'Hormone Panel']
            },
            '7C': {
                name: 'HPF — Insulin Resistance',
                subtitle: '[Metabolic Syndrome]',
                maxScore: 21,
                pattern: 'Spleen Qi Def + Dampness',
                keyLabs: 'Insulin 10-UP (or 10-MG:5.7% TG), HDL',
                tests: 'Glucose + Insulin + HgA1c + Lipids',
                testCodes: ['Glucose', 'Insulin', 'HgA1c', 'Lipids']
            },
            '7D': {
                name: 'HPO — Estrogen Dominance / Andropause',
                subtitle: '[Reproductive Excess]',
                maxScore: 24,
                pattern: 'Liver Qi Stagnation + Dampness/Excess',
                keyLabs: 'Estradiol/Progesterone ratio >100:1, testosterone (high in PCOS), DHEA-S, SHBG',
                tests: 'Full Reproductive Panel (E2, P4, DHEA-S, SHBG) + Fasting Insulin',
                testCodes: ['Full Reproductive Panel', 'Fasting Insulin']
            }
        }
    }
};

// Test pricing and details
const testCatalog = {
    'Inflammatory Triad': { 
        name: 'Inflammatory Triad (hsCRP, ESR, Ferritin)', 
        price: 72 
    },
    'Hormone Panel': { 
        name: 'Hormone Panel (Cortisol, DHEA, Estradiol, Progesterone, Testosterone)', 
        price: 143 
    },
    'CMP': { 
        name: 'Comprehensive Metabolic Panel (CMP)', 
        price: 15 
    },
    'GI-MAP': { 
        name: 'GI-MAP (Gastrointestinal Microbial Assessment Profile)', 
        price: 397 
    },
    'CBC': { 
        name: 'Complete Blood Count (CBC)', 
        price: 15 
    },
    'Iron Panel': { 
        name: 'Iron Panel (Iron, Ferritin, TIBC, Transferrin)', 
        price: 27 
    },
    'Vitamin D': { 
        name: 'Vitamin D (25-OH)', 
        price: 25 
    },
    'Thyroid Ab': { 
        name: 'Thyroid Antibodies (TPO, TgAb)', 
        price: 45 
    },
    'Complete Thyroid': { 
        name: 'Complete Thyroid Panel (TSH, fT3, fT4, TPO, TgAb)', 
        price: 79 
    },
    'rT3': { 
        name: 'Reverse T3 (rT3)', 
        price: 25 
    },
    'Inflammatory Panel': { 
        name: 'Inflammatory Panel (hsCRP, ESR, Ferritin, IL-6)', 
        price: 95 
    },
    '4-Point Cortisol': { 
        name: '4-Point Cortisol (Diurnal Rhythm)', 
        price: 140 
    },
    'Glucose': { 
        name: 'Fasting Glucose', 
        price: 5 
    },
    'Insulin': { 
        name: 'Fasting Insulin', 
        price: 15 
    },
    'HgA1c': { 
        name: 'Hemoglobin A1c (HgA1c)', 
        price: 15 
    },
    'Lipids': { 
        name: 'Lipid Panel (Total Chol, LDL, HDL, Triglycerides)', 
        price: 20 
    },
    'B12': { 
        name: 'Vitamin B12', 
        price: 15 
    },
    'Urinalysis': { 
        name: 'Urinalysis (Complete)', 
        price: 10 
    },
    'GI-MAP with Zonulin': { 
        name: 'GI-MAP with Zonulin (Intestinal Permeability)', 
        price: 425 
    },
    'TSI': { 
        name: 'Thyroid Stimulating Immunoglobulin (TSI)', 
        price: 35 
    },
    'FSH': { 
        name: 'Follicle Stimulating Hormone (FSH)', 
        price: 25 
    },
    'LH': { 
        name: 'Luteinizing Hormone (LH)', 
        price: 25 
    },
    'DHEA': { 
        name: 'DHEA-S', 
        price: 35 
    },
    'Full Reproductive Panel': { 
        name: 'Full Reproductive Panel (E2, P4, DHEA-S, SHBG, Testosterone)', 
        price: 144 
    },
    'Fasting Insulin': { 
        name: 'Fasting Insulin', 
        price: 15 
    }
};

// Endocrine Square Pattern Interpretation
const endocrineSquarePatterns = {
    'HPT (6A/7A)': {
        fullName: 'Hyperthyroid—Primary-Thyroid',
        symptoms: 'Metabolic rate, intolerance, energy',
        tcm: 'Kidney Yin or Liver Fire'
    },
    'HPA (6B/7B)': {
        fullName: 'Hypoadrenal—Primary-Adrenal',
        symptoms: 'Stress responses, cortisol rhythm',
        tcm: 'Kidney Yang, Liver Qi'
    },
    'HPF (6C/7C)': {
        fullName: 'Hypoglycemic/Insulin-Pancreatic',
        symptoms: 'Blood sugar instability',
        tcm: 'Spleen Qi Def'
    },
    'HPO (6D/7D)': {
        fullName: 'Hypoovarism-Primary-Ovaries/Gonads',
        symptoms: 'Reproductive hormones, fertility',
        tcm: 'Kidney Jing, Liver Excess'
    }
};

// Clinical Pattern Combinations
const clinicalPatterns = {
    'Pure Hypo': {
        range: '6A-6D all high, 7A-7D all low',
        tcm: 'Kidney Yang + Spleen Qi Def',
        clinicalSignificance: 'Foundational/restoration: Clear focus, moderate risk. Address thyroid, adrenal, blood sugar, and reproductive underactivity.'
    },
    'Pure Hyper': {
        range: '7A-7D all high, 6A-6D all low',
        tcm: 'Liver Fire / KD Yin Def',
        clinicalSignificance: 'Excess heat pattern: Need to clear heat first. Address hyperthyroidism, excess cortisol, insulin resistance, and hormone excess.'
    },
    'Mixed (easy)': {
        range: '1-2 pairs both elevated',
        tcm: 'KD Yin-Yang Dual Def + LQS',
        clinicalSignificance: 'Mixed deficiency and excess: More complex treatment. Both hypo and hyper patterns present in 1-2 endocrine systems.'
    },
    'HPT cycling': {
        range: '6A + 7A both elevated',
        tcm: 'Hashitoxicosis',
        clinicalSignificance: 'Autoimmune thyroid: Check TPO + TgAb + TRAb. Cycling between hypo and hyperthyroidism indicates Hashimoto\'s with periodic inflammation.'
    },
    'HPA cycling': {
        range: '6B + 7B both elevated',
        tcm: 'KD cortisol rhythm disruption',
        clinicalSignificance: 'HPA axis dysregulation: 4-point cortisol essential. Fluctuating between high and low cortisol indicates circadian disruption.'
    },
    'Dysglycemia': {
        range: '6C + 7C both elevated',
        tcm: 'Spleen Qi Def + Dampness',
        clinicalSignificance: 'Blood sugar dysregulation: Reactive hypoglycemia with insulin resistance. Swings between low blood sugar and insulin resistance.'
    },
    'HPO square': {
        range: '6D + 7D both high',
        tcm: 'KD Jing + LQS',
        clinicalSignificance: 'Reproductive hormone dysregulation: Complex endocrine pattern. Both deficiency and excess in reproductive hormones.'
    },
    'Estrogen dominance': {
        range: '6D low, 7D high',
        tcm: 'Liver Qi Stagnation',
        clinicalSignificance: 'Phase 2 detox issue: E2/P4 ratio > 100:1, check estrobolome. High estrogen relative to progesterone indicates liver detox issues.'
    },
    'REP square': {
        range: '(6A or 7A) + (6D or 7D)',
        tcm: 'Kidney Jing Def + KD Yin/Liver Fire',
        clinicalSignificance: 'Thyroid-reproductive axis: Long-term pattern, complex. Interconnection between thyroid and reproductive hormones.'
    },
    'Perimenopause': {
        range: '6A + 7D both elevated',
        tcm: 'KD Jing Def + LQS',
        clinicalSignificance: 'Cycling hormones with estrogen dominance: Track over time. Low thyroid function with high estrogen relative to progesterone.'
    },
    'Female collapse': {
        range: '6A, 6B, 6C, 6D all >50%',
        tcm: 'Kidney Yang Def (49×7 cycle)',
        clinicalSignificance: 'Multi-system collapse: Identify ROOT cause, full workup. All endocrine underactivity systems severely affected, suggests systemic issue.'
    }
};

// Section Max Scores (for reference)
const sectionMaxScores = {
    wood: 69,
    fire: 42,
    earth: 63,
    metal: 66,
    water: 48,
    endocrineUnder: 99,
    endocrineOver: 78
};