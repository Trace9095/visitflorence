import Link from "next/link";
import { Check, Star, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Your Business — Pricing",
  description:
    "Grow your Florence, CO business with a premium listing on VisitFlorence. Free, Premium ($99/mo), and Sponsored ($199/mo) plans available.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Get discovered by visitors browsing Florence.",
    features: [
      "Basic business listing",
      "Name, address, phone, website",
      "Category page placement",
      "VisitFlorence directory listing",
    ],
    cta: "Add Free Listing",
    href: "/add-listing?plan=free",
    highlighted: false,
    tier: "free",
  },
  {
    name: "Premium",
    price: "$99",
    period: "/mo",
    description: "Stand out with featured placement and rich content.",
    features: [
      "Everything in Free",
      "Featured badge + top placement",
      "Full photo gallery (up to 10 photos)",
      "Detailed hours + booking link",
      "Priority in search results",
      "Monthly analytics report",
    ],
    cta: "Start Premium",
    href: "/add-listing?plan=premium",
    highlighted: true,
    tier: "premium",
  },
  {
    name: "Sponsored",
    price: "$199",
    period: "/mo",
    description: "Maximum visibility across the entire directory.",
    features: [
      "Everything in Premium",
      "Top-of-category sponsored placement",
      "Homepage featured spotlight",
      "\"Sponsored\" badge for authority",
      "Unlimited gallery photos",
      "Social media cross-promotion",
      "Dedicated account manager",
    ],
    cta: "Start Sponsored",
    href: "/add-listing?plan=sponsored",
    highlighted: false,
    tier: "sponsored",
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Zap size={20} style={{ color: "#C19A6B" }} />
          <span
            className="text-xs font-mono font-semibold uppercase tracking-widest"
            style={{ color: "#C19A6B" }}
          >
            Grow Your Business
          </span>
        </div>
        <h1
          className="text-4xl font-bold tracking-tight mb-4"
          style={{ color: "#F5EDD6" }}
        >
          List on VisitFlorence
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-7" style={{ color: "#9B8374" }}>
          Reach thousands of visitors exploring Florence&apos;s antique shops, breweries,
          restaurants, and activities. Get discovered today.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="rounded-2xl border p-7 flex flex-col"
            style={{
              backgroundColor: plan.highlighted ? "#2C1A0E" : "#1C1210",
              borderColor: plan.highlighted ? "#C19A6B" : "#3D2518",
              borderWidth: plan.highlighted ? 2 : 1,
            }}
          >
            {plan.highlighted && (
              <div className="flex items-center gap-1.5 mb-4">
                <Star size={13} style={{ color: "#C19A6B" }} />
                <span className="text-xs font-mono font-semibold uppercase tracking-wide" style={{ color: "#C19A6B" }}>
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-2">
              <h2 className="text-lg font-bold tracking-tight" style={{ color: "#F5EDD6" }}>
                {plan.name}
              </h2>
              <div className="flex items-baseline gap-0.5 mt-1">
                <span className="text-3xl font-bold" style={{ color: "#F5EDD6" }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm font-mono" style={{ color: "#9B8374" }}>
                    {plan.period}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm leading-6 mb-6" style={{ color: "#9B8374" }}>
              {plan.description}
            </p>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "#9B8374" }}>
                  <Check size={15} className="mt-0.5 shrink-0" style={{ color: "#C19A6B" }} />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={plan.href}
              className="w-full text-center py-3 rounded-lg font-semibold text-sm min-h-[44px] flex items-center justify-center transition-opacity"
              style={
                plan.highlighted
                  ? { backgroundColor: "#C19A6B", color: "#1C1210" }
                  : { border: "1px solid #3D2518", color: "#F5EDD6" }
              }
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <section
        className="rounded-2xl border p-8"
        style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518" }}
      >
        <h2 className="text-xl font-bold tracking-tight mb-6" style={{ color: "#F5EDD6" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "How do I get started?",
              a: "Click 'Add Free Listing' or choose a paid plan above. Complete the form with your business details and we'll publish your listing within 24 hours.",
            },
            {
              q: "Can I upgrade my plan later?",
              a: "Yes — start free and upgrade to Premium or Sponsored at any time from your listing page. Billing is month-to-month with no long-term contract.",
            },
            {
              q: "What does 'featured placement' mean?",
              a: "Premium and Sponsored listings appear at the top of their category pages and in the 'Featured Businesses' section on the homepage, above free listings.",
            },
            {
              q: "How do I claim an existing listing?",
              a: "If your business is already listed, click 'Claim This Listing' on the business page to verify ownership and upgrade your profile.",
            },
            {
              q: "Is there an annual discount?",
              a: "Contact us at hello@visitflorence.co about annual pricing — we offer 2 months free when you pay annually.",
            },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold text-sm mb-1.5" style={{ color: "#F5EDD6" }}>
                {q}
              </h3>
              <p className="text-sm leading-6" style={{ color: "#9B8374" }}>
                {a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
