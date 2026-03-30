"use client";

import { useState, useEffect } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─── Animation System ──────────────────────────────────────────────────────────
const ease = [0.23, 1, 0.32, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// Viewport config: animate once when 15% of element is visible
const vp = { once: true, amount: 0.15 };

// ─── Site Data ─────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  ["Services", "services"],
  ["Work", "work"],
  ["Process", "process"],
  ["FAQ", "faq"],
];

const SERVICES = [
  {
    title: "Business Website Design",
    description:
      "A professionally designed website built from scratch around your business goals. Clean, modern, and built to convert visitors into clients.",
    features: [
      "Custom design — not a template",
      "Mobile-first & responsive",
      "Contact forms & lead capture",
      "SEO-ready structure",
    ],
  },
  {
    title: "Website Redesign",
    description:
      "Transform your outdated website into a modern, high-performing presence that reflects the quality of your business and attracts more clients.",
    features: [
      "Modern visual refresh",
      "Improved user experience",
      "Faster page load times",
      "Better conversion flow",
    ],
  },
  {
    title: "Landing Pages",
    description:
      "Focused, high-converting pages built for a specific offer, promotion, or campaign — designed to get visitors to take action.",
    features: [
      "Single, clear goal",
      "Conversion-optimized layout",
      "Fast launch",
      "Clear call to action",
    ],
  },
];

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We talk about your business, your goals, and what you need. I ask the right questions so I understand exactly what to build and why.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "I design the site with your brand and audience in mind. You review and give feedback before a single line of code is written.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "I build the site with clean code, fast performance, and a mobile-first layout. Custom-built for your business — not assembled from a template.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Your site goes live. I handle all the technical setup and make sure everything works perfectly before you start sharing it.",
  },
];

const PROJECTS = [
  {
    title: "PhotoArt CRM",
    category: "Web Application",
    description:
      "A client management platform for a photography business — streamlining bookings, invoices, and client communication in one place.",
    tech: ["Next.js", "Tailwind CSS", "Supabase", "Resend"],
    gradientFrom: "from-violet-900/50",
    gradientTo: "to-violet-950/60",
    initials: "PA",
  },
  {
    title: "TrackList",
    category: "Mobile App",
    description:
      "A mobile app for musicians to catalog and organize their music library with real-time sync across all their devices.",
    tech: ["React Native", "Expo", "Firebase"],
    gradientFrom: "from-emerald-900/50",
    gradientTo: "to-emerald-950/60",
    initials: "TL",
  },
  {
    title: "Cloud Cost Automations",
    category: "Cloud Infrastructure",
    description:
      "Automated cost monitoring and reporting for a company's AWS infrastructure, reducing monthly cloud spend significantly.",
    tech: ["AWS", "Python", "Terraform", "GitHub Actions"],
    gradientFrom: "from-orange-900/50",
    gradientTo: "to-orange-950/60",
    initials: "CC",
  },
];

const FAQS = [
  {
    q: "How long does it take to build a website?",
    a: "Most websites are completed in 2–4 weeks depending on scope and complexity. A focused landing page can be done in about a week. I'll give you a realistic timeline before we start — no surprises.",
  },
  {
    q: "How much does a website cost?",
    a: "Every project is scoped individually so you only pay for what you actually need. I offer transparent, upfront pricing — no hidden fees, no vague hourly billing. The best way to get a real number is to reach out and tell me about your project.",
  },
  {
    q: "Do I need to have a design or content ready?",
    a: "Not at all. I handle both design and development. You just need to tell me about your business and what you're trying to accomplish — I'll take care of how it looks and how it's built. For content, I can advise on copy or work with what you have.",
  },
  {
    q: "Will I be able to update the website myself?",
    a: "Yes. If you'd like to edit text and images yourself, I can build that in using a simple content management system. Or I can handle updates for you. We'll figure out what works best for your situation.",
  },
  {
    q: "Do you work with businesses outside Puerto Rico?",
    a: "Absolutely. I work with clients entirely remotely and have no geographic limitations. If you have a business and internet access, we can work together — wherever you are.",
  },
];

