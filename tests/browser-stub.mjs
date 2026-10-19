// Node 기본 모듈만 사용하는 최소 DOM 대역입니다.
// 상태 전환과 출력 문자열 검증용이며 실제 DOM 파싱·레이아웃·접근성 검사를 대신하지 않습니다.
import { readFileSync } from "node:fs";
import vm from "node:vm";

const decodeHtml = (text) => text
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&amp;/g, "&");

export class Element {
  constructor(document, value = "") {
    this.document = document;
    this.value = value;
    this.dataset = {};
    this.attributes = new Map();
    this.listeners = new Map();
    this.hidden = false;
    this.disabled = false;
    this.textContent = "";
    this.html = "";
    this.buttons = [];
    this.validity = { typeMismatch: false };
    const classes = new Set();
    this.classList = {
      contains: (name) => classes.has(name),
      add: (...names) => names.forEach((name) => classes.add(name)),
      remove: (...names) => names.forEach((name) => classes.delete(name)),
      toggle(name, force = !classes.has(name)) {
        if (force) classes.add(name);
        else classes.delete(name);
        return force;
      },
    };
  }

  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  hasAttribute(name) { return this.attributes.has(name); }
  removeAttribute(name) { this.attributes.delete(name); }
  get href() { return this.getAttribute("href") || ""; }
  set href(value) { this.setAttribute("href", value); }
  focus() { this.document.activeElement = this; }

  addEventListener(type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(listener);
  }

  dispatch(type, details = {}) {
    const event = {
      target: this,
      defaultPrevented: false,
      preventDefault() { this.defaultPrevented = true; },
      ...details,
    };
    (this.listeners.get(type) || []).forEach((listener) => listener(event));
    return event;
  }

  replaceChildren() { this.innerHTML = ""; }
  get innerHTML() { return this.html; }
  set innerHTML(html) {
    this.html = html;
    // 언어 필터 버튼만 재현한다. 임의 HTML을 브라우저처럼 파싱하지 않는다.
    this.buttons = [...html.matchAll(/<button[^>]*data-language="([^"]*)"[^>]*>/g)]
      .map(([, language]) => {
        const button = new Element(this.document);
        button.dataset.language = decodeHtml(language);
        return button;
      });
  }
  querySelectorAll(selector) {
    if (selector !== "button[data-language]") throw new Error(`지원하지 않는 선택자: ${selector}`);
    return this.buttons;
  }
}

export const settle = () => new Promise(setImmediate);

export const deferred = () => {
  let resolve;
  let reject;
  const promise = new Promise((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
};

export const response = (body, { status = 200, link = null } = {}) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => body,
  headers: { get: (name) => name.toLowerCase() === "link" ? link : null },
});

export const repository = (id, overrides = {}) => ({
  id,
  name: `project-${id}`,
  description: `프로젝트 ${id} 소개`,
  html_url: `https://github.com/example/project-${id}`,
  language: "JavaScript",
  stargazers_count: 0,
  forks_count: 0,
  updated_at: "2026-01-01T00:00:00Z",
  ...overrides,
});

export const mountScript = (filename, ids, { config = {}, fetch } = {}) => {
  const elements = {};
  const document = {
    activeElement: null,
    querySelector: (selector) => elements[selector.slice(1)] || null,
  };
  ids.forEach((id) => { elements[id] = new Element(document); });
  if (elements["project-sort"]) elements["project-sort"].value = "updated";

  // 실제 시간을 기다리지 않고 timeout과 정리 동작을 확인한다.
  const timers = new Map();
  let timerId = 0;
  const window = {
    PORTFOLIO_CONFIG: config,
    setTimeout(callback, delay) {
      timerId += 1;
      timers.set(timerId, { callback, delay });
      return timerId;
    },
    clearTimeout(id) { timers.delete(id); },
  };
  const source = readFileSync(new URL(`../js/${filename}`, import.meta.url), "utf8");
  vm.runInNewContext(source, {
    document, window, fetch, AbortController, URL, console,
    // fetch 대역이 던지는 오류와 스크립트의 instanceof가 같은 실행 영역을 사용한다.
    Error, TypeError, SyntaxError,
  }, { filename });

  return {
    elements,
    document,
    timers,
    expireTimers() {
      const pending = [...timers.values()];
      timers.clear();
      pending.forEach(({ callback }) => callback());
    },
  };
};
