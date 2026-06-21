import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for using Enneagram Growth.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-[860px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <h1 className="font-serif text-h1 font-semibold text-ink mb-3">
        Terms of Service
      </h1>
      <p className="text-small text-ink-muted mb-10">
        Last updated: June 22, 2026
      </p>

      <div className="prose prose-ink max-w-none space-y-8">
        <section>
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing or using Enneagram Growth (enneagramgrowth.com), you
            agree to be bound by these Terms of Service. If you do not agree to
            these terms, please do not use the site.
          </p>
        </section>

        <section>
          <h2>Description of Service</h2>
          <p>
            Enneagram Growth is a free educational platform that provides
            information about the Enneagram personality framework. Our services
            include:
          </p>
          <ul>
            <li>Educational articles and type descriptions</li>
            <li>A guided Discovery process for self-reflection</li>
            <li>A free primer course on the Enneagram</li>
            <li>A blog with reflections and guides</li>
            <li>Community comments and discussion</li>
          </ul>
        </section>

        <section>
          <h2>Not Professional Advice</h2>
          <p>
            <strong>
              The Enneagram is a tool for self-awareness, not a clinical
              diagnostic instrument.
            </strong>{" "}
            Nothing on this site constitutes professional psychological,
            medical, or therapeutic advice. The content is educational in nature
            and is not a substitute for professional help.
          </p>
          <p>
            If you are experiencing emotional distress, mental health concerns,
            or are in crisis, please seek support from a qualified mental health
            professional.
          </p>
        </section>

        <section>
          <h2>User Conduct</h2>
          <p>When using Enneagram Growth, you agree to:</p>
          <ul>
            <li>
              Use the site respectfully and in good faith
            </li>
            <li>
              Not use Enneagram types to label, judge, or diminish others
            </li>
            <li>
              Not post comments that are hateful, harassing, spam, or contain
              personal attacks
            </li>
            <li>
              Not attempt to access restricted areas of the site or interfere
              with its operation
            </li>
            <li>
              Provide accurate information when submitting comments (name and
              email)
            </li>
          </ul>
          <p>
            We reserve the right to moderate, edit, or remove comments that
            violate these guidelines, and to restrict access to users who
            repeatedly violate them.
          </p>
        </section>

        <section>
          <h2>Intellectual Property</h2>
          <p>
            All content on Enneagram Growth — including text, design, graphics,
            and the selection and arrangement of content — is the property of
            Enneagram Growth and is protected by applicable intellectual
            property laws.
          </p>
          <p>
            You may share links to our content freely. You may not reproduce,
            redistribute, or republish substantial portions of our content
            without written permission.
          </p>
          <p>
            The Enneagram itself is a traditional body of knowledge that belongs
            to no one. Our original commentary, descriptions, and educational
            materials are our own work.
          </p>
        </section>

        <section>
          <h2>User-Generated Content</h2>
          <p>
            When you submit a comment, you grant Enneagram Growth a
            non-exclusive, royalty-free license to display that comment on the
            site. You retain ownership of your content. You are responsible for
            what you post.
          </p>
        </section>

        <section>
          <h2>Disclaimer of Warranties</h2>
          <p>
            Enneagram Growth is provided &ldquo;as is&rdquo; without warranties
            of any kind, express or implied. We do not guarantee that the site
            will be available at all times, error-free, or that the content will
            be perfectly accurate.
          </p>
          <p>
            We make every effort to provide high-quality, well-researched
            content, but the Enneagram is a complex system with multiple
            lineages and interpretations. Reasonable people may disagree on
            specifics.
          </p>
        </section>

        <section>
          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Enneagram Growth and its
            operators shall not be liable for any indirect, incidental, special,
            or consequential damages arising from your use of the site.
          </p>
        </section>

        <section>
          <h2>Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. When we do, we&apos;ll
            update the date at the top of this page. Continued use of the site
            after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about these terms? Contact us at{" "}
            <strong>hello@enneagramgrowth.com</strong>.
          </p>
        </section>
      </div>
    </main>
  );
}
