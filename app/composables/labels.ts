/**
 * ## labels
 *
 * Centralized dictionary of UI labels, copy strings,
 * and personal data used across the portfolio.
 */
const _labels = {

  // --- Navigation ---
  nav: {
    about: "About",
    projects: "Projects",
    experience: "Experience",
    writing: "Writing",
    writingUrl: "https://amittai.space",
    notes: "Notes",
    notesUrl: "https://notes.amittai.studio",
  },

  // --- Projects ---
  projects: {
    title: "Projects",
    subtitle: "Things I've designed and built.",
    featured: "Featured",
    projectCount: (n: number) => `${n} project${n === 1 ? "" : "s"}`,
  },

  // --- Experience ---
  experience: {
    title: "Experience",
    subtitle: "Where I've worked and studied.",
    work: "Work",
    education: "Education",
    entryCount: (n: number) => `${n} entr${n === 1 ? "y" : "ies"}`,
  },

  // --- Footer ---
  footer: {
    copyright: (year: number) => `\u00A9 AMITTAI ${year}.`,
    light: "LIGHT",
    dark: "DARK",
  },

} as const

export default () => _labels
