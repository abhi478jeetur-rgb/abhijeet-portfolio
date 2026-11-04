# Abhijeet Kumar — Portfolio

A static site with no build step: `index.html` (home) and `gallery.html` (full gallery). Fonts, GSAP and ScrollTrigger are stored locally in `assets/`.

## Where things live
| What | File |
|---|---|
| **All copy, links, services, journey, FAQ, SEO, agent settings** | `config.js` → `SITE` |
| **Projects (gallery page + first 6 home cards)** | `config.js` → `GALLERY` (an empty array shows tasteful "Coming soon" tiles) |
| **WhatsApp number + pre-filled message** | top of `config.js` (`WHATSAPP_NUMBER`, `WHATSAPP_TEXT`) |
| **Domain for canonical / OG / sitemap / JSON-LD** | `config.js` → `SITE.seo.url` |
| **Theme colours** | top of `style.css`: `:root` = dark (navy-black + crimson), `[data-theme="light"]` = sunflower light |
| **Engine (agents, dust snap, rendering)** | `script.js` |

### Add a project
```js
const GALLERY = [
  { title: "Sunflower Studio", category: "Websites", year: "2026",
    preview: "assets/gallery/sunflower.webp",   // ~1200×750 webp
    video: "assets/gallery/sunflower.mp4",      // optional muted loop that plays on hover
    link: "https://example.com" },              // "Open live ↗"
];
```
Categories: AI Video, Video Editing, Motion Graphics, Graphic Design, 3D Websites, Websites, Apps.

### After you edit `config.js` (optional, for SEO/GEO)
The page always renders from `config.js` in the browser. Two optional steps also bake the text into the HTML for crawlers and AI engines:
```bash
node tools/seo-files.js                      # sitemap.xml, robots.txt, llms.txt (no dependencies)
python3 -m http.server 8090 &                # serve the folder
node tools/prerender.js http://localhost:8090   # needs Playwright: bakes text + JSON-LD into the HTML, renders icons, og.jpg
```

## Features
- Agent builder: coloured paper-arrow "agents" fly in on a dark stage, then build the hero like a multiplayer design tool, with rulers, selection boxes, typed text and the PORTFOLIO letters stamped one by one. Each section is built as it scrolls into view. The agents follow your mouse only after you reach the end of the page.
- Two themes with a toggle in the nav. The choice is saved in localStorage; dark is the default.
- Theme switch: the visible page breaks into dust and blows away to the right, the old background sweeps off, then the agents rebuild the screen in the new theme. Content off screen switches instantly. Double clicks are ignored while a switch runs. With reduced motion turned on, the theme changes instantly with a quick fade.
- Mask reveals, counters, a logo marquee with floating icons, a before/after slider (drag, or use the arrow keys), journey and FAQ accordions, quote-card tilt, magnetic buttons, a floating WhatsApp button, and footer social icons.
- Phones get fewer agents and dust particles, and no rulers.
- SEO and GEO: meta, canonical, Open Graph, Twitter card, JSON-LD (Person, ProfessionalService with its services, WebSite, FAQPage), sitemap, robots, llms.txt, manifest and favicons.

## Deploy
Upload the folder to Vercel as a static site. `vercel.json` sets cache headers and `.vercelignore` skips `tools/`. Vercel compresses files with brotli automatically.
