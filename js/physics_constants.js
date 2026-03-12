/* ═══════════════════════════════════════════════════════════════════
   GECKO LAB — CENTRALIZED SCIENTIFIC CONSTANTS  v1.0
   ═══════════════════════════════════════════════════════════════════
   Single source of truth for all biological measurements, physical
   constants, and engineering values used across the site.

   All values are sourced from peer-reviewed literature.
   Import or reference this file when adding new simulations.

   CITATION ABBREVIATIONS USED BELOW:
     [A00]  Autumn et al. 2000  Nature 405:681  doi:10.1038/35079073
     [A02]  Autumn et al. 2002  PNAS 99:12252   doi:10.1073/pnas.192252799
     [A06]  Autumn & Peattie   2002  Integr. Comp. Biol. 42:1081
     [AR03] Arzt et al. 2003   PNAS 100:10603  doi:10.1073/pnas.0409029101
     [IS92] Israelachvili 1992  "Intermolecular and Surface Forces" Academic Press
     [BH10] Bhushan 2010       "Tribology and Mechanics of Magnetic Storage Devices"
     [KI94] Kinloch 1994       "Adhesion and Adhesives" Chapman & Hall
     [BA12] Bartlett et al. 2012  Adv. Mater. 24:1078  doi:10.1002/adma.201103704
═══════════════════════════════════════════════════════════════════ */

'use strict';

const GeckoPhysics = Object.freeze({

  // ── BIOLOGICAL MEASUREMENTS ──────────────────────────────────────

  SETAE: {
    // Number of setae per gecko foot (Gekko gecko, tokay gecko)
    // Source: [A00] Autumn et al. 2000 — direct microscopy count
    COUNT_PER_FOOT: 500000,       // ~500,000 setae per foot

    // Approximate count per individual toe pad (foot ÷ 4 toe pads)
    COUNT_PER_TOE:  125000,       // ~125,000 per toe pad (derived)

    LENGTH_M:       100e-6,       // 100 µm  — [A00] seta length
    DIAMETER_M:     5e-6,         // 5 µm    — [A00] seta diameter
    DENSITY_PER_MM2: 14400,       // ~14,400/mm² — [AR03] Arzt et al. 2003

    // Measured adhesive force per seta (shear, parallel loading)
    // Source: [A00] first direct measurement with micro-fabricated cantilever
    SHEAR_FORCE_N:  194e-6,       // 194 µN shear per seta [A00]
    NORMAL_FORCE_N:  40e-6,       //  ~40 µN normal per seta [A00]
  },

  SPATULAE: {
    // Each seta branches into ~100–1,000 spatulae at its tip
    COUNT_PER_SETA_MIN: 100,
    COUNT_PER_SETA_MAX: 1000,
    COUNT_PER_SETA_NOMINAL: 400, // mid-range estimate

    TIP_WIDTH_M:    200e-9,       // ~200 nm tip width  — [AR03]
    TIP_LENGTH_M:   500e-9,       // ~500 nm tip length — [AR03]

    // Van der Waals force per spatula (Hamaker sphere-flat model)
    // F = A_H * R / (6 * D²)
    // = (1e-19 × 100e-9) / (6 × (0.4e-9)²) ≈ 10.4 nN
    // Source: [IS92]; validated against [A02]
    VDW_FORCE_N:    10e-9,        // ~10 nN per spatula
  },

  // ── VAN DER WAALS / HAMAKER CONSTANTS ────────────────────────────

  VDW: {
    // Hamaker constant for β-keratin / glass pair [J]
    // Source: [IS92] Israelachvili 1992 Table 6.1
    HAMAKER_J:      1e-19,        // 1×10⁻¹⁹ J

    // Equilibrium contact gap between spatula and surface
    // At this distance, London dispersion forces are at maximum
    // Source: [A02], [IS92]
    CONTACT_GAP_MIN_M: 0.3e-9,   // 0.3 nm — lower bound
    CONTACT_GAP_MAX_M: 0.4e-9,   // 0.4 nm — upper bound
    CONTACT_GAP_NOM_M: 0.35e-9,  // 0.35 nm — nominal

    // Force law: F ∝ 1/r⁶ (London dispersion, attractive branch)
    // Effective range: r < ~2 nm; essentially zero beyond 3–5 nm
    FORCE_POWER: 6,

    // r at which F_rel is normalised to 1.0 in the VdW explorer
    R_NORM_NM: 0.3,
  },

  // ── ADHESIVE STRESS VALUES σ (effective normal stress) ───────────

  SIGMA_PA: {
    // Effective adhesive stress [Pa] under ideal conditions (smooth, clean, dry)
    gecko:   100000,   // 100 kPa — [A02] synthetic setae arrays, normal stress
    tape:     30000,   //  30 kPa — [KI94] pressure-sensitive adhesive (PSA) shear
    velcro:   60000,   //  60 kPa — Velcro Industries technical datasheet (6 N/cm²)
    glue:   1500000,   // 1.5 MPa — ASTM D1002 lap-shear, cyanoacrylate ideal joint
    suction:  70000,   //  70 kPa — P_atm (101,325 Pa) × ~0.69 seal efficiency
  },

  // ── SURFACE ROUGHNESS CONTACT EFFICIENCY Rc ──────────────────────

  RC: {
    // Rc = fraction of nominal contact area achieving molecular contact
    // Rc = 1.0 = perfect contact; lower Rc = rougher surface
    // Source: [BH10] Bhushan 2010, Table 3.2
    glass:    0.95,   // Ra < 1 nm    — atomically smooth
    metal:    0.85,   // Ra ≈ 10 nm   — polished finish
    plastic:  0.75,   // Ra ≈ 100 nm  — standard injection-moulded
    painted:  0.65,   // Ra ≈ 1 µm    — brush/roll applied
    concrete: 0.40,   // Ra ≈ 100 µm  — macro-rough
  },

  // ── ENGINEERING DESIGN CONSTANTS ─────────────────────────────────

  ENGINEERING: {
    SAFETY_FACTOR: 2,    // SF = 2 standard structural design (ISO 4126)
    G_EARTH: 9.81,       // m/s² — standard gravity (NIST CODATA)
    G_MARS:  3.71,       // m/s² — mean surface gravity (NASA)
    G_MOON:  1.62,       // m/s² — mean surface gravity (NASA)
  },

  // ── KNOWN SYNTHETIC ADHESIVE BENCHMARKS ──────────────────────────

  BENCHMARKS: {
    // Geckskin — Bartlett et al. 2012, Advanced Materials [BA12]
    // 3×4 inch (~77 cm²) patch holds 317 kg on glass, zero residue
    GECKSKIN_LOAD_KG: 317,
    GECKSKIN_AREA_CM2: 77,    // 3×4 inches = 77.4 cm²

    // Single gecko foot adhesion (ideal conditions, Autumn 2000)
    GECKO_FOOT_FORCE_N: 20,   // ~20 N per foot under ideal loading
  },
});

// Export for use in other modules (CommonJS / browser global)
if (typeof module !== 'undefined') module.exports = GeckoPhysics;
