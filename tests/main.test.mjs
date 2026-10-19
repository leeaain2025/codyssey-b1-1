// 스크롤·저장소·IntersectionObserver의 경계 조건을 검증하는 DOM 대역 테스트입니다.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { Element } from "./browser-stub.mjs";

const mount = ({ storedTheme = null, blockStorage = false, reduceMotion = false } = {}) => {
  const ids = ["site-header", "theme-toggle", "theme-status", "menu-toggle", "nav-links", "back-to-top", "copyright-year", "profile-image"];
  const elements = {};
  const documentListeners = new Map();
  const document = {
    activeElement: null,
    querySelector(selector) {
      if (selector === 'meta[name="theme-color"]') return elements.meta;
      if (selector === ".brand") return elements.brand;
      return elements[selector.slice(1)] || null;
    },
    querySelectorAll(selector) { return selector === ".reveal" ? reveals : []; },
    getElementById: (id) => elements[id] || null,
    addEventListener: (type, listener) => documentListeners.set(type, listener),
  };
  ids.forEach((id) => { elements[id] = new Element(document); });
  elements.meta = {};
  elements.brand = new Element(document);
  document.documentElement = new Element(document);
  document.documentElement.scrollHeight = 5000;
  const reveals = [new Element(document), new Element(document)];
  const media = new Map();
  const getMedia = (query) => {
    if (!media.has(query)) {
      const entry = new Element(document);
      entry.matches = query.includes("reduced-motion") && reduceMotion;
      media.set(query, entry);
    }
    return media.get(query);
  };

  let observer;
  class IntersectionObserver {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      this.observed = new Set();
      this.disconnected = false;
      observer = this;
    }
    observe(element) { this.observed.add(element); }
    unobserve(element) { this.observed.delete(element); }
    disconnect() { this.disconnected = true; this.observed.clear(); }
    intersect(target, intersectionRatio, isIntersecting = true) {
      this.callback([{ target, intersectionRatio, isIntersecting }], this);
    }
  }

  const windowListeners = new Map();
  const window = {
    scrollY: 0,
    innerHeight: 800,
    IntersectionObserver,
    matchMedia: getMedia,
    addEventListener: (type, listener) => windowListeners.set(type, listener),
  };
  const writes = [];
  const context = vm.createContext({
    window, document, IntersectionObserver,
    localStorage: {
      getItem() { if (blockStorage) throw new Error("Storage blocked"); return storedTheme; },
      setItem(key, value) { if (blockStorage) throw new Error("Storage blocked"); writes.push({ key, value }); },
    },
    requestAnimationFrame: (callback) => callback(),
    console: { warn() {} },
  });
  ["config.js", "main.js"].forEach((file) => {
    const source = readFileSync(new URL(`../js/${file}`, import.meta.url), "utf8");
    vm.runInContext(source, context, { filename: file });
  });
  return {
    elements, root: document.documentElement, window, media, writes, reveals, observer,
    scrollTo(y) { window.scrollY = y; windowListeners.get("scroll")(); },
  };
};

test("스크롤 59/60px 및 299/300px 경계에서 헤더와 맨 위 버튼 상태가 바뀐다", () => {
  const app = mount();
  const header = app.elements["site-header"];
  const top = app.elements["back-to-top"];
  app.scrollTo(59);
  assert.equal(header.classList.contains("is-scrolled"), false);
  assert.equal(top.hidden, true);
  app.scrollTo(60);
  assert.equal(header.classList.contains("is-scrolled"), true);
  app.scrollTo(299);
  assert.equal(top.hidden, true);
  app.scrollTo(300);
  assert.equal(top.hidden, false);
  app.scrollTo(0);
  assert.equal(header.classList.contains("is-scrolled"), false);
  assert.equal(top.hidden, true);
});

test("저장된 테마를 복원하고 버튼 선택을 저장하며 명시적 선택을 유지한다", () => {
  const app = mount({ storedTheme: "dark" });
  assert.equal(app.root.dataset.theme, "dark");
  assert.match(app.elements["theme-toggle"].getAttribute("aria-label"), /라이트/);
  app.elements["theme-toggle"].dispatch("click");
  assert.equal(app.root.dataset.theme, "light");
  assert.deepEqual(app.writes, [{ key: app.window.PORTFOLIO_CONFIG.themeStorageKey, value: "light" }]);
  app.media.get("(prefers-color-scheme: dark)").dispatch("change", { matches: true });
  assert.equal(app.root.dataset.theme, "light");
});

test("저장소 읽기·쓰기가 차단되어도 현재 화면의 테마를 전환할 수 있다", () => {
  const app = mount({ blockStorage: true });
  assert.equal(app.root.dataset.theme, "light");
  assert.doesNotThrow(() => app.elements["theme-toggle"].dispatch("click"));
  assert.equal(app.root.dataset.theme, "dark");
  assert.match(app.elements["theme-status"].textContent, /저장할 수 없습니다/);
});

test("등장 효과는 교차 비율 0.2부터 적용하고 한 번 표시한 대상의 관찰을 해제한다", () => {
  const app = mount();
  const [first, second] = app.reveals;
  assert.equal(app.observer.options.threshold, 0.2);
  assert.equal(first.classList.contains("will-reveal"), true);
  app.observer.intersect(first, 0.19);
  assert.equal(first.classList.contains("is-visible"), false);
  assert.equal(app.observer.observed.has(first), true);
  app.observer.intersect(first, 0.2);
  assert.equal(first.classList.contains("is-visible"), true);
  assert.equal(app.observer.observed.has(first), false);
  app.observer.intersect(second, 0.5, false);
  assert.equal(second.classList.contains("is-visible"), false);
  app.media.get("(prefers-reduced-motion: reduce)").dispatch("change", { matches: true });
  assert.equal(second.classList.contains("is-visible"), true);
  assert.equal(app.observer.disconnected, true);
});

test("처음부터 모션 줄이기 설정이 켜져 있으면 콘텐츠를 숨기지 않는다", () => {
  const app = mount({ reduceMotion: true });
  assert.equal(app.observer, undefined);
  app.reveals.forEach((element) => assert.equal(element.classList.contains("will-reveal"), false));
});
