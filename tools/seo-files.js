// node tools/seo-files.js  → regenerates sitemap.xml, robots.txt, llms.txt from config.js (no dependencies)
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const sandbox = { encodeURIComponent };
vm.runInNewContext(fs.readFileSync(path.join(root, 'config.js'), 'utf8') + '\n;this.SITE=SITE;this.GALLERY=GALLERY;', sandbox);
const { SITE, GALLERY } = sandbox;
const base = SITE.seo.url.replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url><loc>${base}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority>
    <image:image><image:loc>${base}/og.jpg</image:loc><image:title>${SITE.fullName} — ${SITE.role}</image:title></image:image></url>
  <url><loc>${base}/gallery.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
</urlset>
`);
fs.writeFileSync(path.join(root, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /tools/

# AI crawlers are welcome — see /llms.txt for a plain summary
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${base}/sitemap.xml
`);
const strip = (s) => String(s).replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '');
const work = GALLERY.length ? GALLERY.map((g) => `- ${g.title} (${g.category}${g.year ? ', ' + g.year : ''})${g.link ? ': ' + g.link : ''}`).join('\n') : '- New projects are being added to the gallery one by one.';
fs.writeFileSync(path.join(root, 'llms.txt'), `# ${SITE.fullName}

> ${SITE.fullName} is an AI developer and creator based in ${SITE.location}. He builds websites, 3D websites, apps, AI videos, video edits, motion graphics and thumbnails using an AI-first workflow — fast, clean and made to grow your business. The first demo is free.

## Who he is
- Name: ${SITE.fullName}
- Role: AI Developer, Video Editor & Web Designer ("${strip(SITE.hero.kicker)}")
- Location: ${SITE.location} — works with clients in India and worldwide (remote)
- Reply time: usually within 24 hours

## Services
${SITE.services.list.map((s) => `- ${s.title}: ${s.sub}`).join('\n')}

## Offer
- ${SITE.services.text}

## Tools and stack
${SITE.about.toolkit.join(', ')}; also ${SITE.stack.map((s) => s.name).join(', ')}.

## Journey
${SITE.journey.rows.map((r) => `- ${strip(r.year)}: ${r.title} — ${r.sub}`).join('\n')}

## Selected work
${work}

## FAQ
${SITE.faq.items.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Contact
${SITE.contact.rows.map((c) => `- ${c.label}: ${c.value} — ${c.href}`).join('\n')}
${SITE.socials.filter((s) => !SITE.contact.rows.some((c) => c.href === s.href)).map((s) => `- ${s.label}: ${s.href}`).join('\n')}

## Pages
- Home: ${base}/
- Gallery: ${base}/gallery.html
`);
console.log('wrote sitemap.xml, robots.txt, llms.txt for', base);
