import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Enneagram Growth collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-[860px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <h1 className="font-serif text-h1 font-semibold text-ink mb-3">
        Privacy Policy
      </h1>
      <p className="text-small text-ink-muted mb-10">
        Last updated: June 22, 2026
      </p>

      <div className="prose prose-ink max-w-none space-y-8">
        <section>
          <h2>Overview</h2>
          <p>
            Enneagram Growth (&ldquo;we,&rdquo; &ldquo;our,&rdquo;
            &ldquo;us&rdquo;) operates the website enneagramgrowth.com. This
            Privacy Policy explains what information we collect, how we use it,
            and the choices you have.
          </p>
          <p>
            We respect your privacy and are committed to protecting it. We
            collect only the minimum information needed to provide our services.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          <h3>Information you provide</h3>
          <ul>
            <li>
              <strong>Comments:</strong> When you leave a comment on a blog post
              or type page, we collect your name, email address, and comment
              text. Your email is used for moderation purposes only and is never
              displayed publicly.
            </li>
            <li>
              <strong>Discovery results:</strong> If you complete the Discovery
              process, your responses and results may be stored anonymously to
              improve the experience. No personally identifiable information is
              linked to these results.
            </li>
          </ul>

          <h3>Information collected automatically</h3>
          <ul>
            <li>
              <strong>Usage data:</strong> We may collect standard web analytics
              data such as pages visited, time on page, referring URL, browser
              type, and device type. This data is aggregated and anonymized.
            </li>
            <li>
              <strong>Cookies:</strong> We use essential cookies for
              authentication (facilitator login) and session management. We do
              not use advertising or third-party tracking cookies.
            </li>
          </ul>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Display your comments (name only — never your email)</li>
            <li>Moderate comments for quality and safety</li>
            <li>Improve our content and user experience</li>
            <li>Respond to your inquiries if you contact us</li>
          </ul>
          <p>
            We do <strong>not</strong> sell, rent, or share your personal
            information with third parties for marketing purposes. Ever.
          </p>
        </section>

        <section>
          <h2>Data Storage &amp; Security</h2>
          <p>
            Your data is stored securely using Supabase, a trusted database
            platform with encryption at rest and in transit. We implement
            row-level security policies to ensure data is only accessible to
            authorized users.
          </p>
          <p>
            While we take reasonable measures to protect your information, no
            method of transmission over the internet is 100% secure. We cannot
            guarantee absolute security.
          </p>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul>
            <li>
              <strong>Vercel</strong> — hosting and deployment
            </li>
            <li>
              <strong>Supabase</strong> — database and authentication
            </li>
          </ul>
          <p>
            Each of these services has its own privacy policy governing how they
            handle data.
          </p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Request access to the personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Withdraw consent for data processing at any time</li>
            <li>Request a copy of your data in a portable format</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at the email
            address listed below.
          </p>
        </section>

        <section>
          <h2>Children&apos;s Privacy</h2>
          <p>
            Our service is not directed at children under 13. We do not
            knowingly collect personal information from children. If you believe
            a child has provided us with personal information, please contact us
            and we will delete it promptly.
          </p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do,
            we&apos;ll update the &ldquo;Last updated&rdquo; date at the top of
            this page. Continued use of the site after changes constitutes
            acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            If you have questions about this Privacy Policy or how we handle
            your data, you can reach us at{" "}
            <strong>privacy@enneagramgrowth.com</strong>.
          </p>
        </section>
      </div>
    </main>
  );
}
