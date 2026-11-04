// node tools/og/render.js  -> og.jpg (home, dark), og-gallery.jpg (light), og-square.jpg
const {chromium}=require(process.env.PLAYWRIGHT||'playwright');const fs=require('fs'),path=require('path');
const tpl=fs.readFileSync(path.join(__dirname,'og.html'),'utf8');const root=path.join(__dirname,'../..');
const chips=a=>a.map(x=>`<span>${x}</span>`).join('');
const v=[
 {out:'og.jpg',theme:'dark',tag:'AI-POWERED CREATOR',desc:'I build websites, apps and videos with AI. Fast, clean and made to grow your business.',chips:['Websites','3D Websites','Apps','AI Video','Video Editing','Motion Graphics','Graphic Designing']},
 {out:'og-gallery.jpg',theme:'light',tag:'THE FULL GALLERY',desc:'Hand-picked work: AI videos, edits, websites, 3D sites and apps.',chips:['AI Video','Video Editing','Motion Graphics','3D Websites','Websites','Apps']},
];
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
for(const o of v){const html=tpl.replace('THEME',o.theme).replace('TAG',o.tag).replace('DESC',o.desc).replace('CHIPS',chips(o.chips));
 const f=path.join(__dirname,'_'+o.theme+'.html');fs.writeFileSync(f,html);
 const p=await b.newPage({viewport:{width:1200,height:630}});await p.goto('file://'+f);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
 await p.screenshot({path:path.join(root,o.out),type:'jpeg',quality:86});fs.unlinkSync(f);console.log(o.out);}
await b.close();})();
