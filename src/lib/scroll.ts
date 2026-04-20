const HEADER_OFFSET = 76

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}
