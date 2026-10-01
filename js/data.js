/* =====================================================================
   SITE CONTENT — edit this file to update your portfolio.
   Everything on the page is rendered from this object.
   Lines marked TODO are placeholders waiting for your real details.
   ===================================================================== */

window.SITE = {
  name: "Ashesh Shrestha",
  initials: "AS",
  eyebrow: "Hi, I'm Ashesh Shrestha — Software Developer",

  // Words wrapped in *asterisks* get the gradient highlight.
  headline: [
    "I build systems that *scale*",
    "and interfaces that *breathe*."
  ],

  // Cycled by the typewriter under the headline.
  rotatingRoles: [
    "Software Developer",
    "Full-Stack Web Developer",
    "Backend & API Engineer",
    "AI Integration Builder",
    "Platform Modernizer"
  ],

  subtitle:
    "Software developer and full-stack web developer with 6+ years of experience turning legacy platforms into fast, modern, cloud-ready products — from background job pipelines to pixel-perfect UI.",

  // Small floating chips that orbit the monogram in the hero.
  floatingChips: ["FastAPI", "AWS", "MySQL", "Redis", "JavaScript"],

  location: "Nepal",                          // TODO: city, country
  email: "er.asheshshrestha@gmail.com",           // TODO: your real email
  availability: "Open to freelance & full-time roles",

  // Icons available: github, linkedin, mail, twitter, globe
  socials: [
    { name: "GitHub",   icon: "github",   url: "https://github.com/asheshshrestha-tor" },
    { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/asheshshrestha" }, // TODO: your LinkedIn URL
    { name: "Email",    icon: "mail",     url: "mailto:er.asheshshrestha@gmail.com" }               // TODO: match `email` above
  ],

  about: {
    // Text wrapped in **double asterisks** is rendered bold.
    paragraphs: [
      "I'm **Ashesh Shrestha**, a software developer and full-stack web developer from Nepal with 6+ years of professional experience building and refactoring complex web applications. I specialise in bridging the gap between legacy systems and modern, scalable cloud infrastructure.",
      "Whether it's orchestrating **background task processing**, securing **API and webhook integrations**, or designing custom, visually engaging UI components, I deliver work that is highly functional and thoughtfully designed.",
      "Lately my focus has been on **AI-powered tooling**, payment reconciliation systems, and platform modernization — the unglamorous, high-impact work that keeps products fast and reliable."
    ],
    stats: [
      { value: 6,  suffix: "+", label: "Years of experience" },
      { value: 25, suffix: "+", label: "Projects delivered" },     // TODO: real number
      { value: 15, suffix: "+", label: "APIs integrated" },        // TODO: real number
      { value: 99, suffix: "%", label: "Uptime obsession" }
    ]
  },

  // Scrolling strip above the skills grid.
  marquee: [
    "Python", "FastAPI", "JavaScript", "MySQL", "AWS", "Redis", "RabbitMQ",
    "Classic ASP", "REST APIs", "Webhooks", "HTML & CSS", "AI Agents", "CI/CD"
  ],

  // Icons available: server, layout, database, cpu, code, zap
  skills: [
    {
      icon: "server",
      title: "Backend",
      desc: "APIs that stay fast under load and fail gracefully.",
      items: ["Python", "FastAPI", "Classic ASP", "REST APIs", "Webhooks", "Background jobs", "Auth & security"]
    },
    {
      icon: "layout",
      title: "Frontend",
      desc: "Interfaces with an artist's eye and an engineer's discipline.",
      items: ["JavaScript", "HTML5", "CSS3", "Responsive UI", "Animations", "Email templates", "Accessibility"]
    },
    {
      icon: "database",
      title: "Data & Infrastructure",
      desc: "From schema design to production deployment.",
      items: ["MySQL", "Redis", "RabbitMQ", "AWS", "Nginx / IIS", "Linux", "Monitoring"]
    },
    {
      icon: "cpu",
      title: "AI & Integrations",
      desc: "Connecting products to the services that power them.",
      items: ["LLM agents", "FAQ bots", "Human-in-the-loop", "Payment gateways", "Third-party APIs", "Git & CI/CD"]
    }
  ],

  // TODO: replace these placeholder entries with your real work history.
  experience: [
    {
      role: "Senior Web Developer",
      company: "QSystems AI",
      period: "2024 — Present",
      location: "Remote",
      summary: "Leading platform modernization and AI tooling initiatives across a large legacy codebase.",
      bullets: [
        "Bridged Classic ASP services with a modern FastAPI + AWS stack.",
        "Built intelligent FAQ agents and human-in-the-loop review tooling.",
        "Designed webhook listeners and background reconciliation for financial APIs."
      ],
      tags: ["Python", "FastAPI", "AWS", "MySQL", "Redis"]
    },
    {
      role: "Web Developer",
      company: "Technables",
      period: "2021 — 2024",
      location: "Kathmandu, Nepal",
      summary: "Owned end-to-end features across backend services and customer-facing interfaces.",
      bullets: [
        "Shipped API integrations with third-party payment and messaging providers.",
        "Resolved complex database connection and performance issues in production.",
        "Built responsive, card-based HTML/CSS notification templates."
      ],
      tags: ["JavaScript", "MySQL", "RabbitMQ", "REST"]
    },
    {
      role: "Junior Developer",
      company: "Braindigit",
      period: "2020 — 2021",
      location: "Kathmandu, Nepal",
      summary: "Started out building and maintaining web applications for small business clients.",
      bullets: [
        "Developed and maintained client websites and internal tools.",
        "Learned production deployment, server configuration and debugging."
      ],
      tags: ["HTML", "CSS", "JavaScript", "Classic ASP"]
    }
  ],

  // TODO: replace these sample projects with real ones (add github / live links).
  // `colors` are the two gradient colours used for the card's visual.
  projects: [
    {
      title: "Nova Commerce",
      category: "Web Development",
      description: "A full-stack e-commerce platform with a FastAPI backend, MySQL schema designed for scale, and a fast, responsive storefront deployed on AWS.",
      tags: ["FastAPI", "MySQL", "AWS", "JavaScript"],
      github: "https://github.com/asheshshrestha-tor",
      live: "",
      colors: ["#0ea5e9", "#6366f1"]
    },
    {
      title: "Atlas Support Agent",
      category: "AI Integration",
      description: "An LLM-powered FAQ agent with human-in-the-loop review, custom notification templates, and an internal dashboard for approving responses.",
      tags: ["Python", "LLM APIs", "Redis", "HTML/CSS"],
      github: "https://github.com/asheshshrestha-tor",
      live: "",
      colors: ["#8b5cf6", "#ec4899"]
    },
    {
      title: "PayBridge",
      category: "Payment Systems",
      description: "Webhook listener and background reconciliation service for third-party financial APIs, with retry logic and delayed-failure handling.",
      tags: ["FastAPI", "RabbitMQ", "Webhooks", "MySQL"],
      github: "https://github.com/asheshshrestha-tor",
      live: "",
      colors: ["#14b8a6", "#22c55e"]
    },
    {
      title: "Folio Studio",
      category: "Portfolio Sites",
      description: "Bespoke, animation-rich portfolio websites for creatives and professionals — including the one you're looking at right now.",
      tags: ["HTML", "CSS", "JavaScript", "Three.js"],
      github: "https://github.com/asheshshrestha-tor/asheshshrestha",
      live: "https://asheshstha.com.np",
      colors: ["#f97316", "#f43f5e"]
    }
  ],

  contact: {
    title: "Let's build something great.",
    text: "Have a project in mind, a legacy system that needs rescuing, or just want to say hi? My inbox is always open."
  }
};
