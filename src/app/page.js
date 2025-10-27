"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const NAME = "Kevin Ibarra Rodriguez";
const TAGLINE = "Software Engineer — Full-Stack & Cloud Enablement ";
const SUMMARY =
  "I design and build reliable, accessible software—from modern web apps (Next.js/TypeScript) to cost-savvy cloud automations on AWS. I care about clean UX, measurable impact, and shipping fast.";

const LOCATION = "Bayamón, Puerto Rico";

const SOCIAL = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kevin-ibarra1/",
    icon: "linkedin",
  },
  { label: "GitHub", href: "https://github.com/KevinIbarra1", icon: "github" },
  { label: "Email", href: "mailto:kevin.ibarra@upr.edu", icon: "email" },
];

const SKILLS = {
  Frontend: ["Next.js", "TypeScript", "React Native", "Tailwind CSS"],
  "Backend & Cloud": ["AWS", "Node.js", "Python", "PostgreSQL"],
  DevOps: ["Terraform", "Docker", "CI/CD", "GitHub Actions"],
};

const PROJECTS = [
  {
    title: "PhotoArt CRM",
    description:
      "Custom business management platform—dashboards, payments, automation, and client workflows.",
    tech: ["Next.js", "Tailwind", "Supabase", "Resend"],
    href: "#",
    repo: "#",
    image: "/og.jpg",
    highlight: true,
    impact: "Streamlined operations for 50+ clients",
  },
  {
    title: "TrackList",
    description:
      "Mobile app to review and discuss music with a social feed and profiles.",
    tech: ["React Native", "Expo", "Firebase"],
    href: "#",
    repo: "#",
    image: "/og.jpg",
    impact: "1000+ active users",
  },
  {
    title: "AWS Cost Automations",
    description:
      "Step Functions + Lambda workflows to stop idle resources and enforce tagging.",
    tech: ["AWS", "Terraform", "Python"],
    href: "#",
    repo: "#",
    image: "/og.jpg",
    impact: "30% cost reduction achieved",
  },
];

const EXPERIENCE = [
  {
    role: "Software Engineering Semester Intern, Cloud Enablement",
    company: "Banco Popular de Puerto Rico",
    period: "Aug 2025 – Present",
    bullets: [
      "Implemented a 30-day idle policy to automatically stop unused AWS resources",
      "Reduced non-production compute spend by ~30% with off-hours automation",
      "Deployed automation as Infrastructure as Code (Terraform for Lambda, IAM, triggers)",
    ],
    type: "internship",
  },
  {
    role: "Software Engineering Summer Intern, Cloud Enablement",
    company: "Banco Popular de Puerto Rico",
    period: "May 2025 – Aug 2025",
    bullets: [
      "Automated multi-account AWS discovery with Python/Terraform for audits and cost reviews",
      "Built CI/CD pipeline to test and deploy AWS resource discovery + decommissioning",
      "Automated deletion of unused AWS resources and account decommissioning",
      "Generated CSV audit reports on resource usage and deletion outcomes",
    ],
    type: "internship",
  },
  {
    role: "Software Engineer, Full Stack",
    company: "Nextep Consulting LLC",
    period: "Jun 2024 – Aug 2025",
    bullets: [
      "Architected a custom business management platform with Next.js, Tailwind, PostgreSQL",
      "Automated sales, inventory, commissions, and client data entry for a photography client",
      "Built 30+ RESTful APIs and designed 16 relational tables in PostgreSQL",
      "Led weekly Scrum meetings to track technical progress",
    ],
    type: "founder",
  },
  {
    role: "Google Tech Exchange Program",
    company: "Google",
    period: "Jan 2024 – May 2024",
    bullets: [
      "Participated in a multicultural environment to acquire practical knowledge in data structures, essential for solving complex problems",
      "Collaborated with Tech Exchange students to develop solutions for modern-day problems by applying Google's practices",
      "Acquired insights into the tech industry through mentorship, workshops, and networking events with Google experts",
    ],
    type: "program",
  },
  {
    role: "Software Developer",
    company: "Haipriori",
    period: "Oct 2022 – Jun 2024",
    bullets: [
      "Engineered 10+ responsive admin dashboards and 14 mobile app screens using Next.js, SASS, and React Native",
      "Integrated Google and Facebook OAuth to streamline cross-platform user authentication flows",
      "Built 20+ backend endpoints in Spring Boot and MongoDB to support real-time data for farm and sports operations",
      "Designed intuitive interfaces and 12+ dynamic menus to simplify multi-role workflows across domains",
      "Implemented inventory tracking algorithms and batch logic to visualize available materials during production",
      "Shipped SOP management features enabling enterprise users to define and assign procedures by area",
    ],
    type: "employment",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Kevin's work on our cloud infrastructure saved us thousands while improving performance. His attention to detail and proactive communication made the project seamless.",
    author: "Sarah Chen",
    role: "CTO at TechStart",
  },
  {
    quote:
      "Exceptional problem solver who delivers clean, maintainable code. Kevin transformed our legacy system into a modern, scalable platform.",
    author: "Michael Rodriguez",
    role: "Engineering Manager at FinTech Corp",
  },
];

