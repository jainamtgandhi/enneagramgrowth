import Link from "next/link";

const footerSections = [
  {
    heading: "Discover",
    links: [
      { href: "/discover", label: "Find Your Type" },
      { href: "/types", label: "The Nine Types" },
      { href: "/relationships", label: "Type Relationships" },
      { href: "/relationships/compare", label: "Compare Two Types" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { href: "/learn", label: "Primer Course" },
      { href: "/library", label: "Library" },
      { href: "/workplace", label: "Workplace" },
      { href: "/coping", label: "Coping & Solutions" },
      { href: "/growth", label: "Growth Practices" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    heading: "About",
    links: [
      { href: "/about", label: "Our Approach" },
      { href: "/library/responsible-use", label: "Responsible Use" },
      { href: "/legal/privacy", label: "Privacy Policy" },
      { href: "/legal/terms", label: "Terms of Service" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-surface-sunken/30">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-brand">
              Enneagram Growth
            </h3>
            <p className="mt-2 text-small text-ink-muted max-w-[28ch]">
              A mirror for self-awareness, not a diagnosis, label, or
              replacement for therapy.
            </p>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.heading}>
              <h4 className="text-ui font-semibold text-ink">
                {section.heading}
              </h4>
              <ul className="mt-2 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-small text-ink-muted hover:text-ink transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center">
          <p className="text-small text-ink-muted">
            &copy; {new Date().getFullYear()} Enneagram Growth. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
