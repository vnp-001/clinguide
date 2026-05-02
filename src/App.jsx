import { useState, useEffect, useRef } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────

const SITES = [
  {
    id: "oncology",
    label: "Oncology",
    color: "#1a6b8a",
    accent: "#e8f4f8",
    isParent: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    ),
    calculators: [
      { label: "GFR / Creatinine Clearance", url: "#calc-gfr" },
      { label: "Neutropenic Sepsis Risk (MASCC)", url: "#calc-mascc" },
      { label: "Karnofsky / ECOG Score", url: "#calc-ps" },
      { label: "Calcium Correction Calculator", url: "#calc-calcium" },
    ],
    subsites: [
      {
        id: "onco-emergencies",
        label: "Oncology Emergencies",
        guidelines: [
          {
            id: "onco-neutropenic-sepsis",
        title: "Neutropenic Sepsis (Febrile Neutropenia)",
        category: "Haematological Emergencies",
        version: "7.0",
        authors: "NUH Antimicrobial Stewardship & Oncology Teams",
        evidenceBase: "NICE CG151 | NUH Guideline REF:1538 | Review: July 2027",
        summary: "TIME-CRITICAL. Blood cultures → antibiotics within 60 minutes. Neutropenic sepsis can be fatal — give antibiotics before blood results return. Any patient receiving SACT with neutropenia potential in the last 4 weeks must be treated without waiting for FBC.",
        tags: ["Neutropenia", "Pip/Taz", "Meropenem", "MASCC", "Blood cultures", "IV→Oral switch"],
        related: [],
        calculators: [
          { label: "MASCC Risk Score", url: "https://www.mdcalc.com/calc/3967/mascc-risk-index-febrile-neutropenia", description: "Identifies low-risk febrile neutropenia — guides oral switch or early discharge" },
          { label: "Vancomycin Dosing (NUH)", url: "https://clinicalportal.nuh.nhs.uk/vancomycin", description: "NUH vancomycin dosing and monitoring calculator" },
          { label: "Gentamicin Single Dose (NUH)", url: "https://clinicalportal.nuh.nhs.uk/gentamicin", description: "Single-dose gentamicin calculator for high-risk sepsis" },
        ],
        pdfUrl: "https://www.nuh.nhs.uk/guidelines/neutropenic-sepsis",
        portalUrl: "https://clinicalportal.nuh.nhs.uk/neutropenic-sepsis",
        updated: "July 2027 (review)",
        sections: [
          {
            heading: "⚠ Critical: Treat Within 1 Hour",
            type: "alert",
            items: [
              "Take blood cultures × 2 sets BEFORE antibiotics — peripheral AND central line if present",
              "Check allergy status and previous microbiology results",
              "Give antibiotics IMMEDIATELY — do NOT wait for blood results",
              "Brief history only — full history after first dose",
              "Screening bloods + CXR + MSU",
            ],
            note: "Never start antibiotics without blood cultures — but never delay antibiotics waiting for results.",
          },
          {
            heading: "Treatment Criteria",
            type: "criteria",
            intro: "Must meet Criteria 1 AND (Criteria 2 OR 3):",
            items: [
              { label: "Criteria 1 — Neutropenia (REQUIRED)", detail: "Neutrophils <1.0 × 10⁹/L OR suspected neutropenia. Any SACT with neutropenia potential in last 4 weeks — treat without waiting for FBC. G-CSF recipients still at risk.", warning: "Pure immunotherapy regimens (pembrolizumab, nivolumab, ipilimumab, atezolizumab etc.) RARELY cause neutropenia — use High Risk Red Sepsis pathway instead if on these agents only." },
              { label: "Criteria 2 — Fever (if no Criteria 3)", detail: "Temp >38°C on one occasion (before or during admission) OR rigors / feeling cold or shivery. Patient-reported fever before admission counts. Temp 37–38°C: repeat after 1 hour." },
              { label: "Criteria 3 — Sepsis Signs (alternative to Criteria 2)", detail: "Tachycardia, hypotension, tachypnoea, or obvious infection focus (line site erythema, chest signs). Refer to High Risk Red Sepsis criteria on intranet antibiotic website." },
            ],
          },
          {
            heading: "Antibiotic Selection by Allergy",
            type: "pills",
            note: "Multi-resistant GNB risk: always use Meropenem regardless of allergy status.",
            items: [
              {
                label: "No Penicillin Allergy",
                color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                indication: "Standard first-line regimen",
                urgent: "Piperacillin/Tazobactam 4.5g IV QDS",
                exclusions: ["+ Vancomycin IV: MRSA risk or suspected line infection", "+ Gentamicin IV single dose: high-risk red sepsis or BP unresponsive to fluids", "Switch to Meropenem: multi-resistant GNB risk"],
              },
              {
                label: "Non-Severe Allergy / High-Dose MTX / Multi-resistant GNB",
                color: "#744210", bg: "#fffff0", border: "#f6e05e",
                indication: "Non-severe/delayed allergy, MTX, or GNB risk",
                urgent: "Meropenem 1g IV TDS",
                exclusions: ["+ Vancomycin IV: MRSA risk or line infection", "+ Gentamicin IV single dose: high-risk sepsis or BP unresponsive"],
              },
              {
                label: "Severe Delayed Cutaneous (SJS/TEN)",
                color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                indication: "Severe delayed-onset cutaneous reaction",
                urgent: "Ciprofloxacin 750mg PO BD (or 400mg IV TDS if unable to take oral)",
                exclusions: ["+ Vancomycin IV for ALL patients", "+ Metronidazole 500mg IV TDS: suspected abdominal sepsis", "+ Gentamicin IV single dose: high-risk sepsis", "Prior quinolone prophylaxis: discuss with microbiology first"],
              },
              {
                label: "Severe Immediate Allergy (Anaphylaxis)",
                color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                indication: "Collapse, swelling, breathing difficulties within 1h of penicillin",
                urgent: "Meropenem 1g IV TDS",
                exclusions: ["+ Vancomycin IV: MRSA risk or line infection", "Vancomycin alternative: Teicoplanin 12mg/kg IV q12h × 3, then once daily", "Red Man Syndrome is NOT a contraindication to teicoplanin"],
              },
            ],
          },
          {
            heading: "Investigations Checklist",
            type: "checklist",
            items: [
              "FBC, U&Es, LFTs, lactate, CRP",
              "Blood cultures × 2 sets: peripheral + central line (state line type on form)",
              "Chest X-ray",
              "MSU and urinalysis",
              "Stool MC&S + CDT — if symptomatic diarrhoea",
              "Oral swabs × 2: Candida + viral — if sore mouth",
              "Viral throat swab or NPA — if coryzal",
              "Sputum sample",
              "Blood gases — if clinically indicated",
            ],
          },
          {
            heading: "24–48 Hour Review",
            type: "grader",
            grades: [
              { grade: 1, label: "Neutropenic + NOT Improving", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", criteria: ["Still febrile or haemodynamically unstable", "Remains neutropenic", "No clear response to initial antibiotics"] },
              { grade: 2, label: "Neutropenic + Clinically Improving", color: "#744210", bg: "#fffff0", border: "#f6e05e", criteria: ["Apyrexial or clear trend to improvement", "Remains neutropenic", "Cultures negative or low-risk organism"] },
              { grade: 3, label: "No Longer / Never Neutropenic", color: "#276749", bg: "#f0fff4", border: "#9ae6b4", criteria: ["Neutrophils recovering above 1.0 × 10⁹/L", "Is bacterial infection still the working diagnosis?"] },
            ],
            management: [
              { grade: 1, icpi: null, items: ["Continue IV antibiotics", "FBC + U&Es daily", "Repeat blood cultures if temperature spikes", "At 48h: review all microbiology", "!!Do NOT change empiric regimen without clinical deterioration or microbiological indication", "If no response by 48–72h: see 'No Response' considerations"] },
              { grade: 2, icpi: null, items: ["Continue IV antibiotics and FBC + U&Es daily", "If cultures negative and improving → switch to oral at 24–48h (see IV→Oral section)", "Consider discharge later same day once on oral therapy", "Document IV→oral decision and stop date in notes"] },
              { grade: 3, icpi: null, items: ["If identifiable infection focus: treat per relevant NUH guideline", "If no focus and no high-risk features: consider stopping antibiotics", "Criteria to stop: apyrexial >24h, stable, no focus, negative cultures", "Use MASCC score to guide discharge decision"] },
            ],
            note: "Registrar or consultant review within 24h of admission — including weekends. Microbiology will call through positive blood cultures.",
          },
          {
            heading: "No Response at 48–72h — Consider",
            type: "list",
            groups: [
              { icon: "history", label: "Review Diagnosis", items: ["Non-infective pyrexia: disease activity, drug reaction", "Has empiric regimen been appropriate for the clinical picture?"] },
              { icon: "investigations", label: "Microbiology Review", items: ["Multi-resistant organism: review all previous microbiology; discuss with microbiology team", "Atypical pathogens: Legionella, PCP, disseminated viral infection"] },
              { icon: "referral", label: "Source Control", items: ["Ongoing focus: suspected line infection → consider line removal", "Invasive fungal infection: consider if neutropenia >10 days, prolonged steroids >3 weeks, or T-cell immunosuppressants"] },
            ],
          },
          {
            heading: "IV to Oral Switch",
            type: "grader",
            grades: [
              { grade: 1, label: "No source — low Pseudomonas risk, neutrophils recovering", color: "#276749", bg: "#f0fff4", border: "#9ae6b4", criteria: ["No identifiable infection source", "Low Pseudomonas risk", "Neutrophils recovering"] },
              { grade: 2, label: "No source — high Pseudomonas risk or profoundly neutropenic", color: "#744210", bg: "#fffff0", border: "#f6e05e", criteria: ["No identifiable infection source", "High Pseudomonas risk OR neutrophils still very low"] },
              { grade: 3, label: "Penicillin allergic — no source identified", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d", criteria: ["Documented penicillin allergy", "No identifiable infection source"] },
            ],
            management: [
              { grade: 1, icpi: null, items: ["Co-amoxiclav 625mg PO TDS", "Total course: 5 days", "HIGH RISK for C. difficile — consult microbiology if CDT-positive or previous C. diff"] },
              { grade: 2, icpi: null, items: ["Ciprofloxacin 750mg PO BD", "Total course: 5 days", "HIGH RISK for C. difficile", "Previous MRSA: discuss with microbiology before quinolone", "!!Fluoroquinolones: rare risk of long-lasting multisystem side effects — document consent"] },
              { grade: 3, icpi: null, items: ["Levofloxacin 500mg PO OD", "Total course: 5 days", "HIGH RISK for C. difficile", "!!Fluoroquinolones: rare risk of long-lasting multisystem side effects — document consent"] },
            ],
            note: "Oral choices do NOT cover all pathogens covered by IV treatment. Switch appropriate after 24–48h if MASCC low-risk.",
          },
          {
            heading: "Additional Medications & Never Do",
            type: "list",
            groups: [
              { icon: "drug", label: "Additional Medications", items: ["LRTI / atypical pathogen: add Clarithromycin (unless quinolone already prescribed)", "Oral candidiasis: Fluconazole 100mg PO daily × 14 days", "Mucocutaneous HSV: Aciclovir 400mg PO 5× daily — minimum 5 days", "G-CSF: NOT routinely indicated — see guideline for specific high-risk indications", "Haematological support: sepsis may prolong pancytopenia — consider transfusion as required"] },
              { icon: "avoid", label: "Never Do", items: ["!!NEVER give rectal medications (suppositories/enemas) — risk of bacteraemia", "!!NEVER use neutropenic sepsis pathway for pure immunotherapy regimens — use High Risk Red Sepsis pathway instead"] },
            ],
          },
        ],
      },
          {
            id: "onco-line-infection",
            title: "Central Line Infection (CVAD)",
            category: "Haematological Emergencies",
            summary: "Management of suspected and confirmed CVAD-associated bloodstream infection. Includes line salvage criteria, antibiotic lock therapy, vancomycin dosing, indications for line removal, and Candida coverage in high-risk patients.",
            tags: ["CVAD", "PICC", "Vancomycin", "Line salvage"],
            related: ["onco-neutropenic-sepsis"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/cvad-infection",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/cvad-infection",
            updated: "Jan 2025",
          },
          {
            id: "onco-dit",
            title: "Disseminated Intravascular Coagulation (DIC)",
            category: "Haematological Emergencies",
            summary: "Recognition and acute management of DIC in malignancy, including ISTH scoring, FFP/cryoprecipitate/platelet transfusion thresholds, fibrinogen targets, and triggers for haematology referral.",
            tags: ["DIC", "ISTH score", "FFP", "Fibrinogen", "Coagulopathy"],
            related: ["onco-neutropenic-sepsis", "pall-haemorrhage"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/dic",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/dic",
            updated: "Nov 2024",
          },
          {
            id: "onco-hyperviscosity",
            title: "Hyperviscosity Syndrome",
            category: "Haematological Emergencies",
            summary: "Diagnosis and emergency management of hyperviscosity in multiple myeloma and Waldenström macroglobulinaemia. Plasmapheresis indications, fluid management, and urgent haematology escalation pathway.",
            tags: ["Myeloma", "Plasmapheresis", "Paraprotein", "Waldenström"],
            related: ["onco-dit", "onco-neutropenic-sepsis"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/hyperviscosity",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/hyperviscosity",
            updated: "Sep 2024",
          },
          {
            id: "onco-hypercalcaemia",
            title: "Hypercalcaemia of Malignancy",
            category: "Metabolic Emergencies",
            summary: "Assessment and management of hypercalcaemia in cancer. Corrected calcium thresholds for treatment, IV rehydration regimens, zoledronic acid dosing (with renal adjustment), denosumab as alternative, and monitoring protocol.",
            tags: ["Zoledronic acid", "Denosumab", "Corrected calcium", "Rehydration"],
            related: ["onco-tumour-lysis", "pall-bone-pain"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/hypercalcaemia",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/hypercalcaemia",
            updated: "Mar 2025",
          },
          {
            id: "onco-tumour-lysis",
            title: "Tumour Lysis Syndrome (TLS)",
            category: "Metabolic Emergencies",
            summary: "Cairo-Bishop criteria for laboratory and clinical TLS. Risk stratification (low/intermediate/high), allopurinol and rasburicase prophylaxis protocols, aggressive IV hydration, electrolyte correction priorities, and renal replacement therapy triggers.",
            tags: ["TLS", "Rasburicase", "Allopurinol", "Hyperkalaemia", "Cairo-Bishop"],
            related: ["onco-hypercalcaemia", "onco-neutropenic-sepsis"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/tls",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/tls",
            updated: "Feb 2025",
          },
          {
            id: "onco-hyponatraemia",
            title: "Hyponatraemia in Oncology",
            category: "Metabolic Emergencies",
            summary: "Differential diagnosis of hyponatraemia in cancer patients including SIADH (chemotherapy-induced, CNS disease, pulmonary), adrenal insufficiency, and third-spacing. Correction rate limits, hypertonic saline indications, and fluid restriction protocols.",
            tags: ["SIADH", "Hypertonic saline", "Sodium correction", "Fluid restriction"],
            related: ["onco-hypercalcaemia", "onco-tumour-lysis"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/hyponatraemia",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/hyponatraemia",
            updated: "Jan 2025",
          },
          {
            id: "onco-mscc",
            title: "Malignant Spinal Cord Compression (MSCC)",
            category: "Structural & Compressive Emergencies",
            version: "3.0",
            authors: "Dr Jun Hao Lim & Dr Thomas Moore",
            evidenceBase: "NICE Guideline NG234 (September 2023)",
            summary: "Oncological emergency. Spinal cord/cauda equina compressed by tumour or vertebral collapse. ~25% are first cancer presentation. Without prompt treatment, irreversible neurological damage can result.",
            tags: ["MSCC", "Dexamethasone", "Urgent RT", "MRI spine", "SINS", "Tokuhashi", "Bilsky", "Surgery"],
            related: [],
            calculators: [
              { label: "SINS Score Calculator", url: "https://www.mdcalc.com/calc/3971/spinal-instability-neoplastic-score-sins", description: "Spinal Instability Neoplastic Score — guides surgical referral" },
              { label: "Revised Tokuhashi Score", url: "https://www.mdcalc.com/calc/2130/revised-tokuhashi-score-metastatic-spinal-sarcoma", description: "Prognosis in spinal metastases — guides treatment intensity" },
              { label: "Frankel / ASIA Classification", url: "https://www.mdcalc.com/calc/3724/asia-impairment-scale-ais", description: "Neurological injury severity classification" },
            ],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/mscc",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/mscc",
            updated: "Mar 2028 (review)",
            sections: [
              {
                heading: "⚠ Red Flags — Act Immediately",
                type: "alert",
                items: [
                  "Radicular or neuropathic pain",
                  "Limb weakness",
                  "Bladder or bowel dysfunction",
                  "Gait disturbance or falls",
                  "Numbness, paraesthesia or sensory loss",
                  "Neurological signs of cord or cauda equina compression",
                ],
                note: "95% of MSCC patients present with back pain. Any red flag in a known cancer patient demands urgent action.",
              },
              {
                heading: "Immediate Management Steps",
                type: "steps",
                items: [
                  { label: "Immobilise", detail: "Neurological symptoms OR SINS ≥7 / mechanical pain → immobilise immediately. Hard collar if cervical MSCC. Head-hold log roll C1–T4; standard log roll T5+." },
                  { label: "Analgesia", detail: "Adequate analgesia promptly — including during transfer. Consider palliative care referral if difficult pain." },
                  { label: "Bladder scan", detail: "Post-void bladder scan. Catheterise if in retention." },
                  { label: "Neurological exam", detail: "Full UL/LL power + sensory. Perineal sensation + anal tone. Repeat daily while awaiting treatment." },
                  { label: "Steroids", detail: "Dependent on cancer type — see steroid panel below. Never start steroids in suspected haematological malignancy without haematology advice first." },
                  { label: "MRI whole spine", detail: "Within 24 hours. Out-of-hours: discuss with on-call radiologist. Protocol: T1 + STIR sagittal, T1 + T2 axial through level. T2 DIXON if available. Report must include SINS + Bilsky scores." },
                ],
              },
              {
                heading: "Steroid Protocol",
                type: "grader",
                grades: [
                  { grade: 1, label: "Known Solid Cancer + Neurological Symptoms", color: "#276749", bg: "#f0fff4", border: "#9ae6b4", criteria: ["Patient has known solid tumour diagnosis", "Neurological deficit present"] },
                  { grade: 2, label: "Known Haematological Cancer", color: "#744210", bg: "#fffff0", border: "#f6e05e", criteria: ["Lymphoma, myeloma, leukaemia or other haematological malignancy", "With or without neurological symptoms"] },
                  { grade: 3, label: "New / Unknown Malignancy", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d", criteria: ["No confirmed cancer diagnosis", "MSCC may be first presentation", "?Haematological primary — caution required"] },
                  { grade: 4, label: "No Neurological Symptoms", color: "#5a5a5a", bg: "#f8f8f8", border: "#d0d0d0", criteria: ["Spinal metastasis suspected or confirmed", "No neurological deficit present"] },
                ],
                management: [
                  { grade: 1, icpi: null, items: ["!!Stat dexamethasone 16mg PO", "Then 8mg BD (am + noon)", "Offer PPI", "Wean steroids at start of definitive treatment", "Stop if MSCC excluded on MRI", "Oral/IV equivalence: 4mg PO ≈ 3.3mg IV/SC"] },
                  { grade: 2, icpi: null, items: ["!!Stat dexamethasone 20mg PO", "Offer PPI", "!!Discuss continuation with Haematology before proceeding"] },
                  { grade: 3, icpi: null, items: ["!!Discuss with oncology BEFORE starting steroids", "If ?lymphoma/myeloma: DO NOT give steroids — seek haematology advice + consider urgent biopsy first", "If approved: stat 16mg then 8mg BD as per solid cancer protocol"] },
                  { grade: 4, icpi: null, items: ["Steroids NOT routinely indicated", "Consider if severe pain — discuss with senior clinician"] },
                ],
                note: "Prolonged steroids: consider PCP prophylaxis (cotrimoxazole 480mg OD), bone protection, blood glucose monitoring, and risk of adrenal insufficiency on withdrawal.",
              },
              {
                heading: "Escalation — Who to Contact",
                type: "steps",
                items: [
                  { label: "Oncology SpR On-Call (24h)", detail: "First contact for all confirmed MSCC. Via Switchboard (NCH-based). New malignancy → also involve on-call oncology consultant." },
                  { label: "Acute Oncology Service (AOS)", detail: "QMC support: Mon–Sat 8am–4pm. Via Nervecentre → Medical Referrals → Oncology, or ext. 6103 KMH." },
                  { label: "Spinal Fellow", detail: "Via Switchboard for surgery/stability advice. Referral via referapatient.org. Especially for: de novo cancer, deteriorating neurology, spinal instability." },
                  { label: "Haematology", detail: "If suspected haematological primary. Do not start steroids until haematology has advised." },
                  { label: "Physiotherapy + OT", detail: "Nervecentre referral: PT within 24h, OT within 48h. Include spinal stability status in referral." },
                ],
              },
              {
                heading: "Treatment Decision",
                type: "pills",
                note: "Use SINS, Revised Tokuhashi, Bilsky (ESCC), and NOMS framework to guide decision. All cases must be discussed with appropriate specialists before treatment.",
                items: [
                  {
                    label: "Surgery + Post-op RT",
                    color: "#1a6b8a", bg: "#e8f4f8", border: "#90cde0",
                    indication: "Fit patient (ECOG 0–2), prognosis ≥3 months, solitary level, radio-resistant tumour",
                    urgent: "Surgery + post-op RT is superior to RT alone for preserving function and survival",
                    exclusions: ["ECOG PS >2 or significant comorbidity", "Prognosis <3 months", "Multiple levels of cord compression", "Radiosensitive malignancy (lymphoma, myeloma, SCLC, seminoma) — unless spinal instability present"],
                  },
                  {
                    label: "Urgent Radiotherapy",
                    color: "#6d4c9e", bg: "#f3effe", border: "#c4a8f0",
                    indication: "Not surgical per above criteria. Aim to treat within 24h of MSCC confirmation.",
                    urgent: "Default: 8Gy single fraction",
                    exclusions: ["Complete paraplegia ≥2 weeks + pain already controlled", "Poor overall prognosis"],
                  },
                  {
                    label: "Systemic Therapy",
                    color: "#4a7c6b", bg: "#eaf3f0", border: "#90c4b0",
                    indication: "Chemosensitive histology: high-grade lymphoma, plasma cell tumours, germ cell tumours, untreated SCLC",
                    urgent: "Preferred over RT in these tumour types",
                    exclusions: [],
                  },
                  {
                    label: "Best Supportive Care",
                    color: "#5a6474", bg: "#f5f6f8", border: "#c8cdd6",
                    indication: "Prognosis <1 month, established paralysis without pain, unfit or declining treatment",
                    urgent: null,
                    exclusions: ["Early MDT input essential: palliative care, PT/OT, orthotics", "Document spinal stability for nursing"],
                  },
                ],
              },
              {
                heading: "Scoring Tools",
                type: "scores",
                items: [
                  {
                    name: "SINS Score (Spinal Instability)",
                    interpretation: "0–6: Stable | 7–12: Indeterminate — surgical consult | 13–18: Unstable",
                    criteria: ["Location: Junctional (3), Mobile (2), Semi-rigid (1), Rigid (0)", "Mechanical pain: Yes (3), Occasional (1), None (0)", "Bone lesion: Lytic (2), Mixed (1), Blastic (0)", "Alignment: Subluxation (4), De novo deformity (2), Normal (0)", "Vertebral collapse: >50% (3), <50% (2), >50% involved no collapse (1), None (0)", "Posterolateral involvement: Bilateral (3), Unilateral (1), None (0)"],
                  },
                  {
                    name: "Revised Tokuhashi (Prognosis)",
                    interpretation: "0–8: <6 months (conservative) | 9–11: >6 months (palliative surgery) | 12–15: >1 year (excisional surgery)",
                    criteria: ["General condition (PS): Poor=0, Moderate=1, Good=2", "Extraspinal bone mets: ≥3=0, 2=1, 1=2", "Vertebral body mets: ≥3=0, 2=1, 1=2", "Mets to major organs: Unremovable=0, Removable=1, None=2", "Primary site: Lung/osteosarcoma/stomach/bladder=0 … Thyroid/breast/prostate/carcinoid=5", "Frankel palsy: Complete A/B=0, Incomplete C/D=1, None E=2"],
                  },
                  {
                    name: "Bilsky / ESCC Scale (Cord Compression)",
                    interpretation: "Grade 0–1: Bone/epidural only | Grade 2–3: Cord compression",
                    criteria: ["0: Bone-only, no epidural involvement", "1a: Epidural extension, no thecal deformation", "1b: Thecal deformation, no cord abutment", "1c: Cord abutment", "2: Cord compression — CSF visible", "3: Cord compression — no CSF visible"],
                  },
                  {
                    name: "Frankel Classification",
                    interpretation: "A = complete injury | E = normal motor function",
                    criteria: ["A: No motor or sensory below lesion", "B: Preserved sensation only", "C: Motor present but non-functional", "D: Motor functional — patient can walk", "E: Normal motor function"],
                  },
                ],
              },
              {
                heading: "Supportive Care",
                type: "list",
                groups: [
                  { icon: "immediate", label: "Mobilisation", items: ["Graded sitting → weight-bearing once stability confirmed", "Return to supine immediately if neurology or pain deteriorates", "Minimise duration of flat bed rest — stop once spine declared stable"] },
                  { icon: "management", label: "Orthoses", items: ["C2–C5 → cervical collar", "C6–T5 → cervicothoracic orthosis (CTO)", "T6–L5 → thoracolumbar spinal orthosis (TLSO)", "L2–L5 → lumbar spinal orthosis (LSO)", "Refer via Nervecentre — include stability info and reason"] },
                  { icon: "monitoring", label: "Bladder & Bowel", items: ["Consider long-term indwelling urinary catheter", "Follow EMSN neurogenic bowel pathway", "Monitor for autonomic dysreflexia (T6 and above): pounding headache + BP ↑20–40mmHg — sit up, loosen clothing, BP q15min. SBP >150: GTN 2 sprays SL or captopril 25mg SL"] },
                  { icon: "bloods", label: "VTE & Pressure Care", items: ["Prophylactic LMWH + anti-embolism stockings / IPC throughout admission", "Turn every 2–3h if bed-bound", "High-grade pressure-relieving mattress"] },
                  { icon: "referral", label: "Rehabilitation & Discharge", items: ["PT referral via Nervecentre within 24h; OT within 48h", "SMART goal-setting from day 1", "Discharge planning starts on admission — led by named individual", "Community nursing, rehabilitation, social services referrals as needed before discharge"] },
                ],
              },
            ],
          },
          {
            id: "onco-svco",
            title: "Superior Vena Cava Obstruction (SVCO)",
            category: "Structural & Compressive Emergencies",
            summary: "Clinical recognition and grading of SVCO. Emergency dexamethasone, endovascular stenting vs urgent RT decision-making, tissue diagnosis considerations, and fractionation options for palliative RT.",
            tags: ["SVCO", "Stenting", "Dexamethasone", "Urgent RT"],
            related: ["onco-mscc", "onco-pericardial-tamponade"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/svco",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/svco",
            updated: "Mar 2025",
          },
          {
            id: "onco-pericardial-tamponade",
            title: "Malignant Pericardial Effusion & Tamponade",
            category: "Structural & Compressive Emergencies",
            summary: "Recognition of haemodynamic compromise from malignant pericardial effusion. Echocardiography criteria, urgent pericardiocentesis pathway, indications for pericardial window, and post-drainage monitoring.",
            tags: ["Tamponade", "Pericardiocentesis", "Echo", "Effusion"],
            related: ["onco-svco", "onco-mscc"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/pericardial-tamponade",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/pericardial-tamponade",
            updated: "Oct 2024",
          },
          {
            id: "onco-raised-icp",
            title: "Raised Intracranial Pressure",
            category: "Structural & Compressive Emergencies",
            summary: "Management of symptomatic brain metastases and leptomeningeal disease causing raised ICP. Dexamethasone initiation and tapering, osmotherapy (mannitol/hypertonic saline), seizure prophylaxis, and urgent neurosurgical or SRS referral criteria.",
            tags: ["Brain mets", "Dexamethasone", "Mannitol", "ICP", "SRS"],
            related: ["onco-mscc", "onco-svco"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/raised-icp",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/raised-icp",
            updated: "Feb 2025",
          },
        ],
      },
      {
        id: "onco-sact-rt",
        label: "SACT & RT Toxicities",
        guidelines: [
          {
            id: "onco-mucositis",
            title: "Mucositis — Chemotherapy & Radiotherapy",
            category: "RT & SACT Toxicities",
            version: "6.0",
            authors: "Sapana Thapa (Senior Oncology Pharmacist), Lisa Mazzei, Dr Judith Christian, Sarah Lambert",
            evidenceBase: "MASCC/ISOO 2020 | Cochrane 2011 | UK Oral Management in Cancer Care 2019 | NUH Guideline 1537",
            summary: "Mucositis is inflammation of the oral mucosa caused by cytotoxic chemotherapy or ionising radiation, progressing from erythema to ulceration. It is a dose-limiting toxicity with fluoropyrimidines, anthracyclines and methotrexate. Head and neck radical RT (60–70Gy) causes significant mucositis from week 2, lasting 3–4 weeks post-treatment. Management depends on CTCAE grade, ranging from mouthwashes and analgesia through to hospital admission and enteral feeding.",
            tags: ["Mucositis", "Mouthwash", "CTCAE", "5FU", "Caphosol"],
            related: [],
            calculators: [],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/mucositis",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/mucositis",
            updated: "Feb 2028 (review)",
            sections: [
              {
                heading: "⚠ Risk Factors for Severe Mucositis",
                type: "alert",
                items: [
                  "Active smoking during chemotherapy or radiotherapy",
                  "Alcohol use during treatment",
                  "Poor oral hygiene or pre-existing mouth damage",
                  "Mucositis with previous cycle of treatment",
                  "Previous gastritis",
                  "Impaired immune status",
                ],
                note: "Identify and address modifiable risk factors at treatment initiation.",
              },
              {
                heading: "CTCAE Grading",
                type: "grader",
                grades: [
                  { grade: 1, label: "Grade 1 — Mild", color: "#276749", bg: "#f0fff4", border: "#9ae6b4", criteria: ["Asymptomatic or mild symptoms", "Normal diet maintained", "Erythema only on examination"] },
                  { grade: 2, label: "Grade 2 — Moderate", color: "#744210", bg: "#fffff0", border: "#f6e05e", criteria: ["Moderate pain", "Not interfering with oral intake", "Modified diet indicated"] },
                  { grade: 3, label: "Grade 3 — Severe", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d", criteria: ["Severe pain", "Interfering with oral intake", "Ulceration present"] },
                  { grade: 4, label: "Grade 4 — Life-threatening", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", criteria: ["Life-threatening consequences", "Urgent intervention required", "Unable to maintain nutrition/hydration"] },
                ],
                management: [
                  {
                    grade: 1,
                    icpi: "Continue treatment — monitor closely",
                    items: [
                      "Normal saline or water mouthwash 10ml QDS — vigorous 'ballooning and sucking' motion for ≥30 seconds",
                      "Avoid chlorhexidine mouthwash — no evidence of superiority over saline and may increase mucosal irritation",
                      "Bonjela PRN or Orabase applied to mouth ulcers (if not contraindicated)",
                      "Paracetamol 1g QDS regularly — add oral opioid if needed",
                      "Consider benzydamine mouthwash 15ml QDS or antacid + oxetacaine suspension 5–10ml sipped slowly QDS before meals",
                      "Advise patient: oxetacaine contains local anaesthetic — avoid hot food immediately after use",
                      "Consider benzydamine 0.15% oromucosal spray if specific areas affected",
                      "Monitor nutritional status and hydration — consider admission if worsening",
                    ],
                  },
                  {
                    grade: 2,
                    icpi: "Continue — consider admission if unable to maintain oral intake",
                    items: [
                      "All measures from Grade 1 above",
                      "!!Caphosol 4–10 times daily: mix 15ml phosphate solution (A) + 15ml calcium solution (B), rinse 1 minute and spit. OR dispersible tablet in 50ml water, swish half then half, spit each.",
                      "Gelclair one sachet TDS or as needed: mix with 40ml water and rinse, or apply neat to mucosa — forms bioprotective barrier over exposed nerve endings",
                      "Episil spray 2–3 times daily to affected areas — adheres to mucosa, forms mechanical barrier for pain relief",
                      "Instillagel® (lidocaine + chlorhexidine gel) to anterior oral cavity — head and neck patients, consultant recommendation only (unlicensed indication)",
                      "Apply barrier preparations after mouthwashes — leave 30 minutes between different mouthwashes and before food/drink",
                      "Gelclair may be started at Grade 1 for H&N radiotherapy patients if mucositis expected to rapidly progress",
                    ],
                  },
                  {
                    grade: 3,
                    icpi: "Consider dose reduction or treatment delay — discuss with registrar/consultant",
                    items: [
                      "!!Consider hospital admission if pain, hydration, or nutritional needs cannot be managed as outpatient",
                      "!!Assess for oral candidiasis — high risk at Grade 3. If present: systemic antifungals only (topical not effective at this grade)",
                      "Review oral medication compliance — switch to liquid/soluble/topical preparations where possible",
                      "All Grade 1–2 mouthcare measures continue — benzydamine frequency may be increased to up to 10 times/day (dilute if causing irritation)",
                      "!!Discuss with senior regarding enteral or parenteral feeding — refer to dietician",
                      "Discuss dose reduction for next cycle with registrar or consultant",
                    ],
                  },
                  {
                    grade: 4,
                    icpi: "Treatment delay/hold — urgent consultant review",
                    items: [
                      "!!Admit to hospital",
                      "!!Urgent intervention — nutritional and hydration support",
                      "All Grade 3 measures apply",
                      "Manage oral infection as per infection section",
                    ],
                  },
                ],
              },
              {
                heading: "Prevention",
                type: "list",
                groups: [
                  {
                    icon: "management", label: "General Oral Hygiene — All Patients",
                    items: [
                      "Dental review before chemotherapy starts — address any oral hygiene issues",
                      "Soft toothbrush + fluoride toothpaste twice daily — replace toothbrush monthly",
                      "If brushing too painful: children's 6+ fluoride toothpaste/gel with baby toothbrush",
                      "Rinse mouth with water after meals",
                      "Saline or water mouthwash from day 1 of treatment — use at different time to brushing",
                      "Dentures: clean after each meal, soak overnight in usual solution in closed container",
                      "Maintain good nutrition and hydration — avoid hot, rough, sharp, hard foods",
                      "Stop smoking and reduce alcohol intake during treatment",
                    ],
                  },
                  {
                    icon: "drug", label: "5-FU Bolus — Cryotherapy",
                    items: [
                      "Chew ice cubes/chips for 30 minutes, starting 5 minutes before 5-FU administration",
                      "Reduces vascular delivery of cytotoxic to oral epithelium",
                      "Must be discussed with and approved by the responsible consultant prior to initiation",
                    ],
                  },
                  {
                    icon: "drug", label: "Head & Neck Radiotherapy — Additional Prevention",
                    items: [
                      "Caphosol QDS: 15ml solution A + 15ml solution B, rinse 1 minute and spit — lubricates mucosa and promotes mucosal repair",
                      "Benzydamine mouthwash: recommended for prevention in H&N patients receiving chemo-RT",
                    ],
                  },
                ],
              },
              {
                heading: "Oral Infection Management",
                type: "callouts",
                panels: [
                  {
                    label: "Fungal Infection (Candidiasis)",
                    color: "#744210",
                    headerBg: "#fffff0",
                    blocks: [
                      {
                        icon: "drug", heading: "Treatment — Grade 1/2", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: [
                          "Fluconazole 50mg OD orally for 7–14 days",
                          "Increase to 100mg OD if immunocompromised",
                          "Consider syrup formulation if unable to swallow capsules",
                          "Monitor LFTs during fluconazole treatment",
                          "Seek microbiology advice if fluconazole not effective",
                          "Consider prophylactic antifungals if repeated oral candidiasis",
                        ],
                      },
                      {
                        icon: "drug", heading: "Treatment — Grade 3", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: [
                          "!!Fluconazole 100mg OD orally or 100mg OD IV",
                          "Resistant candidiasis: seek microbiology advice",
                          "Continue mouthwashes and analgesia throughout",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Herpes Simplex (HSV) Infection",
                    color: "#742a2a",
                    headerBg: "#fff5f5",
                    blocks: [
                      {
                        icon: "drug", heading: "Treatment — Grade 1/2", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "Aciclovir 200mg 5 times daily orally for 5 days",
                          "Increase to 400mg 5 times daily if immunocompromised",
                          "Consider prophylactic antivirals for repeated herpes infection",
                        ],
                      },
                      {
                        icon: "drug", heading: "Treatment — Grade 3", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "!!Aciclovir 200mg 5 times daily orally (or 5mg/kg TDS IV)",
                          "Immunocompromised: increase to 400mg 5 times daily orally (or 10mg/kg TDS IV)",
                          "Continue mouthwashes and analgesia",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Anaerobic Bacterial Infection",
                    color: "#1a6b8a",
                    headerBg: "#e8f4f8",
                    blocks: [
                      {
                        icon: "drug", heading: "Treatment — Grade 3", color: "#1a6b8a", bg: "#e8f4f8", border: "#90cde0",
                        items: [
                          "Metronidazole 400mg TDS orally (or 500mg TDS IV)",
                          "Continue mouthwashes and analgesia",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "onco-chemo-rt-diarrhoea",
            title: "Chemotherapy & RT-Associated Diarrhoea",
            category: "RT & SACT Toxicities",
            version: "1",
            authors: "Ian Purcell (Specialist Pharmacist), Annette Clarkson, Dr Ivo Hennig, Christopher Pudney, Junaid Mobeen",
            evidenceBase: "NUH Guideline 1837 | BCCA Guidelines | NCI CTCAE v5 | ESMO 2017 | Review: May 2023",
            summary: "CTCAE-graded management of diarrhoea post-SACT or radiotherapy. Key decision points: categorise SACT type first (immunotherapy requires different pathway — see irAE section); exclude infection (CDiff, neutropenic sepsis); grade severity to guide loperamide, codeine, octreotide, and admission decisions. Fluoropyrimidines (capecitabine, 5-FU) and irinotecan require specific additional management. Grade 3–4 always requires admission.",
            tags: ["Diarrhoea", "Loperamide", "Octreotide", "Irinotecan", "Capecitabine", "5-FU", "CTCAE", "CDiff", "Radiation proctitis", "DPYD"],
            related: ["onco-neutropenic-sepsis", "onco-mucositis"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/chemo-rt-diarrhoea",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/chemo-rt-diarrhoea",
            updated: "May 2023 (review)",
            sections: [
              {
                heading: "CTCAE Grading (NCI v5)",
                type: "grader",
                grades: [
                  { grade: 1, label: "Grade 1 — Mild", color: "#276749", bg: "#f0fff4", border: "#9ae6b4", criteria: ["<4 loose stools/day above baseline", "Mild increase in ostomy output"] },
                  { grade: 2, label: "Grade 2 — Moderate", color: "#744210", bg: "#fffff0", border: "#f6e05e", criteria: ["4–6 loose stools/day above baseline", "Moderate increase in ostomy output", "Limiting instrumental ADLs"] },
                  { grade: 3, label: "Grade 3 — Severe", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d", criteria: ["≥7 loose stools/day above baseline", "Hospitalisation indicated", "Limiting self-care ADLs"] },
                  { grade: 4, label: "Grade 4 — Life-threatening", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", criteria: ["Life-threatening consequences", "Urgent intervention indicated"] },
                ],
                management: [
                  { grade: 1, icpi: null, items: ["If receiving irinotecan: loperamide 4mg PO first dose then 2mg every 2 hours — continue ≥12h after last loose stool. Consider early admission if not settling at 24h", "All others: increase clear fluid intake, low residue diet, avoid milk", "Loperamide 4mg first dose then 2mg every 2h (max 16mg/day) if lasting >12–24h", "Review all medications — stop laxatives, prokinetics (metoclopramide/domperidone)", "!!Caution: do NOT give rectal medications in neutropenic patients"] },
                  { grade: 2, icpi: null, items: ["Loperamide 4mg first dose then 2mg every 2h (max 16mg/day)", "If loperamide insufficient: add codeine phosphate 30mg PO every 6h (increase to 60mg if needed)", "If not responding to loperamide + codeine after 24h: consider hospital admission for IV hydration", "Ensure bloods: FBC, U&Es, LFTs, bone, magnesium, CRP + stool CDiff toxin and MC&S", "Fluoropyrimidines (capecitabine/5-FU): discuss with oncology registrar or consultant re stopping or continuing. Grade 2 — some may need admission", "Assess fluid status — dehydrated patients need IV fluids"] },
                  { grade: 3, icpi: null, items: ["!!Admit to hospital for IV hydration and fluid/electrolyte management", "Stop any ongoing infusional or oral cytotoxic (especially capecitabine — store supply securely)", "Loperamide 2–4mg PO 4–8 times/day; if not improving in 24h add codeine 60mg PO QDS", "SC codeine if oral not tolerated (without abdominal distension)", "Consider octreotide 300 micrograms SC infusion over 24h — discuss with registrar/consultant", "Strict fluid balance chart, stool chart, daily weights", "Nil by mouth until symptoms settle (sips for medication)", "Bloods daily for first 72h: FBC, U&Es, LFTs, bone, magnesium (monitor for neutropenia, AKI, electrolytes)", "Stool CDiff toxin + MC&S urgently", "Abdominal pain + tenderness: erect CXR + AXR to exclude free gas/dilated loops — surgical/gastro consult if needed", "Withhold all non-vital oral medication; use parenteral antiemetics and analgesia (avoid prokinetics)", "Consider NG tube and urinary catheter to manage fluid balance (infection risk if neutropenic)", "Parenteral nutrition from day 5 if no oral improvement — via nutrition team only", "Review anti-diarrhoeals within 12h of last loose stool — continuing after resolution risks severe ileus"] },
                  { grade: 4, icpi: null, items: ["As grade 3 — urgent", "Arterial blood gases if metabolic acidosis suspected", "Central IV access after 72h if no improvement or difficult IV access (double lumen; discuss tunnelled vs standard)", "Surgical + gastroenterology review if abdominal distension, tenderness, blood PR, or haemodynamic instability", "Dose reduction for next cycle if grade 3–4 diarrhoea or admission required"] },
                ],
                note: "Review anti-diarrhoeals daily — continuation after diarrhoea resolves can cause severe ileus.",
              },
              {
                heading: "Step 1 — Categorise SACT Type",
                type: "list",
                groups: [
                  { icon: "immediate", label: "Immunotherapy alone (checkpoint inhibitors)", items: ["ipilimumab, pembrolizumab, nivolumab, durvalumab, avelumab, atezolizumab, cemiplimab", "!!Different management pathway — see Immunotherapy Toxicity (irAE) section", "Discuss ALL cases with senior oncology clinician"] },
                  { icon: "management", label: "Immunotherapy + cytotoxic combination", items: ["Apply irAE pathway AND standard diarrhoea pathway in parallel", "Neutropenic sepsis must be excluded first if on cytotoxics — check neutrophil count"] },
                  { icon: "drug", label: "Fluoropyrimidines (5-FU, capecitabine, tegafur)", items: ["See fluoropyrimidine-specific section below", "Consider DPD deficiency (DPYD status should be known before starting — check NUH SOP)", "If DPYD unknown/partial/mutant: consider uridine triacetate if criteria met"] },
                  { icon: "drug", label: "Tyrosine kinase inhibitors (TKIs)", items: ["Afatinib, imatinib, sunitinib, pazopanib, sorafenib, gefitinib, erlotinib (not exhaustive)", "Usually mild–moderate; early intervention reduces dose reductions", "Manage as below + consult individual medicine prescribing guidelines"] },
                  { icon: "management", label: "Hormonal agents alone (abiraterone, enzalutamide)", items: ["Neutropenic sepsis unlikely — point on fever/neutropenia less relevant", "Manage with standard supportive measures as below"] },
                ],
              },
              {
                heading: "Exclude Infection First",
                type: "list",
                groups: [
                  { icon: "immediate", label: "Fever ≥38°C with diarrhoea", items: ["Patient could be neutropenic — treat as neutropenic sepsis", "Admit to SRU or oncology ward as emergency", "Stool for CDiff toxin + MC&S as potential infection source", "AXR in addition to CXR", "Close monitoring of fluid balance"] },
                  { icon: "investigations", label: "Suspected infective diarrhoea", items: ["Consider CDiff if: on or received antibiotics in last 4 weeks, or previous CDiff positive", "Send stool MC&S and CDiff toxin", "Maintain adequate hydration — may require admission", "If CDiff confirmed: stop antibiotics if possible; manage per NUH CDiff guideline (available on antibiotic website)", "If severe CDiff suspected: start PO/NG vancomycin 250–500mg QDS empirically"] },
                  { icon: "management", label: "Before starting anti-diarrhoeals", items: ["Exclude overflow diarrhoea from severe constipation", "Check all medications contributing to diarrhoea (laxatives, antacids, prokinetics)", "Risk assess CDiff before starting loperamide if infective cause not excluded"] },
                ],
              },
              {
                heading: "Radiation Diarrhoea — Specific Management",
                type: "callouts",
                panels: [
                  {
                    label: "Acute Radiation Enteritis",
                    color: "#744210",
                    headerBg: "#fffff0",
                    blocks: [
                      {
                        icon: "management", heading: "Acute enteritis (during/after RT)", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: [
                          "Symptoms usually develop from week 2 of RT, lasting until 2 weeks post-completion",
                          "More severe with prior abdominal surgery or large small bowel volume in field",
                          "Exclude infection first; exclude overflow constipation; review contributing medications",
                          "Low residue diet, increased clear fluids, avoid milk and dairy",
                          "Grade 1–2: loperamide 4mg then 2mg every 2h (max 16mg/day)",
                          "Prostate RT only: consider ispaghula husk (Fybogel) sachets to reduce constipation risk",
                          "Grade 1–2 not responding to loperamide: add codeine 30–60mg PO every 6h",
                          "Not responding to loperamide + codeine at 24h: consider admission for IV hydration",
                          "Consider octreotide 100–150mcg SC TDS or 300–500mcg SC infusion over 24h (after discussion with registrar/consultant)",
                          "Grade 3–4: admit; IV hydration; loperamide + codeine as above; consider octreotide 150mcg SC TDS increasing to 300–500mcg SC TDS if no improvement at 24h (max 1500mcg/24h via syringe driver)",
                          "!!Radiotherapy should be stopped for grade 3–4 diarrhoea",
                          "Review anti-diarrhoeals at least 12h after last loose stool — ileus risk if continued",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Acute Radiation Proctitis",
                    color: "#7b341e",
                    headerBg: "#fff5f0",
                    blocks: [
                      {
                        icon: "management", heading: "Acute proctitis (during/after RT)", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: [
                          "Symptoms: tenesmus, diarrhoea, occasional rectal bleeding — from week 2, lasting until 2 weeks post-completion",
                          "More severe with in-situ rectal cancer or pre-existing proctitis",
                          "Low residue diet, avoid alcohol",
                          "Stool softeners if pain on defecation and diarrhoea not severe",
                          "Stop enemas — consider proctosedyl ointment",
                          "!!Do NOT use sucralfate — ineffective and may worsen proctitis symptoms",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Late Radiation Effects",
                    color: "#1a6b8a",
                    headerBg: "#e8f4f8",
                    blocks: [
                      {
                        icon: "referral", heading: "Chronic radiation enteritis", color: "#1a6b8a", bg: "#e8f4f8", border: "#90cde0",
                        items: [
                          "More likely: small bowel dose ≥45Gy in 2Gy fractions, post-op adhesions, or pre-existing IBD",
                          "Can manifest months–years after RT: abdominal pain, perforations/fistulas, bowel obstruction, chronic diarrhoea, rectal bleeding, faecal incontinence",
                          "Refer to gastroenterologist with special interest in radiation enteritis",
                        ],
                      },
                      {
                        icon: "referral", heading: "Chronic radiation proctitis", color: "#1a6b8a", bg: "#e8f4f8", border: "#90cde0",
                        items: [
                          "Develops ≥6 months post-RT: tenesmus, diarrhoea, rectal bleeding, stricture",
                          "Proctoscopy: haemorrhagic/oedematous mucosa, occasionally ulceration or stricture",
                          "Refer to gastroenterologist with special interest for all cases",
                          "If severe inflammation present: manage as acute proctitis",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "onco-chemo-rt-nausea",
            title: "Chemotherapy-Induced Nausea & Vomiting (CINV)",
            category: "RT & SACT Toxicities",
            version: "7",
            authors: "Lisa Mazzei, Specialist Clinical Pharmacist, Oncology and Radiotherapy",
            evidenceBase: "NUH Guideline 1490 | ASCO 2017 | MASCC/ESMO 2016 | NCCN 2019 | Review: February 2028",
            summary: "Select antiemetic regimen based on the emetogenic tier of the highest-risk agent in the regimen. Four tiers: High (>90% emesis without prophylaxis — cisplatin, AC regimens, ABVD), Moderate (30–90% — carboplatin, oxaliplatin, irinotecan), Low (10–30% — docetaxel, paclitaxel, gemcitabine), Minimal (<10% — trastuzumab, checkpoint inhibitors, vinorelbine IV). Pre-chemotherapy antiemetics are mandatory for high/moderate risk. Assess and document CTCAE grade after every cycle.",
            tags: ["CINV", "Nausea", "Vomiting", "Ondansetron", "Dexamethasone", "NK1 antagonist", "Aprepitant", "Olanzapine", "Metoclopramide", "Emetogenic risk", "Anticipatory", "Breakthrough"],
            related: ["onco-chemo-rt-diarrhoea", "onco-mucositis"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/cinv",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/cinv",
            updated: "February 2028 (review)",
            sections: [
              {
                heading: "Types of CINV — Identify Before Treating",
                type: "cinv_types",
                types: [
                  {
                    key: "acute",
                    label: "Acute",
                    timing: "Within 24 hours of chemotherapy",
                    definition: "Occurs within 24h of chemotherapy administration, normally peaking at 5–6 hours. Antiemetic therapy must be started BEFORE chemotherapy and cover the full first 24 hours.",
                    notes: [
                      "!!Start antiemetics before chemotherapy — pre-emptive dosing is essential",
                      "Cover must extend through the first 24 hours post-administration",
                    ],
                  },
                  {
                    key: "delayed",
                    label: "Delayed",
                    timing: "24 hours to 7 days post-chemotherapy",
                    definition: "Begins at least 24 hours after chemotherapy and can last up to 7 days. Most commonly associated with cisplatin (peak intensity 48–72h), carboplatin, cyclophosphamide, and anthracyclines.",
                    notes: [
                      "Prophylactic oral antiemetics given regularly — dexamethasone is particularly effective for delayed CINV",
                      "Ensure patients are discharged with adequate post-chemo antiemetics prescribed",
                    ],
                  },
                  {
                    key: "anticipatory",
                    label: "Anticipatory",
                    timing: "Hours to days before chemotherapy",
                    definition: "A conditioned response occurring before chemotherapy begins. More common following poor emesis control with previous cycles — prevention of acute and delayed CINV is the best way to reduce anticipatory CINV.",
                    notes: [
                      "Lorazepam 1–2mg at night on the day before chemo — can be added to any regimen",
                      "!!Do not use lorazepam as a single agent for emesis control",
                    ],
                  },
                  {
                    key: "breakthrough",
                    label: "Breakthrough & Refractory",
                    timing: "Despite standard antiemetic therapy",
                    definition: "Breakthrough: nausea/vomiting occurring despite standard prophylaxis, requiring additional rescue antiemetic. Refractory: occurs despite both standard and rescue antiemetic treatment.",
                    notes: [
                      "Assess and document CTCAE grade after every chemotherapy cycle",
                      "Adjust antiemetic regimen before the next cycle based on prior experience",
                      "Consider patient-specific risk factors when escalating (see Risk Factors section)",
                    ],
                  },
                ],
              },
              {
                heading: "Patient Risk Factors",
                type: "list",
                groups: [
                  {
                    icon: "immediate", label: "Factors that increase CINV risk",
                    items: [
                      "Age <50 years",
                      "Female sex",
                      "History of motion sickness",
                      "Pregnancy-related sickness",
                      "Poor antiemetic control with previous chemotherapy",
                      "Poor quality of life",
                      "Concomitant radiotherapy",
                      "Metabolic or electrolyte disturbances",
                      "Constipation",
                      "Other medications: opioids, antimicrobials, antidepressants, iron supplements",
                      "Brain or liver metastases",
                    ],
                  },
                  {
                    icon: "management", label: "Factors that reduce CINV risk",
                    items: [
                      "Male sex",
                      "History of heavy alcohol intake",
                    ],
                  },
                ],
              },
              {
                heading: "Antiemetic Regimens by Emetogenic Risk",
                type: "cinv_regimens",
                note: "Choose regimen based on the highest-risk agent in the regimen. Common causative agents shown — for full drug lists see Emetogenic Risk Reference below. If drug not listed, consult Pharmacy.",
                tiers: [
                  {
                    key: "high",
                    label: "High Emetic Risk — >90% without prophylaxis",
                    agents: "cisplatin, AC/EC/FEC regimens, ABVD, dacarbazine, carmustine, cyclophosphamide ≥1500mg/m²",
                    pre: [
                      "Dexamethasone 8mg IV",
                      "Ondansetron‡ 8mg PO or IV",
                      "NK1 antagonist 60 min prior — standard for cisplatin ≥70mg/m², anthracycline/cyclophosphamide combinations, ABVD, BEP, T-BEP, PEP:",
                      "  · Akynzeo® (netupitant 300mg/palonosetron 0.5mg) — single PO dose",
                      "  · Aprepitant 125mg PO",
                      "  · Fosaprepitant 150mg IV",
                    ],
                    post: [
                      "Metoclopramide 10mg TDS PO for 5 days  OR  Domperidone 10mg TDS PO for 7 days (if <40 years)",
                      "Dexamethasone 4mg BD (morning + lunchtime) PO for 3 days",
                    ],
                    second: [
                      "Add ondansetron 8mg BD PO × 3 days post-chemo",
                      "Increase pre-chemo ondansetron to 16mg IV (if <75 years), or add second 8mg IV dose on day of chemo",
                      "Increase dexamethasone IV to 16mg (max 12mg if combined with NK1); extend PO course to 5 days",
                      "Add olanzapine 10mg PO day of chemo + days 2–4; consider 5mg if sedation is a concern — substitute for metoclopramide",
                      "Alternatives to metoclopramide: cyclizine 50mg TDS PO, levomepromazine up to 6mg QDS PO — do not duplicate dopaminergic cover",
                      "Granisetron 1mg BD PO PRN up to 7 days in place of ondansetron",
                      "SC via syringe driver: cyclizine 150mg/24hr or levomepromazine 12.5–25mg/24hr",
                    ],
                    notes: "‡ Omit ondansetron and all 5-HT3 antagonists for 5 days following Akynzeo® administration (contains palonosetron). NK1 antagonist not yet added — consider if vomiting not controlled.",
                  },
                  {
                    key: "moderate",
                    label: "Moderate Emetic Risk — 30–90% without prophylaxis",
                    agents: "carboplatin, oxaliplatin, irinotecan, epirubicin, doxorubicin, cyclophosphamide <1500mg/m², temozolomide",
                    pre: [
                      "Dexamethasone 8mg IV",
                      "Ondansetron 8mg IV or PO",
                    ],
                    post: [
                      "Metoclopramide 10mg TDS PO × 3 days, then 10mg TDS PRN up to 5 days total  OR  Domperidone 10mg TDS PO × 3 days then PRN up to 7 days total (if <40 years)",
                      "Dexamethasone 4mg BD (morning + lunchtime) PO × 3 days",
                    ],
                    second: [
                      "Consider NK1 antagonist addition for carboplatin ≥AUC 4",
                      "See high emetic risk second-line options above",
                      "!!Olanzapine NOT recommended for moderate emetogenic risk regimens — insufficient evidence",
                    ],
                    notes: "For carboplatin ≥AUC 4: consider treating as high risk tier and adding NK1 antagonist upfront if patient has prior CINV history or multiple risk factors.",
                  },
                  {
                    key: "low",
                    label: "Low Emetic Risk — 10–30% without prophylaxis",
                    agents: "docetaxel, paclitaxel, gemcitabine, fluorouracil, pemetrexed, capecitabine (oral), etoposide",
                    pre: [
                      "Dexamethasone 8mg IV",
                      "No 5-HT3 antagonist routinely required",
                    ],
                    post: [
                      "Metoclopramide 10mg TDS PRN PO up to 5 days  OR  Domperidone 10mg TDS PRN PO up to 7 days (if <40 years)",
                    ],
                    second: [
                      "Add ondansetron 8mg PO or IV to pre-chemo",
                      "Switch from PRN to regular metoclopramide or domperidone post-chemo",
                      "Add dexamethasone 4mg BD PO × 3 days post-chemo",
                      "Alternatives to metoclopramide: cyclizine 50mg TDS PO, levomepromazine up to 6mg QDS PO",
                      "Granisetron 1mg BD PO PRN up to 7 days instead of ondansetron",
                    ],
                    notes: "Pre-chemo dexamethasone is the only routine pre-medication for low-risk regimens. Escalate promptly if PRN post-chemo antiemetics are being used regularly.",
                  },
                  {
                    key: "minimal",
                    label: "Minimal Emetic Risk — <10% without prophylaxis",
                    agents: "trastuzumab, checkpoint inhibitors (pembrolizumab, nivolumab), rituximab, vincristine, vinorelbine IV, bleomycin",
                    pre: [
                      "No prophylactic antiemetics required for patients without prior history of nausea/vomiting",
                    ],
                    post: [
                      "Metoclopramide 10mg TDS PRN PO up to 5 days  OR  Domperidone 10mg TDS PRN PO up to 7 days (if <40 years)",
                    ],
                    second: [
                      "Add dexamethasone 8mg PO or IV pre-chemo",
                      "Switch from PRN to regular metoclopramide or domperidone",
                    ],
                    notes: "If patient has prior CINV history or multiple patient-specific risk factors, consider stepping up to low-risk regimen at first cycle.",
                  },
                ],
              },
              {
                heading: "Individual Antiemetic Drug Notes",
                type: "callouts",
                panels: [
                  {
                    label: "NK1 Antagonists (Aprepitant / Fosaprepitant / Akynzeo®)",
                    color: "#742a2a",
                    headerBg: "#fff5f5",
                    blocks: [
                      {
                        icon: "drug", heading: "When to use", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "Standard: cisplatin-containing regimens ≥70mg/m², anthracycline/cyclophosphamide combinations",
                          "Consider adding: regimens marked * in high-risk table, carboplatin ≥AUC 4",
                          "Akynzeo® (netupitant 300mg/palonosetron 0.5mg): single oral dose pre-chemo",
                          "Aprepitant: 125mg PO day 1, 80mg PO days 2–3",
                          "Fosaprepitant: 150mg IV day 1 (pro-drug); if chemo >3 days add aprepitant 80mg from day 4 — consultant request only",
                          "!!Omit ondansetron/5-HT3 antagonists for 5 days after Akynzeo® (palonosetron content)",
                        ],
                      },
                      {
                        icon: "avoid", heading: "Key interactions & cautions", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "Dexamethasone dose reduction: reduce oral dex by ~50% on days 1–2 when co-prescribed (not routinely needed at doses in this guideline — caution with high-dose pre-medication e.g. paclitaxel)",
                          "Methylprednisolone: reduce IV dose ~25%, oral dose ~50%",
                          "Contraindicated with: pimozide, terfenadine, astemizole, cisapride",
                          "Caution with CYP3A4 substrates with narrow therapeutic index: ciclosporin, tacrolimus, fentanyl, alfentanil, everolimus, quinidine",
                          "Oral cytotoxics metabolised by CYP3A4 (etoposide, vinorelbine) — interaction cannot be excluded; monitor",
                          "Avoid grapefruit with aprepitant",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Ondansetron (5-HT3 antagonist)",
                    color: "#7b341e",
                    headerBg: "#fff5f0",
                    blocks: [
                      {
                        icon: "drug", heading: "Dosing & administration", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: [
                          "IV: dilute to 50ml with NaCl 0.9% or glucose 5%, infuse over 15 minutes",
                          "Oral and IV routes are therapeutically equivalent",
                          "!!Age ≥75 years: single IV dose must NOT exceed 8mg",
                          "Max daily dose 8mg in moderate–severe hepatic impairment",
                        ],
                      },
                      {
                        icon: "avoid", heading: "Cautions", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: [
                          "QT prolongation — caution in cardiac rhythm/conduction disturbances, anti-arrhythmics, beta-blockers, significant electrolyte disturbances",
                          "Increases large bowel transit time — caution in sub-acute intestinal obstruction; may cause constipation",
                          "Contraindicated with apomorphine",
                          "CYP3A4 inducers (phenytoin, carbamazepine, rifampicin) reduce ondansetron levels",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Dexamethasone",
                    color: "#744210",
                    headerBg: "#fffff0",
                    blocks: [
                      {
                        icon: "drug", heading: "Prescribing notes", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: [
                          "Take orally AFTER food — reduces GI side effects",
                          "Dose oral dexamethasone in morning and lunchtime only — reduces sleep disturbance",
                          "Can be given IV or SC",
                          "Interaction with NK1 antagonists: reduce dose by ~50% if total daily oral dose >16mg (not routinely needed at standard antiemetic doses)",
                        ],
                      },
                      {
                        icon: "avoid", heading: "Cautions", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: [
                          "Monitor blood sugars — causes hyperglycaemia; care in diabetic patients",
                          "Long-term side effects rare with short courses at these doses",
                          "Rifampicin, carbamazepine, phenobarbital, phenytoin reduce dexamethasone efficacy",
                          "Reduces plasma levels of indinavir, saquinavir, possibly darunavir",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Olanzapine",
                    color: "#1a6b8a",
                    headerBg: "#e8f4f8",
                    blocks: [
                      {
                        icon: "drug", heading: "Use & dosing", color: "#1a6b8a", bg: "#e8f4f8", border: "#90cde0",
                        items: [
                          "Unlicensed as antiemetic but well supported by trial data",
                          "High emetic risk only — NOT recommended for moderate risk (insufficient evidence)",
                          "10mg PO on day of chemo; 10mg OD PO days 2–4 (substitute for metoclopramide)",
                          "Consider 5mg if sedation is an issue (day 2 sedation higher than placebo in trials)",
                          "Available as orodispersible and standard tablets",
                        ],
                      },
                      {
                        icon: "avoid", heading: "Cautions", color: "#1a6b8a", bg: "#e8f4f8", border: "#90cde0",
                        items: [
                          "Hyperglycaemia risk — increased when co-prescribed with dexamethasone; monitor glucose",
                          "QTc prolongation — caution in elderly, pre-existing QT prolongation, heart failure, hypokalaemia, hypomagnesaemia",
                          "Metabolised by CYP1A2 — inducers/inhibitors affect levels",
                          "Not recommended with anti-Parkinsonian drugs in patients with Parkinson's disease or dementia",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Metoclopramide / Domperidone / Cyclizine / Levomepromazine",
                    color: "#276749",
                    headerBg: "#f0fff4",
                    blocks: [
                      {
                        icon: "drug", heading: "Metoclopramide", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: [
                          "MHRA: max 30mg/24hr, max 5 days (may extend on consultant request)",
                          "Avoid in young patients — increased dystonic reaction risk",
                          "Avoid in Parkinson's disease",
                          "Avoid when gastric motility stimulation is harmful (GI haemorrhage, obstruction, perforation)",
                          "Avoid in phaeochromocytoma",
                          "!!Do not combine with other dopamine antagonists without reviewing receptor overlap (see Appendix)",
                        ],
                      },
                      {
                        icon: "drug", heading: "Domperidone", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: [
                          "Peripheral dopamine antagonist — less central side effects than metoclopramide (does not cross BBB readily)",
                          "MHRA: max 30mg/24hr, 7 days (may extend or increase to max 20mg QDS on consultant request)",
                          "Risk of serious ventricular arrhythmia/sudden cardiac death — higher in patients >60 years or at daily doses >30mg",
                          "QT prolongation — avoid with ketoconazole, erythromycin, other potent CYP3A4 inhibitors that prolong QT",
                          "Use at lowest effective dose; caution in patients >60 years",
                          "Restricted to patients <40 years in this guideline (standard first-line use)",
                        ],
                      },
                      {
                        icon: "drug", heading: "Cyclizine", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: [
                          "H1 antihistamine — 50mg TDS PO or IV/SC",
                          "Can counteract prokinetic effect of metoclopramide (but not its central antiemetic effect) — avoid combination where prokinesis is needed",
                          "Caution: glaucoma, GI obstruction, hepatic disease, epilepsy, prostatic hypertrophy",
                          "Additive sedation with alcohol, opioids, other CNS depressants",
                        ],
                      },
                      {
                        icon: "drug", heading: "Levomepromazine", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: [
                          "Phenothiazine — dopamine antagonist + antihistamine + anticholinergic",
                          "Up to 6mg QDS PO or 12.5–25mg/24hr SC via syringe driver",
                          "Causes drowsiness, disorientation, hypotension (especially elderly) — advise not to drive",
                          "QT prolongation risk — avoid with other QT-prolonging drugs and hypokalaemia-causing diuretics",
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                heading: "Emetogenic Risk Reference — Full Drug Lists by Class",
                type: "callouts",
                panels: [
                  {
                    label: "High Emetic Risk >90% — DMSO equivalent: Dex + 5-HT3 + NK1",
                    color: "#742a2a",
                    headerBg: "#fff5f5",
                    blocks: [
                      {
                        icon: "drug", heading: "Platinum agents", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: ["Cisplatin (all doses)", "Cyclophosphamide ≥1500mg/m²"],
                      },
                      {
                        icon: "drug", heading: "Alkylating agents", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: ["Carmustine", "Dacarbazine", "Procarbazine (oral)", "Streptozocin"],
                      },
                      {
                        icon: "drug", heading: "Key combination regimens", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "ABVD (doxorubicin, bleomycin, vinblastine, dacarbazine) — NK1 standard",
                          "BEP, CBOP-BEP, T-BEP, PEP — NK1 standard",
                          "AC/EC/FEC, CHOP, CAV — anthracycline/cyclophosphamide combinations — NK1 standard",
                          "ECF/ECX (epirubicin, cisplatin, fluorouracil/capecitabine)",
                          "MVAC (methotrexate, vinblastine, doxorubicin, cisplatin)",
                          "TPF (docetaxel, cisplatin, fluorouracil)",
                          "TIP (paclitaxel, ifosfamide, cisplatin) — consider NK1",
                          "VIDE (vincristine, ifosfamide, doxorubicin, etoposide) — consider NK1",
                          "Ifosfamide-containing regimens ≥3g/m²/day — consider NK1",
                          "Topotecan/cyclophosphamide",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Moderate Emetic Risk 30–90% — Dex + 5-HT3 (± NK1 for carboplatin ≥AUC 4)",
                    color: "#7b341e",
                    headerBg: "#fff5f0",
                    blocks: [
                      {
                        icon: "drug", heading: "Platinum agents", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: ["Carboplatin × (≥AUC 4 — consider highest risk in group)", "Oxaliplatin"],
                      },
                      {
                        icon: "drug", heading: "Anthracyclines & antitumour antibiotics", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: ["Doxorubicin", "Epirubicin", "Dactinomycin", "Idarubicin"],
                      },
                      {
                        icon: "drug", heading: "Alkylating agents", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: ["Cyclophosphamide (oral & IV <1500mg/m²)", "Ifosfamide", "Lomustine (oral)", "Temozolomide (oral)"],
                      },
                      {
                        icon: "drug", heading: "Topoisomerase inhibitors & others", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: ["Irinotecan", "Cytarabine >1g/m²", "Methotrexate >250mg/m²", "Etoposide (oral)", "Trabectedin", "Raltitrexed", "Trifluridine-tipiracil", "Vinorelbine (oral)"],
                      },
                      {
                        icon: "drug", heading: "Targeted agents", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: ["Cabozantinib", "Ceritinib", "Crizotinib", "Imatinib", "Lenvatinib"],
                      },
                      {
                        icon: "drug", heading: "Key combination regimens", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: ["CMF (cyclophosphamide, methotrexate, fluorouracil)", "CVP", "EOX/EOF (epirubicin, oxaliplatin, capecitabine/fluorouracil)", "Gemcitabine/oxaliplatin, Gemcitabine/paclitaxel, Gemcitabine/nab-paclitaxel", "TC (docetaxel/cyclophosphamide)", "Topotecan/carboplatin"],
                      },
                    ],
                  },
                  {
                    label: "Low Emetic Risk 10–30% — Dex pre-chemo only",
                    color: "#744210",
                    headerBg: "#fffff0",
                    blocks: [
                      {
                        icon: "drug", heading: "Taxanes & vinca alkaloids", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: ["Docetaxel", "Paclitaxel", "Nab-paclitaxel (Abraxane®)", "Cabazitaxel", "Eribulin"],
                      },
                      {
                        icon: "drug", heading: "Antimetabolites", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: ["Fluorouracil", "Capecitabine (oral)", "Cytarabine ≤1g/m²", "Methotrexate 50–250mg/m²", "Gemcitabine", "Pemetrexed", "Tegafur uracil (oral)"],
                      },
                      {
                        icon: "drug", heading: "Topoisomerase inhibitors & others", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: ["Etoposide (IV)", "Topotecan", "Mitomycin", "Mitoxantrone", "Liposomal daunorubicin", "Liposomal doxorubicin"],
                      },
                      {
                        icon: "drug", heading: "Targeted & biological agents", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: ["Brentuximab vedotin", "Trastuzumab emtansine (Kadcyla®)", "Cetuximab", "Panitumumab", "Pertuzumab", "Lapatinib", "Olaparib", "Palbociclib", "Sunitinib", "Pazopanib", "Regorafenib", "Axitinib", "Vandetinib", "Trametinib", "Dabrafenib", "Osimertinib", "Alectinib", "Afatinib", "Nilotinib", "Everolimus"],
                      },
                      {
                        icon: "drug", heading: "Immunotherapy (low risk)", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: ["Atezolizumab", "Ipilimumab"],
                      },
                    ],
                  },
                  {
                    label: "Minimal Emetic Risk <10% — No routine prophylaxis needed",
                    color: "#276749",
                    headerBg: "#f0fff4",
                    blocks: [
                      {
                        icon: "drug", heading: "Monoclonal antibodies & immunotherapy", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: ["Trastuzumab", "Rituximab", "Bevacizumab", "Nivolumab", "Pembrolizumab", "Temsirolimus"],
                      },
                      {
                        icon: "drug", heading: "Vinca alkaloids", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: ["Vincristine", "Vinblastine", "Vinorelbine (IV)"],
                      },
                      {
                        icon: "drug", heading: "Antimetabolites", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: ["Fludarabine", "Chlorambucil (oral)"],
                      },
                      {
                        icon: "drug", heading: "Targeted agents", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: ["Erlotinib", "Gefitinib", "Sorafenib", "Vemurafenib", "Vismodegib"],
                      },
                      {
                        icon: "drug", heading: "Other", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: ["Bleomycin", "Dabrafenib", "Everolimus", "Pazopanib"],
                      },
                    ],
                  },
                ],
              },
            ],

          },
          {
            id: "onco-extravasation",
            title: "Chemotherapy Extravasation",
            category: "RT & SACT Toxicities",
            version: "2",
            authors: "East Midlands Cancer Alliance (EMCA) — Ian Purcell, NUH",
            evidenceBase: "NUH Guideline 1803 | EMCA SACT Expert Clinical Advisory Group | Review: June 2024",
            summary: "Extravasation is leakage of IV cytotoxic into surrounding tissue. Can cause pain, erythema, necrosis and functional loss if untreated. Treatment depends on drug class: DNA-binding vesicants need DMSO + cold, non-DNA-binding vesicants need hyaluronidase + warm, irritants need cold + hydrocortisone cream. All vesicant extravasations require urgent plastic/hand surgery referral.",
            tags: ["Extravasation", "Vesicant", "DMSO", "Hyaluronidase", "Anthracycline", "Vinca alkaloids", "Plastic surgery"],
            related: ["onco-line-infection", "onco-neutropenic-sepsis"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/extravasation",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/extravasation",
            updated: "June 2024 (review)",
            sections: [
              {
                heading: "⚠ Immediate Steps — Do This First",
                type: "alert",
                items: [
                  "STOP the injection immediately — leave the cannula in place",
                  "Classify the agent (see Drug Classification section below)",
                  "Collect the extravasation kit",
                  "Apply COLD pack immediately (WARM if non-DNA-binding vesicant — e.g. vinca alkaloids)",
                  "Aspirate as much fluid as possible through the cannula with a 10ml syringe — aim to draw back 3–5ml blood",
                  "Mark the extravasation area with a permanent marker pen",
                  "Contact the patient's doctor — nurses can refer directly to the hand team",
                  "Remove cannula ONLY after appropriate initial treatment below",
                ],
                note: "Do NOT remove the cannula first. Aspiration through the cannula is part of treatment.",
              },
              {
                heading: "Management by Type",
                type: "pills",
                note: "Common/high-risk agents shown. For full drug list by class, see Drug Reference below. If drug not listed, consult Pharmacy.",
                items: [
                  {
                    label: "Vesicants — DNA-binding",
                    color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                    indication: "Most common: Doxorubicin, Epirubicin, Daunorubicin, Idarubicin (anthracyclines), Mitomycin C, Dactinomycin, Dacarbazine. For full list see Drug Reference below.",
                    urgent: "AIM: LOCALISE & NEUTRALISE — use DMSO + cold",
                    exclusions: [
                      "Apply thin layer topical DMSO to marked area with cotton bud within 10–25 min — do NOT use if blistering present",
                      "Allow DMSO to dry, cover with non-occlusive gauze",
                      "Apply cold pack 30 min — repeat every 4 hours for 24 hours",
                      "3 hours after first DMSO: apply hydrocortisone 1% cream, repeat every 6 hours for 7 days",
                      "Elevate limb above heart",
                      "!!Refer to Plastic/Hand Surgeon ASAP",
                    ],
                  },
                  {
                    label: "Vesicants — Non-DNA-binding",
                    color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                    indication: "Most common: Vincristine, Vinblastine, Vinorelbine (vinca alkaloids), Paclitaxel, Nab-paclitaxel, Cabazitaxel (taxanes). For full list see Drug Reference below.",
                    urgent: "AIM: DISPERSE & DILUTE — use hyaluronidase + warm",
                    exclusions: [
                      "Inject hyaluronidase 150–1500 units diluted in 1ml sterile water as 5 × 0.2ml SC injections around periphery of extravasation — use 25–27G needle, change after each",
                      "If no blood return in cannula: consider 0.4ml hyaluronidase through cannula first, then remainder SC",
                      "Must begin within 1 hour of extravasation for best results",
                      "Apply hydrocortisone 1% cream every 6 hours while erythema persists",
                      "Apply WARM pack 30 min four times daily for 1–2 days",
                      "Elevate limb above heart",
                      "!!Refer to Plastic/Hand Surgeon ASAP",
                    ],
                  },
                  {
                    label: "Irritants",
                    color: "#744210", bg: "#fffff0", border: "#f6e05e",
                    indication: "Most common: Fluorouracil, Cyclophosphamide, Ifosfamide, Etoposide, Melphalan, Mitoxantrone. Possible irritants: Oxaliplatin*, Cisplatin, Carboplatin, Irinotecan, Docetaxel. For full list see Drug Reference below.",
                    urgent: "AIM: LOCALISE — cold + hydrocortisone cream",
                    exclusions: [
                      "Apply cold pack 30 min every 4 hours for 24 hours",
                      "*Oxaliplatin only: use WARM compress — cold precipitates paraesthesia",
                      "Apply hydrocortisone 1% cream every 6 hours for 7 days or while erythema persists",
                      "For vesicants in this group: refer to Plastic/Hand Surgeon ASAP",
                    ],
                  },
                  {
                    label: "Non-vesicants",
                    color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                    indication: "Most common: Gemcitabine, Cytarabine, Methotrexate, Pemetrexed, Bleomycin, Bortezomib, Monoclonal antibodies, Trastuzumab emtansine. For full list see Drug Reference below.",
                    urgent: "AIM: SYMPTOMATIC RELIEF",
                    exclusions: [
                      "Elevate limb above heart",
                      "Consider cold pack if local symptoms occur",
                      "Apply hydrocortisone cream 1% four times daily if erythema present",
                      "Note: agents causing prolonged discomfort at infusion site — consider central line for future treatment",
                    ],
                  },
                ],
              },
              {
                heading: "Documentation & Follow-up",
                type: "checklist",
                items: [
                  "Complete nursing and/or medical notes",
                  "Document on ChemoCare / prescription record",
                  "Complete DATIX incident form",
                  "Give patient information leaflet",
                  "Give analgesia if required",
                  "Contact pharmacy for replacement drugs",
                  "Arrange follow-up: review at 24h, 72h, 1 week, and 3–4 weeks — then until resolution of erythema",
                  "If not initially followed up by plastic/hand team: arrange follow-up yourself at above intervals",
                  "Consider medical photography at first review",
                  "Note: 'first aid' treatment above is initial management only — early plastic surgery review is strongly advisable for all vesicant extravasations",
                ],
              },
              {
                heading: "Common Misdiagnoses",
                type: "list",
                groups: [
                  {
                    icon: "management", label: "Conditions that can mimic extravasation",
                    items: [
                      "Allergic / flare reaction — generalised urticaria, no localised tissue swelling",
                      "Vessel reaction — localised erythema tracking along vein, resolves quickly",
                      "Venous shock — transient spasm, no persistent swelling",
                      "Phlebitis — inflammation along vein track, no tissue infiltration",
                    ],
                  },
                ],
              },
              {
                heading: "Drug Reference — Full List by Class",
                type: "callouts",
                panels: [
                  {
                    label: "Vesicants — DNA-binding (DMSO + cold)",
                    color: "#742a2a",
                    headerBg: "#fff5f5",
                    blocks: [
                      {
                        icon: "drug", heading: "Anthracyclines", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: ["Doxorubicin", "Epirubicin", "Daunorubicin", "Idarubicin"],
                      },
                      {
                        icon: "drug", heading: "Antitumour Antibiotics", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: ["Dactinomycin (Actinomycin D)", "Mitomycin C", "Trabectedin (Ecteinascidin)"],
                      },
                      {
                        icon: "drug", heading: "Alkylating Agents", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: ["Bendamustine", "Busulfan", "Carmustine (BCNU)", "Chlormethine (Mustine)", "Treosulfan"],
                      },
                      {
                        icon: "drug", heading: "Other DNA-binding", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: ["Amsacrine (Amsidine)", "Dacarbazine (DTIC)"],
                      },
                    ],
                  },
                  {
                    label: "Vesicants — Non-DNA-binding (Hyaluronidase + warm)",
                    color: "#7b341e",
                    headerBg: "#fff5f0",
                    blocks: [
                      {
                        icon: "drug", heading: "Vinca Alkaloids", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: ["Vincristine", "Vinblastine", "Vinorelbine", "Vindesine", "Vinflunine"],
                      },
                      {
                        icon: "drug", heading: "Taxanes", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: ["Paclitaxel", "Nab-paclitaxel (Abraxane)", "Cabazitaxel"],
                      },
                    ],
                  },
                  {
                    label: "Irritants (Cold + hydrocortisone cream)",
                    color: "#744210",
                    headerBg: "#fffff0",
                    blocks: [
                      {
                        icon: "drug", heading: "Alkylating Agents", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: ["Cyclophosphamide", "Ifosfamide", "Melphalan", "Streptozocin"],
                      },
                      {
                        icon: "drug", heading: "Antimetabolites", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: ["Fluorouracil (5-FU)", "Liposomal Doxorubicin (Caelyx)", "Liposomal Daunorubicin"],
                      },
                      {
                        icon: "drug", heading: "Topoisomerase Inhibitors", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: ["Etoposide", "Mitoxantrone"],
                      },
                      {
                        icon: "drug", heading: "Other Irritants", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: ["Arsenic Trioxide"],
                      },
                      {
                        icon: "management", heading: "Possible Irritants", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: ["Oxaliplatin* (WARM compress — cold precipitates paraesthesia)", "Cisplatin", "Carboplatin", "Irinotecan", "Docetaxel", "Gemtuzumab ozogamicin", "Topotecan"],
                      },
                    ],
                  },
                  {
                    label: "Non-vesicants (Symptomatic relief)",
                    color: "#276749",
                    headerBg: "#f0fff4",
                    blocks: [
                      {
                        icon: "drug", heading: "Antimetabolites", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: ["Cytarabine (Ara-C)", "Methotrexate", "Pemetrexed", "Gemcitabine", "Fludarabine", "Cladribine", "Clofarabine", "Nelarabine", "Raltitrexed", "Pentostatin"],
                      },
                      {
                        icon: "drug", heading: "Antitumour Antibiotics", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: ["Bleomycin", "Pixantrone"],
                      },
                      {
                        icon: "drug", heading: "Targeted & Biological Agents", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: ["Bortezomib", "Carfilzomib", "Brentuximab vedotin", "Trastuzumab emtansine (T-DM1)", "Inotuzumab ozogamicin", "Mifamurtide", "Temsirolimus", "Vosaroxin"],
                      },
                      {
                        icon: "drug", heading: "Monoclonal Antibodies & Immunotherapy", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: ["Monoclonal antibodies (general)", "Immunotherapy agents (checkpoint inhibitors)", "Interleukin-2", "Interferons", "Aflibercept"],
                      },
                      {
                        icon: "drug", heading: "Other Non-vesicants", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: ["Asparaginase", "Eribulin", "Etoposide phosphate", "Thiotepa"],
                      },
                    ],
                  },
                ],
              },
            ],
          },

          {
            id: "onco-rt-toxicity",
            title: "Acute Radiotherapy Toxicity",
            category: "RT & SACT Toxicities",
            summary: "Inpatient management of acute radiation toxicities requiring admission: severe mucositis, oesophagitis (dysphagia, aspiration risk), acute radiation proctitis/cystitis, and radiation pneumonitis. CTCAE grading, NG/PEG indications, steroid protocols.",
            tags: ["CTCAE", "Mucositis", "Oesophagitis", "Proctitis", "Pneumonitis"],
            related: ["onco-chemo-rt-diarrhoea", "onco-neutropenic-sepsis"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/rt-toxicity",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/rt-toxicity",
            updated: "Mar 2025",
          },
          {
            id: "onco-cci",
            title: "Chemotherapy-Induced Cardiac Toxicity",
            category: "RT & SACT Toxicities",
            summary: "Acute cardiotoxicity from anthracyclines, trastuzumab, and 5-FU. Presents including cardiomyopathy, vasospastic angina (5-FU), QTc prolongation (arsenic trioxide), and hypertensive crisis (VEGF inhibitors). Monitoring thresholds, cardiology escalation pathway, and treatment hold criteria.",
            tags: ["Anthracycline", "5-FU vasospasm", "QTc", "Cardiomyopathy", "Trastuzumab"],
            related: ["onco-extravasation", "onco-pericardial-tamponade"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/chemo-cardiac",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/chemo-cardiac",
            updated: "Jan 2025",
          },
        ],
      },
      {
        id: "onco-io",
        label: "Immunotherapy Toxicity",
        guidelines: [
          {
            id: "io-skin-toxicity",
            title: "Skin Toxicity",
            category: "Skin & Mucosal",
            summary: "Grade 1–4 skin toxicity management. Topical corticosteroid selection by potency, systemic steroids from grade 3, bullous dermatitis (urgent derm input, rituximab for refractory), Stevens-Johnson / TEN (inpatient IV methylprednisolone 1–2mg/kg). ICPI hold/restart criteria. Grade 2 pruritus: consider gabapentin/pregabalin if antihistamine-refractory.",
            tags: ["Rash", "Pruritus", "SJS/TEN", "BSA", "Topical steroids"],
            related: ["io-peripheral-neuro", "io-colitis"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/io-skin",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/io-skin",
            updated: "Jan 2024",
            sections: [
              {
                heading: "Grade & Manage",
                type: "grader",
                grades: [
                  { grade: 1, label: "Grade 1 — Mild", color: "#276749", bg: "#f0fff4", border: "#9ae6b4", criteria: ["Rash <10% Body Surface Area (BSA)", "With or without symptoms (pruritus, burning, tightness)", "No limitation of activities of daily living (ADLs)"] },
                  { grade: 2, label: "Grade 2 — Moderate", color: "#744210", bg: "#fffff0", border: "#f6e05e", criteria: ["Rash 10–30% BSA", "With or without symptoms", "Limiting instrumental ADLs"] },
                  { grade: 3, label: "Grade 3 — Severe", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d", criteria: ["Rash >30% BSA ± symptoms limiting ADLs", "OR Grade 2 with substantial symptoms"] },
                  { grade: 4, label: "Grade 4 — Life-threatening", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", criteria: [">30% BSA with epidermal detachment or mucosal involvement", "Erythema, purpura, associated symptoms"] },
                ],
                management: [
                  { grade: 1, icpi: "Continue ICPI", items: ["Avoid skin irritants", "Soap-free cleanser (Dermol®) and Zerocream moisturising cream", "Topical hydrocortisone 1% (low potency) or clobetasone butyrate 0.05% (medium potency) OD–BD", "Chlorphenamine 4mg TDS PRN for itch", "Investigations: total body exam — rule out viral illness, eczema, drug rash, vasculitis, other irAEs"] },
                  { grade: 2, icpi: "Continue. If persistent or recurrent: withhold + dermatology opinion", items: ["Oral antihistamine for pruritus", "Medium potency topical steroid (clobetasone 0.05%) or high potency (betamethasone valerate 0.1%) BD", "If unresponsive to topical steroids OR severe grade 2: prednisolone 0.5mg/kg/day until grade 1, then taper", "Investigations: as grade 1. Consider CT for colitis/perforation (grade 2 only)", "Grade 2 pruritus unresponsive to antihistamines: consider gabapentin or pregabalin"] },
                  { grade: 3, icpi: "Withhold until grade ≤1 and prednisolone <10mg OD", items: ["!!Prednisolone 0.5–1mg/kg/day × 3 days then wean over 1–2 weeks", "!!If severe: IV methylprednisolone 0.5–1mg/kg → convert to oral on response → wean over 2–4 weeks", "Consider inpatient care", "Investigations: dermatology review, skin biopsy, clinical photography", "Bullous dermatitis: urgent dermatology + skin biopsy. Grade 3 → prednisolone/methylprednisolone 1–2mg/kg/day; if no improvement at 3 days: consider rituximab"] },
                  { grade: 4, icpi: "Consultant decision on restart", items: ["!!Admit to hospital immediately", "!!IV methylprednisolone 1–2mg/kg/day", "!!IV fluids and electrolyte replacement", "!!Urgent dermatology — involve critical care if needed", "SJS/TEN: urgent dermatology consultation, prednisolone 1–2mg/kg/day, inpatient care required"] },
                ],
              },
            ],
          },
        
          {
            id: "io-peripheral-neuro",
            title: "Peripheral Neurological Toxicity",
            category: "Neurological",
            summary: "Asymmetric/systemic motor deficit, painful or painless sensory deficit, autonomic dysfunction, hypo/areflexia. GI tract paresis from myenteric neuritis is rare but may present with sudden profound ileus. Grade 1: monitor. Grade 2: prednisolone 0.5–1mg/kg + amitriptyline/gabapentin for pain, withhold ICPI. Grade 3/4: admit, IV methylprednisolone 2mg/kg/day, neurology team, withhold/discontinue ICPI. Steroid wean: 4–8 weeks. Consider PCP prophylaxis if >4 weeks.",
            tags: ["Peripheral neuropathy", "Motor deficit", "Gabapentin", "Methylprednisolone"],
            related: ["io-central-neuro", "io-gbs-mg"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/io-peripheral-neuro",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/io-peripheral-neuro",
            updated: "Jan 2024",
            sections: [
              {
                heading: "Grade & Manage",
                type: "grader",
                grades: [
                  { grade: 1, label: "Grade 1 — Mild", color: "#276749", bg: "#f0fff4", border: "#9ae6b4", criteria: ["Mild symptoms — no interference with function", "Symptoms not concerning to patient", "Note: any mild cranial nerve problem → manage as Grade 2"] },
                  { grade: 2, label: "Grade 2 — Moderate", color: "#744210", bg: "#fffff0", border: "#f6e05e", criteria: ["Limiting instrumental ADLs", "Symptoms concerning to patient"] },
                  { grade: 3, label: "Grade 3/4 — Severe / Life-threatening", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", criteria: ["Limits self-care — aids required", "Life-threatening (e.g. respiratory failure)", "See GBS guideline for specific Grade 3/4 syndromes"] },
                ],
                management: [
                  { grade: 1, icpi: "Consider holding — monitor closely", items: ["Close monitoring for any progression", "No pharmacological intervention indicated", "Investigations: full neurological exam, diabetic screen, B12/folate, CK, HIV, TSH, vasculitis/autoimmune screen", "Review alcohol history and other medications", "Consider MRI brain or spine to exclude CVA and structural causes"] },
                  { grade: 2, icpi: "Withhold ICPI", items: ["Oral prednisolone 0.5–1mg/kg/day", "± Amitriptyline and gabapentin for neuropathic pain", "Investigations: as grade 1 + consider nerve conduction studies/EMG for lower motor neurone or sensory deficit", "Consider pulmonary/diaphragmatic function test", "Consider neurological consult", "Steroid wean: 4–8 weeks. PCP prophylaxis + calcium/vitamin D if >4 weeks"] },
                  { grade: 3, icpi: "Withhold / discontinue ICPI", items: ["!!Inform oncology SpR urgently — involve neurology team", "!!Admit for IV methylprednisolone 2mg/kg/day", "Investigations: MRI brain/whole spine, nerve conduction studies, EMG, lumbar puncture, pulmonary function, neurological consult", "MDT: physiotherapy, OT, speech therapy as appropriate", "Ophthalmology review for ocular/cranial nerve issues", "Orthotic devices (e.g. foot drop)", "Convert IV → oral at clinician discretion once improving"] },
                ],
              },
            ],
          },
          {
            id: "io-gbs-mg",
            title: "Guillain-Barré Syndrome & Myasthenia Gravis",
            category: "Neurological",
            summary: "GBS: progressive symmetrical muscle weakness, absent tendon reflexes, respiratory/bulbar involvement, autonomic instability. Steroids not recommended in idiopathic GBS — trial of methylprednisolone 1–2mg/kg reasonable for ICPI-induced GBS. Plasmapheresis or IVIG. HDU/ITU if FVC <15–20ml/kg. MG: fluctuating proximal/ocular/bulbar weakness with fatigability. Steroids indicated — prednisolone 20mg increasing to 1mg/kg/day. Pyridostigmine 30mg TDS. Avoid ciprofloxacin, beta-blockers. Discontinue ICPI permanently (consultant decision).",
            tags: ["GBS", "Myasthenia gravis", "IVIG", "Plasmapheresis", "Pyridostigmine"],
            related: ["io-peripheral-neuro", "io-central-neuro"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/io-gbs-mg",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/io-gbs-mg",
            updated: "Jan 2024",
            sections: [
              {
                heading: "GBS & Myasthenia Gravis — Side-by-Side",
                type: "callouts",
                note: "Both syndromes: Discontinue ICPI permanently (consultant decision).",
                panels: [
                  {
                    label: "Guillain-Barré Syndrome (GBS)",
                    color: "#7b341e",
                    headerBg: "#fff5f0",
                    blocks: [
                      {
                        icon: "symptoms", heading: "Presentation", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: [
                          "Progressive symmetrical muscle weakness",
                          "Absent or reduced tendon reflexes",
                          "Extremity, facial, respiratory and bulbar involvement",
                          "Oculomotor muscle involvement",
                          "Autonomic instability: BP fluctuation, arrhythmias",
                        ],
                      },
                      {
                        icon: "investigations", heading: "Investigations", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: [
                          "MRI whole spine ± brain",
                          "FVC (forced vital capacity) twice daily — HDU/ITU if FVC <15–20ml/kg",
                          "Nerve conduction studies (acute polyneuropathy)",
                          "Lumbar puncture: elevated protein >0.4g/L with normal WCC",
                          "GQ1b antibody — Miller Fisher variant (ocular motor involvement)",
                        ],
                      },
                      {
                        icon: "management", heading: "Management", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: [
                          "Neurological consult urgently",
                          "Steroids NOT recommended in idiopathic GBS",
                          "Trial of methylprednisolone 1–2mg/kg/day reasonable for ICPI-induced GBS",
                          "Plasmapheresis or IVIG — may be considered",
                          "!!HDU/ITU referral if ventilatory support needed",
                          "Frequent neurological evaluation and pulmonary function monitoring",
                          "Monitor for concurrent autonomic dysfunction",
                          "Gabapentin, pregabalin or duloxetine for neuropathic pain",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Myasthenia Gravis (MG)",
                    color: "#742a2a",
                    headerBg: "#fff5f5",
                    blocks: [
                      {
                        icon: "symptoms", heading: "Presentation", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "Fluctuating muscle weakness — proximal limb, trunk, ocular (ptosis/diplopia), bulbar",
                          "Fatigability — worsens with sustained activity",
                          "Respiratory muscles may also be involved",
                        ],
                      },
                      {
                        icon: "investigations", heading: "Investigations", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "Check for ocular and proximal muscle fatigability",
                          "Pulmonary assessment: NIF and vital capacity",
                          "AChR and anti-MuSK antibody",
                          "CRP, ESR, CPK",
                          "Bedside: Tensilon test or ice pack test (with neurological input)",
                          "Consider cardiac exam — look for myocarditis",
                          "Repetitive nerve stimulation and single-fibre EMG",
                          "MRI brain and spine",
                        ],
                      },
                      {
                        icon: "management", heading: "Management", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "Neurological consult urgently",
                          "Steroids indicated — prednisolone 20mg OD, increase by 5mg/day to 1mg/kg/day (max 100mg — high dose may worsen symptoms)",
                          "!!IV methylprednisolone 1–2mg/kg/day if very unwell",
                          "Pyridostigmine 30mg TDS PO — increase to maximum as tolerated",
                          "If no improvement: plasmapheresis or IVIG",
                          "Consider rituximab 375mg/m² weekly ×4 or 500mg/m² q2w ×2",
                          "Additional immunosuppression: azathioprine, ciclosporin, mycophenolate",
                        ],
                      },
                      {
                        icon: "avoid", heading: "Drugs to Avoid", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", alert: false,
                        items: [
                          "Ciprofloxacin — may exacerbate MG",
                          "Beta-blockers — may precipitate cholinergic crisis",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "io-central-neuro",
            title: "Central Neurotoxicity",
            category: "Neurological",
            summary: "Aseptic meningitis (headache, photophobia, neck stiffness, normal cognition), encephalitis (confusion, personality change, altered GCS), transverse myelitis (acute motor/sensory/autonomic deficit, sensory level, often bilateral). All require urgent exclusion of infection before steroids. Withhold/discontinue ICPI (consultant decision). Other rare presentations: neurosarcoidosis, PRES, Vogt-Harada-Koyanagi, demyelination, vasculitic encephalopathy, generalised seizures.",
            tags: ["Encephalitis", "Meningitis", "Transverse myelitis", "LP", "Methylprednisolone"],
            related: ["io-peripheral-neuro", "io-gbs-mg"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/io-central-neuro",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/io-central-neuro",
            updated: "Jan 2024",
            sections: [
              {
                heading: "Central Neurotoxicity Syndromes",
                type: "callouts",
                note: "All syndromes: withhold/discontinue ICPI (consultant decision). Other rare presentations: neurosarcoidosis, PRES, Vogt-Harada-Koyanagi syndrome, demyelination, vasculitic encephalopathy, generalised seizures.",
                panels: [
                  {
                    label: "Aseptic Meningitis",
                    color: "#744210",
                    headerBg: "#fffff0",
                    blocks: [
                      {
                        icon: "symptoms", heading: "Presentation", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: [
                          "Headache, photophobia, neck stiffness",
                          "± Fever, nausea/vomiting",
                          "Normal cognition and cerebral function — this distinguishes from encephalitis",
                        ],
                      },
                      {
                        icon: "investigations", heading: "Investigations", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: [
                          "CT head to exclude brain metastases → MRI brain if CT normal",
                          "LP: normal Gram stain, WBC <500/mm³, normal glucose, protein <0.9g/L",
                          "PCR HSV, viral serology (HSV, EBV, CMV, Varicella zoster)",
                          "Morning cortisol to rule out adrenal insufficiency",
                          "Neurology consultation",
                        ],
                      },
                      {
                        icon: "management", heading: "Management", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: [
                          "Urgently exclude bacterial and viral infection before steroids",
                          "Oral prednisolone 0.5–1mg/kg/day",
                          "!!IV methylprednisolone 1–2mg/kg/day if very unwell",
                          "Consider empiric IV aciclovir + broad-spectrum antibiotics after discussion with microbiology",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Encephalitis",
                    color: "#7b341e",
                    headerBg: "#fff5f0",
                    blocks: [
                      {
                        icon: "symptoms", heading: "Presentation", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: [
                          "Confusion or personality change",
                          "Headaches, alteration in GCS",
                          "Motor or sensory deficits, speech abnormality",
                          "± Fever",
                        ],
                      },
                      {
                        icon: "investigations", heading: "Investigations", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: [
                          "CT/MRI brain",
                          "LP: WBC <250/mm³ lymphocyte predominance, protein <0.15mg/dl, PCR HSV",
                          "Viral serology: HSV, EBV, CMV, Varicella zoster",
                          "EEG — assess for subclinical seizures",
                          "CBC, ESR, CRP, ANCA, thyroid panel (TPO and thyroglobulin)",
                          "Neurology consultation",
                        ],
                      },
                      {
                        icon: "management", heading: "Management", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: [
                          "Urgently exclude bacterial, viral, and metabolic causes",
                          "Trial methylprednisolone 1–2mg/kg/day",
                          "!!If severe/progressing or oligoclonal bands: pulse methylprednisolone 1g IV daily ×3–5 days + IVIG or plasmapheresis",
                          "If autoimmune Ab+ or no improvement in 7–14 days: consider rituximab",
                          "IV aciclovir until PCR result obtained",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Transverse Myelitis",
                    color: "#742a2a",
                    headerBg: "#fff5f5",
                    blocks: [
                      {
                        icon: "symptoms", heading: "Presentation", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "Acute or subacute neurological deficit — motor, sensory, autonomic",
                          "Most have a sensory level",
                          "Often bilateral symptoms",
                          "Check for constipation and urinary retention",
                        ],
                      },
                      {
                        icon: "investigations", heading: "Investigations", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "MRI brain and whole spine",
                          "LP: may be normal or show lymphocytosis/elevated protein — oligoclonal bands not usually present",
                          "Cytology",
                          "Serum B12, HIV, syphilis, ANA, anti-Ro, anti-La antibodies",
                          "TSH, anti-aquaporin-4 IgG",
                        ],
                      },
                      {
                        icon: "management", heading: "Management", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "!!Neurological consult urgently",
                          "!!Methylprednisolone 2mg/kg IV (or consider 1g/day)",
                          "Plasmapheresis if steroid-refractory",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        
          {
            id: "io-colitis",
            title: "Diarrhoea & Colitis",
            category: "GI & Hepatic",
            summary: "Grade 1 (≤3 liquid stools/day): fluid intake, monitor q72h. Grade 2 (4–6 stools, abdominal pain, blood): prednisolone 0.5–1mg/kg or budesonide 3mg TDS if no bloody diarrhoea; outpatient flexi-sig. Grade 3/4 (≥6 stools, loose stools within 1h of eating): admit to SRU, IV methylprednisolone 1–2mg/kg, urgent flexi-sig + biopsies (CMV PCR), CT abdomen/pelvis, pre-infliximab screening. Steroid-refractory: infliximab 5mg/kg (up to 3 infusions). Vedolizumab, mycophenolate, or tacrolimus as alternatives. Continue enteral feeding — not harmful, may aid resolution.",
            tags: ["Colitis", "Diarrhoea", "Infliximab", "Flexi-sig", "CMV"],
            related: ["io-hepatitis", "io-peripheral-neuro"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/io-colitis",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/io-colitis",
            updated: "Jan 2024",
            sections: [
              {
                heading: "Grade & Manage",
                type: "grader",
                grades: [
                  { grade: 1, label: "Grade 1 — Mild", color: "#276749", bg: "#f0fff4", border: "#9ae6b4", criteria: ["≤3 liquid stools over baseline per day", "Mild increase in ostomy output over baseline", "Feeling well"] },
                  { grade: 2, label: "Grade 2 — Moderate", color: "#744210", bg: "#fffff0", border: "#f6e05e", criteria: ["4–6 liquid stools per day over baseline", "Moderate increase in ostomy output", "Abdominal pain or presence of blood in stool", "Nausea or nocturnal episodes", "Outpatient management appropriate if well — if unwell manage as Grade 3/4"] },
                  { grade: 3, label: "Grade 3 — Severe", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d", criteria: ["≥6 liquid stools over baseline", "OR loose stools within 1 hour of eating"] },
                  { grade: 4, label: "Grade 4 — Life-threatening", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", criteria: ["Life-threatening consequences", "Urgent intervention required (e.g. perforation, ischaemia, megacolon)"] },
                ],
                management: [
                  { grade: 1, icpi: "Continue ICPI", items: ["Ensure adequate fluid intake", "Monitor every 3 days", "Advise patient to call if worsening", "Investigations: FBC, U&E, LFTs, CRP, bone profile, TFTs, blood glucose, faecal calprotectin, stool MC&S + CDT", "Travel/social history: stool for leucocytes, ova/parasites, viral PCR, cryptosporidium", "If steatorrhoea: faecal elastase"] },
                  { grade: 2, icpi: "Continue. Withhold if no improvement", items: ["Prednisolone 0.5–1mg/kg PO OD OR budesonide 3mg TDS PO (if no bloody diarrhoea)", "Continue enteral feeding — not harmful and may aid resolution", "Contact patient every 3 days", "Investigations: as grade 1 + consider CT abdomen/pelvis for colitis/perforation", "Book urgent outpatient flexible sigmoidoscopy with biopsies including CMV PCR", "If no improvement in 3–5 days or deteriorates: manage as grade 3/4"] },
                  { grade: 3, icpi: "Withhold ICPI", items: ["!!Admit to Specialist Receiving Unit (SRU)", "!!IV methylprednisolone 1–2mg/kg", "Continue enteral feeding — not harmful and may aid resolution", "Refer to gastroenterology (awareness for potential infliximab)", "!!Surgical referral if perforation on CT", "Investigations: as grade 1/2 + urgent flexible sigmoidoscopy with biopsies (CMV PCR) + CT abdomen/pelvis, daily FBC/U&E/LFTs/CRP", "Pre-infliximab screening: CXR (TB), TB IFN-γ, EBV/VZV status, HepB/C, HIV, echo (if grade 3–4 HF)", "If no improvement in 72h: gastroenterology review → must have flexi-sig/colonoscopy BEFORE infliximab", "First-line steroid-refractory: infliximab 5mg/kg (up to 3 infusions)", "Alternatives: vedolizumab, mycophenolate 500–1000mg or tacrolimus"] },
                  { grade: 4, icpi: "Withhold ICPI — surgical review urgently", items: ["As grade 3 management", "!!Urgent surgical review if perforation or ischaemia on CT", "!!Involve critical care if haemodynamically compromised", "Refractory diarrhoea with normal flexi-sig: consider full colonoscopy and/or OGD — refer to gastroenterology for non-IO causes"] },
                ],
              },
            ],
          },
          {
            id: "io-hepatitis",
            title: "Hepatic Toxicity",
            category: "GI & Hepatic",
            summary: "Grade 1 (ALT/AST <3× ULN): watch, repeat LFTs in 1 week. Grade 2 (3–5× ULN): no immunosuppression unless worsening; consultant decision to initiate prednisolone 0.5–1mg/kg PO. Grade 3 (5–20× ULN): withhold ICPI, re-check LFTs/INR/albumin q2–3 days, consider hepatology review + liver biopsy before steroids. Grade 4 (>20× ULN): admit, IV methylprednisolone 1–2mg/kg/day, hepatology review + biopsy. Steroid-refractory: switch to IV if on oral, add mycophenolate 500–1000mg BD, then consider tacrolimus. For grade >1 transaminitis with bilirubin >1.5× ULN: follow grade 4 pathway (unless Gilbert's).",
            tags: ["Hepatitis", "Transaminitis", "Mycophenolate", "Liver biopsy", "Infliximab"],
            related: ["io-colitis"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/io-hepatitis",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/io-hepatitis",
            updated: "Jan 2024",
            sections: [
              {
                heading: "Grade & Manage",
                type: "grader",
                grades: [
                  { grade: 1, label: "Grade 1", color: "#276749", bg: "#f0fff4", border: "#9ae6b4", criteria: ["ALT or AST < 3× ULN"] },
                  { grade: 2, label: "Grade 2", color: "#744210", bg: "#fffff0", border: "#f6e05e", criteria: ["ALT or AST 3–5× ULN"] },
                  { grade: 3, label: "Grade 3", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d", criteria: ["ALT or AST 5–20× ULN", "Note: grade >1 transaminitis with bilirubin >1.5× ULN → follow grade 4 pathway (unless Gilbert's syndrome)"] },
                  { grade: 4, label: "Grade 4", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", criteria: ["ALT or AST > 20× ULN", "Grade >1 transaminitis with bilirubin >1.5× ULN (unless Gilbert's)"] },
                ],
                management: [
                  { grade: 1, icpi: "Continue ICPI", items: ["Review medications (statins, antibiotics) and alcohol history", "Repeat LFTs in 1 week", "No specific intervention required whilst grade 1", "If repeat LFTs meet grade 2+ criteria: investigate and manage accordingly"] },
                  { grade: 2, icpi: "Withhold until resolved to Grade 1", items: ["Liver screen: HepA/B/C serology, HepE PCR, CMV PCR, EBV PCR, autoimmune liver screen, ANA, immunoglobulins", "Liver USS with Doppler (metastases/clot)", "Re-check LFTs/INR/albumin every 3–4 days", "No immunosuppression required unless worsening", "Consultant decision to initiate steroids", "If LFTs rise to grade 3/4: manage accordingly"] },
                  { grade: 3, icpi: "Withhold. Taper steroids over 4–6 weeks. Consider restart at grade ≤2.", items: ["Investigations as grade 2. Re-check LFTs/INR/albumin every 2–3 days", "Admit if unable to monitor safely at home or clinical concern", "Consider hepatology review before starting steroids**", "If LFTs do not improve or significant INR/bilirubin elevation: prednisolone 0.5–1mg/kg PO (consultant decision)", "If no improvement with oral steroids: manage as grade 4", "Wean steroids over 4–6 weeks"] },
                  { grade: 4, icpi: "Withhold. Taper steroids over 4–6 weeks. Consider restart at grade ≤2.", items: ["!!Admit — re-check LFTs/INR/albumin daily", "!!Hepatology review + liver biopsy (if not already done)", "!!Start IV methylprednisolone 1–2mg/kg/day", "Steroid-refractory pathway: switch oral → IV methylprednisolone → add mycophenolate 500–1000mg BD → consider tacrolimus", "** Hepatology consult: where diagnosis unclear, alternative diagnosis possible, or LFT/INR worsening despite steroids and second-line immunosuppression being considered"] },
                ],
              },
            ],
          },
        
          {
            id: "io-thyroid",
            title: "Thyroid Toxicity",
            category: "Endocrine",
            summary: "Monitor TSH, FT4, T3 before every cycle. Subclinical hyperthyroidism / thyrotoxicosis often precedes overt hypothyroidism. Falling TSH across 2 measurements may suggest pituitary dysfunction — check weekly cortisol. Hypothyroidism (low FT4 + elevated TSH, or TSH >10): thyroxine 0.15–1.5µg/kg (start low in elderly/cardiac history) if random cortisol normal — check cortisol first. Continue ICPI. Thyrotoxicosis: beta-blockers for symptoms, repeat TFTs in 4–6 weeks. Carbimazole is NOT indicated in immunotherapy-induced thyrotoxicosis. CT iodine contrast can affect TFTs.",
            tags: ["Hypothyroidism", "Thyrotoxicosis", "TSH", "Thyroxine", "Cortisol"],
            related: ["io-hypophysitis", "io-adrenal"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/io-thyroid",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/io-thyroid",
            updated: "Jan 2024",
            sections: [
              {
                heading: "TSH Decision Algorithm",
                type: "callouts",
                note: "Central Hypothyroidism: morning cortisol + ACTH (must reach lab within 4 hours), FSH, LH, TSH, fT4, oestradiol (women)/testosterone (men). Consider MRI pituitary if confirmed central insufficiency.",
                panels: [
                  {
                    label: "TSH Elevated",
                    color: "#7b341e",
                    headerBg: "#fff5f0",
                    blocks: [
                      {
                        icon: "tsh", heading: "Elevated TSH + Normal FT4", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: [
                          "If no symptoms: repeat next cycle",
                          "If symptoms: consider thyroxine if TSH >10",
                        ],
                      },
                      {
                        icon: "tsh", heading: "Elevated TSH + Low FT4 (Hypothyroidism)", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: [
                          "If no symptoms: repeat next cycle",
                          "If symptoms: initiate thyroxine 0.15–1.5µg/kg (start low in elderly/cardiac history)",
                          "!!Check random cortisol is normal before starting thyroxine — if abnormal, treat as hypophysitis first",
                          "Continue ICPI",
                        ],
                      },
                    ],
                  },
                  {
                    label: "TSH Normal",
                    color: "#276749",
                    headerBg: "#f0fff4",
                    blocks: [
                      {
                        icon: "tsh", heading: "Normal TSH + Elevated FT4", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: [
                          "Repeat TFT at next cycle",
                          "If still abnormal: discuss with endocrinologist",
                        ],
                      },
                      {
                        icon: "tsh", heading: "Normal TSH + Low FT4", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: [
                          "If no symptoms: repeat next cycle",
                          "Check 9am cortisol — may indicate hypopituitarism",
                        ],
                      },
                    ],
                  },
                  {
                    label: "TSH Low (Suppressed)",
                    color: "#742a2a",
                    headerBg: "#fff5f5",
                    blocks: [
                      {
                        icon: "tsh", heading: "Low TSH + Elevated FT4 — Thyrotoxicosis", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "Consider thyroid peroxidase (TPO) antibody",
                          "Thyroid-stimulating receptor antibody (TRAb) if persistent symptoms",
                          "Beta-blockers (propranolol, atenolol, or metoprolol) until symptoms resolve",
                          "Repeat TFTs in 4–6 weeks",
                          "If TSH remains suppressed: thyroid uptake scan to determine true hyperthyroidism vs Graves-like aetiology",
                          "!!Carbimazole is NOT indicated in immunotherapy-induced thyrotoxicosis",
                        ],
                      },
                      {
                        icon: "tsh", heading: "Low TSH + Low FT4 — Central Hypothyroidism", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "Check 9am cortisol urgently — may indicate hypopituitarism",
                          "May indicate central hypothyroidism — treat as hypophysitis",
                          "Morning cortisol + ACTH (must reach lab within 4 hours)",
                          "Consider MRI pituitary",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "io-hypophysitis",
            title: "Hypophysitis",
            category: "Endocrine",
            summary: "Acute: headache, photophobia, dizziness, nausea, fevers, anorexia, visual field cuts, severe fatigue. Bloods: low ACTH, low morning cortisol, low Na, low K, low testosterone. Grade 1–2: pituitary axis bloods + MRI pituitary. Oral prednisolone 0.5–1mg/kg. Grade 3–4: IV methylprednisolone 1mg/kg. DO NOT STOP STEROIDS. Wean over 2–4 weeks to 5mg prednisolone. Refer endocrinology. Hydrocortisone replacement: 10mg am / 5mg midday / 5mg 4pm if cortisol low or inadequate synacthen response. Always replace cortisol 1 week before starting thyroxine.",
            tags: ["Hypophysitis", "Cortisol", "ACTH", "MRI pituitary", "Hydrocortisone"],
            related: ["io-thyroid", "io-adrenal"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/io-hypophysitis",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/io-hypophysitis",
            updated: "Jan 2024",
            sections: [
              {
                heading: "Grade & Manage",
                type: "grader",
                grades: [
                  { grade: 1, label: "Grade 1 — Mild / Asymptomatic", color: "#276749", bg: "#f0fff4", border: "#9ae6b4", criteria: ["Vague symptoms (mild fatigue, anorexia)", "No headache", "OR asymptomatic"] },
                  { grade: 2, label: "Grade 2 — Moderate", color: "#744210", bg: "#fffff0", border: "#f6e05e", criteria: ["Headache but no visual disturbance", "OR fatigue/mood alteration but haemodynamically stable", "No electrolyte disturbance"] },
                  { grade: 3, label: "Grade 3/4 — Severe", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", criteria: ["Severe headache", "Any visual disturbance", "OR severe hypoadrenalism: hypotension, severe electrolyte disturbance"] },
                ],
                management: [
                  { grade: 1, icpi: "Continue ICPI with appropriate hormone replacement", items: ["Pituitary axis bloods + MRI pituitary protocol", "Await results before acting — inform patient to call if unwell", "Replace cortisol and/or thyroxine as per guide below", "Refer to endocrinology", "Hormone replacement (if cortisol low or inadequate synacthen response): hydrocortisone 10mg am / 5mg midday / 5mg 4pm", "Always replace cortisol for 1 week before initiating thyroxine", "Monitor TFTs 1–2 weekly initially"] },
                  { grade: 2, icpi: "Manage and continue ICPI if stable", items: ["Pituitary axis bloods + MRI pituitary protocol (exclude brain mets)", "Visual field assessment", "Refer to consultant endocrinologist", "Monitor TFTs", "Oral prednisolone 0.5–1mg/kg OD after sending pituitary axis bloods", "If no improvement in 48h: treat as severe with (methyl)prednisolone", "Hormone replacement as indicated", "Wean steroids over 2–4 weeks to 5mg prednisolone", "DO NOT STOP STEROIDS — refer to endocrinology"] },
                  { grade: 3, icpi: "As per grade 2", items: ["Pituitary axis bloods + MRI pituitary protocol (exclude brain mets)", "Visual field assessment (if abnormal: advise patient to inform DVLA)", "Refer to consultant endocrinologist", "!!IV (methyl)prednisolone 1mg/kg — send bloods first", "Analgesics for headache — discuss with neurology if resistant to paracetamol/NSAIDs", "Wean over 2–4 weeks to 5mg prednisolone", "!!DO NOT STOP STEROIDS — refer to endocrinology"] },
                ],
                note: "Pituitary axis bloods: 9am cortisol (or random if unwell), ACTH (must reach lab within 4 hours), TSH/FT4, LH, FSH, oestradiol (premenopausal women), testosterone (men), IGF-1, prolactin.",
              },
            ],
          },
          {
            id: "io-adrenal",
            title: "Hypoadrenalism / Adrenal Insufficiency",
            category: "Endocrine",
            summary: "May occur without hypophysitis. Incidental low cortisol: check steroid history → if no steroids and asymptomatic, arrange short synacthen test within 24–48h via SDEC. Adequate response (cortisol >420nmol/L at 30min post-synacthen): discharge with advice. Inadequate response or symptomatic: manage as suspected primary adrenal insufficiency. Adrenal crisis: admit SRU, random cortisol + ACTH (must reach lab within 4h), treat acutely as per endocrinology adrenal crisis guideline. Maintenance: hydrocortisone PO 10mg am / 5mg midday / 5mg 4pm. Provide sick day rules + injectable hydrocortisone (2 vials 100mg/1ml). Refer endocrinology.",
            tags: ["Adrenal insufficiency", "Cortisol", "Synacthen", "Hydrocortisone", "Sick day rules"],
            related: ["io-hypophysitis", "io-thyroid"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/io-adrenal",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/io-adrenal",
            updated: "Jan 2024",
            sections: [
              {
                heading: "Incidental Low Cortisol — Decision Pathway",
                type: "steps",
                items: [
                  { label: "Check steroid history", detail: "On long-term steroids? → check patient is well, remind not to measure cortisol whilst on steroids. Recent short course/recently stopped steroids? → Are they symptomatic?" },
                  { label: "Symptomatic of hypoadrenalism?", detail: "Symptoms: severe fatigue, hypotension, nausea/vomiting, severe headache, confusion. If YES → admit to SRU, manage as suspected primary adrenal insufficiency. If NO → arrange short synacthen test within 24–48h via SDEC (or SRU if weekend)." },
                  { label: "Short synacthen test result", detail: "Adequate (cortisol >420nmol/L at 30min): discharge, advise to call if unwell, email team that ACTH result available in 7–10 days for review. Inadequate (<420nmol/L): manage as suspected primary adrenal insufficiency." },
                  { label: "ACTH result", detail: "ACTH normal/raised: discharge, routine cortisol monitoring, advise to ring Rapid Response if symptomatic. ACTH low: indicative of pituitary insufficiency — discuss with endocrinology, may need hydrocortisone replacement." },
                ],
              },
              {
                heading: "Suspected Adrenal Crisis Management",
                type: "list",
                groups: [
                  { icon: "immediate", label: "Immediate Actions", items: ["!!Admit to SRU", "If mild symptoms: observe + immediate short synacthen test before hydrocortisone — if in doubt, treat immediately", "Treat acutely as per endocrinology 'Adrenal Crisis — Assessment and Management in Adults' guideline"] },
                  { icon: "bloods", label: "Bloods", items: ["FBC, U&E, LFT, glucose, lipase, full TFTs", "Capillary glucose, venous blood gas", "!!Random cortisol + ACTH (must reach lab within 4 hours)", "Full pituitary axis bloods as per hypophysitis guideline"] },
                  { icon: "drug", label: "Treatment", items: ["!!Start corticosteroid FIRST before other hormone replacement", "Initiate hydrocortisone PO 10mg am / 5mg midday / 5mg 4pm", "Provide sick day rules leaflet (Society of Endocrinology)", "Provide injectable hydrocortisone: 2× vials 100mg/1ml, 2ml syringe, green + blue needles"] },
                  { icon: "referral", label: "Referral", items: ["Inpatient via Nervecentre if acutely unwell (seen within 24–48h Mon–Fri)", "No OOH/weekend endocrinology cover — contact Med SPR if required", "Urgent outpatient referral if asymptomatic at presentation"] },
                ],
              },
            ],
          },
          {
            id: "io-hyperglycaemia",
            title: "Hyperglycaemia",
            category: "Endocrine",
            summary: "New onset fasting glucose >7.0 mmol/L or random >11 mmol/L. Immunotherapy can cause new-onset type 1 diabetes. In steroid-treated patients: steroid-induced hyperglycaemia likely. Pre-existing T2DM: titrate usual medication, plan reduction when steroids weaned. No T2DM: start gliclazide 40–80mg morning (max 240mg morning, 320mg total daily). If persistent hyperglycaemia: discuss insulin with endocrinology. If DKA features: hold immunotherapy, manage as per NUH DKA guideline, endocrinology referral.",
            tags: ["Hyperglycaemia", "DKA", "Type 1 diabetes", "Gliclazide", "Steroids"],
            related: ["io-hypophysitis", "io-adrenal"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/io-hyperglycaemia",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/io-hyperglycaemia",
            updated: "Jan 2024",
            sections: [
              {
                heading: "Management by Clinical Context",
                type: "callouts",
                note: "Patients with pre-existing T2DM can develop immunotherapy-induced type 1 diabetes. Evaluate for new-onset type 1 DM/DKA if sudden worsening of diabetic control.",
                panels: [
                  {
                    label: "Not on Steroids — New Hyperglycaemia",
                    color: "#742a2a",
                    headerBg: "#fff5f5",
                    blocks: [
                      {
                        icon: "glucose", heading: "Trigger", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "New onset fasting glucose >7.0 mmol/L OR random glucose >11 mmol/L",
                          "No concurrent steroid use",
                        ],
                      },
                      {
                        icon: "investigations", heading: "Investigate for DKA First", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "Blood glucose, urine ketones, venous pH, bicarbonate",
                          "HBA1c, U&E, LFT",
                        ],
                      },
                      {
                        icon: "management", heading: "Management", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "!!DKA positive: hold immunotherapy immediately, manage per NUH DKA guideline, endocrinology referral",
                          "DKA negative: likely new type 1 diabetes — will require insulin per 'Referral pathway — Type 1 diabetes new diagnosis'",
                        ],
                      },
                    ],
                  },
                  {
                    label: "On Steroids — Pre-existing T2DM",
                    color: "#744210",
                    headerBg: "#fffff0",
                    blocks: [
                      {
                        icon: "management", heading: "Management", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: [
                          "Increase frequency of capillary blood glucose monitoring",
                          "Titrate usual medication: metformin, gliclazide, or insulin",
                          "If usually diet-controlled: manage as 'no previous T2DM' pathway below",
                          "Plan medication reduction when steroids are weaned",
                          "Advise to call Rapid Response if unwell or glucose poorly controlled",
                        ],
                      },
                    ],
                  },
                  {
                    label: "On Steroids — No Previous T2DM",
                    color: "#744210",
                    headerBg: "#fffff0",
                    blocks: [
                      {
                        icon: "management", heading: "Management", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: [
                          "Consider planned duration of steroids — if stopping imminently and asymptomatic, observation alone may suffice",
                          "Start gliclazide 40–80mg morning, titrate to max 240mg morning",
                          "Add evening dose up to total 320mg/day if required",
                          "Warn of hypoglycaemia risk and its appropriate management",
                          "Discuss symptoms of hyperglycaemia — advise to call Rapid Response if present or unwell",
                          "Plan medication reduction when steroids weaned",
                          "If persistent hyperglycaemia despite gliclazide titration: discuss insulin with endocrinology",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        
          {
            id: "io-pneumonitis",
            title: "Pneumonitis",
            category: "Pulmonary & Renal",
            summary: "Grade 1 (radiographic only — ground glass): consider delay, monitor every 2–3 days. Grade 2 (mild/moderate symptoms — dyspnoea, cough, chest pain): treat infection first; if no infection or no improvement with antibiotics after 48h: prednisolone 1mg/kg/day. Grade 3–4 (severe symptoms, new/worsening hypoxia, ARDS): admit, IV methylprednisolone 1–2mg/kg/day, taper over 6 weeks, ceiling of care discussion. If no improvement in 48h: infliximab 5mg/kg (or mycophenolate if concurrent hepatic toxicity, or IVIG). Investigations: CXR, B-D glucan/galactomannan, viral PCR (PCP + COVID), troponin (myocarditis), BNP (heart failure).",
            tags: ["Pneumonitis", "Ground glass", "Methylprednisolone", "Infliximab", "ARDS"],
            related: ["io-colitis", "io-hepatitis"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/io-pneumonitis",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/io-pneumonitis",
            updated: "Jan 2024",
            sections: [
              {
                heading: "Grade & Manage",
                type: "grader",
                grades: [
                  { grade: 1, label: "Grade 1 — Radiographic only", color: "#276749", bg: "#f0fff4", border: "#9ae6b4", criteria: ["Ground glass change only on imaging", "Non-specific pneumonitis", "No new symptoms"] },
                  { grade: 2, label: "Grade 2 — Mild/Moderate Symptoms", color: "#744210", bg: "#fffff0", border: "#f6e05e", criteria: ["New dyspnoea", "Cough", "Chest pain"] },
                  { grade: 3, label: "Grade 3/4 — Severe / Life-threatening", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", criteria: ["Severe new symptoms", "New or worsening hypoxia", "Life-threatening difficulty breathing", "Acute respiratory distress syndrome (ARDS)"] },
                ],
                management: [
                  { grade: 1, icpi: "Low threshold to withhold ICPI", items: ["Consider delaying treatment", "Monitor symptoms every 2–3 days", "If worsens: manage as grade 2 or 3/4 as appropriate", "Investigations: CXR, B-D glucan + galactomannan (fungal screen), viral PCR including PCP and COVID, sputum sample"] },
                  { grade: 2, icpi: "Withhold ICPI", items: ["Start antibiotics if infection suspected (fever, raised CRP/neutrophils)", "If no evidence of infection OR no improvement with antibiotics after 48h: prednisolone 1mg/kg/day orally", "If no improvement after 48h of oral prednisolone: manage as grade 3", "Consider respiratory referral", "Investigations: as grade 1 PLUS BNP (exclude heart failure), troponin (myocarditis), weekly CXR, lung function tests", "Resting and ambulatory O₂ saturations", "Consider HRCT with contrast", "Consider bronchoscopy/BAL to rule out infection", "Consider urine pneumococcus + legionella if clinically appropriate"] },
                  { grade: 3, icpi: "Withhold/discontinue ICPI", items: ["!!Admit to hospital", "!!IV methylprednisolone 1–2mg/kg/day — plan taper over 6 weeks", "Discuss and set ceiling of care", "Consider respiratory review", "Investigations: as grades 1 and 2", "!!If no improvement in 48h: infliximab 5mg/kg OR mycophenolate (if concurrent hepatic toxicity) OR IVIG"] },
                ],
              },
            ],
          },
          {
            id: "io-nephritis",
            title: "Nephritis",
            category: "Pulmonary & Renal",
            summary: "Grade 1 (creatinine 1.5–2× baseline/ULN): weekly U&Es. Grade 2 (2–3×): review hydration, renal USS, creatinine in 48–72h, nephrology discussion (biopsy), steroids 0.5–1mg/kg if IRAE. Grade 3/4 (>3×, grade 4 = dialysis indicated): admit, strict fluid balance, daily U&Es, nephrology + biopsy, methylprednisolone 1–2mg/kg. If no improvement after 1 week: azathioprine, cyclophosphamide, ciclosporin, infliximab or mycophenolate. May need renal replacement therapy.",
            tags: ["Nephritis", "Creatinine", "Renal biopsy", "Mycophenolate", "Nephrologist"],
            related: ["io-pneumonitis"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/io-nephritis",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/io-nephritis",
            updated: "Jan 2024",
            sections: [
              {
                heading: "Grade & Manage",
                type: "grader",
                grades: [
                  { grade: 1, label: "Grade 1", color: "#276749", bg: "#f0fff4", border: "#9ae6b4", criteria: ["Creatinine 1.5–2× above baseline or ULN (whichever is higher)"] },
                  { grade: 2, label: "Grade 2", color: "#744210", bg: "#fffff0", border: "#f6e05e", criteria: ["Creatinine 2–3× above baseline or ULN"] },
                  { grade: 3, label: "Grade 3", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d", criteria: ["Creatinine >3× baseline or ULN"] },
                  { grade: 4, label: "Grade 4", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", criteria: ["Creatinine >6× ULN", "Dialysis indicated"] },
                ],
                management: [
                  { grade: 1, icpi: "Continue ICPI", items: ["Review hydration status, medications, urine test/culture if UTI symptoms", "Dipstick urine + protein assessment (UPCR)", "If obstruction suspected: renal USS ± Doppler", "Repeat U&Es weekly — if worsens: manage per grade"] },
                  { grade: 2, icpi: "Withhold ICPI. If investigations do not attribute to IRAE — may continue.", items: ["Investigations as grade 1 + renal USS (obstruction/clot)", "If proteinuria: 24h UPCR + random protein:creatinine ratio", "If blood: phase contrast microscopy + glomerulonephritis screen (if nephrologist recommends)", "Consider renal biopsy", "Advise patient to notify if oliguric", "Review hydration and creatinine in 48–72h", "Discuss with nephrologist (need for biopsy)", "If IRAE: steroids 0.5–1mg/kg"] },
                  { grade: 3, icpi: "Withhold/discontinue ICPI", items: ["!!Admit to hospital", "Investigations as grades 1 and 2", "Strict fluid balance + daily U&Es", "!!Discuss with nephrologist — need for biopsy", "!!IV (methyl)prednisolone 1–2mg/kg", "If no improvement after 1 week of steroids: consider azathioprine, cyclophosphamide, ciclosporin, infliximab, or mycophenolate", "May need renal replacement therapy"] },
                  { grade: 4, icpi: "Withhold/discontinue ICPI", items: ["As grade 3", "!!Urgent nephrology — renal replacement therapy likely required"] },
                ],
              },
            ],
          },
        
          {
            id: "io-arthralgia",
            title: "Arthralgia",
            category: "Musculoskeletal",
            summary: "Grade 1 (mild pain, single joint, erythema/swelling): paracetamol + ibuprofen. Grade 2 (moderate pain, multiple joints, limits instrumental ADLs): NSAIDs (diclofenac/naproxen/etoricoxib); if inadequate: prednisolone 10–20mg or intra-articular steroids for large joints. Grade 3–4 (severe, irreversible joint damage, limits self-care): prednisolone 0.5–1mg/kg; if no improvement in 4 weeks or worsening: rheumatology referral + consider anti-TNFα. Monitor ESR/CRP q4–6 weeks.",
            tags: ["Arthralgia", "NSAIDs", "Prednisolone", "Anti-TNFα", "Rheumatology"],
            related: ["io-myositis"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/io-arthralgia",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/io-arthralgia",
            updated: "Jan 2024",
          },
          {
            id: "io-myositis",
            title: "Myalgia & Myositis",
            category: "Musculoskeletal",
            summary: "Myalgia: marked muscle discomfort. Myositis: inflammation/weakness of skeletal muscles. Grade 1 (mild pain): pain treatment, monitor serial CK + troponin, muscle strength testing. Consider concomitant MG or myocarditis. Grade 2 (moderate pain + weakness, elevated CK/aldolase, limiting ADLs): prednisolone 1–2mg/kg/day ± IVIG 2g/kg; consider muscle MRI + EMG + biopsy + rheumatology/neurology consult. Grade 3 (severe weakness, limiting self-care): as grade 2; if refractory: plasmapheresis, infliximab or mycophenolate. Hold immunotherapy from grade 2, permanently discontinue from grade 3.",
            tags: ["Myositis", "CK", "IVIG", "Myocarditis", "Troponin"],
            related: ["io-arthralgia", "io-gbs-mg"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/io-myositis",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/io-myositis",
            updated: "Jan 2024",
          },
        
          {
            id: "io-steroids-guide",
            title: "Steroid Prescribing & Monitoring",
            category: "Steroid Management",
            summary: "All patients on steroids for irAE: issue pharmacy steroid card + Steroid Alert Card (carry at all times). Steroid taper: irAEs may worsen during dose reduction — counsel patients, escalate if needed, record in hand-held record. PPI required for high-dose steroids (lansoprazole 30mg OD or omeprazole 40mg OD). If on or will be on high-dose steroids >2 weeks: add cotrimoxazole 480mg OD (PCP prophylaxis) + AdCal D3 1 tablet daily (osteoporosis prevention). Do NOT check cortisol whilst on steroids.",
            tags: ["PPI", "PCP prophylaxis", "Steroid card", "Bone protection", "Cortisol"],
            related: ["io-hypophysitis", "io-adrenal", "io-pneumonitis"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/io-steroids",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/io-steroids",
            updated: "Jan 2024",
            sections: [
              {
                heading: "Standard Supportive Care with Steroids",
                type: "checklist",
                items: [
                  "Issue pharmacy steroid card — dose, timing, side effects",
                  "Issue Steroid Alert Card — patient to carry at all times",
                  "Prescribe PPI: lansoprazole 30mg OD or omeprazole 40mg OD",
                  "If high-dose steroids anticipated >2 weeks: cotrimoxazole 480mg OD (PCP prophylaxis)",
                  "If high-dose steroids anticipated >2 weeks: AdCal D3 1 tablet daily (osteoporosis prevention)",
                  "Do NOT check cortisol whilst patient is on steroids",
                  "Counsel patient: irAEs may worsen during taper — report return of symptoms promptly",
                  "Encourage maintenance of activity levels to minimise muscle wasting",
                  "Document all steroid dose changes in hand-held record",
                ],
              },
            ],
          },
        
        ],
      },
      {
        id: "onco-vte-haem",
        label: "VTE & Haemostasis",
        guidelines: [
          {
            id: "onco-vte",
            title: "Cancer-Associated Thrombosis (VTE)",
            category: "VTE & Haemostasis",
            summary: "Diagnosis and management of DVT and PE in cancer patients. LMWH vs DOAC selection (Khorana score, bleeding risk), treatment duration, IVC filter indications, and management of anticoagulation around invasive procedures.",
            tags: ["VTE", "PE", "DVT", "LMWH", "DOAC", "Khorana"],
            related: ["onco-svco", "onco-dit"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/cancer-vte",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/cancer-vte",
            updated: "Mar 2025",
          },
          {
            id: "onco-bone-pain-acute",
            title: "Acute Bone Pain Crisis",
            category: "VTE & Haemostasis",
            summary: "Management of acute severe bone pain in oncology inpatients including pathological fracture recognition, urgent orthopaedic referral criteria, analgesic escalation, radiation emergency referral pathway, and G-CSF-induced bone pain.",
            tags: ["Bone pain", "Pathological fracture", "Orthopaedics", "G-CSF"],
            related: ["onco-mscc", "pall-bone-pain", "pall-pain"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/acute-bone-pain",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/acute-bone-pain",
            updated: "Feb 2025",
          },
        ],
      },
      {
        id: "onco-outpatient",
        label: "Outpatient Oncology",
        guidelines: [],
        comingSoon: true,
      },
    ],
    get guidelines() {
      return this.subsites.flatMap(ss => ss.guidelines || []);
    },
  },
  {
    id: "palliative",
    label: "Palliative Care",
    color: "#4a7c6b",
    accent: "#eaf3f0",
    isParent: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    calculators: [
      { label: "Opioid Equianalgesic Converter", url: "#calc-opioid" },
      { label: "Syringe Driver Calculator", url: "#calc-syringe" },
      { label: "Palliative Prognostic Score", url: "#calc-pps" },
      { label: "RASS / Sedation Scale", url: "#calc-rass" },
    ],
    subsites: [
      {
        id: "pall-symptom",
        label: "Symptom Control",
        guidelines: [
          {
            id: "pall-pain",
            title: "Cancer Pain Management",
            category: "Symptom Control",
            summary: "WHO analgesic ladder application, opioid titration, breakthrough dosing, and rotation principles. Covers oral, subcutaneous, and transdermal routes.",
            tags: ["WHO Ladder", "Opioids", "Breakthrough", "Rotation"],
            related: ["pall-syringe", "pall-bone-pain", "pall-neuropathic"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/pall-pain",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/pall-pain",
            updated: "Mar 2025",
          },
          {
            id: "pall-neuropathic",
            title: "Neuropathic Pain",
            category: "Symptom Control",
            summary: "Adjuvant analgesic selection including gabapentinoids, tricyclics, SNRIs, and ketamine. Neuropathic pain assessment tools and management in the palliative setting.",
            tags: ["Gabapentin", "Ketamine", "Adjuvants", "Assessment"],
            related: ["pall-pain", "pall-syringe"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/pall-neuropathic",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/pall-neuropathic",
            updated: "Jan 2025",
          },
          {
            id: "pall-bone-pain",
            title: "Bone Pain & Hypercalcaemia",
            category: "Symptom Control",
            summary: "Bisphosphonates and denosumab for bone pain, radiotherapy referral criteria, and hypercalcaemia of malignancy management including rehydration and zoledronic acid.",
            tags: ["Zoledronic acid", "Denosumab", "Hypercalcaemia", "RT"],
            related: ["pall-pain", "onco-bone-mets"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/pall-bone",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/pall-bone",
            updated: "Feb 2025",
          },
          {
            id: "pall-breathlessness",
            title: "Breathlessness",
            category: "Symptom Control",
            summary: "Non-pharmacological and pharmacological management of cancer-related breathlessness. Low-dose opioids, benzodiazepines, fan therapy, and oxygen use.",
            tags: ["Opioids", "Benzodiazepines", "Oxygen", "Dyspnoea"],
            related: ["pall-syringe", "pall-anxiety"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/pall-breathlessness",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/pall-breathlessness",
            updated: "Feb 2025",
          },
          {
            id: "pall-nausea",
            title: "Nausea & Vomiting",
            category: "Symptom Control",
            summary: "Cause-directed antiemetic selection, opioid-induced nausea management, bowel obstruction nausea, and CSCI antiemetic protocols.",
            tags: ["Antiemetics", "Metoclopramide", "Cyclizine", "Haloperidol"],
            related: ["pall-syringe", "pall-bowel"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/pall-nausea",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/pall-nausea",
            updated: "Jan 2025",
          },
          {
            id: "pall-bowel",
            title: "Bowel Management",
            category: "Symptom Control",
            summary: "Constipation prevention and treatment in opioid-treated patients, malignant bowel obstruction medical management, diarrhoea causes and treatment.",
            tags: ["Constipation", "Laxatives", "MBO", "Diarrhoea"],
            related: ["pall-nausea", "pall-pain"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/pall-bowel",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/pall-bowel",
            updated: "Nov 2024",
          },
          {
            id: "pall-anxiety",
            title: "Anxiety & Agitation",
            category: "Symptom Control",
            summary: "Management of anxiety disorders in palliative patients, existential distress, terminal restlessness, and refractory agitation. Benzodiazepines and antipsychotics.",
            tags: ["Midazolam", "Haloperidol", "Terminal restlessness", "Existential"],
            related: ["pall-syringe", "pall-breathlessness", "pall-sedation"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/pall-anxiety",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/pall-anxiety",
            updated: "Mar 2025",
          },
        ],
      },
      {
        id: "pall-routes",
        label: "Routes of Administration",
        guidelines: [
          {
            id: "pall-syringe",
            title: "Syringe Driver Protocol",
            category: "Routes of Administration",
            summary: "Indications, drug compatibility, infusion rates, and dose calculations for continuous subcutaneous infusions. Includes common drug combinations and incompatibilities.",
            tags: ["CSCI", "Compatibility", "Subcutaneous", "T34"],
            related: ["pall-pain", "pall-nausea", "pall-anxiety"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/syringe-driver",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/syringe-driver",
            updated: "Apr 2025",
          },
          {
            id: "pall-opioid-conversion",
            title: "Opioid Conversion",
            category: "Routes of Administration",
            summary: "Equianalgesic dose tables for opioid switching. Oral to subcutaneous conversion, transdermal patches, fentanyl and buprenorphine dosing, and dose reduction rationale.",
            tags: ["Equianalgesic", "Fentanyl patch", "Conversion", "Rotation"],
            related: ["pall-pain", "pall-syringe", "pall-renal"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/opioid-conversion",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/opioid-conversion",
            updated: "Mar 2025",
          },
          {
            id: "pall-renal",
            title: "Renal Impairment & Opioids",
            category: "Routes of Administration",
            summary: "Safe prescribing of opioids in renal failure, accumulation risk, preferred agents (alfentanil, fentanyl), and dose reduction / frequency adjustment guidance.",
            tags: ["Alfentanil", "Fentanyl", "eGFR", "Accumulation"],
            related: ["pall-opioid-conversion", "pall-pain"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/pall-renal",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/pall-renal",
            updated: "Jan 2025",
          },
        ],
      },
      {
        id: "pall-eol",
        label: "End of Life",
        guidelines: [
          {
            id: "pall-eolc",
            title: "End of Life Care",
            category: "End of Life",
            summary: "Recognition of dying, DNACPR decisions, preferred place of care, Individualised Care Plan, communication with patients and families, and verification of death.",
            tags: ["DNACPR", "ICP", "Preferred place", "Ceiling of care"],
            related: ["pall-sedation", "pall-syringe", "pall-spiritual"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/eolc",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/eolc",
            updated: "Apr 2025",
          },
          {
            id: "pall-sedation",
            title: "Palliative Sedation",
            category: "End of Life",
            summary: "Indications for palliative sedation, consent and capacity considerations, proportionate sedation, and monitoring refractory symptoms.",
            tags: ["Refractory symptoms", "Midazolam", "Proportionate", "Capacity"],
            related: ["pall-eolc", "pall-anxiety", "pall-syringe"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/pall-sedation",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/pall-sedation",
            updated: "Feb 2025",
          },
          {
            id: "pall-spiritual",
            title: "Psychosocial & Spiritual Care",
            category: "End of Life",
            summary: "Spiritual and existential distress assessment, chaplaincy referral, bereavement support, and dignity-centred communication frameworks.",
            tags: ["Dignity therapy", "Chaplaincy", "Bereavement", "SPICT"],
            related: ["pall-eolc", "pall-anxiety"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/pall-spiritual",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/pall-spiritual",
            updated: "Jan 2025",
          },
        ],
      },
      {
        id: "pall-emergencies",
        label: "Oncological Emergencies",
        guidelines: [
          {
            id: "pall-mscc",
            title: "Malignant Spinal Cord Compression",
            category: "Oncological Emergencies",
            summary: "MSCC recognition, dexamethasone dosing, urgent imaging pathway, neurosurgical vs RT decision-making, and post-treatment rehabilitation.",
            tags: ["MSCC", "Dexamethasone", "Urgent RT", "Decompression"],
            related: ["pall-eolc", "onco-cns", "onco-bone-mets"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/mscc",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/mscc",
            updated: "Mar 2025",
          },
          {
            id: "pall-svco",
            title: "Superior Vena Cava Obstruction",
            category: "Oncological Emergencies",
            summary: "Clinical recognition of SVCO, emergency management with steroids, stenting vs RT decision, and palliative RT fractionation options.",
            tags: ["SVCO", "Stenting", "Steroids", "Palliative RT"],
            related: ["pall-mscc", "onco-svco"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/svco",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/svco",
            updated: "Nov 2024",
          },
          {
            id: "pall-haemorrhage",
            title: "Catastrophic Haemorrhage",
            category: "Oncological Emergencies",
            summary: "Anticipation and preparation for catastrophic bleeding in malignancy, emergency management, sedation for distress, and communication with families.",
            tags: ["Catastrophic bleed", "Dark towels", "Midazolam", "Anticipatory"],
            related: ["pall-eolc", "pall-sedation"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/haemorrhage",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/haemorrhage",
            updated: "Oct 2024",
          },
        ],
      },
    ],
    get guidelines() {
      return this.subsites.flatMap(ss => ss.guidelines || []);
    },
  },

];

const ALL_GUIDELINES = SITES.flatMap(s => {
  if (s.isParent) {
    return s.subsites.flatMap(ss => (ss.guidelines || []).map(g => ({ ...g, siteId: s.id, siteLabel: s.label, siteColor: s.color, subsiteId: ss.id, subsiteLabel: ss.label })));
  }
  return (s.guidelines || []).map(g => ({ ...g, siteId: s.id, siteLabel: s.label, siteColor: s.color }));
});

// ── CALCULATORS REGISTRY ─────────────────────────────────────────────────────

const CALCULATORS = {
  "irae-grade": {
    id: "irae-grade",
    label: "irAE CTCAE Grade Calculator",
    siteId: "oncology",
    icon: "🧬",
    whenToUse: {
      headline: "When to use this calculator",
      checks: [
        { type: "question", text: "Is the patient on immunotherapy? Check Chemocare — confirm they are actively receiving or have recently received a checkpoint inhibitor (pembrolizumab, nivolumab, ipilimumab, atezolizumab, durvalumab, cemiplimab, avelumab)." },
        { type: "warning", text: "Immunotherapy only, or combination with chemotherapy? If on chemotherapy too, neutropenic sepsis must be excluded first before attributing symptoms to irAE — check neutrophil count and use the Neutropenic Sepsis pathway if indicated." },
        { type: "warning", text: "Could this be infection rather than irAE? Pneumonitis, diarrhoea, and rash can all have infective mimics. Ensure relevant cultures, imaging, and bloods are done before committing to high-dose steroids." },
        { type: "question", text: "Has baseline been established? Grade is relative to the patient's pre-treatment state — confirm what their baseline LFTs, creatinine, and bowel habit were before treatment started." },
        { type: "info", text: "This calculator uses CTCAE v5.0 criteria and NUH Guideline 2857 v3.0 management recommendations. Always discuss Grade 3–4 irAEs with the oncology team." },
      ],
    },
    component: "irae",
  },
  "mascc": {
    id: "mascc",
    label: "MASCC Risk Score",
    siteId: "oncology",
    icon: "🦠",
    whenToUse: {
      headline: "When to use the MASCC score",
      checks: [
        { type: "question", text: "Has neutropenic sepsis criteria been met? The MASCC score is only relevant after the patient has already met criteria for febrile neutropenia (neutrophils <1.0, temp >38°C or sepsis signs). Do not use it to decide whether to treat." },
        { type: "warning", text: "Do NOT use MASCC to delay antibiotics. Antibiotics must be given within 60 minutes regardless of MASCC score. Use the score at 24–48 hours to guide oral switch or early discharge, not initial treatment." },
        { type: "question", text: "Is the patient clinically improving at 24–48h? The score is most useful when deciding whether a patient who is improving can be switched to oral antibiotics and potentially discharged." },
        { type: "info", text: "MASCC score ≥21: low-risk — suitable for oral switch and consider early discharge. MASCC score <21: high-risk — continue IV antibiotics and inpatient management." },
        { type: "warning", text: "High-risk features that override a 'low-risk' MASCC score: haematological malignancy, recent stem cell transplant, suspected line infection, MRSA carriage, or clinician concern." },
      ],
    },
    component: "mascc",
  },
  "sins": {
    id: "sins",
    label: "SINS Score (Spinal Instability)",
    siteId: "oncology",
    icon: "🦴",
    whenToUse: {
      headline: "When to use the SINS score",
      checks: [
        { type: "question", text: "Has MSCC been confirmed or suspected on MRI? The SINS score should be calculated once spinal metastatic disease is identified on imaging — it guides whether a surgical opinion is needed." },
        { type: "info", text: "SINS 0–6: Stable spine — no surgical referral needed for instability alone. SINS 7–12: Indeterminate — consider surgical opinion. SINS 13–18: Unstable — surgical consultation required." },
        { type: "warning", text: "SINS does not replace clinical judgment. A patient with SINS 7 and deteriorating neurology needs urgent surgical input regardless of the score. Always correlate with neurological examination and Frankel grade." },
        { type: "question", text: "Is the pain mechanical or biological? Mechanical pain (worse on movement/weight-bearing) suggests instability and increases the SINS score. Biological pain (constant, worse at night) does not score for instability." },
        { type: "info", text: "The MRI report should include SINS and Bilsky (ESCC) scores per NUH protocol. If not included, request a radiology addendum or calculate from imaging findings." },
      ],
    },
    component: "sins",
  },
  "tokuhashi": {
    id: "tokuhashi",
    label: "Revised Tokuhashi Score",
    siteId: "oncology",
    icon: "📊",
    whenToUse: {
      headline: "When to use the Tokuhashi score",
      checks: [
        { type: "question", text: "Has MSCC been confirmed? The Tokuhashi score is used after MSCC is established on imaging to estimate prognosis and guide treatment intensity — surgery vs RT vs supportive care." },
        { type: "warning", text: "Tokuhashi is a guide, not a verdict. A score <8 suggests prognosis <6 months and favours conservative management, but this must be discussed with the patient, their oncologist, and the MDT. Do not withhold surgery on score alone." },
        { type: "info", text: "Score 0–8: <6 months prognosis — conservative or palliative management. Score 9–11: >6 months — consider palliative surgery. Score 12–15: >1 year — consider excisional surgery." },
        { type: "question", text: "Has the primary tumour site been confirmed histologically? The primary tumour heavily influences the score — prostate, thyroid, and breast score highest (5 points). Unknown primary scores 2. Ensure pathology is confirmed before scoring." },
        { type: "info", text: "Use alongside Frankel classification (neurological function), Bilsky scale (cord compression degree), and SINS score (spinal instability) as part of the NOMS framework." },
      ],
    },
    component: "tokuhashi",
  },
};



const CTCAE_SYMPTOMS = [
  {
    id: "diarrhoea", label: "Diarrhoea / Colitis",
    parameter: "Number of loose stools over baseline per day",
    grades: [
      { grade: 1, label: "Grade 1", description: "≤3 stools/day over baseline — mild increase in ostomy output", color: "#276749", bg: "#f0fff4", border: "#9ae6b4" },
      { grade: 2, label: "Grade 2", description: "4–6 stools/day over baseline — abdominal pain, blood or nocturnal episodes", color: "#744210", bg: "#fffff0", border: "#f6e05e" },
      { grade: 3, label: "Grade 3", description: "≥7 stools/day over baseline OR loose stools within 1h of eating", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d" },
      { grade: 4, label: "Grade 4", description: "Life-threatening: perforation, ischaemia, or haemodynamic instability", color: "#742a2a", bg: "#fff5f5", border: "#fc8181" },
    ],
    action: ["Hydration + monitor q72h", "Prednisolone 0.5–1mg/kg or budesonide 3mg TDS. Outpatient flexi-sig.", "Admit SRU. IV methylprednisolone 1–2mg/kg. Urgent flexi-sig + CT.", "Admit. IV methylprednisolone. Surgical review urgently."],
    icpi: ["Continue", "Continue (withhold if no improvement)", "Withhold", "Withhold — surgical review"],
  },
  {
    id: "transaminitis", label: "Hepatitis (Transaminitis)",
    parameter: "ALT or AST level",
    grades: [
      { grade: 1, label: "Grade 1", description: "ALT/AST < 3× ULN", color: "#276749", bg: "#f0fff4", border: "#9ae6b4" },
      { grade: 2, label: "Grade 2", description: "ALT/AST 3–5× ULN", color: "#744210", bg: "#fffff0", border: "#f6e05e" },
      { grade: 3, label: "Grade 3", description: "ALT/AST 5–20× ULN", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d" },
      { grade: 4, label: "Grade 4", description: "ALT/AST > 20× ULN — or bilirubin >1.5× ULN with Grade >1 transaminitis", color: "#742a2a", bg: "#fff5f5", border: "#fc8181" },
    ],
    action: ["Monitor: repeat LFTs in 1 week", "Review medications. Re-check LFTs q3–4 days. Consultant decision to start steroids.", "Withhold ICPI. LFTs q2–3 days. Consider hepatology. Start prednisolone 0.5–1mg/kg if not improving.", "Admit. IV methylprednisolone 1–2mg/kg. Hepatology review + liver biopsy."],
    icpi: ["Continue", "Withhold until Grade 1", "Withhold. Taper steroids over 4–6 weeks.", "Withhold. Taper steroids. Consider restart at Grade ≤2."],
  },
  {
    id: "rash", label: "Skin Rash",
    parameter: "Body surface area (BSA) involved",
    grades: [
      { grade: 1, label: "Grade 1", description: "< 10% BSA — with or without symptoms (pruritus, burning)", color: "#276749", bg: "#f0fff4", border: "#9ae6b4" },
      { grade: 2, label: "Grade 2", description: "10–30% BSA — symptoms limiting instrumental ADLs", color: "#744210", bg: "#fffff0", border: "#f6e05e" },
      { grade: 3, label: "Grade 3", description: "> 30% BSA — limiting self-care ADLs OR severe symptoms", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d" },
      { grade: 4, label: "Grade 4", description: "> 30% BSA with epidermal detachment or mucosal involvement (SJS/TEN)", color: "#742a2a", bg: "#fff5f5", border: "#fc8181" },
    ],
    action: ["Topical hydrocortisone 1% or clobetasone 0.05%. Soap-free cleanser. Antihistamine PRN.", "Medium/high potency topical steroid. If unresponsive: prednisolone 0.5mg/kg/day.", "Prednisolone 0.5–1mg/kg × 3 days, then wean. If severe: IV methylprednisolone. Consider inpatient.", "Admit. IV methylprednisolone 1–2mg/kg. IV fluids. Urgent dermatology + critical care."],
    icpi: ["Continue", "Continue (withhold if persistent/recurrent)", "Withhold until Grade ≤1 and pred <10mg", "Consultant decision on restart"],
  },
  {
    id: "dyspnoea", label: "Pneumonitis",
    parameter: "Symptoms and oxygen requirements",
    grades: [
      { grade: 1, label: "Grade 1", description: "Radiographic changes only — ground glass on CT, no symptoms", color: "#276749", bg: "#f0fff4", border: "#9ae6b4" },
      { grade: 2, label: "Grade 2", description: "New dyspnoea, cough or chest pain — mild/moderate", color: "#744210", bg: "#fffff0", border: "#f6e05e" },
      { grade: 3, label: "Grade 3", description: "Severe new symptoms — significant hypoxia", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d" },
      { grade: 4, label: "Grade 4", description: "Life-threatening — ARDS, ventilatory support required", color: "#742a2a", bg: "#fff5f5", border: "#fc8181" },
    ],
    action: ["Consider delay. Monitor q2–3 days. CXR, B-D glucan, viral PCR.", "Antibiotics if infection suspected. If no infection or no Abx response at 48h: prednisolone 1mg/kg/day.", "Admit. IV methylprednisolone 1–2mg/kg. Taper over 6 weeks. Ceiling of care discussion.", "ICU. IV methylprednisolone. Consider infliximab 5mg/kg or IVIG if no response at 48h."],
    icpi: ["Low threshold to withhold", "Withhold", "Withhold/discontinue", "Withhold/discontinue"],
  },
  {
    id: "creatinine", label: "Nephritis",
    parameter: "Creatinine vs baseline/ULN",
    grades: [
      { grade: 1, label: "Grade 1", description: "Creatinine 1.5–2× baseline or ULN", color: "#276749", bg: "#f0fff4", border: "#9ae6b4" },
      { grade: 2, label: "Grade 2", description: "Creatinine 2–3× baseline or ULN", color: "#744210", bg: "#fffff0", border: "#f6e05e" },
      { grade: 3, label: "Grade 3", description: "Creatinine > 3× baseline or ULN", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d" },
      { grade: 4, label: "Grade 4", description: "Creatinine > 6× ULN — dialysis indicated", color: "#742a2a", bg: "#fff5f5", border: "#fc8181" },
    ],
    action: ["Weekly U&Es. Review hydration + medications. Dipstick urine.", "Renal USS. UPCR. Review in 48–72h. Discuss with nephrologist. Steroids 0.5–1mg/kg if IRAE.", "Admit. Strict fluid balance + daily U&Es. Nephrologist + biopsy. IV methylprednisolone 1–2mg/kg.", "Admit. As Grade 3. Urgent nephrology — renal replacement likely."],
    icpi: ["Continue", "Withhold (may continue if not attributable to IRAE)", "Withhold/discontinue", "Withhold/discontinue"],
  },
  {
    id: "arthralgia", label: "Arthralgia / Joint Pain",
    parameter: "Severity and functional impact",
    grades: [
      { grade: 1, label: "Grade 1", description: "Mild pain — single joint, erythema or swelling, no functional impact", color: "#276749", bg: "#f0fff4", border: "#9ae6b4" },
      { grade: 2, label: "Grade 2", description: "Moderate pain — multiple joints, limiting instrumental ADLs", color: "#744210", bg: "#fffff0", border: "#f6e05e" },
      { grade: 3, label: "Grade 3/4", description: "Severe pain — irreversible joint damage, limiting self-care ADLs", color: "#742a2a", bg: "#fff5f5", border: "#fc8181" },
    ],
    action: ["Paracetamol + ibuprofen. Rheumatological history, joint exam, autoimmune panel.", "NSAIDs (diclofenac/naproxen/etoricoxib). Prednisolone 10–20mg or intra-articular steroid for large joints.", "Prednisolone 0.5–1mg/kg. If no improvement in 4 weeks: rheumatology referral + consider anti-TNFα."],
    icpi: ["Continue", "Consider withholding — resume on symptom control + pred <10mg", "Withhold/discontinue"],
  },
];

function IraeGradeCalculator({ siteColor, siteAccent }) {
  const [symptom, setSymptom] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);

  const current = CTCAE_SYMPTOMS.find(s => s.id === symptom);
  const result = current && selectedGrade ? {
    grade: current.grades.find(g => g.grade === selectedGrade),
    action: current.action[selectedGrade - 1],
    icpi: current.icpi[selectedGrade - 1],
  } : null;

  return (
    <div className="detail-card" style={{ marginTop: 14 }}>
      <h3 style={{ marginBottom: 12 }}>CTCAE irAE Grade Calculator</h3>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.5 }}>
        Select a symptom system and grade to get the CTCAE-based management recommendation.
      </p>

      {/* Step 1: Symptom */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "Sora, sans-serif", marginBottom: 8 }}>Step 1 — Symptom System</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {CTCAE_SYMPTOMS.map(s => (
            <button key={s.id}
              onClick={() => { setSymptom(s.id); setSelectedGrade(null); }}
              style={{ padding: "6px 12px", borderRadius: 99, border: `1.5px solid ${symptom === s.id ? siteColor : "var(--border)"}`, background: symptom === s.id ? siteAccent : "var(--bg)", color: symptom === s.id ? siteColor : "var(--text-secondary)", fontSize: 12.5, fontWeight: symptom === s.id ? 600 : 400, cursor: "pointer", transition: "all 0.15s", fontFamily: "DM Sans, sans-serif" }}
            >{s.label}</button>
          ))}
        </div>
      </div>

      {/* Step 2: Grade */}
      {current && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "Sora, sans-serif", marginBottom: 6 }}>Step 2 — {current.parameter}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {current.grades.map(g => (
              <div key={g.grade}
                onClick={() => setSelectedGrade(selectedGrade === g.grade ? null : g.grade)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 12px", border: `1.5px solid ${selectedGrade === g.grade ? g.color : g.border}`, borderRadius: 8, background: selectedGrade === g.grade ? g.bg : "var(--surface)", cursor: "pointer", transition: "all 0.15s" }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", background: g.bg, border: `1.5px solid ${g.border}`, color: g.color, fontSize: 11, fontWeight: 700, fontFamily: "Sora, sans-serif", flexShrink: 0 }}>{g.grade}</span>
                <span style={{ fontSize: 13, color: selectedGrade === g.grade ? g.color : "var(--text-secondary)", lineHeight: 1.45 }}>{g.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div style={{ borderRadius: 10, overflow: "hidden", border: `2px solid ${result.grade.color}`, marginTop: 4 }}>
          <div style={{ background: result.grade.bg, padding: "10px 14px", borderBottom: `1px solid ${result.grade.border}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: result.grade.color, fontFamily: "Sora, sans-serif", marginBottom: 4 }}>{result.grade.label} — Recommended Management</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", background: result.grade.border, borderRadius: 99 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: result.grade.color, fontFamily: "Sora, sans-serif", letterSpacing: "0.06em" }}>ICPI</span>
              <span style={{ width: 1, height: 10, background: result.grade.color, opacity: 0.3, display: "inline-block" }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: result.grade.color }}>{result.icpi}</span>
            </div>
          </div>
          <div style={{ padding: "12px 14px", background: "var(--surface)" }}>
            <p style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.6 }}>{result.action}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function GraderSection({ sec, siteColor, siteId, subsiteId }) {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [openMgmt, setOpenMgmt] = useState({});
  const toggleMgmt = (g) => setOpenMgmt(s => ({ ...s, [g]: s[g] === false ? undefined : false }));
  const treatmentLabel = (siteId === "immunotherapy" || subsiteId === "onco-io") ? "ICPI" : "SACT";

  const gradeColors = {
    1: { color: "#276749", bg: "#f0fff4", border: "#9ae6b4", badge: "#c6f6d5" },
    2: { color: "#744210", bg: "#fffff0", border: "#f6e05e", badge: "#fefcbf" },
    3: { color: "#7b341e", bg: "#fff5f0", border: "#fbd38d", badge: "#feebc8" },
    4: { color: "#742a2a", bg: "#fff5f5", border: "#fc8181", badge: "#fed7d7" },
  };

  return (
    <div>
      {/* Step 1: Grade selector */}
      <div className="detail-card" style={{ marginBottom: 10 }}>
        <h3 style={{ marginBottom: 12 }}>Step 1 — Select Grade</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {sec.grades.map((g) => {
            const gc = gradeColors[g.grade] || gradeColors[3];
            const isSelected = selectedGrade === g.grade;
            return (
              <div key={g.grade}
                onClick={() => setSelectedGrade(isSelected ? null : g.grade)}
                style={{ border: `1.5px solid ${isSelected ? gc.color : gc.border}`, borderRadius: 8, background: isSelected ? gc.bg : "var(--surface)", cursor: "pointer", transition: "all 0.15s", overflow: "hidden" }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: isSelected ? gc.bg : "var(--bg)", borderBottom: isSelected ? `1px solid ${gc.border}` : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: "50%", background: gc.badge, color: gc.color, fontSize: 12, fontWeight: 700, fontFamily: "Sora, sans-serif", flexShrink: 0 }}>{g.grade}</span>
                    <span style={{ fontWeight: 600, fontSize: 13.5, fontFamily: "Sora, sans-serif", color: gc.color }}>{g.label}</span>
                  </div>
                  <span style={{ color: gc.color, opacity: 0.7, transform: isSelected ? "rotate(90deg)" : "none", transition: "transform 0.15s", display: "flex" }}><IconChevronRight /></span>
                </div>
                {isSelected && (
                  <div style={{ padding: "10px 14px 12px" }}>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                      {g.criteria.map((c, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5, color: gc.color, lineHeight: 1.55 }}>
                          <span style={{ flexShrink: 0, marginTop: 3, fontSize: 9 }}>●</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 2: Management — collapsible per grade */}
      <div className="detail-card">
        <h3 style={{ marginBottom: 12 }}>Step 2 — Management by Grade</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {sec.management.map((mgmt) => {
            const gc = gradeColors[mgmt.grade] || gradeColors[3];
            const isHighlighted = selectedGrade === mgmt.grade;
            const isOpen = openMgmt[mgmt.grade] !== false;

            // Parse ICPI keyword for compact label
            const icpiVerb = mgmt.icpi
              ? mgmt.icpi.toLowerCase().includes("discontinue") ? "Discontinue"
              : mgmt.icpi.toLowerCase().includes("withhold") ? "Withhold"
              : mgmt.icpi.toLowerCase().includes("continue") ? "Continue"
              : "Review"
              : null;

            return (
              <div key={mgmt.grade} style={{ border: `1.5px solid ${isHighlighted ? gc.color : "var(--border)"}`, borderRadius: 8, overflow: "hidden", boxShadow: isHighlighted ? `0 0 0 3px ${gc.badge}` : "none", transition: "box-shadow 0.2s, border-color 0.2s" }}>

                {/* Header row — clean, no truncation */}
                <div onClick={() => toggleMgmt(mgmt.grade)}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer", background: isHighlighted ? gc.bg : "var(--bg)", transition: "background 0.15s" }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: "50%", background: gc.badge, color: gc.color, fontSize: 11, fontWeight: 700, fontFamily: "Sora, sans-serif", flexShrink: 0 }}>{mgmt.grade}</span>
                  <span style={{ fontWeight: 600, fontSize: 13, fontFamily: "Sora, sans-serif", color: isHighlighted ? gc.color : "var(--text-primary)", flex: 1 }}>Grade {mgmt.grade} Management</span>
                  {icpiVerb && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", background: "var(--surface)", border: `1px solid ${gc.border}`, borderRadius: 4, fontSize: 10.5, fontWeight: 600, color: gc.color, flexShrink: 0, fontFamily: "Sora, sans-serif", letterSpacing: "0.02em" }}>
                      <span style={{ opacity: 0.5, fontWeight: 400 }}>{treatmentLabel}</span>
                      <span style={{ width: 1, height: 10, background: gc.border, display: "inline-block", margin: "0 2px" }} />
                      {icpiVerb}
                    </span>
                  )}
                  <span style={{ color: isHighlighted ? gc.color : "var(--text-muted)", transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.15s", display: "flex", flexShrink: 0 }}><IconChevronRight /></span>
                </div>

                {/* Expanded body */}
                {isOpen && (
                  <div style={{ borderTop: `1px solid ${isHighlighted ? gc.border : "var(--border-light)"}`, background: isHighlighted ? gc.bg : "var(--surface)" }}>

                    {/* Treatment label nested callout */}
                    {mgmt.icpi && (
                      <div style={{ margin: "10px 14px 0", padding: "8px 12px", background: gc.badge, borderRadius: 6, display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: gc.color, fontFamily: "Sora, sans-serif", textTransform: "uppercase", flexShrink: 0 }}>{treatmentLabel}</span>
                        <span style={{ width: 1, height: 14, background: gc.border, display: "inline-block", flexShrink: 0 }} />
                        <span style={{ fontSize: 12.5, fontWeight: 600, color: gc.color, lineHeight: 1.4 }}>{mgmt.icpi}</span>
                      </div>
                    )}

                    {/* Management items */}
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6, padding: "10px 14px 14px" }}>
                      {mgmt.items.map((item, i) => {
                        const isUrgent = item.startsWith("!!");
                        const text = isUrgent ? item.slice(2).trim() : item;
                        if (isUrgent) {
                          return (
                            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9, padding: "7px 10px", background: gc.badge, border: `1px solid ${gc.border}`, borderRadius: 6, lineHeight: 1.5 }}>
                              <span style={{ color: gc.color, flexShrink: 0, fontSize: 13, marginTop: 1 }}>⚡</span>
                              <span style={{ fontSize: 13.5, fontWeight: 700, color: gc.color }}>{text}</span>
                            </li>
                          );
                        }
                        return (
                          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>
                            <span style={{ color: isHighlighted ? gc.color : siteColor, flexShrink: 0, fontSize: 9, marginTop: 5 }}>●</span>
                            {text}
                          </li>
                        );
                      })}
                    </ul>
                    {mgmt.note && <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "0 14px 14px", fontStyle: "italic", lineHeight: 1.5 }}>{mgmt.note}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {sec.note && <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 12, fontStyle: "italic", lineHeight: 1.5 }}>ⓘ {sec.note}</p>}
      </div>
    </div>
  );
}

function MasccCalculator() {
  const items = [
    { id: "burden", label: "Burden of illness", options: [{ label: "No or mild symptoms", score: 5 }, { label: "Moderate symptoms", score: 3 }, { label: "Severe symptoms", score: 0 }] },
    { id: "hypotension", label: "No hypotension (SBP ≥90 mmHg)", options: [{ label: "Yes — no hypotension", score: 5 }, { label: "No — hypotension present", score: 0 }] },
    { id: "copd", label: "No COPD", options: [{ label: "No COPD", score: 4 }, { label: "COPD present", score: 0 }] },
    { id: "solidtumour", label: "Solid tumour or no previous fungal infection", options: [{ label: "Yes", score: 4 }, { label: "No (haem malignancy or previous fungal infection)", score: 0 }] },
    { id: "dehydration", label: "No dehydration requiring IV fluids", options: [{ label: "No dehydration", score: 3 }, { label: "Dehydration present", score: 0 }] },
    { id: "outpatient", label: "Outpatient at onset of fever", options: [{ label: "Yes — outpatient onset", score: 3 }, { label: "No — inpatient onset", score: 0 }] },
    { id: "age", label: "Age < 60 years", options: [{ label: "Age < 60", score: 2 }, { label: "Age ≥ 60", score: 0 }] },
  ];
  const [answers, setAnswers] = useState({});
  const total = Object.values(answers).reduce((s, v) => s + v, 0);
  const answered = Object.keys(answers).length;
  const allDone = answered === items.length;
  const isLowRisk = total >= 21;

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map(item => (
          <div key={item.id} style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "9px 12px", background: "var(--bg)", fontSize: 13, fontWeight: 500, color: "var(--text-primary)", borderBottom: "1px solid var(--border-light)" }}>{item.label}</div>
            <div style={{ display: "flex", gap: 0 }}>
              {item.options.map((opt, i) => (
                <button key={i} onClick={() => setAnswers(a => ({ ...a, [item.id]: opt.score }))}
                  style={{ flex: 1, padding: "8px 10px", border: "none", borderRight: i < item.options.length - 1 ? "1px solid var(--border-light)" : "none", background: answers[item.id] === opt.score ? (opt.score > 0 ? "#f0fff4" : "#fff5f5") : "var(--surface)", color: answers[item.id] === opt.score ? (opt.score > 0 ? "#276749" : "#742a2a") : "var(--text-secondary)", fontSize: 12.5, cursor: "pointer", transition: "all 0.15s", fontFamily: "DM Sans, sans-serif", fontWeight: answers[item.id] === opt.score ? 600 : 400, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}
                >
                  <span>{opt.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.8 }}>+{opt.score}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {allDone && (
        <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 10, border: `2px solid ${isLowRisk ? "#9ae6b4" : "#fc8181"}`, background: isLowRisk ? "#f0fff4" : "#fff5f5" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 22, fontWeight: 700, fontFamily: "Sora, sans-serif", color: isLowRisk ? "#276749" : "#742a2a" }}>Score: {total}</span>
            <span style={{ padding: "4px 12px", borderRadius: 99, background: isLowRisk ? "#9ae6b4" : "#fc8181", color: isLowRisk ? "#276749" : "#742a2a", fontWeight: 700, fontSize: 13, fontFamily: "Sora, sans-serif" }}>{isLowRisk ? "LOW RISK" : "HIGH RISK"}</span>
          </div>
          <p style={{ fontSize: 13.5, color: isLowRisk ? "#276749" : "#742a2a", lineHeight: 1.6 }}>
            {isLowRisk
              ? "MASCC ≥21 — Low risk. Consider oral switch (co-amoxiclav or ciprofloxacin) and early discharge if clinically improving and no high-risk features."
              : "MASCC <21 — High risk. Continue IV antibiotics. Inpatient management required. Do not switch to oral or discharge early."}
          </p>
          <button onClick={() => setAnswers({})} style={{ marginTop: 10, padding: "5px 12px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface)", fontSize: 12, cursor: "pointer", color: "var(--text-muted)", fontFamily: "DM Sans, sans-serif" }}>Reset</button>
        </div>
      )}
      {!allDone && answered > 0 && (
        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: "var(--bg)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{answered}/{items.length} answered</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: "var(--accent)", fontFamily: "Sora, sans-serif" }}>Running total: {total}</span>
        </div>
      )}
    </div>
  );
}

function SinsCalculator() {
  const criteria = [
    { id: "location", label: "Location", options: [{ label: "Junctional (C0–C2, C7–T2, T11–L1, L5–S1)", score: 3 }, { label: "Mobile spine (C3–C6, L2–L4)", score: 2 }, { label: "Semi-rigid (T3–T10)", score: 1 }, { label: "Rigid (S2–S5)", score: 0 }] },
    { id: "pain", label: "Pain — mechanical or movement-related", options: [{ label: "Yes — pain with movement/load", score: 3 }, { label: "Occasional, non-mechanical", score: 1 }, { label: "Pain-free lesion", score: 0 }] },
    { id: "bone", label: "Bone lesion type", options: [{ label: "Lytic", score: 2 }, { label: "Mixed (lytic/blastic)", score: 1 }, { label: "Blastic", score: 0 }] },
    { id: "alignment", label: "Radiographic spinal alignment", options: [{ label: "Subluxation / translation present", score: 4 }, { label: "De novo deformity (kyphosis/scoliosis)", score: 2 }, { label: "Normal alignment", score: 0 }] },
    { id: "collapse", label: "Vertebral body collapse", options: [{ label: ">50% collapse", score: 3 }, { label: "<50% collapse", score: 2 }, { label: "No collapse, >50% body involved", score: 1 }, { label: "None of the above", score: 0 }] },
    { id: "posterior", label: "Posterolateral involvement", options: [{ label: "Bilateral", score: 3 }, { label: "Unilateral", score: 1 }, { label: "None", score: 0 }] },
  ];
  const [answers, setAnswers] = useState({});
  const total = Object.values(answers).reduce((s, v) => s + v, 0);
  const allDone = Object.keys(answers).length === criteria.length;
  const stability = total <= 6 ? { label: "STABLE", color: "#276749", bg: "#f0fff4", border: "#9ae6b4", desc: "SINS 0–6: Stable spine. No surgical referral required for instability alone." }
    : total <= 12 ? { label: "INDETERMINATE", color: "#744210", bg: "#fffff0", border: "#f6e05e", desc: "SINS 7–12: Possible impending instability. Surgical opinion recommended." }
    : { label: "UNSTABLE", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", desc: "SINS 13–18: Unstable spine. Surgical consultation required urgently." };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {criteria.map(item => (
          <div key={item.id} style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "9px 12px", background: "var(--bg)", fontSize: 13, fontWeight: 500, color: "var(--text-primary)", borderBottom: "1px solid var(--border-light)" }}>{item.label}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {item.options.map((opt, i) => (
                <button key={i} onClick={() => setAnswers(a => ({ ...a, [item.id]: opt.score }))}
                  style={{ padding: "8px 12px", border: "none", borderBottom: i < item.options.length - 1 ? "1px solid var(--border-light)" : "none", background: answers[item.id] === opt.score ? "#e8f4f8" : "var(--surface)", color: answers[item.id] === opt.score ? "#1a6b8a" : "var(--text-secondary)", fontSize: 12.5, cursor: "pointer", transition: "all 0.15s", fontFamily: "DM Sans, sans-serif", fontWeight: answers[item.id] === opt.score ? 600 : 400, display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "left" }}
                >
                  <span>{opt.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, flexShrink: 0, marginLeft: 8 }}>{opt.score} pts</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {Object.keys(answers).length > 0 && (
        <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 10, border: `2px solid ${allDone ? stability.border : "var(--border)"}`, background: allDone ? stability.bg : "var(--bg)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: allDone ? 8 : 0 }}>
            <span style={{ fontSize: 22, fontWeight: 700, fontFamily: "Sora, sans-serif", color: allDone ? stability.color : "var(--accent)" }}>Score: {total} / 18</span>
            {allDone && <span style={{ padding: "4px 12px", borderRadius: 99, background: stability.border, color: stability.color, fontWeight: 700, fontSize: 13, fontFamily: "Sora, sans-serif" }}>{stability.label}</span>}
          </div>
          {allDone && <p style={{ fontSize: 13.5, color: stability.color, lineHeight: 1.6 }}>{stability.desc}</p>}
          <button onClick={() => setAnswers({})} style={{ marginTop: 10, padding: "5px 12px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface)", fontSize: 12, cursor: "pointer", color: "var(--text-muted)", fontFamily: "DM Sans, sans-serif" }}>Reset</button>
        </div>
      )}
    </div>
  );
}

function CalculatorView({ calcId, onNavigate }) {
  const calc = CALCULATORS[calcId];
  if (!calc) return null;
  const site = SITES.find(s => s.id === calc.siteId);

  const checkColors = {
    question: { bg: "#f0f7ff", border: "#bfdbfe", color: "#1e40af", icon: "?" },
    warning: { bg: "#fffbeb", border: "#fde68a", color: "#92400e", icon: "⚠" },
    info: { bg: "#f0fff4", border: "#bbf7d0", color: "#166534", icon: "ℹ" },
  };

  return (
    <div style={{ maxWidth: 720 }}>
      <button className="detail-back-btn" onClick={() => onNavigate({ type: "calculators" })}>
        <IconArrowLeft />
        Back to Calculators
      </button>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div className="detail-category-badge" style={{ background: site?.accent || "#f0f0f0", color: site?.color || "#555" }}>
          <span style={{ fontSize: 14 }}>{calc.icon}</span>
          {site?.label || "Calculator"}
        </div>
        <h1 className="detail-title">{calc.label}</h1>
      </div>

      {/* When to use */}
      <div className="detail-card" style={{ marginBottom: 14 }}>
        <h3 style={{ marginBottom: 12 }}>{calc.whenToUse.headline}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {calc.whenToUse.checks.map((check, i) => {
            const c = checkColors[check.type];
            return (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 12px", background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8 }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", background: c.border, color: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{c.icon}</span>
                <p style={{ fontSize: 13.5, color: c.color, lineHeight: 1.55, margin: 0 }}>{check.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calculator */}
      <div className="detail-card">
        <h3 style={{ marginBottom: 14 }}>Calculator</h3>
        {calc.component === "irae" && <IraeGradeCalculator siteColor={site?.color || "#6d4c9e"} siteAccent={site?.accent || "#f3effe"} />}
        {calc.component === "mascc" && <MasccCalculator />}
        {calc.component === "sins" && <SinsCalculator />}
        {calc.component === "tokuhashi" && (
          <div style={{ padding: "12px", background: "var(--bg)", borderRadius: 8, border: "1px solid var(--border)" }}>
            <p style={{ fontSize: 13.5, color: "var(--text-secondary)", marginBottom: 12 }}>The Revised Tokuhashi Score is best calculated using the validated MDCalc tool which includes full scoring tables:</p>
            <a href="https://www.mdcalc.com/calc/2130/revised-tokuhashi-score-metastatic-spinal-sarcoma" target="_blank" rel="noopener noreferrer"
              className="detail-btn detail-btn-primary" style={{ display: "inline-flex" }}>
              <IconExternal /> Open Tokuhashi Calculator on MDCalc
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function CalculatorsPage({ onNavigate }) {
  return (
    <div>
      <div className="home-greeting">
        <h1>Clinical Calculators</h1>
        <p>Interactive decision-support tools for NUH Acute Oncology</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {Object.values(CALCULATORS).map(calc => {
          const site = SITES.find(s => s.id === calc.siteId);
          return (
            <div key={calc.id}
              onClick={() => onNavigate({ type: "calculator", calcId: calc.id })}
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, cursor: "pointer", transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = site?.color || "var(--accent)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 10, background: site?.accent || "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{calc.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, fontFamily: "Sora, sans-serif", color: "var(--text-primary)", marginBottom: 2 }}>{calc.label}</div>
                <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{site?.label} · {calc.whenToUse.checks.length} clinical considerations</div>
              </div>
              <span style={{ color: "var(--text-muted)" }}><IconChevronRight /></span>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// ── FLAT SECTION ICONS ───────────────────────────────────────────────────────
const SectionIcons = {
  history: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <circle cx="8.5" cy="8.5" r="5.5"/><path d="M17 17l-3.5-3.5"/>
    </svg>
  ),
  immediate: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <path d="M10 2L2 17h16L10 2z"/><line x1="10" y1="9" x2="10" y2="13"/><circle cx="10" cy="15.5" r=".5" fill="currentColor"/>
    </svg>
  ),
  vial: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <path d="M7 2h6M8 2v5l-4 9a1 1 0 0 0 .9 1.5h10.2A1 1 0 0 0 16 16l-4-9V2"/>
      <line x1="6" y1="13" x2="14" y2="13"/>
    </svg>
  ),
  imaging: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <rect x="2" y="4" width="16" height="12" rx="1"/><circle cx="10" cy="10" r="3"/><line x1="14" y1="6" x2="16" y2="6"/>
    </svg>
  ),
  referral: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <path d="M17 8l-5-5-5 5M12 3v9"/><path d="M3 14v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1"/>
    </svg>
  ),
  monitoring: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <polyline points="2 10 6 6 9 13 12 8 15 11 18 8"/>
    </svg>
  ),

  symptoms: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <circle cx="10" cy="10" r="8"/><path d="M10 6v4l2.5 2.5"/>
    </svg>
  ),
  investigations: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <circle cx="8.5" cy="8.5" r="5.5"/><path d="M17 17l-3.5-3.5"/>
    </svg>
  ),
  management: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M9 3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/><path d="M17 3l-7 7"/><path d="M13 3h4v4"/>
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M10 2L2 17h16L10 2z"/><line x1="10" y1="9" x2="10" y2="13"/><circle cx="10" cy="15.5" r=".5" fill="currentColor"/>
    </svg>
  ),
  icpi: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 10l2 2 4-4"/>
    </svg>
  ),
  bloods: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M10 2l5 8a5 5 0 1 1-10 0l5-8z"/>
    </svg>
  ),
  neuro: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M10 3c3.3 0 6 2.7 6 6 0 2.5-1.5 4.7-3.7 5.7V17H7.7v-2.3C5.5 13.7 4 11.5 4 9c0-3.3 2.7-6 6-6z"/><path d="M8 9h4M10 7v4"/>
    </svg>
  ),
  drug: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <rect x="3" y="8" width="14" height="9" rx="1"/><path d="M7 8V5a3 3 0 0 1 6 0v3"/><line x1="10" y1="12" x2="10" y2="14"/>
    </svg>
  ),
  avoid: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <circle cx="10" cy="10" r="8"/><line x1="4.93" y1="4.93" x2="15.07" y2="15.07"/>
    </svg>
  ),
  tsh: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M3 10h14M3 5l4 5-4 5M17 5l-4 5 4 5"/>
    </svg>
  ),
  glucose: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M3 3h14v14H3z" rx="1"/><path d="M7 10h6M10 7v6"/>
    </svg>
  ),
};

function PillItem({ pill }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1.5px solid ${open ? pill.color : pill.border}`, borderRadius: 8, overflow: "hidden", transition: "border-color 0.15s" }}>
      <div onClick={() => setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: open ? pill.bg : "var(--bg)", cursor: "pointer", transition: "background 0.15s" }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 13.5, fontFamily: "Sora, sans-serif", color: open ? pill.color : "var(--text-primary)" }}>{pill.label}</div>
          <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 2 }}>{pill.indication}</div>
        </div>
        <span style={{ color: open ? pill.color : "var(--text-muted)", transform: open ? "rotate(90deg)" : "none", transition: "transform 0.15s", display: "flex", flexShrink: 0 }}><IconChevronRight /></span>
      </div>
      {open && (
        <div style={{ borderTop: `1px solid ${pill.border}`, background: pill.bg, padding: "10px 14px 14px" }}>
          {pill.urgent && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 9, padding: "8px 10px", background: pill.border, borderRadius: 6, marginBottom: 10 }}>
              <span style={{ color: pill.color, fontSize: 13, flexShrink: 0, marginTop: 1 }}>⚡</span>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: pill.color }}>{pill.urgent}</span>
            </div>
          )}
          {pill.exclusions && pill.exclusions.length > 0 && (
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
              {pill.exclusions.map((ex, j) => (
                <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  <span style={{ color: pill.color, fontSize: 9, flexShrink: 0, marginTop: 5 }}>●</span>
                  {ex}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}


function CinvTierBlock({ tier, c, siteColor }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1.5px solid ${open ? c.color : c.border}`, borderRadius: 10, overflow: "hidden", transition: "border-color 0.15s" }}>
      <div onClick={() => setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", background: open ? c.bg : "var(--bg)", cursor: "pointer", transition: "background 0.15s" }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13.5, color: open ? c.color : "var(--text-primary)" }}>{tier.label}</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2, lineHeight: 1.4 }}>{tier.agents}</div>
        </div>
        <span style={{ color: open ? c.color : "var(--text-muted)", transform: open ? "rotate(90deg)" : "none", transition: "transform 0.15s", display: "flex", flexShrink: 0 }}><IconChevronRight /></span>
      </div>
      {open && (
        <div style={{ borderTop: `1px solid ${c.border}`, background: "var(--surface)" }}>
          {[
            { key: "pre",    label: "Pre-chemotherapy",               icon: "→", color: c.color,   bg: c.bg,       border: c.border   },
            { key: "post",   label: "Post-chemotherapy",              icon: "↓", color: "#1a6b8a", bg: "#e8f4f8",  border: "#90cde0"  },
            { key: "second", label: "Second Line / If not controlled", icon: "↻", color: "#276749", bg: "#f0fff4",  border: "#9ae6b4"  },
          ].map(cell => {
            const items = tier[cell.key];
            if (!items || items.length === 0) return null;
            return (
              <div key={cell.key} style={{ borderBottom: "1px solid var(--border-light)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: cell.bg, borderBottom: `1px solid ${cell.border}` }}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: cell.border, color: cell.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{cell.icon}</span>
                  <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 11.5, color: cell.color, letterSpacing: "0.04em", textTransform: "uppercase" }}>{cell.label}</span>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6, padding: "10px 16px 12px", margin: 0 }}>
                  {items.map((item, ii) => {
                    const isUrgent = item.startsWith("!!");
                    const text = isUrgent ? item.slice(2).trim() : item;
                    return isUrgent ? (
                      <li key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 10px", background: "#fff5f5", border: "1px solid #fc8181", borderRadius: 6 }}>
                        <span style={{ color: "#742a2a", fontSize: 11, flexShrink: 0, marginTop: 2 }}>⚡</span>
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: "#742a2a", lineHeight: 1.45 }}>{text}</span>
                      </li>
                    ) : (
                      <li key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>
                        <span style={{ color: siteColor, fontSize: 8, flexShrink: 0, marginTop: 6 }}>●</span>
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          {tier.notes && (
            <div style={{ margin: "12px 16px", padding: "10px 14px", background: "#fffbeb", border: "1px solid #f6d860", borderRadius: 8, display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>ℹ</span>
              <p style={{ fontSize: 12.5, color: "#92700a", lineHeight: 1.6, margin: 0 }}>{tier.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SectionBlock({ sec, siteColor, siteAccent, siteId, subsiteId, expandedScore, setExpandedScore }) {
  if (sec.type === "callouts") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sec.panels.map((panel, pi) => (
          <div key={pi} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
            {/* Panel header */}
            <div style={{ padding: "11px 14px", background: panel.headerBg || "var(--bg)", borderBottom: "1px solid var(--border-light)", display: "flex", alignItems: "center", gap: 8 }}>
              {panel.color && <span style={{ width: 10, height: 10, borderRadius: "50%", background: panel.color, flexShrink: 0, display: "inline-block" }} />}
              <span style={{ fontWeight: 700, fontSize: 13.5, fontFamily: "Sora, sans-serif", color: panel.color || "var(--text-primary)" }}>{panel.label}</span>
            </div>
            {/* Callout blocks inside panel */}
            <div style={{ padding: "10px 12px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
              {panel.blocks.map((block, bi) => {
                const icon = SectionIcons[block.icon];
                const blockColor = block.color || siteColor;
                const isAlert = block.alert;
                return (
                  <div key={bi} style={{
                    padding: "9px 12px",
                    background: isAlert ? "#fff5f5" : block.bg || "var(--bg)",
                    border: `1px solid ${isAlert ? "#fc8181" : block.border || "var(--border-light)"}`,
                    borderLeft: `3px solid ${isAlert ? "#e53e3e" : blockColor}`,
                    borderRadius: 6,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      <span style={{ color: isAlert ? "#e53e3e" : blockColor, display: "flex", flexShrink: 0 }}>{icon}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "Sora, sans-serif", color: isAlert ? "#c53030" : blockColor }}>{block.heading}</span>
                    </div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 5, margin: 0, padding: 0 }}>
                      {block.items.map((item, ii) => {
                        const isUrgent = typeof item === "string" && item.startsWith("!!");
                        const text = isUrgent ? item.slice(2).trim() : item;
                        return isUrgent ? (
                          <li key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "5px 8px", background: "#fed7d7", border: "1px solid #fc8181", borderRadius: 5 }}>
                            <span style={{ color: "#742a2a", fontSize: 11, flexShrink: 0, marginTop: 2 }}>⚡</span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: "#742a2a", lineHeight: 1.45 }}>{text}</span>
                          </li>
                        ) : (
                          <li key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 13.5, color: isAlert ? "#742a2a" : "var(--text-secondary)", lineHeight: 1.5 }}>
                            <span style={{ color: isAlert ? "#e53e3e" : blockColor, fontSize: 8, flexShrink: 0, marginTop: 5 }}>●</span>
                            {text}
                          </li>
                        );
                      })}
                    </ul>
                    {block.note && <p style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 6, fontStyle: "italic", lineHeight: 1.45 }}>{block.note}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {sec.note && <p style={{ fontSize: 12, color: "var(--text-muted)", fontStyle: "italic", lineHeight: 1.5 }}>ⓘ {sec.note}</p>}
      </div>
    );
  }

  if (sec.type === "pills") {
    return (
      <div className="detail-card">
        <h3 style={{ marginBottom: 12 }}>{sec.heading}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {sec.items.map((pill, i) => <PillItem key={i} pill={pill} />)}
        </div>
        {sec.note && <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 12, fontStyle: "italic", lineHeight: 1.5 }}>ⓘ {sec.note}</p>}
      </div>
    );
  }
  // ── CINV Types — unified table, all blue, clock icon on timing ──────────
  if (sec.type === "cinv_types") {
    const C = { color: "#1a6b8a", bg: "#e8f4f8", border: "#90cde0", badge: "#b8dff0", divider: "#c8e6f2" };
    const ClockIcon = () => (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
        <circle cx="8" cy="8" r="6.5"/><polyline points="8 4.5 8 8 10.5 9.5"/>
      </svg>
    );
    return (
      <div className="detail-card">
        <h3 style={{ marginBottom: 12 }}>{sec.heading}</h3>
        <div style={{ border: `1.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
          {sec.types.map((t, i) => (
            <div key={i} style={{ borderBottom: i < sec.types.length - 1 ? `1px solid ${C.divider}` : "none" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "9px 16px", background: C.bg }}>
                <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13.5, color: C.color, letterSpacing: "-0.01em" }}>{t.label}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: C.color, opacity: 0.8, flexShrink: 0 }}>
                  <ClockIcon />{t.timing}
                </span>
              </div>
              <div style={{ padding: "10px 16px 12px", background: "var(--surface)", display: "flex", flexDirection: "column", gap: 7 }}>
                <p style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>{t.definition}</p>
                {t.notes && t.notes.map((note, ni) => {
                  const isUrgent = note.startsWith("!!");
                  const text = isUrgent ? note.slice(2).trim() : note;
                  return isUrgent ? (
                    <div key={ni} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 10px", background: C.badge, border: `1px solid ${C.border}`, borderRadius: 6 }}>
                      <span style={{ color: C.color, fontSize: 12, flexShrink: 0, marginTop: 1 }}>⚡</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.color, lineHeight: 1.45 }}>{text}</span>
                    </div>
                  ) : (
                    <div key={ni} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color: C.color, fontSize: 8, flexShrink: 0, marginTop: 5 }}>●</span>
                      <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55 }}>{text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── CINV Regimens — structured Pre/Post/2nd Line sub-cells ───────────────
  if (sec.type === "cinv_regimens") {
    const tierColors = {
      high:     { color: "#742a2a", bg: "#fff5f5", border: "#fc8181", badge: "#fecaca" },
      moderate: { color: "#7b341e", bg: "#fff5f0", border: "#fbd38d", badge: "#fde68a" },
      low:      { color: "#744210", bg: "#fffff0", border: "#f6e05e", badge: "#fef9c3" },
      minimal:  { color: "#276749", bg: "#f0fff4", border: "#9ae6b4", badge: "#d1fae5" },
    };
    return (
      <div className="detail-card">
        <h3 style={{ marginBottom: 4 }}>{sec.heading}</h3>
        {sec.note && <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12, fontStyle: "italic", lineHeight: 1.5 }}>ⓘ {sec.note}</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {sec.tiers.map((tier, ti) => {
            const c = tierColors[tier.key] || tierColors.high;
            return <CinvTierBlock key={ti} tier={tier} c={c} siteColor={siteColor} />;
          })}
        </div>
      </div>
    );
  }





  if (sec.type === "grader") {
    return <GraderSection sec={sec} siteColor={siteColor} siteId={siteId} subsiteId={subsiteId} />;
  }

  if (sec.type === "criteria") {
    return (
      <div className="detail-card">
        <h3>{sec.heading}</h3>
        {sec.intro && <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 12, fontWeight: 500 }}>{sec.intro}</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {sec.items.map((item, i) => (
            <div key={i} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: siteColor, fontFamily: "Sora, sans-serif", marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.detail}</div>
              {item.warning && (
                <div style={{ marginTop: 8, padding: "7px 10px", background: "#fffbeb", border: "1px solid #f6d860", borderRadius: 6, fontSize: 12.5, color: "#92700a", lineHeight: 1.5 }}>
                  ⚠ {item.warning}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sec.type === "checklist") {
    return (
      <div className="detail-card">
        <h3>{sec.heading}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>
          {sec.items.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: "var(--text-secondary)", padding: "6px 0", borderBottom: "1px solid var(--border-light)" }}>
              <span style={{ width: 18, height: 18, border: `2px solid ${siteColor}`, borderRadius: 4, flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.5 }} />
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sec.type === "alert") {
    return (
      <div className="detail-card" style={{ borderLeft: `3px solid #e53e3e`, background: "#fff5f5" }}>
        <h3 style={{ color: "#c53030" }}>{sec.heading}</h3>
        {sec.note && <p style={{ fontSize: 13, color: "#742a2a", marginBottom: 10, fontStyle: "italic" }}>{sec.note}</p>}
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
          {sec.items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5, color: "#742a2a" }}>
              <span style={{ color: "#e53e3e", marginTop: 2, flexShrink: 0, fontWeight: 700 }}>▸</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (sec.type === "steps") {
    return (
      <div className="detail-card">
        <h3>{sec.heading}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
          {sec.items.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%", background: siteAccent, color: siteColor,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, fontFamily: "Sora, sans-serif", flexShrink: 0, marginTop: 1
              }}>{i + 1}</div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2, fontFamily: "Sora, sans-serif" }}>{item.label}</div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sec.type === "list") {
    if (sec.groups) {
      const groupIconMap = {
        history: SectionIcons.history,
        immediate: SectionIcons.immediate,
        bloods: SectionIcons.vial,
        investigations: SectionIcons.imaging,
        referral: SectionIcons.referral,
        monitoring: SectionIcons.monitoring,
        management: SectionIcons.management,
        drug: SectionIcons.drug,
      };
      return (
        <div className="detail-card">
          <h3>{sec.heading}</h3>
          <div style={{ marginTop: 8 }}>
            {sec.groups.map((group, gi) => (
              <div key={gi} className="mgmt-group">
                <div className="mgmt-group-header">
                  <span style={{ color: siteColor, display: "flex" }}>{groupIconMap[group.icon] || SectionIcons.management}</span>
                  <span className="mgmt-group-label">{group.label}</span>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6, padding: 0, margin: 0 }}>
                  {group.items.map((item, ii) => {
                    const isUrgent = typeof item === "string" && item.startsWith("!!");
                    const text = isUrgent ? item.slice(2).trim() : item;
                    return isUrgent ? (
                      <li key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 9px", background: "#fff5f5", border: "1px solid #fc8181", borderRadius: 6 }}>
                        <span style={{ color: "#742a2a", fontSize: 11, flexShrink: 0, marginTop: 2 }}>⚡</span>
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: "#742a2a", lineHeight: 1.45 }}>{text}</span>
                      </li>
                    ) : (
                      <li key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>
                        <span style={{ color: siteColor, fontSize: 8, flexShrink: 0, marginTop: 6 }}>●</span>
                        {text}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          {sec.note && <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 10, fontStyle: "italic", lineHeight: 1.5 }}>{sec.note}</p>}
        </div>
      );
    }
    return (
      <div className="detail-card">
        <h3>{sec.heading}</h3>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, marginTop: 4 }}>
          {(sec.items || []).map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5, color: "var(--text-secondary)" }}>
              <span style={{ color: siteColor, flexShrink: 0, marginTop: 3, fontSize: 10 }}>●</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (sec.type === "table") {
    return (
      <div className="detail-card" style={{ overflowX: "auto" }}>
        <h3>{sec.heading}</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10, fontSize: 13 }}>
          <thead>
            <tr style={{ background: "var(--bg)" }}>
              {sec.columns.map((col, i) => (
                <th key={i} style={{
                  padding: "8px 10px", textAlign: "left", fontWeight: 600,
                  color: "var(--text-secondary)", borderBottom: "2px solid var(--border)",
                  fontFamily: "Sora, sans-serif", fontSize: 11.5, letterSpacing: "0.03em"
                }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sec.rows.map((row, ri) => (
              <tr key={ri} style={{ borderBottom: "1px solid var(--border-light)" }}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{
                    padding: "9px 10px", verticalAlign: "top",
                    color: ci === 0 ? "var(--text-primary)" : "var(--text-secondary)",
                    fontWeight: ci === 0 ? 500 : 400,
                    lineHeight: 1.55,
                  }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {sec.note && (
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 10, fontStyle: "italic", lineHeight: 1.5 }}>{sec.note}</p>
        )}
      </div>
    );
  }

  if (sec.type === "scores") {
    return (
      <div className="detail-card">
        <h3>{sec.heading}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          {sec.items.map((score, i) => {
            const isOpen = expandedScore === i;
            return (
              <div key={i} style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
                <div
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", cursor: "pointer", background: isOpen ? siteAccent : "var(--bg)", transition: "background 0.15s" }}
                  onClick={() => setExpandedScore(isOpen ? null : i)}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5, color: isOpen ? siteColor : "var(--text-primary)", fontFamily: "Sora, sans-serif" }}>{score.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{score.interpretation}</div>
                  </div>
                  <span style={{ color: isOpen ? siteColor : "var(--text-muted)", transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.15s", flexShrink: 0 }}>
                    <IconChevronRight />
                  </span>
                </div>
                {isOpen && (
                  <div style={{ padding: "10px 14px 12px", borderTop: "1px solid var(--border-light)" }}>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
                      {score.criteria.map((c, j) => (
                        <li key={j} style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--text-secondary)" }}>
                          <span style={{ color: siteColor, flexShrink: 0, fontSize: 10, marginTop: 4 }}>●</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}

// ── CALCULATORS REGISTRY ─────────────────────────────────────────────────────



// ── HELPERS ───────────────────────────────────────────────────────────────────

function findGuideline(id) {
  return ALL_GUIDELINES.find(g => g.id === id);
}


// ── ICONS ─────────────────────────────────────────────────────────────────────

const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const IconChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconStar = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconExternal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const IconPDF = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);
const IconPin = ({ pinned }) => (
  <svg viewBox="0 0 24 24" fill={pinned ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IconCalc = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="12" y2="18"/>
  </svg>
);
const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

// ── STYLES ────────────────────────────────────────────────────────────────────


const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f7f8fa;
    --surface: #ffffff;
    --border: #e4e8ed;
    --border-light: #eff1f5;
    --text-primary: #0f1923;
    --text-secondary: #5a6474;
    --text-muted: #9ba3af;
    --accent: #1a6b8a;
    --accent-light: #e8f4f8;
    --accent-hover: #145773;
    --sidebar-width: 268px;
    --shadow-sm: 0 1px 3px rgba(15,25,35,0.06), 0 1px 2px rgba(15,25,35,0.04);
    --shadow-md: 0 4px 12px rgba(15,25,35,0.08), 0 2px 4px rgba(15,25,35,0.04);
    --shadow-lg: 0 12px 32px rgba(15,25,35,0.10), 0 4px 8px rgba(15,25,35,0.05);
    --radius: 10px;
    --radius-sm: 6px;
    --transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text-primary); line-height: 1.6; }
  h1,h2,h3,h4,h5 { font-family: 'Sora', sans-serif; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }

  /* Layout */
  .app { display: flex; height: 100vh; overflow: hidden; }

  /* Sidebar */
  .sidebar {
    width: var(--sidebar-width);
    min-width: var(--sidebar-width);
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    transition: width var(--transition), min-width var(--transition), transform var(--transition);
    overflow: hidden;
    z-index: 100;
  }
  .sidebar.collapsed { width: 0; min-width: 0; border-right: none; }
  .sidebar.floating {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    box-shadow: var(--shadow-lg);
  }
  .sidebar-header {
    padding: 16px 16px 12px;
    border-bottom: 1px solid var(--border-light);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }
  .sidebar-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Sora', sans-serif;
    font-weight: 600;
    font-size: 13px;
    color: var(--text-primary);
    letter-spacing: -0.01em;
  }
  .sidebar-logo-dot {
    width: 26px; height: 26px;
    background: linear-gradient(135deg, var(--accent) 0%, #2a9bc4 100%);
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    color: white;
    font-size: 11px; font-weight: 700; font-family: 'Sora', sans-serif;
  }


  .sidebar-content { flex: 1; overflow-y: auto; padding: 8px 8px 16px; }

  .sidebar-section { margin-bottom: 4px; }
  .sidebar-section-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 6px 8px;
    cursor: pointer;
    border-radius: var(--radius-sm);
    transition: background var(--transition);
    user-select: none;
  }
  .sidebar-section-header:hover { background: var(--bg); }
  .sidebar-section-title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
    font-family: 'Sora', sans-serif;
  }
  .sidebar-section-body { overflow: hidden; }

  .sidebar-item {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 10px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: 13px;
    color: var(--text-secondary);
    transition: all var(--transition);
    text-decoration: none;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    touch-action: manipulation;
  }
  .sidebar-item:hover { background: var(--bg); color: var(--text-primary); }
  .sidebar-item.active { background: var(--accent-light); color: var(--accent); font-weight: 500; }
  .sidebar-item-icon { flex-shrink: 0; opacity: 0.7; }
  .sidebar-sub-item {
    padding: 5px 10px 5px 28px;
    font-size: 12.5px;
  }

  .site-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .sidebar-divider { height: 1px; background: var(--border-light); margin: 8px 8px; }

  /* Main */
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* Topbar */
  .topbar {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 12px 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }
  .topbar-menu-btn {
    width: 34px; height: 34px;
    border: 1px solid var(--border);
    background: var(--bg);
    border-radius: var(--radius-sm);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: var(--text-secondary);
    transition: all var(--transition);
    flex-shrink: 0;
  }
  .topbar-menu-btn:hover { color: var(--accent); border-color: var(--accent); background: var(--accent-light); }
  .topbar-fav-btn { position: relative; color: var(--text-muted); }
  .topbar-fav-btn:hover { color: #f59e0b; border-color: #f6d860; background: #fef9e7; }
  .topbar-fav-btn.active { color: #f59e0b; border-color: #f6d860; background: #fef9e7; }
  .topbar-fav-badge {
    position: absolute;
    top: -5px; right: -5px;
    min-width: 16px; height: 16px;
    background: #f59e0b;
    color: white;
    border-radius: 99px;
    font-size: 9px;
    font-weight: 700;
    font-family: 'Sora', sans-serif;
    display: flex; align-items: center; justify-content: center;
    padding: 0 3px;
    line-height: 1;
  }

  .topbar-breadcrumb {
    display: flex; align-items: center; gap: 6px;
    font-size: 13px;
    color: var(--text-muted);
    flex: 1;
  }
  .topbar-breadcrumb span { color: var(--text-primary); font-weight: 500; }
  .topbar-breadcrumb a { color: var(--text-muted); cursor: pointer; text-decoration: none; transition: color var(--transition); }
  .topbar-breadcrumb a:hover { color: var(--accent); }

  .search-wrap {
    position: relative;
    flex-shrink: 0;
  }
  .search-input {
    width: 220px;
    padding: 7px 12px 7px 34px;
    border: 1px solid var(--border);
    border-radius: 99px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text-primary);
    transition: all var(--transition);
    outline: none;
  }
  .search-input:focus { border-color: var(--accent); background: white; box-shadow: 0 0 0 3px rgba(26,107,138,0.08); width: 280px; }
  .search-input::placeholder { color: var(--text-muted); }
  .search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; }

  /* Content */
  .content { flex: 1; overflow-y: auto; padding: 28px 32px; }

  /* Homepage */
  .home-greeting {
    margin-bottom: 28px;
  }
  .home-greeting h1 {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin-bottom: 4px;
  }
  .home-greeting p { font-size: 14px; color: var(--text-muted); }

  .home-section-title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--text-muted);
    font-family: 'Sora', sans-serif;
    margin-bottom: 12px;
  }

  .sites-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 14px;
    margin-bottom: 32px;
  }
  .site-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    cursor: pointer;
    transition: all var(--transition);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .site-card:hover { border-color: var(--site-color, var(--accent)); box-shadow: var(--shadow-md); transform: translateY(-1px); }
  .site-card-icon {
    width: 44px; height: 44px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    background: var(--site-accent, var(--accent-light));
    color: var(--site-color, var(--accent));
  }
  .site-card-name {
    font-size: 14px; font-weight: 600;
    font-family: 'Sora', sans-serif;
    color: var(--text-primary);
    letter-spacing: -0.01em;
  }
  .site-card-count { font-size: 12px; color: var(--text-muted); }
  .site-card-preview {
    display: flex; flex-direction: column; gap: 3px;
    margin-top: 4px;
  }
  .site-card-preview-item {
    font-size: 11.5px;
    color: var(--text-secondary);
    display: flex; align-items: center; gap: 6px;
  }
  .site-card-preview-item::before {
    content: '';
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--site-color, var(--accent));
    opacity: 0.5;
    flex-shrink: 0;
  }

  /* Favourites */
  .favourites-section { margin-bottom: 32px; }
  .favourites-grid {
    display: flex; flex-wrap: wrap; gap: 8px;
  }
  .fav-chip {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 99px;
    font-size: 12.5px;
    cursor: pointer;
    transition: all var(--transition);
    color: var(--text-secondary);
  }
  .fav-chip:hover { border-color: var(--site-color, var(--accent)); color: var(--site-color, var(--accent)); background: var(--site-accent, var(--accent-light)); }
  .fav-chip-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .fav-empty {
    font-size: 13px;
    color: var(--text-muted);
    font-style: italic;
    padding: 4px 0;
  }

  /* Site view */
  .site-header {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border-light);
  }
  .site-header-icon {
    width: 48px; height: 48px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
  }
  .site-header-info h2 {
    font-size: 20px; font-weight: 600;
    letter-spacing: -0.02em;
    margin-bottom: 2px;
  }
  .site-header-info p { font-size: 13px; color: var(--text-muted); }

  .guidelines-list { display: flex; flex-direction: column; gap: 2px; }
  .guideline-category {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--text-muted);
    font-family: 'Sora', sans-serif;
    padding: 16px 0 6px;
  }
  .guideline-row {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--transition);
    border: 1px solid transparent;
    background: var(--surface);
    margin-bottom: 3px;
  }
  .guideline-row:hover { border-color: var(--border); box-shadow: var(--shadow-sm); background: var(--surface); }
  .guideline-row-content { flex: 1; min-width: 0; }
  .guideline-row-title {
    font-size: 13.5px; font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 2px;
    font-family: 'Sora', sans-serif;
  }
  .guideline-row-summary {
    font-size: 12px;
    color: var(--text-muted);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .guideline-row-meta {
    display: flex; align-items: center; gap: 8px;
    flex-shrink: 0;
  }
  .guideline-row-updated {
    font-size: 11px;
    color: var(--text-muted);
  }
  .star-btn {
    width: 28px; height: 28px;
    border: none; background: transparent;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: var(--text-muted);
    border-radius: var(--radius-sm);
    transition: all var(--transition);
    flex-shrink: 0;
  }
  .star-btn:hover { color: #f59e0b; background: #fef3c7; }
  .star-btn.starred { color: #f59e0b; }
  .tags-row { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px; }
  .tag {
    padding: 2px 8px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 99px;
    font-size: 11px;
    color: var(--text-secondary);
  }

  /* Guideline detail */
  .guideline-detail { max-width: 760px; }
  .detail-header {
    margin-bottom: 24px;
  }
  .detail-back-btn {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12.5px;
    color: var(--text-muted);
    cursor: pointer;
    border: none; background: none;
    padding: 4px 0;
    margin-bottom: 12px;
    transition: color var(--transition);
    font-family: 'DM Sans', sans-serif;
  }
  .detail-back-btn:hover { color: var(--accent); }
  .detail-title {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-bottom: 4px;
    color: var(--text-primary);
  }
  .detail-category-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 3px 10px;
    border-radius: 99px;
    font-size: 11.5px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  .detail-meta { font-size: 12px; color: var(--text-muted); margin-bottom: 16px; }

  .detail-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 22px 24px;
    margin-bottom: 14px;
  }
  .detail-card h3 {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
    font-family: 'Sora', sans-serif;
    margin-bottom: 10px;
  }
  .detail-card p { font-size: 14px; color: var(--text-secondary); line-height: 1.7; }

  .detail-actions {
    display: flex; gap: 10px;
    flex-wrap: wrap;
  }
  .detail-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 16px;
    border-radius: var(--radius-sm);
    font-size: 13px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all var(--transition);
    text-decoration: none;
    border: 1px solid var(--border);
  }
  .detail-btn-primary {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
  }
  .detail-btn-primary:hover { background: var(--accent-hover); }
  .detail-btn-secondary {
    background: var(--surface);
    color: var(--text-secondary);
  }
  .detail-btn-secondary:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }

  .related-list { display: flex; flex-direction: column; gap: 6px; }
  .related-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 9px 12px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-light);
    cursor: pointer;
    transition: all var(--transition);
    background: var(--bg);
  }
  .related-item:hover { border-color: var(--border); background: var(--surface); box-shadow: var(--shadow-sm); }
  .related-item-info {}
  .related-item-title { font-size: 13px; font-weight: 500; color: var(--text-primary); font-family: 'Sora', sans-serif; }
  .related-item-site { font-size: 11.5px; color: var(--text-muted); margin-top: 1px; }

  /* Search results */
  .search-results-header {
    font-size: 13px; color: var(--text-muted);
    margin-bottom: 16px;
  }
  .search-results-header strong { color: var(--text-primary); }

  /* Guideline pill grid */
  .guideline-pills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 4px;
  }
  .guideline-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 13px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;
    transition: all var(--transition);
    text-align: left;
    min-width: 0;
    position: relative;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
  .guideline-pill:hover { border-color: var(--pill-color, var(--accent)); box-shadow: var(--shadow-sm); }
  .guideline-pill.stub { opacity: 0.45; cursor: default; }
  .guideline-pill-title {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-primary);
    font-family: "Sora", sans-serif;
    line-height: 1.35;
    flex: 1;
    min-width: 0;
  }
  .guideline-pill-badge { font-size: 10px; padding: 1px 6px; background: #f1f1f1; border: 1px solid #ddd; border-radius: 99px; color: #aaa; font-weight: 500; flex-shrink: 0; }
  .guideline-pill-star { opacity: 0; flex-shrink: 0; transition: opacity 0.15s; }
  .guideline-pill:hover .guideline-pill-star { opacity: 1; }
  .guideline-pill-star.starred { opacity: 1; }
  @media (max-width: 600px) { .guideline-pills-grid { grid-template-columns: 1fr; } }

  /* Summary callout */
  .summary-callout {
    background: var(--surface);
    border: 1px solid var(--border);
    border-left: 3px solid var(--callout-color, var(--accent));
    border-radius: var(--radius);
    padding: 13px 16px;
    margin-bottom: 14px;
  }
  .summary-callout ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 7px; }
  .summary-callout li { display: flex; align-items: flex-start; gap: 9px; font-size: 13.5px; color: var(--text-secondary); line-height: 1.5; }
  .summary-callout-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; margin-top: 7px; }

  /* Structured management group */
  .mgmt-group { margin-bottom: 12px; }
  .mgmt-group:last-child { margin-bottom: 0; }
  .mgmt-group-header { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; padding-bottom: 4px; border-bottom: 1px solid var(--border-light); }
  .mgmt-group-label { font-size: 10.5px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; font-family: "Sora", sans-serif; color: var(--text-muted); }

  /* Overlay for floating sidebar */
  .sidebar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15,25,35,0.15);
    z-index: 99;
    backdrop-filter: blur(1px);
  }

  /* Empty state */
  .empty-state {
    text-align: center;
    padding: 48px 24px;
    color: var(--text-muted);
  }
  .empty-state p { font-size: 14px; margin-top: 8px; }

  /* Mobile */
  @media (max-width: 768px) {
    .sidebar {
      position: absolute;
      left: 0; top: 0; bottom: 0;
      box-shadow: var(--shadow-lg);
      z-index: 200;
    }
    .sidebar.collapsed { width: 0; min-width: 0; box-shadow: none; }
    .content { padding: 16px; }
    .topbar { padding: 10px 14px; }
    .search-input { width: 140px; }
    .search-input:focus { width: 180px; }
    .sites-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
    .guideline-detail { max-width: 100%; }
    .detail-actions { flex-direction: column; }
    .detail-btn { justify-content: center; }
  }
  .preview-badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 9px;
    background: #fff8e1;
    border: 1px solid #f6d860;
    border-radius: 99px;
    font-size: 11px;
    color: #92700a;
    font-weight: 500;
    font-family: 'Sora', sans-serif;
    margin-left: 8px;
  }
`;

// ── MAIN APP ──────────────────────────────────────────────────────────────────

// ── MAIN APP ──────────────────────────────────────────────────────────────────

export default function App() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [expandedSections, setExpandedSections] = useState({ allSites: true, oncology: true, palliative: true, calculators: false });
  const [expandedSidebarCats, setExpandedSidebarCats] = useState({});
  const [view, setView] = useState({ type: "home" }); // home | site | guideline | search
  const [favourites, setFavourites] = useState(() => {
    return [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const searchRef = useRef();

  useEffect(() => {
    // (persistence disabled in artifact mode)
  }, [favourites]);

  // Search
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  }, [searchQuery]);

  const toggleFav = (e, id) => {
    e.stopPropagation();
    setFavourites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  };

  const toggleSection = (key) => {
    setExpandedSections(s => ({ ...s, [key]: !s[key] }));
  };

  const toggleSidebarCat = (key) => {
    setExpandedSidebarCats(s => ({ ...s, [key]: s[key] === false ? true : false }));
  };
  const isSidebarCatOpen = (key) => expandedSidebarCats[key] !== false; // default open

  const navigate = (v) => {
    setView(v);
    setSearchQuery("");
    setSearchActive(false);
    const mobile = window.innerWidth < 768;
    if (mobile) setSidebarOpen(false);
  };

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => { setSidebarOpen(false); };

  const searchResults = searchActive
    ? ALL_GUIDELINES.filter(g =>
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        g.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const currentSite = view.type === "site" ? SITES.find(s => s.id === view.siteId) : null;
  const currentGuideline = view.type === "guideline" ? findGuideline(view.guidelineId) : null;
  const currentGuidelineSite = currentGuideline ? SITES.find(s => s.id === currentGuideline.siteId) : null;
  const currentCalc = view.type === "calculator" ? CALCULATORS[view.calcId] : null;

  const breadcrumbs = () => {
    if (view.type === "home") return [{ label: "Home" }];
    if (view.type === "favourites") return [
      { label: "Home", onClick: () => navigate({ type: "home" }) },
      { label: "Favourites" },
    ];
    if (view.type === "calculators") return [
      { label: "Home", onClick: () => navigate({ type: "home" }) },
      { label: "Calculators" },
    ];
    if (view.type === "calculator") return [
      { label: "Home", onClick: () => navigate({ type: "home" }) },
      { label: "Calculators", onClick: () => navigate({ type: "calculators" }) },
      { label: currentCalc?.label },
    ];
    if (view.type === "site") return [
      { label: "Home", onClick: () => navigate({ type: "home" }) },
      { label: currentSite?.label },
    ];
    if (view.type === "guideline") return [
      { label: "Home", onClick: () => navigate({ type: "home" }) },
      { label: currentGuidelineSite?.label, onClick: () => navigate({ type: "site", siteId: currentGuidelineSite?.id }) },
      { label: currentGuideline?.title },
    ];
    return [];
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {/* Sidebar overlay for floating mode */}
        {isMobile && sidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`sidebar ${!sidebarOpen ? "collapsed" : ""} ${isMobile && sidebarOpen ? "floating" : ""}`}>
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <div className="sidebar-logo-dot">CG</div>
              <span>ClinGuide</span>
              <span className="preview-badge">Preview</span>
            </div>

          </div>

          <div className="sidebar-content">
            {/* Home */}
            <div
              className={`sidebar-item ${view.type === "home" ? "active" : ""}`}
              onClick={() => navigate({ type: "home" })}
            >
              <span className="sidebar-item-icon"><IconHome /></span>
              Home
            </div>

            <div
              className={`sidebar-item ${view.type === "favourites" ? "active" : ""}`}
              onClick={() => navigate({ type: "favourites" })}
            >
              <span className="sidebar-item-icon" style={{ color: "#f59e0b" }}><IconStar filled={favourites.length > 0} /></span>
              Favourites
              {favourites.length > 0 && (
                <span style={{ marginLeft: "auto", fontSize: 11, background: "#fef3c7", color: "#92400e", borderRadius: 99, padding: "1px 7px", fontWeight: 600 }}>
                  {favourites.length}
                </span>
              )}
            </div>

            <div className="sidebar-divider" />

            {/* All Sites */}
            <div className="sidebar-section">
              <div className="sidebar-section-header" onClick={() => toggleSection("allSites")}>
                <span className="sidebar-section-title">All Sites</span>
                {expandedSections.allSites ? <IconChevronDown /> : <IconChevronRight />}
              </div>
              {expandedSections.allSites && (
                <div className="sidebar-section-body">
                  {SITES.map(site => (
                    <div key={site.id}>
                      <div
                        className={`sidebar-item ${view.type === "site" && view.siteId === site.id ? "active" : ""}`}
                        onClick={() => navigate({ type: "site", siteId: site.id })}
                      >
                        <span className="site-dot" style={{ background: site.color }} />
                        {site.label}
                      </div>
                      {/* Nested: regular site — collapsible categories */}
                      {!site.isParent && ((view.type === "site" && view.siteId === site.id) || (view.type === "guideline" && currentGuideline?.siteId === site.id)) && (
                        <div style={{ marginBottom: 4 }}>
                          {[...new Set(site.guidelines.map(g => g.category))].map(cat => {
                            const catKey = `${site.id}-${cat}`;
                            const open = isSidebarCatOpen(catKey);
                            return (
                              <div key={cat}>
                                <div
                                  onClick={() => toggleSidebarCat(catKey)}
                                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 10px 5px 22px", cursor: "pointer", userSelect: "none" }}
                                >
                                  <span style={{ fontSize: "10.5px", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "Sora, sans-serif" }}>{cat}</span>
                                  <span style={{ color: "var(--text-muted)", transform: open ? "rotate(90deg)" : "none", transition: "transform 0.15s", display: "flex" }}><IconChevronRight /></span>
                                </div>
                                {open && site.guidelines.filter(g => g.category === cat).map(g => (
                                  <div key={g.id}
                                    className={`sidebar-item sidebar-sub-item ${view.type === "guideline" && view.guidelineId === g.id ? "active" : ""}`}
                                    style={{ paddingLeft: 32, opacity: !g.sections ? 0.45 : 1 }}
                                    onClick={() => !g.sections ? null : navigate({ type: "guideline", guidelineId: g.id })}
                                  >
                                    {g.title}
                                  </div>
                                ))}
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {/* Nested: parent site — collapsible subsites */}
                      {site.isParent && ((view.type === "site" && view.siteId === site.id) || (view.type === "guideline" && currentGuideline?.siteId === site.id)) && (
                        <div style={{ marginBottom: 4 }}>
                          {site.subsites.map(ss => {
                            const ssKey = `${site.id}-${ss.id}`;
                            const open = isSidebarCatOpen(ssKey);
                            return (
                              <div key={ss.id}>
                                <div
                                  onClick={() => toggleSidebarCat(ssKey)}
                                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 10px 5px 22px", cursor: "pointer", userSelect: "none" }}
                                >
                                  <span style={{ fontSize: "10.5px", color: site.color, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "Sora, sans-serif" }}>{ss.label}</span>
                                  <span style={{ color: site.color, opacity: 0.7, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.15s", display: "flex" }}><IconChevronRight /></span>
                                </div>
                                {open && ss.guidelines.map(g => (
                                  <div key={g.id}
                                    className={`sidebar-item sidebar-sub-item ${view.type === "guideline" && view.guidelineId === g.id ? "active" : ""}`}
                                    style={{ paddingLeft: 32, opacity: !g.sections ? 0.45 : 1 }}
                                    onClick={() => !g.sections ? null : navigate({ type: "guideline", guidelineId: g.id })}
                                  >
                                    {g.title}
                                  </div>
                                ))}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="sidebar-divider" />

            {/* Calculators */}
            <div className="sidebar-section">
              <div className="sidebar-section-header" onClick={() => toggleSection("calculators")}>
                <span className="sidebar-section-title">Calculators</span>
                {expandedSections.calculators ? <IconChevronDown /> : <IconChevronRight />}
              </div>
              {expandedSections.calculators && (
                <div className="sidebar-section-body">
                  <div
                    className={`sidebar-item ${view.type === "calculators" ? "active" : ""}`}
                    onClick={() => navigate({ type: "calculators" })}
                    style={{ fontSize: 12, color: "var(--text-muted)", paddingLeft: 10 }}
                  >
                    <span style={{ opacity: 0.6, display: "flex" }}><IconCalc /></span>
                    All Calculators
                  </div>
                  {Object.values(CALCULATORS).map(calc => (
                    <div key={calc.id}
                      className={`sidebar-item sidebar-sub-item ${view.type === "calculator" && view.calcId === calc.id ? "active" : ""}`}
                      style={{ paddingLeft: 24 }}
                      onClick={() => navigate({ type: "calculator", calcId: calc.id })}
                    >
                      <span style={{ fontSize: 12 }}>{calc.icon}</span>
                      {calc.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="main">
          {/* Topbar */}
          <header className="topbar">
            <button className="topbar-menu-btn" onClick={() => { setSidebarOpen(o => !o); }}>
              <IconMenu />
            </button>
            <button
              className={`topbar-menu-btn topbar-fav-btn${view.type === "favourites" ? " active" : ""}`}
              onClick={() => navigate({ type: "favourites" })}
              title="Favourites"
            >
              <IconStar filled={view.type === "favourites" || favourites.length > 0} />
              {favourites.length > 0 && (
                <span className="topbar-fav-badge">{favourites.length}</span>
              )}
            </button>
            <nav className="topbar-breadcrumb">
              {breadcrumbs().map((b, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {i > 0 && <span style={{ color: "var(--border)", fontSize: 16 }}>/</span>}
                  {b.onClick
                    ? <a onClick={b.onClick}>{b.label}</a>
                    : <span>{b.label}</span>
                  }
                </span>
              ))}
            </nav>
            <div className="search-wrap">
              <span className="search-icon"><IconSearch /></span>
              <input
                ref={searchRef}
                className="search-input"
                placeholder="Search guidelines…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </header>

          {/* Content */}
          <div className="content">
            {/* SEARCH */}
            {searchActive && (
              <div>
                <p className="search-results-header">
                  <strong>{searchResults.length}</strong> result{searchResults.length !== 1 ? "s" : ""} for "<strong>{searchQuery}</strong>"
                </p>
                {searchResults.length === 0 ? (
                  <div className="empty-state"><p>No guidelines match your search.</p></div>
                ) : (
                  <div className="guideline-pills-grid">
                    {searchResults.map(g => {
                      const site = SITES.find(s => s.id === g.siteId);
                      return (
                        <GuidelinePill
                          key={g.id}
                          g={g}
                          site={site}
                          starred={favourites.includes(g.id)}
                          onStar={toggleFav}
                          onClick={() => navigate({ type: "guideline", guidelineId: g.id })}
                          showSite
                          stub={!g.sections}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* CALCULATORS LIST */}
            {!searchActive && view.type === "calculators" && (
              <CalculatorsPage onNavigate={navigate} />
            )}

            {/* CALCULATOR DETAIL */}
            {!searchActive && view.type === "calculator" && currentCalc && (
              <CalculatorView calcId={view.calcId} onNavigate={navigate} />
            )}

            {/* FAVOURITES */}
            {!searchActive && view.type === "favourites" && (
              <FavouritesPage
                favourites={favourites}
                onStar={toggleFav}
                onNavigate={navigate}
              />
            )}

            {/* HOME */}
            {!searchActive && view.type === "home" && (
              <HomePage
                sites={SITES}
                onNavigate={navigate}
              />
            )}

            {/* SITE */}
            {!searchActive && view.type === "site" && currentSite && (
              <SiteView
                site={currentSite}
                favourites={favourites}
                onStar={toggleFav}
                onNavigate={navigate}
              />
            )}

            {/* GUIDELINE */}
            {!searchActive && view.type === "guideline" && currentGuideline && (
              <GuidelineDetail
                g={currentGuideline}
                site={currentGuidelineSite}
                starred={favourites.includes(currentGuideline.id)}
                onStar={toggleFav}
                onNavigate={navigate}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function HomePage({ sites, onNavigate }) {

  return (
    <div>
      <div className="home-greeting">
        <h1>Clinical Guidelines</h1>
        <p>NUH Clinical Oncology — Acute Inpatient Guidelines (Pilot Preview)</p>
      </div>

      {/* Site cards — icon + name + count only */}
      <div className="home-section-title">Browse by Site</div>
      <div className="sites-grid">
        {sites.map(site => {
          const count = site.guidelines.length;
          return (
            <div key={site.id} className="site-card"
              style={{ "--site-color": site.color, "--site-accent": site.accent }}
              onClick={() => onNavigate({ type: "site", siteId: site.id })}>
              <div className="site-card-icon">{site.icon}</div>
              <div>
                <div className="site-card-name">{site.label}</div>
                <div className="site-card-count">{count} guideline{count !== 1 ? "s" : ""}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


function FavouritesPage({ favourites, onStar, onNavigate }) {
  const favGuides = ALL_GUIDELINES.filter(g => favourites.includes(g.id));

  return (
    <div>
      <div className="home-greeting">
        <h1>Favourites</h1>
        <p>{favGuides.length === 0 ? "No saved guidelines yet." : `${favGuides.length} saved guideline${favGuides.length !== 1 ? "s" : ""}`}</p>
      </div>
      {favGuides.length === 0 ? (
        <div className="empty-state">
          <p>Star any guideline to save it here for quick access.</p>
        </div>
      ) : (
        <div className="guideline-pills-grid">
          {favGuides.map(g => {
            const site = SITES.find(s => s.id === g.siteId);
            return (
              <GuidelinePill
                key={g.id}
                g={g}
                site={site}
                starred={true}
                onStar={onStar}
                onClick={() => onNavigate({ type: "guideline", guidelineId: g.id })}
                showSite
                stub={false}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function SiteView({ site, favourites, onStar, onNavigate }) {
  const [openSubsites, setOpenSubsites] = useState({});
  const toggleSub = (id) => setOpenSubsites(s => ({ ...s, [id]: !s[id] }));

  // Parent site with subsites
  if (site.isParent) {
    const activeSubsites = site.subsites.filter(ss => !ss.comingSoon);
    const totalGuidelines = activeSubsites.reduce((acc, ss) => acc + (ss.guidelines || []).length, 0);
    return (
      <div>
        <div className="site-header">
          <div className="site-header-icon" style={{ background: site.accent, color: site.color }}>{site.icon}</div>
          <div className="site-header-info">
            <h2 style={{ color: site.color }}>{site.label}</h2>
            <p>{totalGuidelines} guidelines across {activeSubsites.length} categories</p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {site.subsites.map((ss) => {
            const isOpen = openSubsites[ss.id] !== false; // default open
            const guidelineCount = (ss.guidelines || []).length;

            // Coming soon subsite — single callout, no pills
            if (ss.comingSoon) {
              return (
                <div key={ss.id} style={{ border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", background: "var(--surface)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", opacity: 0.6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--text-muted)", flexShrink: 0 }} />
                    <span style={{ fontWeight: 600, fontSize: 13.5, fontFamily: "Sora, sans-serif", color: "var(--text-muted)" }}>{ss.label}</span>
                    <span style={{ fontSize: 11, padding: "1px 8px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 99, color: "var(--text-muted)", fontFamily: "DM Sans, sans-serif" }}>Coming soon</span>
                  </div>
                </div>
              );
            }

            return (
              <div key={ss.id} style={{ border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", background: "var(--surface)" }}>
                <div
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", cursor: "pointer", background: isOpen ? site.accent : "var(--surface)", transition: "background 0.15s" }}
                  onClick={() => toggleSub(ss.id)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: site.color, display: "inline-block", flexShrink: 0 }} />
                    <span style={{ fontWeight: 600, fontSize: 13.5, fontFamily: "Sora, sans-serif", color: isOpen ? site.color : "var(--text-primary)" }}>{ss.label}</span>
                    <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{guidelineCount} guideline{guidelineCount !== 1 ? "s" : ""}</span>
                  </div>
                  <span style={{ color: isOpen ? site.color : "var(--text-muted)", transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}><IconChevronRight /></span>
                </div>
                {isOpen && (
                  <div style={{ padding: "10px" }}>
                    {guidelineCount === 0 ? (
                      <p style={{ fontSize: 13, color: "var(--text-muted)", padding: "4px 4px 8px", fontStyle: "italic" }}>No guidelines yet.</p>
                    ) : (
                      <div className="guideline-pills-grid">
                        {(ss.guidelines || []).filter(g => g.sections).map(g => (
                          <GuidelinePill key={g.id} g={g} site={site} starred={favourites.includes(g.id)}
                            onStar={onStar} onClick={() => onNavigate({ type: "guideline", guidelineId: g.id })} stub={false} />
                        ))}
                        {(ss.guidelines || []).filter(g => !g.sections).map(g => (
                          <GuidelinePill key={g.id} g={g} site={site} starred={false}
                            onStar={onStar} onClick={null} stub={true} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Regular (non-parent) site — grouped by category
  const categories = [...new Set((site.guidelines || []).map(g => g.category))];
  return (
    <div>
      <div className="site-header">
        <div className="site-header-icon" style={{ background: site.accent, color: site.color }}>{site.icon}</div>
        <div className="site-header-info">
          <h2 style={{ color: site.color }}>{site.label}</h2>
          <p>{site.guidelines.length} guidelines across {categories.length} categories</p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {categories.map(cat => (
          <div key={cat}>
            <div className="guideline-category">{cat}</div>
            <div className="guideline-pills-grid">
              {site.guidelines.filter(g => g.category === cat).map(g => (
                <GuidelinePill key={g.id} g={g} site={site} starred={favourites.includes(g.id)}
                  onStar={onStar} onClick={() => onNavigate({ type: "guideline", guidelineId: g.id })} stub={!g.sections} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GuidelinePill({ g, site, starred, onStar, onClick, showSite, stub }) {
  return (
    <div
      className={`guideline-pill${stub ? " stub" : ""}`}
      style={{ "--pill-color": site.color, "--pill-accent": site.accent }}
      onClick={stub ? undefined : onClick}
    >
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: site.color, flexShrink: 0, opacity: stub ? 0.5 : 0.8 }} />
      <span className="guideline-pill-title">
        {g.title}
        {stub && <span className="guideline-pill-badge" style={{ marginLeft: 6 }}>Pending</span>}
        {showSite && <span style={{ display: "block", fontSize: 11, color: "var(--text-muted)", fontWeight: 400, fontFamily: "DM Sans, sans-serif", marginTop: 1 }}>{site.label}</span>}
      </span>
      {!stub && (
        <button
          className={`star-btn guideline-pill-star${starred ? " starred" : ""}`}
          onClick={e => { e.stopPropagation(); onStar(e, g.id); }}
          title={starred ? "Remove from favourites" : "Add to favourites"}
        >
          <IconStar filled={starred} />
        </button>
      )}
    </div>
  );
}

// Keep GuidelineRow as alias for search results (showSite variant needs different layout)
function GuidelineRow({ g, site, starred, onStar, onClick, showSite, stub }) {
  return (
    <div
      className={`guideline-pill${stub ? " stub" : ""}`}
      style={{ "--pill-color": site.color, "--pill-accent": site.accent, marginBottom: 4 }}
      onClick={stub ? undefined : onClick}
    >
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: site.color, flexShrink: 0, opacity: 0.8 }} />
      <span className="guideline-pill-title">
        {g.title}
        {stub && <span className="guideline-pill-badge" style={{ marginLeft: 6 }}>Pending</span>}
        {showSite && <span style={{ display: "block", fontSize: 11, color: "var(--text-muted)", fontWeight: 400, fontFamily: "DM Sans, sans-serif", marginTop: 1 }}>{site.label} · {g.category}</span>}
      </span>
      {!stub && (
        <button
          className={`star-btn guideline-pill-star${starred ? " starred" : ""}`}
          onClick={e => { e.stopPropagation(); onStar(e, g.id); }}
        >
          <IconStar filled={starred} />
        </button>
      )}
      {!stub && <span style={{ color: "var(--text-muted)", flexShrink: 0 }}><IconChevronRight /></span>}
    </div>
  );
}

function GuidelineDetail({ g, site, starred, onStar, onNavigate }) {
  const [expandedScore, setExpandedScore] = useState(null);

  // Parse summary into bullets — split on '. ' keeping sentences, max 4
  const summaryBullets = (() => {
    if (g.summaryBullets) return g.summaryBullets;
    // Split on sentence boundaries
    const raw = g.summary || "";
    const sentences = raw.match(/[^.!?]+[.!?]+/g) || [raw];
    return sentences.slice(0, 4).map(s => s.trim()).filter(Boolean);
  })();

  return (
    <div className="guideline-detail">
      <button className="detail-back-btn" onClick={() => onNavigate({ type: "site", siteId: g.siteId })}>
        <IconArrowLeft />
        Back to {site.label}
      </button>

      {/* Header */}
      <div className="detail-header">
        <div className="detail-category-badge" style={{ background: site.accent, color: site.color }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: site.color, display: "inline-block" }} />
          {g.category}
        </div>
        <h1 className="detail-title">{g.title}</h1>
        {(g.authors || g.version) && (
          <div className="detail-meta" style={{ marginBottom: 4 }}>
            {g.version && <span>Version {g.version}</span>}
            {g.authors && <span style={{ marginLeft: g.version ? 12 : 0 }}>Authors: {g.authors}</span>}
          </div>
        )}
        {g.evidenceBase && <div className="detail-meta" style={{ marginBottom: 4 }}>Evidence base: {g.evidenceBase}</div>}
        <div className="detail-meta">Review date: {g.updated}</div>

        {/* Calculator pills */}
        {((g.calculators && g.calculators.length > 0) || g.subsiteId === "onco-io") && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "10px 0 14px" }}>
            {(g.calculators || []).map((calc, i) => {
              const internalCalc = Object.values(CALCULATORS).find(c => c.label === calc.label);
              return internalCalc ? (
                <button key={i} onClick={() => onNavigate({ type: "calculator", calcId: internalCalc.id })}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 99, border: `1.5px solid ${site.color}`, background: site.accent, color: site.color, fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
                  <span style={{ fontSize: 13 }}>{internalCalc.icon}</span>{calc.label}
                </button>
              ) : (
                <a key={i} href={calc.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 99, border: `1.5px solid ${site.color}`, background: site.accent, color: site.color, fontSize: 12.5, fontWeight: 600, textDecoration: "none" }}>
                  <IconCalc />{calc.label}<IconExternal />
                </a>
              );
            })}
            {g.subsiteId === "onco-io" && (
              <button onClick={() => onNavigate({ type: "calculator", calcId: "irae-grade" })}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 99, border: `1.5px solid ${site.color}`, background: site.accent, color: site.color, fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
                <span>🧬</span> irAE Grade Calculator
              </button>
            )}
          </div>
        )}

        <div className="detail-actions">
          <a className="detail-btn detail-btn-primary" href={g.pdfUrl} target="_blank" rel="noopener noreferrer">
            <IconPDF /> View Full PDF
          </a>
          <a className="detail-btn detail-btn-secondary" href={g.portalUrl} target="_blank" rel="noopener noreferrer">
            <IconExternal /> Open in Web Portal
          </a>
          <button className="detail-btn detail-btn-secondary"
            style={starred ? { color: "#f59e0b", borderColor: "#f6d860", background: "#fef9e7" } : {}}
            onClick={e => onStar(e, g.id)}>
            <IconStar filled={starred} />
            {starred ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* Summary callout */}
      <div className="summary-callout" style={{ "--callout-color": site.color }}>
        <ul>
          {summaryBullets.map((b, i) => (
            <li key={i}>
              <span className="summary-callout-dot" style={{ background: site.color }} />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Rich sections */}
      {(g.sections || []).map((sec, i) => (
        <SectionBlock key={i} sec={sec} siteColor={site.color} siteAccent={site.accent}
          siteId={site.id} subsiteId={g.subsiteId}
          expandedScore={expandedScore} setExpandedScore={setExpandedScore} />
      ))}
    </div>
  );
}

// ── CALCULATORS REGISTRY ─────────────────────────────────────────────────────