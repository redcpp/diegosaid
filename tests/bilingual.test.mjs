/**
 * The site is bilingual, and these tests keep it that way.
 *
 * Two layers. The source checks read src/ directly: every post has a
 * translation, and the CV has the same entries in both languages. The build
 * checks read dist/ (run `npm run build` first): every page exists in both
 * trees, the two point at each other, the navbar switch leads to the
 * translation rather than a fallback, and each translation has the same
 * skeleton as its original, so a section dropped in translation fails here.
 *
 * Nothing is listed by hand. A new post or page is covered the moment it
 * exists, and fails until its translation does.
 *
 * Run with `npm test`. The HTML is the site's own build output, so a few
 * regular expressions read it reliably without a parser dependency.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { CV } from '../src/i18n/cv.ts';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const POSTS = join(ROOT, 'src/content/blog');
const LANGS = ['en', 'es'];

// ---------------------------------------------------------------- helpers

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

/** Front matter as flat key → raw string, plus `tags` as an array. */
function frontmatter(file) {
  const block = readFileSync(file, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const fields = {};
  for (const [, key, value] of block.matchAll(/^(\w+):\s*(.*)$/gm)) fields[key] = value.trim();
  fields.tags = [...block.matchAll(/^\s+-\s+(.+)$/gm)].map((m) => m[1]);
  return fields;
}

function posts(lang) {
  return readdirSync(join(POSTS, lang))
    .filter((name) => /\.mdx?$/.test(name))
    .map((name) => {
      const slug = name.replace(/\.mdx?$/, '');
      const data = frontmatter(join(POSTS, lang, name));
      return { lang, slug, key: data.key ?? slug, data };
    });
}

/** dist/es/blog/adr47/index.html → /es/blog/adr47/ */
function routeOf(file) {
  const path = '/' + relative(DIST, file).split(sep).join('/');
  return path.endsWith('index.html') ? path.slice(0, -'index.html'.length) : path;
}

/** /es/blog/adr47/ → dist/es/blog/adr47/index.html, or null if nothing is there. */
function fileOf(route) {
  const path = decodeURI(route.split(/[?#]/)[0]);
  const candidates = path.endsWith('/')
    ? [join(DIST, path, 'index.html')]
    : [join(DIST, path), join(DIST, path, 'index.html'), join(DIST, `${path}.html`)];
  return candidates.find((file) => existsSync(file) && statSync(file).isFile()) ?? null;
}

function attrs(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, name, value]) => [name, value]),
  );
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map((m) => attrs(m[0]));
}

function between(html, open, close) {
  const start = html.indexOf(open);
  const end = html.indexOf(close, start);
  return start === -1 || end === -1 ? '' : html.slice(start, end);
}

function langOfRoute(route) {
  return route === '/es/' || route.startsWith('/es/') ? 'es' : 'en';
}

function readPage(file) {
  const html = readFileSync(file, 'utf8');
  const route = routeOf(file);
  const alternates = Object.fromEntries(
    tags(html, 'link')
      .filter((link) => link.rel === 'alternate' && link.hreflang)
      .map((link) => [link.hreflang, new URL(link.href).pathname]),
  );
  const nav = between(html, '<nav', '</nav>');
  const switches = Object.fromEntries(
    tags(nav, 'a')
      .filter((a) => a.hreflang)
      .map((a) => [a.hreflang, a.href]),
  );
  return {
    file,
    route,
    lang: html.match(/<html[^>]*\blang="([^"]+)"/)?.[1],
    alternates,
    switches,
    main: between(html, '<main', '</main>'),
    ogImage: tags(html, 'meta').find((m) => m.property === 'og:image')?.content,
  };
}

/**
 * What a translation must keep: headings, code, math, tables, lists, images.
 * Paragraph counts are left out on purpose, since a translation may merge or
 * split sentences across paragraphs.
 */
function skeleton(html) {
  const count = (re) => (html.match(re) ?? []).length;
  return {
    h1: count(/<h1\b/g),
    h2: count(/<h2\b/g),
    h3: count(/<h3\b/g),
    h4: count(/<h4\b/g),
    code: count(/<pre\b/g),
    math: count(/class="katex-display"/g),
    tables: count(/<table\b/g),
    rows: count(/<tr\b/g),
    items: count(/<li\b/g),
    images: count(/<img\b/g),
    quotes: count(/<blockquote\b/g),
  };
}

// ---------------------------------------------------------------- source

test('every post has a translation in the other language', () => {
  const byLang = Object.fromEntries(LANGS.map((lang) => [lang, posts(lang)]));
  for (const lang of LANGS) {
    const other = lang === 'en' ? 'es' : 'en';
    const otherKeys = new Set(byLang[other].map((post) => post.key));
    for (const post of byLang[lang]) {
      assert.ok(
        otherKeys.has(post.key),
        `${lang}/${post.slug} has no ${other} translation. Add ${other}/${post.slug}.md, ` +
          `or set key: ${post.key} on a translation that uses its own slug.`,
      );
    }
  }
});

test('translation keys are unique within each language', () => {
  for (const lang of LANGS) {
    const seen = new Map();
    for (const post of posts(lang)) {
      assert.ok(
        !seen.has(post.key),
        `${lang}/${post.slug} and ${lang}/${seen.get(post.key)} share the key "${post.key}"`,
      );
      seen.set(post.key, post.slug);
    }
  }
});

test('a post and its translation share a date and a tag count', () => {
  const es = new Map(posts('es').map((post) => [post.key, post]));
  for (const en of posts('en')) {
    const other = es.get(en.key);
    if (!other) continue; // reported by the translation test
    const pair = `en/${en.slug} ↔ es/${other.slug}`;
    assert.equal(other.data.date, en.data.date, `${pair}: dates differ`);
    assert.equal(other.data.tags.length, en.data.tags.length, `${pair}: tag counts differ`);
  }
});

