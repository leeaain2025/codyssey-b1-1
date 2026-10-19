// 정적 규칙을 검사합니다. 정식 HTML/CSS validator나 브라우저의 레이아웃 검사는 아닙니다.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const html = readFileSync(new URL("index.html", root), "utf8");
const css = readFileSync(new URL("css/style.css", root), "utf8");
const tags = [...html.matchAll(/<[a-z][^>]*>/gi)].map(([tag]) => tag);

test("문서는 한 개의 h1과 필수 시맨틱 영역을 갖고 ID가 중복되지 않는다", () => {
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
  ["header", "nav", "main", "section", "footer"].forEach((name) => {
    assert.match(html, new RegExp(`<${name}(?:\\s|>)`));
  });
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(([, id]) => id);
  assert.equal(ids.length, new Set(ids).size);
  ["hero", "about", "skills", "projects", "contact", "footer"].forEach((id) => {
    assert.ok(ids.includes(id), `${id} 영역이 있어야 합니다.`);
  });
  [...html.matchAll(/\shref="#([^"]+)"/g)].forEach(([, id]) => {
    assert.ok(ids.includes(id), `내부 링크 #${id}의 대상이 있어야 합니다.`);
  });
});

test("인라인 스타일·이벤트·스크립트와 외부 패키지 로딩을 사용하지 않는다", () => {
  tags.forEach((tag) => {
    assert.doesNotMatch(tag, /\sstyle\s*=/i);
    assert.doesNotMatch(tag, /\son[a-z]+\s*=/i);
  });
  assert.doesNotMatch(html, /<style(?:\s|>)/i);
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
  assert.ok(scripts.length > 0);
  scripts.forEach(([, attributes, body]) => {
    const source = attributes.match(/\bsrc="([^"]+)"/);
    assert.ok(source, "스크립트는 외부 JS 파일이어야 합니다.");
    assert.match(source[1], /^js\/[\w.-]+\.js$/);
    assert.match(attributes, /\bdefer\b/);
    assert.equal(body.trim(), "");
    assert.ok(existsSync(new URL(source[1], root)));
  });
  assert.doesNotMatch(css, /@import\b|url\(["']?https?:/i);
  const stylesheets = tags.filter((tag) => /^<link\s/i.test(tag) && /rel="stylesheet"/i.test(tag));
  assert.equal(stylesheets.length, 1);
  assert.match(stylesheets[0], /href="css\/style\.css"/);
});

test("JavaScript 문법이 유효하며 var·인라인 스타일 조작을 사용하지 않는다", () => {
  readdirSync(new URL("js/", root)).filter((name) => name.endsWith(".js")).forEach((name) => {
    const source = readFileSync(new URL(`js/${name}`, root), "utf8");
    assert.doesNotThrow(() => new vm.Script(source, { filename: name }));
    assert.doesNotMatch(source, /\bvar\s+[a-z_$]/i, name);
    assert.doesNotMatch(source, /\.style\s*(?:\.|\[|=)|setAttribute\(\s*["']style["']/i, name);
  });
});

test("이미지에는 대체 텍스트가 있고 폼 컨트롤에는 연결된 label이 있다", () => {
  const labels = [...html.matchAll(/<label\b[^>]*\bfor="([^"]+)"/g)].map(([, id]) => id);
  tags.filter((tag) => /^<(input|textarea|select)\b/i.test(tag)).forEach((tag) => {
    const id = tag.match(/\bid="([^"]+)"/);
    assert.ok(id && labels.includes(id[1]), `${tag}에 연결된 label이 필요합니다.`);
  });
  tags.filter((tag) => /^<img\b/i.test(tag)).forEach((tag) => {
    assert.match(tag, /\balt="[^"]*"/);
  });
  tags.filter((tag) => /^<a\b/i.test(tag) && /target="_blank"/.test(tag)).forEach((tag) => {
    const rel = tag.match(/\brel="([^"]+)"/);
    assert.ok(rel && rel[1].split(/\s+/).includes("noopener"));
    assert.ok(rel && rel[1].split(/\s+/).includes("noreferrer"));
  });
});

test("로컬 에셋 경로와 반응형·테마·모션 CSS 규칙이 존재한다", () => {
  [...html.matchAll(/\b(?:src|href)="((?:css|js|images)\/[^"#]+)(?:#[^"]*)?"/g)]
    .forEach(([, path]) => assert.ok(existsSync(new URL(path, root)), `${path} 파일이 필요합니다.`));
  assert.match(css, /:root\s*\{/);
  assert.match(css, /\[data-theme="dark"\]/);
  assert.match(css, /display:\s*flex/);
  assert.match(css, /display:\s*grid/);
  assert.match(css, /@media\s*\(min-width:\s*768px\)/);
  assert.match(css, /@media\s*\(min-width:\s*1024px\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /\[hidden\]\s*\{\s*display:\s*none\s*!important/);
});
