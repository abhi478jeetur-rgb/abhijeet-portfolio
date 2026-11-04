/* =====================================================================
   ███  SITE CONFIG — EDIT EVERYTHING HERE  ███
   Shared by index.html and gallery.html.
   • SITE     → all copy, links, services, journey, FAQ, SEO, agent settings
   • GALLERY  → your projects (feeds the gallery page AND the first 6 home cards)
   Colours for both themes live at the top of style.css (:root = dark,
   [data-theme="light"] = sunflower light).
   After editing, optionally run `node tools/prerender.js` so search engines
   and AI crawlers see the new text without running JavaScript.
   ===================================================================== */

const WHATSAPP_NUMBER = "919430322551";
const WHATSAPP_TEXT = "Hi Abhijeet, main aapse baat karna chahta hoon. Mujhe aapse kaam ke baare mein baat karni hai.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

const SITE = {
  name: "ABHIJEET",                      // logo + hero name
  fullName: "Abhijeet Kumar",
  nameAccent: ".",                       // accent character after the name
  role: "AI DEVELOPER & CREATOR",
  whatsapp: WHATSAPP_URL,
  defaultTheme: "dark",                  // "dark" | "light" (visitor's choice is remembered)

  seo: {
    url: "https://abhijeet-portfolio-orpin.vercel.app",   // ← change once, used for canonical / OG / sitemap / JSON-LD
    title: "Abhijeet Kumar — AI Developer, Video Editor & Web Designer",
    galleryTitle: "Gallery — Abhijeet Kumar | AI Videos, Websites, 3D Sites & Apps",
    description: "Abhijeet Kumar is an AI developer and creator. He builds websites, 3D websites, apps, AI videos, video edits, motion graphics and graphic designing with AI — fast, clean and made to grow your business. First demo free.",
    galleryDescription: "The full gallery of Abhijeet Kumar's work: AI video, video editing, motion graphics, graphic designing, 3D websites, websites and apps.",
    ogImage: "og.jpg?v=4",            // home share preview (dark)
    galleryOgImage: "og-gallery.jpg?v=4", // gallery share preview (light) — bump ?v= after changing images so WhatsApp/LinkedIn refresh
    keywords: "Abhijeet Kumar, AI developer, video editor, web designer, AI video, motion graphics, graphic designing, Next.js developer, 3D website, landing page, freelancer"
  },

  nav: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Journey", href: "#journey" },
    { label: "Contact", href: "#contact" }
  ],
  talkLabel: "Let's talk",

  hero: {
    kicker: "AI-POWERED CREATOR",
    label: "WORKING WORLDWIDE",
    availability: "OPEN FOR NEW PROJECTS",
    giantWord: "PORTFOLIO",
    hello: "Hello, I'm",
    roleLines: ["AI DEVELOPER &", "CREATOR"],
    description: "I build websites, apps and videos with AI. Fast, clean and made to grow your business.",
    cta: "See my work",
    cta2: "Chat on WhatsApp",
    tagline: "Every pixel.<br>Powered by AI.",
    // value = number → animated counter; text → shown as-is
    stats: [
      { value: 7,    suffix: ".", label: "Services" },
      { text: "AI",  suffix: "",  label: "First<br>workflow" },
      { value: 24,   suffix: "h", label: "Reply<br>time" }
    ],
    reelLabel: "EXPLORE THE GALLERY",
    reelTag: "AI · WEB · VIDEO",
    range: "WEBSITES · APPS · VIDEOS / 2026"
  },

  work: {
    eyebrow: "01 / SELECTED WORK",
    title: "BUILT WITH AI.<br>MADE TO WORK.",
    allLabel: "View full gallery",
    galleryHref: "gallery.html",
    filters: ["All", "AI Video", "Video Editing", "Motion Graphics", "Graphic Designing", "3D Websites", "Websites", "Apps"],
    homeCount: 6,
    totalLabel: "SEE ALL",
    stackLabel1: "TOOLS I BUILD WITH",
    stackLabel2: "MY AI & DEV STACK."
  },

  // logo strip — ids map to built-in SVG icons in script.js (ICONS)
  stack: [
    { id: "openai", name: "ChatGPT" }, { id: "claude", name: "Claude" }, { id: "claudecode", name: "Claude Code" },
    { id: "codex", name: "Codex" }, { id: "opencode", name: "OpenCode" }, { id: "gemini", name: "Gemini" },
    { id: "antigravity", name: "Antigravity" }, { id: "windsurf", name: "Windsurf" }, { id: "cursor", name: "Cursor" },
    { id: "copilot", name: "GitHub Copilot" }, { id: "vercel", name: "Vercel" }, { id: "next", name: "Next.js" },
    { id: "react", name: "React" }, { id: "supabase", name: "Supabase" }, { id: "node", name: "Node.js" },
    { id: "three", name: "Three.js" }, { id: "github", name: "GitHub" }, { id: "nvidia", name: "NVIDIA" },
    { id: "playwright", name: "Playwright" }, { id: "figma", name: "Figma" }, { id: "canva", name: "Canva" }
  ],

  services: {
    meta1: "WHAT I DO",
    meta2: "7 SERVICES · ONE AI WORKFLOW",
    title1: "WHAT I DO.",
    title2: "END TO END.",
    badgeNum: "1",
    badgeSup: "st",
    badgeCap: "FIRST DEMO FREE",
    text: "Tell me your idea. I'll build a free first demo so you see it before you pay.",
    ctaLabel: "Get my free demo",
    list: [
      { title: "AI Video Creation",          sub: "Ads, reels and stories generated and directed with AI.",          tag: "AI" },
      { title: "Video Editing",              sub: "Short-form and long-form edits with pace, captions and polish.",  tag: "EDIT" },
      { title: "Motion Graphics",            sub: "Animated titles, logos and explainers that move with intent.",    tag: "MOTION" },
      { title: "Graphic Designing", sub: "Posters, social posts, logos and brand visuals that stand out.",      tag: "DESIGN" },
      { title: "Websites & Landing Pages",   sub: "Fast, modern, SEO-ready sites that turn visitors into leads.",    tag: "WEB" },
      { title: "3D Websites",                sub: "Interactive Three.js experiences that make people stop and play.", tag: "3D" },
      { title: "Apps & Software",            sub: "Web apps, SaaS tools and dashboards built with an AI-first stack.", tag: "APP" }
    ]
  },

  raw: {
    eyebrow: "A LOOK UNDER THE HOOD",
    title1: "FROM PROMPT.",
    title2: "TO PRODUCT.",
    text: "One idea, written as a prompt. See it go from a rough wireframe to a polished, live-ready website. AI does the heavy lifting; I make every detail right.",
    meta1: "PROMPT → WIREFRAME → LIVE SITE",
    meta2: "AI-ASSISTED DESIGN · BUILD · SHIP",
    chipBefore: "PROMPT / WIREFRAME",
    chipAfter: "FINAL BUILD"
  },

  about: {
    eyebrow: "02 / BEHIND THE BUILD",
    title1: "NOT JUST CODE.",
    title2a: "BUT HOW AI MAKES IT",
    title2b: "FASTER.",
    intro: "I'm Abhijeet, an AI developer and creator. I mix modern web tech with AI tools to design, build and edit websites, apps and videos that look premium and ship fast.",
    skillsLabel: "WHAT I'M GOOD AT",
    skills: [
      { title: "Websites & web apps",   sub: "Next.js · React · Supabase · Vercel" },
      { title: "AI video & editing",    sub: "Short-form · AI video · motion graphics" },
      { title: "AI-first workflow",     sub: "Claude Code · Codex · Cursor · prompt engineering" }
    ],
    toolkitLabel: "TOOLKIT",
    toolkit: ["Next.js", "React", "Three.js", "Supabase", "Vercel", "Prompt Engineering", "AI Video", "Video Editing", "Motion Graphics", "Graphic Designing", "Claude Code", "Codex", "Cursor"],
    process: [
      { n: "01", t: "Prompt", d: "We talk through your idea and turn it into a clear plan and prompt." },
      { n: "02", t: "Build",  d: "AI speeds up the heavy lifting. I shape every detail by hand." },
      { n: "03", t: "Ship",   d: "Tested, fast and live, with tweaks until you love it." }
    ],
    quote: "I learn fast, build with AI, and ship work that looks premium.",
    signature: "Abhijeet",
    quoteFoot1: "LET'S BUILD",
    quoteFoot2: "THE NEXT BIG THING"
  },

  journey: {
    eyebrow: "03 / THE JOURNEY",
    title: "LEARNING IN PUBLIC.<br>BUILDING FOR REAL.",
    linkLabel: "GITHUB",
    linkHref: "https://github.com/abhi478jeetur-rgb",
    rows: [
      { year: "2026 — NOW",  title: "Building ChaseFree AI", sub: "AI invoicing assistant for freelancers", desc: "Built with Next.js, Supabase and NVIDIA NIM. Designing, building and shipping it end to end with an AI-first workflow.", now: true },
      { year: "2026",        title: "Hubber Web",            sub: "Websites & landing pages for clients",   desc: "Designing and building fast, modern websites and landing pages for businesses." },
      { year: "2025 — 2026", title: "AI Video & Editing",    sub: "Short-form, AI video and motion work",   desc: "Editing short-form content and creating AI-generated video and motion graphics." },
      { year: "2025",        title: "Started with code",     sub: "HTML, JS, then React & Next.js",         desc: "Started with the basics, then moved to React and Next.js, building projects in public on GitHub." }
    ],
    milesLabel: "A FEW MILESTONES",
    milesTitle1: "LITTLE WINS.",
    milesTitle2: "BIG MEANING.",
    milestones: [
      { title: "First client site live", tag: "CLIENT WORK" },
      { title: "First SaaS launched",    tag: "PRODUCT" },
      { title: "60+ GitHub repos",       tag: "OPEN SOURCE" }
    ]
  },

  faq: {
    eyebrow: "GOOD TO KNOW",
    title: "QUICK ANSWERS.",
    text: "Still curious about something? Ask me directly — I usually reply within 24 hours.",
    cta: "Ask on WhatsApp",
    items: [
      { q: "What services do you offer?", a: "AI video creation, video editing, motion graphics, graphic designing, websites and landing pages, 3D websites, and apps and software." },
      { q: "Is the first demo really free?", a: "Yes. Tell me your idea and I'll build a free first demo, so you can see it before you pay anything." },
      { q: "How long does a project take?", a: "It depends on the scope. Landing pages and short videos usually take a few days; bigger websites and apps take longer. You get a clear timeline after we talk." },
      { q: "Which AI tools do you use?", a: "Claude Code, Codex, Cursor, ChatGPT and Gemini for building and writing, AI video tools for creation, and Next.js, React, Supabase and Vercel for the web." },
      { q: "How can I contact you?", a: "WhatsApp is the fastest: +91 94303 22551. You can also reach me on Instagram, LinkedIn, GitHub or Freelancer. I usually reply within 24 hours." }
    ]
  },

  contact: {
    eyebrow: "04 / YOUR NEXT PROJECT",
    title1: "LET'S BUILD",
    title2: "TOGETHER",
    text: "Have an idea for a website, an app or a video? Send me a message and I'll build a free first demo.",
    cta: "Start on WhatsApp",
    rows: [
      { type: "whatsapp",  label: "WhatsApp",  value: "+91 94303 22551",   href: WHATSAPP_URL },
      { type: "instagram", label: "Instagram", value: "@abhi.jeetkuumar",  href: "https://www.instagram.com/abhi.jeetkuumar/" },
      { type: "linkedin",  label: "LinkedIn",  value: "Abhijeet Kumar",    href: "https://www.linkedin.com/in/abhijeet-kumar-4b6a083b0/" },
      { type: "github",    label: "GitHub",    value: "abhi478jeetur-rgb", href: "https://github.com/abhi478jeetur-rgb" },
      { type: "freelancer", label: "Freelancer", value: "abhijeetk371",    href: "https://www.freelancer.com/u/abhijeetk371" }
    ],
    cardTitle1: "MAKE IT",
    cardTitle2: "FEEL ALIVE."
  },

  socials: [
    { type: "instagram", label: "Instagram", href: "https://www.instagram.com/abhi.jeetkuumar/" },
    { type: "github",    label: "GitHub",    href: "https://github.com/abhi478jeetur-rgb" },
    { type: "peerlist",  label: "Peerlist",  href: "https://peerlist.io/abhijeetkuumar" },
    { type: "freelancer", label: "Freelancer", href: "https://www.freelancer.com/u/abhijeetk371" },
    { type: "linkedin",  label: "LinkedIn",  href: "https://www.linkedin.com/in/abhijeet-kumar-4b6a083b0/" },
    { type: "x",         label: "X",         href: "https://x.com/Abhijeetkuumar" },
    { type: "youtube",   label: "YouTube",   href: "https://www.youtube.com/@AbhijeetKumarz7r" },
    { type: "whatsapp",  label: "WhatsApp",  href: WHATSAPP_URL }
  ],
  footer: "© 2026 Abhijeet Kumar. Built with AI, finished by hand.",

  gallery: {
    eyebrow: "ALL PROJECTS",
    title: "THE FULL<br>GALLERY.",
    text: "Websites, apps, AI videos, edits and designs. Every card opens the live project.",
    emptyTitle: "Fresh work is on its way.",
    emptyText: "New projects land here one by one. Want to see what I can build for you? Ask for a free first demo.",
    openLabel: "Open live"
  },

  // "Agent builder": coloured paper-arrow cursors that build the page like a
  // multiplayer design tool. They ignore the visitor's mouse until the whole
  // page has been seen (bottom reached), then swarm-follow it.
  agents: {
    count: 10,              // desktop agents (8–12 recommended)
    mobileCount: 5,         // phones / touch screens
    labels: true,           // tiny name chip under an agent while it is working
    names: [],              // e.g. ["Layout","Type","Image"]; empty = "Agent 01", "Agent 02", ...
    speed: 1,               // >1 builds faster, <1 slower
    rulers: true,           // design-tool rulers + guides during the intro (and the journey section)
    followAtEnd: true,      // swarm-follow the mouse once the bottom of the page is reached
    snapParticles: 9000,    // theme-switch dust particles on desktop
    snapParticlesMobile: 2600
  }
};

/* =====================================================================
   GALLERY — add projects here, newest first. The first `SITE.work.homeCount`
   also appear on the home page. While it is empty, tasteful "Coming soon"
   tiles (one per category) are shown instead.
   {
     title:    "Sunflower Studio",
     category: "Websites",                 // one of SITE.work.filters (not "All")
     year:     "2026",
     preview:  "assets/gallery/sunflower.webp",   // ~1200×750 webp
     video:    "assets/gallery/sunflower.mp4",    // optional small muted loop (mp4/webm) or animated webp
     link:     "https://example.com"              // "Open live ↗"
   }
   ===================================================================== */
const GALLERY = (typeof window !== "undefined")
  ? [...(window.GALLERY_WEB || []), ...(window.GALLERY_DESIGN || [])]
  : [];   // items live in gallery/web.js (Hark-Two) and gallery/design.js (Hark-One)
const GALLERY_PLACEHOLDERS = true;   // show "Coming soon" tiles while GALLERY is empty