test('the CV has the same entries in both languages', () => {
  const { en, es } = CV;
  for (const section of ['experience', 'projects', 'education', 'honors', 'skills', 'publications']) {
    assert.equal(es[section].length, en[section].length, `CV.${section}: entry counts differ`);
  }
  en.projects.forEach((project, i) => {
    assert.equal(es.projects[i].link, project.link, `CV.projects[${i}]: links differ`);
    assert.equal(es.projects[i].image, project.image, `CV.projects[${i}]: images differ`);
  });
  en.experience.forEach((entry, i) => {
    assert.equal(
      Boolean(es.experience[i].description),
      Boolean(entry.description),
      `CV.experience[${i}]: description present in one language only`,
    );
  });
});

// ---------------------------------------------------------------- build

const built = existsSync(DIST);
const buildTest = (name, fn) =>
  test(name, { skip: built ? false : 'dist/ is missing; run `npm run build` first' }, fn);

function pages() {
  return walk(DIST)
    .filter((file) => file.endsWith('.html'))
    .map(readPage);
}

/** Every page except the not-found pages, which have no URL of their own. */
function contentPages() {
  return pages().filter((page) => !/\/404(\.html|\/)$/.test(page.route));
}

buildTest('every page declares <html lang> matching its tree', () => {
  for (const page of pages()) {
    assert.equal(page.lang, langOfRoute(page.route), `${page.route}: wrong <html lang>`);
  }
});

buildTest('every page links to its translation, and the translation exists', () => {
  for (const page of contentPages()) {
    for (const lang of LANGS) {
      const target = page.alternates[lang];
      assert.ok(target, `${page.route}: no hreflang="${lang}" alternate`);
      assert.ok(fileOf(target), `${page.route}: hreflang="${lang}" points at ${target}, which was not built`);
      assert.equal(langOfRoute(target), lang, `${page.route}: hreflang="${lang}" points into the wrong tree`);
    }
    assert.equal(page.alternates[page.lang], page.route, `${page.route}: hreflang for its own language is not itself`);
    assert.ok(page.alternates['x-default'], `${page.route}: no hreflang="x-default"`);
  }
});

buildTest('translations point back at each other', () => {
  const byRoute = new Map(contentPages().map((page) => [page.route, page]));
  for (const page of byRoute.values()) {
    for (const lang of LANGS) {
      const other = byRoute.get(page.alternates[lang]);
      if (!other) continue; // reported above
      assert.deepEqual(
        other.alternates,
        page.alternates,
        `${page.route} and ${other.route} disagree about their alternates`,
      );
    }
  }
});

buildTest('the navbar switch leads to the translation, not a fallback', () => {
  for (const page of contentPages()) {
    const other = page.lang === 'en' ? 'es' : 'en';
    assert.equal(
      page.switches[other],
      page.alternates[other],
      `${page.route}: the ${other.toUpperCase()} switch goes to ${page.switches[other]}`,
    );
  }
  for (const page of pages()) {
    const other = page.lang === 'en' ? 'es' : 'en';
    assert.ok(page.switches[other], `${page.route}: no language switch in the navbar`);
    assert.ok(fileOf(page.switches[other]), `${page.route}: the switch points at a page that was not built`);
  }
});

buildTest('each translation keeps the structure of the original', () => {
  for (const page of contentPages()) {
    if (page.lang !== 'en') continue;
    const translation = pages().find((other) => other.route === page.alternates.es);
    if (!translation) continue; // reported above
    assert.deepEqual(
      skeleton(translation.main),
      skeleton(page.main),
      `${translation.route} does not match the structure of ${page.route}`,
    );
  }
});

buildTest('links inside a page stay in its language, and resolve', () => {
  for (const page of pages()) {
    for (const { href } of tags(page.main, 'a')) {
      if (!href?.startsWith('/') || href.startsWith('//')) continue;
      assert.ok(fileOf(href), `${page.route}: links to ${href}, which was not built`);
      const path = href.split('#')[0];
      const isPage = path.endsWith('/') || !/\.\w+$/.test(path);
      // A page may link across languages only to its own translation, the way
      // a translated essay points at its original.
      if (isPage && langOfRoute(path) !== page.lang) {
        assert.ok(
          Object.values(page.alternates).includes(path),
          `${page.route}: links to ${href} in the other language`,
        );
      }
    }
  }
});

buildTest('every page has its own Open Graph image', () => {
  for (const page of contentPages()) {
    assert.ok(page.ogImage, `${page.route}: no og:image`);
    const path = new URL(page.ogImage).pathname;
    assert.ok(fileOf(path), `${page.route}: og:image ${path} was not built`);
    if (page.lang === 'es') assert.ok(path.startsWith('/og/es/'), `${page.route}: uses the English card`);
  }
});

buildTest('each language has a 404 page in its own language', () => {
  for (const [file, lang] of [['404.html', 'en'], ['es/404.html', 'es']]) {
    const path = join(DIST, file);
    assert.ok(existsSync(path), `dist/${file} is missing; Cloudflare Pages would fall back to SPA mode`);
    assert.equal(readPage(path).lang, lang, `dist/${file}: wrong <html lang>`);
  }
});

buildTest('both feeds carry every post', () => {
  const items = (file) => (readFileSync(join(DIST, file), 'utf8').match(/<item>/g) ?? []).length;
  const en = items('rss.xml');
  const es = items('es/rss.xml');
  assert.equal(en, posts('en').length, 'rss.xml is missing posts');
  assert.equal(es, posts('es').length, 'es/rss.xml is missing posts');
  assert.equal(en, es, 'the feeds carry different numbers of posts');
});