// ─── Hero: Animated SVG path background ───────────────────────────────────────

function FloatingPaths({ position, color }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    // position=1  → ascending arcs (bottom-left to top-right)
    // position=-1 → descending arcs (top-left to bottom-right)
    // The two sets cross in the middle, creating a woven look.
    d:
      position > 0
        ? `M${-100 - i * 5} ${300 - i * 2} C${200} ${220 - i * 7} ${500} ${96 - i * 3} ${800 + i * 5} ${16 - i * 2}`
        : `M${-100 - i * 5} ${16 + i * 2} C${200} ${96 + i * 3} ${500} ${220 + i * 7} ${800 + i * 5} ${300 + i * 2}`,
    width: 0.3 + i * 0.04,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((path) => (
          <m.path
            key={path.id}
            d={path.d}
            stroke={color}
            strokeWidth={path.width}
            strokeOpacity={0.04 + path.id * 0.009}
            initial={{
              pathLength: 0.24,
              pathOffset: (path.id * 0.028) % 1,
              opacity: 0.22,
            }}
            animate={{
              pathOffset: [(path.id * 0.028) % 1, ((path.id * 0.028) % 1) + 1],
              opacity: [0.22, 1, 1, 0.18],
            }}
            transition={{
              duration: 4.2 + ((path.id * 3) % 5) * 0.45,
              delay: (paths.length - 1 - path.id) * 0.028,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.08, 0.78, 1],
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// ─── Shared UI ──────────────────────────────────────────────────────────────────

function CheckIcon({ className = "" }) {
  return (
    <svg
      className={`flex-shrink-0 ${className}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SectionLabel({ children }) {
  return (
    <m.p
      variants={fadeUp}
      className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-4"
    >
      {children}
    </m.p>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollTo = (id) => {
    const wasOpen = mobileMenuOpen;
    setMobileMenuOpen(false);
    setTimeout(
      () =>
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      wasOpen ? 320 : 0,
    );
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#060912] text-white selection:bg-blue-500/30 selection:text-white">
        {/* ══ NAVBAR ══════════════════════════════════════════════════════════════ */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled
              ? "bg-[#060912]/88 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/30"
              : "bg-transparent"
          }`}
        >
          <nav className="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
            <button
              onClick={() => scrollTo("home")}
              className="font-semibold text-[15px] tracking-tight hover:text-blue-400 transition-colors duration-200"
            >
              Kevin Ibarra
            </button>

            <div className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex">
              <button
                onClick={() => scrollTo("contact")}
                className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-px"
              >
                Start a Project
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 -mr-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-5 flex flex-col gap-[5px]">
                <span
                  className={`block h-px bg-current origin-center transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`block h-px bg-current transition-all duration-200 ${
                    mobileMenuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block h-px bg-current origin-center transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </div>
            </button>
          </nav>
        </header>

        {/* ══ MOBILE MENU ═════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[#060912] flex flex-col pt-20 px-6 pb-safe"
            >
              <m.div
                initial="hidden"
                animate="show"
                variants={stagger}
                className="flex flex-col mt-4"
              >
                {[...NAV_LINKS, ["Contact", "contact"]].map(([label, id]) => (
                  <m.button
                    key={id}
                    variants={fadeUp}
                    onClick={() => scrollTo(id)}
                    className="text-3xl font-medium text-left py-5 text-slate-300 hover:text-white transition-colors border-b border-white/[0.05]"
                  >
                    {label}
                  </m.button>
                ))}
              </m.div>
              <m.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8"
              >
                <button
                  onClick={() => scrollTo("contact")}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-semibold text-lg transition-colors"
                >
                  Start a Project
                </button>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>

        {/* ══ HERO ════════════════════════════════════════════════════════════════ */}
        <section
          id="home"
          className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
        >
          {/* Animated SVG paths */}
          <div className="absolute inset-0">
            <FloatingPaths position={1} color="rgb(96, 165, 250)" />{" "}
            {/* blue-400  — ascending  */}
            <FloatingPaths position={-1} color="rgb(167, 139, 250)" />{" "}
            {/* violet-400 — descending */}
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center pt-16">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              {/* Letter-by-letter headline */}
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
                {[
                  { text: "A good business should not", delay: 0 },
                  { text: "look small online", delay: 0.15 },
                ].map((line, lineIndex) => (
                  <span key={lineIndex} className="block">
                    {line.text.split(" ").map((word, wordIndex) => (
                      <span
                        key={wordIndex}
                        className="inline-block mr-[0.25em] last:mr-0"
                      >
                        {word.split("").map((letter, letterIndex) => (
                          <m.span
                            key={`${wordIndex}-${letterIndex}`}
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                              delay:
                                line.delay +
                                wordIndex * 0.05 +
                                letterIndex * 0.015,
                              type: "spring",
                              stiffness: 200,
                              damping: 28,
                            }}
                            className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80"
                          >
                            {letter}
                          </m.span>
                        ))}
                      </span>
                    ))}
                  </span>
                ))}
              </h1>

              {/* Sub */}
              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="text-white/40 text-base sm:text-lg mb-10 font-light tracking-wide"
              >
                I build websites that make your business look more established from the first click.
              </m.p>

              {/* CTAs */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 1.1,
                  ease: [0.25, 0.4, 0.35, 0.8],
                }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                {/* Primary — gradient border button from the component */}
                <div className="group relative bg-gradient-to-b from-white/10 to-black/10 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <button
                    onClick={() => scrollTo("contact")}
                    className="rounded-[1.1rem] px-8 py-4 text-[15px] font-semibold backdrop-blur-md bg-white/95 hover:bg-white text-black transition-all duration-300 group-hover:-translate-y-0.5 border border-black/10"
                  >
                    <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                      Start a Project
                    </span>
                    <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300 inline-block">
                      →
                    </span>
                  </button>
                </div>

                {/* Secondary — ghost link */}
                <button
                  onClick={() => scrollTo("work")}
                  className="text-white/50 hover:text-white text-[15px] font-medium transition-colors duration-200 px-4 py-4"
                >
                  See My Work →
                </button>
              </m.div>
            </m.div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#060912] to-transparent pointer-events-none" />
        </section>

        {/* ══ WHO I HELP ══════════════════════════════════════════════════════════ */}
        <section className="py-24 border-t border-white/[0.05]">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="show"
              viewport={vp}
              variants={stagger}
              className="text-center mb-14"
            >
              <SectionLabel>Who I Work With</SectionLabel>
              <m.h2
                variants={fadeUp}
                className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Built for real businesses
              </m.h2>
              <m.p
                variants={fadeUp}
                className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed"
              >
                Whether you&rsquo;re getting started or ready to upgrade, I
                build websites that match where your business is headed.
              </m.p>
            </m.div>

            <m.div
              initial="hidden"
              whileInView="show"
              viewport={vp}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[
                {
                  label: "No website yet",
                  desc: "You're running a real business but don't have a proper website — or your online presence is just a social media page that doesn't do you justice.",
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                },
                {
                  label: "Outdated website",
                  desc: "Your current site looks like it was built years ago. It's not mobile-friendly, hard to update, and doesn't reflect the quality of your business anymore.",
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                },
                {
                  label: "Need more clients online",
                  desc: "You have a website but it's not generating leads. Visitors aren't reaching out, and you know something is off — but you're not sure what.",
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  ),
                },
              ].map((item) => (
                <m.div
                  key={item.label}
                  variants={fadeUp}
                  className="group p-7 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:bg-white/[0.05] hover:border-white/[0.10] transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5 text-blue-400 group-hover:bg-blue-500/15 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-white font-semibold text-xl mb-3">
                    {item.label}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        {/* ══ WHY IT MATTERS ══════════════════════════════════════════════════════ */}
        <section className="py-24 border-t border-white/[0.05]">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-16 lg:gap-20 items-center">
              <m.div
                initial="hidden"
                whileInView="show"
                viewport={vp}
                variants={stagger}
              >
                <SectionLabel>Why It Matters</SectionLabel>
                <m.h2
                  variants={fadeUp}
                  className="font-display text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight"
                >
                  Your website is your best salesperson — is it doing its job?
                </m.h2>
                <m.p
                  variants={fadeUp}
                  className="text-slate-400 leading-relaxed mb-4"
                >
                  It works 24 hours a day, never takes a day off, and reaches
                  every potential client who searches for what you do. A
                  well-built website doesn&rsquo;t just look good — it builds
                  trust, answers questions, and moves visitors toward reaching
                  out.
                </m.p>
                <m.p
                  variants={fadeUp}
                  className="text-slate-400 leading-relaxed"
                >
                  A website that looks outdated or is difficult to use sends the
                  wrong message. Visitors leave, and your competitors get the
                  business instead.
                </m.p>
              </m.div>

              <m.div
                initial="hidden"
                whileInView="show"
                viewport={vp}
                variants={stagger}
                className="flex flex-col gap-4"
              >
                {[
                  {
                    title: "First impressions happen in seconds",
                    desc: "Visitors form an opinion about your business before they've read a single word. Your website needs to earn their trust immediately.",
                  },
                  {
                    title: "Most clients search online first",
                    desc: "If you don't have a credible online presence, you're losing potential clients before they even know you exist.",
                  },
                  {
                    title: "A strong website keeps working while you sleep",
                    desc: "Answer questions, showcase your services, and capture leads — all without you having to be there.",
                  },
                ].map((item, i) => (
                  <m.div
                    key={i}
                    variants={fadeUp}
                    className="group flex gap-4 p-5 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:border-blue-500/20 hover:bg-white/[0.05] transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-600/15 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-600/25 transition-colors duration-300">
                      <CheckIcon className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-display text-white font-medium text-lg mb-1 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </m.div>
                ))}
              </m.div>
            </div>
          </div>
        </section>

        {/* ══ SERVICES ════════════════════════════════════════════════════════════ */}
        <section id="services" className="py-24 border-t border-white/[0.05]">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="show"
              viewport={vp}
              variants={stagger}
              className="text-center mb-14"
            >
              <SectionLabel>Services</SectionLabel>
              <m.h2
                variants={fadeUp}
                className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                What I build for you
              </m.h2>
              <m.p
                variants={fadeUp}
                className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed"
              >
                Each project is custom-built to fit your business, your brand,
                and your goals.
              </m.p>
            </m.div>

            <m.div
              initial="hidden"
              whileInView="show"
              viewport={vp}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {SERVICES.map((service, i) => (
                <m.div
                  key={service.title}
                  variants={fadeUp}
                  className="group flex flex-col p-8 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:bg-white/[0.05] hover:border-blue-500/20 transition-all duration-300"
                >
                  <div className="mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/15 transition-colors duration-300">
                      <span className="text-blue-400 font-mono text-sm font-semibold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display text-white font-semibold text-2xl mb-3">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-6 border-t border-white/[0.05]">
                    <ul className="space-y-2.5">
                      {service.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2.5 text-sm text-slate-500"
                        >
                          <div className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </m.div>
              ))}
            </m.div>

            <m.div
              initial="hidden"
              whileInView="show"
              viewport={vp}
              variants={fadeUp}
              className="text-center mt-12"
            >
              <button
                onClick={() => scrollTo("contact")}
                className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-0.5"
              >
                Discuss Your Project
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            </m.div>
          </div>
        </section>

        {/* ══ PROCESS ═════════════════════════════════════════════════════════════ */}
        <section id="process" className="py-24 border-t border-white/[0.05]">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="show"
              viewport={vp}
              variants={stagger}
              className="text-center mb-14"
            >
              <SectionLabel>How It Works</SectionLabel>
              <m.h2
                variants={fadeUp}
                className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                From idea to launch — a clear process
              </m.h2>
              <m.p
                variants={fadeUp}
                className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed"
              >
                No confusion, no surprises. I keep things simple so you always
                know what&rsquo;s happening and what&rsquo;s next.
              </m.p>
            </m.div>

            <m.div
              initial="hidden"
              whileInView="show"
              viewport={vp}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {STEPS.map((step, i) => (
                <m.div key={step.number} variants={fadeUp} className="relative">
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-5 left-full w-full h-px bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-transparent pointer-events-none" />
                  )}
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-5">
                    <span className="text-blue-400 font-mono text-xs font-semibold">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-display text-white font-semibold text-xl mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        {/* ══ PORTFOLIO / SELECTED WORK ═══════════════════════════════════════════ */}
        <section id="work" className="py-24 border-t border-white/[0.05]">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="show"
              viewport={vp}
              variants={stagger}
              className="text-center mb-14"
            >
              <SectionLabel>Selected Work</SectionLabel>
              <m.h2
                variants={fadeUp}
                className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Projects I&rsquo;ve built
              </m.h2>
              <m.p
                variants={fadeUp}
                className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed"
              >
                A few examples of what I&rsquo;ve shipped. Every project is
                different, but the standard is always the same.
              </m.p>
            </m.div>

            <m.div
              initial="hidden"
              whileInView="show"
              viewport={vp}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {PROJECTS.map((project) => (
                <m.div
                  key={project.title}
                  variants={fadeUp}
                  className="group flex flex-col bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div
                    className={`aspect-video bg-gradient-to-br ${project.gradientFrom} ${project.gradientTo} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 grid-pattern-subtle opacity-50" />
                    <span className="relative z-10 font-bold text-5xl text-white/10 font-mono select-none tracking-tight">
                      {project.initials}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-2">
                      {project.category}
                    </p>
                    <h3 className="font-display text-white font-semibold text-xl mb-2">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs text-slate-500 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        {/* ══ ABOUT / TRUST ═══════════════════════════════════════════════════════ */}
        <section className="py-24 border-t border-white/[0.05]">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <m.div
                initial="hidden"
                whileInView="show"
                viewport={vp}
                variants={fadeLeft}
                className="order-2 lg:order-1"
              >
                <div className="relative max-w-sm mx-auto lg:mx-0">
                  <div className="absolute -inset-6 bg-blue-600/[0.07] rounded-3xl blur-3xl pointer-events-none" />
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/[0.08] bg-slate-900">
                    <Image
                      src="/IMG_2698.jpg"
                      alt="Kevin Ibarra"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 80vw, 40vw"
                    />
                  </div>
                </div>
              </m.div>

              <m.div
                initial="hidden"
                whileInView="show"
                viewport={vp}
                variants={stagger}
                className="order-1 lg:order-2"
              >
                <SectionLabel>About</SectionLabel>
                <m.h2
                  variants={fadeUp}
                  className="font-display text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight"
                >
                  You&rsquo;re getting a developer who actually cares about your
                  results
                </m.h2>
                <m.p
                  variants={fadeUp}
                  className="text-slate-400 leading-relaxed mb-4"
                >
                  I&rsquo;m Kevin, a full-stack developer based in Puerto Rico.
                  I&rsquo;ve spent years building web applications for companies
                  ranging from startups to enterprise — and I&rsquo;ve seen
                  firsthand what separates a website that converts from one that
                  just sits there.
                </m.p>
                <m.p
                  variants={fadeUp}
                  className="text-slate-400 leading-relaxed mb-10"
                >
                  I started offering web design services for businesses because
                  I kept seeing great businesses held back by a poor online
                  presence. I build websites that are fast, clean, and designed
                  to generate real results — not just look good on a screen.
                </m.p>

                <m.div
                  variants={stagger}
                  className="grid grid-cols-3 gap-6 pt-8 border-t border-white/[0.06]"
                >
                  {[
                    { num: "3+", label: "Years building" },
                    { num: "10+", label: "Projects shipped" },
                    { num: "100%", label: "Custom code" },
                  ].map((stat) => (
                    <m.div key={stat.label} variants={fadeUp}>
                      <div className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                        {stat.num}
                      </div>
                      <div className="text-slate-500 text-sm">{stat.label}</div>
                    </m.div>
                  ))}
                </m.div>
              </m.div>
            </div>
          </div>
        </section>

        {/* ══ FAQ ═════════════════════════════════════════════════════════════════ */}
        <section id="faq" className="py-24 border-t border-white/[0.05]">
          <div className="max-w-2xl mx-auto px-5 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="show"
              viewport={vp}
              variants={stagger}
              className="text-center mb-14"
            >
              <SectionLabel>FAQ</SectionLabel>
              <m.h2
                variants={fadeUp}
                className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Common questions
              </m.h2>
              <m.p
                variants={fadeUp}
                className="text-slate-400 text-lg leading-relaxed"
              >
                Straightforward answers to what most people ask before getting
                started.
              </m.p>
            </m.div>

            <m.div
              initial="hidden"
              whileInView="show"
              viewport={vp}
              variants={stagger}
              className="space-y-2"
            >
              {FAQS.map((faq, i) => (
                <m.div
                  key={i}
                  variants={fadeUp}
                  className="border border-white/[0.06] rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between p-6 text-left hover:bg-white/[0.02] transition-colors gap-4 group"
                  >
                    <span className="text-white font-medium text-[15px] leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`text-slate-400 text-xl flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:text-slate-300 ${
                        openFaq === i ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <m.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-white/[0.04]">
                          <p className="pt-4 text-slate-400 text-sm leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        {/* ══ FINAL CTA / CONTACT ═════════════════════════════════════════════════ */}
        <section id="contact" className="py-24 border-t border-white/[0.05]">
          <div className="max-w-4xl mx-auto px-5 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="show"
              viewport={vp}
              variants={stagger}
              className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.02] p-10 sm:p-16 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.09] via-transparent to-indigo-600/[0.06] pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

              <div className="relative">
                <SectionLabel>Let&rsquo;s Work Together</SectionLabel>
                <m.h2
                  variants={fadeUp}
                  className="font-display text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight"
                >
                  Ready to build your website?
                </m.h2>
                <m.p
                  variants={fadeUp}
                  className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto mb-10"
                >
                  Tell me about your business and what you need. I&rsquo;ll get
                  back to you within 24 hours and we&rsquo;ll figure out the
                  best next step together.
                </m.p>

                <m.div
                  variants={fadeUp}
                  className="flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                  <a
                    href="mailto:kevini.ibarra@gmail.com"
                    className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-semibold text-[15px] transition-all duration-200 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
                  >
                    Get in Touch
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kevin-ibarra1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-white/[0.12] hover:border-white/25 text-slate-300 hover:text-white px-10 py-4 rounded-xl font-medium text-[15px] transition-all duration-200"
                  >
                    Connect on LinkedIn
                  </a>
                </m.div>

                <m.p variants={fadeUp} className="text-slate-600 text-sm mt-8">
                  Or email directly at{" "}
                  <a
                    href="mailto:kevini.ibarra@gmail.com"
                    className="text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-2 decoration-slate-700"
                  >
                    kevini.ibarra@gmail.com
                  </a>
                </m.p>
              </div>
            </m.div>
          </div>
        </section>

        {/* ══ FOOTER ══════════════════════════════════════════════════════════════ */}
        <footer className="border-t border-white/[0.05] py-8">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-sm">
              © {new Date().getFullYear()} Kevin Ibarra. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="mailto:kevini.ibarra@gmail.com"
                className="text-slate-600 hover:text-slate-300 text-sm transition-colors"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/kevin-ibarra1/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-300 text-sm transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/KevinIbarra1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-300 text-sm transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </LazyMotion>
  );
}
