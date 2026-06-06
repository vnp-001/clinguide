import { useState, useEffect, useRef } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const CHANGELOG = [
  {
    version: "0.4",
    date: "June 2026",
    label: "Preview",
    changes: [
      "Added NUH Oncology Resources section — rapid response contact, links & rotas table with direct dial button",
      "Added New Suspected Cancer guideline — radiological pathway by scenario, inpatient referral guidance, PDF link",
      "Added Oncology Pull Criteria guideline — BOLD/inclusion/exclusion criteria table, senior contact dial button, unsuitable pathway section with internal navigation",
      "Added What's New page accessible from sidebar footer",
      "Removed login screen",
      "Added Vascular Access — PICC line procedure guidelines",
    ],
  },
  {
    version: "0.3",
    date: "May 2026",
    label: "Preview",
    changes: [
      "Added VTE & Haemostasis guidelines — CAT, recurrent VTE, thrombocytopenia, catheter-related thrombosis",
      "Added interactive SINS, MASCC, and Opioid Equianalgesic calculators",
      "Calculator back-links to relevant guidelines",
      "Improved treatment decision layout with Indication and Contraindications sections",
    ],
  },
  {
    version: "0.2",
    date: "April 2026",
    label: "Preview",
    changes: [
      "Added full Immunotherapy Toxicity (irAE) guidelines across all organ systems",
      "Added irAE CTCAE Grade Calculator",
      "Added Electrolyte Abnormalities — calcium, magnesium, potassium, sodium",
      "Added Palliative Care symptom control guidelines",
    ],
  },
  {
    version: "0.1",
    date: "March 2026",
    label: "Preview",
    changes: [
      "Initial prototype — Oncology Emergencies including Neutropenic Sepsis and MSCC",
      "Guideline favourites and search",
      "Sidebar navigation with collapsible categories",
    ],
  },
];

function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);

  const handleSubmit = () => {
    if (password === "oncnuh26") {
      sessionStorage.setItem("clinguide_auth", "true");
      onLogin();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      fontFamily: "DM Sans, sans-serif",
    }}>
      {/* Login card */}
      <div style={{
        width: "100%",
        maxWidth: 400,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "32px 28px",
        marginBottom: 16,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <div style={{
            width: 36, height: 36,
            background: "linear-gradient(135deg, #1a6b8a 0%, #2a9bc4 100%)",
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontSize: 14, fontWeight: 700, fontFamily: "Sora, sans-serif",
            flexShrink: 0,
          }}>CG</div>
          <div>
            <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 15, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>ClinGuide</div>
            <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>NUH Acute Oncology — Pilot Preview</div>
          </div>
        </div>

        <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 18, color: "var(--text-primary)", marginBottom: 6, letterSpacing: "-0.01em" }}>Sign in</h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20, lineHeight: 1.5 }}>
          This is a restricted pilot. Enter the access code to continue.
        </p>

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", fontFamily: "Sora, sans-serif", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Access code</label>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false); }}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder="Enter access code"
            autoFocus
            style={{
              width: "100%",
              padding: "10px 14px",
              border: `1.5px solid ${error ? "#fc8181" : "var(--border)"}`,
              borderRadius: 8,
              fontSize: 15,
              fontFamily: "DM Sans, sans-serif",
              background: error ? "#fff5f5" : "var(--bg)",
              color: "var(--text-primary)",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.15s",
            }}
          />
          {error && <p style={{ fontSize: 12.5, color: "#e53e3e", marginTop: 6 }}>Incorrect access code. Please try again.</p>}
        </div>

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "11px",
            background: "#1a6b8a",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "Sora, sans-serif",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => e.target.style.background = "#145773"}
          onMouseLeave={e => e.target.style.background = "#1a6b8a"}
        >
          Continue
        </button>
      </div>

      {/* Changelog toggle */}
      <div style={{ width: "100%", maxWidth: 400 }}>
        <button
          onClick={() => setShowChangelog(o => !o)}
          style={{
            width: "100%",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "11px 16px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: showChangelog ? "10px 10px 0 0" : 10,
            cursor: "pointer",
            fontFamily: "Sora, sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-secondary)",
            transition: "all 0.15s",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13 }}>📋</span>
            What's new
          </span>
          <span style={{ transform: showChangelog ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "flex" }}>
            <IconChevronDown />
          </span>
        </button>

        {showChangelog && (
          <div style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderTop: "none",
            borderRadius: "0 0 10px 10px",
            padding: "4px 0 8px",
          }}>
            {CHANGELOG.map((entry, i) => (
              <div key={i} style={{ padding: "12px 16px", borderBottom: i < CHANGELOG.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13, color: "var(--text-primary)" }}>v{entry.version}</span>
                  <span style={{ fontSize: 11, padding: "2px 8px", background: "#e8f4f8", border: "1px solid #90cde0", borderRadius: 99, color: "#1a6b8a", fontWeight: 600, fontFamily: "Sora, sans-serif" }}>{entry.label}</span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: "auto" }}>{entry.date}</span>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
                  {entry.changes.map((c, ci) => (
                    <li key={ci} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      <span style={{ color: "#1a6b8a", fontSize: 7, flexShrink: 0, marginTop: 6 }}>●</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <p style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 20, textAlign: "center", lineHeight: 1.6, maxWidth: 340 }}>
        For access or technical issues contact the development team.<br />
        Clinical guidelines are for use by NUH clinical staff only.
      </p>
    </div>
  );
}

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
      { label: "Antibiotic Dosing (Vancomycin & Gentamicin)", calcId: "antibiotic-dosing" },

    ],
    subsites: [
      
      {
        
  id: "oncology-resources",
  label: "NUH Oncology Resources",
  guidelines: [
    {
      id: "oncology-nuh-contacts",
      title: "Oncology NUH Resources",
      category: "NUH Oncology Resources",
      version: "1.0",
      authors: "NUH Acute Oncology",
      evidenceBase: "NUH Oncology Service",
      summary: "Key contacts and rapid response lines for the NUH Oncology Service.",
      tags: ["Contact", "Rapid response", "Triage", "AOS", "Nervecentre"],
      related: [],
      sections: [
        {
          heading: "Key Contacts",
          type: "alert",
          variant: "danger",
          items: [
            "**Rapid Response: ☎ 0115 962 8066**",
            "This is the 24-hour triage line for oncology patient queries.",
            "For all non-urgent queries in hours, please refer to the AOS team via Nervecentre.",
          ],
        },
        {
          heading: "NUH Oncology Links",
          type: "link_table",
          items: [
            {
              pinned: true,
              description: "Rapid Response — 24-hr oncology triage line",
              label: "☎ 0115 962 8066",
              url: "tel:01159628066",
            },
            {
              label: "Oncology Homepage",
              description: "Intranet homepage for all NUH oncology resources",
              url: "https://nhs.sharepoint.com/sites/RX1_Oncology",
            },
            {
              label: "Weekly Rota",
              description: "Live weekly rota for ward cover & on call",
              url: "https://nhs.sharepoint.com/:x:/r/sites/RX1_MedicalWorkforce/Rota%20Store/CAS/Weekly%20Oncology%20Rota%20New.xlsx?d=wb380240e02ce41db8ffa5de495dedc92&csf=1&web=1&e=m1YeES&xsdata=MDV8MDJ8di5waWxsYWlAbmhzLm5ldHw5YmE2YmQ2MGJkNGE0MWZmYWM2YzA4ZGVjMzEzMjQ0NnwzN2MzNTRiMjg1YjA0N2Y1YjIyMjA3YjQ4ZDc3NGVlM3wwfDB8NjM5MTYyNjg1NTk1NjIzMjE3fFVua25vd258VFdGcGJHWnNiM2Q4ZXlKRmJYQjBlVTFoY0draU9uUnlkV1VzSWxZaU9pSXdMakF1TURBd01DSXNJbEFpT2lKWGFXNHpNaUlzSWtGT0lqb2lUV0ZwYkNJc0lsZFVJam95ZlE9PXwwfHx8&sdata=WXU3V1RHYkpkSEJjK2RFa2pvb2xyemNHMlV0RmF1aWxrcFIwdnFXQ0gxZz0%3d",
            },
            {
              label: "Consultant Rota",
              description: "Live On Call Consultant Rota [2026]",
              url: "https://nhs.sharepoint.com/:x:/r/sites/RX1_EstatesFacilities/_layouts/15/Doc.aspx?sourcedoc=%7B0265FCA6-6128-40B1-87BA-216545D52AD3%7D&file=Oncology%20Consultant.xlsx&action=default&mobileredirect=true",
            },
            {
              label: "Teams & Links",
              description: "Oncology teams directory and useful SharePoint links",
              url: "https://nhs.sharepoint.com/:x:/r/sites/RX1_Oncology/_layouts/15/Doc.aspx?sourcedoc=%7B3E49A3EF-0644-49EC-A879-A12F87A7C33A%7D&file=Oncology%20Teams%20and%20links%20August%202025%20v1.xlsx&action=default&mobileredirect=true",
            },
            {
              label: "Medical Workforce",
              description: "All NUH CAS rotas",
              url: "https://nhs.sharepoint.com/sites/RX1_MedicalWorkforce/SitePages/Junior-Doctor-Rotas.aspx",
            },
            {
              label: "Cancer MDT",
              description: "Home page for cancer MDT referrals",
              url: "https://nhs.sharepoint.com/sites/RX1_CancerServicesNUH/SitePages/MDTs.aspx?xsdata=MDV8MDJ8ZXdhbi5zaGF3Y3JvZnRAbmhzLm5ldHwwNmEzZmFjOTJjNWI0ZWM4NjBhMTA4ZGQxYWE5NWY3NHwzN2MzNTRiMjg1YjA0N2Y1YjIyMjA3YjQ4ZDc3NGVlM3wwfDB8NjM4Njk2MDM2OTI3MDI3MzkwfFVua25vd258VFdGcGJHWnNiM2Q4ZXlKRmJYQjBlVTFoY0draU9uUnlkV1VzSWxZaU9pSXdMakF1TURBd01DSXNJbEFpT2lKWGFXNHpNaUlzSWtGT0lqb2lUV0ZwYkNJc0lsZFVJam95ZlE9PXwwfHx8&sdata=cCtIQmJ6TnBhKytDQ3RQWFhsZnY0SmpiZW9NMFBVZktHamgzd2F0WXNiND0%3d&clickparams=eyAiWC1BcHBOYW1lIiA6ICJNaWNyb3NvZnQgT3V0bG9vayIsICJYLUFwcFZlcnNpb24iIDogIjE2LjAuMTgwMjUuMjAyMTQiLCAiT1MiIDogIldpbmRvd3MiIH0%3D",
            },
            {
              label: "Casper",
              description: "NUH Radiotherapy Referrals Portal (access required)",
              url: "https://casper.nuh.nhs.uk/login#!",
            },
            {
              label: "NUH Guidelines (Koha)",
              description: "Web Guideline PDF Portal",
              url: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-authorities-home.pl?op=do_search&type=opac&authtypecode=PERSO_NAME&operator=contains&value=&marclist=all&and_or=and&excluding=&orderby=HeadingAsc&resultsperpage=25",
            },
            {
              label: "Oncology Digital Clinics",
              description: "Electronic Patient Reported Outcome Measures (ePROMs) and direct messaging",
              url: "https://nhs.sharepoint.com/sites/RX1_Oncology/SitePages/Oncology-Digital-Clinics-and-Direct-Messaging.aspx?CID=33216745-a9ff-457a-a04b-0bfe1a9e2c63",
            },
          ],
        },
      ],
    },
    {
      id: "new-suspected-cancer",
      title: "New Suspected Cancer",
      category: "NUH Oncology Resources",
      version: "1.0",
      authors: "NUH Acute Oncology / Inter-Specialty Working Group",
      evidenceBase: "NUH Inter-Specialty Working Group",
      summary: "Pathway for managing a new suspected cancer identified radiologically. Covers localised, metastatic with known primary, and metastatic with unknown primary. Includes inpatient referral guidance and AOS contact details.",
      tags: ["New cancer", "Suspected cancer", "Radiology", "MDT referral", "AOS", "NSCP", "2WW", "Metastatic"],
      related: [],
      updated: "Current",
      summaryCalcLink: {
        url: "https://nhs.sharepoint.com/sites/RX1_InterSpecialtyWorking/SiteAssets/Forms/AllItems.aspx?id=%2Fsites%2FRX1_InterSpecialtyWorking%2FSiteAssets%2FSitePages%2FNew-suspected-cancer-identified-radiologically%2FNew-cancer-v7-CP%2Epdf&parent=%2Fsites%2FRX1_InterSpecialtyWorking%2FSiteAssets%2FSitePages%2FNew-suspected-cancer-identified-radiologically",
        label: "View NUH PDF Pathway",
        text: "New suspected cancer identified radiologically — NUH inter-specialty pathway (PDF)",
      },
      sections: [
        {
          heading: "Inpatient Referral Guidance",
          type: "notice_box",
          preamble: {
            main: "Patients with a new radiological cancer diagnoses rarely require acute inpatient care under Oncology",
            exception: "exceptions may include those requiring urgent oncological treatments such as radiotherapy for malignant spinal cord compression",
          },
          callout: {
            subheading: "For a patient with a new diagnosis of suspected metastatic cancer requiring an inpatient stay, please contact:",
            criticalItems: [
              "**In-Hours (Mon–Sat 8am–4pm):** Acute Oncology Services (AOS) — NerveCentre referral",
              { type: "tel_links", prefix: "**Urgent advice:**", links: [{ tel: "07812268675", label: "☎ 07812 268675" }, { tel: "07812276520", label: "☎ 07812 276520" }] },
              { type: "tel", text: "**Out of Hours:** Oncology SpR via Switch", tel: "01159691122", telLabel: "☎ 0115 969 1122" },
            ],
            items: [
              { type: "email", prefix: "If discharging prior to AOS input/review, email patient details to", email: "nuhnt.acuteoncologyservices@nhs.net", suffix: "for patient support and tracking" },
              { type: "link_callout", text: "Refer to Oncology Pull Criteria for guidance regarding patients who are appropriate for admission under Oncology", guidelineId: "oncology-pull-criteria", linkLabel: "View Pull Criteria" },
            ],
          },
        },
        {
          heading: "Pathway by Radiological Scenario",
          type: "scenario_cards",
          cards: [
            {
              label: "Localised disease — site identified",
              detail: "e.g. bowel mass on CT, no evidence of metastases",
              actions: [
                "Refer to site-specific MDT and **Consultant Upgrade (ConsUp)** on Nervecentre (e.g. Lower GI)",
                "Involve specialty team +/- CNS as needed",
              ],
            },
            {
              label: "Metastatic disease — primary site suspected",
              detail: "e.g. bowel mass with liver metastases",
              actions: [
                "Refer to site-specific MDT and **ConsUp** on Nervecentre as per likely primary (e.g. Lower GI)",
                "Involve **AOS** to support patient and assist with pathway navigation/tracking",
              ],
            },
            {
              label: "Metastatic disease — NO likely primary identified",
              detail: "",
              actions: [
                "Establish **ECOG status**",
                "Consider referring for additional diagnostic tests (e.g. staging CT, biopsy) depending on ECOG",
                "Refer to **AOS** and **Non-Specific Symptoms of Cancer (NSCP) Clinic** via Nervecentre",
              ],
            },
          ],
        },
        {
          heading: "Key Principles",
          type: "list",
          groups: [
            {
              label: "Key Principles for Inpatient Management",
              icon: "management",
              items: [
                "Patients with a new radiological cancer diagnoses rarely require acute inpatient care under Oncology (exceptions may include those requiring urgent oncological treatments such as radiotherapy for malignant spinal cord compression)",
                "Patients with a new diagnosis of suspected cancer requiring admission should be referred to the most appropriate specialty to manage the acute presenting symptoms or pathology",
                "Admission should not be used to facilitate diagnostic tests for cancer; diagnostic tests are better undertaken as an outpatient via an established 2WW diagnostic pathway",
                "Liaise with Acute Oncology Service (AOS) for advice and support if unsure; or discuss with the Oncology SpR if urgent advice is required out of hours",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "oncology-pull-criteria",
      title: "Oncology Pull Criteria",
      category: "NUH Oncology Resources",
      version: "1.1",
      authors: "Emma Beeton / Lucy Gossage",
      evidenceBase: "NUH Inter-Specialty Working Governance and Oversight Group | Approved January 2025",
      summary: "Criteria for direct e-referral of confirmed oncology patients to the Oncology ward via Nervecentre. Includes mandatory BOLD criteria, inclusion criteria, exclusion criteria, potential patient criteria, and guidance on unsuitable pathways.",
      tags: ["Pull criteria", "Admission", "Oncology ward", "Nervecentre", "e-Referral", "SACT", "Neutropenic sepsis"],
      related: ["new-suspected-cancer"],
      updated: "January 2025",
      summaryCalcLink: {
        url: "https://nhs.sharepoint.com/sites/RX1_InterSpecialtyWorking/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FRX1_InterSpecialtyWorking%2FShared%20Documents%2FOncology%20Pull%20Criteria%20v1%2E1%2Epdf&parent=%2Fsites%2FRX1_InterSpecialtyWorking%2FShared%20Documents",
        label: "View PDF: Pull Criteria v1.1",
        text: "Oncology Pull Criteria v1.1 — NUH Inter-Specialty Working Group (January 2025)",
      },
      sections: [
        {
          heading: "Senior Clinical Contact",
          type: "alert",
          variant: "danger",
          items: [
            { text: "On call Oncology Registrar via switchboard (priority line)", tel: "01159691122", telLabel: "☎ 0115 969 1122" },
          ],
        },
        {
          heading: "Confirmed Patients — Pull Criteria",
          type: "pull_criteria_table",
          referralNote: "For e-Referral via Nervecentre 'Pull Criteria met'. Accompanying call only if patient is unstable and felt in need of urgent review, or if 'call mandated' by specialty.",
          boldNote: "Must meet ALL bold criteria AND one or more of the inclusion criteria",
          boldCriteria: [
            "Not more appropriate for any other Specialty including critical care, particularly if the reason for admission is unrelated to their cancer",
            "Must have a confirmed oncological diagnosis and currently under the care of an oncologist",
            "Rapid covid swab confirms infection status",
          ],
          inclusionCriteria: [
            "Symptoms or side effect of cancer",
            "Patient completed SACT <3/12 ago",
            "Suspected or confirmed neutropenic sepsis",
            "Systemic Anti-cancer Therapy (SACT) side effects",
            "Metastatic spinal cord compression",
            "Pain secondary to cancer",
            "Confirmed deterioration secondary to cancer progression",
            "Acute radiotherapy SE (patient completed radiotherapy <3/12 ago)",
          ],
          exclusionNote: "PLUS does not meet any of the following exclusion criteria",
          exclusionCriteria: [
            "Unstable with NEWS2 ≥6 in the absence of a clear de-escalation decision / Requiring resus room care / Too unwell to safely transfer across campus / Requiring escort for transfer",
            "Active chest pain",
            "Suspected DVT",
            "Head injury",
            "BEFAST positive / suspected stroke awaiting imaging",
            "Patient with new suspected cancer diagnosis awaiting diagnostics",
            "Reason for admission is unrelated to the patient's cancer",
          ],
        },
        {
          heading: "Potential Patients",
          type: "alert",
          items: [
            "For discussion with Specialty. If accepted, indicate 'Accepted after discussion' in 'e-Referral status' column",
            "Must still meet **BOLD** criteria above",
            "Patients discharged from oncology whereby recurrence is the most likely differential",
            "Patients who finished SACT >3/12 ago",
          ],
        },
        {
          heading: "More Suitable for Another Admission Pathway",
          type: "unsuitable_box",
          calloutLink: { guidelineId: "new-suspected-cancer", label: "New Suspected Cancer Pathway" },
          items: [
            {
              text: "Any patients with a new suspected cancer diagnosis who require inpatient admission should remain under the care of the diagnostic medical/surgical team. Oncology is not a diagnostic specialty — referral without a completed workup is inappropriate. Please refer to the Acute Oncology Service via Nervecentre or phone.",
              examples: null,
            },
            {
              text: "Any patients with a new suspected cancer diagnosis requiring ongoing outpatient care (but not emergency admission) should have a Consultant Upgrade referral to 'Non-Specific Cancer Symptoms consultant upgrade referral' on Careflow for outpatient investigations and follow-up on a cancer pathway. For example:",
              examples: [
                "Incidental finding of abnormal bone lesion on CT Trauma scan acquired for other reasons e.g. sclerotic bony lesion, pathological fracture not requiring emergency fixation",
                "Incidental finding of abnormal liver appearance on CT acquired for other reasons e.g. multiple liver metastases of unknown primary",
                "Incidental finding of anaemia on blood tests",
                "Progressive rapid weight loss on history",
              ],
            },
          ],
          notes: [
            "New suspected cancer identified radiologically — see 'New Suspected Cancer' guideline (linked above)",
          ],
        },
      ],
    },
    {
      id: "oncology-drug-list",
      title: "Oncology Drug Reference",
      category: "NUH Oncology Resources",
      version: "1.0",
      authors: "NUH Acute Oncology",
      evidenceBase: "NUH Formulary | UKONS | ESMO Guidelines",
      summary: "Quick-reference registry of commonly used oncology drugs at NUH. Covers cytotoxic chemotherapy, targeted therapies, immunotherapy, and hormonal agents with drug class, emetic risk, vesicant status, and key toxicity flags.",
      tags: ["Chemotherapy", "SACT", "Immunotherapy", "Targeted therapy", "Drug reference", "Vesicant", "Emetic risk"],
      related: [],
      sections: [
        {
          heading: "Drug Registry",
          type: "drug_registry",
          entries: [
            // ── Cytotoxic chemotherapy ──────────────────────────────────
            { name: "Carboplatin",       brand: "Paraplatin®",  category: "chemo",        drugClass: "Platinum agent",              risks: ["mod_emetic", "nephrotox"] },
            { name: "Cisplatin",         brand: null,           category: "chemo",        drugClass: "Platinum agent",              risks: ["high_emetic", "nephrotox", "neurotox", "irritant"] },
            { name: "Oxaliplatin",       brand: "Eloxatin®",    category: "chemo",        drugClass: "Platinum agent",              risks: ["mod_emetic", "neurotox", "irritant"], notes: "Warm compress for extravasation — cold precipitates paraesthesia" },
            { name: "Cyclophosphamide",  brand: "Endoxana®",    category: "chemo",        drugClass: "Alkylating agent",            risks: ["mod_emetic", "fn", "irritant"] },
            { name: "Ifosfamide",        brand: null,           category: "chemo",        drugClass: "Alkylating agent",            risks: ["mod_emetic", "fn", "nephrotox", "neurotox", "irritant"], notes: "Requires mesna uroprotection" },
            { name: "Chlorambucil",      brand: "Leukeran®",    category: "chemo",        drugClass: "Alkylating agent",            risks: [] },
            { name: "Melphalan",         brand: "Alkeran®",     category: "chemo",        drugClass: "Alkylating agent",            risks: ["fn", "irritant"] },
            { name: "Bendamustine",      brand: "Levact®",      category: "chemo",        drugClass: "Alkylating agent",            risks: ["fn", "vesicant"] },
            { name: "Carmustine",        brand: "BiCNU®",       category: "chemo",        drugClass: "Alkylating agent (nitrosourea)", risks: ["high_emetic", "vesicant"] },
            { name: "Dacarbazine",       brand: "DTIC",         category: "chemo",        drugClass: "Alkylating agent",            risks: ["high_emetic", "vesicant"] },
            { name: "Temozolomide",      brand: "Temodal®",     category: "chemo",        drugClass: "Alkylating agent (oral)",     risks: ["mod_emetic", "fn"] },
            { name: "Doxorubicin",       brand: "Adriamycin®",  category: "chemo",        drugClass: "Anthracycline",               risks: ["mod_emetic", "fn", "vesicant", "cardiotox"] },
            { name: "Epirubicin",        brand: "Pharmorubicin®", category: "chemo",      drugClass: "Anthracycline",               risks: ["mod_emetic", "fn", "vesicant", "cardiotox"] },
            { name: "Daunorubicin",      brand: null,           category: "chemo",        drugClass: "Anthracycline",               risks: ["fn", "vesicant", "cardiotox"] },
            { name: "Idarubicin",        brand: null,           category: "chemo",        drugClass: "Anthracycline",               risks: ["fn", "vesicant", "cardiotox", "mod_emetic"] },
            { name: "Liposomal doxorubicin", brand: "Caelyx®", category: "chemo",        drugClass: "Anthracycline (liposomal)",   risks: ["fn", "irritant"], notes: "Palmar-plantar erythrodysaesthesia (PPE) risk" },
            { name: "Methotrexate",      brand: null,           category: "chemo",        drugClass: "Antimetabolite",              risks: ["nephrotox"], notes: "High-dose requires folinic acid rescue and urine alkalinisation" },
            { name: "Fluorouracil",      brand: "5-FU",         category: "chemo",        drugClass: "Antimetabolite",              risks: ["irritant"], notes: "Cardiotoxicity with infusional 5-FU; DPD deficiency screen before use" },
            { name: "Capecitabine",      brand: "Xeloda®",      category: "chemo",        drugClass: "Antimetabolite (oral)",       risks: [], notes: "Oral 5-FU prodrug; DPD deficiency screen before use; PPE risk" },
            { name: "Gemcitabine",       brand: "Gemzar®",      category: "chemo",        drugClass: "Antimetabolite",              risks: [] },
            { name: "Cytarabine",        brand: "Ara-C",        category: "chemo",        drugClass: "Antimetabolite",              risks: ["fn"], notes: "High-dose: cerebellar toxicity, conjunctivitis — requires steroid eye drops" },
            { name: "Pemetrexed",        brand: "Alimta®",      category: "chemo",        drugClass: "Antimetabolite",              risks: [], notes: "Requires folic acid and B12 supplementation before and during treatment" },
            { name: "Fludarabine",       brand: "Fludara®",     category: "chemo",        drugClass: "Antimetabolite",              risks: ["fn"], notes: "Causes prolonged immunosuppression — irradiated blood products required" },
            { name: "Cladribine",        brand: "Leustatin®",   category: "chemo",        drugClass: "Antimetabolite",              risks: ["fn"] },
            { name: "Etoposide",         brand: "Vepesid®",     category: "chemo",        drugClass: "Topoisomerase II inhibitor",  risks: ["fn", "mod_emetic"] },
            { name: "Irinotecan",        brand: "Campto®",      category: "chemo",        drugClass: "Topoisomerase I inhibitor",   risks: ["mod_emetic", "fn"], notes: "Early cholinergic syndrome (atropine) and delayed diarrhoea (loperamide)" },
            { name: "Topotecan",         brand: "Hycamtin®",    category: "chemo",        drugClass: "Topoisomerase I inhibitor",   risks: ["fn"] },
            { name: "Docetaxel",         brand: "Taxotere®",    category: "chemo",        drugClass: "Taxane",                     risks: ["fn", "vesicant"], notes: "Requires dexamethasone premedication to reduce fluid retention" },
            { name: "Paclitaxel",        brand: "Taxol®",       category: "chemo",        drugClass: "Taxane",                     risks: ["fn", "vesicant", "neurotox"], notes: "Hypersensitivity reactions — requires steroid/antihistamine premedication" },
            { name: "Nab-paclitaxel",    brand: "Abraxane®",    category: "chemo",        drugClass: "Taxane (albumin-bound)",     risks: ["fn", "vesicant", "neurotox"], notes: "No Cremophor — reduced hypersensitivity; different dosing to paclitaxel" },
            { name: "Cabazitaxel",       brand: "Jevtana®",     category: "chemo",        drugClass: "Taxane",                     risks: ["fn", "vesicant"] },
            { name: "Vincristine",       brand: "Oncovin®",     category: "chemo",        drugClass: "Vinca alkaloid",             risks: ["vesicant", "neurotox"], notes: "Fatal if given intrathecally — must be administered in minibag" },
            { name: "Vinblastine",       brand: "Velbe®",       category: "chemo",        drugClass: "Vinca alkaloid",             risks: ["fn", "vesicant"] },
            { name: "Vinorelbine",       brand: "Navelbine®",   category: "chemo",        drugClass: "Vinca alkaloid",             risks: ["fn", "vesicant"] },
            { name: "Eribulin",          brand: "Halaven®",     category: "chemo",        drugClass: "Halichondrin analogue",      risks: ["fn", "neurotox"] },
            { name: "Bleomycin",         brand: null,           category: "chemo",        drugClass: "Antitumour antibiotic",      risks: [], notes: "Pulmonary toxicity — cumulative dose limit; avoid high FiO₂" },
            { name: "Mitomycin C",       brand: null,           category: "chemo",        drugClass: "Antitumour antibiotic",      risks: ["vesicant", "fn"] },
            { name: "Dactinomycin",      brand: "Cosmegen®",    category: "chemo",        drugClass: "Antitumour antibiotic",      risks: ["vesicant", "fn"] },

            // ── Targeted therapies ──────────────────────────────────────
            { name: "Imatinib",          brand: "Glivec®",      category: "targeted",     drugClass: "BCR-ABL / KIT TKI",          risks: ["mod_emetic"] },
            { name: "Dasatinib",         brand: "Sprycel®",     category: "targeted",     drugClass: "BCR-ABL TKI",                risks: [], notes: "Pleural effusion risk" },
            { name: "Nilotinib",         brand: "Tasigna®",     category: "targeted",     drugClass: "BCR-ABL TKI",                risks: ["cardiotox"], notes: "QT prolongation; take on empty stomach" },
            { name: "Osimertinib",       brand: "Tagrisso®",    category: "targeted",     drugClass: "EGFR TKI (3rd gen)",        risks: ["cardiotox"], notes: "QT prolongation; interstitial lung disease" },
            { name: "Erlotinib",         brand: "Tarceva®",     category: "targeted",     drugClass: "EGFR TKI",                   risks: [], notes: "Rash/diarrhoea; take on empty stomach" },
            { name: "Gefitinib",         brand: "Iressa®",      category: "targeted",     drugClass: "EGFR TKI",                   risks: [] },
            { name: "Afatinib",          brand: "Giotrif®",     category: "targeted",     drugClass: "EGFR TKI (2nd gen)",        risks: [], notes: "Diarrhoea; rash" },
            { name: "Alectinib",         brand: "Alecensa®",    category: "targeted",     drugClass: "ALK inhibitor",              risks: [] },
            { name: "Crizotinib",        brand: "Xalkori®",     category: "targeted",     drugClass: "ALK/ROS1/MET inhibitor",    risks: ["mod_emetic"], notes: "Visual disturbance; hepatotoxicity" },
            { name: "Ceritinib",         brand: "Zykadia®",     category: "targeted",     drugClass: "ALK inhibitor",              risks: ["mod_emetic"] },
            { name: "Dabrafenib",        brand: "Tafinlar®",    category: "targeted",     drugClass: "BRAF inhibitor",             risks: [], notes: "Pyrexia common — often used with trametinib" },
            { name: "Vemurafenib",       brand: "Zelboraf®",    category: "targeted",     drugClass: "BRAF inhibitor",             risks: [], notes: "Photosensitivity; QT prolongation" },
            { name: "Trametinib",        brand: "Mekinist®",    category: "targeted",     drugClass: "MEK inhibitor",              risks: ["cardiotox"] },
            { name: "Palbociclib",       brand: "Ibrance®",     category: "targeted",     drugClass: "CDK4/6 inhibitor",           risks: ["fn"] },
            { name: "Ribociclib",        brand: "Kisqali®",     category: "targeted",     drugClass: "CDK4/6 inhibitor",           risks: ["fn", "cardiotox"], notes: "QT prolongation" },
            { name: "Abemaciclib",       brand: "Verzenios®",   category: "targeted",     drugClass: "CDK4/6 inhibitor",           risks: ["fn"], notes: "Diarrhoea common" },
            { name: "Olaparib",          brand: "Lynparza®",    category: "targeted",     drugClass: "PARP inhibitor",             risks: ["fn"] },
            { name: "Niraparib",         brand: "Zejula®",      category: "targeted",     drugClass: "PARP inhibitor",             risks: ["fn"] },
            { name: "Rucaparib",         brand: "Rubraca®",     category: "targeted",     drugClass: "PARP inhibitor",             risks: ["fn"] },
            { name: "Sunitinib",         brand: "Sutent®",      category: "targeted",     drugClass: "Multi-target TKI",           risks: ["cardiotox"], notes: "Hypothyroidism; hand-foot syndrome" },
            { name: "Sorafenib",         brand: "Nexavar®",     category: "targeted",     drugClass: "Multi-target TKI",           risks: ["cardiotox"], notes: "Hand-foot syndrome" },
            { name: "Pazopanib",         brand: "Votrient®",    category: "targeted",     drugClass: "Multi-target TKI",           risks: ["cardiotox"], notes: "Hepatotoxicity; hair colour change" },
            { name: "Cabozantinib",      brand: "Cabometyx®",   category: "targeted",     drugClass: "Multi-target TKI",           risks: ["mod_emetic"] },
            { name: "Lenvatinib",        brand: "Lenvima®",     category: "targeted",     drugClass: "Multi-target TKI",           risks: ["mod_emetic", "cardiotox"] },
            { name: "Regorafenib",       brand: "Stivarga®",    category: "targeted",     drugClass: "Multi-target TKI",           risks: [] },
            { name: "Axitinib",          brand: "Inlyta®",      category: "targeted",     drugClass: "VEGFR TKI",                  risks: [] },
            { name: "Everolimus",        brand: "Afinitor®",    category: "targeted",     drugClass: "mTOR inhibitor",             risks: [], notes: "Non-infectious pneumonitis; stomatitis" },
            { name: "Temsirolimus",      brand: "Torisel®",     category: "targeted",     drugClass: "mTOR inhibitor",             risks: [] },
            { name: "Bortezomib",        brand: "Velcade®",     category: "targeted",     drugClass: "Proteasome inhibitor",       risks: ["neurotox"], notes: "Peripheral neuropathy; SC preferred over IV" },
            { name: "Carfilzomib",       brand: "Kyprolis®",    category: "targeted",     drugClass: "Proteasome inhibitor",       risks: ["cardiotox", "fn"] },
            { name: "Ixazomib",          brand: "Ninlaro®",     category: "targeted",     drugClass: "Proteasome inhibitor (oral)", risks: ["fn"] },
            { name: "Venetoclax",        brand: "Venclyxto®",   category: "targeted",     drugClass: "BCL-2 inhibitor",            risks: ["fn"], notes: "Tumour lysis syndrome risk — ramp-up dosing required" },
            { name: "Ibrutinib",         brand: "Imbruvica®",   category: "targeted",     drugClass: "BTK inhibitor",              risks: ["fn", "cardiotox"], notes: "AF risk; bleeding risk with anticoagulants" },
            { name: "Acalabrutinib",     brand: "Calquence®",   category: "targeted",     drugClass: "BTK inhibitor",              risks: ["fn"] },
            { name: "Trastuzumab",       brand: "Herceptin®",   category: "targeted",     drugClass: "HER2 monoclonal antibody",   risks: ["cardiotox"], notes: "LVEF monitoring required; not cytotoxic" },
            { name: "Pertuzumab",        brand: "Perjeta®",     category: "targeted",     drugClass: "HER2 monoclonal antibody",   risks: ["cardiotox"] },
            { name: "T-DM1",             brand: "Kadcyla®",     category: "targeted",     drugClass: "HER2 ADC",                   risks: ["fn", "neurotox"], notes: "Antibody-drug conjugate; thrombocytopenia" },
            { name: "T-DXd",             brand: "Enhertu®",     category: "targeted",     drugClass: "HER2 ADC",                   risks: ["fn"], notes: "ILD/pneumonitis risk — monitor closely" },
            { name: "Brentuximab vedotin", brand: "Adcetris®",  category: "targeted",     drugClass: "CD30 ADC",                   risks: ["fn", "neurotox"] },
            { name: "Sacituzumab govitecan", brand: "Trodelvy®", category: "targeted",    drugClass: "TROP2 ADC",                  risks: ["fn"], notes: "Diarrhoea; UGT1A1 polymorphism increases toxicity" },
            { name: "Enfortumab vedotin", brand: "Padcev®",    category: "targeted",    drugClass: "Nectin-4 ADC",               risks: ["skin_reaction", "neurotox", "hyperglycaemia", "pneumonitis", "fn"], notes: "Severe skin reactions including SJS/TEN — withhold and refer to dermatology promptly; monitor blood glucose; peripheral neuropathy common" },
            { name: "Erdafitinib",        brand: "Balversa®",  category: "targeted",    drugClass: "FGFR3 inhibitor",            risks: ["hyperphosphataemia", "ppe", "ocular_tox"], notes: "Hyperphosphataemia — dietary phosphate restriction and phosphate binders required; monthly ophthalmology review for retinal toxicity; PPE — skin care prophylaxis" },
            { name: "Bevacizumab",       brand: "Avastin®",     category: "targeted",     drugClass: "VEGF monoclonal antibody",   risks: [], notes: "Hypertension; proteinuria; wound healing impairment; VTE/ATE risk" },
            { name: "Cetuximab",         brand: "Erbitux®",     category: "targeted",     drugClass: "EGFR monoclonal antibody",   risks: [], notes: "Infusion reactions; acneiform rash; hypomagnesaemia" },
            { name: "Panitumumab",       brand: "Vectibix®",    category: "targeted",     drugClass: "EGFR monoclonal antibody",   risks: [], notes: "Rash; hypomagnesaemia; electrolyte monitoring" },
            { name: "Daratumumab",       brand: "Darzalex®",    category: "targeted",     drugClass: "CD38 monoclonal antibody",   risks: ["fn"], notes: "Infusion reactions; interferes with blood group serology" },
            { name: "Elotuzumab",        brand: "Empliciti®",   category: "targeted",     drugClass: "SLAMF7 monoclonal antibody", risks: [] },

            // ── Immunotherapy ───────────────────────────────────────────
            { name: "Pembrolizumab",     brand: "Keytruda®",    category: "immunotherapy", drugClass: "PD-1 inhibitor",            risks: [], notes: "irAE monitoring required — see irAE guideline" },
            { name: "Nivolumab",         brand: "Opdivo®",      category: "immunotherapy", drugClass: "PD-1 inhibitor",            risks: [], notes: "irAE monitoring required — see irAE guideline" },
            { name: "Atezolizumab",      brand: "Tecentriq®",   category: "immunotherapy", drugClass: "PD-L1 inhibitor",           risks: [], notes: "irAE monitoring required" },
            { name: "Durvalumab",        brand: "Imfinzi®",     category: "immunotherapy", drugClass: "PD-L1 inhibitor",           risks: [], notes: "irAE monitoring required" },
            { name: "Avelumab",          brand: "Bavencio®",    category: "immunotherapy", drugClass: "PD-L1 inhibitor",           risks: [] },
            { name: "Ipilimumab",        brand: "Yervoy®",      category: "immunotherapy", drugClass: "CTLA-4 inhibitor",          risks: [], notes: "Higher irAE rate than PD-1/PD-L1; colitis/hepatitis common" },
            { name: "Tremelimumab",      brand: "Imjudo®",      category: "immunotherapy", drugClass: "CTLA-4 inhibitor",          risks: [] },

            // ── Hormonal / endocrine ────────────────────────────────────
            { name: "Letrozole",         brand: "Femara®",      category: "hormone",       drugClass: "Aromatase inhibitor",        risks: [], notes: "Not cytotoxic; not SACT in traditional sense" },
            { name: "Anastrozole",       brand: "Arimidex®",    category: "hormone",       drugClass: "Aromatase inhibitor",        risks: [] },
            { name: "Exemestane",        brand: "Aromasin®",    category: "hormone",       drugClass: "Aromatase inhibitor",        risks: [] },
            { name: "Tamoxifen",         brand: "Nolvadex®",    category: "hormone",       drugClass: "SERM",                       risks: [], notes: "VTE risk; uterine cancer risk with long-term use" },
            { name: "Fulvestrant",       brand: "Faslodex®",    category: "hormone",       drugClass: "SERD",                       risks: [] },
            { name: "Bicalutamide",      brand: "Casodex®",     category: "hormone",       drugClass: "Anti-androgen",              risks: [] },
            { name: "Enzalutamide",      brand: "Xtandi®",      category: "hormone",       drugClass: "AR antagonist",              risks: [], notes: "Seizure risk; fatigue; falls risk in elderly" },
            { name: "Apalutamide",       brand: "Erleada®",     category: "hormone",       drugClass: "AR antagonist",              risks: [], notes: "Rash; strong CYP3A4 inducer — drug interactions" },
            { name: "Darolutamide",      brand: "Nubeqa®",      category: "hormone",       drugClass: "AR antagonist",              risks: [] },
            { name: "Abiraterone",       brand: "Zytiga®",      category: "hormone",       drugClass: "CYP17 inhibitor",            risks: [], notes: "Requires prednisolone; mineralocorticoid excess — BP/K⁺ monitoring" },
            { name: "Leuprorelin",       brand: "Prostap®",     category: "hormone",       drugClass: "LHRH agonist",               risks: [], notes: "Initial testosterone flare — consider anti-androgen cover" },
            { name: "Goserelin",         brand: "Zoladex®",     category: "hormone",       drugClass: "LHRH agonist",               risks: [] },
            { name: "Degarelix",         brand: "Firmagon®",    category: "hormone",       drugClass: "LHRH antagonist",            risks: [], notes: "No testosterone flare; injection site reactions" },
            { name: "Megestrol",         brand: "Megace®",      category: "hormone",       drugClass: "Progestogen",                risks: [], notes: "Appetite stimulant; VTE risk" },
          ],
        },
      ],
    },
  ],
},
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
          { label: "Vancomycin Dosing (NUH)", url: "https://nhs.sharepoint.com/sites/RX1_Antibiotics/SitePages/Calculators/IV-Vancomycin-Dosing-Calculator.aspx", description: "NUH vancomycin dosing and monitoring calculator" },
          { label: "Gentamicin Single Dose (NUH)", url: "https://nhs.sharepoint.com/sites/RX1_Antibiotics/SitePages/Calculators/IV-Gentamicin-Dosing-Calculator-(NOT-Endocarditis).aspx", description: "Single-dose gentamicin calculator for high-risk sepsis" },
        ],
        pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=775fd63ed18bd2297398cbaab940c0cb",
        portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=9727&query_desc=neutropenic",
        updated: "July 2027 (review)",
        summaryCalcLink: { calcId: "mascc", label: "MASCC Risk Score", text: "Use the MASCC risk score calculator once diagnosis established" },
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
              { label: "Criteria 1 — Neutropenia (REQUIRED)", detail: "Neutrophils <1.0 × 10^9/L OR suspected neutropenia. Any SACT with neutropenia potential in last 4 weeks — treat without waiting for FBC. G-CSF recipients still at risk.", warning: "Pure immunotherapy regimens (pembrolizumab, nivolumab, ipilimumab, atezolizumab etc.) RARELY cause neutropenia — use High Risk Red Sepsis pathway instead if on these agents only." },
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
                urgent: "Ciprofloxacin 750mg PO BD (or 400mg IV TDS if unable to take oral)",
                exclusions: ["+ Vancomycin IV for ALL patients", "+ Metronidazole 500mg IV TDS: suspected abdominal sepsis", "+ Gentamicin IV single dose: high-risk sepsis", "Prior quinolone prophylaxis: discuss with microbiology first", "!!Meropenem is a beta-lactam — do NOT use in severe immediate (anaphylactic) penicillin allergy", "Vancomycin alternative: Teicoplanin 12mg/kg IV q12h × 3, then once daily"],
              },
            ],
          },
          {
  heading: "Dose Calculation",
  type: "callouts",
  style: { marginBottom: 8 },
  panels: [
    {
      label: "Vancomycin & Gentamicin Dosing",
      color: "#2a8aaa",
      headerBg: "#f0f9fc",
      blocks: [
        {
          icon: "drug",
          heading: "NUH Antibiotic Dosing Calculator",
          color: "#1a6b8a",
          bg: "#e8f4f8",
          border: "#90cde0",
          items: [
            "Use for vancomycin and gentamicin dose calculation based on renal function (Cockcroft-Gault).",
            "Includes loading and maintenance doses, AKI adjustments, and level monitoring guidance.",
          ],
          calcLink: { calcId: "antibiotic-dosing", label: "Open Antibiotic Dosing Calculator" },
        },
      ],
    },
  ],
},
          {
            heading: "Investigations Checklist",
            type: "checklist",
            items: [
  "FBC, U&Es, LFTs, lactate, CRP",
  "Chest X-ray",
  {
    text: "Microbiology:",
    subitems: [
      "Blood cultures × 2 sets: peripheral + central line (state line type on form)",
      "MSU and urinalysis",
      "Stool MC&S + CDT — if symptomatic diarrhoea",
      "Oral swabs × 2: Candida + viral — if sore mouth",
      "Viral throat swab or NPA — if coryzal",
      "Sputum sample",
    ],
  },
  "Blood gases — if clinically indicated",
],
          },
          {
            heading: "Review & Monitoring",
            type: "review_flow",
            review24: {
              callout: "Review ALL patients within 24–48 hours",
              items: [
                "**ALL patients** must be reviewed within 24 hours by a registrar or consultant — **including weekends**",
                "Microbiology will ring through positive blood cultures — review the need for antibiotics accordingly",
                "FBC + U&Es daily while inpatient",
                "Repeat blood cultures if temperature spikes",
                "Do **NOT** change empiric regimen without clinical deterioration or clear microbiological indication",
              ],
            },
            statuses: [
              {
                key: 1,
                label: "Status 1 — Never / No Longer Neutropenic",
                color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                criteria: ["Neutrophils recovering above 1·0 × 10^9/L", "No longer neutropenic at any point"],
                items: [
                  "If identifiable infection focus: treat per relevant NUH guideline",
                  "If no focus and no high-risk features: consider stopping antibiotics",
                  "Criteria to stop: apyrexial >24h, stable, no focus, negative cultures",
                  "Use MASCC score to guide discharge decision",
                ],
              },
              {
                key: 2,
                label: "Status 2 — Neutropenic + Clinically Improving",
                color: "#744210", bg: "#fffff0", border: "#f6e05e",
                criteria: ["Apyrexial or clear trend to improvement", "Remains neutropenic", "Cultures negative or low-risk organism"],
                items: [
                  "Continue IV antibiotics and FBC + U&Es daily",
                  "If cultures negative and improving → consider switch to oral at 24–48h (see IV→Oral below)",
                  "Consider discharge later same day once on oral therapy",
                  "Document IV→oral decision and stop date in notes",
                ],
              },
              {
                key: 3,
                label: "Status 3 — Neutropenic + Not Improving",
                color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                criteria: ["Still febrile or haemodynamically unstable", "Remains neutropenic", "No clear response to initial antibiotics"],
                items: [
                  "Continue IV antibiotics",
                  "Repeat blood cultures if spiking",
                  "At 48h: review all microbiology",
                  "!!Do NOT change empiric regimen without clinical deterioration or microbiological indication",
                  "!!If no response by 48–72h → see No Response section below",
                ],
              },
            ],
            noResponse: {
              trigger: "Beyond 48 hours — No Response",
              instruction: "Discuss with experienced registrar or consultant. Review factors for non-response:",
              factors: [
                { icon: "🔍", label: "Review Diagnosis", items: ["Non-infective pyrexia: disease activity, drug reaction", "Has the empiric regimen been appropriate for the clinical picture?"] },
                { icon: "🧫", label: "Microbiology Review", items: ["Multi-resistant organism: review all previous microbiology; discuss with microbiology team", "Atypical pathogens: Legionella, PCP, disseminated viral infection"] },
                { icon: "🔗", label: "Source Control", items: ["Ongoing focus: suspected line infection → consider line removal", "Invasive fungal infection: consider if neutropenia >10 days, steroids >3 weeks, or T-cell immunosuppressants"] },
              ],
            },
            oralSwitch: {
              trigger: "If Good Clinical Response — IV to Oral Switch",
              note: "Oral choices do NOT cover all pathogens covered by IV treatment. Switch appropriate after 24–48h if MASCC low-risk.",
              options: [
                { label: "No source — low Pseudomonas risk, neutrophils recovering", drug: "Co-amoxiclav 625mg PO TDS", course: "5 days", warning: "HIGH RISK for C. difficile — consult microbiology if CDT-positive or previous C. diff" },
                { label: "No source — high Pseudomonas risk or profoundly neutropenic", drug: "Ciprofloxacin 750mg PO BD", course: "5 days", warning: "HIGH RISK for C. difficile. Previous MRSA: discuss with microbiology. Fluoroquinolones: rare risk of long-lasting multisystem side effects — document consent" },
                { label: "Penicillin allergic — no source identified", drug: "Levofloxacin 500mg PO OD", course: "5 days", warning: "HIGH RISK for C. difficile. Fluoroquinolones: rare risk of long-lasting multisystem side effects — document consent" },
              ],
            },
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
      },          {
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
              { label: "SINS Score Calculator", calcId: "sins", url: "https://www.mdcalc.com/calc/10548/spinal-instability-neoplastic-scale-sins-score" },
              { label: "Revised Tokuhashi Score", url: "https://www.mdcalc.com/calc/10475/revised-tokuhashi-scoring-system", description: "Prognosis in spinal metastases — guides treatment intensity" },
              { label: "Frankel / ASIA Classification", url: "https://www.asia-spinalinjury.org/wp-content/uploads/2019/10/ASIA-ISCOS-Worksheet_10.2019_PRINT-Page-1-2.pdf", description: "ASIA Neurological injury severity classification" },
            ],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=64b1c0f07b8b8d13e4e9c6b664d0f7f5",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10504&query_desc=spinal%20cord%20compression",
            updated: "Mar 2028 (review)",
            summaryCalcLink: { calcId: "sins", label: "SINS Score Calculator", text: "Use the SINS risk score for spinal instability to guide surgical referral" },
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
  type: "mscc_steroid_table",
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
  notes: ["Early MDT input essential: palliative care, PT/OT, orthotics", "Document spinal stability for nursing"],
},,
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
          },        ],
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
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=06a07ac9af7cd720d38a9e0c02fe22d8",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=9726&query_desc=mucositis",
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
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=3691c5877f67bbf1d519fe66515e3bc6",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=9824&query_desc=diarrhoea",
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
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=d8886b7660342320c8e4ad7cf4de2c1b",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=9712&query_desc=nausea",
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
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=5cbe18a5cdb5536252a9433b96d8e448",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=9813&query_desc=extravasation",
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
          },        ],
      },
      {
        id: "onco-io",
        label: "Immunotherapy Toxicity",
        guidelines: [
          {
            id: "io-skin-toxicity",
            title: "Skin Toxicity & Dermatitis (ICPI)",
            category: "Skin & Mucosal",
            summary: "Grade 1–4 skin toxicity management. Topical corticosteroid selection by potency, systemic steroids from grade 3, bullous dermatitis (urgent derm input, rituximab for refractory), Stevens-Johnson / TEN (inpatient IV methylprednisolone 1–2mg/kg). ICPI hold/restart criteria. Grade 2 pruritus: consider gabapentin/pregabalin if antihistamine-refractory.",
            tags: ["Rash", "Pruritus", "SJS/TEN", "BSA", "Topical steroids"],
            related: ["io-peripheral-neuro", "io-colitis"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=a0e61c913bb70e1b68f28baed308bd21",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10508&query_desc=immunotherapy",
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
            title: "Peripheral Neurological Toxicity (ICPI)",
            category: "Neurological",
            summary: "Asymmetric/systemic motor deficit, painful or painless sensory deficit, autonomic dysfunction, hypo/areflexia. GI tract paresis from myenteric neuritis is rare but may present with sudden profound ileus. Grade 1: monitor. Grade 2: prednisolone 0.5–1mg/kg + amitriptyline/gabapentin for pain, withhold ICPI. Grade 3/4: admit, IV methylprednisolone 2mg/kg/day, neurology team, withhold/discontinue ICPI. Steroid wean: 4–8 weeks. Consider PCP prophylaxis if >4 weeks.",
            tags: ["Peripheral neuropathy", "Motor deficit", "Gabapentin", "Methylprednisolone"],
            related: ["io-central-neuro", "io-gbs-mg"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=a0e61c913bb70e1b68f28baed308bd21",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10508&query_desc=immunotherapy",
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
            title: "Guillain-Barré Syndrome & Myasthenia Gravis (ICPI)",
            category: "Neurological",
            summary: "GBS: progressive symmetrical muscle weakness, absent tendon reflexes, respiratory/bulbar involvement, autonomic instability. Steroids not recommended in idiopathic GBS — trial of methylprednisolone 1–2mg/kg reasonable for ICPI-induced GBS. Plasmapheresis or IVIG. HDU/ITU if FVC <15–20ml/kg. MG: fluctuating proximal/ocular/bulbar weakness with fatigability. Steroids indicated — prednisolone 20mg increasing to 1mg/kg/day. Pyridostigmine 30mg TDS. Avoid ciprofloxacin, beta-blockers. Discontinue ICPI permanently (consultant decision).",
            tags: ["GBS", "Myasthenia gravis", "IVIG", "Plasmapheresis", "Pyridostigmine"],
            related: ["io-peripheral-neuro", "io-central-neuro"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=a0e61c913bb70e1b68f28baed308bd21",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10508&query_desc=immunotherapy",
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
            title: "Central Neurotoxicity (ICPI)",
            category: "Neurological",
            summary: "Aseptic meningitis (headache, photophobia, neck stiffness, normal cognition), encephalitis (confusion, personality change, altered GCS), transverse myelitis (acute motor/sensory/autonomic deficit, sensory level, often bilateral). All require urgent exclusion of infection before steroids. Withhold/discontinue ICPI (consultant decision). Other rare presentations: neurosarcoidosis, PRES, Vogt-Harada-Koyanagi, demyelination, vasculitic encephalopathy, generalised seizures.",
            tags: ["Encephalitis", "Meningitis", "Transverse myelitis", "LP", "Methylprednisolone"],
            related: ["io-peripheral-neuro", "io-gbs-mg"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=a0e61c913bb70e1b68f28baed308bd21",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10508&query_desc=immunotherapy",
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
            title: "Diarrhoea & Colitis (ICPI)",
            category: "GI & Hepatic",
            summary: "Grade 1 (≤3 liquid stools/day): fluid intake, monitor q72h. Grade 2 (4–6 stools, abdominal pain, blood): prednisolone 0.5–1mg/kg or budesonide 3mg TDS if no bloody diarrhoea; outpatient flexi-sig. Grade 3/4 (≥6 stools, loose stools within 1h of eating): admit to SRU, IV methylprednisolone 1–2mg/kg, urgent flexi-sig + biopsies (CMV PCR), CT abdomen/pelvis, pre-infliximab screening. Steroid-refractory: infliximab 5mg/kg (up to 3 infusions). Vedolizumab, mycophenolate, or tacrolimus as alternatives. Continue enteral feeding — not harmful, may aid resolution.",
            tags: ["Colitis", "Diarrhoea", "Infliximab", "Flexi-sig", "CMV"],
            related: ["io-hepatitis", "io-peripheral-neuro"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=a0e61c913bb70e1b68f28baed308bd21",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10508&query_desc=immunotherapy",
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
            title: "Hepatitis (ICPI)",
            category: "GI & Hepatic",
            summary: "Grade 1 (ALT/AST <3× ULN): watch, repeat LFTs in 1 week. Grade 2 (3–5× ULN): no immunosuppression unless worsening; consultant decision to initiate prednisolone 0.5–1mg/kg PO. Grade 3 (5–20× ULN): withhold ICPI, re-check LFTs/INR/albumin q2–3 days, consider hepatology review + liver biopsy before steroids. Grade 4 (>20× ULN): admit, IV methylprednisolone 1–2mg/kg/day, hepatology review + biopsy. Steroid-refractory: switch to IV if on oral, add mycophenolate 500–1000mg BD, then consider tacrolimus. For grade >1 transaminitis with bilirubin >1.5× ULN: follow grade 4 pathway (unless Gilbert's).",
            tags: ["Hepatitis", "Transaminitis", "Mycophenolate", "Liver biopsy", "Infliximab"],
            related: ["io-colitis"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=a0e61c913bb70e1b68f28baed308bd21",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10508&query_desc=immunotherapy",
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
            title: "Thyroid Toxicity (ICPI)",
            category: "Endocrine",
            summary: "Monitor TSH, FT4, T3 before every cycle. Subclinical hyperthyroidism / thyrotoxicosis often precedes overt hypothyroidism. Falling TSH across 2 measurements may suggest pituitary dysfunction — check weekly cortisol. Hypothyroidism (low FT4 + elevated TSH, or TSH >10): thyroxine 0.15–1.5µg/kg (start low in elderly/cardiac history) if random cortisol normal — check cortisol first. Continue ICPI. Thyrotoxicosis: beta-blockers for symptoms, repeat TFTs in 4–6 weeks. Carbimazole is NOT indicated in immunotherapy-induced thyrotoxicosis. CT iodine contrast can affect TFTs.",
            tags: ["Hypothyroidism", "Thyrotoxicosis", "TSH", "Thyroxine", "Cortisol"],
            related: ["io-hypophysitis", "io-adrenal"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=a0e61c913bb70e1b68f28baed308bd21",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10508&query_desc=immunotherapy",
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
            title: "Hypophysitis (ICPI)",
            category: "Endocrine",
            summary: "Acute: headache, photophobia, dizziness, nausea, fevers, anorexia, visual field cuts, severe fatigue. Bloods: low ACTH, low morning cortisol, low Na, low K, low testosterone. Grade 1–2: pituitary axis bloods + MRI pituitary. Oral prednisolone 0.5–1mg/kg. Grade 3–4: IV methylprednisolone 1mg/kg. DO NOT STOP STEROIDS. Wean over 2–4 weeks to 5mg prednisolone. Refer endocrinology. Hydrocortisone replacement: 10mg am / 5mg midday / 5mg 4pm if cortisol low or inadequate synacthen response. Always replace cortisol 1 week before starting thyroxine.",
            tags: ["Hypophysitis", "Cortisol", "ACTH", "MRI pituitary", "Hydrocortisone"],
            related: ["io-thyroid", "io-adrenal"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=a0e61c913bb70e1b68f28baed308bd21",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10508&query_desc=immunotherapy",
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
            title: "Hypoadrenalism / Adrenal Insufficiency (ICPI)",
            category: "Endocrine",
            summary: "May occur without hypophysitis. Incidental low cortisol: check steroid history → if no steroids and asymptomatic, arrange short synacthen test within 24–48h via SDEC. Adequate response (cortisol >420nmol/L at 30min post-synacthen): discharge with advice. Inadequate response or symptomatic: manage as suspected primary adrenal insufficiency. Adrenal crisis: admit SRU, random cortisol + ACTH (must reach lab within 4h), treat acutely as per endocrinology adrenal crisis guideline. Maintenance: hydrocortisone PO 10mg am / 5mg midday / 5mg 4pm. Provide sick day rules + injectable hydrocortisone (2 vials 100mg/1ml). Refer endocrinology.",
            tags: ["Adrenal insufficiency", "Cortisol", "Synacthen", "Hydrocortisone", "Sick day rules"],
            related: ["io-hypophysitis", "io-thyroid"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=a0e61c913bb70e1b68f28baed308bd21",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10508&query_desc=immunotherapy",
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
            title: "Hyperglycaemia (ICPI)",
            category: "Endocrine",
            summary: "New onset fasting glucose >7.0 mmol/L or random >11 mmol/L. Immunotherapy can cause new-onset type 1 diabetes. In steroid-treated patients: steroid-induced hyperglycaemia likely. Pre-existing T2DM: titrate usual medication, plan reduction when steroids weaned. No T2DM: start gliclazide 40–80mg morning (max 240mg morning, 320mg total daily). If persistent hyperglycaemia: discuss insulin with endocrinology. If DKA features: hold immunotherapy, manage as per NUH DKA guideline, endocrinology referral.",
            tags: ["Hyperglycaemia", "DKA", "Type 1 diabetes", "Gliclazide", "Steroids"],
            related: ["io-hypophysitis", "io-adrenal"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=a0e61c913bb70e1b68f28baed308bd21",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10508&query_desc=immunotherapy",
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
            title: "Pneumonitis (ICPI)",
            category: "Pulmonary & Renal",
            summary: "Grade 1 (radiographic only — ground glass): consider delay, monitor every 2–3 days. Grade 2 (mild/moderate symptoms — dyspnoea, cough, chest pain): treat infection first; if no infection or no improvement with antibiotics after 48h: prednisolone 1mg/kg/day. Grade 3–4 (severe symptoms, new/worsening hypoxia, ARDS): admit, IV methylprednisolone 1–2mg/kg/day, taper over 6 weeks, ceiling of care discussion. If no improvement in 48h: infliximab 5mg/kg (or mycophenolate if concurrent hepatic toxicity, or IVIG). Investigations: CXR, B-D glucan/galactomannan, viral PCR (PCP + COVID), troponin (myocarditis), BNP (heart failure).",
            tags: ["Pneumonitis", "Ground glass", "Methylprednisolone", "Infliximab", "ARDS"],
            related: ["io-colitis", "io-hepatitis"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=a0e61c913bb70e1b68f28baed308bd21",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10508&query_desc=immunotherapy",
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
            title: "Nephritis (ICPI)",
            category: "Pulmonary & Renal",
            summary: "Grade 1 (creatinine 1.5–2× baseline/ULN): weekly U&Es. Grade 2 (2–3×): review hydration, renal USS, creatinine in 48–72h, nephrology discussion (biopsy), steroids 0.5–1mg/kg if IRAE. Grade 3/4 (>3×, grade 4 = dialysis indicated): admit, strict fluid balance, daily U&Es, nephrology + biopsy, methylprednisolone 1–2mg/kg. If no improvement after 1 week: azathioprine, cyclophosphamide, ciclosporin, infliximab or mycophenolate. May need renal replacement therapy.",
            tags: ["Nephritis", "Creatinine", "Renal biopsy", "Mycophenolate", "Nephrologist"],
            related: ["io-pneumonitis"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=a0e61c913bb70e1b68f28baed308bd21",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10508&query_desc=immunotherapy",
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
            id: "io-myocarditis",
            title: "Myocarditis (ICPI)",
            category: "Cardiovascular",
            version: "1.0",
            authors: "Ritika Tuli, Dr Navin Mathiyalagan",
            evidenceBase: "ESMO / ESC Cardio-Oncology Guidelines | Modified Lake Louise Criteria | BSE Consensus",
            summary: "ICI myocarditis carries 40–50% mortality — the highest of all irAEs. Highest risk: high-grade AV block, ventricular arrhythmias, severe LV dysfunction, MMM overlap syndrome (Myocarditis + Myositis + Myasthenia Gravis). 'Asymptomatic' does NOT mean low risk. Hold ICI immediately and activate cardio-oncology MDT.",
            tags: ["Myocarditis", "ICPI", "Cardiotoxicity", "Troponin", "CMR", "Steroids", "MMM", "Cardio-oncology"],
            related: ["io-steroids-guide", "io-gbs-mg"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=96cdf094b6a9040c6098fb2e83ba42ce",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=12587",
            updated: "2024",
            sections: [
              {
                heading: "⚠ Why This Matters",
                type: "alert",
                items: [
                  "!!ICI myocarditis carries 40–50% mortality — the highest of all irAEs",
                  "Higher risk with combination ICI therapy",
                  "Highest risk features: high-grade AV block, ventricular arrhythmias, severe LV dysfunction, MMM overlap syndrome",
                  "!!**'Asymptomatic' does NOT mean low risk** — biomarker or EKG changes alone warrant urgent assessment",
                ],
              },
              {
                heading: "Initial Workup",
                type: "hypo_assessment",
                blocks: [
                  {
                    id: "bloods",
                    label: "Urgent Bloods & Investigations",
                    icon: "investigations",
                    checklist: true,
                    items: [
                      "12-lead ECG",
                      "High-sensitivity troponin",
                      "NT-proBNP",
                      "TTE — in all high-risk patients",
                      "Rule out ACS and infective myocarditis",
                    ],
                  },
                  {
                    id: "mmm",
                    label: "Screen for MMM Overlap Syndrome",
                    icon: "management",
                    checklist: true,
                    items: [
                      "Myositis: CK, MRI thighs",
                      "Thyroiditis: TSH, T4",
                      "Myasthenia Gravis: demonstrable fatigable muscle weakness with improvement on rest — AChR antibody",
                    ],
                  },
                ],
              },
              {
                heading: "Diagnosis",
                type: "callouts",
                panels: [
                  {
                    label: "Cardiac MRI (CMR)",
                    color: "#2563a8",
                    headerBg: "#e8f0fb",
                    blocks: [
                      {
                        icon: "imaging",
                        heading: "Modified Lake Louise Criteria",
                        color: "#2563a8", bg: "#e8f0fb", border: "#93b4e8",
                        items: [
                          "Best window: 4–14 days after onset or biomarker rise",
                          "50% have normal or non-diagnostic CMR findings — clinical suspicion, biomarker correlation and MDT assessment remain paramount",
                          "!!Do not delay treatment waiting for CMR if clinical picture is compelling",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Endomyocardial Biopsy",
                    color: "#744210",
                    headerBg: "#fffff0",
                    blocks: [
                      {
                        icon: "immediate",
                        heading: "Gold standard — MDT decision",
                        color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: [
                          "Gold standard for diagnosis",
                          "Reserved for diagnostically uncertain cases or refractory disease",
                          "Discuss with cardio-oncology MDT before proceeding",
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                heading: "Grading & Management",
                type: "grader",
                grades: [
                  {
                    grade: 1,
                    label: "Grade 1 — Asymptomatic",
                    color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                    criteria: [
                      "No symptoms",
                      "Mild biomarker elevation or non-specific EKG changes only",
                    ],
                  },
                  {
                    grade: 2,
                    label: "Grade 2 — Mild Symptoms",
                    color: "#744210", bg: "#fffff0", border: "#f6e05e",
                    criteria: [
                      "Mild symptoms (fatigue, dyspnoea, palpitations)",
                      "OR convincing biomarker / EKG changes",
                      "Usually requires admission",
                    ],
                  },
                  {
                    grade: 3,
                    label: "Grade 3/4 — Severe / Life-threatening",
                    color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                    criteria: [
                      "Severe cardiac dysfunction",
                      "Malignant arrhythmias",
                      "High-grade AV block",
                      "Cardiogenic shock",
                    ],
                  },
                ],
                management: [
                  {
                    grade: 1,
                    icpi: "Hold ICI — discuss restart with cardio-oncology MDT",
                    items: [
                      "Hold ICI immediately",
                      "Activate cardio-oncology MDT",
                      "Repeat troponin and ECG at 24–48h",
                      "TTE if not already done",
                      "Close monitoring — Grade 1 can deteriorate rapidly",
                      "!!Asymptomatic does NOT mean safe to continue ICI",
                    ],
                  },
                  {
                    grade: 2,
                    icpi: "Hold ICI — do not restart without cardio-oncology MDT",
                    items: [
                      "!!Hold ICI immediately",
                      "Admit for monitoring",
                      "Activate cardio-oncology MDT",
                      "High-dose corticosteroids early — methylprednisolone 1–2mg/kg/day IV",
                      "TTE, continuous cardiac monitoring, daily troponin",
                      "Screen for MMM overlap syndrome",
                    ],
                  },
                  {
                    grade: 3,
                    icpi: "Permanently discontinue ICI",
                    items: [
                      "!!Permanently discontinue ICI",
                      "!!Admit to cardiac monitoring unit or ICU/HDU",
                      "!!Activate cardio-oncology MDT urgently",
                      "Pulse dose steroids: methylprednisolone 500mg–1g IV daily × 3–5 days",
                      "Continuous ECG monitoring — pacing if high-grade AV block",
                      "Escalate immunosuppression if refractory — MDT guided: MMF, tacrolimus, abatacept, tocilizumab, ruxolitinib",
                      "!!Infliximab: AVOID if LVEF <40%",
                      "Consider endomyocardial biopsy",
                    ],
                  },
                ],
                note: "Infliximab is contraindicated if LVEF <40% — use alternative immunosuppression.",
              },
              {
                heading: "Steroid Prophylaxis & Monitoring",
                type: "checklist",
                items: [
                  "PCP prophylaxis if prolonged or high-dose steroids (cotrimoxazole 480mg OD)",
                  "GI protection: famotidine (preferred over PPI in cardiac patients)",
                  "Bone protection: Vitamin D ± calcium; consider bisphosphonate based on risk and duration",
                  "Monitor blood glucose and blood pressure regularly",
                ],
              },
              {
                heading: "MMM Overlap Syndrome",
                type: "callouts",
                panels: [
                  {
                    label: "Myocarditis + Myositis + Myasthenia Gravis (MMM)",
                    color: "#742a2a",
                    headerBg: "#fff5f5",
                    blocks: [
                      {
                        icon: "warning",
                        heading: "High-risk constellation — requires urgent MDT",
                        color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "MMM overlap carries significantly higher mortality than isolated myocarditis",
                          "!!Permanently discontinue ICI",
                          "Involve cardiology, neurology, and rheumatology MDT",
                          "Myositis: CK elevation, proximal weakness, MRI thighs",
                          "Myasthenia: fatigable weakness, ptosis, diplopia, bulbar symptoms — AChR antibody",
                          "Management per individual syndrome guidelines — see GBS/MG guideline for MG management",
                          "!!Infliximab: avoid — may worsen MG",
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                heading: "Additional Considerations",
                type: "list",
                groups: [
                  {
                    icon: "management",
                    label: "ICI-Induced Accelerated Atherosclerosis",
                    items: [
                      "Emerging evidence of ICI-accelerated atherosclerosis — 'hidden iceberg' of ICI cardiotoxicity",
                      "Consider ischaemic evaluation in patients with new cardiac symptoms even if troponin negative",
                      "Discuss with cardio-oncology MDT",
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "io-steroids-guide",
            title: "Steroid Prescribing & Monitoring",
            category: "Steroid Management",
            summary: "All patients on steroids for irAE: issue pharmacy steroid card + Steroid Alert Card (carry at all times). Steroid taper: irAEs may worsen during dose reduction — counsel patients, escalate if needed, record in hand-held record. PPI required for high-dose steroids (lansoprazole 30mg OD or omeprazole 40mg OD). If on or will be on high-dose steroids >2 weeks: add cotrimoxazole 480mg OD (PCP prophylaxis) + AdCal D3 1 tablet daily (osteoporosis prevention). Do NOT check cortisol whilst on steroids.",
            tags: ["PPI", "PCP prophylaxis", "Steroid card", "Bone protection", "Cortisol"],
            related: ["io-hypophysitis", "io-adrenal", "io-pneumonitis"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=a0e61c913bb70e1b68f28baed308bd21",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10508&query_desc=immunotherapy",
            updated: "Jan 2024",
            sections: [
              {
  heading: "Standard Supportive Care with Steroids",
  type: "checklist",
  items: [
    "Issue pharmacy steroid card — dose, timing, side effects",
    "Issue Steroid Alert Card — patient to carry at all times",
    "Prescribe PPI: lansoprazole 30mg OD or omeprazole 40mg OD",
    {
      text: "If high-dose steroids anticipated >2 weeks:",
      subitems: [
        "Cotrimoxazole 480mg OD (PCP prophylaxis)",
        "Glucose monitoring (hyperglycaemia risk)",
        "AdCal D3 1 tablet daily (bone protection)",
      ],
    },
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
        id: "onco-outpatient",
        label: "Outpatient Oncology",
        guidelines: [],
        comingSoon: true,
      },
      {
        id: "cardio-oncology",
        label: "Cardio-Oncology",
        guidelines: [
        {
          id: "cardio-anthracycline",
          title: "Anthracycline-Induced Cardiotoxicity (CTRCD)",
          category: "SACT Cardiotoxicity",
          version: "1",
          authors: "Dr Navin Mathiyalagan, Dr Thomas Mathew, Dr Muhammad Adeel Sarwar — NUH. Expert review: Prof Arjun K Ghosh (Barts/UCLH)",
          evidenceBase: "ESC Cardio-Oncology Guidelines 2022 | JACC CardioOncology 2024 | BSE/BCOS Echo Guidelines 2021 | Review: April 2029",
          summary: "Standardised approach to early detection, risk stratification, and management of anthracycline-related cardiac dysfunction (CTRCD). All patients require baseline HFA-ICOS risk stratification before starting anthracyclines. High/very high risk patients should be referred to Cardio-Oncology clinic at baseline. CTRCD is classified as symptomatic or asymptomatic, and by severity — management ranges from close monitoring to pausing or stopping anthracyclines with HF therapy.",
          tags: ["Anthracycline", "CTRCD", "Cardiotoxicity", "LVEF", "GLS", "Troponin", "HFA-ICOS", "Echocardiography", "HF therapy", "Doxorubicin", "Epirubicin"],
          related: ["cardio-fluoropyrimidine", "io-myocarditis"],
          calculators: [
            { label: "HFA-ICOS Baseline Risk Assessment", url: "https://www.mdcalc.com/calc/10642/hfa-icos-baseline-cardio-oncology-risk-assessment-anthracycline-chemotherapy", description: "Baseline cardiovascular risk stratification before anthracycline chemotherapy" },
          ],
          pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=ca5b5baaec7898bf4b83c3fdff390a34",
          portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=12680&query_desc=an%2Cphr%3A6288",
          updated: "April 2029 (review)",
          sections: [
            {
  heading: "Drugs Covered",
  type: "list",
  items: [
    "Doxorubicin",
    "Epirubicin",
    "Daunorubicin",
    "Idarubicin",
  ],
},
            {
              heading: "⚠ Key Principles",
              type: "alert",
              items: [
                "ALL patients receiving anthracyclines must have baseline HFA-ICOS cardiovascular risk stratification before starting therapy",
                "High/very high risk patients must be referred to Cardio-Oncology clinic for baseline optimisation and ongoing surveillance",
                "Early detection of CTRCD is critical — most early-onset dysfunction is potentially reversible with prompt intervention",
                "!!Cumulative dose threshold: repeat cardiac imaging when anthracycline dose exceeds 250mg/m² doxorubicin-equivalent (≈400mg/m² epirubicin), then after every additional 50mg/m²",
                "BRCA1/2 germline mutation carriers receiving anthracyclines: consider closer cardio-oncology surveillance — increased susceptibility to LV dysfunction (BRCAN study)",
              ],
            },
            {
  heading: "Risk Stratification & CTRCD Management",
  type: "anthracycline_tables",
},
            {
              heading: "Special Considerations",
              type: "list",
              groups: [
                {
                  icon: "drug",
                  label: "ARNI / HF Therapy Notes",
                  items: [
                    "ACE inhibitors must be discontinued for 48 hours prior to initiation of ARNI (sacubitril/valsartan)",
                    "When switching from ARB to ARNI: no washout period required — can initiate directly",
                  ],
                },
                {
                  icon: "monitoring",
                  label: "Cumulative Dose Thresholds",
                  items: [
                    "Repeat cardiac imaging when cumulative anthracycline dose exceeds 250mg/m² doxorubicin-equivalent (approximately 400mg/m² for epirubicin)",
                    "Additional imaging after every 50mg/m² thereafter, where clinically appropriate",
                    "Repeat imaging and cardiac biomarkers for any patient developing symptoms suggestive of cardiotoxicity at any point during treatment",
                  ],
                },
                {
                  icon: "management",
                  label: "Exercise & Lifestyle",
                  items: [
                    "Regular aerobic exercise should be encouraged where clinically appropriate — shown to support cardiovascular function and may mitigate anthracycline-related cardiotoxicity",
                  ],
                },
                {
                  icon: "investigations",
                  label: "BRCA1/2 Germline Mutation",
                  items: [
                    "In patients with early breast cancer and germline BRCA1/2 mutation receiving anthracyclines: consider closer cardio-oncology surveillance",
                    "Recent observational data (BRCAN study) suggest increased susceptibility to anthracycline-related LV dysfunction",
                    "Interpret alongside established clinical risk factors — evidence is observational",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "cardio-fluoropyrimidine",
          title: "Fluoropyrimidine Cardiotoxicity (5-FU & Capecitabine)",
          category: "SACT Cardiotoxicity",
          version: "1",
          authors: "Dr Navin Mathiyalagan, Dr Thomas Mathew, Dr Maryam Al-Ani, Dr Hui Xian Tan, Dr Muhammad Adeel Sarwar, Dr Rahul Eric — NUH. Expert review: Dr Suzan Hatipoglu (UCLH)",
          evidenceBase: "ESC Cardio-Oncology Guidelines | JACC CardioOncology | ESMO Open 2022 | Review: May 2029",
          summary: "Fluoropyrimidine cardiotoxicity occurs in 5–10% of patients receiving 5-FU or capecitabine. The predominant mechanism is coronary vasospasm. Most events occur during or shortly after the first cycle, typically within 12–48 hours of 5-FU exposure. Silent myocardial ischaemia occurs in approximately 6–7%. Absence of known cardiovascular risk factors does not exclude risk. Re-challenge carries high risk of recurrent cardiotoxicity — requires formal MDT discussion and full pre-challenge checklist.",
          tags: ["5-FU", "Capecitabine", "Fluoropyrimidine", "Cardiotoxicity", "Vasospasm", "Chest pain", "Diltiazem", "Re-challenge", "ACS", "Raltitrexed"],
          related: ["cardio-anthracycline", "io-myocarditis"],
          pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=3fe568f6509caccbcb7e3aa4e20ba5f2",
          portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=12689",
          updated: "May 2029 (review)",
          sections: [
            {
  heading: "Drugs Covered",
  type: "list",
  items: [
    "5-Fluorouracil",
    "Capecitabine",
  ],
},
            {
              heading: "⚠ Key Principles",
              type: "alert",
              items: [
                "Cardiotoxicity occurs in 5–10% of patients — silent myocardial ischaemia in approximately 6–7%",
                "Predominant mechanism is coronary vasospasm, not atherosclerotic plaque rupture — management differs from standard ACS",
                "Most events occur during or shortly after the first cycle — maintain high suspicion for at least 48 hours after infusion completion",
                "!!Absence of known cardiovascular risk factors does NOT exclude fluoropyrimidine cardiotoxicity",
                "Continuous infusion regimens carry higher risk than bolus dosing",
                "Re-challenge carries high risk of recurrent and potentially life-threatening cardiotoxicity — never undertake without formal MDT discussion",
              ],
            },
            {
              heading: "Risk Factors",
              type: "list",
              groups: [
                {
                  icon: "investigations",
                  label: "Factors associated with increased risk (evidence heterogeneous)",
                  items: [
                    "Pre-existing cardiovascular disease — note: not consistently predictive; many cases occur without prior CVD",
                    "Continuous infusion regimens — higher risk than bolus dosing",
                    "Higher cumulative dose or prolonged exposure",
                    "Concomitant cardiotoxic therapies (e.g. cisplatin, bevacizumab)",
                    "Prior or concurrent thoracic radiotherapy",
                    "!!Absence of cardiovascular risk factors does not exclude risk",
                  ],
                },
              ],
            },
            {
              heading: "Acute Management of Fluoropyrimidine-Associated Chest Pain",
              type: "steps",
              items: [
                { label: "Stop fluoropyrimidine immediately", detail: "Stop 5-FU infusion or capecitabine at first suspicion of cardiotoxicity. Do not restart without formal MDT discussion." },
                { label: "Immediate haemodynamic assessment", detail: "If haemodynamically unstable: activate ACS pathway per local protocol. Arrange urgent transfer to monitored setting (ITU/cardiac care unit). If stable: admit to hospital." },
                { label: "Serial ECG", detail: "Document evolution or resolution of ST changes, response to stopping the drug, and identification of arrhythmia. Transient ST changes that resolve after stopping favour vasospasm; persistent or evolving changes in a single coronary territory raise suspicion for plaque rupture/ACS." },
                { label: "Urgent investigations", detail: "Serial hs-Troponin (0h, 3h, ±6h if clinically indicated), NT-proBNP, echocardiogram. Actively consider PE given prothrombotic nature of malignancy." },
                { label: "Urgent cardiology review", detail: "All cases of suspected fluoropyrimidine cardiotoxicity require urgent cardiology input." },
              ],
            },
            {
              heading: "Pharmacological Management",
              type: "callouts",
              panels: [
                {
                  label: "Calcium Channel Blockers — First Line",
                  color: "#9b1c1c",
                  headerBg: "#fef2f2",
                  blocks: [
                    {
                      icon: "drug",
                      heading: "Preferred agents",
                      color: "#9b1c1c",
                      bg: "#fef2f2",
                      border: "#fca5a5",
                      items: [
                        "Diltiazem — preferred first-line agent",
                        "Verapamil — consider if concomitant hypertension",
                        "Oral diltiazem if haemodynamically stable and able to take orally",
                        "IV diltiazem if symptoms ongoing or severe — requires monitoring and cardiology input",
                        "If non-dihydropyridines contraindicated: use nifedipine or amlodipine",
                      ],
                    },
                    {
                      icon: "avoid",
                      heading: "Contraindications to non-dihydropyridine CCBs",
                      color: "#9b1c1c",
                      bg: "#fef2f2",
                      border: "#fca5a5",
                      items: [
                        "Significant bradycardia",
                        "AV block",
                        "Hypotension",
                        "Severe LV dysfunction",
                        "!!Non-dihydropyridine CCBs are hepatically metabolised — review concomitant medications for interactions before initiating",
                      ],
                    },
                  ],
                },
                {
                  label: "Nitrates & Anticoagulation",
                  color: "#744210",
                  headerBg: "#fffff0",
                  blocks: [
                    {
                      icon: "drug",
                      heading: "Nitrates",
                      color: "#744210",
                      bg: "#fffff0",
                      border: "#f6e05e",
                      items: [
                        "May be used as adjunct in haemodynamically stable patients",
                        "!!Avoid if hypotensive or haemodynamically compromised",
                      ],
                    },
                    {
                      icon: "drug",
                      heading: "Aspirin & anticoagulation",
                      color: "#744210",
                      bg: "#fffff0",
                      border: "#f6e05e",
                      items: [
                        "Consider if concurrent ACS or plaque rupture cannot be excluded clinically",
                        "Decision should be made in conjunction with cardiology",
                      ],
                    },
                  ],
                },
              ],
            },
            {
              heading: "Further Imaging",
              type: "pills",
              note: "Choice of imaging modality should be made in discussion with cardiology, taking into account renal function, procedural risk, and pre-test probability of obstructive disease.",
              items: [
                {
                  label: "CT Coronary Angiography (CTCA)",
                  color: "#744210", bg: "#fffff0", border: "#f6e05e",
                  indication: "Presentation consistent with vasospasm",
                  urgent: "Appropriate when: symptom onset during infusion, transient ECG changes, no significant troponin elevation, full haemodynamic stability throughout",
                  exclusions: [],
                },
                {
                  label: "Invasive Coronary Angiography",
                  color: "#9b1c1c", bg: "#fef2f2", border: "#fca5a5",
                  indication: "Higher-risk or diagnostically uncertain presentation — per consultant cardiology opinion",
                  urgent: null,
                  exclusions: ["Haemodynamic compromise at any point during the episode", "High clinical suspicion of obstructive coronary artery disease", "CTCA non-diagnostic"],
                },
                {
                  label: "Functional Coronary Testing",
                  color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                  indication: "Risk stratification and to guide MDT discussion when re-challenge is being considered",
                  urgent: null,
                  exclusions: [],
                },
              ],
            },
            {
              heading: "Options Following Documented Cardiotoxicity",
              type: "pills",
              note: "Discuss all cases with cardio-oncology MDT before any decision on re-challenge.",
              items: [
                {
                  label: "Switch to non-fluoropyrimidine regimen",
                  color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                  indication: "Preferred option where oncologically appropriate",
                  urgent: "Safest approach — eliminates re-exposure risk",
                  exclusions: [],
                },
                {
                  label: "Switch to Raltitrexed",
                  color: "#744210", bg: "#fffff0", border: "#f6e05e",
                  indication: "Alternative antimetabolite — less cardiotoxic than fluoropyrimidines",
                  urgent: "Reasonable alternative where fluoropyrimidine is felt to be oncologically necessary",
                  exclusions: ["Discuss with oncology team — raltitrexed is not appropriate in all settings"],
                },
                {
                  label: "Re-challenge with Fluoropyrimidine",
                  color: "#9b1c1c", bg: "#fef2f2", border: "#fca5a5",
                  indication: "Only where oncologically essential and after full pre-challenge checklist completed",
                  urgent: null,
                  exclusions: [
                    "!!Never undertake without formal cardio-oncology MDT discussion with decision recorded in notes",
                    "Full recovery from cardiotoxicity episode confirmed — symptom resolution, ECG normalisation, troponin and echo normalisation",
                    "Baseline ECG within 2 weeks of planned re-challenge",
                    "Baseline echo if not done during acute episode or >3 months since acute episode",
                    "Baseline hs-troponin and NT-proBNP",
                    "Prophylactic CCB and/or nitrates commenced at least 48–72 hours before re-challenge",
                    "Full patient counselling regarding recurrence risk including risk of fatal arrhythmia or cardiogenic shock — signed re-challenge consent form",
                  ],
                  notes: [
                    "Re-challenge should ideally be undertaken in a monitored setting with continuous cardiac monitoring",
                    "Bolus 5-FU may be preferred over continuous infusion in selected high cardiac risk patients — only where oncologically appropriate",
                    "Inpatient vs ambulatory monitored re-challenge should be individualised based on prior toxicity severity, comorbidities, and oncological urgency",
                  ],
                },
              ],
            },
          ],
        },          // closes cardio-fluoropyrimidine guideline object
      ],            // closes cardio-oncology guidelines array
    },              // closes cardio-oncology subsite object
    ],
    get guidelines() {
      return this.subsites.flatMap(ss => ss.guidelines || []);
    },
  },
  {
  id: "haematology",
  label: "Haematology",
  color: "#b91c1c",
  accent: "#fff1f1",
  isParent: true,
  icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13z"/>
    </svg>
  ),
  subsites: [
    {
  id: "haem-periop",
  label: "Perioperative VTE",
  guidelines: [
{
  id: "periop-doac",
  title: "Perioperative DOAC Management",
  category: "Perioperative VTE",
  version: "2",
  authors: "Dr G. Swallow (Haematology)",
  evidenceBase: "BSH Peri-Operative Anticoagulation Guidelines 2016 | PAUSE Protocol 2019",
  summary: "Perioperative management of DOACs (rivaroxaban, apixaban, edoxaban, dabigatran) for elective, non-cardiac, non-neurosurgical procedures. Covers pre-op stopping schedules, post-op restart criteria, and VTE/bleeding risk stratification. Bridging anticoagulation is NOT required.",
  tags: ["DOAC", "Perioperative", "Rivaroxaban", "Apixaban", "Edoxaban", "Dabigatran", "Anticoagulation", "Surgery", "VTE", "Bleeding risk"],
  related: ["vte-cat"],
  pdfUrl: null,
  portalUrl: null,
  updated: "Dr G. Swallow / Dr N. Johnstone | Review Dec 2025",
  sections: [
    {
      heading: "Scope & Covered Drugs",
      type: "scope_drugs",
      scope: [
        "Elective, non-cardiac, non-neurosurgical procedures",
        "Adult patients on DOACs requiring interruption for surgery",
        
      ],
      drugs: [
        { name: "Rivaroxaban", brand: "Xarelto®", class: "Direct Xa inhibitor" },
        { name: "Apixaban",    brand: "Eliquis®",  class: "Direct Xa inhibitor" },
        { name: "Edoxaban",    brand: "Lixiana®",  class: "Direct Xa inhibitor" },
        { name: "Dabigatran",  brand: "Pradaxa®",  class: "Direct thrombin inhibitor" },
      ],
      note: "NUH Guideline 2782 v2 | Author: Dr G. Swallow (Haematology) | Evidence: BSH 2016 + PAUSE 2019 | Review: Dec 2025",
    },

    {
      heading: "⚠ When NOT to Use This Guideline",
      type: "alert",
      items: [
        "VTE or stroke within the last 12 weeks — DO NOT follow this guideline. Discuss with Haematologist (VTE) or Stroke Physician (stroke) before any procedure.",
        "Mechanical heart valves — DOACs are NOT licensed for this indication.",
        "Emergency surgery or active bleeding — see NUH 2805 (Xa inhibitors) / 2173 (dabigatran).",
        "Neurosurgical procedures — excluded from scope.",
        "Cardiac surgery or implantable cardiac devices — discuss with cardiology/cardiothoracic team.",
      ],
    },

    {
      heading: "Pre-operative Checklist",
      type: "checklist",
      items: [
        "FBC — if thrombocytopenia present, discuss with haematologist before surgery",
        "U&E within 6 weeks of planned procedure",
        "Calculate formal **Cockcroft-Gault CrCl** (NOT eGFR)an",
        "Identify DOAC indication: non-valvular AF, VTE treatment, or secondary prevention",
        "Assess bleeding risk of the planned procedure (see below)",      
        "Counsel patient regarding individual thrombosis risk during DOAC interruption",
        "Provide written stopping instructions to patient",
        "Bridging anticoagulation is NOT required — DOACs have short half-lives; pre-operative LMWH bridging is not needed",
      ],
    },

    {
      heading: "Minimum Pre-operative Stopping Times",
      type: "table",
      note: "Day of operation: NO DOAC in all cases. Dabigatran is contraindicated if CrCl <30 ml/min; Xa inhibitors contraindicated if CrCl <15 ml/min or dialysis — seek haematology advice.",
      columns: ["DOAC", "Creatinine Clearance", "HIGH Bleeding Risk", "LOW Bleeding Risk"],
      rows: [
        ["Apixaban / Rivaroxaban / Edoxaban", "Any", "48 hours", "24 hours"],
        ["Dabigatran", "≥50 ml/min", "48 hours", "24 hours"],
        ["Dabigatran", "<50 ml/min", "96 hours", "48 hours"],
      ],
    },

    {
      heading: "Post-operative Restart",
      type: "callouts",
      note: "DOACs reach peak concentration within 2–4 hours of restarting — therapeutic anticoagulation is re-established rapidly. Do NOT restart any anticoagulant until a Doctor has assessed the patient as safe to anticoagulate and haemostasis is secure.",
      panels: [
        {
          label: "Minor / LOW Bleeding Risk Surgery",
          color: "#276749",
          headerBg: "#f0fff4",
          blocks: [
            {
              icon: "management",
              heading: "Restart protocol",
              color: "#276749",
              bg: "#f0fff4",
              border: "#9ae6b4",
              items: [
                "Restart DOAC 24 hours post-op at patient's usual dose",
                "If very low bleeding risk: consider restarting at 12 hours post-op",
                "If high VTE risk: single prophylactic enoxaparin 40mg SC given 6–8 hours post-op, then restart DOAC the next day",
              ],
            },
          ],
        },
        {
          label: "Major / HIGH Bleeding Risk Surgery — or Ongoing Bleeding",
          color: "#742a2a",
          headerBg: "#fff5f5",
          blocks: [
            {
              icon: "immediate",
              heading: "Restart protocol",
              color: "#742a2a",
              bg: "#fff5f5",
              border: "#fc8181",
              items: [
                "!!Do NOT restart DOAC until at least 48 hours post-procedure",
                "Once safe to anticoagulate: start prophylactic enoxaparin (weight and renal function appropriate dose)",
                "Assess at 48 hours post-op:",
                "If haemostasis secure and no plans to return to theatre → restart DOAC at usual dose, 12–24 hours after last enoxaparin dose",
                "If ongoing bleeding risk → withhold DOAC, reassess every 24 hours",
              ],
            },
          ],
        },
        {
          label: "All Patients — Post-operative Principles",
          color: "#1a6b8a",
          headerBg: "#e8f4f8",
          blocks: [
            {
              icon: "monitoring",
              heading: "General principles",
              color: "#1a6b8a",
              bg: "#e8f4f8",
              border: "#90cde0",
              items: [
                "If NBM or reduced oral absorption → continue prophylactic enoxaparin until oral route resumes",
                "Check renal function post-op; adjust DOAC dose if CrCl has deteriorated",
                "Check for new drug interactions before restarting DOAC (P-gp and CYP3A4 interactions)",
                "Maintain hydration, mobilisation, and anti-embolic stockings as per standard VTE prophylaxis",
                "!!Do NOT prescribe routine LMWH prophylaxis concurrently with a DOAC",
                "!!Do NOT restart any anticoagulant until a Doctor has assessed the patient as safe to anticoagulate",
              ],
            },
          ],
        },
      ],
    },
  ],
},  
],
},
    {
      id: "haem-vte",
      label: "VTE & Haemostasis",
      guidelines: [
        
          
          {
  id: "vte-cat",
  title: "Cancer-Associated Thrombosis (CAT)",
  category: "VTE & Haemostasis",
  version: "1.0",
  authors: "NUH Non-Malignant Haematology Team",
  evidenceBase: "CLOT Trial | Hokusai-VTE Cancer | SELECT-D | Caravaggio | ISTH Guidelines | NUH Local Guideline",
  summary: "Cancer patients have a 4-fold increased VTE risk but also a 2-fold increased bleeding risk on anticoagulation. LMWH is gold standard for high bleeding risk and GI/urothelial cancers. DOACs are non-inferior alternatives in appropriate patients. Minimum treatment duration 6 months. Incidental VTE should be managed identically to symptomatic VTE.",
  tags: ["VTE", "DVT", "PE", "LMWH", "Enoxaparin", "DOAC", "Apixaban", "Rivaroxaban", "Edoxaban", "Thromboprophylaxis", "CAT"],
  related: [],
  pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=3c6a506878205aadfe70913c5547910f",
  portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10883&query_desc=cancer%20associated%20thrombosis",
  updated: "NUH Non-Malignant Haematology Team",
  sections: [
    {
      heading: "⚠ Key Principles",
      type: "alert",
      items: [
        "Cancer patients have a 4-fold increased VTE risk compared to the general population",
        "Cancer patients also have a 2-fold increased risk of anticoagulant-related bleeding — all decisions must balance both risks individually",
        "Incidental VTE diagnosed on imaging should be managed identically to symptomatic VTE",
      ],
    },
    {
      heading: "Primary Thromboprophylaxis",
      type: "prophylaxis_box",
      panels: [
        {
          label: "Indications",
          color: "red",
          groups: [
            {
              heading: "Cancer surgery",
              items: [
                "LMWH post-op for 7–10 days if low bleeding risk",
                "Extend to 28 days following major abdominal or pelvic cancer surgery if low bleeding risk",
              ],
            },
            {
              heading: "Pancreatic cancer",
              items: [
                "Ambulatory locally advanced or metastatic pancreatic cancer on chemotherapy with low bleeding risk",
              ],
            },
            {
              heading: "High VTE-risk medications",
              items: [
                "Patients on tamoxifen or lenalidomide: risk-assess for primary thromboprophylaxis individually",
              ],
            },
          ],
        },
        {
          label: "Consider Treatment",
          color: "amber",
          groups: [
            {
              heading: "Previous VTE history",
              items: [
                "Consider prophylaxis in active cancer or during cancer treatment",
                "Balance bleeding risk; review regularly, especially towards end of life",
              ],
            },
            {
              heading: "High-risk thrombophilias",
              items: [
                "Antithrombin, protein C or S deficiency: consider alongside other factors",
                "Does not warrant prophylaxis in isolation",
              ],
            },
            {
              heading: "Low-risk thrombophilias",
              items: [
                "Factor V Leiden, prothrombin gene mutation: prophylaxis not required unless personal VTE history",
              ],
            },
            {
              heading: "First-degree family history",
              items: [
                "Unprovoked proximal DVT or PE in a first-degree relative carries higher risk",
                "Individual decision required based on full clinical context",
              ],
            },
            {
              heading: "Other VTE risk factors",
              items: [
                "BMI, smoking, and other general risk factors may inform assessment",
                "Not an indication for prophylaxis on their own",
                "Review decision regularly throughout treatment, especially if end-of-life care plan is established",
              ],
            },
          ],
        },
        {
          label: "Not Recommended",
          color: "green",
          groups: [
            {
              heading: "Routine prophylaxis not indicated in",
              items: [
                "All ambulatory outpatients on systemic anticancer therapy",
                "Locally advanced or metastatic lung cancer",
                "Patients with central venous access devices (CVAD) — not routinely indicated",
                "Patients with high bleeding risk",
              ],
            },
          ],
        },
      ],
    },,
    {
      heading: "Treatment — Drug Choice",
      type: "callouts",
      panels: [
        
        {
          label: "Use LMWH (Enoxaparin) preferentially",
          color: "#742a2a",
          headerBg: "#fff5f5",
          blocks: [
            {
              icon: "immediate",
              heading: "Prefer LMWH when",
              color: "#742a2a",
              bg: "#fff5f5",
              border: "#fc8181",
              items: [
                "High bleeding risk",
                "Luminal GI cancer with intact primary",
                "Genitourinary, bladder or nephrostomy-tube tumours",
                "Active GI mucosal abnormality (duodenal ulcer, gastritis, oesophagitis, colitis)",
                "Body weight <50kg or >200kg",
                "Renal impairment (CrCl <30 ml/min)",
                "Concerns about oral intake or absorption",
                "Significant DOAC–SACT drug interaction",
                "Patient preference for LMWH",
              ],
            },
            {
              icon: "drug",
              heading: "NUH community/nurse-led DVT pathway",
              color: "#742a2a",
              bg: "#fff5f5",
              border: "#fc8181",
              items: [
                "Patients with active malignancy diagnosed via community DVT pathway will be started on LMWH pending oncology review",
                "!!Review DOAC suitability in oncology clinic — seek haematology advice if needed",
              ],
            },
          ],
        },
        {
          label: "DOAC reasonable alternative",
          color: "#276749",
          headerBg: "#f0fff4",
          blocks: [
            {
              icon: "management",
              heading: "DOAC Indications",
              color: "#276749",
              bg: "#f0fff4",
              border: "#9ae6b4",
              items: [
                "No high-risk GI or urothelial cancer",
                "No significant DOAC–SACT drug interaction",
                "No other contraindication to DOAC",
                "ECOG PS 0–2",
                "Adequate renal function (CrCl ≥30 ml/min)",
                "Patient preference for oral therapy",
                "Check interactions: EHRA tool or cancer-druginteractions.org",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "vte_drug_choice",
    },
    {
      heading: "Treatment — Duration of Anticoagulation",
      type: "list",
      groups: [
        {
          icon: "immediate",
          label: "Minimum 6 months for all cancer-associated VTE",
          items: [
            "All patients should receive anticoagulation for a minimum of 6 months",
            "Evidence base is robust for the initial 6-month period",
            "Evidence beyond 6 months is less robust",
          ],
        },
        {
          icon: "management",
          label: "Stop at 6 months if ALL of the following are true",
          items: [
            "No evidence of active cancer",
            "Not receiving any treatment with associated VTE risk (e.g. tamoxifen)",
          ],
        },
        {
          icon: "monitoring",
          label: "Continue beyond 6 months until one of the following",
          items: [
            "No longer evidence of active cancer",
            "No longer receiving treatment with associated VTE risk",
            "Bleeding risk deemed too high to continue anticoagulation",
            "If continuing beyond 6 months, consider switching to Apixaban 2.5mg BD if the sole indication is tamoxifen therapy — discuss with haematology on an individual basis if required",
          ],
        },
      ],
    },
  ],
},
{
  id: "vte-recurrence",
  title: "Recurrent VTE on Anticoagulation",
  category: "VTE & Haemostasis",
  version: "1.0",
  authors: "NUH Non-Malignant Haematology Team",
  evidenceBase: "ISTH Guidelines | NUH Local Guideline",
  summary: "4–9% of cancer patients on anticoagulation develop recurrent VTE, more commonly in advanced cancer. Before escalating therapy, always review adherence and correct dosing. No routine role for anti-Xa monitoring. Management differs depending on whether recurrence occurred on LMWH or a DOAC.",
  tags: ["Recurrent VTE", "DVT", "PE", "LMWH", "DOAC", "Anticoagulation failure", "Anti-Xa"],
  related: ["vte-cat"],
  pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=3c6a506878205aadfe70913c5547910f",
  portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10883&query_desc=cancer%20associated%20thrombosis#",
  updated: "NUH Non-Malignant Haematology Team",
  sections: [
  ,
    {
      heading: "Management by Current Anticoagulant",
      type: "callouts",
      panels: [
        {
          label: "Recurrent VTE on LMWH",
          color: "#1a6b8a",
          headerBg: "#e8f4f8",
          blocks: [
            {
              icon: "investigations",
              heading: "Step 1 — Check adherence",
              color: "#1a6b8a",
              bg: "#e8f4f8",
              border: "#90cde0",
              items: [
                "Review whether the patient has been taking LMWH correctly and consistently",
                "Assess for practical barriers: injection technique, storage, carer support",
              ],
            },
            {
              icon: "management",
              heading: "Good compliance",
              color: "#1a6b8a",
              bg: "#e8f4f8",
              border: "#90cde0",
              items: [
                "Increase LMWH dose by 25%",
                "Alternatively, switch to a DOAC if appropriate — see Drug Choice guideline (section 3.1)",
              ],
            },
            {
              icon: "drug",
              heading: "Poor compliance — investigate why",
              color: "#1a6b8a",
              bg: "#e8f4f8",
              border: "#90cde0",
              items: [
                "Identify and address the reason for non-adherence before changing therapy",
                "Continue LMWH with additional support (e.g. district nurse, carer input)",
                "Switch to a DOAC if improved compliance is likely with oral therapy",
              ],
            },
          ],
        },
        {
          label: "Recurrent VTE on DOAC",
          color: "#744210",
          headerBg: "#fffff0",
          blocks: [
            {
              icon: "investigations",
              heading: "Step 1 — Check adherence",
              color: "#744210",
              bg: "#fffff0",
              border: "#f6e05e",
              items: [
                "Review whether the patient has been taking the DOAC correctly and consistently",
                "!!Rivaroxaban must be taken with food — confirm this is happening",
                "Check for drug interactions between the DOAC and current anti-cancer or regular medications",
              ],
            },
            {
              icon: "management",
              heading: "Good compliance",
              color: "#744210",
              bg: "#fffff0",
              border: "#f6e05e",
              items: [
                "Switch to LMWH",
                "Consider haematology advice if recurrence is confirmed despite verified adherence",
              ],
            },
            {
              icon: "drug",
              heading: "Poor compliance — investigate why",
              color: "#744210",
              bg: "#fffff0",
              border: "#f6e05e",
              items: [
                "Identify and address the reason for non-adherence",
                "If oral route is a barrier: switch to LMWH",
                "If oral adherence can be improved: continue DOAC with support",
              ],
            },
          ],
        },
      ],
    },
  ],
},
{
  id: "vte-thrombocytopenia",
  title: "VTE & Thrombocytopenia",
  category: "VTE & Haemostasis",
  version: "1.0",
  authors: "NUH Non-Malignant Haematology Team",
  evidenceBase: "ISTH Guidelines | NUH Local Guideline",
  summary: "Cancer-associated VTE with thrombocytopenia requires careful balancing of bleeding and thrombotic risk. Despite increased bleeding risk, recurrent VTE risk is also increased 4-fold. The first 30 days post-VTE carries the highest recurrence risk. DOACs should be avoided — LMWH is preferred. Patients with platelets ≥50×10⁹/L can receive full-dose anticoagulation without transfusion. Those with platelets <50×10⁹/L require management guided by thrombus progression risk and platelet count.",
  tags: ["Thrombocytopenia", "VTE", "LMWH", "Platelet transfusion", "Anticoagulation", "Bleeding risk"],
  related: ["vte-cat"],
  pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=3c6a506878205aadfe70913c5547910f",
  portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10883&query_desc=cancer%20associated%20thrombosis",
  updated: "NUH Non-Malignant Haematology Team",
  sections: [
    {
      heading: "⚠ Key Principles",
      type: "alert",
      items: [
        "Despite increased bleeding risk, recurrent VTE risk is also increased 4-fold in patients with both cancer-associated VTE and thrombocytopenia",
        "The first 30 days following acute VTE is the highest risk period for recurrence — this must be factored into all decisions",
        "There is insufficient data for DOACs in thrombocytopenia — DOACs have increased bleeding risk compared to LMWH in this setting",
        "Patients with platelets ≥50×10⁹/L can be treated with full-dose anticoagulation without platelet transfusions",
        "Patients with platelets <50×10⁹/L require the pathway below — discuss with haematology",
      ],
    },
    {
      heading: "Risk Stratification — Thrombus Progression",
      type: "callouts",
      panels: [
        {
          label: "High risk of thrombus progression",
          color: "#742a2a",
          headerBg: "#fff5f5",
          blocks: [
            {
              icon: "immediate",
              heading: "Features suggesting high risk",
              color: "#742a2a",
              bg: "#fff5f5",
              border: "#fc8181",
              items: [
                "Symptomatic central or segmental PE",
                "Proximal DVT",
                "History of recurrent or progressive VTE",
              ],
            },
          ],
        },
        {
          label: "Low risk of thrombus progression",
          color: "#276749",
          headerBg: "#f0fff4",
          blocks: [
            {
              icon: "management",
              heading: "Features suggesting low risk",
              color: "#276749",
              bg: "#f0fff4",
              border: "#9ae6b4",
              items: [
                "Incidental subsegmental PE",
                "Distal DVT",
                "Catheter-related thrombosis",
              ],
            },
          ],
        },
        
      ],
    },
    {
      heading: "Acute VTE — First 30 Days (Platelets <50×10⁹/L)",
      type: "table",
      note: "Discuss all cases with haematology before initiating anticoagulation in this setting.",
      columns: ["", "Platelets 25–50×10⁹/L", "Platelets <25×10⁹/L"],
      rows: [
        [
          "🔴 High risk of thrombus progression",
          "Full treatment dose LMWH + platelet transfusion support. Aim to maintain platelets >40×10⁹/L.",
          "Full treatment dose LMWH + platelet transfusion support. Aim to maintain platelets >40×10⁹/L.",
        ],
        [
          "🟢 Low risk of thrombus progression",
          "Give either: 50% of treatment dose LMWH, or prophylactic dose LMWH",
          "Temporarily stop anticoagulation. Restart when platelets recover to ≥25×10⁹/L.",
        ],
      ],
    },
    {
      heading: "Subacute (>30 days) or Chronic VTE (Platelets <50×10⁹/L)",
      type: "table",
      columns: ["", "Platelets 25–50×10⁹/L", "Platelets <25×10⁹/L"],
      rows: [
        [
          "🔴 High risk of thrombus progression",
          "50% of treatment dose LMWH, or prophylactic dose LMWH",
          "Temporarily stop anticoagulation. Restart when platelets recover to ≥25×10⁹/L.",
        ],
        [
          "🟢 Low risk of thrombus progression",
          "50% of treatment dose LMWH, or prophylactic dose LMWH",
          "Temporarily stop anticoagulation. Restart when platelets recover to ≥25×10⁹/L.",
        ],
      ],
    },
  ],
},
{
  id: "vte-crt",
  title: "Catheter-Related Thrombosis (CRT)",
  category: "VTE & Haemostasis",
  version: "1.0",
  authors: "NUH Non-Malignant Haematology Team",
  evidenceBase: "ISTH Guidelines | NUH Local Guideline",
  summary: "Symptomatic CRT occurs in ~3% of patients with CVADs. PE complicates up to 10–15% of cases. Treatment is individualised based on CVAD function and ongoing need. Minimum anticoagulation duration is 3 months, extended if the catheter remains in situ. Line removal is not routinely required if the CVAD is well-positioned, uninfected, and functioning.",
  tags: ["CRT", "Catheter", "CVAD", "PICC", "Hickman", "DVT", "Anticoagulation", "SVC syndrome", "Thrombolysis"],
  related: ["vte-cat"],
  pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=3c6a506878205aadfe70913c5547910f",
  portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10883&query_desc=cancer%20associated%20thrombosis",
  updated: "NUH Non-Malignant Haematology Team",
  sections: [
    {
      heading: "⚠ Key Principles",
      type: "alert",
      items: [
        "Symptomatic CRT occurs in ~3% of patients with CVADs — PE complicates up to 10–15% of cases and loss of venous access occurs in ~10%",
        "PICC lines carry a higher risk of CRT than Hickman lines or ports",
        "Lowest CRT risk: right-sided insertion, jugular vein, distal tip at SVC–right atrial junction (not within the right atrium)",
        "Treatment should be individualised — consider whether the CVAD is functioning and whether it is still needed for future treatment",
        "If evidence of SVC syndrome related to CRT: consider thrombolysis if appropriate",
      ],
    },
    {
      heading: "Device Risk by CVAD Type",
      type: "table",
      columns: ["Device", "Relative CRT Risk", "Notes"],
      rows: [
        ["PICC line", "Highest", "Higher CRT risk than Hickman or port"],
        ["Hickman line", "Moderate", "Lower risk than PICC"],
        ["Port", "Lowest", "Preferred for long-term access where feasible"],
      ],
    },
    {
      heading: "Tip Position & Insertion Side",
      type: "callouts",
      panels: [
        {
          label: "Factors that increase CRT risk",
          color: "#742a2a",
          headerBg: "#fff5f5",
          blocks: [
            {
              icon: "immediate",
              heading: "Avoid where possible",
              color: "#742a2a",
              bg: "#fff5f5",
              border: "#fc8181",
              items: [
                "Left-sided insertion — right-sided carries lower CRT risk",
                "Tip placement within the right atrium — tip should sit at the SVC–right atrial junction, not inside the right atrium",
              ],
            },
          ],
        },
      ],
    },
    
    {
      heading: "Treatment",
      type: "list",
      groups: [
        {
          icon: "drug",
          label: "Anticoagulation",
          items: [
            "Both LMWH and DOACs are options for treatment of CRT",
            "Choice should follow the same principles as cancer-associated VTE — see Drug Choice guideline",
            "Minimum duration: 3 months",
            "If the CVAD remains in situ: continue anticoagulation for as long as the catheter is in place",
          ],
        },
        {
          icon: "management",
          label: "CVAD management — when to keep the line",
          items: [
            "If the CVAD is well-positioned, not infected, and functioning: no need to remove",
            "Continue anticoagulation and monitor for symptom resolution",
          ],
        },
        {
          icon: "immediate",
          label: "CVAD management — when to remove the line",
          items: [
            "If symptoms persist after 4 weeks of anticoagulation: remove the CVAD",
            "!!Continue anticoagulation for a minimum of 3 months even after CVAD removal",
          ],
        },
        {
          icon: "referral",
          label: "SVC syndrome",
          items: [
            "If CRT causes SVC syndrome: consider thrombolysis if clinically appropriate",
            "!!Discuss urgently with haematology and the treating oncology team",
          ],
        },
      ],
    },
  ],
},
      ],
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
    contactInfo: {
  heading: "NUH Palliative Care",
  variant: "danger",
  lines: [
    "Seek advice from senior colleagues or the palliative care team if needed.",
    "Mon–Sun 08:00–16:00: QMC ☎ 88402 | City ☎ 74977",
    "Out of hours: Palliative consultant advice line ☎ 07595 285014",
  ],
},
    subsites: [
      {
  id: "pall-info",
  label: "NUH Palliative Care",
  guidelines: [
    {
      id: "pall-contacts",
      title: "Contact Information",
      category: "NUH Palliative Care",
      authors: "NUH Palliative Care Team",
      evidenceBase: "NUH Palliative Care Service",
      summary: "Contact information and referral pathways for the NUH Palliative Care Team.",
      tags: ["Contact", "Referral", "Palliative care team", "Out of hours"],
      related: [],
      updated: "Current",
      sections: [
        {
          heading: "Contact Information",
          type: "alert",
          variant: "danger",
          items: [
            "**Seek advice from senior colleagues or the palliative care team if needed**",
            "**Mon–Sun 08:00–16:00:** QMC ☎ 88402 | City ☎ 74977",
            "**Out of hours:** Palliative consultant advice line ☎ 07595 285014",
          ],
        },
      ],
    },
  ],
},
      {
        id: "pall-symptom",
        label: "Symptom Control",
        guidelines: [
          {
            id: "pall-pain",
            title: "Cancer Pain Management",
            category: "Symptom Control",
            authors: "Nottingham APC Palliative Care Pocketbook",
            evidenceBase: "Notts APC Palliative Care Pocketbook | PCF6 | WHO Analgesic Ladder",
            summary: "WHO analgesic ladder applied by the clock, by the mouth, by the ladder. Opioid titration from weak to strong opioids, breakthrough dosing (1/10–1/6 of 24h dose), opioid rotation principles, adjuvant analgesics, and transdermal patch management.",
            summaryCalcLink: { calcId: "opioid-converter", label: "Opioid Equianalgesic Converter", text: "For dose conversions between opioids, SC routes, and transdermal patches" },
            tags: ["WHO Ladder", "Morphine", "Oxycodone", "Fentanyl patch", "Breakthrough", "Opioid rotation", "Adjuvants", "CSCI"],
            related: ["pall-syringe", "pall-bone-pain", "pall-neuropathic", "pall-opioid-conversion", "pall-renal"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=e94963b0748b3e70052c1db1954a3c43",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10627",
            updated: "Current edition",
            sections: [

        {
          heading: "Contact Information",
          type: "alert",
          variant: "danger",
          items: [
            "**Seek advice from senior colleagues or the palliative care team if needed**",
            "**Mon–Sun 08:00–16:00:** QMC ☎ 88402 | City ☎ 74977",
            "**Out of hours:** Palliative consultant advice line ☎ 07595 285014",
          ],
        },
              {
                heading: "Key Principles — WHO Analgesic Ladder",
                type: "pall_groups",
                groups: [
                  {
                    label: "By the clock. By the mouth. By the ladder.",
                    items: [
                      "Give analgesia REGULARLY — not just PRN",
                      "Oral route preferred wherever possible",
                      "Accurate pain diagnosis before prescribing — treat correctable causes",
                      "Explain treatment options; set realistic goals with patient and carers",
                      "Reassess regularly after every change",
                      "For patients in the last 48h of life: refer to Last Days of Life / Anticipatory Prescribing guidelines",
                      "!!bot:Refer to specialist palliative care if pain not progressively relieved. Hayward House: 0115 9627619 | Advice line (Mon–Fri 9–5): 0115 9934934",
                    ],
                  },
                ],
              },
              {
                heading: "🧮 Opioid Equianalgesic Converter",
                type: "calc_link",
                calcId: "opioid-converter",
                description: "Calculate morphine equivalents, SC conversions, fentanyl/buprenorphine patch doses, and breakthrough doses interactively.",
              },
              {
                heading: "Starting Strong Opioids — Morphine",
                type: "pall_groups",
                note: "Morphine is the strong opioid of first choice.",
                groups: [
                  {
                    label: "Starting dose",
                    items: [
                      "Opioid-naive: IR morphine 2.5–5mg PO 4-hourly + PRN  OR  MR morphine 10–15mg PO 12-hourly",
                      "Converting from max weak opioid (e.g. codeine 240mg/24h): start morphine 24mg/24h PO",
                      "Elderly / frail / renal impairment: start 1.25–2.5mg — seek advice in moderate–severe renal impairment",
                    ],
                  },
                  {
                    label: "Titration",
                    items: [
                      "Increase by no more than 33–50% every 24h",
                      "IR preparations: can review every 1–2 days",
                      "MR preparations: review every 2–3 days",
                      "Account for PRN use when calculating new regular dose",
                    ],
                  },
                  {
                    label: "Breakthrough dose",
                    items: [
                      "Breakthrough = 1/10 to 1/6 of total 24h opioid dose",
                      "Give every 2–4h PRN (up to 1-hourly in severe pain or last days of life)",
                      "!!≥2 PRN doses in 24h → review and increase regular dose",
                    ],
                  },
                  {
                    label: "Side effect prophylaxis — prescribe from day one",
                    items: [
                      "Nausea (50% of patients): metoclopramide 10mg TDS PRN for first week — regularly if prior nausea with weak opioid",
                      "Constipation: regular laxatives (e.g. senna) from the outset — do not wait",
                    ],
                  },
                ],
              },
              {
                heading: "Alternative Strong Opioids & Rotation",
                type: "pall_groups",
                groups: [
                  {
                    label: "When to switch from morphine",
                    items: [
                      "Unacceptable adverse effects with morphine (e.g. delirium, myoclonus, hallucinations)",
                      "Options: oxycodone PO/SC, transdermal fentanyl, transdermal buprenorphine, alfentanil SC (renal failure)",
                      "Each has advantages and disadvantages — seek specialist palliative care guidance",
                    ],
                  },
                  {
                    label: "Dose reduction on switching (incomplete cross-tolerance)",
                    items: [
                      "Reduce equianalgesic dose by 25–50% when switching",
                      "Use PRN doses to cover deficit while titrating new opioid",
                      "Use Opioid Equianalgesic Converter for calculations",
                      "!!Reduce by 50% if: morphine ≥1g/24h equivalent, elderly/frail, intolerable side effects (e.g. delirium), or after rapid dose escalation",
                    ],
                  },
                ],
              },
              {
                heading: "Fentanyl & Buprenorphine Patches",
                type: "pall_groups",
                groups: [
                  {
                    label: "Before prescribing",
                    items: [
                      "Use conversion tables in Opioid Equianalgesic Converter",
                      "Patients on patches still require PRN medication for breakthrough pain",
                      "!!Contraindicated for acute pain requiring rapid titration — effect takes >12h to establish",
                    ],
                  },
                  {
                    label: "Managing patches in the terminal phase",
                    items: [
                      "Continue patch — replace with new one when due",
                      "Give SC morphine/diamorphine PRN for breakthrough pain",
                      "!!bot:≥2 PRN doses in 24h → start CSCI using sum of breakthrough doses from preceding 24h (max 50% of existing regular opioid dose)",
                    ],
                  },
                ],
              },
              {
                heading: "Adjuvant Analgesics",
                type: "pall_groups",
                note: "Consider adding an NSAID before adjuvants if not contraindicated — cancer pain typically has an inflammatory component.",
                groups: [
                  {
                    label: "By pain type",
                    items: [
                      "Neuropathic: gabapentin, pregabalin, amitriptyline, duloxetine, corticosteroids",
                      "Skeletal muscle cramp: benzodiazepines",
                      "Smooth muscle spasm / colic: antimuscarinics, GTN, calcium channel blockers",
                      "Raised intracranial pressure: dexamethasone",
                      "Bone pain: bisphosphonates (zoledronic acid), denosumab",
                    ],
                  },
                  {
                    label: "Non-pharmacological measures",
                    items: [
                      "Radiotherapy — particularly effective for bone pain",
                      "Nerve blockade — for localised or neuropathic pain refractory to systemic treatment",
                      "TENS, heat/cold, relaxation, distraction",
                      "Address psychological, social, and spiritual dimensions of total pain",
                    ],
                  },
                ],
              },
            ],
          },          {
            id: "pall-breathlessness",
            title: "Breathlessness",
            category: "Symptom Control",
            authors: "NUH Palliative Care",
            evidenceBase: "NUH04453S | Revised April 2025 | Review April 2028",
            summary: "Non-pharmacological measures first (fan, repositioning, reassurance). Step 1: SC morphine PRN ± midazolam PRN for anxiety. Step 2: start CSCI if ≥2 PRN doses effective in 24h. Step 3: increase CSCI by previous 24h PRN doses (max 50% increase). If eGFR <30: see renal opioid guidelines.",
            tags: ["Morphine", "Midazolam", "CSCI", "Dyspnoea", "Opioids", "Breathlessness", "Palliative"],
            related: ["pall-syringe", "pall-anxiety", "pall-secretions", "pall-renal"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=e94963b0748b3e70052c1db1954a3c43",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10627",
            updated: "April 2025",
            sections: [

        {
          heading: "Contact Information",
          type: "alert",
          variant: "danger",
          items: [
            "**Seek advice from senior colleagues or the palliative care team if needed**",
            "**Mon–Sun 08:00–16:00:** QMC ☎ 88402 | City ☎ 74977",
            "**Out of hours:** Palliative consultant advice line ☎ 07595 285014",
          ],
        },
              {
                heading: "Non-Drug Management — Always Do These First",
                type: "pall_groups",
                groups: [
                  {
                    label: "Measures that can relieve breathlessness without medication",
                    items: [
                      "Explanation and reassurance — address anxiety around breathlessness",
                      "Repositioning — sitting upright or leaning forward",
                      "Electric fan or cool draught of air directed at the face",
                      "Relaxation and breathing techniques",
                      "!!If eGFR <30ml/min/1·73m² — refer to Renal Impairment & Opioids guideline before prescribing",
                    ],
                  },
                ],
              },
              {
                heading: "Step 1 — PRN Only",
                type: "pall_groups",
                note: "Start here. Escalate to Step 2 if ≥2 PRN doses are needed and effective in 24 hours.",
                groups: [
                  {
                    label: "Patient NOT on regular strong opioids",
                    items: [
                      "Morphine 2·5–5mg SC 1-hourly PRN for breathlessness",
                      "Midazolam 2·5–5mg SC 1-hourly PRN for anxiety/distress",
                    ],
                  },
                  {
                    label: "Patient on regular oral morphine",
                    items: [
                      "Morphine SC PRN dose = total 24h oral morphine (regular + PRN) converted to SC ÷ 6",
                      "Midazolam 2·5–5mg SC 1-hourly PRN for anxiety/distress",
                      "!!Seek advice if patient is on oxycodone, fentanyl, buprenorphine, opioid combinations, or opioid via other routes",
                    ],
                  },
                  {
                    label: "Trigger for Step 2",
                    items: [
                      "!!≥2 PRN doses of morphine ±midazolam effective in 24 hours → start CSCI (Step 2)",
                    ],
                  },
                ],
              },
              {
                heading: "Step 2 — Start CSCI",
                type: "pall_groups",
                note: "Triggered when ≥2 PRN doses effective in 24h. Round all doses to a convenient number.",
                groups: [
                  {
                    label: "Starting the syringe driver",
                    items: [
                      "Morphine CSCI dose = total 24h morphine (regular + PRN) converted to SC",
                      "Add midazolam 10mg to the CSCI",
                      "Start CSCI 2 hours before next oral opioid is due — or immediately if a dose has been missed, or if not on regular morphine",
                      "Discontinue regular oral opioid once CSCI started",
                    ],
                  },
                  {
                    label: "Update PRN doses alongside CSCI",
                    items: [
                      "Update morphine SC 1-hourly PRN = morphine CSCI dose ÷ 6 to 10",
                      "Midazolam 2·5–5mg SC 1-hourly PRN for anxiety/distress — continue",
                    ],
                  },
                  {
                    label: "Trigger for Step 3",
                    items: [
                      "!!≥2 PRN doses of morphine ±midazolam effective in 24 hours → increase CSCI (Step 3)",
                    ],
                  },
                ],
              },
              {
                heading: "Step 3 — Increase CSCI",
                type: "pall_groups",
                note: "Review 24-hourly. Maximum CSCI dose increase is 50% of previous CSCI doses.",
                groups: [
                  {
                    label: "Calculating the new CSCI doses",
                    items: [
                      "New morphine CSCI = previous morphine CSCI + previous 24h morphine PRN doses (converted to SC)",
                      "New midazolam CSCI = previous midazolam CSCI + previous 24h midazolam PRN doses",
                      "!!Maximum single increase = 50% of previous CSCI dose — do not exceed this",
                      "Round to a convenient dose",
                    ],
                  },
                  {
                    label: "Update PRN doses",
                    items: [
                      "Update morphine SC 1-hourly PRN = new morphine CSCI ÷ 6",
                      "Review midazolam PRN dose and increase if appropriate",
                      "!!If ≥2 PRN doses effective in next 24h → repeat Step 3",
                    ],
                  },
                ],
              },
              {
                heading: "Worked Example — Titrating CSCI & PRN Doses",
                type: "pall_groups",
                groups: [
                  {
                    label: "Scenario: patient on morphine 30mg + midazolam 10mg CSCI, used 2 × morphine 5mg PRN and 2 × midazolam 2·5mg PRN in last 24h",
                    items: [
                      "Total SC morphine in 24h = 30mg + (2 × 5mg) = 40mg",
                      "Total SC midazolam in 24h = 10mg + (2 × 2·5mg) = 15mg",
                      "New 24h CSCI = morphine 40mg + midazolam 15mg",
                      "New morphine PRN = 40mg ÷ 6 = 6·667mg → use range 5–7·5mg SC 1-hourly",
                      "New midazolam PRN = 2·5–5mg SC (unchanged)",
                    ],
                  },
                ],
              },
              {
                heading: "Also Consider",
                type: "pall_groups",
                groups: [
                  {
                    label: "Additional treatments depending on cause",
                    items: [
                      "Furosemide 20–40mg SC/IV 2-hourly PRN for pulmonary oedema (max 20mg single SC injection — beware urinary retention)",
                      "Hyoscine butylbromide for respiratory tract secretions — see Respiratory Tract Secretions guideline",
                      "Bronchodilator for bronchospasm",
                      "Oxygen therapy if appropriate (comfort, symptomatic relief)",
                      "!!bot:For advice if patient not tolerating current opioid or symptoms persist: contact hospital palliative care team or out-of-hours consultant advice line",
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "pall-secretions",
            title: "Respiratory Tract Secretions",
            category: "Symptom Control",
            authors: "NUH Palliative Care",
            evidenceBase: "NUH04453S | Revised April 2025 | Review April 2028",
            summary: "Noisy breathing from pooled secretions the patient can no longer clear. Avoid fluid overload. Reposition first. Hyoscine butylbromide SC PRN (Step 1), then CSCI if secretions present or develop (Step 2: 20–60mg/24h), increasing to 60–120mg/24h if ≥2 PRN doses effective (Step 3).",
            tags: ["Hyoscine butylbromide", "Buscopan", "Secretions", "Death rattle", "CSCI", "End of life"],
            related: ["pall-breathlessness", "pall-syringe", "pall-nausea"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=e94963b0748b3e70052c1db1954a3c43",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10627",
            updated: "April 2025",
            sections: [

        {
          heading: "Contact Information",
          type: "alert",
          variant: "danger",
          items: [
            "**Seek advice from senior colleagues or the palliative care team if needed**",
            "**Mon–Sun 08:00–16:00:** QMC ☎ 88402 | City ☎ 74977",
            "**Out of hours:** Palliative consultant advice line ☎ 07595 285014",
          ],
        },
              {
                heading: "Key Principles",
                type: "pall_groups",
                groups: [
                  {
                    label: "Before reaching for medication",
                    items: [
                      "Reduce risk of secretions by avoiding fluid overload — review any assisted hydration or nutrition (IV/SC fluids, feeding) if symptoms develop",
                      "Reposition the patient — can sometimes alleviate symptoms without medication",
                      "!!It is essential to explain to family/carers that noisy breathing is due to secretions in the airways and throat that the patient can no longer clear by coughing or swallowing — it does not mean the patient is distressed or suffocating",
                    ],
                  },
                ],
              },
              {
                heading: "Step 1 — Secretions Absent: Prescribe PRN",
                type: "pall_groups",
                groups: [
                  {
                    label: "Prescribe anticipatory medication in case secretions develop",
                    items: [
                      "Hyoscine butylbromide 20mg SC 1-hourly PRN",
                    ],
                  },
                  {
                    label: "Trigger for Step 2",
                    items: [
                      "!!Secretions present or develop → move to Step 2 (CSCI)",
                    ],
                  },
                ],
              },
              {
                heading: "Step 2 — Secretions Present: Start CSCI",
                type: "pall_groups",
                groups: [
                  {
                    label: "Start syringe driver",
                    items: [
                      "Hyoscine butylbromide 20–60mg/24h CSCI",
                      "Hyoscine butylbromide 20mg SC 1-hourly PRN (continue alongside)",
                      "Review 24-hourly",
                    ],
                  },
                  {
                    label: "Trigger for Step 3",
                    items: [
                      "!!≥2 PRN doses effective in 24h → increase CSCI (Step 3)",
                    ],
                  },
                ],
              },
              {
                heading: "Step 3 — Increase CSCI",
                type: "pall_groups",
                groups: [
                  {
                    label: "Escalate dose",
                    items: [
                      "Hyoscine butylbromide 60–120mg/24h CSCI",
                      "Hyoscine butylbromide 20mg SC 1-hourly PRN (continue)",
                      "Review 24-hourly",
                      "!!bot:If symptoms persist at Step 3: contact hospital palliative care team or out-of-hours consultant advice line",
                    ],
                  },
                ],
              },
              {
                heading: "Associated Respiratory Symptoms",
                type: "pall_groups",
                groups: [
                  {
                    label: "Respiratory tract infection",
                    items: [
                      "!!Generally not appropriate to prescribe antibacterials in an imminently dying patient",
                      "Review any current antibacterial treatment — consider stopping if no longer aligned with goals of care",
                    ],
                  },
                  {
                    label: "Pulmonary oedema",
                    items: [
                      "Furosemide 20–40mg SC/IV 2-hourly PRN",
                      "Maximum 20mg as a single SC injection",
                      "!!Beware of precipitating urinary retention",
                    ],
                  },
                  {
                    label: "Gastric reflux",
                    items: [
                      "Metoclopramide 10mg SC/IV 2-hourly PRN (max 30mg/24h)",
                      "!!Antimuscarinics (e.g. hyoscine butylbromide) block the prokinetic effect of metoclopramide — avoid concurrent use if possible",
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "pall-nausea",
            title: "Nausea & Vomiting",
            category: "Symptom Control",
            authors: "Nottingham APC Palliative Care Pocketbook",
            evidenceBase: "Notts APC Palliative Care Pocketbook | PCF6",
            summary: "Cause-directed antiemetic selection — identify the underlying cause first. Step 1: target the cause with prokinetics (gastric stasis), haloperidol (chemical), or cyclizine (raised ICP/motion). Step 2: if not controlled, escalate to broad-spectrum levomepromazine. Correct reversible causes where appropriate.",
            tags: ["Antiemetics", "Metoclopramide", "Haloperidol", "Cyclizine", "Levomepromazine", "Domperidone", "CSCI", "Gastric stasis", "Hypercalcaemia"],
            related: ["pall-syringe", "pall-bowel", "pall-pain"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=e94963b0748b3e70052c1db1954a3c43",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10627",
            updated: "Current edition",
            sections: [

        {
          heading: "Contact Information",
          type: "alert",
          variant: "danger",
          items: [
            "**Seek advice from senior colleagues or the palliative care team if needed**",
            "**Mon–Sun 08:00–16:00:** QMC ☎ 88402 | City ☎ 74977",
            "**Out of hours:** Palliative consultant advice line ☎ 07595 285014",
          ],
        },
              {
                heading: "Key Principles",
                type: "pall_groups",
                groups: [
                  {
                    label: "Identify the cause before selecting antiemetic",
                    items: [
                      "Choice of antiemetic varies with the underlying cause — do not prescribe empirically without attempting to identify cause",
                      "Consider bloods if biochemical derangement suspected (calcium, renal function)",
                      "Correct reversible causes: new medicines, severe pain, cough, infection, hypercalcaemia, renal failure",
                      "Prescribe the most appropriate antiemetic regularly AND PRN",
                      "If already on effective oral antiemetic: can be prescribed subcutaneously instead when required",
                      "!!bot:Treatment of hypercalcaemia and infection may not be appropriate in a dying patient — consider goals of care before investigating",
                    ],
                  },
                ],
              },
              {
                heading: "Step 1 — Target the Cause",
                type: "pall_groups",
                note: "Use the most specific antiemetic for the identified cause before escalating to broad-spectrum.",
                groups: [
                  {
                    label: "Gastric stasis / gastroparesis / functional bowel obstruction (peristaltic failure) — use prokinetics",
                    items: [
                      "Metoclopramide PO 10mg TDS–QDS  OR  CSCI 30–40mg/24h + 10mg SC PRN",
                      "Usual maximum dose: 100mg/24h",
                      "Domperidone PO 10mg BD–TDS (alternative — less central side effects)",
                      "!!Do NOT use prokinetics if mechanical bowel obstruction suspected — see Bowel Obstruction guideline",
                    ],
                  },
                  {
                    label: "Chemical causes — opioids, hypercalcaemia, renal failure — use dopamine antagonists",
                    items: [
                      "Metoclopramide as above",
                      "Haloperidol 0.5–1.0mg nocte + PRN  OR  SC/CSCI 2.5–5mg/24h + 1mg SC PRN",
                      "Usual maximum dose: 10mg/24h",
                    ],
                  },
                  {
                    label: "Raised intracranial pressure / motion sickness — use cyclizine",
                    items: [
                      "Cyclizine PO 50mg BD–TDS + 50mg PRN  OR  CSCI 75–150mg/24h + 25–50mg SC PRN",
                      "Usual maximum daily dose: 200mg PO/CSCI",
                      "!!Avoid cyclizine with domperidone or metoclopramide — antagonistic effects",
                    ],
                  },
                ],
              },
              {
                heading: "Step 2 — Broad Spectrum",
                type: "pall_groups",
                groups: [
                  {
                    label: "If Step 1 not effective — levomepromazine",
                    items: [
                      "Levomepromazine PO/SC starting dose 6.25mg at bedtime + up to 2-hourly PRN",
                      "Usual maximum dose: 25mg/24h",
                      "Broad-spectrum — dopamine antagonist + antihistamine + anticholinergic",
                      "Can cause sedation — useful if agitation also present",
                      "!!bot:If above not effective: contact specialist palliative care. Dual antiemetics may be advised (e.g. levomepromazine + ondansetron)",
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "pall-bowel",
            title: "Constipation",
            category: "Symptom Control",
            authors: "Nottingham APC Palliative Care Pocketbook",
            evidenceBase: "Notts APC Palliative Care Pocketbook | PCF6",
            summary: "Prevention is better than cure. Almost all patients prescribed an opioid will require a regular laxative from day one. Prescribe a stimulant laxative (senna or bisacodyl) and titrate to response. Add a faecal softener if maximum tolerated stimulant dose is ineffective.",
            tags: ["Constipation", "Senna", "Bisacodyl", "Macrogol", "Docusate", "Laxatives", "Opioid"],
            related: ["pall-nausea", "pall-pain", "pall-mbo"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=e94963b0748b3e70052c1db1954a3c43",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10627",
            updated: "Current edition",
            sections: [

        {
          heading: "Contact Information",
          type: "alert",
          variant: "danger",
          items: [
            "**Seek advice from senior colleagues or the palliative care team if needed**",
            "**Mon–Sun 08:00–16:00:** QMC ☎ 88402 | City ☎ 74977",
            "**Out of hours:** Palliative consultant advice line ☎ 07595 285014",
          ],
        },
              {
                heading: "General Measures — Do These First",
                type: "pall_groups",
                groups: [
                  {
                    label: "Assessment & reversible causes",
                    items: [
                      "Correct causes where possible: drugs, poor diet, dehydration, debility",
                      "Encourage fluids, fruit juice, and fruit",
                      "Ask about patient's usual bowel habit and current laxative use",
                      "Do a PR examination if: bowels not opened ≥3 days, rectal discomfort, or diarrhoea suggesting faecal impaction with overflow",
                      "!!Almost all patients prescribed an opioid will require a regular laxative — prescribe from day one",
                    ],
                  },
                ],
              },
              {
                heading: "Stimulant Laxatives — First Line with Opioids",
                type: "lax_table",
                note: "Prescribe when opioid started. Titrate every 24–48h according to response.",
                drugs: [
                  {
                    name: "Senna",
                    doses: [
                      "15mg at bedtime",
                      "15mg morning and bedtime",
                      "Titrate every 24–48h to maximum 30mg TDS",
                    ],
                  },
                  {
                    name: "Bisacodyl",
                    doses: [
                      "5mg at bedtime",
                      "10mg at bedtime",
                      "Titrate every 24–48h to maximum 20mg TDS",
                    ],
                  },
                ],
                footer: "If stimulant laxative causes bowel colic: divide dose into smaller more frequent doses OR switch to a faecal softener.",
              },
              {
                heading: "Add Faecal Softener if Maximum Stimulant Dose Ineffective",
                type: "pall_groups",
                groups: [
                  {
                    label: "Options",
                    items: [
                      "Macrogol (Movicol) 1 sachet each morning",
                      "Sodium docusate 100–200mg BD",
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "pall-mbo",
            title: "Inoperable Bowel Obstruction",
            category: "Symptom Control",
            authors: "Nottingham APC Palliative Care Pocketbook",
            evidenceBase: "Notts APC Palliative Care Pocketbook | PCF6",
            summary: "Rest GI tract and treat pain with opioids via CSCI. Consider a dexamethasone trial (dex 6·6mg SC once daily × 5–7 days). Step 1: metoclopramide CSCI for functional obstruction/no colic. Step 2: stop prokinetics, start hyoscine butylbromide (Buscopan) for mechanical obstruction/colic. Step 3: octreotide or specialist advice.",
            tags: ["Bowel obstruction", "MBO", "Hyoscine butylbromide", "Buscopan", "Metoclopramide", "Dexamethasone", "Octreotide", "CSCI", "Colic"],
            related: ["pall-bowel", "pall-nausea", "pall-syringe"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=e94963b0748b3e70052c1db1954a3c43",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10627",
            updated: "Current edition",
            sections: [

        {
          heading: "Contact Information",
          type: "alert",
          variant: "danger",
          items: [
            "**Seek advice from senior colleagues or the palliative care team if needed**",
            "**Mon–Sun 08:00–16:00:** QMC ☎ 88402 | City ☎ 74977",
            "**Out of hours:** Palliative consultant advice line ☎ 07595 285014",
          ],
        },
              {
                heading: "Initial Management",
                type: "pall_groups",
                groups: [
                  {
                    label: "GI rest & supportive measures",
                    items: [
                      "Rest the GI tract — may allow obstruction to settle",
                      "Allow sips of fluid for mouth comfort and oral hydration",
                      "If sips not sufficient: discuss SC/IV fluids or NG tube with specialist palliative care",
                      "Ensure background pain treated with opioids via CSCI",
                      "In partial obstruction (some flatus/faeces passing): sodium docusate 100–200mg BD if laxative needed — avoid stimulant laxatives",
                      "!!bot:Several days of dose titration may be needed before optimum symptom relief — reassess daily",
                    ],
                  },
                ],
              },
              {
                heading: "Dexamethasone Trial",
                type: "dex_table",
                drug: "Dexamethasone",
                dose: "6.6mg SC once daily — with PPI or ranitidine cover",
                note: "Ranitidine also reduces gastric secretions — 150–200mg/24h CSCI.",
                rows: [
                  { label: "Initial Mx", action: "Start dexamethasone 6.6mg SC OD. Prescribe PPI or ranitidine 150–200mg/24h CSCI alongside for gastric protection." },
                  { label: "Monitoring", action: "Reassess daily. Several days of titration may be needed before optimum relief." },
                  { label: "No response at 5–7 days", action: "Stop dexamethasone — no benefit demonstrated. Move to antisecretory / antiemetic step-wise management below." },
                  { label: "If beneficial", action: "Titrate to the lowest effective dose. Continue with regular review." },
                ],
                footer: "Ranitidine 150–200mg/24h CSCI also reduces gastric secretions and may be continued alongside or instead of dexamethasone.",
              },
              {
                heading: "Step-wise Antiemetic / Antisecretory Management",
                type: "pall_groups",
                groups: [
                  {
                    label: "Step 1 — No colic: probable functional obstruction (peristaltic failure)",
                    items: [
                      "Metoclopramide 30–40mg/24h CSCI + 10mg SC PRN",
                      "If beneficial: titrate up to 100mg/24h if necessary",
                    ],
                  },
                  {
                    label: "Step 2 — Colic present: probable mechanical obstruction",
                    items: [
                      "!!Stop all prokinetic medicines (metoclopramide, domperidone) — they worsen colic in mechanical obstruction",
                      "Hyoscine butylbromide (Buscopan) 60–120mg/24h CSCI + 20mg SC PRN (reported max 300mg/24h)",
                      "AND/OR levomepromazine 6.25–12.5mg/24h CSCI + 6.25mg SC PRN (usual max 25mg/24h)",
                    ],
                  },
                  {
                    label: "Step 3 — If above not effective",
                    items: [
                      "Contact specialist palliative care unit for advice",
                      "Octreotide may be advised — reduces GI secretions",
                      "Alternative antiemetics e.g. ondansetron may be advised",
                      "!!bot:Do not continue prokinetics once mechanical obstruction confirmed — colic will worsen",
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "pall-delirium-agitation",
            title: "Delirium & Agitation",
            category: "Symptom Control",
            authors: "Nottingham APC Palliative Care Pocketbook",
            evidenceBase: "Notts APC Palliative Care Pocketbook | PCF6",
            summary: "Address correctable causes first (pain, urinary retention, constipation, withdrawal). Step 1: non-drug management. Step 2: levomepromazine 12·5mg SC PRN (6·25mg in elderly) ± midazolam 2·5–5mg SC PRN if anxiety prominent. Step 3: start CSCI if ≥2 PRN doses effective in 24h — levomepromazine 12·5–25mg + midazolam 10–20mg/24h.",
            tags: ["Delirium", "Agitation", "Levomepromazine", "Midazolam", "CSCI", "Terminal restlessness", "Palliative"],
            related: ["pall-breathlessness", "pall-secretions"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=e94963b0748b3e70052c1db1954a3c43",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10627",
            updated: "Current edition",
            sections: [

        
              {
                heading: "⚠ Key Principles",
                type: "alert",
                items: [
                  "Use the **lowest effective dose** and titrate carefully to relieve distress",
                  "Review regularly — reassess response at each step",
                  "**Elderly patients: always start with the lower dose**",
                       "**Seek advice from senior colleagues or the palliative care team if needed**",
            "**Mon–Sun 08:00–16:00:** QMC ☎ 88402 | City ☎ 74977",
            "**Out of hours:** Palliative consultant advice line ☎ 07595 285014",
                ],
              },
              {
                heading: "Step 1 — Non-Drug Management",
                type: "pall_groups",
                groups: [
                  {
                    label: "Address correctable causes before prescribing",
                    items: [
                      "Pain — assess and treat appropriately",
                      "Urinary retention — consider bladder scan and catheterisation",
                      "Faecal impaction — PR examination if not opened bowels ≥3 days",
                      "Withdrawal — nicotine, alcohol, recreational or non-medical drug use",
                      "Other reversible causes: infection, metabolic disturbance, medication side effects",
                    ],
                  },
                ],
              },
              {
                heading: "Step 2 — PRN Medication",
                type: "pall_groups",
                note: "Start here. Escalate to Step 3 if ≥2 PRN doses are needed and effective in 24 hours.",
                groups: [
                  {
                    label: "Levomepromazine — for delirium/agitation",
                    items: [
                      "Levomepromazine **12·5mg SC** 1-hourly PRN",
                      "Elderly: **6·25mg SC** 1-hourly PRN",
                    ],
                  },
                  {
                    label: "Add midazolam if anxiety is prominent",
                    items: [
                      "Midazolam **2·5–5mg SC** 1-hourly PRN alongside levomepromazine",
                    ],
                  },
                  {
                    label: "Trigger for Step 3",
                    items: [
                      "!!≥2 PRN doses effective in 24 hours → start CSCI (Step 3)",
                    ],
                  },
                ],
              },
              {
                heading: "Step 3 — Start CSCI",
                type: "pall_groups",
                note: "Triggered when ≥2 PRN doses effective in 24h. Round all doses to a convenient number.",
                groups: [
                  {
                    label: "Syringe driver over 24 hours",
                    items: [
                      "Levomepromazine **12·5–25mg/24h** CSCI",
                      "Midazolam **10–20mg/24h** CSCI",
                    ],
                  },
                  {
                    label: "Continue PRN doses alongside CSCI",
                    items: [
                      "Levomepromazine **12·5mg SC** 1-hourly PRN (6·25mg in elderly)",
                      "Midazolam **2·5–5mg SC** 1-hourly PRN",
                      "!!bot:If symptoms persist at Step 3: contact hospital palliative care team or out-of-hours consultant advice line",
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "pall-routes",
        label: "Routes of Administration",
        guidelines: [        ],
      },
      {
        id: "pall-eol",
        label: "End of Life",
        guidelines: [        ],
      },
      {
        id: "pall-emergencies",
        label: "Oncological Emergencies",
        guidelines: [        ],
      },
    ],
    get guidelines() {
      return this.subsites.flatMap(ss => ss.guidelines || []);
    },
  },

  {
    id: "electrolytes",
    label: "Electrolyte Abnormalities",
    color: "#2563a8",
    accent: "#e8f0fb",
icon: (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <path d="M7 2h10M8 2v6l-4 9a1 1 0 0 0 .9 1.5h14.2A1 1 0 0 0 20 17l-4-9V2"/>
    <line x1="6" y1="13" x2="18" y2="13"/>
  </svg>
),
    isParent: true,
    subsites: [
      {
        id: "electrolytes-calcium",
        label: "Calcium",
        guidelines: [
          {
            id: "elec-hypercalcaemia",
            title: "Acute Hypercalcaemia",
            category: "Calcium",
            version: "1",
            authors: "Jennifer Walsh, Neil Gittoes, Peter Selby & Society for Endocrinology Clinical Committee",
            evidenceBase: "Society for Endocrinology Clinical Guidelines | Guideline No. 3667 | Review: June 2026",
            summary: "Corrected calcium >3·5 = URGENT — risk of dysrhythmia and coma. Rehydrate with IV 0·9% saline 4–6L/24h first. Add IV bisphosphonate if further treatment required (zoledronic acid 4mg over 15 min first line). Monitor calcium nadir at 2–4 days. 90% of cases: primary hyperparathyroidism or malignancy.",
            tags: ["Hypercalcaemia", "Calcium", "Zoledronic acid", "Pamidronate", "Bisphosphonate", "PTH", "Malignancy", "Rehydration", "IV saline"],
            related: [],
            summaryCalcLink: null,
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=c17cf4cb43ce09621a1129564e7e12a2",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=11200&query_desc=hypercalcaemia",
            updated: "June 2026 (review)",
            sections: [
              {
                heading: "Severity Classification",
                type: "grader",
                grades: [
                  { grade: 1, label: "Mild", color: "#276749", bg: "#f0fff4", border: "#9ae6b4", criteria: ["Corrected calcium <3·0 mmol/L", "Often asymptomatic", "Does not usually require urgent correction"] },
                  { grade: 2, label: "Moderate", color: "#744210", bg: "#fffff0", border: "#f6e05e", criteria: ["Corrected calcium 3·0–3·5 mmol/L", "May be well tolerated if risen slowly", "May be symptomatic — prompt treatment usually indicated"] },
                  { grade: 3, label: "Severe", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", criteria: ["Corrected calcium >3·5 mmol/L", "!!Requires URGENT correction", "Risk of dysrhythmia and coma"] },
                ],
                management: [
                  { grade: 1, icpi: null, items: ["Monitor — does not usually require urgent correction", "Investigate underlying cause (see Investigations section)", "Review medications contributing to hypercalcaemia"] },
                  { grade: 2, icpi: null, items: ["Prompt treatment usually indicated", "IV rehydration with 0·9% saline", "Investigate underlying cause", "Consider IV bisphosphonate if not responding to fluids"] },
                  { grade: 3, icpi: null, items: ["!!URGENT correction required", "IV rehydration immediately — 0·9% saline 4–6L/24h", "IV bisphosphonate once adequately rehydrated", "ECG monitoring", "Consider ITU/HDU if obtunded or dysrhythmia present"] },
                ],
              },
              {
                heading: "Clinical Features & Causes",
                type: "callouts",
                panels: [
                  {
                    label: "Clinical Features",
                    color: "#2563a8",
                    headerBg: "#e8f0fb",
                    blocks: [
                      {
                        icon: "management", heading: "Symptoms & Signs", color: "#2563a8", bg: "#e8f0fb", border: "#93b4e8",
                        items: [
                          "Polyuria and thirst",
                          "Anorexia, nausea, and constipation",
                          "Mood disturbance, cognitive dysfunction, confusion, coma",
                          "Renal impairment",
                          "Shortened QT interval and dysrhythmias",
                          "Nephrolithiasis, nephrocalcinosis",
                          "Pancreatitis",
                          "Peptic ulceration",
                          "Hypertension, cardiomyopathy",
                          "Muscle weakness",
                          "Band keratopathy",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Causes",
                    color: "#742a2a",
                    headerBg: "#fff5f5",
                    blocks: [
                      {
                        icon: "drug", heading: "90% of cases", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: ["Primary hyperparathyroidism", "Malignancy (PTHrP, osteolytic metastases, 1,25-OHD production)"],
                      },
                      {
                        icon: "management", heading: "Less common causes", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "Thiazide diuretics", "Familial hypocalciuric hypercalcaemia",
                          "Non-malignant granulomatous disease (sarcoidosis, TB)",
                          "Thyrotoxicosis", "Tertiary hyperparathyroidism",
                          "Hypervitaminosis D or A", "Rhabdomyolysis",
                          "Lithium", "Immobilisation", "Adrenal insufficiency",
                          "Milk-alkali syndrome", "Theophylline toxicity", "Phaeochromocytoma",
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                heading: "Investigation",
                type: "list",
                groups: [
                  {
                    icon: "history", label: "History",
                    items: [
                      "Symptoms of hypercalcaemia and duration",
                      "Symptoms of underlying causes (weight loss, night sweats, cough, bone pain)",
                      "Family history of hypercalcaemia or hyperparathyroidism",
                      "All medications including supplements and over-the-counter preparations",
                    ],
                  },
                  {
                    icon: "investigations", label: "Examination",
                    items: [
                      "Assess for cognitive impairment",
                      "Fluid balance status",
                      "Signs of underlying cause: neck (goitre/parathyroid), respiratory, abdomen, breasts, lymph nodes",
                    ],
                  },
                  {
                    icon: "investigations", label: "Investigations",
                    items: [
                      "Calcium corrected for albumin",
                      "Phosphate, urea and electrolytes, creatinine",
                      "PTH (essential — guides aetiology)",
                      "ECG: look for shortened QT interval and other conduction abnormalities",
                      "Consider: 25-OHD, 1,25-OHD, PTHrP, TFTs, urine calcium:creatinine ratio",
                    ],
                  },
                  {
                    icon: "immediate", label: "PTH Interpretation",
                    items: [
                      "High calcium + High PTH → Primary or tertiary hyperparathyroidism",
                      "High calcium + Low PTH → Malignancy or other less common causes",
                      "Note: Familial hypocalciuric hypercalcaemia may be misdiagnosed as primary hyperparathyroidism (inappropriately normal/raised PTH) — usually not severe, less likely to present as emergency",
                    ],
                  },
                ],
              },
              {
                heading: "Management",
                type: "callouts",
                panels: [
                  {
                    label: "Step 1 — Rehydration (always first)",
                    color: "#2563a8",
                    headerBg: "#e8f0fb",
                    blocks: [
                      {
                        icon: "immediate", heading: "IV 0·9% Saline — 4–6L in 24 hours", color: "#2563a8", bg: "#e8f0fb", border: "#93b4e8",
                        items: [
                          "Start immediately — rehydration is the most important first step",
                          "Monitor closely for fluid overload — especially in renal impairment or elderly patients",
                          "Loop diuretics (furosemide): rarely used — only if fluid overload develops. NOT effective for reducing serum calcium",
                          "Consider dialysis if severe renal failure present",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Step 2 — IV Bisphosphonate (if further treatment required)",
                    color: "#744210",
                    headerBg: "#fffff0",
                    blocks: [
                      {
                        icon: "drug", heading: "First line: Zoledronic acid", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: [
                          "4mg IV over 15 minutes",
                          "Give more slowly and consider dose reduction in renal impairment (eGFR <60)",
                          "Monitor serum calcium — nadir reached at 2–4 days",
                          "!!Can cause hypocalcaemia if vitamin D deficiency or suppressed PTH is present — check before giving",
                        ],
                      },
                      {
                        icon: "drug", heading: "Alternatives", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: [
                          "Pamidronate 30–90mg IV at 20mg/h (dose depends on severity)",
                          "Ibandronic acid 2–4mg IV",
                          "Dose reduce in renal impairment for all agents",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Step 3 — Second-Line Treatments",
                    color: "#276749",
                    headerBg: "#f0fff4",
                    blocks: [
                      {
                        icon: "drug", heading: "Glucocorticoids", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: [
                          "Inhibit 1,25-OHD production",
                          "Indicated for: lymphoma, granulomatous disease, 25-OHD poisoning",
                          "Prednisolone 40mg daily — usually effective within 2–4 days",
                        ],
                      },
                      {
                        icon: "drug", heading: "Calcimimetics / Denosumab / Calcitonin", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: [
                          "Under specialist supervision only",
                          "Consider if poor response to other measures",
                        ],
                      },
                      {
                        icon: "referral", heading: "Parathyroidectomy", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: [
                          "Consider in acute presentation of primary hyperparathyroidism",
                          "Severe hypercalcaemia with poor response to other measures",
                          "Refer to endocrine surgery",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "elec-hypocalcaemia",
            title: "Acute Hypocalcaemia",
            category: "Calcium",
            version: "4",
            authors: "Dr Peter Prinsloo, Azma Malik, Dr Katharine Whitehurst — NUH",
            evidenceBase: "NUH Guideline 1531 | Version 4 | October 2020 | Review: October 2023",
            summary: "Adjusted calcium <1·90 = medical emergency — IV calcium gluconate required regardless of symptoms. Symptoms correlate with RATE of drop not just absolute level. Correct magnesium first if low. Most common cause in hospital: post-thyroidectomy hypoparathyroidism. Always use ADJUSTED calcium for all decisions.",
            tags: ["Hypocalcaemia", "Calcium gluconate", "IV calcium", "Alfacalcidol", "Calcitriol", "Hypoparathyroidism", "Post-thyroidectomy", "Vitamin D", "Magnesium"],
            related: ["elec-hypercalcaemia"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=83cab27a4dd0e5d6e8c8bd3e8a004ecd",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=9722&query_desc=hypocalcaemia",
            updated: "October 2023 (review)",
            sections: [
              {
                heading: "Severity Classification",
                type: "grader",
                grades: [
                  { grade: 1, label: "Normal", color: "#276749", bg: "#f0fff4", border: "#9ae6b4", criteria: ["Adjusted calcium 2·20–2·60 mmol/L", "No treatment required"] },
                  { grade: 2, label: "Mild Hypocalcaemia", color: "#744210", bg: "#fffff0", border: "#f6e05e", criteria: ["Adjusted calcium 1·90–<2·20 mmol/L", "May be symptomatic or asymptomatic"] },
                  { grade: 3, label: "Severe Hypocalcaemia", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", criteria: ["Adjusted calcium <1·90 mmol/L", "Medical emergency", "!!Symptoms may occur at HIGHER levels if calcium dropped suddenly — rate and magnitude matter, not just absolute level"] },
                ],
                management: [
                  { grade: 2, icpi: null, items: ["Check Vitamin D, Magnesium, PTH, calcium intake", "If low magnesium: correct FIRST — calcium may normalise within 2 days", "Asymptomatic: oral calcium supplementation", "Symptomatic: IV calcium gluconate required"] },
                  { grade: 3, icpi: null, items: ["!!IV calcium gluconate required regardless of symptoms", "Continuous cardiac monitoring if ECG changes or on digoxin", "Correct magnesium if low — without this, calcium increase may be transient", "Check PTH, phosphate, magnesium, Vit D, LFTs, U&Es"] },
                ],
              },
              {
                heading: "⚠ Key Principles Before Treating",
                type: "alert",
                items: [
                  "Always use ADJUSTED calcium — corrects for albumin. Use ionised calcium from blood gas if albumin unreliable",
                  "Symptoms correlate with RATE and MAGNITUDE of calcium drop — not just absolute level",
                  "Correct magnesium FIRST if low — calcium may normalise spontaneously within 2 days. Long-term PPI use can cause hypomagnesaemia",
                  "Alkalosis DECREASES ionised calcium (worsens symptoms); acidosis INCREASES ionised calcium",
                  "Undetectable PTH (post-surgery): need ACTIVE vitamin D (alfacalcidol or calcitriol) — cannot activate standard colecalciferol",
                  "Renal impairment: refer to renal team for ALL management decisions",
                  "Excludes critical care and renal patients — alternative regimens used in these areas",
                ],
              },
              {
                heading: "Signs & Symptoms",
                type: "callouts",
                panels: [
                  {
                    label: "Clinical Features",
                    color: "#2563a8",
                    headerBg: "#e8f0fb",
                    blocks: [
                      {
                        icon: "immediate", heading: "Neuromuscular", color: "#2563a8", bg: "#e8f0fb", border: "#93b4e8",
                        items: ["Perioral paraesthesia", "Muscle twitching and cramps", "Tremor, tetany", "Trousseau's sign (carpal spasm with BP cuff inflation)", "Chvostek's sign (facial twitch on tapping)", "Laryngospasm"],
                      },
                      {
                        icon: "management", heading: "Neuropsychiatric", color: "#2563a8", bg: "#e8f0fb", border: "#93b4e8",
                        items: ["Fatigue, confusion, anxiety, depression, irritability", "Seizures", "Dyspnoea"],
                      },
                      {
                        icon: "immediate", heading: "Cardiovascular", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: ["Cardiac arrhythmia, bradycardia, hypotension", "Congestive cardiac failure", "!!ECG: prolonged QT interval — risk of torsades de pointes"],
                      },
                    ],
                  },
                ],
              },
              {
                heading: "Causes",
                type: "list",
                groups: [
                  {
                    icon: "immediate", label: "Most common cause in hospital",
                    items: ["!!Post-thyroidectomy/parathyroidectomy hypoparathyroidism — may be temporary or permanent", "Hypocalcaemia occurs in 20–25% after total thyroidectomy", "Permanent hypoparathyroidism: 0·8–3·0% of patients"],
                  },
                  {
                    icon: "management", label: "General causes",
                    items: ["Hypoparathyroidism (post-surgery, autoimmune)", "Magnesium deficiency (PPIs)", "Severe vitamin D deficiency / osteomalacia", "Acute pancreatitis", "Rhabdomyolysis", "Large volume blood transfusion (citrate chelation)", "Renal failure, hyperphosphataemia", "Malabsorption, malignant disease", "Toxic shock syndrome, plasmapheresis"],
                  },
                  {
                    icon: "drug", label: "Drug-induced hypocalcaemia",
                    items: ["Bisphosphonates, denosumab (Prolia/Xgeva)", "Aminoglycosides, foscarnet", "Phenytoin, glucocorticoids, furosemide", "Cinacalcet, calcitonin, phosphates", "Antineoplastic agents, citrated blood transfusions", "Contact Pharmacy Medicines Information (ext 64185) for full list"],
                  },
                ],
              },
              {
                heading: "Investigations",
                type: "list",
                groups: [
                  {
                    icon: "investigations", label: "Required bloods",
                    items: ["Adjusted calcium", "Phosphate", "PTH — ESSENTIAL", "Urea and electrolytes", "Magnesium", "LFTs including albumin", "Vitamin D (25-OHD)"],
                  },
                  {
                    icon: "immediate", label: "Special considerations",
                    items: ["Low magnesium: correct FIRST — calcium may normalise within 2 days", "Renal insufficiency: seek renal team advice before treating", "Consider tumour lysis in haematology/oncology patients"],
                  },
                ],
              },
              {
                heading: "IV Calcium Replacement",
                type: "callouts",
                panels: [
                  {
                    label: "Step 1 — Initial IV Bolus",
                    color: "#742a2a",
                    headerBg: "#fff5f5",
                    blocks: [
                      {
                        icon: "immediate", heading: "10ml 10% Calcium Gluconate in 100ml 0·9% NaCl or 5% glucose — over 10 minutes", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "10ml of 10% calcium gluconate = 2·23 mmol calcium",
                          "Give into large peripheral or central vein",
                          "NEVER exceed 0·5 mmol per minute",
                          "Emergency (life-threatening): undiluted 10ml as slow IV bolus over minimum 5 minutes",
                          "!!Continuous ECG monitoring if cardiac disease, arrhythmia risk, or on digoxin",
                          "STOP or SLOW if bradycardia or hypotension develops",
                          "Obs 4-hourly: Temp, BP, HR, RR, SpO₂, fluid balance",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Step 2 — Repeat or Proceed to Continuous Infusion",
                    color: "#744210",
                    headerBg: "#fffff0",
                    blocks: [
                      {
                        icon: "management", heading: "Decision after Step 1", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: ["Still symptomatic: repeat the bolus", "Temporary improvement: proceed to continuous infusion (Step 3)"],
                      },
                    ],
                  },
                  {
                    label: "Step 3 — Continuous Infusion",
                    color: "#276749",
                    headerBg: "#f0fff4",
                    blocks: [
                      {
                        icon: "drug", heading: "100ml (22·3 mmol) 10% Calcium Gluconate in 1000ml NaCl 0·9% — over 12–24 hours", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: [
                          "Also compatible with glucose 5% and glucose/NaCl 0·9%",
                          "Very severe cases: can give over 6 hours with cardiac monitoring",
                          "Check calcium 2 hours after infusion completion",
                          "Start oral supplements ± alfacalcidol/calcitriol once IV complete",
                          "Hypoparathyroidism: give at 50% rate — 50ml (11·3 mmol) in 1000ml NaCl 0·9% over 12–24 hours",
                          "CKD stages 4–5 / AKI: consult renal team",
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                heading: "Oral Calcium Supplementation",
                type: "list",
                groups: [
                  {
                    icon: "drug", label: "For mild asymptomatic hypocalcaemia (1·90–2·20 mmol/L) — typical dose 500–2000mg/day",
                    items: [
                      "Calvive® 1000 effervescent: 1000mg — 1–2 tablets daily",
                      "Calcichew® chewable: 500mg — 2–3 tablets daily",
                      "Cacit® effervescent (calcium citrate): 500mg — 2–5 tablets daily",
                      "Adcal D3® chewable (+ Vit D 400 units): 600mg — 1 tablet twice daily",
                      "!!Post-gastric bypass or PPI use: use calcium CITRATE (Cacit®) — needs acidic environment for absorption",
                      "!!Do NOT give at same time as tetracyclines, ciprofloxacin, or bisphosphonates — reduces absorption",
                    ],
                  },
                ],
              },
              {
                heading: "Vitamin D Replacement",
                type: "callouts",
                panels: [
                  {
                    label: "Choosing the right Vitamin D preparation",
                    color: "#2563a8",
                    headerBg: "#e8f0fb",
                    blocks: [
                      {
                        icon: "drug", heading: "Normal PTH — use standard colecalciferol", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: ["PTH drives liver/kidney activation of standard Vit D", "Use oral colecalciferol — see Notts APC Vitamin D guideline"],
                      },
                      {
                        icon: "drug", heading: "Low PTH or renal impairment — use ACTIVE Vit D", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "Kidney cannot activate colecalciferol — must use pre-activated form",
                          "Alfacalcidol: onset 2–5 days. Effective in renal failure. NOT in liver failure",
                          "Calcitriol: onset 1–2 days. Effective in renal AND liver failure",
                          "!!Active Vit D has NO effect without adequate calcium intake — always co-prescribe oral calcium",
                          "!!Lifelong use: monitor for hypercalcaemia, hypercalciuria, renal impairment, nephrocalcinosis, kidney stones",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Replacement Regimes by Cause",
                    color: "#276749",
                    headerBg: "#f0fff4",
                    blocks: [
                      {
                        icon: "drug", heading: "Chronic hypoparathyroidism (post-surgical, autoimmune)", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: [
                          "Alfacalcidol 250–1000 nanograms daily OR Calcitriol 250–1000 nanograms daily",
                          "PLUS Calvive® 1000mg 2–3 times daily",
                          "Monitor daily until calcium stable",
                          "!!Long-term: refer to Metabolic Bone Service (City ext 77271 / Treatment Centre Gateway E)",
                        ],
                      },
                      {
                        icon: "drug", heading: "Chronic renal impairment / PTH deficiency or resistance", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: [
                          "CRI: REFER TO RENAL TEAM",
                          "PTH deficiency/resistance: alfacalcidol 500–1000 nanograms daily",
                          "Monitor urinary and serum calcium weekly until stable, then 3–6 monthly",
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                heading: "Post-Operative Management",
                type: "callouts",
                panels: [
                  {
                    label: "Day 1 Post-Op — Adjusted Calcium",
                    color: "#2563a8",
                    headerBg: "#e8f0fb",
                    blocks: [
                      {
                        icon: "management", heading: "Normal 2·20–2·60", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: ["No action", "Warn patient of potential delayed hypocalcaemia symptoms"],
                      },
                      {
                        icon: "management", heading: "Borderline 2·00–<2·20", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: ["Repeat calcium and PTH", "PTH ≥20 + asymptomatic: no action initially", "Symptomatic or PTH <20: Calvive® 1000mg TDS + alfacalcidol 500–1000 nanograms daily"],
                      },
                      {
                        icon: "management", heading: "Low <2·00", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
                        items: ["Start oral Sandocal 1g TDS", "Repeat calcium and PTH", "Manage per PTH level (see full guideline Table 4)"],
                      },
                      {
                        icon: "immediate", heading: "Severe <1·80 or severe symptoms", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "!!START URGENT TREATMENT — PTH usually undetectable",
                          "IV: 10ml 10% calcium gluconate in 100ml NaCl 0·9% over 10 min with ECG monitoring",
                          "Then oral: Calvive® 2000mg STAT then 1000mg TDS",
                          "PLUS alfacalcidol 1000 nanograms daily (higher doses may be needed — seek consultant)",
                          "Check and replace magnesium",
                          "Repeat adjusted calcium 6-hourly until stable",
                          "Monitor with GP at 2 and 6 weeks",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "electrolytes-magnesium",
        label: "Magnesium",
        guidelines: [
          {
            id: "elec-hypomagnesaemia",
            title: "Hypomagnesaemia",
            category: "Magnesium",
            version: "4.0",
            authors: "NUH NHS Trust",
            evidenceBase: "NUH Hypomagnesaemia Treatment Guideline v4·0 | Reviewed December 2023 | Excludes Critical Care and Renal",
            summary: "Normal range: 0·7–1·0 mmol/L. Mild (0·5–0·7): oral Magnaspartate® 1–2 sachets/day if symptomatic. Severe (<0·5): IV magnesium sulphate regardless of symptoms — Day 1: 40mmol over 12h, Days 2–5: 20mmol over 6h. Treat minimum 5 days. Symptoms usually occur <0·5 mmol/L. Always check calcium and potassium.",
            tags: ["Hypomagnesaemia", "Magnesium sulphate", "Magnaspartate", "IV magnesium", "Hypokalaemia", "Hypocalcaemia", "Electrolytes"],
            related: ["elec-hypocalcaemia", "elec-hypercalcaemia", "elec-hypermagnesaemia"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=264c8cb81dbd4129a7831ce423360731",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=9656&query_desc=hypomagnesaemia",
            updated: "December 2023",
            sections: [
              {
                heading: "Severity & First-Line Treatment",
                type: "grader",
                grades: [
                  { grade: 2, label: "Mild", color: "#744210", bg: "#fffff0", border: "#f6e05e", criteria: ["Serum magnesium 0·5–0·7 mmol/L", "Symptoms usually absent at this level"] },
                  { grade: 3, label: "Moderate–Severe", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", criteria: ["Serum magnesium <0·5 mmol/L", "!!IV treatment required regardless of symptoms", "Symptoms usually occur below 0·5 mmol/L"] },
                ],
                management: [
                  { grade: 2, icpi: null, items: ["Symptomatic: oral Magnaspartate® 1–2 sachets/day (10 mmol/sachet)", "Asymptomatic: may not require treatment — clinical risk-benefit decision", "Review medications and address underlying cause", "Check calcium and potassium"] },
                  { grade: 3, icpi: null, items: ["!!IV treatment required — both symptomatic and asymptomatic", "Day 1: magnesium sulphate 40mmol in 500ml NaCl 0·9% over 12 hours", "Days 2–5: magnesium sulphate 20mmol in 500ml NaCl 0·9% over 6 hours", "Check magnesium 6h after infusion then daily", "Complete full 5-day course — do not stop early based on serum levels alone", "Check calcium and potassium throughout"] },
                ],
                note: "Treat for minimum 5 days. Plasma levels may appear artificially normal while magnesium redistributes into the intracellular compartment.",
              },
              {
                heading: "⚠ Key Principles",
                type: "alert",
                items: [
                  "Treat for a MINIMUM of 5 days — plasma levels may appear normal while Mg equilibrates intracellularly",
                  "Always check calcium and potassium — hypomagnesaemia commonly causes secondary hypocalcaemia and hypokalaemia",
                  "Correcting magnesium will often correct calcium and potassium without separate replacement",
                  "Plasma contains only ~0·5% of total body magnesium — serum levels may be normal despite significant total body depletion",
                  "Review medications and address underlying cause in all patients",
                  "Refer to speciality guideline where applicable (Haematology / Critical Care / Renal)",
                ],
              },
              {
                heading: "Signs & Symptoms",
                type: "callouts",
                note: "Symptoms usually occur when serum magnesium falls below 0·5 mmol/L",
                panels: [
                  {
                    label: "Clinical Features",
                    color: "#2563a8",
                    headerBg: "#e8f0fb",
                    blocks: [
                      {
                        icon: "immediate", heading: "Neuromuscular & Cardiac", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: ["Muscle weakness, tremor, ataxia, seizures, carpopedal spasm", "Ventricular arrhythmias, prolonged QT interval, tachycardia"],
                      },
                      {
                        icon: "management", heading: "Neuropsychiatric & Metabolic", color: "#2563a8", bg: "#e8f0fb", border: "#93b4e8",
                        items: ["Depression, psychosis, vertigo", "Secondary hypocalcaemia, hypokalaemia, hyponatraemia", "Hyperinsulinism"],
                      },
                    ],
                  },
                ],
              },

              {
                heading: "IV Replacement",
                type: "callouts",
                panels: [
                  {
                    label: "Dosing regimen",
                    color: "#742a2a",
                    headerBg: "#fff5f5",
                    blocks: [
                      {
                        icon: "drug", heading: "Day 1", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: ["Magnesium sulphate 40mmol in 500ml NaCl 0·9% over 12 hours", "Maximum 40mmol/day"],
                      },
                      {
                        icon: "drug", heading: "Days 2–5", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: ["Magnesium sulphate 20mmol in 500ml NaCl 0·9% over 6 hours", "Maximum 20mmol/day", "Compatible fluids: NaCl 0·9% preferred; glucose 5% or glucose 4%/NaCl 0·18% also acceptable"],
                      },
                    ],
                  },
                  {
                    label: "Administration & infusion rates",
                    color: "#2563a8",
                    headerBg: "#e8f0fb",
                    blocks: [
                      {
                        icon: "management", heading: "Route & rate", color: "#2563a8", bg: "#e8f0fb", border: "#93b4e8",
                        items: [
                          "Route: large peripheral vein preferred; central venous catheter acceptable",
                          "Standard rate: 1g MgSO₄ (4mmol Mg)/hour",
                          "Maximum ward rate: 2g MgSO₄ (8mmol Mg)/hour",
                          "Emergency/Critical Care: up to 9g MgSO₄ (36mmol)/hour — ECG monitoring required",
                          "Fluid restricted: max concentration 20% peripherally (20mmol in 25ml = 0·8 mmol/ml)",
                          "!!Total course: patients may require up to 160mmol over 5 days — up to 50% of infused dose is renally excreted",
                        ],
                      },
                      {
                        icon: "drug", heading: "Available ampoules", color: "#2563a8", bg: "#e8f0fb", border: "#93b4e8",
                        items: [
                          "2ml ampoule: 1g magnesium sulphate = 4mmol magnesium",
                          "10ml ampoule: 5g magnesium sulphate = 20mmol magnesium",
                          "20ml ampoule: 10g magnesium sulphate = 40mmol magnesium",
                          "!!50% solution — requires dilution before administration",
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                heading: "Oral Replacement",
                type: "list",
                groups: [
                  {
                    icon: "drug", label: "Standard regimen — Magnaspartate®",
                    items: [
                      "Standard total daily dose: 24mmol/day in divided doses",
                      "Magnaspartate® 1–2 sachets daily (10mmol/sachet)",
                      "Dissolve in 50–200ml water, tea, or orange juice — take immediately after preparation",
                      "Can be given enterally — note jejunal route reduces bioavailability (requires gastric acid for absorption)",
                      "!!If discharged before completing oral course: state stop date on discharge prescription and instruct GP on monitoring",
                    ],
                  },
                  {
                    icon: "drug", label: "Alternative preparations",
                    items: [
                      "Magnesium citrate 150mg tablets: 6·2mmol Mg/tablet",
                      "Magnesium glycerophosphate (Neomag® 4mmol/tab): restricted — consultant gastroenterologist initiation only; reserved for short bowel patients",
                      "!!Magnaspartate® contains sucrose — do NOT use in fructose intolerance, glucose-galactose malabsorption, or sucrase-isomaltase insufficiency",
                    ],
                  },
                ],
              },
              {
                heading: "Monitoring",
                type: "list",
                groups: [
                  {
                    icon: "monitoring", label: "During IV infusion",
                    items: [
                      "Monitor: blood pressure, heart rate, respiratory rate, urine output",
                      "Watch for signs of hypermagnesaemia (see below)",
                      "Hypocalcaemia, hypotension, and phlebitis can occur with rapid administration",
                    ],
                  },
                  {
                    icon: "investigations", label: "Electrolyte checks",
                    items: [
                      "Magnesium: 6h after end of IV infusion, then daily",
                      "Calcium: check — hypomagnesaemia commonly causes hypocalcaemia",
                      "Potassium: check — hypomagnesaemia commonly causes hypokalaemia",
                      "Correcting magnesium will often correct calcium and potassium without separate replacement",
                    ],
                  },
                ],
              },
              {
                heading: "Causes",
                type: "callouts",
                panels: [
                  {
                    label: "Causes of Hypomagnesaemia",
                    color: "#744210",
                    headerBg: "#fffff0",
                    blocks: [
                      {
                        icon: "management", heading: "General causes", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: ["GI: diarrhoea, malabsorption, malnutrition, acute pancreatitis", "Renal: tubular reabsorption defects", "Endocrine: hyperaldosteronism, DKA, refeeding syndrome*", "Other: chronic alcoholism, lactation, long-term IV nutrition or fluid therapy"],
                      },
                      {
                        icon: "drug", heading: "Drug causes (not exhaustive — contact Medicines Information ext 84185)", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: [
                          "PPIs (lansoprazole, omeprazole — common cause)",
                          "Cisplatin and other cancer chemotherapy",
                          "Antimicrobials: foscarnet, amphotericin B, aminoglycosides",
                          "Diuretics: thiazides, loop diuretics",
                          "Immunosuppressants: ciclosporin, tacrolimus",
                          "EGF-receptor antagonists: cetuximab",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "elec-hypermagnesaemia",
            title: "Hypermagnesaemia",
            category: "Magnesium",
            version: "1.0",
            authors: "NUH NHS Trust",
            evidenceBase: "NUH Hypomagnesaemia Treatment Guideline v4·0 | Reviewed December 2023",
            summary: "Hypermagnesaemia most commonly occurs with excessive magnesium replacement, particularly in renal impairment. Clinical features are level-dependent: flushing and ECG changes at 2·0–3·5, drowsiness and absent reflexes at 4·0–5·0, respiratory depression above 6·0, cardiac arrest above 8·0. Antidote: IV calcium gluconate 10ml 10%.",
            tags: ["Hypermagnesaemia", "Magnesium toxicity", "Calcium gluconate", "ECG", "Respiratory depression", "Electrolytes"],
            related: ["elec-hypomagnesaemia"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=264c8cb81dbd4129a7831ce423360731",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=9656&query_desc=hypomagnesaemia",
            updated: "December 2023",
            sections: [
              {
                heading: "Clinical Features by Level",
                type: "grader",
                grades: [
                  { grade: 1, label: "2·0–3·5 mmol/L", color: "#744210", bg: "#fffff0", border: "#f6e05e", criteria: ["Flushing", "ECG changes"] },
                  { grade: 2, label: "4·0–5·0 mmol/L", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d", criteria: ["Drowsiness", "Slurred speech", "Absent deep tendon reflexes"] },
                  { grade: 3, label: ">6·0 mmol/L", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", criteria: ["Muscle paralysis", "Respiratory depression"] },
                  { grade: 4, label: ">8·0 mmol/L", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", criteria: ["!!Cardiac arrest"] },
                ],
                management: [
                  { grade: 1, icpi: null, items: ["Slow or stop infusion", "Monitor ECG", "Check renal function"] },
                  { grade: 2, icpi: null, items: ["Stop infusion", "Monitor closely", "Consider IV calcium gluconate if severe symptoms"] },
                  { grade: 3, icpi: null, items: ["!!Stop infusion immediately", "IV calcium gluconate 10ml 10% as antidote", "Supportive care", "Consider dialysis in renal failure"] },
                  { grade: 4, icpi: null, items: ["!!Cardiac arrest protocol", "IV calcium gluconate immediately", "Advanced life support", "Emergency dialysis"] },
                ],
                note: "Other features at any level: thirst, hypotension, nausea/vomiting, diplopia, confusion, bradycardia, AV block, coma.",
              },
              {
                heading: "Special Precautions",
                type: "proc_equip",
                items: [
                  { item: "Renal impairment", detail: "Mg renally excreted — higher risk of adverse effects. Use with caution, reduce dose, close monitoring" },
                  { item: "Myasthenia gravis / Hepatic impairment", detail: "Risk of renal impairment or respiratory insufficiency — use with caution" },
                  { item: "Cardiac conduction defects", detail: "Heart block, myocardial damage, bradycardia — avoid parenteral and oral magnesium" },
                  { item: "Older patients", detail: "Increased sensitivity — exercise caution with all replacement" },
                  { item: "Digoxin", detail: "Interaction risk — administer with caution" },
                  { item: "Barbiturates / opioids / hypnotics (IV)", detail: "Risk of respiratory depression — do NOT co-administer with IV MgSO₄" },
                  { item: "Nifedipine", detail: "Profound hypotension reported — avoid concurrent use" },
                  { item: "Fluorides / tetracyclines", detail: "Chelation in gut — separate doses by ≥2–3 hours" },
                  { item: "Aminoquinolines, quinidine, iron, bisphosphonates, eltrombopag, nitroxoline, penicillamine, nitrofurantoin", detail: "Reduced absorption — take Mg 3–4 hours before or after" },
                  { item: "Magnaspartate® (sucrose content)", detail: "Do NOT use in fructose intolerance, glucose-galactose malabsorption, or sucrase-isomaltase insufficiency" },
                ],
              },
              {
                heading: "Further Advice",
                type: "alert",
                items: [
                  "Further advice on magnesium replacement can be obtained from the Clinical Chemistry Physicians",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "electrolytes-potassium",
        label: "Potassium",
        guidelines: [
          {
            id: "elec-hypokalaemia",
            title: "Hypokalaemia",
            category: "Potassium",
            version: "4",
            authors: "E Snow / S Cartwright (Pharmacists NUH) — Diagnostics & Clinical Support",
            evidenceBase: "NUH Hypokalaemia Treatment Guideline v4 | Updated March 2023",
            summary: "Normal K⁺: 3·5–5·3 mmol/L. Mild (3·0–3·5): oral Sando® K 2 tabs TDS. Moderate (2·5–2·9): oral Sando® K 2 tabs QDS or IV KCl 20–40 mmol/L if not tolerating oral. Severe (<2·5): IV KCl 40 mmol/L in NaCl 0·9% — contact CCOT immediately if ECG changes. Check magnesium first — hypomagnesaemia impairs K⁺ correction.",
            tags: ["Hypokalaemia", "Potassium", "Sando K", "KCl", "IV potassium", "CCOT", "ECG", "Magnesium", "Digoxin"],
            related: ["elec-hypomagnesaemia", "elec-hyperkalaemia"],
            pdfUrl: "https://www.nuh.nhs.uk/guidelines/hypokalaemia",
            portalUrl: "https://clinicalportal.nuh.nhs.uk/hypokalaemia",
            updated: "March 2023",
            sections: [
              {
                heading: "Severity & First-Line Treatment",
                type: "grader",
                grades: [
                  { grade: 1, label: "Mild", color: "#744210", bg: "#fffff0", border: "#f6e05e", criteria: ["K⁺ 3·0–3·5 mmol/L", "Usually asymptomatic", "*Arrhythmia risk (see below)"] },
                  { grade: 2, label: "Moderate", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d", criteria: ["K⁺ 2·5–2·9 mmol/L", "Generalised weakness, lassitude, constipation", "*Arrhythmia risk"] },
                  { grade: 3, label: "Severe", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", criteria: ["K⁺ <2·5 mmol/L", "Muscle weakness and necrosis", "Paralysis and respiratory impairment if <2·0", "!!*Arrhythmia risk — contact CCOT immediately if ECG changes"] },
                ],
                management: [
                  { grade: 1, icpi: null, items: ["Oral: Sando® K 2 tabs TDS = 72 mmol/day", "Kay-Cee-L® 25ml TDS = 75 mmol/day (alternative)", "If NBM or ECG changes → treat as severe", "Monitor K⁺ daily until in range (~3 days)"] },
                  { grade: 2, icpi: null, items: ["Oral: Sando® K 2 tabs QDS = 96 mmol/day", "Kay-Cee-L® 25ml QDS = 100 mmol/day (alternative)", "IV if not tolerating oral: KCl 20–40 mmol/L in NaCl 0·9%", "If symptomatic or ECG changes → treat as severe"] },
                  { grade: 3, icpi: null, items: ["!!Contact CCOT immediately if ECG changes — CCOT QMC: Bleep 284 1049 | CCOT City: Bleep 284 1069 (24h)", "IV: KCl 40 mmol/L in NaCl 0·9% — standard preparation, repeated as required", "Max total daily dose: 2–3 mmol K⁺/kg body weight in 24 hours", "Continuous ECG monitoring if rate >20 mmol/hour", "Do NOT use glucose as infusion vehicle — glucose lowers K⁺ further", "Check K⁺ after every 40–80 mmol; minimum once daily", "Step down to oral once K⁺ persistently >3·0–3·5 mmol/L and symptoms resolved"] },
                ],
                note: "Approximate deficit: 1 mmol/L drop in K⁺ ≈ 100–200 mmol total body loss. Chronic hypokalaemia may take several days to correct.",
              },
              {
                heading: "⚠ Universal Principles",
                type: "alert",
                items: [
                  "Review history for underlying cause and treat appropriately",
                  "Review medications — especially diuretics. Check digoxin levels if on digoxin",
                  "**Check magnesium first** — hypomagnesaemia impairs K⁺ correction. Correct Mg if deficient before or alongside K⁺ replacement",
                  "If acidotic: correct K⁺ before treating acidosis — alkali causes intracellular K⁺ shift",
                  "**Never use glucose infusions** as initial replacement vehicle — glucose lowers K⁺ further",
                  "Account for K⁺ from all sources (IV fluids, TPN) in dose calculations",
                  "Chronic hypokalaemia = profound total body deficit; replacement may take several days",
                  "!!ECG changes (U waves, T wave flattening, ST depression) + hypokalaemia → contact CCOT immediately",
                ],
              },
              {
                heading: "Arrhythmia Risk Groups",
                type: "list",
                groups: [
                  {
                    icon: "immediate", label: "High-risk groups — even mild hypokalaemia dangerous",
                    items: [
                      "Ischaemic heart disease, heart failure, or LV hypertrophy — even mild hypokalaemia increases arrhythmia risk",
                      "Liver cirrhosis — hypokalaemia increases ammonia production and risk of hepatic encephalopathy",
                      "!!Digoxin: hypokalaemia increases digoxin toxicity and arrhythmogenic potential — treat as severe hypokalaemia and check digoxin levels",
                    ],
                  },
                ],
              },
              {
                heading: "Oral / Enteral Replacement",
                type: "list",
                groups: [
                  {
                    icon: "drug", label: "Preparations in order of preference",
                    items: [
                      "**1st line — Sando® K effervescent tablets**: 12 mmol/tablet. Dissolves in water; can be given via enteral feeding tubes. Take with or after food",
                      "**2nd line — Kay-Cee-L® syrup**: 5 mmol/5ml. Use if Sando® K not tolerated",
                      "**3rd line — KCl 600mg MR tablets (unlicensed)**: 8 mmol/tablet. Swallow whole with fluid during meals, sitting upright. Risk of intestinal ulceration — follow Trust unlicensed medicines policy",
                      "Jejunal route: Sando® K preferred; jejunal bioavailability may be reduced",
                    ],
                  },
                  {
                    icon: "management", label: "When to use IV instead of oral",
                    items: [
                      "Patient cannot tolerate oral/enteral therapy",
                      "Not achieving adequate rise in K⁺ in a clinically acceptable time",
                      "Use KCl 20–40 mmol/L infusion — see IV section for rates",
                      "!!Do NOT use glucose infusions as initial vehicle — glucose lowers K⁺",
                    ],
                  },
                ],
              },
              {
                heading: "IV Replacement — Severe / Symptomatic / ECG Changes",
                type: "callouts",
                panels: [
                  {
                    label: "Standard IV regimen",
                    color: "#742a2a",
                    headerBg: "#fff5f5",
                    blocks: [
                      {
                        icon: "drug", heading: "KCl 40 mmol/L in NaCl 0·9% — standard preparation", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "Give over 4–6 hours per bag, repeated as required",
                          "Max total daily dose: 2–3 mmol K⁺/kg body weight in 24 hours",
                          "Repeat venous blood gas and serum K⁺ at end of initial treatment",
                          "Step down once K⁺ persistently >3·0–3·5 mmol/L and symptoms resolved",
                          "!!A rate-controlled infusion pump (volumetric or syringe pump) MUST be used for ALL potassium infusions — use DERS guardrails on Alaris pumps",
                          "!!Do NOT use glucose as infusion vehicle",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Rate & concentration limits",
                    color: "#2563a8",
                    headerBg: "#e8f0fb",
                    blocks: [
                      {
                        icon: "management", heading: "Peripheral line", color: "#2563a8", bg: "#e8f0fb", border: "#93b4e8",
                        items: [
                          "Standard max rate: 20 mmol/hour",
                          "Exceptional max rate: 40 mmol/hour — continuous ECG monitoring required",
                          "Standard concentration: 40 mmol/L (usual bags)",
                          "Exceptional concentration: 80 mmol/L — senior staff authorisation only",
                          "Concentrations >40 mmol/L are painful — use largest suitable vein",
                        ],
                      },
                      {
                        icon: "management", heading: "Central venous (concentrated K⁺ areas only)", color: "#2563a8", bg: "#e8f0fb", border: "#93b4e8",
                        items: [
                          "Standard max rate: 20 mmol/hour",
                          "Exceptional max rate: 40 mmol/hour — continuous ECG monitoring required",
                          "20 mmol in 20ml or 50 mmol in 50ml — treated as CD, restricted areas only",
                          "!!Concentrated potassium: refer to NUH Code of Practice (Medicines Code Chapter 25) for approved stock-holding areas",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Available pre-mixed solutions",
                    color: "#276749",
                    headerBg: "#f0fff4",
                    blocks: [
                      {
                        icon: "drug", heading: "Standard concentrations", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: [
                          "10 mmol/500ml — NaCl 0·9%, Glucose 5%, Glucose 10%, Glucose 5%/NaCl 0·9%",
                          "20 mmol/500ml — NaCl 0·9%, Glucose 5%, Glucose 10%, Glucose 5%/NaCl 0·9%",
                          "20 mmol/1L — NaCl 0·9%, Glucose 5%, Glucose 4%/NaCl 0·18%",
                          "40 mmol/1L — NaCl 0·9%, Glucose 5%, Glucose 4%/NaCl 0·18%",
                        ],
                      },
                      {
                        icon: "avoid", heading: "High concentration — senior medical staff authorisation required", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "40 mmol/500ml (= 80 mmol/L) — NaCl 0·9% only",
                          "60 mmol/1L (0·45% w/v) — NaCl 0·9% only",
                          "!!Rate-controlled infusion pump MUST be used for ALL potassium infusions",
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                heading: "Monitoring & Adverse Effects",
                type: "list",
                groups: [
                  {
                    icon: "monitoring", label: "Monitoring during replacement",
                    items: [
                      "Oral: daily serum K⁺ until in range (~3 days)",
                      "IV routine: check K⁺ after every 40–80 mmol; minimum once daily",
                      "Check Mg²⁺ — correct if low",
                      "Infusion site: check regularly for pain, redness, inflammation — avoid extravasation",
                      "Digoxin patients: check digoxin levels",
                      "Account for K⁺ from all IV fluids and TPN in calculations",
                    ],
                  },
                  {
                    icon: "avoid", label: "Adverse effects of IV potassium",
                    items: [
                      "Hyperkalaemia — especially in renal impairment",
                      "Fluid overload from rapid infusions — high risk in heart failure or IHD",
                      "!!Cardiac arrhythmias / sudden cardiac death — risk increased with rapid IV replacement; continuous ECG required if rate >20 mmol/hr",
                      "Phlebitis — concentrations >40 mmol/L are painful; use largest suitable vein",
                      "Extravasation and tissue damage — more likely with higher concentrations",
                    ],
                  },
                  {
                    icon: "referral", label: "Renal impairment caution",
                    items: [
                      "Replace K⁺ cautiously in renal impairment — risk of hyperkalaemia due to impaired excretion",
                      "!!Contact renal team if patient is on dialysis, CKD stage 4/5 (GFR <30), or AKI stage 2/3",
                    ],
                  },
                ],
              },
              {
                heading: "Causes & Drug Causes",
                type: "callouts",
                panels: [
                  {
                    label: "Causes of Hypokalaemia",
                    color: "#744210",
                    headerBg: "#fffff0",
                    blocks: [
                      {
                        icon: "management", heading: "General causes", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: [
                          "Inadequate diet: anorexia, malnutrition, bulimia",
                          "High dietary sodium intake",
                          "GI loss: diarrhoea, vomiting, ileostomy, intestinal fistulae",
                          "Renal losses including dialysis",
                          "Urinary loss in congestive heart failure",
                          "Hypomagnesaemia",
                          "Endocrine: hyperaldosteronism, Cushing's syndrome, ectopic ACTH (e.g. small cell lung cancer)",
                          "Metabolic alkalosis",
                          "Transcellular shift (K⁺ movement from serum into cells)",
                        ],
                      },
                      {
                        icon: "drug", heading: "Drug causes (contact Pharmacy Medicines Information ext 84185 for full list)", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: [
                          "Transcellular shift: beta-agonists, aminophylline, theophylline, verapamil, insulin (esp. DKA treatment), caffeine",
                          "Increased renal K⁺ loss: loop diuretics, high-dose thiazides, metolazone, indapamide, corticosteroids, cisplatin, AmBisome, aminoglycosides, high-dose penicillins, foscarnet",
                          "GI loss: laxative abuse",
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                heading: "Investigations",
                type: "list",
                groups: [
                  {
                    icon: "investigations", label: "Key investigations",
                    items: [
                      "ECG strongly recommended in: severe/symptomatic hypokalaemia, cardiac disease, or renal impairment",
                      "U&Es, bicarbonate, chloride, glucose",
                      "**Magnesium levels** — failure to correct K⁺ despite treatment may be due to hypomagnesaemia",
                      "Spot urine K⁺ if cause unclear: >15–20 mmol/L suggests renal loss",
                      "Unexplained renal loss ± hypertension: refer to investigate for Bartter's or Liddle's syndromes",
                      "Hypertensive patients: consider Endocrinology referral to exclude Conn's and Cushing's syndrome",
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "elec-hyperkalaemia",
            title: "Hyperkalaemia",
            category: "Potassium",
            version: "9",
            authors: "Emily Payne (Clinical Pharmacist); reviewed Dr Charlotte Bebb (Consultant Renal Medicine), Selina Ladak (Lead Pharmacist for Medication Safety & Governance)",
            evidenceBase: "NUH Guideline 1352 | Version 9 | Revised December 2022, Amended September 2024 | Review: September 2027 | Excludes DKA and Paediatrics",
            summary: "Hyperkalaemia: K⁺ ≥6·0 mmol/L (≥6·5 in dialysis patients). ECG changes = emergency — do NOT delay treatment. Three steps: (1) Protect heart — calcium gluconate 10% 30ml over 10 min, (2) Shift K⁺ into cells — Actrapid® 10 units in 50ml glucose 50% over 30 min ± salbutamol 10–20mg nebulised, (3) Remove K⁺ — Lokelma® 10g TDS up to 72h. Monitor blood glucose for 12 hours post insulin-glucose.",
            tags: ["Hyperkalaemia", "Potassium", "Calcium gluconate", "Actrapid", "Insulin glucose", "Lokelma", "Salbutamol", "Sodium bicarbonate", "ECG", "Dialysis", "CCOT", "Pseudohyperkalaemia"],
            related: ["elec-hypokalaemia", "elec-hypomagnesaemia"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=758ca78e4708c7d0b87b6209446c66d0",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=9682&query_desc=hyperkalaemia",
            updated: "September 2027 (review)",
            sections: [
              {
                heading: "⚠ Initial Assessment & Escalation",
                type: "alert",
                items: [
                  "Assess patient using the ABCDE approach",
                  "12-lead ECG and monitor cardiac rhythm if K⁺ ≥6·0 mmol/L",
                  "Exclude pseudohyperkalaemia — send Whole Blood Potassium (WBK) in green Lithium-Heparin tube",
                  "Dialysis patients: hyperkalaemia defined as K⁺ ≥6·5 mmol/L — refer to renal team, request continuous 3-lead ECG",
                  "!!If significant hyperkalaemia or ECG changes: DO NOT delay treatment awaiting repeat result or specialist review",
                  "Out of hours: lab escalates to H24 who will alert prescriber and escalate to CCOT if required",
                  "!!Use the Hyperkalaemia prescription chart for calcium gluconate and insulin-glucose treatment (available on ward or print from intranet)",
                ],
              },
              {
                heading: "Severity Classification",
                type: "grader",
                grades: [
                  { grade: 1, label: "Mild", color: "#744210", bg: "#fffff0", border: "#f6e05e", criteria: ["K⁺ 5·5–5·9 mmol/L", "Consider cause and need for treatment"] },
                  { grade: 2, label: "Moderate", color: "#7b341e", bg: "#fff5f0", border: "#fbd38d", criteria: ["K⁺ 6·0–6·4 mmol/L", "Management guided by clinical condition, ECG, and rate of rise"] },
                  { grade: 3, label: "Severe", color: "#742a2a", bg: "#fff5f5", border: "#fc8181", criteria: ["K⁺ ≥6·5 mmol/L", "!!Emergency treatment indicated", "ECG changes at any level = treat as severe"] },
                ],
                management: [
                  { grade: 1, icpi: null, items: ["Consider cause and need for treatment", "Stop potassium-containing/sparing drugs", "Review diet and medications", "Monitor K⁺ and renal function"] },
                  { grade: 2, icpi: null, items: ["Request urgent 12-lead ECG", "Repeat K⁺ + Whole Blood Potassium (green Lithium-Heparin tube)", "Repeat K⁺ can be confirmed by venous blood gas to avoid delay", "If ECG changes: treat as severe immediately", "If no ECG changes: reduce total body K⁺ (diet, stop offending drugs, Lokelma® if cause not identified/corrected)", "Consider insulin-glucose if severe AKI, persistent high K⁺, or unwell", "Recheck K⁺ after 4–6 hours then daily"] },
                  { grade: 3, icpi: null, items: ["!!Do NOT delay treatment awaiting repeat results or specialist review", "Request urgent 12-lead ECG + continuous cardiac monitoring", "Repeat K⁺ + Whole Blood Potassium (green tube)", "Step 1: Calcium gluconate 10% 30ml over 10 min — protect heart", "Step 2: Actrapid® 10 units in 50ml glucose 50% over 30 min — shift K⁺ into cells", "Step 3: Lokelma® 10g TDS PO up to 72h — remove K⁺", "Monitor blood glucose for 12 hours post insulin-glucose", "Recheck K⁺ at 2h via VBG, then 4–6h, then daily", "If K⁺ ≥6·5 despite treatment or patient anuric: contact Renal SpR on-call urgently"] },
                ],
                note: "ECG changes in hyperkalaemia: tall peaked T waves, flattening/loss of P waves, broadening of QRS complexes, bradycardia, sine wave, VT.",
              },
              {
                heading: "Step 1 — Protect the Heart",
                type: "callouts",
                panels: [
                  {
                    label: "Calcium Gluconate 10% — if K⁺ ≥6·5 mmol/L or ECG changes",
                    color: "#742a2a",
                    headerBg: "#fff5f5",
                    blocks: [
                      {
                        icon: "immediate", heading: "30ml IV over 10 minutes — undiluted via syringe pump", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "If no syringe pump: give as 3 × 10ml boluses over 10 minutes",
                          "Doctor must stay near patient during administration",
                          "Does NOT lower serum K⁺ — protects cardiac membrane only",
                          "ECG changes should improve within 1–3 minutes; effect lasts ~30 minutes",
                          "!!Digoxin: give slowly — mix with 100ml 5% glucose and give over 60 minutes (rapid calcium may precipitate digoxin toxicity)",
                          "Cardiac arrest only: calcium chloride 10% 10ml (6·8 mmol) from cardiac arrest box — more irritant peripherally",
                          "!!Never give calcium gluconate at same time as sodium bicarbonate or insulin-glucose via the same access site — risk of precipitation",
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                heading: "Step 2 — Shift K⁺ Into Cells",
                type: "callouts",
                panels: [
                  {
                    label: "Actrapid® insulin + glucose — first line",
                    color: "#744210",
                    headerBg: "#fffff0",
                    blocks: [
                      {
                        icon: "drug", heading: "10 units Actrapid® in 50ml glucose 50% — IV over 30 minutes via syringe pump", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: [
                          "Give into a large vein — irritant. Monitor for phlebitis if 50% glucose given peripherally",
                          "Reduces serum K⁺ by 0·65–1·0 mmol/L",
                          "If pre-treatment blood glucose <7 mmol/L: also give 250ml glucose 10% at 50ml/hour for 5 hours to prevent hypoglycaemia",
                          "Monitor blood glucose before and after infusion, every 15–30 minutes and hourly for up to 12 hours — risk of late hypoglycaemia",
                          "If BM <4 mmol/L: treat per NUH hypoglycaemia guideline",
                          "!!Two-person check required for preparation",
                          "!!Insulin-glucose is a HOLDING MEASURE only — does not treat the underlying cause",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Adjuncts — salbutamol and sodium bicarbonate",
                    color: "#744210",
                    headerBg: "#fffff0",
                    blocks: [
                      {
                        icon: "drug", heading: "Salbutamol 10–20mg nebulised", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: [
                          "Additive effect to insulin-glucose — optional, must NOT be used as single agent",
                          "Reduces K⁺ by 0·53–0·88 mmol/L (inconsistent response)",
                          "Caution: ischaemic heart disease, cardiac arrhythmias (avoid or use lower dose)",
                          "Response reduced in patients on β-blockers or digoxin",
                        ],
                      },
                      {
                        icon: "drug", heading: "Sodium bicarbonate 1·4% 500ml IV over 2 hours", color: "#744210", bg: "#fffff0", border: "#f6e05e",
                        items: [
                          "!!Only if pH <7·2 AND on advice of Renal Registrar or Critical Care — do not use routinely",
                          "Risk of sodium/fluid overload (pulmonary oedema)",
                          "Risk of tetany in chronic renal failure with underlying hypocalcaemia",
                          "!!Never give via same access site as IV calcium — precipitation risk",
                          "CKD with HCO₃⁻ <22 mmol/L: consider sodium bicarbonate 1g PO BD (caution in fluid overload/hypertension — seek Renal advice)",
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                heading: "Step 3 — Remove K⁺ From the Body",
                type: "list",
                groups: [
                  {
                    icon: "management", label: "Reduce K⁺ intake",
                    items: [
                      "Low potassium diet — order appropriate renal diet. City: ext 77139 | QMC: ext 81628",
                      "Stop all potassium-containing/sparing drugs",
                      "Avoid fluids containing potassium (e.g. Hartmann's) — use NaCl 0·9% preferably",
                    ],
                  },
                  {
                    icon: "management", label: "Promote urinary K⁺ loss",
                    items: [
                      "Monitor fluid balance and encourage good urine output — ensure adequate hydration",
                      "Treat hypotension — review antihypertensives on drug chart",
                      "If well hydrated: consider starting or increasing a loop diuretic",
                    ],
                  },
                  {
                    icon: "drug", label: "Potassium binders",
                    items: [
                      "**Lokelma® (sodium zirconium cyclosilicate) 10g PO TDS** up to 72 hours — NICE TA599. Onset 1 hour, median resolution 2·2 hours. Reduces K⁺ by 0·81–1·10 mmol/L",
                      "Empty sachet into ~45ml water, stir well (powder will not dissolve), drink while cloudy. If settles, stir again",
                      "Consider stopping Lokelma® when K⁺ <6·0 mmol/L. Stop when K⁺ ≤5·5 mmol/L or after 72 hours",
                      "Caution: separate anti-retrovirals, tyrosine kinase inhibitors, and azole antifungals by 2 hours before and after Lokelma®",
                      "If unable to take orally: Calcium Resonium® 30g BD rectally — contact ward/on-call pharmacist for guidance",
                      "!!Potassium binders may not be necessary if obvious cause has been identified and corrected",
                    ],
                  },
                  {
                    icon: "immediate", label: "Dialysis",
                    items: [
                      "Required if patient does not respond to above measures",
                      "!!LIKELY NEEDED IF: K⁺ very high, patient oligo/anuric, already on long-term dialysis, or advanced CKD",
                      "Contact Renal Registrar/Consultant on-call urgently",
                    ],
                  },
                ],
              },
              {
                heading: "Monitoring & Drug Reference",
                type: "callouts",
                panels: [
                  {
                    label: "Post-treatment monitoring",
                    color: "#2563a8",
                    headerBg: "#e8f0fb",
                    blocks: [
                      {
                        icon: "monitoring", heading: "K⁺ and glucose checks", color: "#2563a8", bg: "#e8f0fb", border: "#93b4e8",
                        items: [
                          "Recheck K⁺ after 2 hours via VBG — confirm with lab results",
                          "K⁺ <6·0 mmol/L: repeat K⁺ and renal function after 4–6 hours then daily",
                          "K⁺ 6·0–6·4 mmol/L: consider repeating insulin-glucose",
                          "K⁺ ≥6·5 mmol/L despite medical therapy: contact Renal SpR on-call urgently — consider dialysis",
                          "Blood glucose: monitor regularly for 12 hours after insulin-glucose infusion",
                          "Ensure adequate hydration and monitor urine output",
                          "Stop all potassium-containing/sparing drugs; ensure low K⁺ diet",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Drug mechanisms & timing",
                    color: "#276749",
                    headerBg: "#f0fff4",
                    blocks: [
                      {
                        icon: "drug", heading: "Treatment summary", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                        items: [
                          "Calcium gluconate: antagonises cardiac membrane excitability — onset 1–3 min, duration 30–60 min",
                          "Actrapid® + glucose: intracellular K⁺ uptake via Na-K ATPase — onset within 15 min (peak 30–60 min), duration 2–6h, reduces K⁺ by 0·65–1·0 mmol/L",
                          "Nebulised salbutamol: Na-K ATPase pump — onset within 30 min (max 60 min), duration 1–3h, reduces K⁺ by 0·53–0·88 mmol/L",
                          "Lokelma® (sodium zirconium cyclosilicate): selective K⁺ binding — onset 1h, reduces K⁺ by 0·81–1·10 mmol/L",
                          "Calcium Resonium®: ion exchange resin — onset 2–6h, duration 4–6h",
                          "Sodium bicarbonate: corrects acidosis, promotes intracellular K⁺ shift — onset after 60 min (variable)",
                        ],
                      },
                    ],
                  },
                  {
                    label: "Drugs that raise K⁺ — review and stop if possible",
                    color: "#742a2a",
                    headerBg: "#fff5f5",
                    blocks: [
                      {
                        icon: "avoid", heading: "Stop or review", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                        items: [
                          "Potassium supplements (IV and oral)",
                          "ACE inhibitors, Angiotensin II receptor blockers",
                          "Mineralocorticoid receptor antagonists (spironolactone, eplerenone)",
                          "Entresto (sacubitril/valsartan)",
                          "Potassium-sparing diuretics (amiloride)",
                          "Trimethoprim/co-trimoxazole",
                          "Non-selective beta-blockers, NSAIDs",
                          "Salt substitutes (Lo-Salt)",
                          "Heparins; digoxin (in toxicity)",
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                heading: "Causes of Hyperkalaemia",
                type: "list",
                groups: [
                  {
                    icon: "management", label: "Causes",
                    items: [
                      "**Pseudohyperkalaemia**: haemolysis (samples must arrive at lab within 5h — NEVER refrigerate), EDTA contamination, prolonged tourniquet, marked leucocytosis/thrombocytosis (use whole blood K⁺ in green tube), sample from drip arm",
                      "Acute kidney injury / Chronic kidney disease",
                      "Drugs — see Drugs that raise K⁺ above",
                      "Acidosis (excluding DKA — follow separate DKA guideline)",
                      "Mineralocorticoid deficiency (Addison's disease)",
                      "Endogenous release: tumour lysis syndrome, rhabdomyolysis, trauma, burns",
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "electrolytes-sodium",
        label: "Sodium",
        guidelines: [
          {
            id: "elec-hyponatraemia",
            title: "Hyponatraemia",
            category: "Sodium",
            version: "1",
            authors: "Dr J Clayton",
            evidenceBase: "NUH Guidelines for the Initial Assessment and Management of Hyponatraemia in Adults | Submission: Oct 2023 | Review: Dec 2026",
summary: "Significant hyponatraemia: Na⁺ below 130 mmol/L. Symptoms usually occur below 125 mmol/L. Acute hyponatraemia is less well tolerated than chronic. Aetiology is often multifactorial — take a thorough drug history. Limit Na⁺ rise to ≤10 mmol/L in first 24h and ≤8 mmol/L each subsequent 24h. Management guided by: (1) severity of symptoms, (2) chronicity (acute under 48h, chronic over 48h), (3) volume status. See drug list at bottom for medications that cause hyponatraemia.",
            summaryCalcLink: null,
            tags: ["Hyponatraemia", "Sodium", "SIADH", "Hypertonic saline", "Fluid restriction", "Demeclocycline", "Osmolality", "Euvolaemic", "Hypovolaemic", "Hypervolaemic"],
            related: [],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=786cc3d7d2e296257072bbf1dcdc2ef7",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10457&query_desc=an%2Cphr%3A6198",
            updated: "December 2026 (review)",
            sections: [
  {
    heading: "⚠ SEVERE HYPONATRAEMIA — Medical Emergency",
    type: "alert",
    items: [
      "!!Seizures, coma, altered GCS or encephalopathy: needs urgent Level 2/3 bed and IV hypertonic saline 2·7% 150ml over 20 minutes — see Severe Hyponatraemia in the diagnostic pathway below",
      "See full drug list at the bottom of this guideline for medications that cause hyponatraemia",
    ],
  },
  {
    heading: "History & Assessment",
    type: "hypo_assessment",
    blocks: [
      {
        id: "history",
        label: "History",
        icon: "history",
        items: [
          "Symptoms: nausea and vomiting, headache, muscle cramps, confusion, lethargy, reduced GCS, seizures",
          "Consider context: known cancer, polydipsia, recent surgery or IV fluids",
          "**Accurate drug history essential** — see drug list at bottom of this guideline for common precipitants",
          "Common precipitants: diuretics (predominantly thiazides), antidepressants, antipsychotics, anticonvulsants, PPIs",
          "Determine chronicity: **acute <48h, chronic >48h** — treat as chronic if unclear and no severe symptoms",
        ],
      },
      {
        id: "examination",
        label: "Examination — Assess Fluid Status",
        icon: "management",
        items: [
          "**Hypovolaemic**: reduced skin turgor, dry mucous membranes, low BP or postural hypotension",
          "**Euvolaemic**: clinically normal fluid status",
          "**Hypervolaemic**: oedema, raised JVP, ascites",
        ],
      },
      {
        id: "investigations",
        label: "Investigations — Screening Panel (All Patients)",
        icon: "investigations",
        checklist: true,
        items: [
          "U&Es, glucose, plasma osmolality",
          "LFTs, TFTs, lipids, cortisol",
          "Urine osmolality",
          "Urine Na⁺ + K⁺",
          "Short Synacthen test, CXR, CT head — as clinically indicated",
        ],
      },
    ],
  },
  {
    heading: "Diagnostic Pathway",
    type: "hypo_diagnostic",
  },
  {
    heading: "Management — All Patients",
    type: "callouts",
    panels: [
      {
        label: "Universal Measures — Apply Regardless of Cause",
        color: "#2563a8",
        headerBg: "#e8f0fb",
        blocks: [
          {
            icon: "immediate",
            heading: "Apply to all patients immediately",
            color: "#2563a8", bg: "#e8f0fb", border: "#93b4e8",
            items: [
              "Ensure no sampling errors (e.g. drip arm venepuncture) — recheck sodium if in doubt",
              "Stop non-essential offending medications and review IV fluids",
              "Stop hypotonic fluids immediately",
              "**Limit Na⁺ rise to ≤10 mmol/L in the first 24h and ≤8 mmol/L in each subsequent 24h**",
              "Recheck Na⁺ at 6, 12, 24 and 48 hours",
              "Check TFTs and cortisol — treat if abnormal",
              "Treat the underlying cause",
            ],
          },
        ],
      },
      {
        label: "Never Do",
        color: "#742a2a",
        headerBg: "#fff5f5",
        blocks: [
          {
            icon: "avoid",
            heading: "Absolute limits — never exceeded",
            color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
            items: [
              "!!Do NOT correct Na⁺ faster than 10 mmol/L per 24h — risk of osmotic demyelination syndrome (ODS/CPM)",
              "!!Do NOT aim to normalise sodium — aim to IMPROVE SYMPTOMS only in acute severe hyponatraemia",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Acute Hyponatraemia (<48 hours) — Without Severe Features",
    type: "callouts",
    note: "Treat as chronic if onset uncertain and no severe features. In haemodynamic compromise, rapid fluid resuscitation takes precedence over rate-of-rise considerations.",
    panels: [
      {
        label: "Hypovolaemic",
        color: "#742a2a",
        headerBg: "#fff5f5",
        blocks: [
          {
            icon: "immediate",
            heading: "Restore volume — IV 0·9% NaCl",
            color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
            items: [
              "Restore volume with IV 0·9% sodium chloride",
              "Stop non-essential offending medications",
              "Treat the underlying cause",
              "Recheck Na⁺ after 4 hours to determine trend",
              "Limit Na⁺ rise to ≤10 mmol/L in first 24h, ≤8 mmol/L each subsequent 24h",
              "!!Haemodynamic compromise: need for rapid resuscitation overrides risk of overly rapid Na⁺ rise",
            ],
          },
        ],
      },
      {
        label: "Euvolaemic",
        color: "#2563a8",
        headerBg: "#e8f0fb",
        blocks: [
          {
            icon: "management",
            heading: "Diagnose cause and manage accordingly",
            color: "#2563a8", bg: "#e8f0fb", border: "#93b4e8",
            items: [
              "Stop non-essential offending medications and review IV fluids",
              "Stop hypotonic fluids",
              "Check TFTs and cortisol — treat if abnormal",
              "Recheck sodium after 4 hours to determine trend",
              "Limit Na⁺ rise to ≤10 mmol/L in first 24h, ≤8 mmol/L each subsequent 24h",
            ],
          },
        ],
      },
      {
        label: "Hypervolaemic",
        color: "#276749",
        headerBg: "#f0fff4",
        blocks: [
          {
            icon: "management",
            heading: "Treat underlying cause + fluid restrict",
            color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
            items: [
              "Treat the underlying cause: heart failure, cirrhosis, nephrotic syndrome",
              "Consider fluid restriction to prevent further fluid overload",
              "Stop non-essential offending medications",
              "Monitor Na⁺ regularly",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Chronic Euvolaemic Hyponatraemia (>48h) — Management Algorithm",
    type: "callouts",
    note: "Most commonly SIADH — exclude thyroid and adrenal dysfunction first.",
    panels: [
      {
        label: "Step 1 — Check Urine Na⁺",
        color: "#2563a8",
        headerBg: "#e8f0fb",
        blocks: [
          {
            icon: "investigations",
            heading: "Interpret urine Na⁺ to confirm euvolaemia",
            color: "#2563a8", bg: "#e8f0fb", border: "#93b4e8",
            items: [
              "Urine Na⁺ <30 mmol/L: reconsider — likely not truly euvolaemic",
              "Urine Na⁺ >30 mmol/L: proceed to Step 2",
            ],
          },
        ],
      },
      {
        label: "Step 2 — Thyroid & Adrenal Screen",
        color: "#744210",
        headerBg: "#fffff0",
        blocks: [
          {
            icon: "investigations",
            heading: "Check TFTs and cortisol ± short Synacthen test",
            color: "#744210", bg: "#fffff0", border: "#f6e05e",
            items: [
              "**Abnormal**: treat underlying thyroid, adrenal or pituitary disease",
              "**Normal**: likely SIADH — investigate underlying cause",
              "Consider CT chest/abdomen/pelvis/head to identify SIADH cause",
            ],
          },
          {
            icon: "immediate",
            heading: "SIADH — Diagnostic Criteria",
            color: "#744210", bg: "#fffff0", border: "#f6e05e",
            items: [
              "Clinically euvolaemic",
              "Serum osmolality <270 mOsm/kg",
              "Inappropriately concentrated urine >100 mOsm/kg (usually >300 mOsm/kg)",
              "Urine Na⁺ >30 mmol/L",
              "Absence of adrenal, thyroid, pituitary or renal insufficiency",
              "!!Interpret biochemistry with caution if patient is on diuretic therapy",
            ],
          },
        ],
      },
      {
        label: "Step 3 — Fluid Restriction (Furst Formula)",
        color: "#7b341e",
        headerBg: "#fff5f0",
        blocks: [
          {
            icon: "management",
            heading: "Calculate: (Urine Na⁺ + Urine K⁺) ÷ Serum Na⁺",
            color: "#7b341e", bg: "#fff5f0", border: "#fbd38d",
            items: [
              "Result **<0·5**: commence 1 litre fluid restriction",
              "Result **0·5–1·0**: commence 500ml fluid restriction",
              "Result **>1·0**: fluid restriction not advised",
            ],
          },
        ],
      },
      {
        label: "Step 4 — Monitor and Escalate",
        color: "#276749",
        headerBg: "#f0fff4",
        blocks: [
          {
            icon: "monitoring",
            heading: "Assess response at 24 and 48 hours",
            color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
            items: [
              "Target Na⁺ ≥130 mmol/L",
              "If poor response: consider **demeclocycline 150mg TDS** — review Na⁺ 24-hourly",
              "Seek specialist opinion (endocrinology) if not responding",
              "!!Do NOT correct faster than 10 mmol/L per 24h — risk of osmotic demyelination syndrome",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Drug Causes of Hyponatraemia",
    type: "callouts",
    panels: [
      {
        label: "Drugs causing acute hyponatraemia (<48 hours)",
        color: "#742a2a",
        headerBg: "#fff5f5",
        blocks: [
          {
            icon: "drug", heading: "High-risk — acute onset", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
            items: [
              "Recent thiazide prescription",
              "MDMA (3,4-methylenedioxymethamphetamine)",
              "Colonoscopy preparation",
              "IV cyclophosphamide",
              "Oxytocin",
              "Recently started desmopressin, terlipressin, or vasopressin",
            ],
          },
        ],
      },
      {
        label: "Drug classes associated with hyponatraemia",
        color: "#744210",
        headerBg: "#fffff0",
        blocks: [
          {
            icon: "drug", heading: "Antidepressants & Antipsychotics", color: "#744210", bg: "#fffff0", border: "#f6e05e",
            items: ["SSRIs, tricyclics, MAOIs", "Phenothiazines, butyrophenones"],
          },
          {
            icon: "drug", heading: "Anticonvulsants", color: "#744210", bg: "#fffff0", border: "#f6e05e",
            items: ["Carbamazepine", "Sodium valproate", "Lamotrigine"],
          },
          {
            icon: "drug", heading: "Anticancer drugs", color: "#744210", bg: "#fffff0", border: "#f6e05e",
            items: ["Vinca alkaloids", "Melphalan", "Cyclophosphamide", "Methotrexate", "Platinum compounds"],
          },
          {
            icon: "drug", heading: "Diuretics", color: "#744210", bg: "#fffff0", border: "#f6e05e",
            items: ["Thiazides (predominantly)", "Loop diuretics"],
          },
          {
            icon: "drug", heading: "Vasopressin analogues", color: "#744210", bg: "#fffff0", border: "#f6e05e",
            items: ["Desmopressin", "Oxytocin", "Terlipressin", "Vasopressin"],
          },
          {
            icon: "drug", heading: "Miscellaneous", color: "#744210", bg: "#fffff0", border: "#f6e05e",
            items: [
              "Opiates", "NSAIDs", "Amiodarone", "Clofibrate", "Interferon", "PPIs",
              "Antidiabetic: chlorpropamide, tolbutamide",
              "Contact Medicines Information ext 84185 or 81200 for full list",
            ],
          },
        ],
      },
    ],
  },
],
          },
        ],
      },
    ],
    get guidelines() {
      return this.subsites.flatMap(ss => ss.guidelines || []);
    },
  },

  {
    id: "procedures",
    label: "Procedures",
    color: "#5b4fcf",
    accent: "#f0effe",
    icon: (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <path d="M20 4L8.5 15.5M14.5 4.5l5 5M3 21l5-2L20 7a2 2 0 0 0-3-3L5 16l-2 5z"/>
  </svg>
),
    isParent: true,
    subsites: [
      
      {
            id: "proc-respiratory",
        label: "Respiratory",
        guidelines: [
          {
            id: "proc-pleurodesis",
            title: "Chemical Pleurodesis",
            category: "Respiratory",
            bodySite: "Respiratory",
            authors: "NUH — Step-by-Step Nursing & Clinical Procedure Guide",
            evidenceBase: "NUH Local Guidelines | BTS 2010 | Antunes et al 2003 | Roberts et al 2010 | UK Medicines Information",
            summary: "Chemical pleurodesis using sterile talc 4–5g in 50ml 0·9% saline. Pre-medicate with **oramorph 5–10mg** 1 hour before. Lidocaine 1% via drain: >75kg → 25ml, <75kg → 20ml. Talc is stable for **1 hour only** once in solution. After instillation, elevate drain over pillows for 10 min to distribute agent. **Never clamp a bubbling drain.**",
            tags: ["Pleurodesis", "Talc", "Chest drain", "Lidocaine", "Pleural effusion", "Respiratory", "Procedure"],
            related: [],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=18ad5b7f3eea3dda16851f36eca33517",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=9951",
            updated: "Current NUH edition",
            sections: [
              {
                heading: "⚠ Best Practice & Critical Safety",
                type: "alert",
                items: [
                  "Pleura must remain in contact with the sclerosing agent for adequate chemical pleurodesis — seek medical instruction before the procedure on how this will be achieved and document in notes",
                  "**NEVER clamp a bubbling chest drain** — risk of potentially fatal tension pneumothorax",
                  "Avoid NSAIDs — may reduce the inflammatory response required for pleurodesis success",
                  "Talc is stable for **1 hour only** once in solution — prepare immediately prior and do not leave unattended",
                ],
              },
              {
                heading: "Equipment",
                type: "proc_equip",
                items: [
                  { item: "Prescribed analgesia", detail: "Oramorph 5–10mg PO — give 1 hour pre-procedure" },
                  { item: "Prescribed premedication", detail: "As prescribed — to alleviate anxiety" },
                  { item: "Sclerosant", detail: "Talc 4g — dispensed with adaptor for syringe, on named patient basis" },
                  { item: "1% Lidocaine", detail: ">75kg → 25ml | <75kg → 20ml (max 250mg = 3mg/kg)" },
                  { item: "2 × 50ml syringes", detail: "For lidocaine and talc — label each clearly" },
                  { item: "Chloraprep® wands", detail: "70% isopropyl alcohol & 2% chlorhexidine" },
                  { item: "2 × drawing-up needles", detail: "For preparing solutions" },
                  { item: "100ml 0·9% saline", detail: "For talc reconstitution" },
                  { item: "Sterile dressing pack", detail: "With sterile gloves" },
                  { item: "Chest drain clamps", detail: "If required/available" },
                ],
              },
              {
                heading: "Procedure Steps",
                type: "proc_steps",
                note: "Perform in order. Senior clinician must be present for all steps involving the chest drain.",
                groups: [
                  {
                    label: "Preparation — Steps 1–4",
                    steps: [
                      { num: 1, action: "Obtain valid **informed consent**", rationale: "Medic with knowledge of procedure. Ensures patient understands and gives valid consent (NUH)", warning: null, note: null },
                      { num: 2, action: "Record baseline **NEWS2 score**", rationale: "Establishes a baseline for ongoing monitoring", warning: null, note: null },
                      { num: 3, action: "Consider **premedication** (BTS 2010)", rationale: "Alleviates anxiety and reduces pain associated with pleurodesis", warning: null, note: null },
                      { num: 4, action: "Ensure recent **CXR within 24h** has been reviewed by medical staff", rationale: "Confirms chest drain is correctly positioned and lung is fully expanded", warning: null, note: null },
                    ],
                  },
                  {
                    label: "Medications — Steps 5–6",
                    steps: [
                      { num: 5, action: "Ensure prescribed **talc and analgesia** are available. Talc: 4–5g sterile graded talc in 50ml 0·9% NaCl", rationale: "Talc dispensed on named patient basis on base wards", warning: null, note: null },
                      { num: 6, action: "Administer prescribed **analgesia** and allow time for effect — **oramorph 5–10mg**, 1 hour pre-procedure", rationale: "Pleurodesis creates a painful chemical pleurisy (Roberts et al 2010)", warning: null, note: "Avoid NSAIDs — may reduce inflammatory response required for pleurodesis success (Antunes et al 2003)" },
                    ],
                  },
                  {
                    label: "Drawing Up — Steps 7–9",
                    steps: [
                      { num: 7, action: "Draw up **1% lidocaine** into a 50ml syringe — **label clearly** and take directly to patient. Dose: **>75kg → 25ml; <75kg → 20ml**", rationale: "Distinguishes syringes and reduces risk of wrong-route error (UK Medicines Information)", warning: null, note: null },
                      { num: 8, action: "Prepare **talc solution immediately prior** to procedure — done by the medic performing the procedure, not left unattended", rationale: "Minimises wrong-route error risk. Talc stable for **1 hour only** once in solution", warning: null, note: null },
                      { num: 9, action: "Senior clinician draws up **50ml normal saline** into labelled syringe, injects into talc vial, shakes well for **5 minutes**, draws back into labelled 50ml syringe — take directly to bedside", rationale: "Clearly identifies solution and reduces wrong-route error risk", warning: "Do not leave talc syringe unattended", note: null },
                    ],
                  },
                  {
                    label: "Instillation — Steps 10–12",
                    steps: [
                      { num: 10, action: "**Position patient** comfortably with easy access to the affected side/drain", rationale: "Maintains comfort and allows access to drain", warning: null, note: null },
                      { num: 11, action: "Senior clinician shuts **3-way tap or clamps/kinks drain**, inserts syringe into chest drain tubing. Unclamp/release and administer **lidocaine via drain** to distribute anaesthetic", rationale: "Prevents air entering system. Distributes local anaesthetic across pleura", warning: "A BUBBLING CHEST DRAIN MUST NEVER BE CLAMPED — risk of fatal tension pneumothorax", note: null },
                      { num: 12, action: "Once lidocaine instilled, **elevate drainage tube over pillows** or shut 3-way tap. Leave to work for **10 minutes**", rationale: "Keeps pleura in contact with LA using gravity — avoids need for clamping and associated risks", warning: null, note: null },
                    ],
                  },
                ],
              },
              {
                heading: "References",
                type: "list",
                groups: [
                  {
                    icon: "management", label: "Evidence base",
                    items: [
                      "Antunes et al (2003): NSAIDs may reduce the inflammatory response in pleurodesis",
                      "BTS (2010): Guidelines on premedication for pleurodesis",
                      "Roberts et al (2010): Pleurodesis creates a painful chemical pleurisy",
                      "UK Medicines Information: Lidocaine dosing guidance",
                      "NUH: Nottingham University Hospitals NHS Trust local guidelines",
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      // ═══════════════════════════════════════════════════════════════════════════
// CLINGUIDE PATCH — Paracentesis guideline (Gastrointestinal subsite)
//
// WHERE TO INSERT IN App.jsx:
//   Find the `procedures` site near the bottom of the SITES array.
//   Inside its `subsites` array, AFTER the closing `},` of the
//   `proc-respiratory` subsite object, ADD a comma then paste the object below.
//
// The insertion point looks like this in the current file:
//
//       },      ← end of proc-respiratory subsite
//     ],         ← closes subsites array
//     get guidelines() {
//       return this.subsites.flatMap(ss => ss.guidelines || []);
//     },
//   },           ← end of procedures site
//
// Change it to:
//
//       },      ← end of proc-respiratory subsite
//       {       ← START PASTING HERE (the object below)
//         id: "proc-gastrointestinal",
//         ...
//       },      ← END PASTE
//     ],
//     get guidelines() {
// ═══════════════════════════════════════════════════════════════════════════

      {
        id: "proc-gastrointestinal",
        label: "Gastrointestinal",
        guidelines: [
          {
            id: "proc-paracentesis",
            title: "Paracentesis — Malignant Ascites (SDEC)",
            category: "Gastrointestinal",
            version: "2",
            authors: "Emma Beeton & Karen King, Acute Oncology ACP",
            evidenceBase: "NUH Guideline 3654 | Oncology Governance April 2026 | Review March 2031",
            summary: "Malignant ascites causes distressing symptoms — abdominal distension, breathlessness, nausea and pain. Paracentesis is an effective, well-established palliative procedure. This guideline is primarily designed for the CAS SDEC day-case setting but is applicable to inpatients. Patients must be mobile, self-caring, and fit to remain seated for up to 8 hours. Larger volumes requiring 'drain to dry' are likely to need inpatient admission.",
            tags: ["Paracentesis", "Ascites", "Malignant ascites", "SDEC", "Day case", "Drain", "Anticoagulation", "Interventional radiology"],
            related: [],
            calculators: [],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=4b82698a3d1fcc085a89d225f4b34d06",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10547&query_desc=an%2Cphr%3A6225",
            updated: "March 2031 (review)",
            sections: [
              // ── TOP ALERT ──────────────────────────────────────────────────
              {
                heading: "⚠ Patient Becomes Unwell During Drainage",
                type: "alert",
                items: [
                  "Clamp drain immediately — contact SDEC Fellow / Registrar / ACP",
                  "If BP drops >40 mmHg from baseline: clamp drain for 30 minutes, unclamp once BP recovered and patient feels well. Limit subsequent drainage to 1 L/hour",
                  "NEWS2 ≥7: discuss urgent admission with Oncology SpR on call",
                  "If patient is not fit for discharge by the time the medical team leaves SDEC: discuss with Oncology SpR on call — consider admission",
                ],
                note: "Do NOT wait before clamping — clamp first, then call.",
              },

              // ── INDICATIONS / CONTRAINDICATIONS ────────────────────────────
{
  heading: "Indications, Contraindications & SDEC Eligibility",
  type: "pills",
  items: [
        {
      label: "SDEC Eligibility",
      type: "callout",
      color: "#1a365d",
      bg: "#ebf8ff",
      border: "#63b3ed",
      notes: [
        "Confirmed MDT cancer diagnosis",
        "Mobile and self-caring",
        "Able to sit in recliner ≤8 hrs",
        "No concurrent admission indication",
        "No cirrhosis or decompensated liver disease",
        "Anticoagulation reviewed",
      ],
      footer: "Drain slots: Tuesday AM only (2 slots, 2026).",
    },

    {
      label: "✔  Indications",
      color: "#276749",
      bg: "#f0fff4",
      border: "#9ae6b4",
      indication: null,
      urgent: null,
      exclusions: null,
      notes: [
        "Diagnostic — fluid sampling for analysis",
        "Therapeutic — symptom relief (distension, breathlessness, bladder or vascular compression)",
        "Psychological benefit",
        "Day-case: small–moderate ascites drained over 4–6 hours",
      ],
    },

    {
      label: "✘  Contraindications",
      color: "#742a2a",
      bg: "#fff5f5",
      border: "#fc8181",
      indication: null,
      urgent: null,
      exclusions: [
        "Abnormal clotting (see lab thresholds in pre-procedure checklist below)",
        "Multiple abdominal scars or grossly distended bowel",
        "Localised inflammatory bowel disease",
        "Pregnancy",
      ],
    },

  ],
},

              // ── PRE-PROCEDURE CHECKLIST ─────────────────────────────────────
              {
                heading: "Pre-Procedure Baseline Checklist",
                type: "checklist",
                items: [
                  "Bloods taken (Monday preceding Tuesday drain slot): FBC + clotting only — no additional bloods unless requested by parent oncology team",
                  "Hb >80 g/L",
                  "Platelets >50 ×10⁹/L",
                  "APTT <35 s  and  PT <15 s",
                  "Anticoagulation paused/reviewed per tables below — patient contacted Friday prior by SDEC nursing team",
                  "IV access obtained",
                  "Baseline observations recorded: BP, pulse, temperature, SpO₂",
                  "Analgesia prescribed as required",
                  "Patient consented by IR team on arrival in IR suite (not on SDEC)",
                  "Drain insertion target: by 10:00",
                ],
              },

              // ── ANTICOAG: DOACs ─────────────────────────────────────────────
              {
                heading: "Anticoagulation — DOACs",
                type: "proc_equip",
                items: [
                  { item: "Rivaroxaban", detail: "Withhold day before and day of procedure. Withhold 2 days before if eGFR <30" },
                  { item: "Apixaban", detail: "Withhold 2 days before procedure and on day of procedure" },
                  { item: "Dabigatran", detail: "Withhold as per renal function — see NUH IR prep guideline (link in references)" },
                ],
              },

              // ── ANTICOAG: LMWH ─────────────────────────────────────────────
              {
                heading: "Anticoagulation — LMWH & Parenteral",
                type: "proc_equip",
                items: [
                  { item: "Enoxaparin ≤40 mg", detail: "✔ Continue prophylactic doses as normal" },
                  { item: "Enoxaparin >40 mg", detail: "Hold 24 hrs pre-procedure; hold 48 hrs pre-procedure if eGFR <30" },
                  { item: "Warfarin", detail: "See NUH Trust guidelines for peri-procedure INR management" },
                ],
              },

              // ── ANTICOAG: ANTIPLATELETS ─────────────────────────────────────
              {
                heading: "Anticoagulation — Antiplatelets",
                type: "proc_equip",
                items: [
                  { item: "Aspirin", detail: "✔ Continue as normal" },
                  { item: "Clopidogrel", detail: "Stop 7 days before procedure. If coronary stent placed <1 yr ago or recent MI: discuss with cardiology before stopping" },
                  { item: "Ticagrelor / Prasugrel", detail: "Stop 5–7 days before — discuss with cardiology if on dual antiplatelet therapy" },
                ],
              },

              // ── PROCEDURE STEPS ─────────────────────────────────────────────
              {
                heading: "Procedure Steps",
                type: "proc_steps",
                note: "Perform in order. Drain insertion target by 10:00. Day-case drainage over 4–6 hours.",
                groups: [
                  {
                    label: "Admission & Drain Insertion",
                    steps: [
                      {
                        num: 1,
                        action: "Admission to SDEC at **08:00–08:30**",
                        rationale: "Coordinated by oncology ACP / medical team",
                        warning: null, note: null,
                      },
                      {
                        num: 2,
                        action: "Double-check bloods reviewed within 24h: Hb >80, Plt >50, APTT <35, PT <15. Obtain IV access. Prescribe analgesia as required.",
                        rationale: "All thresholds must be met before proceeding to prevent placement when drain cannot safely be placed",
                        warning: null, note: null,
                      },
                      {
                        num: 3,
                        action: "Patient to IR suite — consent by IR team. Ascitic drain inserted by IR practitioners under imaging guidance. Target insertion by **10:00**",
                        rationale: "IR team confirm patient and insert drain. Consent occurs in the IR suite, not on SDEC",
                        warning: null, note: null,
                      },
                    ],
                  },
                  {
                    label: "Drainage on SDEC",
                    steps: [
                      {
                        num: 4,
                        action: "Patient returns to SDEC — record **immediate observations** (BP, pulse, SpO₂, temperature). Begin fluid balance chart and document drain output.",
                        rationale: "Establishes post-procedure baseline for comparison throughout drainage",
                        warning: null, note: null,
                      },
                      {
                        num: 5,
                        action: "Drain **1 L in the first hour** post-insertion. Monitor patient comfort and observations.",
                        rationale: "Controlled initial drainage — 1 hour monitoring before progressing to free drainage",
                        warning: null, note: null,
                      },
                      {
                        num: 6,
                        action: "After first hour: **free drainage** if patient well and BP stable. Alternatively: **1 L/hour** with hourly monitoring.",
                        rationale: "No evidence of increased complication rate with free vs slower drainage (Korpi et al 2018, Harvey et al 2023, Decruze et al 2010)",
                        warning: "If BP drops >40 mmHg from baseline OR patient reports dizziness / lightheadedness — clamp drain immediately and contact SDEC Fellow / Registrar / ACP",
                        note: null,
                      },
                      {
                        num: 7,
                        action: "**Hourly observations** until drain removal — unless patient becomes clinically unstable (then increase frequency). Document all drain output.",
                        rationale: "Monitor for complications: site infection, abdominal haematoma, fluid leak, bowel perforation, spontaneous bacterial peritonitis",
                        warning: null, note: null,
                      },
                    ],
                  },
                  {
                    label: "Drain Removal & Post-Procedure",
                    steps: [
                      {
                        num: 8,
                        action: "Remove drain at **16:00** (or when drainage stops — whichever comes first). Unlock self-locking drains before removal; if lock does not release, catheter may be cut to bypass mechanism. Drain does **not** need to reach dry.",
                        rationale: "Aims to drain maximum volume in shortest period while maintaining patient safety and minimising infection risk (Moore and Aithal 2006)",
                        warning: null, note: null,
                      },
                      {
                        num: 9,
                        action: "**Dress drain site** — stoma bag if ongoing leakage expected (ascites remains); soft-pore dressing for dry sites. A small amount of post-removal leakage is expected and manageable with a stoma bag.",
                        rationale: "Sites with residual ascites will continue to leak after removal — stoma bag prevents soiling; community nursing may be needed for daily bag changes",
                        warning: null, note: null,
                      },
                      {
                        num: 10,
                        action: "**Observations at 30 minutes** post-removal (sooner if unwell). Satisfactory obs + well → discharge. Unwell but stable obs → remain on unit 30 min further.",
                        rationale: "Ensures haemodynamic stability before discharge",
                        warning: "NEWS2 >7: discuss with Oncology SpR on call — consider admission",
                        note: "Give patient Rapid Response contact number and verbal safety-net before leaving",
                      },
                    ],
                  },
                ],
              },

              // ── NURSING RESPONSIBILITIES ────────────────────────────────────
              {
                heading: "Nursing Responsibilities",
                type: "list",
                groups: [
                  {
                    icon: "monitoring",
                    label: "Patient monitoring",
                    items: [
                      "Drain inserted in IR — patient returns to SDEC for all post-procedure care",
                      "Initiate fluid balance chart; document drain output at every observation",
                      "Baseline observations on return from IR; hourly thereafter until drain removed",
                      "Increase frequency of observations if patient becomes clinically unstable",
                    ],
                  },
                  {
                    icon: "drug",
                    label: "Drainage instructions",
                    items: [
                      "Drain 1 L in first hour post-insertion",
                      "After first hour: free drainage if patient well and BP stable. Alternatively: 1 L/hour with hourly monitoring",
                      "!!If patient unwell (dizzy, lightheaded) or BP drops >40 mmHg: clamp drain immediately and contact SDEC Fellow / Registrar / ACP",
                      "Subsequent drainage instructions directed by medical team",
                    ],
                  },
                  {
                    icon: "referral",
                    label: "Discharge safety-netting",
                    items: [
                      "Ensure patient has Rapid Response contact details before leaving",
                      "Advise patient to contact department if concerned at home",
                    ],
                  },
                ],
              },

              // ── DRESSINGS ───────────────────────────────────────────────────
              {
                heading: "Dressings Following Drain Removal",
                type: "list",
                groups: [
                  {
                    icon: "management",
                    label: "Dressing selection",
                    items: [
                      "**Ongoing leakage expected (ascites remains)**: stoma bag over site. May require daily district nursing review for bag changes. Convert to soft-pore dressing once leakage stops.",
                      "**Dry site / no leakage**: soft-pore dressing only.",
                    ],
                  },
                ],
              },

              // ── REFERENCES ──────────────────────────────────────────────────
              {
                heading: "References",
                type: "list",
                groups: [
                  {
                    icon: "management",
                    label: "Evidence base",
                    items: [
                      "Daga et al (2022) Clinical Radiology 77:689–693",
                      "Decruze et al (2010) J Palliative Care 13(3):251–254",
                      "Golo et al (2025) Eur J Gastroenterol Hepatol 37(12):1390–1395",
                      "Ha et al (2026) J Pharmacy Bioallied Sci 18:S147–9",
                      "Harvey et al (2023) Med J Australia 218(1)",
                      "Harding et al (2012) Br J Cancer 107:925–930",
                      "Hill (2013) Cancer Nursing Practice 12(5):14–20",
                      "Korpi et al (2018) J Palliative Care 21(6):836–840",
                      "Lister et al (2020) Royal Marsden Manual, 10th edn",
                      "Moore & Aithal (2006) Gut 55(Suppl 6):vi1–12",
                      "NUH (2019) Patient Preparation for IR Theatres — PDF: https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=4b82698a3d1fcc085a89d225f4b34d06 | Portal: https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10547&query_desc=an%2Cphr%3A6225",
                      "Qu et al (2016) Cardiovasc Interventional Radiol 39:711–716",
                      "Smith & Jayson (2003) Clin Oncology 15(2):59–72",
                      "Thomsen et al (2006) NEJM 355(19)",
                      "Wilkinson et al (2017) Oxford Handbook of Clinical Medicine, 10th edn",
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // ── Vascular Access ─────────────────────────────────────────────────────
      {
        id: "proc-vascular",
        label: "Vascular Access",
        guidelines: [

          // ── 1. Common Issues ─────────────────────────────────────────────────
          {
            id: "proc-picc-common-issues",
            title: "PICC & Midlines: Common Issues",
            category: "Vascular Access",
            bodySite: "Vascular",
            authors: "NUH Vascular Access Team",
            evidenceBase: "NUH Clinical Practice Guidelines for the Management of Midlines and Peripherally Inserted Central Catheters (PICC Lines) | Ratified 11/01/2021 | INS 2011 | RCN 2010 | NMC 2010",
            summary: "Summary reference for PICC and Midline patency problems, complications, and troubleshooting. Covers flushing technique, withdrawal occlusion, complete occlusion, mechanical phlebitis, catheter fracture, UEDVT, and sign/symptom troubleshooting. See linked guidelines for blood sampling and line removal procedures.",
            tags: ["PICC", "Midline", "Vascular access", "Flushing", "Occlusion", "Phlebitis", "DVT", "Patency", "Fibrin sheath", "Troubleshooting"],
            related: ["proc-picc-blood-samples", "proc-picc-removal", "vte-catheter-related-thrombosis"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=253b0b35e0485e35452f6fad836ad476",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10319&query_desc=picc%20lines",
            updated: "Ratified Jan 2021 (review Jan 2026)",

            sections: [
                            // ── CRITICAL SAFETY ──────────────────────────────────────────────
              {
                heading: "⚠ Critical Safety — Read First",
                type: "alert",
                items: [
                  { label: "NEVER use a syringe smaller than 10ml to establish catheter patency", detail: "Smaller syringes generate dangerously high pressures and risk catheter rupture. Once patency is confirmed, any size syringe may be used if no resistance is felt." },
                  { label: "NEVER force a flush or infusion", detail: "If resistance is felt, stop immediately — aspirate for blood return and investigate the cause." },
                  { label: "Always flush with ≥10ml 0.9% NaCl — pulse-pause technique", detail: "Required after every drug, IV infusion, and blood sample." },
                  { label: "Use a positive pressure finish", detail: "Clamp the line during the last pulse of flush to prevent blood reflux and intraluminal clot formation." },
                ],
              },

              // ── STEP 1: SIGNS & SYMPTOMS (2-col quick-ref at top) ────────────
              {
                heading: "Step 1 — Signs & Symptoms",
                type: "table",
                note: "Identify the presentation below, then follow Step 2 for management.",
                columns: ["Sign / Symptom", "Possible Cause"],
                rows: [
                  [
                    "🔴 Shortness of breath; coughing; chest pain",
                    "Air embolism — air has entered the bloodstream",
                  ],
                  [
                    "🔴 Blood leaking from catheter; visible damage to line",
                    "Catheter fracture or cut",
                  ],
                  [
                    "🔴 Arm swelling; pain in arm, shoulder, or neck",
                    "Deep vein thrombosis (UEDVT) or severe phlebitis",
                  ],
                  [
                    "Can't flush; resistance to infusion; sluggishness",
                    "Catheter occlusion — partial or complete; kinked or clamped line",
                  ],
                  [
                    "Blood inside needless connector; blood leaking from hub",
                    "Needless connector accidentally disconnected",
                  ],
                  [
                    "Fever; redness/swelling/discharge at insertion site",
                    "Catheter-related infection",
                  ],
                  [
                    "Redness; tenderness; swelling along catheter track",
                    "Mechanical phlebitis or local infection",
                  ],
                  [
                    "Pain or swelling when line used; fluid leaks from exit site on flushing",
                    "Catheter malposition; internal fracture; fibrin sheath",
                  ],
                  [
                    "Catheter line pulled out or position changed",
                    "Catheter malposition",
                  ],
                ],
              },

              // ── ARROW ────────────────────────────────────────────────────────
              { type: "flow_arrow", label: "Step 2: Management" },

              // ── STEP 2: PROBLEM CARDS ─────────────────────────────────────────
              {
                heading: "Step 2 — Common Problems & Management",
                type: "problem_cards",
                cards: [
                  {
                    problem: "Complete Catheter Occlusion (CCO)",
                    severity: "red",
                    cause: "Intraluminal thrombus; lipid/drug precipitate (TPN); kinked or clamped line; blocked needle-free device",
                    steps: [
                      "Check basics: look for kinks, an open clamp, and a blocked needle-free device. Ask patient to raise arm, take a deep breath, or tilt bed down.",
                      "Flush with a brisk pulse-pause technique using a 10ml+ syringe — **never force**. Aspirate for blood return.",
                      "If thrombotic: instil **Urokinase 2500 units/ml, 2ml per lumen** via 3-way connector; leave ≥60 minutes or overnight, then withdraw and flush. **Heparin is NOT thrombolytic** — it does not dissolve clot.",
                      "If lipid/drug precipitate (e.g. TPN): consult pharmacy for a suitable dissolving agent.",
                      "Seek **Vascular Access Team** advice before removing the line if problems persist.",
                    ],
                  },
                  {
                    problem: "Catheter Fracture / Leak",
                    severity: "red",
                    cause: "Tear, pinhole, or split in polyurethane catheter — most common near exit site or external portion",
                    steps: [
                      "**Clamp the catheter immediately** to reduce blood loss.",
                      "Contact the clinician.",
                      "Damaged catheters **cannot be repaired** — remove and replace.",
                    ],
                  },
                  {
                    problem: "Deep Venous Thrombosis — UEDVT",
                    severity: "red",
                    cause: "Catheter-related thrombosis of subclavian, axillary vein, or SVC — patients may be asymptomatic",
                    steps: [
                      "Confirm with **ultrasound**.",
                      "**Do NOT automatically remove** the line — weigh risks vs. benefits with the treating clinician and Vascular Access Practitioner.",
                      "Anticoagulate as directed by medical team.",
                      "Remove **immediately** only if clinical evidence of **Superior Vena Cava Obstruction** (unless no alternative access and IV treatment essential).",
                      "If removing in context of DVT: perform in a room with **O₂ and suction** — risk of pulmonary embolus.",
                    ],
                  },
                  {
                    problem: "Air Embolism",
                    severity: "red",
                    cause: "Air entered the bloodstream via disconnected or damaged line",
                    steps: [
                      "Place patient on **left side with head down** immediately.",
                      "Check clamp and entire line system for leaks.",
                      "**Contact clinician urgently** and initiate oxygen.",
                    ],
                  },
                  {
                    problem: "Withdrawal Occlusion (WO)",
                    severity: "amber",
                    cause: "Fibrin sheath (most common) or fibrin tail occluding catheter tip; catheter malposition; tip against vein wall; internal fracture",
                    steps: [
                      "**Confirm blood return before any IV therapy** — WO risks extravasation of vesicant/irritant drugs.",
                      "Try pulse-pause flush with 10ml+ syringe.",
                      "If malpositioned: **stop using for vesicants** — seek pharmacy and Vascular Access advice. A malpositioned PICC may be usable as a peripheral line if non-irritant drugs only.",
                    ],
                  },
                  {
                    problem: "Sluggish Flow",
                    severity: "amber",
                    cause: "Partial fibrin sheath; lipid build-up (TPN); drug precipitate; partial mechanical obstruction",
                    steps: [
                      "Flush well with pulse-pause technique using a 10ml+ syringe.",
                      "If TPN-related: consult pharmacy for a dissolving agent.",
                      "Consider saline challenge (250ml via infusion pump) if cause unclear.",
                      "Monitor for progression to complete occlusion (CCO).",
                    ],
                  },
                  {
                    problem: "Disconnected Needless Connector",
                    severity: "amber",
                    cause: "Needless connector accidentally detached — blood visible inside connector or leaking from hub",
                    steps: [
                      "**Clamp catheter immediately**.",
                      "Replace with a new needless connector — clean the hub with chlorhexidine wipe before connecting.",
                      "Flush the catheter with 0.9% NaCl.",
                    ],
                  },
                  {
                    problem: "Mechanical Phlebitis",
                    severity: "green",
                    cause: "Catheter movement within vein causing inflammation — typically within 10 days of insertion, presents in bicep region above PICC",
                    steps: [
                      "**PICC can remain in use** unless symptoms are severe.",
                      "Exclude thrombosis and infection: check for arm swelling, difficulty flushing, blood return, pyrexia, and exit site discharge.",
                      "Consider oral anti-inflammatory agents.",
                      "Remove only if symptoms are severe and unresponsive to treatment.",
                    ],
                  },
                  {
                    problem: "Catheter Malposition",
                    severity: "green",
                    cause: "PICC migrated from SVC — tip displaced into neck or subclavian vein (e.g. accidental pull). Signs: ear gurgling, chest pain, difficulty flushing/aspirating.",
                    steps: [
                      "**Stop using for irritant or vesicant drugs immediately**.",
                      "May be used as a peripheral device for non-irritant solutions — seek pharmacy advice.",
                      "**Do not remove without advice** — catheter may be exchangeable.",
                      "Confirm tip position with CXR.",
                    ],
                  },
                  {
                    problem: "Catheter-Related Infection",
                    severity: "amber",
                    cause: "Intraluminal or exit site infection — fever, redness, swelling, or discharge at insertion site",
                    steps: [
                      "Draw **blood cultures from catheter** and peripheral swabs from exit site.",
                      "Check for other possible infection sources.",
                      "Review with medical team — decision on line removal guided by clinical picture.",
                    ],
                  },
                ],
              },



              // ── FLUSHING TECHNIQUE ───────────────────────────────────────────
              {
                heading: "Flushing Technique",
                type: "list",
                groups: [
                  {
                    icon: "management",
                    label: "Key Principles",
                    items: [
                      { label: "Pulse-pause technique", detail: "Flush briskly then pause briefly after each ~1ml of saline — creates turbulent flow to clear the lumen (INS, 2011)" },
                      { label: "Positive pressure finish", detail: "Clamp the line while flushing the final 1ml — prevents blood reflux and intraluminal clot build-up" },
                      { label: "Volume: ≥10ml 0.9% Sodium Chloride", detail: "5ml Sodium Heparin (10 units/ml) may be added after if local policy requires" },
                      { label: "Flush after every: drug | IV infusion | blood sample", detail: "No exceptions — failure to flush is the most common cause of preventable occlusion" },
                      { label: "NEVER use a syringe smaller than 10ml to establish patency", detail: "High pressure risk — catheter rupture. Once patency confirmed, smaller syringes may be used only if no resistance is felt." },
                    ],
                  },
                ],
              },

              // ── REFERENCES ───────────────────────────────────────────────────
              {
                heading: "References",
                type: "list",
                groups: [
                  {
                    icon: "management",
                    label: "Evidence Base",
                    items: [
                      "NUH Clinical Practice Guidelines for the Management of Midlines and Peripherally Inserted Central Catheters (PICC Lines) — Ratified 11/01/2021, review Jan 2026",
                      "INS (2011): Infusion Nursing Standards of Practice — pulse-pause flushing and positive pressure technique",
                      "RCN (2010): Standards for Infusion Therapy — Urokinase instillation protocol",
                      "NMC (2010): Standards for Records and Record Keeping",
                    ],
                  },
                ],
              },
            ],
          },

          // ── 2. Blood Samples ─────────────────────────────────────────────────
          {
            id: "proc-picc-blood-samples",
            title: "PICC & Midlines: Blood Samples",
            category: "Vascular Access",
            bodySite: "Vascular",
            authors: "NUH Vascular Access Team",
            evidenceBase: "NUH Clinical Practice Guidelines for the Management of Midlines and Peripherally Inserted Central Catheters (PICC Lines) | Ratified 11/01/2021 | INS 2011 | NUH 2016 | NUH 2014 | NMC 2010",
            summary: "Step-by-step procedure for taking blood samples via a PICC line or Midline. Includes equipment checklist, aseptic technique, discard volume, pulse-pause flushing, and labelling requirements. Blood cultures must always be taken first — do not discard the initial aspirate.",
            tags: ["PICC", "Midline", "Blood sampling", "Vascular access", "Blood cultures", "Flushing", "Aseptic technique"],
            related: ["proc-picc-common-issues", "proc-picc-removal"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=253b0b35e0485e35452f6fad836ad476",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10319&query_desc=picc%20lines",
            updated: "Ratified Jan 2021 (review Jan 2026)",

            sections: [

              {
  heading: "⚠ Critical Safety",
  type: "alert",
  items: [
    { label: "NEVER use a syringe smaller than 10ml to establish catheter patency", detail: "Smaller syringes generate high pressures and risk catheter rupture." },
    { label: "Blood cultures — do NOT discard the initial 10ml aspirate", detail: "It carries important microbiological data. Culture sample must always be taken first before other samples." },
    { label: "Confirm patient identity and check for allergies before starting", detail: "Check for allergy to flush solution and chlorhexidine wipes." },
    { label: "Check flushes with a Registered Nurse before use"},
  ],
},,

              {
                heading: "Equipment",
                type: "proc_equip",
                items: [
                  { item: "Clean procedure tray", detail: "" },
                  { item: "Appropriate blood bottles + request forms", detail: "Check bottles required for each test before starting" },
                  { item: "2 × 10ml luer-lok syringes", detail: "One for 10ml discard volume; one spare" },
                  { item: "Appropriate-sized syringe for blood collection", detail: "Sized to total volume of blood required" },
                  { item: "10ml ampoule 0.9% Normal Saline ± 5ml Sodium Heparin (10 units/ml)", detail: "Or prefilled saline syringe. Check flush with a Registered Nurse (NUH, 2016)" },
                  { item: "2% chlorhexidine in 70% alcohol wipes", detail: "For line decontamination" },
                  { item: "Sterile paper towel", detail: "To place under line on patient's arm" },
                  { item: "Blunt filter needle", detail: "For drawing up" },
                  { item: "Non-sterile gloves + apron", detail: "Personal protection" },
                ],
              },

              {
                heading: "Procedure",
                type: "proc_steps",
                note: "Maintain aseptic technique throughout. Suspend any running infusions before sampling.",
                groups: [
                  {
                    label: "Preparation — Steps 1–4",
                    steps: [
                      { num: 1, action: "Explain the procedure, confirm **patient identity** and check for **allergies** (flush/cleansing agents)", rationale: "Verbal consent. Confirm identity. Check allergy to flush or chlorhexidine.", warning: null, note: null },
                      { num: 2, action: "Collect required equipment on a clean procedure tray. Check blood bottles for requested tests. **Check flushes with a Registered Nurse**", rationale: "Ensures correct bottles used. Safe checking of a medicine (NUH, 2016).", warning: null, note: null },
                      { num: 3, action: "Take tray to bedside. Wash hands or apply alcohol gel. Apply **non-sterile gloves and apron**", rationale: "Infection prevention. Personal protection.", warning: null, note: null },
                      { num: 4, action: "If infusions are connected, **suspend and disconnect** (if appropriate). Place a sterile cap on the infusion line end", rationale: "Prevents medication spillage. Prevents contamination of infusion line.", warning: null, note: null },
                    ],
                  },
                  {
                    label: "Decontamination & Sampling — Steps 5–8",
                    steps: [
                      { num: 5, action: "Place a **sterile paper towel** under the line. Clean the line from the needle-free end cap down to the clamp with an **alcoholic chlorhexidine wipe**. Allow to dry.", rationale: "Decontaminates the line and prevents infection.", warning: null, note: null },
                      { num: 6, action: "Unclamp the line. Attach a 10ml luer-lok syringe to the needle-free cap. Withdraw **10ml of blood** (discard volume)", rationale: "Minimises contaminants that may cause blood test inaccuracies.", warning: null, note: "Exception: If obtaining blood cultures, do NOT discard this initial 10ml — it carries important microbiological data. Blood culture sample must always be taken first." },
                      { num: 7, action: "Using an appropriate-sized syringe, collect the **blood required for tests**", rationale: "Ensures sufficient volume for each bottle.", warning: null, note: null },
                      { num: 8, action: "Flush the line with a brisk **pulse-pause technique** using the saline syringe. Sodium heparin (10 units/ml) may be used afterwards if local policy. **Clamp immediately during the last pulse of flush**", rationale: "Pulse-pause flushing creates turbulent flow to clear blood from the lumen (INS, 2011). Clamping during last pulse prevents blood reflux as syringe is removed.", warning: null, note: null },
                    ],
                  },
                  {
                    label: "Completion — Steps 9–11",
                    steps: [
                      { num: 9, action: "Transfer blood to appropriate vials and **agitate** as necessary", rationale: "Prevents sample clotting.", warning: null, note: null },
                      { num: 10, action: "Re-attach any infusions. Dispose of waste appropriately. Remove gloves and **cleanse hands**", rationale: "Safe disposal. Infection prevention.", warning: null, note: null },
                      { num: 11, action: "Label samples **at the bedside with the patient present**. Record samples sent in patient's notes. Send to lab with appropriate request form.", rationale: "Prevents mislabelling (NUH, 2014). Accurate records (NMC, 2010).", warning: null, note: null },
                    ],
                  },
                ],
              },

              {
                heading: "References",
                type: "list",
                groups: [
                  {
                    icon: "management",
                    label: "Evidence Base",
                    items: [
                      "NUH Clinical Practice Guidelines for the Management of Midlines and PICC Lines — Ratified 11/01/2021",
                      "INS (2011): Infusion Nursing Standards of Practice — pulse-pause flushing",
                      "NUH (2016): Safe Checking of Medicines",
                      "NUH (2014): Patient Labelling / Sample Mislabelling Prevention Policy",
                      "NMC (2010): Standards for Records and Record Keeping",
                    ],
                  },
                ],
              },
            ],
          },

          // ── 3. Line Removal ──────────────────────────────────────────────────
          {
            id: "proc-picc-removal",
            title: "PICC & Midlines: Removal",
            category: "Vascular Access",
            bodySite: "Vascular",
            authors: "NUH Vascular Access Team",
            evidenceBase: "NUH Clinical Practice Guidelines for the Management of Midlines and Peripherally Inserted Central Catheters (PICC Lines) | Ratified 11/01/2021 | NMC 2010",
            summary: "Procedure for safe removal of a PICC line or Midline by any registered nurse. Confirms insertion length against Notis record before removal. If resistance is met during removal, stop immediately — do not force. If removed due to infection, send a 5cm tip to microbiology.",
            tags: ["PICC", "Midline", "Line removal", "Vascular access", "StatLock", "Catheter removal"],
            related: ["proc-picc-common-issues", "proc-picc-blood-samples"],
            pdfUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=253b0b35e0485e35452f6fad836ad476",
            portalUrl: "https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-detail.pl?biblionumber=10319&query_desc=picc%20lines",

            updated: "Ratified Jan 2021 (review Jan 2026)",

            sections: [

{
  heading: "⚠ Critical Safety",
  type: "alert",
  items: [
    { label: "Check the Notis/DHR procedural report before starting", detail: "Confirm the insertion length so you can verify the entire line has been removed on completion." },
    { label: "Gentle traction only — do NOT pull or stretch the catheter", detail: "If resistance is met, STOP and seek advice immediately — forced removal risks catheter embolism." },
    { label: "If removing in the context of DVT — use a room with oxygen and suction", detail: "Risk of pulmonary embolus during removal." },
    { label: "If removed due to infection — send a 5cm tip to microbiology", detail: "Place in a sterile universal pot, labelled per Trust policy." },
  ],
},

              {
                heading: "Equipment",
                type: "proc_equip",
                items: [
                  { item: "Universal aseptic dressing pack (or similar)", detail: "Containing gauze and materials to produce a sterile field" },
                  { item: "Clean dressing trolley", detail: "" },
                  { item: "Non-sterile gloves + apron", detail: "" },
                  { item: "Sterile gloves", detail: "If not included in dressing pack" },
                  { item: "Dressing", detail: "To apply over exit site post-removal" },
                  { item: "Alcohol or dressing release spray", detail: "To loosen StatLock from skin if used" },
                  { item: "Sterile universal pot (if infection suspected)", detail: "For 5cm tip sample — send to microbiology" },
                ],
              },

              {
                heading: "Procedure",
                type: "proc_steps",
                note: "Any registered nurse may perform PICC/Midline removal. The procedure is straightforward and painless for the patient.",
                groups: [
                  {
                    label: "Preparation — Steps 1–5",
                    steps: [
                      { num: 1, action: "Check the **procedural report on Notis** to confirm the length the device was inserted to", rationale: "Allows confirmation that the entire line has been removed on completion.", warning: null, note: null },
                      { num: 2, action: "Perform the procedure in a **private room or behind curtains**", rationale: "Maintains privacy and dignity.", warning: null, note: null },
                      { num: 3, action: "Explain the procedure to the patient and check for **allergies** (dressings)", rationale: "Verbal consent. Allergy check.", warning: null, note: null },
                      { num: 4, action: "Position the patient comfortably with easy access to the line", rationale: "Promotes comfort and maintains an arm position the patient can hold during removal.", warning: null, note: null },
                      { num: 5, action: "**Wash hands**. Open dressing pack onto a clean trolley, followed by other materials required", rationale: "Infection prevention. Creates a sterile field.", warning: null, note: null },
                    ],
                  },
                  {
                    label: "Removal — Steps 6–10",
                    steps: [
                      { num: 6, action: "Apply alcohol hand gel. Put on **non-sterile gloves and apron**. Remove the outer dressing and discard. Apply hand gel again. Put on **non-sterile gloves from within the pack**", rationale: "Infection prevention. Protects the operator.", warning: null, note: null },
                      { num: 7, action: "Loosen the **StatLock** from the skin using alcohol or dressing release spray if needed", rationale: "Prevents skin damage.", warning: null, note: null },
                      { num: 8, action: "Use **gentle traction** to pull the line out steadily. Continue until fully removed. Compare removed length against the Notis report.", rationale: "Removes the line without damaging the vein. Confirms the entire line has been removed — no retained foreign body.", warning: "Do NOT excessively pull or stretch the catheter. If resistance is met, STOP and seek advice — catheter embolism may occur if an incomplete catheter is removed.", note: null },
                      { num: 9, action: "Apply **gauze over the exit site** and apply gentle pressure until bleeding stops. Apply a suitable dressing.", rationale: "Achieves haemostasis. Prevents infection.", warning: null, note: "If removed due to infection: cut a 5cm length from the tip and send in a sterile universal pot to microbiology — label per Trust policy." },
                      { num: 10, action: "Dispose of waste per hospital policy. Remove gloves. **Wash hands**. Document line removal, site condition, and any samples sent.", rationale: "Safe disposal. Infection prevention. Ensures continuity of care (NMC, 2010).", warning: null, note: null },
                    ],
                  },
                ],
              },

              {
                heading: "References",
                type: "list",
                groups: [
                  {
                    icon: "management",
                    label: "Evidence Base",
                    items: [
                      "NUH Clinical Practice Guidelines for the Management of Midlines and PICC Lines — Ratified 11/01/2021",
                      "NMC (2010): Standards for Records and Record Keeping",
                    ],
                  },
                ],
              },
            ],
          },

        ],
      },
      // ── End Vascular Access ──────────────────────────────────────────────────

    ],
    get guidelines() {
      return this.subsites.flatMap(ss => ss.guidelines || []);
    },
  },

];
const DIRECTORY_DATA = {
  callouts: {},
  entries: [
// ── Oncology Wards ──────────────────────────────────────────
{ name: "Oncology Triage / CAT",      category: "ward", numbers: ["71693", "76977"] },
{ name: "SDEC",                        category: "ward", numbers: ["71755", "73819"] },
{ name: "Oncology Day Case",           category: "ward", numbers: ["71533", "77491"],           code: "LIS1",  location: "S1 or W4" },
{ name: "Fraser",   category: "ward", numbers: ["75333", "77153", "71528"], code: "FRAS", location: "S1, 1st floor" },
{ name: "Gervis",   category: "ward", numbers: ["77086", "76985"], code: "GERV", location: "S3, ground floor" },
{ name: "Hogarth",                     category: "ward", numbers: ["75152", "75164", "71732"],   code: "HOG",   location: "N10, 1st floor" },
{ name: "SRU",                         category: "ward", numbers: ["71530", "72505", "72535"],   code: "SRU",   location: "S12, 1st floor" },
{ name: "SRU Doctors Room",            category: "ward", numbers: ["72258"],                                    location: "S12" },
{ name: "Oncology Reg Room",           category: "ward", numbers: ["73209"] },
{ name: "Hayward House",               category: "ward", numbers: ["72042", "77079", "77080"],   code: "HEYH", location: "External — Green Entrance", note: "77080 = Drs office" },
{ name: "Palliative Care City",        category: "ward", numbers: ["74977"] },
{ name: "Palliative Care QMC",         category: "ward", numbers: ["88402"] },
{ name: "Southwell",                   category: "ward", numbers: ["75329"],                     code: "SOU",   location: "S10, ground floor" },
{ name: "ACU",                         category: "ward", numbers: ["73284", "76213"],            code: "ACU",   location: "W2a" },
{ name: "Barclay",                     category: "ward", numbers: ["76295", "75684"],            code: "BARC",  location: "N16" },
{ name: "Beeston",                     category: "ward", numbers: ["72401", "75380"],            code: "BEST",  location: "S8 — Stroke Unit" },
{ name: "Berman 1",                    category: "ward", numbers: ["73872", "73874"],            code: "BSU1",  location: "W2 — Hyper Acute Stroke" },
{ name: "Berman 2",                    category: "ward", numbers: ["75579", "73182"],            code: "BSU2",  location: "W2" },
{ name: "Bramley",                     category: "ward", numbers: ["76145", "76146"],            code: "BRAM",  location: "S3" },
{ name: "Burns Unit",                  category: "ward", numbers: ["71508", "76403"],            code: "B3",    location: "S1 or W4, ground floor" },
{ name: "Carrell",                     category: "ward", numbers: ["76301", "76724"],            code: "CARR",  location: "S3" },
{ name: "Chemo Ward",                  category: "ward", numbers: ["77275", "73675", "76697"],   code: "CHDC",  location: "S3 or W4, 1st floor" },
{ name: "Edward 2",                    category: "ward", numbers: ["71545"],                     code: "ED2",   location: "N10" },
{ name: "Fleming",                     category: "ward", numbers: ["75270", "76726"],            code: "FLE",   location: "S8, ground floor" },
{ name: "Fletcher",                    category: "ward", numbers: ["74687", "74686"],            code: "FLET",  location: "S1/S3/W4, ground floor" },
{ name: "Harvey 1",                    category: "ward", numbers: ["75904"],                     code: "HAR1",  location: "N10, 1st floor" },
{ name: "Harvey 2",                    category: "ward", numbers: ["76672"],                     code: "HAR2",  location: "N10" },
{ name: "Hotel",                       category: "ward", numbers: ["75231"],                     code: "PH1",   location: "N1, 2nd floor" },
{ name: "Linby",                       category: "ward", numbers: ["75321", "76177"],            code: "LIN",   location: "S1, 2nd floor" },
{ name: "Linden Lodge",                category: "ward", numbers: ["76077"],                     code: "LILO",  location: "External — Linden Way" },
{ name: "Lister 1",                    category: "ward", numbers: ["71533", "74626"],            code: "LIS1",  location: "N11" },
{ name: "Lister 2",                    category: "ward", numbers: ["73809", "73812"],            code: "LIST2", location: "N11" },
{ name: "Loxley",                      category: "ward", numbers: ["75158", "74309"],            code: "LOX",   location: "N1, 1st floor" },
{ name: "Morris",                      category: "ward", numbers: ["73136", "71549"],            code: "MORR",  location: "W2a" },
{ name: "Nightingale",                 category: "ward", numbers: ["71553", "77107"],            code: "NG1",   location: "N16" },
{ name: "Papplewick",                  category: "ward", numbers: ["76271", "76272"],            code: "PAPP",  location: "N5, 2nd floor" },
{ name: "Patience 1",                  category: "ward", numbers: ["75889", "76311"],            code: "PAT",   location: "N16, 1st floor" },
{ name: "Patience 2",                  category: "ward", numbers: ["71535", "76026"],            code: "PAT2",  location: "N16, 1st floor" },
{ name: "Stirland", category: "ward", numbers: ["79216", "79210"], code: "STIR", location: "S11 — next to Green Entrance" },

{  name: "Toghill",                     category: "ward", numbers: ["73419", "74681"],            code: "TOG",   location: "S5, 1st floor" },
{ name: "Winifred 2",                  category: "ward", numbers: ["77605", "76457"],            code: "WIN2",  location: "N15, 1st floor" },
{ name: "Bed Manager",                 category: "oncall", numbers: ["07595 284931"] },
    { name: "ART Fellow",                  category: "oncall", numbers: ["07812 276334"] },
    { name: "Haematology Assessment Line", category: "oncall", numbers: ["07812 268298"] },
    { name: "Admissions Team / CAT",       category: "oncall", numbers: ["76977"] },
    { name: "Rapid Response",              category: "oncall", numbers: ["0115 962 8066"] },
    { name: "Switch",                      category: "oncall", numbers: ["56155"] },
    { name: "Path Results",                category: "oncall", numbers: ["61168", "74436", "80184"] },
    { name: "Clin Chem Results",           category: "oncall", numbers: ["81168"], note: "OOH: 284-1360" },
    // ── Chemotherapy ────────────────────────────────────────────
    { name: "Chemo Day Unit",              category: "chemo",  numbers: ["57275", "56485"] },
    { name: "Chemo Care",                  category: "chemo",  numbers: ["79414"] },
    { name: "Chemo Pharmacy",              category: "chemo",  numbers: ["71563"] },
    { name: "Chemo Screening Pharmacist",  category: "chemo",  numbers: ["71563"] },
    { name: "Inpatient Pharmacy",          category: "chemo",  numbers: ["75984"] },
    { name: "Clinic Nurses",               category: "chemo",  numbers: ["71327"] },
    { name: "KMH Chemo",                   category: "chemo",  numbers: ["3335"] },
    { name: "KMH Clinic 2",               category: "chemo",  numbers: ["813917"] },
    { name: "CT-RT",                       category: "chemo",  numbers: ["54041"] },
    // ── Radiology & Investigations ──────────────────────────────
    { name: "CT",                          category: "radiology", numbers: ["79400"] },
    { name: "CT Appointments",             category: "radiology", numbers: ["75644", "75645"] },
    { name: "MRI Appointments (Inpatient)",category: "radiology", numbers: ["71717", "71720", "71721"] },
    { name: "MRI Appointments (Outpatient)",category: "radiology", numbers: ["86583"] },
    { name: "Ultrasound",                  category: "radiology", numbers: ["76701"] },
    { name: "Nuclear Medicine",            category: "radiology", numbers: ["75794"] },
    { name: "Interventional Radiology",    category: "radiology", numbers: ["76703"] },
    { name: "Angio Suite / IR / Fluoro",   category: "radiology", numbers: ["79779"] },
    { name: "PACS",                        category: "radiology", numbers: ["63333", "67728"] },
    { name: "Radiology SpR",               category: "radiology", numbers: ["80445", "80447"] },
    { name: "Radiology OOH Bleep (City)",  category: "radiology", numbers: ["284-1331"] },
    { name: "Radiology OOH Bleep (QMC)",   category: "radiology", numbers: ["284-1311"] },
    { name: "RT Radiographer OC",          category: "radiology", numbers: ["07812 268366"] },
    { name: "CT Reporting — CT",           category: "radiology", numbers: ["76615"] },
    { name: "CT Reporting — MRI",          category: "radiology", numbers: ["71719", "71724"] },
    { name: "CT Reporting — Ultrasound",   category: "radiology", numbers: ["77068"] },
    { name: "CT Reporting — Nuclear Medicine", category: "radiology", numbers: ["71331"] },
    { name: "CT Reporting — Breast",       category: "radiology", numbers: ["79075"] },
    { name: "Haem Lab",                    category: "radiology", numbers: ["75587"] },
    { name: "Clin Chemistry",              category: "radiology", numbers: ["74436"] },
    { name: "PICC / Vascular Access",      category: "radiology", numbers: ["75812"] },
    // ── Radiotherapy ────────────────────────────────────────────
    { name: "RT Planning",                 category: "rt", numbers: ["71208", "71209"] },
    { name: "SRS Office",                  category: "rt", numbers: ["77243"] },
    { name: "Workbase",                    category: "rt", numbers: ["74078"] },
    { name: "Reception North",             category: "rt", numbers: ["71193"] },
    { name: "Reception South",             category: "rt", numbers: ["76995"] },
    { name: "Clinic 1",                    category: "rt", numbers: ["71206", "71207"] },
    { name: "Clinic 2",                    category: "rt", numbers: ["71204", "71205"] },
    { name: "Clinic 3",                    category: "rt", numbers: ["71202", "71203"] },
    { name: "Brachy Suite / Office",       category: "rt", numbers: ["72135", "72136"] },
    { name: "Superficial / Contact",       category: "rt", numbers: ["79302"] },
    { name: "CT Sim 1/2",                  category: "rt", numbers: ["74041", "74090"] },
    { name: "Mould Room",                  category: "rt", numbers: ["71211"] },
    { name: "Late Effects",                category: "rt", numbers: ["72151", "74543"] },
    { name: "Information & Support",       category: "rt", numbers: ["71194", "0115 962 7976"] },
    { name: "Linac Room 1",                category: "rt", numbers: ["79408"] },
    { name: "Linac Room 2",                category: "rt", numbers: ["76932"] },
    { name: "Linac Room 3",                category: "rt", numbers: ["77226"] },
    { name: "Linac Room 4",                category: "rt", numbers: ["74089"] },
    { name: "Linac Room 5",                category: "rt", numbers: ["79705"] },
    { name: "Linac Room 6",                category: "rt", numbers: ["79706"] },
    { name: "Linac Room 7",                category: "rt", numbers: ["74074"] },
    // ── CNS Teams ───────────────────────────────────────────────
    { name: "AOS / CUP CNS",              category: "cns", numbers: ["07812 268675"],             note: "nuhnt.acuteoncologyservices@nhs.net | Patient: 0115 969 1169 ext 81320" },
    { name: "Brain & CNS Tumours CNS",    category: "cns", numbers: ["07812 268938"],             note: "nuhnt.neurooncologyspecialistnurses@nhs.net | 0115 924 9924 ext 87623" },
    { name: "Brain Mets CNS",             category: "cns", numbers: ["07812 278591"] },
    { name: "Breast (Advanced) CNS",      category: "cns", numbers: ["76978"],                    note: "nuhnt.abcteam@nhs.net" },
    { name: "Breast (Early) CNS",         category: "cns", numbers: ["74227", "77538"],           note: "nuhnt.oncologyprimarybreastcnsteam@nhs.net" },
    { name: "Colorectal CNS",             category: "cns", numbers: ["76257", "07812 268785"],    note: "nuhnt.colorectalchemotherapynursespecialists@nhs.net | Patient: ext 74588" },
    { name: "Germ Cell CNS",              category: "cns", numbers: ["07812 268125"],             note: "nicola.wilshaw@nhs.net — also covers Sarcoma (Onc)" },
    { name: "Gynae CNS",                  category: "cns", numbers: ["72218", "07812 276519"],    note: "nuhnt.gynaeoncmedicalcns@nhs.net" },
    { name: "Head & Neck CNS",            category: "cns", numbers: ["72041", "07812 278273"],    note: "alisonlarge@nhs.net" },
    { name: "HPB CNS",                    category: "cns", numbers: ["72270", "07812 276521"],    note: "nuhnt.hpboncology@nhs.net" },
    { name: "KMH AOS / CUP CNS",         category: "cns", numbers: ["07834 150508", "07525 606352"], note: "sfh-tr.aos-cup@nhs.net" },
    { name: "Lung CNS (Clin Onc)",        category: "cns", numbers: ["07812 275261"],             note: "nuhnt.lungcancercns@nhs.net" },
    { name: "Lung CNS (Med Onc)",         category: "cns", numbers: ["07812 268852"],             note: "nuhnt.lungonccns@nhs.net — Mon–Fri 8–5" },
    { name: "Renal & Melanoma CNS",       category: "cns", numbers: ["77291"],                    note: "nuhnt.renalandmelanomacancernursespecialists@nhs.net" },
    { name: "Sarcoma CNS",                category: "cns", numbers: ["07812 278361"],             note: "charlotte.bye3@nhs.net — also covers Germ Cell" },
    { name: "Skin (Non-melanoma) CNS",    category: "cns", numbers: ["77692"] },
    { name: "Urology CNS",                category: "cns", numbers: ["77594", "07812 275353"],    note: "Prostate, Bladder, Urothelial only — NOT renal or testes" },
    // ── AHP & Support ───────────────────────────────────────────
    { name: "Dieticians",                 category: "ahp", numbers: ["74954"] },
    { name: "Speech & Language",          category: "ahp", numbers: ["81221"] },
    { name: "PEG / RIG",                  category: "ahp", numbers: ["76754", "77407"] },
    { name: "Upper GI Nurses",            category: "ahp", numbers: ["74378"] },
    { name: "Cancer Back Up",             category: "ahp", numbers: ["79650"] },
    { name: "Learning Team",              category: "ahp", numbers: ["79595"] },
    { name: "Outpatient Pharmacy",        category: "ahp", numbers: ["75613", "72257"] },
    { name: "Oncology Outpatients",       category: "ahp", numbers: ["76998", "76980"], note: "nuhnt.oncologyoutpatientsappointmentrequests@nhs.net" },  ],
};
const ALL_GUIDELINES = SITES.flatMap(s => {
  if (s.isParent) {
    return s.subsites.flatMap(ss => (ss.guidelines || []).map(g => ({ ...g, siteId: s.id, siteLabel: s.label, siteColor: s.color, subsiteId: ss.id, subsiteLabel: ss.label })));
  }
  return (s.guidelines || []).map(g => ({ ...g, siteId: s.id, siteLabel: s.label, siteColor: s.color }));
});

// ── CALCULATORS REGISTRY ─────────────────────────────────────────────────────

const CALCULATORS = {
  "antibiotic-dosing": {
  id: "antibiotic-dosing",
  label: "Antibiotic Dosing Calculator",
  siteId: "oncology",
  icon: "💊",
  component: "antibiotic-dosing",
  guidelineId: "onco-neutropenic-sepsis",
  whenToUse: {
    headline: "When to use this calculator",
    checks: [
      { type: "question", text: "Is vancomycin or gentamicin being prescribed for a new indication? Use this calculator to determine the correct loading and maintenance doses based on renal function." },
      { type: "warning", text: "Does the patient have AKI? Vancomycin: prescribe loading dose only and contact microbiology before continuing. Gentamicin: avoid unless essential (e.g. septic shock with no appropriate alternative)." },
      { type: "warning", text: "Has the patient already received a gentamicin dose in the last 24h (A&E, theatres, critical care)? Do not re-dose until a pre-dose level taken 18–24h after that dose is confirmed <1 mg/L." },
      { type: "info", text: "This calculator uses the NUH Antibiotic Dosing Guidelines (Vancomycin review May 2027). Always use the NUH antibiotic website calculator as the primary method — this tool is a clinical support aid. Seek pharmacist or microbiology advice for critical care, CVVH, haemodialysis, peritoneal dialysis, or morbid obesity." },
    ],
  },
},
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
    guidelineId: "onco-neutropenic-sepsis",
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
    guidelineId: "onco-mscc",
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
  "opioid-converter": {
    id: "opioid-converter",
    label: "Opioid Equianalgesic Converter",
    siteId: "palliative",
    icon: "💊",
    guidelineId: "pall-pain",
    whenToUse: {
      headline: "When to use this calculator",
      checks: [
        { type: "question", text: "Are you switching between opioids? Use this to find the equianalgesic dose when rotating from one opioid to another, or converting between oral and subcutaneous routes." },
        { type: "warning", text: "Always reduce the calculated dose by 25–50% on switching — incomplete cross-tolerance means the full equianalgesic dose will be excessive. Reduce by 50% at high doses, in elderly/frail patients, or after rapid escalation." },
        { type: "question", text: "Are you starting a transdermal patch? Patches are contraindicated in acute pain — effect takes >12h. Ensure PRN medication is prescribed alongside." },
        { type: "info", text: "Conversions are approximate guides. Individual variation is significant — verify with PCF or specialist palliative care team at high doses or in complex cases." },
        { type: "warning", text: "Renal impairment significantly changes opioid handling. In moderate–severe renal failure, seek specialist advice — consider alfentanil or fentanyl as safer alternatives." },
      ],
    },
    component: "opioid-converter",
  },
  "tokuhashi": {
    id: "tokuhashi",
    label: "Revised Tokuhashi Score",
    siteId: "oncology",
    icon: "📊",
    guidelineId: "onco-mscc",
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
"hfa-icos": {
  id: "hfa-icos",
  label: "HFA-ICOS Baseline Risk Assessment",
  siteId: "cardio-oncology",
  icon: "❤️",
  guidelineId: "cardio-anthracycline",
  whenToUse: {
    headline: "When to use the HFA-ICOS tool",
    checks: [
      { type: "question", text: "Is the patient about to start anthracycline-based chemotherapy? This tool must be used for all patients before initiating anthracyclines — it determines surveillance intensity and need for cardio-oncology referral." },
      { type: "info", text: "Categorises patients as low, moderate, high, or very high cardiovascular risk. High/very high risk patients should be referred to the Cardio-Oncology clinic before starting treatment." },
      { type: "warning", text: "This is an external MDCalc tool — it will open in a new tab. The risk category it generates determines which surveillance protocol to follow in the Anthracycline Cardiotoxicity guideline." },
    ],
  },
  component: "hfa-icos",
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
        <h3 style={{ marginBottom: 12 }}>Step 1 — Presentation </h3>
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
        <h3 style={{ marginBottom: 12 }}>Step 2 — Management by Presentation</h3>
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
function MSCCSteroidTable({ siteColor, siteAccent }) {
  const tdBase = {
    verticalAlign: "top", padding: "10px 12px",
    borderBottom: "1px solid var(--border-light)", fontSize: 13, lineHeight: 1.55,
    color: "var(--text-secondary)",
  };

  const thStyle = {
    fontSize: 11, fontWeight: 700, textAlign: "left", padding: "8px 12px",
    background: "var(--bg)", color: "var(--text-muted)",
    borderBottom: "1px solid var(--border-light)",
    fontFamily: "Sora, sans-serif", textTransform: "uppercase", letterSpacing: "0.05em",
  };

  const rows = [
    {
      bgRow: "#f0fff4",
      labelColor: "#276749",
      label: "Known solid cancer + neurological symptoms",
      sublabel: null,
      management: [
        { urgent: true, text: "Stat dexamethasone 16mg PO" },
        { urgent: false, text: "Then 8mg BD (am + noon)" },
        { urgent: false, text: "Offer PPI" },
        { urgent: false, text: "Wean steroids at start of definitive treatment" },
        { urgent: false, text: "Stop if MSCC excluded on MRI" },
        { urgent: false, text: "Oral/IV equivalence: 4mg PO ≈ 3.3mg IV/SC" },
      ],
    },
    {
      bgRow: "#fffff0",
      labelColor: "#854F0B",
      label: "Known haematological cancer",
      sublabel: "Lymphoma, myeloma, leukaemia",
      management: [
        { urgent: true, text: "Stat dexamethasone 20mg PO" },
        { urgent: true, text: "Discuss continuation with Haematology before proceeding" },
        { urgent: false, text: "Offer PPI" },
      ],
    },
    {
      bgRow: "#fff5f0",
      labelColor: "#7b341e",
      label: "New / unknown malignancy",
      sublabel: "MSCC may be first presentation",
      management: [
        { urgent: true, text: "Discuss with oncology before starting steroids" },
        { urgent: false, text: "If ?lymphoma/myeloma: do not give steroids — seek haematology advice + consider urgent biopsy first" },
        { urgent: false, text: "If approved: stat 16mg then 8mg BD as per solid cancer protocol" },
      ],
    },
    {
      bgRow: "var(--surface)",
      labelColor: "var(--text-secondary)",
      label: "No neurological symptoms",
      sublabel: "Spinal mets suspected/confirmed",
      management: [
        { urgent: false, text: "Steroids not routinely indicated" },
        { urgent: false, text: "Consider if severe pain — discuss with senior clinician" },
      ],
      last: true,
    },
  ];

  return (
    <div className="detail-card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{
        padding: "10px 16px", borderBottom: "1px solid var(--border-light)",
        display: "flex", alignItems: "center", gap: 8, background: siteAccent,
      }}>
        <span style={{ fontSize: 14, color: siteColor }}>💊</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: siteColor, fontFamily: "Sora, sans-serif" }}>
          Steroid protocol by presentation
        </span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: "28%" }} />
            <col style={{ width: "72%" }} />
          </colgroup>
          <thead>
            <tr>
              <th style={thStyle}>Presentation</th>
              <th style={thStyle}>Steroid management</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                <td style={{ ...tdBase, background: row.bgRow, borderBottom: row.last ? "none" : "1px solid var(--border-light)" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: row.labelColor, fontFamily: "Sora, sans-serif", marginBottom: row.sublabel ? 3 : 0 }}>
                    {row.label}
                  </div>
                  {row.sublabel && (
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{row.sublabel}</div>
                  )}
                </td>
                <td style={{ ...tdBase, background: row.bgRow, borderBottom: row.last ? "none" : "1px solid var(--border-light)" }}>
                  {row.management.map((item, ii) =>
                    item.urgent ? (
                      <div key={ii} style={{
                        display: "flex", alignItems: "flex-start", gap: 7,
                        padding: "5px 9px", background: "#fff5f5",
                        border: "1px solid #fc8181", borderRadius: 6,
                        marginBottom: 5, fontSize: 13, fontWeight: 700,
                        color: "#742a2a", lineHeight: 1.4,
                      }}>
                        <span style={{ fontSize: 11, flexShrink: 0, marginTop: 1 }}>⚡</span>
                        {item.text}
                      </div>
                    ) : (
                      <div key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 4 }}>
                        <span style={{ color: "var(--text-muted)", fontSize: 8, flexShrink: 0, marginTop: 5 }}>●</span>
                        <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55 }}>{item.text}</span>
                      </div>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        background: "var(--bg)", borderTop: "1px solid var(--border-light)",
        padding: "8px 14px", fontSize: 12, color: "var(--text-muted)",
        fontStyle: "italic", lineHeight: 1.5,
      }}>
        Prolonged steroids: consider PCP prophylaxis (cotrimoxazole 480mg OD), bone protection, blood glucose monitoring, and risk of adrenal insufficiency on withdrawal.
      </div>
    </div>
  );
}
// ─── Cockcroft-Gault helpers ─────────────────────────────────────────────────

function ibw(sexMale, heightCm) {
  const h = heightCm / 2.54;
  return sexMale ? 50 + 2.3 * (h - 60) : 45.5 + 2.3 * (h - 60);
}

function effectiveWeight(sexMale, heightCm, actualKg) {
  const ideal = ibw(sexMale, heightCm);
  const mbw = ideal * 1.2;
  return actualKg > mbw ? mbw : actualKg;
}

function cockcroft(sexMale, age, weightKg, scrUmolL) {
  const F = sexMale ? 1.23 : 1.04;
  const scr = Math.max(scrUmolL, 60);
  return (F * (140 - age) * weightKg) / scr;
}

// ─── Vancomycin logic ─────────────────────────────────────────────────────────

function vancoLoading(actualKg) {
  if (actualKg < 40)  return { dose: "750 mg", volume: "250 mL", duration: "90 min" };
  if (actualKg < 60)  return { dose: "1 g",    volume: "250 mL", duration: "120 min" };
  if (actualKg <= 90) return { dose: "1.5 g",  volume: "500 mL", duration: "180 min" };
  return                     { dose: "2 g",    volume: "500 mL", duration: "240 min" };
}

function vancoMaintenance(crcl, actualKg) {
  if (crcl > 110)  return { dose: actualKg < 45 ? "1.25 g" : "1.5 g", interval: "BD",         volume: "500 mL", duration: "150 min", firstLevel: "Before 4th dose", startDelay: "12h" };
  if (crcl >= 90)  return { dose: "1.25 g", interval: "BD",         volume: "250 mL", duration: "150 min", firstLevel: "Before 4th dose", startDelay: "12h" };
  if (crcl >= 75)  return { dose: "1 g",    interval: "BD",         volume: "250 mL", duration: "120 min", firstLevel: "Before 4th dose", startDelay: "12h" };
  if (crcl >= 55)  return { dose: "750 mg", interval: "BD",         volume: "250 mL", duration: "90 min",  firstLevel: "Before 4th dose", startDelay: "12h" };
  if (crcl >= 40)  return { dose: "500 mg", interval: "BD",         volume: "100 mL", duration: "60 min",  firstLevel: "Before 4th dose", startDelay: "12h" };
  if (crcl >= 30)  return { dose: "750 mg", interval: "OD",         volume: "250 mL", duration: "90 min",  firstLevel: "Before 4th dose", startDelay: "24h" };
  if (crcl >= 20)  return { dose: "500 mg", interval: "OD",         volume: "100 mL", duration: "60 min",  firstLevel: "Before 4th dose", startDelay: "24h" };
  if (crcl >= 10)  return { dose: "500 mg", interval: "Every 48h",  volume: "100 mL", duration: "60 min",  firstLevel: "Before 2nd dose", startDelay: "48h" };
  return null; // level-driven
}

// ─── Gentamicin logic ─────────────────────────────────────────────────────────

function gentamicinDose(crcl, hasAki, akiStage, actualKg) {
  let mgPerKg, maxDose, tier;
  if (hasAki && akiStage >= 3) {
    mgPerKg = 2; maxDose = 200; tier = "AKI stage 3 / anuric / oliguric";
  } else if ((hasAki && akiStage >= 1) || (!hasAki && crcl < 40)) {
    mgPerKg = 3; maxDose = 300; tier = hasAki ? "AKI stage 1–2" : "CrCl 10–40 ml/min";
  } else {
    mgPerKg = 5; maxDose = 500; tier = "CrCl >40 ml/min";
  }
  const raw = mgPerKg * actualKg;
  const capped = Math.min(raw, maxDose);
  const rounded = Math.round(capped / 40) * 40;
  return { mgPerKg, maxDose, raw, rounded, tier };
}

// ─── Shared style primitives ──────────────────────────────────────────────────

const S = {
  sectionLabel: {
    fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
    textTransform: "uppercase", color: "var(--text-muted)",
    fontFamily: "Sora, sans-serif", marginBottom: 8,
  },
  input: {
    width: "100%", border: "1.5px solid var(--border)", borderRadius: 8,
    padding: "8px 11px", fontSize: 13.5, color: "var(--text-primary)",
    background: "var(--surface)", outline: "none", fontFamily: "DM Sans, sans-serif",
    boxSizing: "border-box",
  },
  label: {
    display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-secondary)",
    fontFamily: "Sora, sans-serif", marginBottom: 5,
  },
  resultRow: (highlight) => ({
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "8px 12px", borderRadius: 8, fontSize: 13.5,
    background: highlight ? "var(--accent-light)" : "var(--bg)",
    border: `1px solid ${highlight ? "#bfdbfe" : "var(--border-light)"}`,
    color: highlight ? "var(--accent)" : "var(--text-secondary)",
  }),
  resultValue: (highlight) => ({
    fontWeight: 700, fontFamily: "Sora, sans-serif",
    color: highlight ? "var(--accent)" : "var(--text-primary)", fontSize: 14,
  }),
  alertBox: (type) => {
    const map = {
      warning: { bg: "#fffbeb", border: "#fde68a", color: "#92400e", icon: "⚠" },
      danger:  { bg: "#fff5f5", border: "#fca5a5", color: "#991b1b", icon: "🚨" },
      info:    { bg: "#f0fff4", border: "#bbf7d0", color: "#166534", icon: "ℹ" },
    };
    const c = map[type];
    return { bg: c.bg, border: c.border, color: c.color, icon: c.icon };
  },
};

function Field({ label, children, half }) {
  return (
    <div style={{ gridColumn: half ? "span 1" : "span 2" }}>
      <label style={S.label}>{label}</label>
      {children}
    </div>
  );
}

function ResultRow({ label, value, highlight }) {
  return (
    <div style={S.resultRow(highlight)}>
      <span style={{ fontSize: 13 }}>{label}</span>
      <span style={S.resultValue(highlight)}>{value}</span>
    </div>
  );
}

function AlertBox({ type, children }) {
  const c = S.alertBox(type);
  return (
    <div style={{
      display: "flex", gap: 10, padding: "10px 13px",
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: 8, color: c.color,
    }}>
      <span style={{ fontSize: 15, flexShrink: 0, lineHeight: 1.5 }}>{c.icon}</span>
      <p style={{ fontSize: 13, lineHeight: 1.55, margin: 0, color: c.color }}>{children}</p>
    </div>
  );
}

function SectionHead({ children }) {
  return <div style={S.sectionLabel}>{children}</div>;
}

function Divider() {
  return <div style={{ height: 1, background: "var(--border-light)", margin: "4px 0" }} />;
}

// ─── Vancomycin Calculator ────────────────────────────────────────────────────

function VancoCalculator() {
  const [form, setForm] = useState({ age: "", weight: "", height: "", sex: "male", scr: "", aki: false });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const age = parseFloat(form.age);
  const weight = parseFloat(form.weight);
  const height = parseFloat(form.height);
  const scr = parseFloat(form.scr);
  const male = form.sex === "male";
  const valid = age > 0 && weight > 0 && height > 0 && scr > 0;

  let result = null;
  if (valid) {
    const idealW = ibw(male, height);
    const effW = effectiveWeight(male, height, weight);
    const obese = weight > idealW * 1.2;
    const scrForCalc = Math.max(scr, 60);
    const crcl = cockcroft(male, age, effW, scrForCalc);
    const loading = vancoLoading(weight);
    const maint = vancoMaintenance(crcl, weight);
    result = { crcl, loading, maint, effW, idealW, obese, scrClamped: scr < 60 };
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      {/* Inputs */}
      <div>
        <SectionHead>Patient Details</SectionHead>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Field label="Age (years)" half>
            <input style={S.input} type="number" min="18" placeholder="e.g. 65"
              value={form.age} onChange={e => set("age", e.target.value)} />
          </Field>
          <Field label="Sex" half>
            <select style={S.input} value={form.sex} onChange={e => set("sex", e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </Field>
          <Field label="Actual Weight (kg)" half>
            <input style={S.input} type="number" min="1" placeholder="e.g. 75"
              value={form.weight} onChange={e => set("weight", e.target.value)} />
          </Field>
          <Field label="Height (cm)" half>
            <input style={S.input} type="number" min="100" placeholder="e.g. 170"
              value={form.height} onChange={e => set("height", e.target.value)} />
          </Field>
          <Field label="Serum Creatinine (µmol/L)" half>
            <input style={S.input} type="number" min="1" placeholder="e.g. 85"
              value={form.scr} onChange={e => set("scr", e.target.value)} />
          </Field>
          <Field label="AKI Present?" half>
            <select style={S.input} value={form.aki ? "yes" : "no"}
              onChange={e => set("aki", e.target.value === "yes")}>
              <option value="no">No</option>
              <option value="yes">Yes — any stage</option>
            </select>
          </Field>
        </div>
      </div>

      {form.aki && (
        <AlertBox type="danger">
          AKI present — prescribe loading dose only. Repeat U&Es within 24h. Contact microbiology via MICROAD (Medway/Nervecentre) before continuing. AKI stage 3: only re-dose if level &lt;15 mg/L, max 500 mg.
        </AlertBox>
      )}

      {/* Results */}
      {result && (
        <>
          <Divider />
          <div>
            <SectionHead>Calculated Parameters</SectionHead>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <ResultRow label="Ideal Body Weight" value={`${result.idealW.toFixed(1)} kg`} />
              {result.obese && (
                <ResultRow label="Max Body Weight (MBW) — used for CrCl" value={`${result.effW.toFixed(1)} kg`} highlight />
              )}
              <ResultRow
                label={`CrCl (Cockcroft-Gault)${result.scrClamped ? " — min SCr 60 µmol/L applied" : ""}`}
                value={`${result.crcl.toFixed(0)} ml/min`}
                highlight
              />
            </div>
          </div>

          <div>
            <SectionHead>Step 1 — Loading Dose (weight-based, renal-independent)</SectionHead>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <ResultRow label="Loading Dose" value={result.loading.dose} highlight />
              <ResultRow label="Infusion Volume" value={result.loading.volume} />
              <ResultRow label="Infusion Duration" value={result.loading.duration} />
            </div>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 7, lineHeight: 1.5 }}>
              Infuse at ≤10 mg/min via Alaris GP pump (DERS). Use glucose 5% if sodium-restricted. Concentrations &gt;10 mg/mL: central line only.
            </p>
          </div>

          {!form.aki && (
            <div>
              <SectionHead>Step 2 — Maintenance Dose</SectionHead>
              {result.maint ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <ResultRow label="Maintenance Dose" value={result.maint.dose} highlight />
                  <ResultRow label="Frequency" value={result.maint.interval} />
                  <ResultRow label="Start after loading dose" value={result.maint.startDelay} />
                  <ResultRow label="Infusion Volume" value={result.maint.volume} />
                  <ResultRow label="Infusion Duration" value={result.maint.duration} />
                  <ResultRow label="First Level Timing" value={result.maint.firstLevel} />
                </div>
              ) :
               
              (<AlertBox type="danger">
                  CrCl &lt;10 ml/min — do not prescribe regular maintenance. Check vancomycin level 48h after loading dose. Re-dose with 500 mg only when level &lt;15 mg/L. Re-check U&Es and repeat level after each dose.
                </AlertBox>
              )}
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 7, lineHeight: 1.5 }}>
                Target pre-dose (trough) level: 10–20 mg/L. Infuse at ≤10 mg/min via Alaris GP pump (DERS).
              </p>
            </div>
          )}

          <AlertBox type="info">
            Pre-dose level target: 10–20 mg/L. If level &gt;20 mg/L: withhold and recheck before next dose. Do not take levels from the same line as the infusion.
          </AlertBox>

          <AlertBox type="warning">
            Always confirm with the NUH Vancomycin Dosing Calculator on the antibiotic website. Seek advice for critical care, CVVH, haemodialysis, or peritoneal dialysis patients.
          </AlertBox>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
  <a href="https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=091639d5e9d779e7c7772177f8a2d800"
    target="_blank" rel="noopener noreferrer"
    className="detail-btn detail-btn-secondary" style={{ display: "inline-flex", fontSize: 12 }}>
    <IconExternal /> NUH Guideline PDF
  </a>
  <a href="https://nhs.sharepoint.com/sites/RX1_Antibiotics/SitePages/Calculators/IV-Vancomycin-Dosing-Calculator.aspx"
    target="_blank" rel="noopener noreferrer"
    className="detail-btn detail-btn-secondary" style={{ display: "inline-flex", fontSize: 12 }}>
    <IconExternal /> NUH Portal Calculator
  </a>
</div>
        </>
      )}
    </div>
  );
}

// ─── Gentamicin Calculator ────────────────────────────────────────────────────

function GentaCalculator() {
  const [form, setForm] = useState({
    age: "", weight: "", height: "", sex: "male", scr: "", aki: "none", previousDose: false,
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const age = parseFloat(form.age);
  const weight = parseFloat(form.weight);
  const height = parseFloat(form.height);
  const scr = parseFloat(form.scr);
  const male = form.sex === "male";
  const hasAki = form.aki !== "none";
  const akiStage = hasAki ? parseInt(form.aki) : 0;
  const valid = age > 0 && weight > 0 && height > 0 && scr > 0;

  let result = null;
  if (valid && !form.previousDose) {
    const idealW = ibw(male, height);
    const effW = effectiveWeight(male, height, weight);
    const obese = weight > idealW * 1.2;
    const crcl = hasAki ? null : cockcroft(male, age, effW, Math.max(scr, 60));
    const genta = gentamicinDose(crcl, hasAki, akiStage, weight);
    result = { crcl, genta, effW, idealW, obese };
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      {/* Inputs */}
      <div>
        <SectionHead>Patient Details</SectionHead>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Field label="Age (years)" half>
            <input style={S.input} type="number" min="18" placeholder="e.g. 65"
              value={form.age} onChange={e => set("age", e.target.value)} />
          </Field>
          <Field label="Sex" half>
            <select style={S.input} value={form.sex} onChange={e => set("sex", e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </Field>
          <Field label="Actual Weight (kg)" half>
            <input style={S.input} type="number" min="1" placeholder="e.g. 75"
              value={form.weight} onChange={e => set("weight", e.target.value)} />
          </Field>
          <Field label="Height (cm)" half>
            <input style={S.input} type="number" min="100" placeholder="e.g. 170"
              value={form.height} onChange={e => set("height", e.target.value)} />
          </Field>
          <Field label="Serum Creatinine (µmol/L)" half>
            <input style={S.input} type="number" min="1" placeholder="e.g. 85"
              value={form.scr} onChange={e => set("scr", e.target.value)} />
          </Field>
          <Field label="AKI Stage" half>
            <select style={S.input} value={form.aki} onChange={e => set("aki", e.target.value)}>
              <option value="none">No AKI</option>
              <option value="1">AKI Stage 1</option>
              <option value="2">AKI Stage 2</option>
              <option value="3">AKI Stage 3 / anuric / oliguric</option>
            </select>
          </Field>
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, cursor: "pointer", fontSize: 13.5, color: "var(--text-secondary)" }}>
          <input type="checkbox" checked={form.previousDose}
            onChange={e => set("previousDose", e.target.checked)}
            style={{ width: 15, height: 15, cursor: "pointer", accentColor: "var(--accent)" }} />
          Patient already received gentamicin dose in last 24h (A&E / theatres / critical care)
        </label>
      </div>

      {form.previousDose && (
        <AlertBox type="danger">
          Do NOT prescribe a further dose. Take a level 18–24h after the previous dose and only prescribe once the pre-dose level is &lt;1 mg/L.
        </AlertBox>
      )}

      {hasAki && akiStage < 3 && (
        <AlertBox type="warning">
          AKI stage 1–2: avoid gentamicin unless essential (e.g. septic shock with no appropriate alternative). Dose as per AKI stage — do not calculate CrCl.
        </AlertBox>
      )}

      {hasAki && akiStage >= 3 && (
        <AlertBox type="danger">
          AKI stage 3 / anuric / oliguric: single 2 mg/kg dose only (max 200 mg). Re-dose only when pre-dose level &lt;1 mg/L.
        </AlertBox>
      )}

      {/* Results */}
      {result && (
        <>
          <Divider />
          <div>
            <SectionHead>Calculated Parameters</SectionHead>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <ResultRow label="Ideal Body Weight" value={`${result.idealW.toFixed(1)} kg`} />
              {result.obese && (
                <ResultRow label="Max Body Weight (MBW) — used for CrCl" value={`${result.effW.toFixed(1)} kg`} highlight />
              )}
              {result.crcl !== null
                ? <ResultRow label="CrCl (Cockcroft-Gault)" value={`${result.crcl.toFixed(0)} ml/min`} highlight />
                : <ResultRow label="CrCl" value="Not calculated — dosed by AKI stage" highlight />
              }
            </div>
          </div>

          <div>
            <SectionHead>Gentamicin Dose — Once Daily (not endocarditis)</SectionHead>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <ResultRow label="Dosing Tier" value={result.genta.tier} />
              <ResultRow
                label={`${result.genta.mgPerKg} mg/kg × ${weight} kg`}
                value={`${result.genta.raw.toFixed(0)} mg (raw)`}
              />
              {result.genta.raw > result.genta.maxDose && (
                <ResultRow label="Maximum dose cap applied" value={`${result.genta.maxDose} mg`} />
              )}
              <ResultRow label="Dose (rounded to nearest 40 mg)" value={`${result.genta.rounded} mg`} highlight />
            </div>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 7, lineHeight: 1.5 }}>
              All doses rounded to nearest 40 mg increment per NUH guideline.
            </p>
          </div>

          <AlertBox type="info">
            Take pre-dose level 18–24h after each dose. Only prescribe next dose when level is &lt;1 mg/L. Levels taken too early will be falsely elevated.
          </AlertBox>

          <AlertBox type="warning">
            Always confirm with the NUH IV Gentamicin Dosing Calculator on the antibiotic website. Seek advice for peritoneal dialysis, morbid obesity, or rapidly changing renal function.
          </AlertBox>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
  <a href="https://nuhp.koha-ptfs.co.uk/cgi-bin/koha/opac-retrieve-file.pl?id=8fc689ad5cd4158ab7ea81b3cb412f40"
    target="_blank" rel="noopener noreferrer"
    className="detail-btn detail-btn-secondary" style={{ display: "inline-flex", fontSize: 12 }}>
    <IconExternal /> NUH Guideline PDF
  </a>
  <a href="https://nhs.sharepoint.com/sites/RX1_Antibiotics/SitePages/Calculators/IV-Gentamicin-Dosing-Calculator-(NOT-Endocarditis).aspx"
    target="_blank" rel="noopener noreferrer"
    className="detail-btn detail-btn-secondary" style={{ display: "inline-flex", fontSize: 12 }}>
    <IconExternal /> NUH Portal Calculator
  </a>
</div>
        </>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

function AntibioticDosingCalculator() {
  const [tab, setTab] = useState("vancomycin");

  const tabs = [
    { id: "vancomycin", label: "Vancomycin" },
    { id: "gentamicin", label: "Gentamicin" },
  ];

  return (
    <div style={{ marginTop: 14 }}>
      {/* Tab switcher */}
      <div style={{
        display: "flex", gap: 6, marginBottom: 20,
        background: "var(--bg)", borderRadius: 10,
        padding: 4, border: "1px solid var(--border)",
        width: "fit-content",
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "6px 18px", borderRadius: 7, border: "none", cursor: "pointer",
            fontSize: 13, fontWeight: tab === t.id ? 600 : 400,
            fontFamily: "Sora, sans-serif",
            background: tab === t.id ? "var(--surface)" : "transparent",
            color: tab === t.id ? "var(--text-primary)" : "var(--text-muted)",
            boxShadow: tab === t.id ? "var(--shadow-sm)" : "none",
            transition: "all 0.15s",
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "vancomycin" && <VancoCalculator />}
      {tab === "gentamicin" && <GentaCalculator />}

      {/* Footer */}
      <div style={{
        marginTop: 20, padding: "10px 14px",
        background: "var(--bg)", borderRadius: 8,
        border: "1px solid var(--border-light)",
      }}>
        <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0, lineHeight: 1.5, textAlign: "center" }}>
          For use in adults only · Excludes critical care, CVVH, haemodialysis · NUH Antibiotic Guidelines Committee
        </p>
      </div>
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
    <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
      <button className="detail-back-btn" onClick={() => onNavigate({ type: "calculators" })}>
        <IconArrowLeft />
        Back to Calculators
      </button>
      {calc.guidelineId && (() => {
        const linkedG = findGuideline(calc.guidelineId);
        const linkedSite = SITES.find(s => s.id === linkedG?.siteId);
        return linkedG ? (
          <button className="detail-back-btn"
            onClick={() => onNavigate({ type: "guideline", guidelineId: calc.guidelineId })}
            style={{ marginLeft: 16, color: linkedSite?.color }}
          >
            <IconExternal /> View {linkedG.title} guideline
          </button>
        ) : null;
      })()}
    </div>

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
        {calc.component === "antibiotic-dosing" && (<AntibioticDosingCalculator />)}
        {calc.component === "mascc" && <MasccCalculator />}
        {calc.component === "opioid-converter" && <OpioidConverter />}
        {calc.component === "sins" && <SinsCalculator />}
        {calc.component === "tokuhashi" && (
          <div style={{ padding: "12px", background: "var(--bg)", borderRadius: 8, border: "1px solid var(--border)" }}>
            <p style={{ fontSize: 13.5, color: "var(--text-secondary)", marginBottom: 12 }}>The Revised Tokuhashi Score is best calculated using the validated MDCalc tool which includes full scoring tables:</p>
            <a href="https://www.mdcalc.com/calc/10475/revised-tokuhashi-scoring-system" target="_blank" rel="noopener noreferrer"
              className="detail-btn detail-btn-primary" style={{ display: "inline-flex" }}>
              <IconExternal /> Open Tokuhashi Calculator on MDCalc
            </a>
          </div>
        )}
      {calc.component === "hfa-icos" && (
  <div style={{ padding: "12px", background: "var(--bg)", borderRadius: 8, border: "1px solid var(--border)" }}>
    <p style={{ fontSize: 13.5, color: "var(--text-secondary)", marginBottom: 12 }}>The HFA-ICOS tool is an externally validated risk calculator hosted on MDCalc:</p>
    <a href="https://www.mdcalc.com/calc/10642/hfa-icos-baseline-cardio-oncology-risk-assessment-anthracycline-chemotherapy"
      target="_blank" rel="noopener noreferrer"
      className="detail-btn detail-btn-primary" style={{ display: "inline-flex" }}>
      <IconExternal /> Open HFA-ICOS Calculator on MDCalc
    </a>
  </div>
)}
      </div>
    </div>
  );
}


function OpioidConverter() {
  const C = "#4a7c6b";
  const [drug, setDrug] = useState("morphine-po");
  const [dose, setDose] = useState("");

  const conversions = {
    "codeine-po":        { label: "Codeine PO",          toMorphinePO: 1/10 },
    "dihydrocodeine-po": { label: "Dihydrocodeine PO",   toMorphinePO: 1/10 },
    "tramadol-po":       { label: "Tramadol PO",         toMorphinePO: 1/10 },
    "morphine-po":       { label: "Morphine PO",         toMorphinePO: 1 },
    "oxycodone-po":      { label: "Oxycodone PO",        toMorphinePO: 1.5 },
  };

  const d = parseFloat(dose);
  const valid = !isNaN(d) && d > 0;
  const morphinePO = valid ? d * (conversions[drug]?.toMorphinePO || 1) : null;

  const fentanylTable = [[30,12],[60,25],[120,50],[180,75],[240,100]];
  const bupTable      = [[12,5],[24,10],[48,20],[84,35],[126,52.5],[168,70]];

  function getPatch(table, val) {
    for (let i = table.length - 1; i >= 0; i--) {
      if (val >= table[i][0]) return table[i][1];
    }
    return table[0][1];
  }

  const fentPatch      = morphinePO ? getPatch(fentanylTable, morphinePO) : null;
  const bupPatch       = morphinePO ? getPatch(bupTable, morphinePO) : null;
  const diamorphineSC  = morphinePO ? morphinePO / 3 : null;
  const morphineSC     = morphinePO ? morphinePO / 2 : null;
  const btMin          = morphinePO ? morphinePO / 10 : null;
  const btMax          = morphinePO ? morphinePO / 6 : null;

  const R = ({ label, value, unit, note, highlight }) => (
    <div style={{ padding: "10px 14px", background: highlight ? "#eaf3f0" : "var(--bg)", border: `1px solid ${highlight ? C : "var(--border)"}`, borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
      <div style={{ textAlign: "left" }}>
        <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "Sora, sans-serif" }}>{label}</div>
        {note && <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 2, lineHeight: 1.4 }}>{note}</div>}
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: C, fontFamily: "Sora, sans-serif", flexShrink: 0, marginLeft: 12 }}>
        {value != null ? `${Math.round(value * 10) / 10}${unit ? " " + unit : ""}` : "—"}
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}>
      <div style={{ padding: "10px 14px", background: "#fffbeb", border: "1px solid #f6d860", borderRadius: 8, fontSize: 13, color: "#92700a", lineHeight: 1.5 }}>
        ⚠ Always reduce by 25–50% when switching opioids (incomplete cross-tolerance). Reduce by 50% at high doses, in elderly/frail, or after rapid escalation. Verify with PCF or palliative care team.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "Sora, sans-serif", display: "block", marginBottom: 6 }}>Current opioid</label>
          <select value={drug} onChange={e => setDrug(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, background: "var(--bg)", color: "var(--text-primary)", fontFamily: "DM Sans, sans-serif" }}>
            {Object.entries(conversions).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "Sora, sans-serif", display: "block", marginBottom: 6 }}>Total 24-hour dose (mg)</label>
          <input type="number" value={dose} onChange={e => setDose(e.target.value)} placeholder="e.g. 60"
            style={{ width: "100%", padding: "10px 12px", border: `1px solid ${valid ? C : "var(--border)"}`, borderRadius: 8, fontSize: 16, fontFamily: "Sora, sans-serif", fontWeight: 700, color: C, background: "var(--bg)", boxSizing: "border-box" }} />
        </div>
      </div>
      {valid && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "Sora, sans-serif" }}>Oral equivalences</div>
          <R label="Morphine PO /24h" value={morphinePO} unit="mg" highlight />
          <R label="Breakthrough dose" value={btMin} unit={`– ${Math.round(btMax*10)/10} mg`} note="1/10 to 1/6 of 24h morphine PO — every 2–4h PRN" />
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "Sora, sans-serif", marginTop: 4 }}>SC conversions</div>
          <R label="Diamorphine SC /24h" value={diamorphineSC} unit="mg" note="÷ 3 from morphine PO" />
          <R label="Morphine SC /24h" value={morphineSC} unit="mg" note="÷ 2 from morphine PO" />
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "Sora, sans-serif", marginTop: 4 }}>Transdermal equivalents</div>
          <R label="Fentanyl patch" value={fentPatch} unit="mcg/h" note="72h patch — nearest standard dose. Ratio 100:1 (morphine PO : fentanyl TD)" />
          <R label="Buprenorphine patch" value={bupPatch} unit="mcg/h" note="Nearest standard dose. Ratio 100:1 (morphine PO : buprenorphine TD)" />
          <div style={{ padding: "9px 12px", background: "#fff5f5", border: "1px solid #fc8181", borderRadius: 8, fontSize: 12.5, color: "#742a2a", lineHeight: 1.5 }}>
            ⚡ Patches contraindicated for acute pain (effect takes &gt;12h). Always prescribe PRN medication alongside patches. Verify at high doses with PCF or palliative care team.
          </div>
        </div>
      )}
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
          {pill.indication && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: pill.color, fontFamily: "Sora, sans-serif", marginBottom: 4, opacity: 0.75 }}>Indication</div>
              <p style={{ fontSize: 13.5, color: pill.color, lineHeight: 1.55, margin: 0 }}>{pill.indication}</p>
            </div>
          )}
          {pill.urgent && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 9, padding: "8px 10px", background: pill.border, borderRadius: 6, marginBottom: pill.exclusions && pill.exclusions.length > 0 ? 10 : 0 }}>
              <span style={{ color: pill.color, fontSize: 13, flexShrink: 0, marginTop: 1 }}>⚡</span>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: pill.color }}>{pill.urgent}</span>
            </div>
          )}
          {pill.exclusions && pill.exclusions.length > 0 && (
            <div style={{ marginTop: pill.urgent ? 10 : 0 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: pill.color, fontFamily: "Sora, sans-serif", marginBottom: 6, opacity: 0.75 }}>Contraindications</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                {pill.exclusions.map((ex, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    <span style={{ color: pill.color, fontSize: 9, flexShrink: 0, marginTop: 5 }}>●</span>
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {pill.notes && pill.notes.length > 0 && (
  <div style={{ marginTop: pill.urgent ? 10 : 0 }}>
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: pill.color, fontFamily: "Sora, sans-serif", marginBottom: 6, opacity: 0.75 }}>Notes</div>
    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
      {pill.notes.map((note, j) => (
        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.5 }}>
          <span style={{ color: pill.color, fontSize: 9, flexShrink: 0, marginTop: 5 }}>●</span>
          {note}
        </li>
      ))}
    </ul>
  </div>
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
                        {boldify(item)}
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

function renderItemWithLinks(text) {
  if (!text) return text;
  const parts = [];
  const regex = /\[\[([^\]|]+)\|([^\]]+)\]\]/g;
  let last = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const label = match[1].trim();
    const url = match[2].trim();
    parts.push(
      <a key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          color: "#1a6b8a",
          fontWeight: 600,
          textDecoration: "underline",
          fontStyle: "normal",
          cursor: "pointer",
        }}
        onClick={e => e.stopPropagation()}
      >
        {label} <IconExternal />
      </a>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    parts.push(text.slice(last));
  }
  if (parts.length === 0) return text;
  return <>{parts}</>;
}

// ── Inline renderer — supports **bold**, *italic*, `code`, [[guideline-id]] ──
function renderInline(text, onNavigate) {
  if (!text) return text;
  // tokenise: **bold**, *italic*, `code`, [[id|label]] or [[id]]
  const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[\[[^\]]+\]\])/g;
  const parts = text.split(TOKEN);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i} style={{ fontWeight: 700 }}>{part.slice(2,-2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2)
      return <em key={i} style={{ fontStyle: "italic" }}>{part.slice(1,-1)}</em>;
    if (part.startsWith("`") && part.endsWith("`"))
      return <code key={i} style={{ fontFamily: "monospace", fontSize: "0.92em", background: "var(--border)", padding: "1px 5px", borderRadius: 4, color: "var(--text-primary)" }}>{part.slice(1,-1)}</code>;
    if (part.startsWith("[[") && part.endsWith("]]")) {
      const inner = part.slice(2,-2);
      const [id, label] = inner.includes("|") ? inner.split("|") : [inner, inner];
      return onNavigate
        ? <span key={i} onClick={() => onNavigate({ type: "guideline", guidelineId: id.trim() })}
            style={{ color: "var(--accent)", textDecoration: "underline", cursor: "pointer", fontWeight: 500 }}>{label.trim()}</span>
        : <span key={i} style={{ color: "var(--accent)", fontWeight: 500 }}>{label.trim()}</span>;
    }
    return part;
  });
}

// Legacy alias — keeps existing boldify() calls working
function boldify(text) { return renderInline(text, null); }

// ── Markdown section renderer — renders a full markdown string ───────────────
function MarkdownSection({ content, siteColor, siteAccent, onNavigate }) {
  if (!content) return null;
  const lines = content.split("\n");
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip blank lines
    if (!line.trim()) { i++; continue; }

    // ::: callout blocks  :::warning / :::info / :::danger / :::note
    if (line.trim().match(/^:::(warning|info|danger|note|success)/)) {
      const type = line.trim().replace(":::", "").trim();
      const styles = {
        warning: { bg: "#fffbeb", border: "#f6d860", color: "#92700a", icon: "⚠" },
        info:    { bg: siteAccent, border: siteColor + "55", color: siteColor, icon: "ℹ" },
        danger:  { bg: "#fff5f5", border: "#fc8181", color: "#742a2a", icon: "⚡" },
        note:    { bg: "var(--bg)", border: "var(--border)", color: "var(--text-muted)", icon: "📋" },
        success: { bg: "#f0fff4", border: "#9ae6b4", color: "#276749", icon: "✓" },
      };
      const s = styles[type] || styles.info;
      const blockLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(":::")) {
        blockLines.push(lines[i]);
        i++;
      }
      i++; // consume closing :::
      elements.push(
        <div key={i} style={{ padding: "10px 14px", background: s.bg, border: `1px solid ${s.border}`, borderRadius: 8, display: "flex", gap: 10, marginBottom: 8 }}>
          <span style={{ color: s.color, flexShrink: 0, fontWeight: 700, fontSize: 14 }}>{s.icon}</span>
          <div style={{ color: s.color, fontSize: 13.5, lineHeight: 1.6 }}>
            {blockLines.map((bl, bi) => <div key={bi}>{renderInline(bl, onNavigate)}</div>)}
          </div>
        </div>
      );
      continue;
    }

    // --- horizontal rule
    if (line.trim() === "---") {
      elements.push(<hr key={i} style={{ border: "none", borderTop: "1px solid var(--border-light)", margin: "12px 0" }} />);
      i++; continue;
    }

    // ## heading
    if (line.startsWith("## ")) {
      elements.push(<h4 key={i} style={{ fontSize: 13, fontWeight: 700, color: siteColor, fontFamily: "Sora, sans-serif", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6, marginTop: 10 }}>{line.slice(3)}</h4>);
      i++; continue;
    }

    // | table |
    if (line.trim().startsWith("|")) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines
        .filter(tl => !tl.match(/^\|[-| ]+\|$/)) // skip separator rows
        .map(tl => tl.split("|").slice(1,-1).map(c => c.trim()));
      if (rows.length > 0) {
        elements.push(
          <div key={i} style={{ overflowX: "auto", marginBottom: 8 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5, textAlign: "left" }}>
              <thead>
                <tr>{rows[0].map((cell, ci) => (
                  <th key={ci} style={{ padding: "7px 12px", background: siteAccent, color: siteColor, fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 12, borderBottom: `2px solid ${siteColor}55`, whiteSpace: "nowrap" }}>{renderInline(cell, onNavigate)}</th>
                ))}</tr>
              </thead>
              <tbody>
                {rows.slice(1).map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: "1px solid var(--border-light)", background: ri % 2 === 0 ? "var(--surface)" : "var(--bg)" }}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{ padding: "7px 12px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{renderInline(cell, onNavigate)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // > blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <div key={i} style={{ borderLeft: `3px solid ${siteColor}`, paddingLeft: 12, margin: "6px 0", color: "var(--text-secondary)", fontStyle: "italic", fontSize: 13.5, lineHeight: 1.6 }}>
          {renderInline(line.slice(2), onNavigate)}
        </div>
      );
      i++; continue;
    }

    // - / * bullet list
    if (line.match(/^[-*] /)) {
      const listItems = [];
      while (i < lines.length && lines[i].match(/^[-*] /)) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={i} style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 5, marginBottom: 8, padding: 0 }}>
          {listItems.map((li, lii) => (
            <li key={lii} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>
              <span style={{ color: siteColor, fontSize: 8, flexShrink: 0, marginTop: 6 }}>●</span>
              {renderInline(li, onNavigate)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 1. numbered list
    if (line.match(/^\d+\. /)) {
      const listItems = [];
      let num = 1;
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        listItems.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={i} style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 5, marginBottom: 8, padding: 0 }}>
          {listItems.map((li, lii) => (
            <li key={lii} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>
              <span style={{ color: siteColor, fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 12, flexShrink: 0, minWidth: 18 }}>{lii+1}.</span>
              {renderInline(li, onNavigate)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Plain paragraph
    elements.push(
      <p key={i} style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 6 }}>
        {renderInline(line, onNavigate)}
      </p>
    );
    i++;
  }

  return <>{elements}</>;
}
function HypoAssessmentSection({ sec, siteColor, siteAccent }) {
  const iconMap = {
    history: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
        <circle cx="8.5" cy="8.5" r="5.5"/><path d="M17 17l-3.5-3.5"/>
      </svg>
    ),
    management: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
        <path d="M9 3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/><path d="M17 3l-7 7"/><path d="M13 3h4v4"/>
      </svg>
    ),
    investigations: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
        <circle cx="8.5" cy="8.5" r="5.5"/><path d="M17 17l-3.5-3.5"/>
      </svg>
    ),
  };

  return (
    <div style={{ border: `1.5px solid ${siteColor}`, borderRadius: 10, overflow: "hidden", marginBottom: 14 }}>
      <div style={{ padding: "12px 18px 10px", background: siteAccent, borderBottom: `1px solid ${siteColor}33` }}>
        <h3 style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: siteColor, fontFamily: "Sora, sans-serif" }}>{sec.heading}</h3>
      </div>
      {sec.blocks.map((block, bi) => (
        <div key={bi} style={{ borderBottom: bi < sec.blocks.length - 1 ? `1px solid ${siteColor}22` : "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px 8px", background: bi % 2 === 0 ? "var(--surface)" : "var(--bg)" }}>
            <span style={{ color: siteColor, display: "flex", flexShrink: 0 }}>{iconMap[block.icon] || iconMap.management}</span>
            <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13, color: siteColor }}>{block.label}</span>
          </div>
          <div style={{ height: 1, background: `${siteColor}22`, margin: "0 18px" }} />
          <div style={{ padding: "8px 18px 12px", background: bi % 2 === 0 ? "var(--surface)" : "var(--bg)", display: "flex", flexDirection: "column", gap: block.checklist ? 5 : 6 }}>
            {block.items.map((item, ii) => {
              if (block.checklist) {
                return (
                  <div key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "5px 0", borderBottom: ii < block.items.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                    <span style={{ width: 17, height: 17, border: `2px solid ${siteColor}`, borderRadius: 4, flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.5 }} />
                    <span style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>{boldify(item)}</span>
                  </div>
                );
              }
              const isUrgent = item.startsWith("!!");
              const text = isUrgent ? item.slice(2).trim() : item;
              if (isUrgent) {
                return (
                  <div key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "5px 9px", background: "#fff5f5", border: "1px solid #fc8181", borderRadius: 6 }}>
                    <span style={{ color: "#742a2a", fontSize: 11, flexShrink: 0, marginTop: 2 }}>⚡</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#742a2a", lineHeight: 1.45 }}>{boldify(text)}</span>
                  </div>
                );
              }
              return (
                <div key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ color: siteColor, fontSize: 8, flexShrink: 0, marginTop: 6 }}>●</span>
                  <span style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>{boldify(item)}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function HypoDiagnosticPathway({ siteColor, siteAccent }) {
  const ArrowLabel = ({ text, color }) => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, padding: "4px 0" }}>
      <svg viewBox="0 0 16 20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="18">
        <line x1="8" y1="0" x2="8" y2="12"/><polyline points="3 7 8 13 13 7"/>
      </svg>
      <span style={{ fontSize: 11, fontWeight: 700, color: color, fontFamily: "Sora, sans-serif", letterSpacing: "0.03em" }}>{text}</span>
    </div>
  );

  return (
    <div className="detail-card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "12px 18px 10px", background: siteAccent, borderBottom: `1px solid ${siteColor}33` }}>
        <h3 style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: siteColor, fontFamily: "Sora, sans-serif" }}>Diagnostic Pathway</h3>
      </div>
      <div style={{ padding: "18px 16px", display: "flex", flexDirection: "column", gap: 0 }}>

        {/* Plasma osmolality — two boxes */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <span style={{ display: "inline-block", padding: "5px 16px", background: siteAccent, border: `1.5px solid ${siteColor}`, borderRadius: 99, fontSize: 12, fontWeight: 700, color: siteColor, fontFamily: "Sora, sans-serif" }}>
              Measure Plasma Osmolality
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ border: "1.5px solid #fc8181", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ padding: "8px 12px", background: "#fff5f5", borderBottom: "1px solid #fca5a5" }}>
                <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 12.5, color: "#742a2a" }}>≥275 mOsm/kg</span>
              </div>
              <div style={{ padding: "10px 12px", background: "var(--surface)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#742a2a", marginBottom: 6 }}>Not true hypotonic hyponatraemia — consider:</div>
                {["Hyperglycaemia — glucose displaces Na⁺ osmotically", "Hyperlipidaemia / hyperproteinaemia (pseudohyponatraemia)", "Hypertonic infusion (e.g. mannitol)", "Alcohols"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 3 }}>
                    <span style={{ color: "#e53e3e", fontSize: 7, flexShrink: 0, marginTop: 6 }}>●</span>
                    <span style={{ fontSize: 12.5, color: "#742a2a", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ border: `1.5px solid ${siteColor}`, borderRadius: 10, overflow: "hidden" }}>
              <div style={{ padding: "8px 12px", background: siteAccent, borderBottom: `1px solid ${siteColor}55` }}>
                <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 12.5, color: siteColor }}>&lt;275 mOsm/kg</span>
              </div>
              <div style={{ padding: "10px 12px", background: "var(--surface)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: siteColor, marginBottom: 4 }}>True hypotonic hyponatraemia</div>
                <div style={{ fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.5 }}>Proceed to urine osmolality check below</div>
              </div>
            </div>
          </div>
        </div>

        <ArrowLabel text="If plasma Osm <275" color={siteColor} />

        {/* Urine osmolality */}
        <div style={{ border: `1.5px solid ${siteColor}55`, borderRadius: 10, overflow: "hidden", marginBottom: 6 }}>
          <div style={{ padding: "8px 14px", background: siteAccent, borderBottom: `1px solid ${siteColor}33` }}>
            <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 12.5, color: siteColor }}>Check Urine Osmolality</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            <div style={{ padding: "10px 14px", background: "var(--surface)", borderRight: "1px solid var(--border-light)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#276749", fontFamily: "Sora, sans-serif", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>≤100 mOsm/kg</div>
              {["Primary polydipsia", "Low solute intake ('tea and toast')"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 6, marginBottom: 3 }}>
                  <span style={{ color: "#276749", fontSize: 8, flexShrink: 0, marginTop: 5 }}>●</span>
                  <span style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "10px 14px", background: "var(--surface)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: siteColor, fontFamily: "Sora, sans-serif", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>&gt;100 mOsm/kg</div>
              <div style={{ fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.5 }}>Proceed to severity assessment below</div>
            </div>
          </div>
        </div>

        <ArrowLabel text="If urine Osm >100" color={siteColor} />

        {/* Severe symptoms gate */}
        <div style={{ border: "1.5px solid #e53e3e", borderRadius: 10, overflow: "hidden", marginBottom: 6 }}>
          <div style={{ padding: "8px 14px", background: "#fff5f5", borderBottom: "1px solid #fca5a5", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 14 }}>⚡</span>
            <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13, color: "#742a2a" }}>Severe Symptoms Present?</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            <div style={{ padding: "10px 14px", background: "#fff5f5", borderRight: "1px solid #fca5a5" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#742a2a", fontFamily: "Sora, sans-serif", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>YES — Medical Emergency</div>
              {[
                { text: "Manage in Level 2/3 bed immediately", bold: true },
                { text: "Senior input urgently", bold: true },
                { text: "150ml IV 2·7% NaCl over 20 min via central line*", bold: false },
                { text: "Check Na⁺ — repeat bolus until risen 5 mmol/L or given twice", bold: false },
                { text: "Start diagnosis-specific treatment once stabilised", bold: false },
                { text: "Limit total Na⁺ rise ≤10 mmol/L in first 24h", bold: false },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 4 }}>
                  <span style={{ color: "#e53e3e", fontSize: 8, flexShrink: 0, marginTop: 5 }}>▸</span>
                  <span style={{ fontSize: 12.5, color: "#742a2a", lineHeight: 1.5, fontWeight: item.bold ? 700 : 400 }}>{item.text}</span>
                </div>
              ))}
              <div style={{ marginTop: 6, fontSize: 11, color: "#9b2c2c", fontStyle: "italic", lineHeight: 1.4 }}>*Central line recommended. Consider large-bore peripheral if central access not immediately available — observe for extravasation.</div>
            </div>
            <div style={{ padding: "10px 14px", background: "var(--surface)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: siteColor, fontFamily: "Sora, sans-serif", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>NO — Subacute / Chronic</div>
              {["Assess volume status (see table below)", "Determine chronicity — acute <48h or chronic >48h", "Manage per volume status + chronicity pathway"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 7, marginBottom: 4 }}>
                  <span style={{ color: siteColor, fontSize: 8, flexShrink: 0, marginTop: 5 }}>●</span>
                  <span style={{ fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ArrowLabel text="If no severe symptoms" color={siteColor} />

        {/* Volume status 3-column table */}
        <div style={{ border: `1.5px solid ${siteColor}55`, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: "8px 14px", background: siteAccent, borderBottom: `1px solid ${siteColor}33` }}>
            <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 12.5, color: siteColor }}>Assess Volume Status</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0 }}>
            {[
              { label: "Hypovolaemic", color: "#742a2a", bg: "#fff5f5", border: "#fc8181",
                signs: ["Dry mucous membranes", "Reduced skin turgor", "Low BP / postural hypotension"],
                action: "IV 0·9% NaCl — restore volume. See Acute Hyponatraemia section below." },
              { label: "Euvolaemic", color: siteColor, bg: siteAccent, border: `${siteColor}55`,
                signs: ["Clinically normal", "No oedema", "Normal BP"],
                action: "Check TFTs + cortisol. Consider SIADH. See Acute / Chronic sections below." },
              { label: "Hypervolaemic", color: "#276749", bg: "#f0fff4", border: "#9ae6b4",
                signs: ["Peripheral oedema", "Raised JVP", "Ascites"],
                action: "Treat underlying cause (HF, cirrhosis, nephrotic syndrome). Fluid restrict." },
            ].map((col, ci) => (
              <div key={ci} style={{ borderRight: ci < 2 ? "1px solid var(--border-light)" : "none", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "7px 12px", background: col.bg, borderBottom: `1px solid ${col.border}` }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: col.color, fontFamily: "Sora, sans-serif" }}>{col.label}</span>
                </div>
                <div style={{ padding: "8px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "Sora, sans-serif", marginBottom: 4 }}>Signs</div>
                    {col.signs.map((s, si) => (
                      <div key={si} style={{ display: "flex", gap: 5, marginBottom: 3 }}>
                        <span style={{ color: col.color, fontSize: 7, flexShrink: 0, marginTop: 5 }}>●</span>
                        <span style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.4 }}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "6px 9px", background: col.bg, border: `1px solid ${col.border}`, borderRadius: 6, fontSize: 12, color: col.color, lineHeight: 1.45, fontWeight: 500 }}>
                    {col.action}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
function VteDrugChoicePathway({ siteColor, siteAccent }) {
  const questions = [
    "Patient at risk of bleeding? (recent bleeding, previous GI bleed, mucosal abnormality of GI tract, thrombocytopenia below 50x10^9, antiplatelet agents)",
    "Active GI or urothelial tumour?",
    "Drug interactions between DOAC and anti-cancer therapy or regular medications?",
    "Other contraindication to DOAC? (body weight below 50kg or above 200kg, renal impairment CrCl below 30ml/min, concerns over oral intake or absorption, patient preference)",
  ];

  return (
    <div className="detail-card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "12px 18px 10px", background: siteAccent, borderBottom: `1px solid ${siteColor}33` }}>
        <h3 style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: siteColor, fontFamily: "Sora, sans-serif" }}>Treatment — Drug Choice</h3>
      </div>
      <div style={{ padding: "18px 16px", display: "flex", flexDirection: "column", gap: 8 }}>

        <div style={{ textAlign: "center" }}>
          <span style={{ display: "inline-block", padding: "5px 16px", background: siteAccent, border: `1.5px solid ${siteColor}`, borderRadius: 99, fontSize: 12, fontWeight: 700, color: siteColor, fontFamily: "Sora, sans-serif" }}>
            New Diagnosis of Cancer-Associated DVT or PE
          </span>
        </div>

        <div style={{ border: "1.5px solid #e53e3e", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: "8px 14px", background: "#fff5f5", borderBottom: "1px solid #fca5a5", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13, color: "#742a2a" }}>Extensive iliofemoral DVT or PE with haemodynamic instability?</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ padding: "10px 14px", background: "#fff5f5", borderRight: "1px solid #fca5a5" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#742a2a", fontFamily: "Sora, sans-serif", marginBottom: 4 }}>YES</div>
              <div style={{ fontSize: 13, color: "#742a2a", fontWeight: 600 }}>Consider thrombolysis if appropriate</div>
            </div>
            <div style={{ padding: "10px 14px", background: "var(--surface)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: siteColor, fontFamily: "Sora, sans-serif", marginBottom: 4 }}>NO</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>Proceed to anticoagulation decision below</div>
            </div>
          </div>
        </div>

        <div style={{ border: `1.5px solid ${siteColor}55`, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: "8px 14px", background: siteAccent, borderBottom: `1px solid ${siteColor}33` }}>
            <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 12.5, color: siteColor }}>If YES to any question below — use LMWH</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {questions.map((q, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", borderBottom: i < questions.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                <div style={{ padding: "10px 14px", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{q}</div>
                <div style={{ padding: "10px 8px", background: "#fff5f5", borderLeft: "1px solid var(--border-light)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#742a2a", fontFamily: "Sora, sans-serif" }}>YES</div>
                  <div style={{ fontSize: 11, color: "#742a2a" }}>LMWH</div>
                </div>
                <div style={{ padding: "10px 8px", background: "#f0fff4", borderLeft: "1px solid var(--border-light)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#276749", fontFamily: "Sora, sans-serif" }}>NO</div>
                  <div style={{ fontSize: 11, color: "#276749" }}>{i < questions.length - 1 ? "next" : "DOAC"}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          <div style={{ border: "1.5px solid #e53e3e", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "8px 12px", background: "#fff5f5", borderBottom: "1px solid #fca5a5" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#742a2a", fontFamily: "Sora, sans-serif" }}>Consider Thrombolysis</div>
            </div>
            <div style={{ padding: "10px 12px" }}>
              {["Extensive iliofemoral DVT", "PE with haemodynamic instability", "Discuss urgently with haematology"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                  <span style={{ color: "#e53e3e", fontSize: 8, flexShrink: 0, marginTop: 4 }}>●</span>
                  <span style={{ fontSize: 12, color: "#742a2a", lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ border: `1.5px solid ${siteColor}`, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "8px 12px", background: siteAccent, borderBottom: `1px solid ${siteColor}55` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: siteColor, fontFamily: "Sora, sans-serif" }}>LMWH (Enoxaparin)</div>
            </div>
            <div style={{ padding: "10px 12px" }}>
              {["Bleeding risk present", "Active GI or urothelial tumour", "DOAC drug interaction", "Other DOAC contraindication", "Patient preference"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                  <span style={{ color: siteColor, fontSize: 8, flexShrink: 0, marginTop: 4 }}>●</span>
                  <span style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ border: "1.5px solid #276749", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "8px 12px", background: "#f0fff4", borderBottom: "1px solid #9ae6b4" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#276749", fontFamily: "Sora, sans-serif" }}>DOAC</div>
            </div>
            <div style={{ padding: "10px 12px" }}>
              {["Apixaban", "Rivaroxaban", "Edoxaban"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                  <span style={{ color: "#276749", fontSize: 8, flexShrink: 0, marginTop: 4 }}>●</span>
                  <span style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
              <div style={{ marginTop: 8, padding: "5px 8px", background: "#f0fff4", border: "1px solid #9ae6b4", borderRadius: 6, fontSize: 11, color: "#276749", lineHeight: 1.4 }}>
                No contraindications on pathway above
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
function AnthracyclineCTRCD({ siteColor, siteAccent }) {
  const Ul = ({ items }) => (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item, i) => (
        <li key={i} style={{ padding: "2px 0 2px 14px", position: "relative", color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.55 }}>
          <span style={{ position: "absolute", left: 0, color: "var(--text-muted)" }}>•</span>
          {item}
        </li>
      ))}
    </ul>
  );

  const subLabel = (text, first = false) => (
    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "Sora, sans-serif", marginBottom: 4, marginTop: first ? 0 : 8 }}>{text}</div>
  );

  const actionTag = (label, type) => {
    const map = {
      continue: { bg: "#EAF3DE", color: "#27500A" },
      pause:    { bg: "#FAEEDA", color: "#633806" },
      stop:     { bg: "#FCEBEB", color: "#791F1F" },
      mdt:      { bg: "#E6F1FB", color: "#0C447C" },
    };
    const s = map[type] || map.mdt;
    return (
      <span style={{ display: "inline-block", fontSize: 11, fontWeight: 500, padding: "2px 7px", borderRadius: 4, marginBottom: 5, background: s.bg, color: s.color }}>
        {label}
      </span>
    );
  };

  const thStyle = {
    fontSize: 11, fontWeight: 700, textAlign: "left", padding: "8px 12px",
    background: "var(--bg)", color: "var(--text-muted)",
    borderBottom: "1px solid var(--border-light)",
    fontFamily: "Sora, sans-serif", textTransform: "uppercase", letterSpacing: "0.05em",
  };

  const tdBase = {
    verticalAlign: "top", padding: "10px 12px",
    borderBottom: "1px solid var(--border-light)", fontSize: 13, lineHeight: 1.55,
  };

  const rowBg = {
    low:      { background: "#f6fdf9" },
    mod:      { background: "#fdf8ef" },
    high:     { background: "#fdf2f2" },
    mild:     { background: "#fdf8ef" },
    moderate: { background: "#fff4f0" },
    severe:   { background: "#fdf2f2" },
  };

  const riskLabel = (text, color) => (
    <div style={{ fontWeight: 700, fontSize: 13, color, marginBottom: 4, fontFamily: "Sora, sans-serif" }}>{text}</div>
  );

  const riskPill = (text, bg, color) => (
    <span style={{ display: "inline-block", fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 4, marginBottom: 6, background: bg, color }}>{text}</span>
  );

  const cardStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 0,
  };

  const cardHeader = {
    padding: "10px 16px",
    borderBottom: "1px solid var(--border-light)",
    display: "flex", alignItems: "center", gap: 8,
  };

  const sectionLabel = {
    display: "block", fontSize: 11, fontWeight: 700,
    letterSpacing: "0.07em", textTransform: "uppercase",
    color: "var(--text-muted)", marginBottom: 6, paddingLeft: 2,
    fontFamily: "Sora, sans-serif",
  };

  return (
    <div style={{ padding: "4px 0" }}>

      {/* ── Step 1 callout ── */}
      <div style={{
        background: siteAccent, border: `1.5px solid ${siteColor}`,
        borderRadius: 10, padding: "12px 16px",
        display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20,
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: "50%", background: siteColor,
          color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "Sora, sans-serif",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1,
        }}>1</div>
        <div>
          <p style={{ fontSize: 13.5, color: siteColor, lineHeight: 1.55, margin: "0 0 6px" }}>
            Before starting anthracyclines, stratify cardiovascular risk using the{" "}
            <strong>HFA–ICOS baseline risk assessment tool</strong>. Risk category (low / moderate / high / very high)
            determines surveillance intensity and need for Cardio-Oncology referral.
          </p>
          <a
            href="https://www.mdcalc.com/calc/10642/hfa-icos-baseline-cardio-oncology-risk-assessment-anthracycline-chemotherapy"
            target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, fontWeight: 700, color: siteColor }}
          >
            Open HFA–ICOS calculator ↗
          </a>
        </div>
      </div>

      {/* ── Table 1: Surveillance by risk ── */}
      <span style={sectionLabel}>Table 1 — Surveillance by baseline risk</span>
      <div style={{ ...cardStyle, marginBottom: 20 }}>
        <div style={{ ...cardHeader, background: siteAccent }}>
          <span style={{ fontSize: 13, color: siteColor }}>♥</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: siteColor, fontFamily: "Sora, sans-serif" }}>Baseline cardiovascular risk stratification &amp; surveillance</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: "18%" }} /><col style={{ width: "28%" }} />
              <col style={{ width: "27%" }} /><col style={{ width: "27%" }} />
            </colgroup>
            <thead>
              <tr>
                <th style={thStyle}>Risk</th>
                <th style={thStyle}>Baseline investigations</th>
                <th style={thStyle}>Cardiac biomarkers</th>
                <th style={thStyle}>Echocardiography</th>
              </tr>
            </thead>
            <tbody>
              {/* Low */}
              <tr>
                <td style={{ ...tdBase, ...rowBg.low }}>
                  {riskLabel("Low", "#0F6E56")}
                  {riskPill("HFA-ICOS low", "#E1F5EE", "#085041")}
                </td>
                <td style={{ ...tdBase, ...rowBg.low }}><Ul items={["ECG", "Echocardiogram"]} /></td>
                <td style={{ ...tdBase, ...rowBg.low }}><Ul items={["Routine serial measurement not required", "Consider if clinical or imaging changes suggest cardiotoxicity"]} /></td>
                <td style={{ ...tdBase, ...rowBg.low }}><Ul items={["At completion of treatment", "12 months post-treatment"]} /></td>
              </tr>
              {/* Moderate */}
              <tr>
                <td style={{ ...tdBase, ...rowBg.mod }}>
                  {riskLabel("Moderate", "#854F0B")}
                  {riskPill("HFA-ICOS moderate", "#FAEEDA", "#633806")}
                </td>
                <td style={{ ...tdBase, ...rowBg.mod }}><Ul items={["ECG", "Echocardiogram"]} /></td>
                <td style={{ ...tdBase, ...rowBg.mod }}>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 4 }}>Consider at:</div>
                  <Ul items={["Mid-therapy", "New cardiovascular symptoms", "Significant LVEF or GLS decline", "Clinical suspicion of cardiotoxicity"]} />
                </td>
                <td style={{ ...tdBase, ...rowBg.mod }}><Ul items={["Mid-treatment", "Completion of treatment", "12 months post-treatment"]} /></td>
              </tr>
              {/* High */}
              <tr>
                <td style={{ ...tdBase, ...rowBg.high, borderBottom: "none" }}>
                  {riskLabel("High / Very high", "#A32D2D")}
                  {riskPill("HFA-ICOS high / very high", "#FCEBEB", "#791F1F")}
                </td>
                <td style={{ ...tdBase, ...rowBg.high, borderBottom: "none" }}>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {["ECG", "Echocardiogram (or CMR if suboptimal windows)", "hs-Troponin + NT-proBNP"].map((item, i) => (
                      <li key={i} style={{ padding: "2px 0 2px 14px", position: "relative", color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.55 }}>
                        <span style={{ position: "absolute", left: 0, color: "var(--text-muted)" }}>•</span>{item}
                      </li>
                    ))}
                    <li style={{ padding: "2px 0 2px 14px", position: "relative", fontWeight: 700, color: "#A32D2D", fontSize: 13 }}>
                      <span style={{ position: "absolute", left: 0 }}>•</span>Refer to Cardio-Oncology clinic
                    </li>
                  </ul>
                </td>
                <td style={{ ...tdBase, ...rowBg.high, borderBottom: "none" }}>
                  <Ul items={["Serial measurement at baseline", "Individualised monitoring plan thereafter", "Interval may decrease if biomarkers rise"]} />
                </td>
                <td style={{ ...tdBase, ...rowBg.high, borderBottom: "none" }}>
                  <Ul items={["Every 3 cycles during treatment", "3 months post-treatment", "12 months post-treatment"]} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Table 2: CTRCD classification ── */}
      <span style={sectionLabel}>Table 2 — CTRCD classification &amp; management</span>
      <div style={cardStyle}>
        <div style={{ ...cardHeader, background: siteAccent }}>
          <span style={{ fontSize: 13, color: siteColor }}>⚡</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: siteColor, fontFamily: "Sora, sans-serif" }}>Anthracycline-induced CTRCD — diagnosis &amp; management</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: "15%" }} /><col style={{ width: "28%" }} />
              <col style={{ width: "28.5%" }} /><col style={{ width: "28.5%" }} />
            </colgroup>
            <thead>
              <tr>
                <th style={thStyle}>Severity</th>
                <th style={thStyle}>Diagnostic criteria</th>
                <th style={thStyle}>Symptomatic management</th>
                <th style={thStyle}>Asymptomatic management</th>
              </tr>
            </thead>
            <tbody>
              {/* Mild */}
              <tr>
                <td style={{ ...tdBase, ...rowBg.mild }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#854F0B", fontFamily: "Sora, sans-serif" }}>Mild</div>
                </td>
                <td style={{ ...tdBase, ...rowBg.mild }}>
                  {subLabel("Symptomatic", true)}
                  <Ul items={["Mild HF symptoms", "Not requiring initiation/escalation of intensive HF therapy"]} />
                  {subLabel("Asymptomatic")}
                  <Ul items={["EF ≥50%", "New relative GLS decline ≥15% from baseline", "And/or new rise in cardiac biomarkers"]} />
                </td>
                <td style={{ ...tdBase, ...rowBg.mild }}>
                  {actionTag("MDT discussion", "mdt")}
                  <Ul items={["Consider Cardio-Oncology MDT — continuation vs interruption", "Start HF therapy (ACEi/ARB/ARNI + beta-blocker + MRA + SGLT2i)"]} />
                </td>
                <td style={{ ...tdBase, ...rowBg.mild }}>
                  {actionTag("Continue + monitor", "continue")}
                  <Ul items={["Continue anthracyclines with close monitoring", "Initiate cardioprotective therapy — ACE inhibitor + beta-blocker", "Repeat echo + biomarkers in 4 weeks or at next cycle"]} />
                </td>
              </tr>
              {/* Moderate */}
              <tr>
                <td style={{ ...tdBase, ...rowBg.moderate }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#A32D2D", fontFamily: "Sora, sans-serif" }}>Moderate</div>
                </td>
                <td style={{ ...tdBase, ...rowBg.moderate }}>
                  {subLabel("Symptomatic", true)}
                  <Ul items={["Outpatient intensification of diuretic and HF therapy required"]} />
                  {subLabel("Asymptomatic")}
                  <Ul items={["EF reduction ≥10 pp to EF 40–49%", "Or EF reduction <10 pp to EF 40–49% plus GLS decline ≥15% or new rise in biomarkers"]} />
                </td>
                <td style={{ ...tdBase, ...rowBg.moderate }}>
                  {actionTag("MDT discussion", "mdt")}
                  <Ul items={["Consider Cardio-Oncology MDT — continuation vs interruption", "Start HF therapy"]} />
                </td>
                <td style={{ ...tdBase, ...rowBg.moderate }}>
                  {actionTag("Pause anthracyclines", "pause")}
                  <Ul items={["Pause anthracyclines", "Refer to Cardio-Oncology MDT", "Start HF therapy"]} />
                </td>
              </tr>
              {/* Severe */}
              <tr>
                <td style={{ ...tdBase, ...rowBg.severe, borderBottom: "none" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#791F1F", fontFamily: "Sora, sans-serif" }}>Severe / Very severe</div>
                </td>
                <td style={{ ...tdBase, ...rowBg.severe, borderBottom: "none" }}>
                  {subLabel("Symptomatic", true)}
                  <Ul items={["Severe — HF requiring hospitalisation", "Very severe — HF requiring inotropic/mechanical circulatory support or consideration of transplantation"]} />
                  {subLabel("Asymptomatic")}
                  <Ul items={["EF ≤40%"]} />
                </td>
                <td style={{ ...tdBase, ...rowBg.severe, borderBottom: "none" }}>
                  {actionTag("Discontinue anthracyclines", "stop")}
                  <Ul items={["Severe: pause anthracyclines + urgent Cardio-Oncology MDT referral + HF therapy", "Very severe: discontinue + urgent Cardio-Oncology MDT referral + HF therapy"]} />
                </td>
                <td style={{ ...tdBase, ...rowBg.severe, borderBottom: "none" }}>
                  {actionTag("Pause anthracyclines", "pause")}
                  <Ul items={["Pause anthracyclines", "Refer to Cardio-Oncology MDT", "Start HF therapy"]} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Note */}
        <div style={{
          background: "var(--bg)", borderTop: "1px solid var(--border-light)",
          padding: "8px 14px", fontSize: 12, color: "var(--text-muted)",
          fontStyle: "italic", lineHeight: 1.5,
        }}>
          HF therapy = guideline-directed medical therapy: ACEi/ARB/ARNI + beta-blocker + MRA + SGLT2i as clinically appropriate.
          ACE inhibitors must be discontinued for 48 hours before initiating ARNI. No washout required when switching from ARB to ARNI directly.
        </div>
      </div>

    </div>
  );
}
function ScopeDrugsSection({ sec, siteColor }) {
  const classStyle = (cls) => {
    if (!cls) return {};
    const isXa = cls.toLowerCase().includes("xa");
    return isXa
      ? { background: "#E6F1FB", color: "#185FA5", border: "0.5px solid #85B7EB" }
      : { background: "#EEEDFE", color: "#3C3489", border: "0.5px solid #AFA9EC" };
  };

  return (
    <div className="detail-card">
      <h3 style={{ marginBottom: 14 }}>{sec.heading}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

        <div style={{ border: "1px solid var(--border-light)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", background: "var(--surface)", borderBottom: "1px solid var(--border-light)", fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
            <span style={{ fontSize: 15, color: siteColor }}>📋</span>
            Scope of document
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {(sec.scope || []).map((item, i) => (
              <li key={i} style={{ padding: "7px 14px 7px 28px", fontSize: 13, lineHeight: 1.55, color: "var(--text-secondary)", borderBottom: i < sec.scope.length - 1 ? "1px solid var(--border-light)" : "none", position: "relative", background: i % 2 === 0 ? "var(--bg)" : "var(--surface)" }}>
                <span style={{ position: "absolute", left: 12, top: 8, color: siteColor, fontSize: 12, fontWeight: 700 }}>·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ border: "1px solid var(--border-light)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", background: "var(--surface)", borderBottom: "1px solid var(--border-light)", fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
            <span style={{ fontSize: 15, color: siteColor }}>💊</span>
            Drugs covered
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: 10, background: "var(--bg)" }}>
            {(sec.drugs || []).map((drug, i) => (
              <div key={i} style={{ padding: "9px 11px", border: "1px solid var(--border-light)", borderRadius: 8, background: "var(--surface)", display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)", fontFamily: "Sora, sans-serif" }}>{drug.name}</span>
                {drug.brand && <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{drug.brand}</span>}
                {drug.class && (
                  <span style={{ fontSize: 11, padding: "2px 7px", borderRadius: 20, marginTop: 3, display: "inline-block", width: "fit-content", fontWeight: 500, ...classStyle(drug.class) }}>
                    {drug.class}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
      {sec.note && (
        <p style={{ marginTop: 10, fontSize: 12, color: "var(--text-muted)", fontStyle: "italic", lineHeight: 1.5 }}>
          ⓘ {sec.note}
        </p>
      )}
    </div>
  );
}
function SectionBlock({ sec, siteColor, siteAccent, siteId, subsiteId, expandedScore, setExpandedScore, onNavigate }) {
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
                  <div key={bi} style={{padding: "9px 12px",
background: isAlert ? "#fff5f5" : "var(--surface)",
border: `1px solid ${isAlert ? "#fc8181" : block.border || "var(--border-light)"}`,
borderLeft: `3px solid ${isAlert ? "#e53e3e" : blockColor}`,
borderRadius: 6,}}>
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
                    {block.calcLink && (
  <button
    onClick={() => onNavigate({ type: "calculator", calcId: block.calcLink.calcId })}
    className="detail-btn detail-btn-primary"
    style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 12 }}
  >
    <IconExternal /> {block.calcLink.label}
  </button>
)}
{block.note && (
  <p style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 6, fontStyle: "italic", lineHeight: 1.45 }}>
    {renderItemWithLinks(block.note)}
  </p>
)}                 </div>
                );
              })}
            </div>
          </div>
        ))}
        {sec.note && <p style={{ fontSize: 12, color: "var(--text-muted)", fontStyle: "italic", lineHeight: 1.5 }}>ⓘ {sec.note}</p>}
      </div>
    );
  }
if (sec.type === "mscc_steroid_table") {
  return <MSCCSteroidTable siteColor={siteColor} siteAccent={siteAccent} />;
}
if (sec.type === "scope_drugs") {
    return <ScopeDrugsSection sec={sec} siteColor={siteColor} />;
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

  // ── Neutropenic sepsis review & monitoring flow ───────────────────────────
  if (sec.type === "review_flow") {
    const ClockIcon = () => (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
        <circle cx="8" cy="8" r="6.5"/><polyline points="8 4.5 8 8 10.5 9.5"/>
      </svg>
    );
    const ArrowDown = () => (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <line x1="8" y1="2" x2="8" y2="12"/><polyline points="4 8 8 13 12 8"/>
      </svg>
    );

    return (
      <div className="detail-card" style={{ padding: 0, overflow: "hidden" }}>
        {/* Section heading */}
        <div style={{ padding: "13px 18px 10px", borderBottom: "1px solid var(--border-light)" }}>
          <h3 style={{ margin: 0 }}>Review &amp; Monitoring</h3>
        </div>

        <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 14 }}>

          {/* 24–48h callout */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "11px 14px", background: siteAccent, border: `1.5px solid ${siteColor}`, borderRadius: 8 }}>
            <span style={{ color: siteColor, flexShrink: 0, marginTop: 1 }}><ClockIcon /></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13, color: siteColor, marginBottom: 6 }}>{sec.review24.callout}</div>
              {sec.review24.items.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 4 }}>
                  <span style={{ color: siteColor, fontSize: 7, flexShrink: 0, marginTop: 6 }}>●</span>
                  <span style={{ fontSize: 13, color: siteColor, lineHeight: 1.55, opacity: 0.9 }}>{renderInline(item, onNavigate)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status boxes */}
          <div style={{ display: "flex", flexDirection: "column", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "7px 14px", background: "var(--bg)", borderBottom: "1px solid var(--border-light)" }}>
              <span style={{ fontFamily: "Sora, sans-serif", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Patient Status at Review</span>
            </div>
            {sec.statuses.map((st, si) => (
              <div key={si} style={{ borderBottom: si < sec.statuses.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                <div style={{ padding: "8px 14px", background: st.bg, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: st.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, fontFamily: "Sora, sans-serif", flexShrink: 0 }}>{st.key}</div>
                  <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13, color: st.color }}>{st.label}</span>
                </div>
                <div style={{ padding: "8px 14px 10px", background: "var(--surface)" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 10px", marginBottom: 7 }}>
                    {st.criteria.map((c, ci) => (
                      <span key={ci} style={{ fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>• {c}</span>
                    ))}
                  </div>
                  {st.items.map((item, ii) => {
                    const isUrgent = item.startsWith("!!");
                    const text = isUrgent ? item.slice(2).trim() : item;
                    return isUrgent ? (
                      <div key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 7, padding: "5px 9px", background: "#fff5f5", border: "1px solid #fc8181", borderRadius: 6, marginBottom: 4 }}>
                        <span style={{ color: "#742a2a", fontSize: 11, flexShrink: 0, marginTop: 1 }}>⚡</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#742a2a", lineHeight: 1.45 }}>{renderInline(text, onNavigate)}</span>
                      </div>
                    ) : (
                      <div key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 4 }}>
                        <span style={{ color: st.color, fontSize: 7, flexShrink: 0, marginTop: 6 }}>●</span>
                        <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55 }}>{renderInline(item, onNavigate)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Arrow down */}
          <div style={{ display: "flex", justifyContent: "center", color: "var(--text-muted)" }}><ArrowDown /></div>

          {/* No Response — amber/red */}
          <div style={{ border: "1.5px solid #e53e3e", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "9px 14px", background: "#fff5f5", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#e53e3e", flexShrink: 0 }}><ClockIcon /></span>
              <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13, color: "#742a2a" }}>{sec.noResponse.trigger}</span>
            </div>
            <div style={{ padding: "10px 14px", background: "var(--surface)" }}>
              <div style={{ fontSize: 13, color: "#742a2a", fontWeight: 600, marginBottom: 10 }}>{sec.noResponse.instruction}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {sec.noResponse.factors.map((f, fi) => (
                  <div key={fi} style={{ background: "var(--bg)", border: "1px solid var(--border-light)", borderRadius: 7, overflow: "hidden" }}>
                    <div style={{ padding: "7px 12px", background: "#fff5f5", borderBottom: "1px solid #fc8181", display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{ fontSize: 13 }}>{f.icon}</span>
                      <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 12, color: "#742a2a" }}>{f.label}</span>
                    </div>
                    <div style={{ padding: "8px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
                      {f.items.map((item, ii) => (
                        <div key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                          <span style={{ color: "#e53e3e", fontSize: 7, flexShrink: 0, marginTop: 6 }}>●</span>
                          <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{renderInline(item, onNavigate)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Arrow down */}
          <div style={{ display: "flex", justifyContent: "center", color: "#276749" }}><ArrowDown /></div>

          {/* Good response — IV to Oral switch (green) */}
          <div style={{ border: "1.5px solid #9ae6b4", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "9px 14px", background: "#f0fff4", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>✓</span>
              <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13, color: "#276749" }}>{sec.oralSwitch.trigger}</span>
            </div>
            <div style={{ padding: "10px 14px", background: "var(--surface)" }}>
              <p style={{ fontSize: 12, color: "var(--text-muted)", fontStyle: "italic", marginBottom: 10 }}>{sec.oralSwitch.note}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {sec.oralSwitch.options.map((opt, oi) => (
                  <div key={oi} style={{ background: "#f0fff4", border: "1px solid #9ae6b4", borderRadius: 7, padding: "9px 12px" }}>
                    <div style={{ fontSize: 12, color: "#276749", fontWeight: 600, marginBottom: 4 }}>{opt.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#276749", fontFamily: "Sora, sans-serif", marginBottom: 4 }}>{opt.drug} <span style={{ fontWeight: 400, fontSize: 12 }}>× {opt.course}</span></div>
                    <div style={{ fontSize: 12, color: "#744210", background: "#fffbeb", border: "1px solid #f6d860", borderRadius: 5, padding: "4px 8px" }}>⚠ {opt.warning}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
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




if (sec.type === "hypo_assessment") {
    return <HypoAssessmentSection sec={sec} siteColor={siteColor} siteAccent={siteAccent} />;
  }

  if (sec.type === "hypo_diagnostic") {
    return <HypoDiagnosticPathway siteColor={siteColor} siteAccent={siteAccent} />;
  }

  if (sec.type === "vte_drug_choice") {
    return <VteDrugChoicePathway siteColor={siteColor} siteAccent={siteAccent} />;
  }

  if (sec.type === "markdown") {
    return (
      <div className="detail-card">
        {sec.heading && <h3 style={{ marginBottom: 12 }}>{sec.heading}</h3>}
        <MarkdownSection content={sec.content} siteColor={siteColor} siteAccent={siteAccent} onNavigate={onNavigate} />
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
              <div style={{ fontSize: 13.5, fontWeight: 600, color: siteColor, fontFamily: "Sora, sans-serif", marginBottom: 4, textAlign: "left" }}>{item.label}</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, textAlign: "left" }}>{item.detail}</div>
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

  if (sec.type === "checklist") {return (
  <div className="detail-card">
    <h3>{sec.heading}</h3>
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>
      {sec.items.map((item, i) => {
        const hasSubitems = typeof item === "object" && item.subitems?.length;
        const text = typeof item === "object" ? item.text : item;
        return (
          <div key={i} style={{ borderBottom: "1px solid var(--border-light)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: "var(--text-secondary)", padding: hasSubitems ? "6px 0 4px" : "6px 0" }}>
              <span style={{ width: 18, height: 18, border: `2px solid ${siteColor}`, borderRadius: 4, flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.5 }} />
              <span style={{ fontWeight: hasSubitems ? 500 : 400, color: hasSubitems ? "var(--text-primary)" : "var(--text-secondary)" }}>
                {boldify(text)}
              </span>
            </div>
            {hasSubitems && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 28, paddingBottom: 8 }}>
                {item.subitems.map((sub, si) => (
  <div key={si} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
    <span style={{ width: 13, height: 13, border: `2px solid ${siteColor}`, borderRadius: 3, flexShrink: 0, marginTop: 3, opacity: 0.5 }} />
    {boldify(sub)}
  </div>
))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);}

  if (sec.type === "alert") {
    return (
      <div className="detail-card" style={{ borderLeft: `3px solid #e53e3e`, background: "#fff5f5" }}>
        <h3 style={{ color: "#c53030" }}>{sec.heading}</h3>
        {sec.note && <p style={{ fontSize: 13, color: "#742a2a", marginBottom: 10, fontStyle: "italic" }}>{sec.note}</p>}
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {sec.items.map((item, i) => {
            if (item && typeof item === "object" && item.tel) {
              return (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13.5, color: "#742a2a", lineHeight: 1.4, flex: 1 }}>{boldify(item.text)}</span>
                  <a href={`tel:${item.tel}`} style={{ display: "inline-block", padding: "5px 14px", background: "#c53030", color: "#fff", borderRadius: 6, fontWeight: 700, fontSize: 12.5, textDecoration: "none", fontFamily: "Sora, sans-serif", flexShrink: 0, whiteSpace: "nowrap" }}>
                    {item.telLabel || `☎ ${item.tel}`}
                  </a>
                </li>
              );
            }
            if (item && typeof item === "object" && item.label) {
              return (
                <li key={i} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <span style={{ color: "#e53e3e", marginTop: 2, flexShrink: 0, fontWeight: 700 }}>▸</span>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: "#742a2a", lineHeight: 1.4 }}>{item.label}</span>
                  </div>
                  {item.detail && (
                    <div style={{ paddingLeft: 20, fontSize: 12.5, color: "#9b2c2c", lineHeight: 1.5, display: "flex", alignItems: "flex-start", gap: 6 }}>
                      <span style={{ color: "#e53e3e", flexShrink: 0, fontSize: 8, marginTop: 5 }}>●</span>
                      <span>{boldify(item.detail)}</span>
                    </div>
                  )}
                </li>
              );
            }
            return (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5, color: "#742a2a" }}>
                <span style={{ color: "#e53e3e", marginTop: 2, flexShrink: 0, fontWeight: 700 }}>▸</span>
                {boldify(item)}
              </li>
            );
          })}
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


  // ── Palliative grouped sections — table layout, urgent items pinned ──────
  if (sec.type === "pall_groups") {
    const C = { color: siteColor, bg: siteAccent, border: siteColor + "55", divider: siteColor + "33" };
    return (
      <div className="detail-card" style={{ padding: 0, overflow: "hidden" }}>
        {sec.heading && (
          <div style={{ padding: "14px 18px 10px", borderBottom: `1px solid var(--border-light)` }}>
            <h3 style={{ margin: 0 }}>{sec.heading}</h3>
            {sec.note && <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, fontStyle: "italic", lineHeight: 1.5, marginBottom: 0 }}>ⓘ {sec.note}</p>}
          </div>
        )}
        <div>
          {sec.groups.map((group, gi) => {
            const urgentTop    = group.items.filter(i => i.startsWith("!!top:") || (i.startsWith("!!") && !i.startsWith("!!bot:")));
            const urgentBottom = group.items.filter(i => i.startsWith("!!bot:"));
            const normal       = group.items.filter(i => !i.startsWith("!!"));
            const isLast = gi === sec.groups.length - 1;
            return (
              <div key={gi} style={{ borderBottom: isLast ? "none" : `1px solid var(--border-light)`, textAlign: "left" }}>
                {/* Group header row */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 18px", background: C.bg }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: siteColor, flexShrink: 0 }} />
                  <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13, color: siteColor, letterSpacing: "-0.01em" }}>{group.label}</span>
                </div>
                {/* Body */}
                <div style={{ padding: "10px 18px 12px", background: "var(--surface)", display: "flex", flexDirection: "column", gap: 6, textAlign: "left" }}>
                  {/* Urgent top items */}
                  {urgentTop.map((item, ii) => {
                    const text = item.replace(/^!!top:|^!!/, "").trim();
                    return (
                      <div key={"top-"+ii} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 10px", background: "#fff5f5", border: "1px solid #fc8181", borderRadius: 6 }}>
                        <span style={{ color: "#742a2a", fontSize: 12, flexShrink: 0, marginTop: 1 }}>⚡</span>
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: "#742a2a", lineHeight: 1.45, textAlign: "left" }}>{text}</span>
                      </div>
                    );
                  })}
                  {/* Normal items */}
                  {normal.map((item, ii) => (
                    <div key={"n-"+ii} style={{ display: "flex", alignItems: "flex-start", gap: 8, textAlign: "left" }}>
                      <span style={{ color: siteColor, fontSize: 8, flexShrink: 0, marginTop: 6 }}>●</span>
                      <span style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.55, textAlign: "left" }}>{boldify(item)}</span>
                    </div>
                  ))}
                  {/* Urgent bottom items */}
                  {urgentBottom.map((item, ii) => {
                    const text = item.replace(/^!!bot:/, "").trim();
                    return (
                      <div key={"bot-"+ii} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 10px", background: "#fffbeb", border: "1px solid #f6d860", borderRadius: 6 }}>
                        <span style={{ color: "#92700a", fontSize: 12, flexShrink: 0, marginTop: 1 }}>ℹ</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#92700a", lineHeight: 1.45, textAlign: "left" }}>{text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }


  // ── Laxative comparison table ────────────────────────────────────────────
  if (sec.type === "lax_table") {
    const C = siteColor;
    const rows = ["Not constipated", "Already constipated", "No response — titrate"];
    return (
      <div className="detail-card" style={{ padding: 0, overflow: "hidden" }}>
        {sec.heading && (
          <div style={{ padding: "12px 18px 10px", borderBottom: "1px solid var(--border-light)" }}>
            <h3 style={{ margin: 0 }}>{sec.heading}</h3>
            {sec.note && <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, fontStyle: "italic", lineHeight: 1.5, marginBottom: 0 }}>ⓘ {sec.note}</p>}
          </div>
        )}
        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5, textAlign: "left" }}>
            <thead>
              <tr>
                <th style={{ padding: "9px 14px", background: "var(--bg)", borderBottom: "1px solid var(--border)", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "Sora, sans-serif", width: "30%" }}>Situation</th>
                {sec.drugs.map((drug, di) => (
                  <th key={di} style={{ padding: "9px 14px", background: di % 2 === 0 ? siteAccent : "var(--bg)", borderBottom: "1px solid var(--border)", borderLeft: "1px solid var(--border-light)", fontSize: 13, fontWeight: 700, color: C, fontFamily: "Sora, sans-serif" }}>{drug.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} style={{ borderBottom: ri < rows.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                  <td style={{ padding: "9px 14px", color: "var(--text-muted)", fontSize: 12.5, fontWeight: 600, fontFamily: "Sora, sans-serif", background: "var(--bg)", verticalAlign: "top" }}>{row}</td>
                  {sec.drugs.map((drug, di) => (
                    <td key={di} style={{ padding: "9px 14px", color: "var(--text-secondary)", background: di % 2 === 0 ? siteAccent + "55" : "var(--surface)", borderLeft: "1px solid var(--border-light)", verticalAlign: "top", lineHeight: 1.5 }}>{drug.doses[ri]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sec.footer && (
          <div style={{ padding: "9px 14px", background: "#fffbeb", borderTop: "1px solid #f6d860", display: "flex", alignItems: "flex-start", gap: 8 }}>
            <span style={{ fontSize: 12, flexShrink: 0, marginTop: 1 }}>ℹ</span>
            <span style={{ fontSize: 12.5, color: "#92700a", lineHeight: 1.5 }}>{sec.footer}</span>
          </div>
        )}
      </div>
    );
  }

  // ── Dexamethasone monitoring table ───────────────────────────────────────
  if (sec.type === "dex_table") {
    const C = siteColor;
    return (
      <div className="detail-card" style={{ padding: 0, overflow: "hidden" }}>
        {sec.heading && (
          <div style={{ padding: "12px 18px 10px", borderBottom: "1px solid var(--border-light)" }}>
            <h3 style={{ margin: 0 }}>{sec.heading}</h3>
            {sec.note && <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, fontStyle: "italic", lineHeight: 1.5, marginBottom: 0 }}>ⓘ {sec.note}</p>}
          </div>
        )}
        {/* Drug + dose row */}
        <div style={{ padding: "10px 18px", background: siteAccent, borderBottom: "1px solid var(--border-light)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: C, flexShrink: 0 }} />
          <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13.5, color: C }}>{sec.drug}</span>
          <span style={{ fontSize: 13, color: C, opacity: 0.85, marginLeft: 4 }}>{sec.dose}</span>
        </div>
        {/* Monitoring rows */}
        <div>
          {sec.rows.map((row, ri) => (
            <div key={ri} style={{ display: "flex", borderBottom: ri < sec.rows.length - 1 ? "1px solid var(--border-light)" : "none", textAlign: "left" }}>
              <div style={{ width: "35%", minWidth: 110, padding: "9px 14px", background: "var(--bg)", borderRight: "1px solid var(--border-light)", fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "Sora, sans-serif", display: "flex", alignItems: "center" }}>{row.label}</div>
              <div style={{ flex: 1, padding: "9px 14px", background: "var(--surface)", fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>{row.action}</div>
            </div>
          ))}
        </div>
        {sec.footer && (
          <div style={{ padding: "9px 14px", background: "#fffbeb", borderTop: "1px solid #f6d860", display: "flex", alignItems: "flex-start", gap: 8 }}>
            <span style={{ fontSize: 12, flexShrink: 0, marginTop: 1 }}>ℹ</span>
            <span style={{ fontSize: 12.5, color: "#92700a", lineHeight: 1.5 }}>{sec.footer}</span>
          </div>
        )}
      </div>
    );
  }



  // ── Procedure equipment — 2-column table ─────────────────────────────────
  if (sec.type === "proc_equip") {
    const C = siteColor;
    return (
      <div className="detail-card" style={{ padding: 0, overflow: "hidden" }}>
        {sec.heading && (
          <div style={{ padding: "12px 18px 10px", borderBottom: "1px solid var(--border-light)" }}>
            <h3 style={{ margin: 0 }}>{sec.heading}</h3>
          </div>
        )}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5, textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                <th style={{ padding: "7px 14px", background: siteAccent, color: C, fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.05em", width: "35%" }}>Item</th>
                <th style={{ padding: "7px 14px", background: siteAccent, color: C, fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.05em" }}>Detail / Dose</th>
              </tr>
            </thead>
            <tbody>
              {sec.items.map((row, ri) => (
                <tr key={ri} style={{ borderBottom: ri < sec.items.length - 1 ? "1px solid var(--border-light)" : "none", background: ri % 2 === 0 ? "var(--surface)" : "var(--bg)" }}>
                  <td style={{ padding: "8px 14px", fontWeight: 600, color: "var(--text-primary)", verticalAlign: "top", lineHeight: 1.5 }}>{renderInline(row.item, onNavigate)}</td>
                  <td style={{ padding: "8px 14px", color: "var(--text-secondary)", verticalAlign: "top", lineHeight: 1.5 }}>{renderInline(row.detail, onNavigate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // ── Procedure steps — grid layout with numbered rows ─────────────────────
  if (sec.type === "proc_steps") {
    const C = siteColor;
    return (
      <div className="detail-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "13px 18px 10px", borderBottom: "1px solid var(--border-light)" }}>
          <h3 style={{ margin: 0 }}>{sec.heading}</h3>
          {sec.note && <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, fontStyle: "italic", marginBottom: 0 }}>ⓘ {sec.note}</p>}
        </div>
        {sec.groups.map((group, gi) => (
          <div key={gi} style={{ borderBottom: gi < sec.groups.length - 1 ? "1px solid var(--border-light)" : "none" }}>
            {/* Group header */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 18px", background: siteAccent }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C, flexShrink: 0 }} />
              <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 12.5, color: C, letterSpacing: "-0.01em" }}>{group.label}</span>
            </div>
            {/* Step rows */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5, textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                    <th style={{ padding: "6px 12px", background: "var(--bg)", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "Sora, sans-serif", width: 60, whiteSpace: "nowrap" }}>Step</th>
                    <th style={{ padding: "6px 12px", background: "var(--bg)", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "Sora, sans-serif" }}>Action</th>
                    <th style={{ padding: "6px 12px", background: "var(--bg)", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "Sora, sans-serif", width: "35%" }}>Rationale</th>
                  </tr>
                </thead>
                <tbody>
                  {group.steps.map((step, si) => (
                    <tr key={si} style={{ borderBottom: si < group.steps.length - 1 ? "1px solid var(--border-light)" : "none", background: si % 2 === 0 ? "var(--surface)" : "var(--bg)" }}>
                      <td style={{ padding: "9px 12px", verticalAlign: "top" }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: C, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, fontFamily: "Sora, sans-serif", flexShrink: 0 }}>{step.num}</div>
                      </td>
                      <td style={{ padding: "9px 12px", verticalAlign: "top", lineHeight: 1.55, color: "var(--text-secondary)" }}>
                        {renderInline(step.action, onNavigate)}
                        {step.warning && (
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 7, marginTop: 6, padding: "5px 9px", background: "#fff5f5", border: "1px solid #fc8181", borderRadius: 6 }}>
                            <span style={{ color: "#742a2a", fontSize: 11, flexShrink: 0, marginTop: 1 }}>⚡</span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: "#742a2a", lineHeight: 1.45 }}>{renderInline(step.warning, onNavigate)}</span>
                          </div>
                        )}
                        {step.note && (
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 7, marginTop: 6, padding: "5px 9px", background: "#fffbeb", border: "1px solid #f6d860", borderRadius: 6 }}>
                            <span style={{ color: "#92700a", fontSize: 11, flexShrink: 0, marginTop: 1 }}>ℹ</span>
                            <span style={{ fontSize: 13, color: "#92700a", lineHeight: 1.45 }}>{renderInline(step.note, onNavigate)}</span>
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "9px 12px", verticalAlign: "top", fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.5, fontStyle: "italic" }}>{step.rationale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (sec.type === "list") {if (sec.groups) {
  const GROUP_COLORS = [
    { header: "#E6F1FB", icon: "#B5D4F4", iconText: "#0C447C", label: "#185FA5", bullet: "#378ADD", border: "#B5D4F4" },
    { header: "#FAEEDA", icon: "#FAC775", iconText: "#633806", label: "#854F0B", bullet: "#BA7517", border: "#FAC775" },
    { header: "#E1F5EE", icon: "#9FE1CB", iconText: "#085041", label: "#0F6E56", bullet: "#1D9E75", border: "#9FE1CB" },
    { header: "#EEEDFE", icon: "#CECBF6", iconText: "#3C3489", label: "#534AB7", bullet: "#7F77DD", border: "#CECBF6" },
    { header: "#FAECE7", icon: "#F5C4B3", iconText: "#712B13", label: "#993C1D", bullet: "#D85A30", border: "#F5C4B3" },
  ];

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
      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 10 }}>
        {sec.groups.map((group, gi) => {
          const c = GROUP_COLORS[gi % GROUP_COLORS.length];
          return (
            <div key={gi} style={{ border: `0.5px solid ${c.border}`, borderRadius: 10, overflow: "hidden", background: "var(--card-bg, #fff)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: c.header }}>
                <span style={{ width: 22, height: 22, borderRadius: 5, background: c.icon, color: c.iconText, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {groupIconMap[group.icon] || SectionIcons.management}
                </span>
                <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: c.label }}>
                  {group.label}
                </span>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, padding: "10px 14px 12px", margin: 0, borderTop: `0.5px solid ${c.border}` }}>
                {group.items.map((item, ii) => {
                  if (item && typeof item === "object" && item.label) {
                    return (
                      <li key={ii} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                          <span style={{ color: c.bullet, fontSize: 8, flexShrink: 0, marginTop: 6 }}>●</span>
                          <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.4 }}>{boldify(item.label)}</span>
                        </div>
                        {item.detail && (
                          <div style={{ paddingLeft: 16, fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.5, display: "flex", alignItems: "flex-start", gap: 6 }}>
                            <span style={{ color: c.bullet, flexShrink: 0, fontSize: 8, marginTop: 5 }}>●</span>
                            <span>{boldify(item.detail)}</span>
                          </div>
                        )}
                      </li>
                    );
                  }
                  const isUrgent = typeof item === "string" && item.startsWith("!!");
                  const text = isUrgent ? item.slice(2).trim() : item;
                  return isUrgent ? (
                    <li key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 9px", background: "#fff5f5", border: "1px solid #fc8181", borderRadius: 6 }}>
                      <span style={{ color: "#742a2a", fontSize: 11, flexShrink: 0, marginTop: 2 }}>⚡</span>
                      <span style={{ fontSize: 13.5, fontWeight: 700, color: "#742a2a", lineHeight: 1.45 }}>{boldify(text)}</span>
                    </li>
                  ) : (
                    <li key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>
                      <span style={{ color: c.bullet, fontSize: 8, flexShrink: 0, marginTop: 6 }}>●</span>
                      {boldify(text)}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      {sec.note && <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 10, fontStyle: "italic", lineHeight: 1.5 }}>{sec.note}</p>}
    </div>
  );
}}

  // ── Flow arrow — visual step connector ──────────────────────────────────────
  if (sec.type === "flow_arrow") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "2px 0" }}>
        <span style={{ fontSize: 22, color: "var(--text-muted)", lineHeight: 1 }}>↓</span>
        {sec.label && (
          <span style={{
            fontSize: 11, fontWeight: 700, fontFamily: "Sora, sans-serif",
            color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase"
          }}>{sec.label}</span>
        )}
      </div>
    );
  }

  // ── Problem cards — each problem as a card with numbered action steps ────────
  if (sec.type === "problem_cards") {
    const severityStyle = {
      red:   { header: "#fff5f5", border: "#fc8181", titleColor: "#742a2a", dot: "#e53e3e", stepDot: "#fc8181" },
      amber: { header: "#fffbeb", border: "#f6d860", titleColor: "#744210", dot: "#d97706", stepDot: "#f6d860" },
      green: { header: "#f0fff4", border: "#9ae6b4", titleColor: "#276749", dot: "#38a169", stepDot: "#9ae6b4" },
    };
    return (
      <div className="detail-card">
        <h3>{sec.heading}</h3>
        {sec.note && <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10, fontStyle: "italic", lineHeight: 1.5 }}>ⓘ {sec.note}</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
          {sec.cards.map((card, ci) => {
            const s = severityStyle[card.severity] || severityStyle.amber;
            return (
              <div key={ci} style={{ border: `1px solid ${s.border}`, borderRadius: 10, overflow: "hidden" }}>
                {/* Problem header */}
                <div style={{
                  padding: "9px 14px", background: s.header,
                  borderBottom: `1px solid ${s.border}`,
                  display: "flex", alignItems: "center", gap: 8
                }}>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
                  <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13.5, color: s.titleColor }}>
                    {card.problem}
                  </span>
                </div>
                {/* Cause */}
                {card.cause && (
                  <div style={{ padding: "7px 14px 4px", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5, borderBottom: `1px solid var(--border-light)` }}>
                    <span style={{ fontWeight: 700, fontStyle: "normal", color: "var(--text-secondary)", marginRight: 4 }}>Cause:</span>
                    {card.cause}
                  </div>
                )}
                {/* Numbered steps */}
                <div style={{ padding: "8px 14px 12px", display: "flex", flexDirection: "column", gap: 7 }}>
                  {card.steps.map((step, si) => (
                    <div key={si} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: "50%",
                        background: s.stepDot, color: s.titleColor,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700, fontFamily: "Sora, sans-serif",
                        flexShrink: 0, marginTop: 1
                      }}>{si + 1}</div>
                      <div style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>
                        {boldify(step)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (sec.type === "table") {
    const rowColors = {
      "🔴": { bg: "#fff5f5", color: "#742a2a", border: "#fc8181" },
      "🟢": { bg: "#f0fff4", color: "#276749", border: "#9ae6b4" },
    };
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
            {sec.rows.map((row, ri) => {
              const firstCell = row[0] || "";
              const emoji = firstCell.startsWith("🔴") ? "🔴" : firstCell.startsWith("🟢") ? "🟢" : null;
              const rc = emoji ? rowColors[emoji] : null;
              const cellText = emoji ? firstCell.slice(2).trim() : firstCell;
              return (
                <tr key={ri} style={{ borderBottom: "1px solid var(--border-light)" }}>
                  <td style={{
                    padding: "9px 10px", verticalAlign: "top",
                    background: rc ? rc.bg : "var(--bg)",
                    color: rc ? rc.color : "var(--text-primary)",
                    fontWeight: 700,
                    borderLeft: rc ? `3px solid ${rc.border}` : "none",
                    lineHeight: 1.55,
                    fontFamily: "Sora, sans-serif",
                    fontSize: 12.5,
                  }}>{cellText}</td>
                  {row.slice(1).map((cell, ci) => (
                    <td key={ci} style={{
                      padding: "9px 10px", verticalAlign: "top",
                      color: "var(--text-secondary)",
                      fontWeight: 400,
                      lineHeight: 1.55,
                      background: ri % 2 === 0 ? "var(--surface)" : "var(--bg)",
                    }}>{cell}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {sec.note && (
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 10, fontStyle: "italic", lineHeight: 1.5 }}>{sec.note}</p>
        )}
      </div>
    );
  }

if (sec.type === "prophylaxis_box") {
    const panelColors = {
      red:    { color: "#742a2a", bg: "#fff5f5", border: "#fc8181" },
      amber:  { color: "#744210", bg: "#fffff0", border: "#f6e05e" },
      green:  { color: "#276749", bg: "#f0fff4", border: "#9ae6b4" },
    };
    return (
      <div className="detail-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "12px 18px 10px", borderBottom: "1px solid var(--border-light)" }}>
          <h3 style={{ margin: 0 }}>{sec.heading}</h3>
        </div>
        {sec.panels.map((panel, pi) => {
          const pc = panelColors[panel.color] || panelColors.amber;
          return (
            <div key={pi} style={{ borderBottom: pi < sec.panels.length - 1 ? "1px solid var(--border-light)" : "none" }}>
              <div style={{ padding: "10px 18px 8px", background: pc.bg, borderLeft: `4px solid ${pc.border}` }}>
                <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13, color: pc.color, letterSpacing: "-0.01em" }}>{panel.label}</span>
              </div>
              <div style={{ padding: "10px 18px 14px" }}>
                {panel.groups.map((group, gi) => (
                  <div key={gi} style={{ marginBottom: gi < panel.groups.length - 1 ? 12 : 0 }}>
                    <div style={{ height: 1, background: "var(--border-light)", marginBottom: 8 }} />
                    <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13, color: "var(--text-primary)", marginBottom: 6 }}>{group.heading}</div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 5, padding: 0, margin: 0 }}>
                      {group.items.map((item, ii) => {
                        const isUrgent = item.startsWith("!!");
                        const text = isUrgent ? item.slice(2).trim() : item;
                        return isUrgent ? (
                          <li key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "5px 9px", background: "#fff5f5", border: "1px solid #fc8181", borderRadius: 6 }}>
                            <span style={{ color: "#742a2a", fontSize: 11, flexShrink: 0, marginTop: 2 }}>⚡</span>
                            <span style={{ fontSize: 13.5, fontWeight: 700, color: "#742a2a", lineHeight: 1.45 }}>{text}</span>
                          </li>
                        ) : (
                          <li key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>
                            <span style={{ color: pc.color, fontSize: 8, flexShrink: 0, marginTop: 6 }}>●</span>
                            {text}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
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
  if (sec.type === "anthracycline_tables") {
  return <AnthracyclineCTRCD siteColor={siteColor} siteAccent={siteAccent} />;
}
if (sec.type === "drug_registry") {
  return <DrugRegistry entries={sec.entries} siteColor={siteColor} siteAccent={siteAccent} />;
}
if (sec.type === "contact_directory") {
  return <ContactDirectory entries={sec.entries} siteColor={siteColor} siteAccent={siteAccent} />;
}
if (sec.type === "notice_box") {
  const c = { bg: "#fffbeb", border: "#f6ad55", intro: "#744210", label: "#7b3d00", bullet: "#dd6b20" };
  const telBtn = (tel, label) => (
    <a href={`tel:${tel}`} style={{ display: "inline-block", padding: "3px 10px", background: "#dd6b20", color: "#fff", borderRadius: 5, fontWeight: 700, fontSize: 12, textDecoration: "none", fontFamily: "Sora, sans-serif", whiteSpace: "nowrap" }}>
      {label}
    </a>
  );
  const renderNoticeItem = (item, i, small = false) => {
    const base = { display: "flex", alignItems: "flex-start", gap: 8, fontSize: small ? 12.5 : 13, color: c.intro, lineHeight: 1.55 };
    if (typeof item === "string") {
      return (
        <li key={i} style={base}>
          <span style={{ color: c.bullet, marginTop: 2, flexShrink: 0, fontWeight: 700 }}>▸</span>
          <span>{boldify(item)}</span>
        </li>
      );
    }
    if (item.type === "tel") {
      return (
        <li key={i} style={{ ...base, alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ color: c.bullet, flexShrink: 0, fontWeight: 700 }}>▸</span>
          <span style={{ flex: 1 }}>{boldify(item.text)}</span>
          {telBtn(item.tel, item.telLabel || `☎ ${item.tel}`)}
        </li>
      );
    }
    if (item.type === "tel_links") {
      return (
        <li key={i} style={{ ...base, alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ color: c.bullet, flexShrink: 0, fontWeight: 700 }}>▸</span>
          <span>{boldify(item.prefix)}</span>
          {item.links.map((l, li) => <span key={li}>{telBtn(l.tel, l.label)}</span>)}
        </li>
      );
    }
    if (item.type === "email") {
      return (
        <li key={i} style={base}>
          <span style={{ color: c.bullet, marginTop: 2, flexShrink: 0, fontWeight: 700 }}>▸</span>
          <span>
            {item.prefix && <>{boldify(item.prefix)} </>}
            <a href={`mailto:${item.email}`} style={{ color: "#c05621", fontWeight: 700, textDecoration: "underline", wordBreak: "break-all" }}>{item.email}</a>
            {item.suffix && <> {item.suffix}</>}
          </span>
        </li>
      );
    }
    if (item.type === "link_callout") {
      return (
        <li key={i} style={{ listStyle: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.5)", border: `1px solid ${c.border}`, borderRadius: 7, padding: "8px 12px", flexWrap: "wrap", marginTop: 2 }}>
            <span style={{ fontSize: 12.5, color: c.label, flex: 1, lineHeight: 1.4 }}>{item.text}</span>
            <button onClick={() => onNavigate({ type: "guideline", guidelineId: item.guidelineId })}
              style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 11px", background: "#dd6b20", color: "#fff", border: "none", borderRadius: 5, fontWeight: 700, fontSize: 12, fontFamily: "Sora, sans-serif", cursor: "pointer", flexShrink: 0 }}>
              {item.linkLabel} →
            </button>
          </div>
        </li>
      );
    }
    return null;
  };
  return (
    <div className="detail-card">
      <h3>{sec.heading}</h3>
      {/* Preamble — separate box above amber callout */}
      {sec.preamble && (
        <div style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "11px 14px", marginBottom: 10, background: "var(--bg)" }}>
          <p style={{ fontSize: 13.5, color: "var(--text-primary)", fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
            {sec.preamble.main}
          </p>
          {sec.preamble.exception && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 7, marginTop: 7 }}>
              <span style={{ color: "var(--text-muted)", marginTop: 2, flexShrink: 0 }}>▸</span>
              <p style={{ fontSize: 12, color: "var(--text-muted)", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>
                ({sec.preamble.exception})
              </p>
            </div>
          )}
        </div>
      )}
      {/* Amber callout — referral contacts */}
      {sec.callout && (
        <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: "12px 14px" }}>
          {sec.callout.subheading && (
            <p style={{ fontSize: 13, color: c.label, fontWeight: 700, margin: "0 0 8px" }}>{sec.callout.subheading}</p>
          )}
          {sec.callout.criticalItems && (
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6, margin: 0, padding: 0 }}>
              {sec.callout.criticalItems.map((item, i) => renderNoticeItem(item, i, false))}
            </ul>
          )}
          {sec.callout.items?.length > 0 && (
            <div style={{ borderTop: `1px solid ${c.border}`, margin: "10px 0" }} />
          )}
          {sec.callout.items && (
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, margin: 0, padding: 0 }}>
              {sec.callout.items.map((item, i) => renderNoticeItem(item, i, true))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
if (sec.type === "pull_criteria_table") {
  const boldC = { bg: "#fffbeb", border: "#f6ad55", title: "#7b3d00", text: "#744210" };
  const inclC = { bg: "#f0fff4", border: "#9ae6b4", title: "#276749" };
  const exclC = { bg: "#fff5f5", border: "#fc8181", title: "#742a2a" };
  const row = (icon, iconColor, text, weight = 400) => (
    <li style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55 }}>
      <span style={{ color: iconColor, flexShrink: 0, fontSize: 13, marginTop: 1, fontWeight: 700, width: 16, textAlign: "center" }}>{icon}</span>
      <span style={{ fontWeight: weight }}>{boldify(text)}</span>
    </li>
  );
  const block = (c, headerLabel, items, icon, iconColor, weight, note) => (
    <div style={{ border: `1px solid ${c.border}`, borderRadius: 9, overflow: "hidden", marginBottom: 10 }}>
      <div style={{ background: c.bg, padding: "8px 13px", borderBottom: `1px solid ${c.border}` }}>
        <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 11.5, color: c.title, textTransform: "uppercase", letterSpacing: "0.05em" }}>{headerLabel}</span>
      </div>
      {note && <div style={{ padding: "6px 13px", fontSize: 12, color: c.title, fontStyle: "italic", borderBottom: `1px solid ${c.border}`, lineHeight: 1.4 }}>{note}</div>}
      <ul style={{ listStyle: "none", padding: "9px 13px 11px", margin: 0, display: "flex", flexDirection: "column", gap: 7 }}>
        {items.map((item, i) => row(icon, iconColor, item, weight))}
      </ul>
    </div>
  );
  return (
    <div className="detail-card">
      <h3>{sec.heading}</h3>
      {sec.referralNote && (
        <div style={{ background: "#ebf8ff", border: "1px solid #90cdf4", borderRadius: 7, padding: "9px 13px", marginBottom: 12, fontSize: 12.5, color: "#2b6cb0", lineHeight: 1.5 }}>
          ℹ {sec.referralNote}
        </div>
      )}
      {block(boldC, "★ Mandatory — Must meet ALL", sec.boldCriteria, "★", "#dd6b20", 600, sec.boldNote)}
      {block(inclC, "✓ Plus — One or more of:", sec.inclusionCriteria, "✓", "#38a169", 400, null)}
      {block(exclC, "✕ Exclusion — Must NOT meet any", sec.exclusionCriteria, "✕", "#e53e3e", 400, sec.exclusionNote)}
    </div>
  );
}
if (sec.type === "scenario_cards") {
  const LB = { header: "#dbeafe", border: "#93c5fd", title: "#1e40af", bullet: "#3b82f6", detail: "#1e3a8a", action: "#1e40af" };
  return (
    <div className="detail-card">
      <h3>{sec.heading}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
        {sec.cards.map((card, ci) => (
          <div key={ci} style={{ border: `1px solid ${LB.border}`, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "9px 14px", background: LB.header, borderBottom: `1px solid ${LB.border}`, display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: LB.bullet, flexShrink: 0, marginTop: 5 }} />
              <div>
                <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13.5, color: LB.title }}>{card.label}</div>
                {card.detail && <div style={{ fontSize: 12, color: LB.detail, marginTop: 2, lineHeight: 1.4 }}>{card.detail}</div>}
              </div>
            </div>
            <div style={{ padding: "10px 14px 12px", display: "flex", flexDirection: "column", gap: 7 }}>
              {card.actions.map((action, ai) => (
                <div key={ai} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ color: LB.bullet, fontSize: 8, flexShrink: 0, marginTop: 6 }}>●</span>
                  <span style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>{boldify(action)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
if (sec.type === "unsuitable_box") {
  return (
    <div className="detail-card">
      <h3>{sec.heading}</h3>
      {sec.calloutLink && (
        <div style={{ background: "#fffbeb", border: "1px solid #f6ad55", borderRadius: 8, padding: "10px 14px", marginBottom: 12, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: "#744210", fontWeight: 600, flex: 1, lineHeight: 1.4 }}>
            Patients with a new suspected cancer diagnosis — see linked pathway
          </span>
          <button
            onClick={() => onNavigate({ type: "guideline", guidelineId: sec.calloutLink.guidelineId })}
            style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 14px", background: "#dd6b20", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, fontSize: 12.5, fontFamily: "Sora, sans-serif", cursor: "pointer", flexShrink: 0 }}
          >
            {sec.calloutLink.label} →
          </button>
        </div>
      )}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {sec.items.map((item, i) => (
          <li key={i}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ color: "var(--text-muted)", marginTop: 3, flexShrink: 0 }}>▸</span>
              <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{boldify(item.text)}</span>
            </div>
            {item.examples && (
              <ol style={{ listStyleType: "lower-alpha", paddingLeft: 34, margin: "5px 0 0", display: "flex", flexDirection: "column", gap: 4 }}>
                {item.examples.map((ex, ei) => (
                  <li key={ei} style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.5, fontStyle: "italic" }}>{ex}</li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ul>
      {sec.notes && sec.notes.length > 0 && (
        <div style={{ marginTop: 12, borderTop: "1px solid var(--border-light)", paddingTop: 10 }}>
          <p style={{ fontSize: 11.5, color: "var(--text-muted)", fontWeight: 600, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>Additional Linked Pathways</p>
          {sec.notes.map((note, i) => (
            <p key={i} style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.5, margin: "3px 0" }}>{note}</p>
          ))}
        </div>
      )}
    </div>
  );
}
if (sec.type === "link_table") {
  const pinnedItem = sec.items.find(item => item.pinned);
  const tableItems = sec.items.filter(item => !item.pinned);
  const btnStyle = {
    display: "inline-block",
    padding: "5px 14px",
    borderRadius: 6,
    fontWeight: 700,
    fontSize: 12.5,
    textDecoration: "none",
    fontFamily: "Sora, sans-serif",
    letterSpacing: "0.01em",
  };
  return (
    <div className="detail-card" style={{ borderLeft: "3px solid #3182ce", background: "var(--surface)" }}>
      <h3 style={{ color: "var(--text-primary)", marginBottom: 12 }}>{sec.heading}</h3>
      {pinnedItem && (
        <div style={{ background: "#fffbeb", border: "1px solid #f6ad55", borderRadius: 7, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12.5, color: "#744210", fontWeight: 600, fontFamily: "Sora, sans-serif", flexShrink: 0 }}>{pinnedItem.description}</span>
          <a href={pinnedItem.url} style={{ ...btnStyle, background: "#dd6b20", color: "#fff" }}>
            {pinnedItem.label}
          </a>
        </div>
      )}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--bg)" }}>
            <th style={{ padding: "7px 10px", textAlign: "left", fontWeight: 600, color: "var(--text-secondary)", borderBottom: "2px solid var(--border)", fontFamily: "Sora, sans-serif", fontSize: 11.5, letterSpacing: "0.03em", width: "40%", borderRight: "1px solid var(--border)" }}>Name</th>
            <th style={{ padding: "7px 10px", textAlign: "left", fontWeight: 600, color: "var(--text-secondary)", borderBottom: "2px solid var(--border)", fontFamily: "Sora, sans-serif", fontSize: 11.5, letterSpacing: "0.03em" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {tableItems.map((item, i) => (
            <tr key={i} style={{ borderBottom: "1px solid var(--border-light)" }}>
              <td style={{ padding: "7px 10px", verticalAlign: "middle", borderRight: "1px solid var(--border-light)" }}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" style={{
                  ...btnStyle,
                  display: "flex", alignItems: "center", gap: 8,
                  background: "#ebf4ff", color: "#1a56a0",
                  border: "1px solid #2b6cb0",
                  width: "100%", boxSizing: "border-box",
                  justifyContent: "flex-start",
                }}>
                  <span style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 20, height: 20, borderRadius: 4,
                    background: "#bee3f8", flexShrink: 0,
                  }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#1a56a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </span>
                  {item.label}
                </a>
              </td>
              <td style={{ padding: "9px 10px", verticalAlign: "middle", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
  .content { flex: 1; overflow-y: auto; padding: 28px 32px; text-align: left; }

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
  .guideline-detail { max-width: 760px; text-align: left; }
  .detail-header {
    margin-bottom: 24px;
    text-align: left;
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
    text-align: left;
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
  const [expandedSections, setExpandedSections] = useState({ allSites: true, oncology: true, palliative: true, calculators: false, tools: true });
  const [expandedSidebarCats, setExpandedSidebarCats] = useState({});
  const isSidebarCatOpen = (key) => expandedSidebarCats[key] === true; // default closed
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

  const navigate = (v) => {
    setView(v);
    setSearchQuery("");
    setSearchActive(false);
    const mobile = window.innerWidth < 768;
    if (mobile) setSidebarOpen(false);
  };

  useEffect(() => {
    const handler = (e) => navigate({ type: "calculator", calcId: e.detail });
    window.addEventListener("navigateCalc", handler);
    return () => window.removeEventListener("navigateCalc", handler);
  }, []);

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
const DIRECTORY_DATA = {
  callouts: {
    heading: "Live Documents",
    type: "callouts",
    panels: [
      {
        label: "Live SharePoint documents — check these for up-to-date rota and contact information",
        color: "#1a6b8a",
        headerBg: "#e8f4f8",
        blocks: [
          {
            icon: "referral",
            heading: "Weekly Registrar & Consultant Rota",
            color: "#742a2a",
            bg: "#fff5f5",
            border: "#fc8181",
            items: ["!!Always check the live weekly rota for current registrar and consultant on-call assignments — this changes weekly"],
            note: "[[Open Weekly Rota ↗|https://nhs.sharepoint.com/:x:/r/sites/RX1_MedicalWorkforce/_layouts/15/Doc.aspx?sourcedoc=%7BB380240E-02CE-41DB-8FFA-5DE495DEDC92%7D&file=Weekly%20Rota%20New.xlsx&action=default&mobileredirect=true]]",
          },
          {
            icon: "referral",
            heading: "Full Oncology Teams & Contacts Directory",
            color: "#1a6b8a",
            bg: "#e8f4f8",
            border: "#90cde0",
            items: ["Full contact list including consultants, SpRs, secretaries, and team-specific numbers — updated as rotas change"],
            note: "[[Open Oncology Teams Directory ↗|https://nhs.sharepoint.com/:x:/r/sites/RX1_Oncology/_layouts/15/Doc.aspx?sourcedoc=%7B3E49A3EF-0644-49EC-A879-A12F87A7C33A%7D&file=Oncology%20Teams%20and%20links%20August%202025%20v1.xlsx&action=default&mobileredirect=true]]",
          },
        ],
      },
    ],
  },
    entries: [
    // paste your full entries array here — all the ward/oncall/chemo/radiology/rt/cns/ahp entries
  ],
};
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
    if (view.type === "changelog") return [
      { label: "Home", onClick: () => navigate({ type: "home" }) },
      { label: "What's New" },
    ];
    if (view.type === "directory") return [
      { label: "Home", onClick: () => navigate({ type: "home" }) },
      { label: "Directory" },
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
                  {SITES.map(site => {
                    const siteOpen = isSidebarCatOpen(`site-${site.id}`);
                    const isActiveSite = (view.type === "site" && view.siteId === site.id) || (view.type === "guideline" && currentGuideline?.siteId === site.id);
                    return (
                      <div key={site.id}>
                        {/* Site header row — dot+label toggles dropdown, chevron also toggles */}
                        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                          <div
                            className={`sidebar-item ${isActiveSite ? "active" : ""}`}
                            style={{ flex: 1, minWidth: 0 }}
                            onClick={() => {
                              toggleSidebarCat(`site-${site.id}`);
                              navigate({ type: "site", siteId: site.id });
                            }}
                          >
                            <span className="site-dot" style={{ background: site.color }} />
                            {site.label}
                          </div>
                          <div
                            onClick={() => toggleSidebarCat(`site-${site.id}`)}
                            style={{ padding: "6px 8px", cursor: "pointer", color: siteOpen ? site.color : "var(--text-muted)", display: "flex", alignItems: "center", flexShrink: 0 }}
                          >
                            <span style={{ transform: siteOpen ? "rotate(90deg)" : "none", transition: "transform 0.15s", display: "flex" }}><IconChevronRight /></span>
                          </div>
                        </div>
                        {/* Expanded: regular site categories */}
                        {siteOpen && !site.isParent && (
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
                                      onClick={() => g.redirectTo ? navigate({ type: "guideline", guidelineId: g.redirectTo }) : !g.sections ? null : navigate({ type: "guideline", guidelineId: g.id })}
                                    >
                                      {g.title}
                                    </div>
                                  ))}
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {/* Expanded: parent site subsites */}
                        {siteOpen && site.isParent && (
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
                                      onClick={() => g.redirectTo ? navigate({ type: "guideline", guidelineId: g.redirectTo }) : !g.sections ? null : navigate({ type: "guideline", guidelineId: g.id })}
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
                    );
                  })}
                </div>
              )}
            </div>

            <div className="sidebar-divider" />



            <div className="sidebar-divider" />

            {/* Tools */}
            <div className="sidebar-section">
              <div className="sidebar-section-header" onClick={() => toggleSection("tools")}>
                <span className="sidebar-section-title">Tools</span>
                {expandedSections.tools ? <IconChevronDown /> : <IconChevronRight />}
              </div>
              {expandedSections.tools && (
                <div className="sidebar-section-body">
                  <div
                    className={`sidebar-item ${view.type === "calculators" ? "active" : ""}`}
                    onClick={() => navigate({ type: "calculators" })}
                    style={{ fontSize: 13, paddingLeft: 10 }}
                  >
                    <span style={{ display: "flex", opacity: 0.8 }}><IconCalc /></span>
                    Calculators
                  </div>
                  <div
                    className={`sidebar-item ${view.type === "directory" ? "active" : ""}`}
                    onClick={() => navigate({ type: "directory" })}
                    style={{ fontSize: 13, paddingLeft: 10 }}
                  >
                    <span style={{ display: "flex", opacity: 0.8 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 5.5 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.41 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </span>
                    Directory
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Pinned footer — What's New */}
          <div style={{ borderTop: "1px solid var(--border-light)", padding: "8px 8px 10px", flexShrink: 0 }}>
            <div
              className={`sidebar-item ${view.type === "changelog" ? "active" : ""}`}
              onClick={() => navigate({ type: "changelog" })}
              style={{ fontSize: 13, color: "var(--text-muted)" }}
            >
              <span style={{ display: "flex", opacity: 0.75, fontSize: 13 }}>📋</span>
              What's New
              <span style={{ marginLeft: "auto", fontSize: 10.5, padding: "1px 7px", background: "#e8f4f8", border: "1px solid #90cde0", borderRadius: 99, color: "#1a6b8a", fontWeight: 600, fontFamily: "Sora, sans-serif", whiteSpace: "nowrap" }}>
                v{CHANGELOG[0].version}
              </span>
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

            {/* DIRECTORY */}
            {!searchActive && view.type === "directory" && (
              <DirectoryPage onNavigate={navigate} />
            )}

            {/* CHANGELOG */}
            {!searchActive && view.type === "changelog" && (
              <ChangelogPage onNavigate={navigate} />
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
        <h1>Clinical Guidelines NUH</h1>
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


function ChangelogPage({ onNavigate }) {
  return (
    <div>
      <div className="home-greeting">
        <h1>What's New</h1>
        <p>Release notes and updates for ClinGuide</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "0 0 32px" }}>
        {CHANGELOG.map((entry, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
            {/* Version header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderBottom: "1px solid var(--border-light)", background: "var(--bg)" }}>
              <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>v{entry.version}</span>
              <span style={{ fontSize: 11.5, padding: "2px 9px", background: "#e8f4f8", border: "1px solid #90cde0", borderRadius: 99, color: "#1a6b8a", fontWeight: 600, fontFamily: "Sora, sans-serif" }}>{entry.label}</span>
              <span style={{ fontSize: 12.5, color: "var(--text-muted)", marginLeft: "auto" }}>{entry.date}</span>
            </div>
            {/* Changes list */}
            <ul style={{ listStyle: "none", padding: "12px 18px 14px", margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {entry.changes.map((c, ci) => (
                <li key={ci} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3182ce", flexShrink: 0, marginTop: 6 }} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        ))}
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
                            onStar={onStar} onClick={g.redirectTo ? () => onNavigate({ type: "guideline", guidelineId: g.redirectTo }) : null} stub={!g.redirectTo} />
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
                  onStar={onStar} onClick={() => onNavigate({ type: "guideline", guidelineId: g.redirectTo || g.id })} stub={!g.sections && !g.redirectTo} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GuidelinePill({ g, site, starred, onStar, onClick, showSite, stub }) {
  const isRedirect = !!(g && g.redirectTo);
  const effectiveStub = stub && !isRedirect;
  return (
    <div
      className={`guideline-pill${effectiveStub ? " stub" : ""}`}
      style={{ "--pill-color": site.color, "--pill-accent": site.accent }}
      onClick={effectiveStub ? undefined : onClick}
    >
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: site.color, flexShrink: 0, opacity: stub ? 0.5 : 0.8 }} />
      <span className="guideline-pill-title">
        {g.title}
        {effectiveStub && <span className="guideline-pill-badge" style={{ marginLeft: 6 }}>Pending</span>}
        {isRedirect && <span className="guideline-pill-badge" style={{ marginLeft: 6, background: site.accent, border: `1px solid ${site.color}`, color: site.color }}>→ Oncology</span>}
        {showSite && <span style={{ display: "block", fontSize: 11, color: "var(--text-muted)", fontWeight: 400, fontFamily: "DM Sans, sans-serif", marginTop: 1 }}>{site.label}</span>}
      </span>
      {!effectiveStub && !isRedirect && (
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
        {effectiveStub && <span className="guideline-pill-badge" style={{ marginLeft: 6 }}>Pending</span>}
        {isRedirect && <span className="guideline-pill-badge" style={{ marginLeft: 6, background: site.accent, border: `1px solid ${site.color}`, color: site.color }}>→ Oncology</span>}
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
              {renderInline(b, onNavigate)}
            </li>
          ))}
        </ul>
        {g.summaryCalcLink && (
          <div style={{ marginTop: 10, padding: "10px 14px", background: site.accent, border: `1.5px solid ${site.color}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13.5, color: site.color, lineHeight: 1.5, flex: 1, display: "flex", alignItems: "center", gap: 7 }}>
              <IconCalc /> {g.summaryCalcLink.text}
            </span>
            {g.summaryCalcLink.url ? (
              <a href={g.summaryCalcLink.url} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: site.color, color: "white", borderRadius: 8, fontSize: 13, fontWeight: 600, fontFamily: "Sora, sans-serif", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap", textDecoration: "none" }}>
                {g.summaryCalcLink.label} <IconExternal />
              </a>
            ) : (
              <button onClick={() => onNavigate({ type: "calculator", calcId: g.summaryCalcLink.calcId })}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: site.color, color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, fontFamily: "Sora, sans-serif", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}>
                {g.summaryCalcLink.label} →
              </button>
            )}
          </div>
        )}
      </div>

      {/* Rich sections */}
      {(g.sections || []).map((sec, i) => (
  <div key={i} style={{ marginBottom: 16 }}>
    <SectionBlock sec={sec} siteColor={site.color} siteAccent={site.accent}
      siteId={site.id} subsiteId={g.subsiteId}
      expandedScore={expandedScore} setExpandedScore={setExpandedScore} onNavigate={onNavigate} />
  </div>
))}
    </div>
  );
}
function ContactDirectory({ entries, siteColor, siteAccent }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const CATEGORY_META = {
    ward:      { label: "Wards",          color: "#1a6b8a", bg: "#e8f4f8", border: "#90cde0" },
    oncall:    { label: "On-Call",        color: "#742a2a", bg: "#fff5f5", border: "#fc8181" },
    chemo:     { label: "Chemo",          color: "#276749", bg: "#f0fff4", border: "#9ae6b4" },
    radiology: { label: "Radiology",      color: "#553c9a", bg: "#f3effe", border: "#c4b5fd" },
    rt:        { label: "Radiotherapy",   color: "#7b341e", bg: "#fff5f0", border: "#fbd38d" },
    cns:       { label: "CNS",            color: "#0c4a6e", bg: "#e0f2fe", border: "#7dd3fc" },
    ahp:       { label: "AHP & Support",  color: "#134e4a", bg: "#f0fdfa", border: "#99f6e4" },
  };

  const filters = [
    { id: "all", label: "All" },
    ...Object.entries(CATEGORY_META).map(([id, m]) => ({ id, label: m.label })),
  ];

  const q = query.toLowerCase().trim();
  const filtered = entries.filter(e => {
    const matchesFilter = activeFilter === "all" || e.category === activeFilter;
    const matchesQuery = !q ||
      e.name.toLowerCase().includes(q) ||
      (e.note && e.note.toLowerCase().includes(q)) ||
      (e.code && e.code.toLowerCase().includes(q)) ||
      e.numbers.some(n => n.replace(/\s/g, "").includes(q.replace(/\s/g, "")));
    return matchesFilter && matchesQuery;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

      {/* Search */}
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}>
          <IconSearch />
        </div>
        <input
          type="text"
          placeholder="Search name, number, or ward code…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            width: "100%", padding: "10px 12px 10px 36px",
            border: `1px solid ${query ? siteColor : "var(--border)"}`,
            borderRadius: 8, fontSize: 14, fontFamily: "DM Sans, sans-serif",
            background: "var(--bg)", color: "var(--text-primary)",
            outline: "none", boxSizing: "border-box",
            transition: "border-color 0.15s",
          }}
        />
        {query && (
          <button onClick={() => setQuery("")}
            style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}>
            <IconClose />
          </button>
        )}
      </div>

      {/* Category filter pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {filters.map(f => {
          const meta = CATEGORY_META[f.id];
          const active = activeFilter === f.id;
          return (
            <button key={f.id} onClick={() => setActiveFilter(f.id)}
              style={{
                padding: "4px 12px", borderRadius: 99,
                border: `1px solid ${active && meta ? meta.border : "var(--border)"}`,
                background: active ? (meta ? meta.bg : siteAccent) : "var(--bg)",
                color: active ? (meta ? meta.color : siteColor) : "var(--text-muted)",
                fontSize: 12, fontWeight: active ? 700 : 400,
                fontFamily: "Sora, sans-serif", cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "Sora, sans-serif" }}>
        {filtered.length} contact{filtered.length !== 1 ? "s" : ""}{q ? ` matching "${query}"` : ""}
      </div>

      {/* Entries */}
      {filtered.length === 0 ? (
        <div style={{ padding: 24, textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>
          No contacts found.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {filtered.map((entry, i) => {
            const cat = CATEGORY_META[entry.category] || CATEGORY_META.ward;
            return (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1fr auto",
                padding: "9px 12px", background: "var(--surface)",
                border: "1px solid var(--border)", borderLeft: `3px solid ${cat.border}`,
                borderRadius: 7, gap: 10, alignItems: "center",
              }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 600, fontSize: 13.5, fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}>
                      {entry.name}
                    </span>
                    <span style={{
                      fontSize: 11, padding: "1px 7px", borderRadius: 99,
                      background: cat.bg, color: cat.color, border: `1px solid ${cat.border}`,
                      fontWeight: 600, fontFamily: "Sora, sans-serif",
                    }}>
                      {cat.label}
                    </span>
                    {entry.code && (
                      <span style={{ fontSize: 11, padding: "1px 6px", borderRadius: 4, background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-muted)", fontFamily: "Sora, sans-serif" }}>
                        {entry.code}
                      </span>
                    )}
                  </div>
                  {entry.note && (
                    <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 3, lineHeight: 1.5 }}>
                      {entry.note}
                    </div>
                  )}
                  {entry.location && (
  <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 2 }}>
    📍 {entry.location}
  </div>
)}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-end", flexShrink: 0 }}>
                  {entry.numbers.map((num, ni) => (
                    <a key={ni} href={`tel:${num.replace(/\s/g, "")}`}
                      style={{
                        fontSize: 13, fontWeight: 700, fontFamily: "Sora, sans-serif",
                        color: cat.color, textDecoration: "none",
                        padding: "2px 8px", borderRadius: 5,
                        background: cat.bg, border: `1px solid ${cat.border}`,
                        whiteSpace: "nowrap",
                      }}>
                      📞 {num}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
function DirectoryPage({ onNavigate }) {
  return (
    <div>
      <div className="home-greeting">
        <h1>NUH Directory</h1>
        <p>Wards, departments, CNS teams, radiology, radiotherapy and on-call contacts</p>
      </div>
      <div style={{ marginBottom: 16 }}>
        <SectionBlock
          sec={DIRECTORY_DATA.callouts}
          siteColor="#1a6b8a"
          siteAccent="#e8f4f8"
          onNavigate={onNavigate}
        />
      </div>
      <ContactDirectory
        entries={DIRECTORY_DATA.entries}
        siteColor="#1a6b8a"
        siteAccent="#e8f4f8"
      />
    </div>
  );
}
  // Drug table function
function DrugRegistry({ entries, siteColor, siteAccent }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const CATEGORY_META = {
    chemo:        { label: "Cytotoxic chemotherapy", color: "#742a2a", bg: "#fff5f5", border: "#fc8181" },
    targeted:     { label: "Targeted therapy",        color: "#7b341e", bg: "#fff5f0", border: "#fbd38d" },
    immunotherapy:{ label: "Immunotherapy / ICI",     color: "#276749", bg: "#f0fff4", border: "#9ae6b4" },
    hormone:      { label: "Hormonal / endocrine",    color: "#1a6b8a", bg: "#e8f4f8", border: "#90cde0" },
    supportive:   { label: "Supportive / other",      color: "#553c9a", bg: "#f3effe", border: "#c4b5fd" },
  };

  const RISK_META = {
    fn:           { label: "Febrile neutropaenia risk",   icon: "🦠" },
    vesicant:     { label: "Vesicant",                     icon: "⚗" },
    irritant:     { label: "Irritant",                     icon: "⚠" },
    high_emetic:  { label: "High emetic risk",             icon: "🤢" },
    mod_emetic:   { label: "Moderate emetic risk",         icon: "😮" },
    cardiotox:    { label: "Cardiotoxicity risk",          icon: "♥" },
    neurotox:     { label: "Neurotoxicity risk",           icon: "⚡" },
    nephrotox:    { label: "Nephrotoxicity / hydration",   icon: "💧" },
    skin_reaction: { label: "Severe skin reactions / SJS/TEN", icon: "🩹" },
    hyperglycaemia: { label: "Hyperglycaemia risk",        icon: "🩸" },
    pneumonitis:   { label: "Pneumonitis risk",            icon: "🫁" },
    hyperphosphataemia: { label: "Hyperphosphataemia",     icon: "🧪" },
    ppe:           { label: "Palmar-plantar erythrodysaesthesia (PPE)", icon: "✋" },
    ocular_tox:    { label: "Ocular toxicity",             icon: "👁" },
  };

  const filters = [
    { id: "all", label: "All" },
    ...Object.entries(CATEGORY_META).map(([id, m]) => ({ id, label: m.label.split(" / ")[0].split(" ")[0] })),
  ];

  const q = query.toLowerCase().trim();
  const filtered = entries.filter(e => {
    const matchesFilter = activeFilter === "all" || e.category === activeFilter;
    const matchesQuery = !q ||
      e.name.toLowerCase().includes(q) ||
      (e.brand && e.brand.toLowerCase().includes(q)) ||
      (e.drugClass && e.drugClass.toLowerCase().includes(q)) ||
      (e.notes && e.notes.toLowerCase().includes(q));
    return matchesFilter && matchesQuery;
  });

  // Group by first letter for directory feel
  const grouped = filtered.reduce((acc, drug) => {
    const letter = drug.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(drug);
    return acc;
  }, {});

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

      {/* Search bar */}
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}>
          <IconSearch />
        </div>
        <input
          type="text"
          placeholder="Search drug name, brand, or class…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            width: "100%", padding: "10px 12px 10px 36px",
            border: `1px solid ${query ? siteColor : "var(--border)"}`,
            borderRadius: 8, fontSize: 14, fontFamily: "DM Sans, sans-serif",
            background: "var(--bg)", color: "var(--text-primary)",
            outline: "none", boxSizing: "border-box",
            transition: "border-color 0.15s",
          }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}
          >
            <IconClose />
          </button>
        )}
      </div>

      {/* Category filter pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {filters.map(f => {
          const meta = CATEGORY_META[f.id];
          const active = activeFilter === f.id;
          return (
            <button key={f.id} onClick={() => setActiveFilter(f.id)}
              style={{
                padding: "4px 12px", borderRadius: 99, border: `1px solid ${active && meta ? meta.border : "var(--border)"}`,
                background: active ? (meta ? meta.bg : siteAccent) : "var(--bg)",
                color: active ? (meta ? meta.color : siteColor) : "var(--text-muted)",
                fontSize: 12, fontWeight: active ? 700 : 400,
                fontFamily: "Sora, sans-serif", cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "Sora, sans-serif" }}>
        {filtered.length} drug{filtered.length !== 1 ? "s" : ""}{q ? ` matching "${query}"` : ""}
      </div>

      {/* Drug list */}
      {filtered.length === 0 ? (
        <div style={{ padding: "24px", textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>
          No drugs found matching your search.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([letter, drugs]) => (
            <div key={letter}>
              {/* Letter heading — only show when not searching */}
              {!q && (
                <div style={{ fontSize: 11, fontWeight: 700, color: siteColor, fontFamily: "Sora, sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6, paddingBottom: 4, borderBottom: `1px solid ${siteColor}33` }}>
                  {letter}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {drugs.sort((a, b) => a.name.localeCompare(b.name)).map((drug, i) => {
                  const cat = CATEGORY_META[drug.category] || CATEGORY_META.supportive;
                  return (
                    <div key={i} style={{
                      display: "grid", gridTemplateColumns: "1fr auto",
                      padding: "10px 14px", background: "var(--surface)",
                      border: `1px solid var(--border)`, borderLeft: `3px solid ${cat.border}`,
                      borderRadius: 8, gap: 8,
                    }}>
                      {/* Left: name + class + notes */}
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontWeight: 700, fontSize: 14, fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}>
                            {drug.name}
                          </span>
                          {drug.brand && (
                            <span style={{ fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>
                              {drug.brand}
                            </span>
                          )}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3, flexWrap: "wrap" }}>
                          {/* Category pill */}
                          <span style={{
                            fontSize: 11, padding: "1px 7px", borderRadius: 99,
                            background: cat.bg, color: cat.color, border: `1px solid ${cat.border}`,
                            fontWeight: 600, fontFamily: "Sora, sans-serif",
                          }}>
                            {cat.label}
                          </span>
                          {/* Drug class */}
                          {drug.drugClass && (
                            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                              {drug.drugClass}
                            </span>
                          )}
                        </div>
                        {drug.notes && (
                          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4, lineHeight: 1.5 }}>
                            {drug.notes}
                          </div>
                        )}
                      </div>
                      {/* Right: risk badges */}
                      {drug.risks && drug.risks.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-end", flexShrink: 0 }}>
                          {drug.risks.map((risk, ri) => {
                            const rm = RISK_META[risk];
                            if (!rm) return null;
                            return (
                              <span key={ri} style={{
                                fontSize: 11, padding: "2px 7px", borderRadius: 4,
                                background: "var(--bg)", border: "1px solid var(--border)",
                                color: "var(--text-secondary)", whiteSpace: "nowrap",
                                fontFamily: "Sora, sans-serif",
                              }}>
                                {rm.icon} {rm.label}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// ── CALCULATORS REGISTRY ─────────────────────────────────────────────────────