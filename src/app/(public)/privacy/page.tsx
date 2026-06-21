import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How The Practice handles your data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-4xl font-bold tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            What We Collect
          </h2>
          <p className="mt-2">
            When you take the Discovery Quiz, we store your answers and results
            anonymously. No personally identifiable information is collected
            unless you create an account (available in future updates).
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            How We Use Your Data
          </h2>
          <p className="mt-2">
            Quiz data is used solely to generate your results and improve our
            assessment quality over time. We do not sell, share, or monetise
            your data.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Cookies
          </h2>
          <p className="mt-2">
            We use essential cookies to maintain your session. No tracking or
            advertising cookies are used.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Data Storage
          </h2>
          <p className="mt-2">
            Your data is stored securely using Supabase infrastructure with
            encryption at rest and in transit.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Contact
          </h2>
          <p className="mt-2">
            For privacy questions, please reach out via our website.
          </p>
        </section>
      </div>
    </div>
  );
}