// ---------- NAV HELPERS ----------
const SECTIONS = [
  "Projects",
  "Experience",
  "Skills",
  "Testimonials",
  "Contact",
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Icon components
const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764S5.534 3.204 6.5 3.204s1.75.79 1.75 1.764S7.466 6.732 6.5 6.732zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222V23.2c0 .319.192.694.801.576C20.765 21.187 24 16.69 24 11.99 24 5.373 18.627 0 12 0z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = ["home", ...SECTIONS.map((s) => s.toLowerCase())];
    const observers = [];

    ids.forEach((id) => {
      const target = document.getElementById(id);
      if (!target) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: [0, 1] }
      );
      obs.observe(target);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isOpen]);

  // Scroll-triggered animations
  useEffect(() => {
    const animateElements = document.querySelectorAll(
      ".animate-on-scroll, .animate-left, .animate-right, .animate-scale"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      {/* Top nav with glassmorphism effect */}
      <header className="sticky top-0 z-[60] backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <a
              href="#home"
              className="group flex items-center gap-2 animate-on-scroll"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("home");
              }}
            >
              <div className="relative h-10 w-10 rounded-2xl overflow-hidden group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-400/50 border-2 border-slate-700 group-hover:border-blue-500">
                <Image
                  src="/IMG_2931 3.PNG"
                  alt={`${NAME} logo`}
                  fill
                  className="object-cover object-center"
                  sizes="40px"
                />
              </div>
              <span className="font-bold tracking-tight hidden sm:inline-block text-white">
                {NAME.split(" ")[0]}
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {SECTIONS.map((item) => {
                const id = item.toLowerCase();
                const isActive = active === id;
                return (
                  <a
                    key={item}
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(id);
                    }}
                    className={`relative text-sm font-medium transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-indigo-500 after:transition-all after:rounded-full ${
                      isActive
                        ? "text-white after:w-full"
                        : "text-slate-300 hover:text-white after:w-0 hover:after:w-full hover:scale-105"
                    }`}
                  >
                    {item}
                  </a>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-slate-800 transition-all duration-300 relative z-[70] hover:scale-110"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((v) => !v)}
            >
              <div className="relative w-6 h-6">
                {/* Hamburger Lines */}
                <span
                  className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-500 ${
                    isOpen
                      ? "rotate-45 translate-y-0 top-3"
                      : "rotate-0 translate-y-0 top-1"
                  }`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                  }}
                />
                <span
                  className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-400 top-3 ${
                    isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  }`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                  }}
                />
                <span
                  className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-500 ${
                    isOpen
                      ? "-rotate-45 translate-y-0 top-3"
                      : "rotate-0 translate-y-0 top-5"
                  }`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                  }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Fullscreen Mobile Menu Overlay */}
        <div
          className={`mobile-menu-overlay md:hidden fixed inset-0 z-50 transform transition-all duration-700 ${
            isOpen
              ? "translate-y-0 opacity-100 visible ease-out"
              : "-translate-y-full opacity-0 invisible ease-in"
          }`}
          style={{
            height: "100vh",
            height: "100dvh",
            transitionTimingFunction: isOpen
              ? "cubic-bezier(0.23, 1, 0.32, 1)"
              : "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
          }}
        >
          {/* Backdrop with blur */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-indigo-900/95 backdrop-blur-xl cursor-pointer"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Content */}
          <div className="relative h-full w-full flex flex-col items-center justify-center px-4 py-20 safe-area-inset overflow-hidden">
            {/* Navigation Items */}
            <nav className="flex flex-col items-center justify-center flex-1 w-full max-w-sm">
              <div className="space-y-6 sm:space-y-8 text-center">
                {SECTIONS.map((item, index) => {
                  const id = item.toLowerCase();
                  const isActive = active === id;
                  return (
                    <a
                      key={item}
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(id);
                        setIsOpen(false);
                      }}
                      className={`mobile-menu-item block text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transform transition-all duration-300 hover:scale-105 active:scale-95 relative group ${
                        isActive
                          ? "text-white"
                          : "text-white/70 hover:text-white active:text-white"
                      } ${isOpen ? "animate" : ""}`}
                      style={{
                        animationDelay: isOpen
                          ? `${index * 0.12 + 0.15}s`
                          : "0s",
                      }}
                    >
                      {item}
                      {/* Animated underline */}
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-300 group-hover:w-3/4" />
                    </a>
                  );
                })}
              </div>
            </nav>

            {/* Social Links in Mobile Menu */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-auto mb-4">
              {SOCIAL.map((s, index) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className={`mobile-social-item p-3 sm:p-4 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all duration-300 hover:scale-110 active:scale-95 transform text-white backdrop-blur-sm border border-white/20 hover:border-white/30 ${
                    isOpen ? "animate" : ""
                  }`}
                  aria-label={s.label}
                  style={{
                    animationDelay: isOpen
                      ? `${SECTIONS.length * 0.12 + 0.4 + index * 0.08}s`
                      : "0s",
                  }}
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6">
                    {s.icon === "linkedin" && <LinkedInIcon />}
                    {s.icon === "github" && <GitHubIcon />}
                    {s.icon === "email" && <EmailIcon />}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden scroll-mt-24">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-blue-950/80" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
          </div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl float-element" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl float-delayed" />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl" />

          {/* Floating geometric shapes */}
          <div className="absolute top-32 left-20 w-16 h-16 border-2 border-blue-500/20 rounded-lg rotate-12 float-element" />
          <div className="absolute bottom-40 right-32 w-20 h-20 border-2 border-indigo-500/20 rounded-full float-delayed" />
          <div className="absolute top-2/3 right-1/4 w-12 h-12 border-2 border-purple-500/20 rotate-45 float-element" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-1/3 left-1/4 w-14 h-14 bg-blue-500/10 rounded-lg rotate-6 float-delayed" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 animate-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/50 to-indigo-900/50 text-blue-300 text-sm font-medium mb-6 hover-glow animate-on-scroll shadow-lg border border-blue-800/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
                </span>
                Available for opportunities
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-br from-white to-blue-400 bg-clip-text text-transparent animate-on-scroll">
                {NAME}
              </h1>

              <p className="mt-3 text-sm font-medium text-slate-400 flex items-center gap-2 animate-on-scroll">
                <svg
                  className="w-4 h-4 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {LOCATION}
              </p>

              <p className="mt-5 text-xl font-semibold text-slate-200 animate-on-scroll">
                {TAGLINE}
              </p>
              <p className="mt-4 text-lg text-slate-300 leading-relaxed animate-on-scroll">
                {SUMMARY}
              </p>

              <div className="mt-8 flex flex-wrap gap-4 animate-on-scroll">
                <a
                  href="#experience"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("experience");
                  }}
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  View My Work
                  <ArrowIcon />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("contact");
                  }}
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-800 border-2 border-slate-700 text-white font-semibold hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Get In Touch
                </a>
              </div>

              <div className="mt-10 flex items-center gap-4 animate-on-scroll">
                {SOCIAL.map((s, index) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-110 transform shadow-lg hover:shadow-blue-500/20 text-slate-300 hover:text-blue-400"
                    aria-label={s.label}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {s.icon === "linkedin" && <LinkedInIcon />}
                    {s.icon === "github" && <GitHubIcon />}
                    {s.icon === "email" && <EmailIcon />}
                  </a>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative animate-right">
              <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 z-10">
                {/* Animated glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full scale-105 opacity-20 blur-2xl -z-10 float-element" />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full scale-110 opacity-15 blur-3xl -z-10 float-delayed" />

                <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                  <Image
                    src="/IMG_2698.jpg"
                    alt={`Portrait of ${NAME}`}
                    fill
                    className="object-cover object-top transition-transform duration-700 hover:scale-110"
                    sizes="(min-width:1024px) 24rem, (min-width:640px) 20rem, 16rem"
                    priority
                  />
                  {/* Overlay shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 shimmer opacity-0 hover:opacity-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      {/* <section id="projects" className="relative py-20 lg:py-28 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A selection of work that blends clean UX with strong engineering
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <article
                key={p.title}
                className={`group relative overflow-hidden rounded-2xl border ${
                  p.highlight
                    ? "border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                } hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                {p.highlight && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold">
                    Featured
                  </div>
                )}

                <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold">{p.title}</h3>

                  {p.impact && (
                    <p className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                      ✨ {p.impact}
                    </p>
                  )}

                  <p className="mt-3 text-slate-600 dark:text-slate-400">
                    {p.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    {p.href !== "#" && (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        Live Demo
                        <ExternalLinkIcon />
                      </a>
                    )}
                    {p.repo !== "#" && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                      >
                        View Code
                        <GitHubIcon />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section> */}

      {/* Experience (cards with rail) */}
      <section
        id="experience"
        className="py-20 lg:py-28 bg-gradient-to-br from-slate-900/50 to-blue-950/30 scroll-mt-24 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-900/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-900/20 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-900/15 to-transparent rounded-full blur-3xl" />

        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-10 w-20 h-20 border-2 border-blue-500/20 rounded-lg rotate-12 float-element" />
        <div className="absolute bottom-32 left-16 w-16 h-16 border-2 border-indigo-500/20 rounded-full float-delayed" />
        <div className="absolute top-1/2 right-20 w-12 h-12 border-2 border-purple-500/20 rotate-45 float-element" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-blue-500/10 rounded-lg rotate-6 float-delayed" />
        <div className="absolute top-1/4 left-1/4 w-24 h-24 border border-indigo-500/10 rounded-full float-element" style={{ animationDelay: '2s' }} />

        <div className="mx-auto max-w-7xl px-6 relative">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Building impactful solutions at scale with cutting-edge technology
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-[1.875rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-indigo-500/50 to-purple-500/50 hidden md:block" />

            <div className="space-y-8">
              {EXPERIENCE.map((e, i) => (
                <div
                  key={i}
                  className="relative animate-on-scroll group"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {/* Timeline dot - positioned to align with the line */}
                  <div className="absolute left-[1.125rem] top-8 w-6 h-6 hidden md:flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 ring-4 ring-slate-900/50 shadow-lg group-hover:ring-blue-500/30 transition-all duration-300 group-hover:scale-110" />
                  </div>

                  {/* Card content with left margin to make space for timeline */}
                  <div className="md:ml-20">
                    <div className="relative bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-700/50 hover:border-blue-500/30 group-hover:bg-slate-800/80">
                      {/* Type badge */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <span
                          className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold ${
                            e.type === "internship"
                              ? "bg-gradient-to-r from-green-900/50 to-emerald-900/50 text-green-300 border border-green-700/50"
                              : e.type === "employment"
                              ? "bg-gradient-to-r from-blue-900/50 to-indigo-900/50 text-blue-300 border border-blue-700/50"
                              : e.type === "program"
                              ? "bg-gradient-to-r from-orange-900/50 to-red-900/50 text-orange-300 border border-orange-700/50"
                              : "bg-gradient-to-r from-purple-900/50 to-pink-900/50 text-purple-300 border border-purple-700/50"
                          }`}
                        >
                          {e.type === "internship"
                            ? "Internship"
                            : e.type === "employment"
                            ? "Employment"
                            : e.type === "program"
                            ? "Program"
                            : "Entrepreneurship"}
                        </span>
                        <span className="text-sm text-slate-400 font-medium whitespace-nowrap">
                          {e.period}
                        </span>
                      </div>

                      {/* Role and company */}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                        {e.role}
                      </h3>
                      <p className="text-blue-400 font-semibold text-base md:text-lg mb-6">
                        {e.company}
                      </p>

                      {/* Bullet points */}
                      <ul className="space-y-3 text-slate-300">
                        {e.bullets.map((b, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3"
                          >
                            <span className="flex-shrink-0 w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mt-2" />
                            <span className="leading-relaxed text-sm md:text-base">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="py-20 lg:py-28 scroll-mt-24 bg-gradient-to-br from-slate-950 to-blue-950/30 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
            backgroundSize: '55px 55px'
          }} />
        </div>
        <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-l from-indigo-900/30 to-transparent rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-blue-900/30 to-transparent rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-900/20 rounded-full blur-3xl" />

        {/* Floating geometric shapes */}
        <div className="absolute top-40 left-10 w-18 h-18 border-2 border-indigo-500/20 rounded-lg rotate-12 float-element" />
        <div className="absolute bottom-20 right-16 w-16 h-16 border-2 border-blue-500/20 rounded-full float-delayed" />
        <div className="absolute top-1/3 right-1/3 w-10 h-10 border-2 border-purple-500/20 rotate-45 float-element" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-indigo-500/10 rounded-lg rotate-6 float-delayed" />
        <div className="absolute top-1/4 right-1/4 w-20 h-20 border border-blue-500/10 rounded-full float-element" style={{ animationDelay: '2s' }} />

        <div className="mx-auto max-w-7xl px-6 relative">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Modern tech stack powering scalable, innovative solutions
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Skills organized by category in containers */}
            <div className="grid gap-8 md:grid-cols-3">
              {Object.entries(SKILLS).map(
                ([category, skills], categoryIndex) => {
                  const categoryColors = {
                    Frontend: {
                      bg: "bg-blue-900/30",
                      border: "border-blue-400/30",
                      accent: "text-blue-300",
                      skillBg: "bg-blue-800/40",
                      skillBorder: "border-blue-600/40",
                      skillHover: "hover:bg-blue-700/50",
                    },
                    "Backend & Cloud": {
                      bg: "bg-green-900/30",
                      border: "border-green-400/30",
                      accent: "text-green-300",
                      skillBg: "bg-green-800/40",
                      skillBorder: "border-green-600/40",
                      skillHover: "hover:bg-green-700/50",
                    },
                    DevOps: {
                      bg: "bg-orange-900/30",
                      border: "border-orange-400/30",
                      accent: "text-orange-300",
                      skillBg: "bg-orange-800/40",
                      skillBorder: "border-orange-600/40",
                      skillHover: "hover:bg-orange-700/50",
                    },
                  };

                  const categoryIcons = {
                    Frontend: "",
                    "Backend & Cloud": "",
                    DevOps: "",
                  };

                  const colors = categoryColors[category] || {
                    bg: "bg-purple-900/30",
                    border: "border-purple-400/30",
                    accent: "text-purple-300",
                    skillBg: "bg-purple-800/40",
                    skillBorder: "border-purple-600/40",
                    skillHover: "hover:bg-purple-700/50",
                  };

                  return (
                    <div
                      key={category}
                      className="animate-on-scroll"
                      style={{ animationDelay: `${categoryIndex * 0.2}s` }}
                    >
                      {/* Category container */}
                      <div
                        className={`${colors.bg} ${colors.border} border backdrop-blur-sm rounded-2xl p-6 hover:border-opacity-60 transition-all duration-300`}
                      >
                        {/* Category header */}
                        <div className="flex items-center gap-3 mb-6">
                          {categoryIcons[category] && (
                            <div className="text-2xl">
                              {categoryIcons[category]}
                            </div>
                          )}
                          <div>
                            <h3 className="font-bold text-xl text-white">
                              {category}
                            </h3>
                            <p
                              className={`text-sm ${colors.accent} font-medium`}
                            >
                              {skills.length} technologies
                            </p>
                          </div>
                        </div>

                        {/* Technologies list */}
                        <div className="space-y-3">
                          {skills.map((skill, skillIndex) => {
                            // Technology logos/icons mapping
                            const techIcons = {
                              "Next.js": "",
                              TypeScript: "",
                              "React Native": "",
                              "Tailwind CSS": "",
                              AWS: "",
                              "Node.js": "",
                              Python: "",
                              PostgreSQL: "",
                              Terraform: "",
                              Docker: "",
                              "CI/CD": "",
                              "GitHub Actions": "",
                            };

                            return (
                              <div
                                key={skill}
                                className="animate-on-scroll"
                                style={{
                                  animationDelay: `${
                                    categoryIndex * 0.2 + skillIndex * 0.1
                                  }s`,
                                }}
                              >
                                <div
                                  className={`${colors.skillBg} ${colors.skillBorder} ${colors.skillHover} border rounded-xl px-4 py-3 transition-all duration-200 group cursor-default`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      {/* Technology icon */}
                                      {techIcons[skill] && (
                                        <div className="text-lg">
                                          {techIcons[skill]}
                                        </div>
                                      )}
                                      <span className="font-semibold text-white group-hover:text-opacity-90">
                                        {skill}
                                      </span>
                                    </div>

                                    {/* Skill proficiency indicator */}
                                    <div className="flex items-center gap-1">
                                      <div
                                        className={`w-2 h-2 rounded-full ${colors.accent.replace(
                                          "text-",
                                          "bg-"
                                        )} opacity-80`}
                                      ></div>
                                      <div
                                        className={`w-2 h-2 rounded-full ${colors.accent.replace(
                                          "text-",
                                          "bg-"
                                        )} opacity-60`}
                                      ></div>
                                      <div
                                        className={`w-2 h-2 rounded-full ${colors.accent.replace(
                                          "text-",
                                          "bg-"
                                        )} opacity-40`}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </section>


      {/* Contact CTA */}
      <section
        id="contact"
        className="relative py-20 lg:py-28 overflow-hidden scroll-mt-24"
      >
        {/* Darker gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-950" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,rgba(255,255,255,.1)_0,transparent_60%)]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.12) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating background elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl float-element" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl" />

        {/* Floating geometric shapes */}
        <div className="absolute top-24 right-20 w-16 h-16 border-2 border-blue-500/20 rounded-lg rotate-12 float-element" />
        <div className="absolute bottom-28 left-24 w-14 h-14 border-2 border-indigo-500/20 rounded-full float-delayed" />
        <div className="absolute top-1/3 left-1/3 w-10 h-10 border-2 border-purple-500/20 rotate-45 float-element" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-blue-500/10 rounded-lg rotate-6 float-delayed" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="rounded-3xl border border-slate-700/50 bg-slate-800/20 backdrop-blur-2xl p-12 md:p-20 text-center text-white shadow-2xl animate-on-scroll">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 text-blue-300 text-sm font-medium mb-8 border border-blue-800/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
                </span>
                Ready to connect
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Let&apos;s build something
              <span className="block bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                amazing together
              </span>
            </h2>

            <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed mb-10">
              I&apos;m actively seeking internships, full-time opportunities,
              and exciting freelance projects. Let&apos;s discuss how we can
              create something impactful together.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 animate-on-scroll">
              <a
                href="mailto:kevin.ibarra@upr.edu"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <EmailIcon />
                Email me
              </a>
              <a
                href="https://www.linkedin.com/in/kevin-ibarra1/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-slate-600 text-white font-bold hover:bg-slate-800/50 hover:border-slate-500 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            </div>

            {/* Additional contact info */}
            <div className="mt-12 pt-8 border-t border-slate-700/50 animate-on-scroll">
              <p className="text-slate-400 text-sm">
                Based in {LOCATION} • Available globally for remote work or
                relocation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-gradient-to-r from-slate-950/80 to-blue-950/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-12 text-center">
          <p className="text-sm text-slate-400 font-medium">
            © {new Date().getFullYear()} {NAME}. Crafted with passion and
            precision.
          </p>
          <div className="mt-4 flex items-center justify-center gap-6">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="p-2 rounded-xl hover:bg-slate-800 transition-colors text-slate-500 hover:text-blue-400"
                aria-label={s.label}
              >
                {s.icon === "linkedin" && <LinkedInIcon />}
                {s.icon === "github" && <GitHubIcon />}
                {s.icon === "email" && <EmailIcon />}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
