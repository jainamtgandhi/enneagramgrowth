import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-[720px] px-4 py-16">
      <h1 className="font-serif text-h1 font-semibold text-ink mb-8">Privacy Policy</h1>
      <div className="prose text-body text-ink-muted space-y-4">
        <p>Your privacy matters. This policy explains what data we collect and how we use it.</p>
        <p>Full privacy policy content coming soon.</p>
      </div>
    </main>
  );
}
