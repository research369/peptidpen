import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { render } from '../.prerender-temp/prerender.js';

const source = await readFile('dist/index.html','utf8');
const preview = process.env.PEPTIDPEN_PREVIEW === 'true' || ['deploy-preview','branch-deploy'].includes(process.env.CONTEXT);
const pages = [
  ['', '369 Peptid-Pen und 369 Plug&Play Patrone | 369 Research', '369 Peptid-Pen mit Case und 369 Plug&Play Patrone. Produkte entdecken und Auswahl zusammenstellen.'],
  ['checkout', 'Deine Auswahl | 369 Research', 'Deine Produktauswahl und Checkout-Vorschau von 369 Research.'],
  ['impressum', 'Impressum | 369 Research Sp. z o.o.', 'Anbieterkennzeichnung und Kontakt der 369 Research Sp. z o.o.'],
  ['datenschutz', 'Datenschutzhinweise | 369 Research', 'Informationen zur Verarbeitung personenbezogener Daten auf peptidpen.de.'],
  ['agb', 'AGB | 369 Research', 'Hinweise zu den Geschäftsbedingungen von 369 Research.'],
];
for (const [path,title,description] of pages) {
  const url = `https://peptidpen.de/${path}`;
  let html = source.replace('<div id="root"></div>', () => `<div id="root">${render(path)}</div>`)
    .replace(/<title>.*?<\/title>/,`<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/,`$1${description}`)
    .replace(/(<meta property="og:title" content=")[^"]*/,`$1${title}`)
    .replace(/(<meta property="og:description" content=")[^"]*/,`$1${description}`)
    .replace(/(<meta property="og:url" content=")[^"]*/,`$1${url}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/,`$1${title}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/,`$1${description}`)
    .replace(/(<link rel="canonical" href=")[^"]*/,`$1${url}`)
    .replace(/(<link rel="alternate"[^>]+href=")[^"]*/g,`$1${url}`);
  if (preview || path==='checkout') html = html.replace('</head>','<meta name="robots" content="noindex, nofollow" /></head>');
  const directory = path ? `dist/${path}` : 'dist';
  await mkdir(directory,{recursive:true});
  await writeFile(`${directory}/index.html`,html);
}
if (preview) {
  await writeFile('dist/robots.txt','User-agent: *\nDisallow: /\n');
  // Applies even when client-side JavaScript is not executed.
  await writeFile('dist/_headers','/*\n  X-Robots-Tag: noindex, nofollow\n');
}
