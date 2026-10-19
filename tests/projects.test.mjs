// 실행: node --test tests/*.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { deferred, mountScript, repository, response, settle } from "./browser-stub.mjs";

const ids = [
  "projects-grid", "projects-status", "projects-state", "projects-state-title",
  "projects-state-description", "projects-retry", "project-filters", "project-sort", "project-count",
];
const mount = (fetch, githubUsername = "example") => mountScript("projects.js", ids, {
  fetch,
  config: { githubUsername },
});
const stateOf = (app) => app.elements["projects-state"].dataset.state;
const pageTwo = '<https://api.github.com/users/example/repos?page=2>; rel="next"';

test("요청이 끝날 때까지 로딩을 표시하고 중복 재시도 요청을 보내지 않는다", async () => {
  const pending = deferred();
  let requests = 0;
  const app = mount(() => { requests += 1; return pending.promise; });
  const { elements: e } = app;
  assert.equal(stateOf(app), "loading");
  assert.equal(e["projects-grid"].hidden, true);
  assert.equal(e["projects-grid"].getAttribute("aria-busy"), "true");
  assert.equal(e["project-sort"].disabled, true);
  assert.equal(e["projects-retry"].disabled, true);
  e["projects-retry"].dispatch("click");
  e["projects-retry"].dispatch("click");
  assert.equal(requests, 1);
  pending.resolve(response([repository(1)]));
  await settle();
  assert.equal(stateOf(app), "success");
  assert.equal(e["projects-grid"].hidden, false);
  assert.equal(e["projects-grid"].getAttribute("aria-busy"), "false");
  assert.equal(app.timers.size, 0);
});

test("다음 페이지까지 완료한 뒤 중복을 제거한 전체 목록을 표시한다", async () => {
  const secondPage = deferred();
  const requests = [];
  const app = mount((url) => {
    requests.push(url);
    return requests.length === 1
      ? Promise.resolve(response([repository(1), repository(2)], { link: pageTwo }))
      : secondPage.promise;
  });
  await settle();
  assert.equal(requests.length, 2);
  assert.equal(new URL(requests[0]).searchParams.get("per_page"), "100");
  assert.equal(stateOf(app), "loading");
  assert.equal(app.elements["projects-grid"].innerHTML, "");
  secondPage.resolve(response([repository(2), repository(3, { fork: true })]));
  await settle();
  assert.equal(stateOf(app), "success");
  assert.equal(app.elements["project-count"].textContent, "3");
  assert.match(app.elements["projects-grid"].innerHTML, /Fork/);
});

test("HTTP 403 실패 후 재시도로 정상 목록을 회복한다", async () => {
  let requests = 0;
  const app = mount(async () => ++requests === 1
    ? response({}, { status: 403 })
    : response([repository(1)]));
  await settle();
  const { elements: e } = app;
  assert.equal(stateOf(app), "error");
  assert.equal(e["projects-state-title"].textContent, "프로젝트를 불러올 수 없습니다");
  assert.match(e["projects-state-description"].textContent, /제한/);
  assert.equal(e["projects-retry"].hidden, false);
  e["projects-retry"].dispatch("click");
  assert.equal(stateOf(app), "loading");
  await settle();
  assert.equal(stateOf(app), "success");
  assert.equal(e["project-count"].textContent, "1");
  assert.equal(e["projects-retry"].hidden, true);
});

test("후속 페이지 실패를 부분 성공으로 표시하지 않고 재시도 시 전체 목록을 다시 읽는다", async () => {
  const replies = [
    response([repository(1)], { link: pageTwo }),
    response({}, { status: 500 }),
    response([repository(2)]),
  ];
  const app = mount(async () => replies.shift());
  await settle();
  assert.equal(stateOf(app), "error");
  assert.equal(app.elements["projects-grid"].innerHTML, "");
  app.elements["projects-retry"].dispatch("click");
  await settle();
  assert.equal(stateOf(app), "success");
  assert.match(app.elements["projects-grid"].innerHTML, /project-2/);
  assert.doesNotMatch(app.elements["projects-grid"].innerHTML, /project-1/);
});

test("빈 배열은 오류가 아닌 빈 상태이며 재시도 버튼을 표시하지 않는다", async () => {
  const app = mount(async () => response([]));
  await settle();
  assert.equal(stateOf(app), "empty");
  assert.equal(app.elements["projects-state-title"].textContent, "표시할 프로젝트가 없습니다");
  assert.equal(app.elements["projects-retry"].hidden, true);
  assert.equal(app.elements["project-filters"].hidden, true);
  assert.equal(app.elements["project-count"].textContent, "0");
});

test("필터와 정렬을 반복해도 전체 목록을 잃지 않고 선택 상태를 알린다", async () => {
  const app = mount(async () => response([
    repository(1, { name: "newest", language: "HTML", updated_at: "2026-10-01", stargazers_count: 1 }),
    repository(2, { name: "most-stars", language: "CSS", updated_at: "2026-09-01", stargazers_count: 9 }),
    repository(3, { language: null }),
  ]));
  await settle();
  const { elements: e } = app;
  assert.ok(e["projects-grid"].innerHTML.indexOf("<h3>newest") < e["projects-grid"].innerHTML.indexOf("<h3>most-stars"));
  e["project-sort"].value = "stars";
  e["project-sort"].dispatch("change");
  assert.ok(e["projects-grid"].innerHTML.indexOf("<h3>most-stars") < e["projects-grid"].innerHTML.indexOf("<h3>newest"));
  const css = e["project-filters"].buttons.find((button) => button.dataset.language === "CSS");
  css.dispatch("click");
  assert.equal(e["project-count"].textContent, "1");
  assert.equal(css.getAttribute("aria-pressed"), "true");
  assert.match(e["projects-status"].textContent, /CSS/);
  e["project-filters"].buttons.find((button) => button.dataset.language === "기타").dispatch("click");
  assert.equal(e["project-count"].textContent, "1");
  e["project-filters"].buttons.find((button) => button.dataset.language === "").dispatch("click");
  assert.equal(e["project-count"].textContent, "3");
  assert.equal(css.getAttribute("aria-pressed"), "false");
});

test("API 문자열을 이스케이프하고 위험하거나 위장한 저장소 링크를 만들지 않는다", async () => {
  const app = mount(async () => response([
    repository(1, { name: '<img src=x onerror="alert(1)">', description: "<script>alert(1)</script>", language: 'X"><script>alert(1)</script>', html_url: "javascript:alert(1)" }),
    repository(2, { html_url: "https://github.com.evil.example/example/repo" }),
    repository(3, { html_url: "https://attacker@github.com/example/repo" }),
    repository(4),
  ]));
  await settle();
  const html = app.elements["projects-grid"].innerHTML;
  assert.match(html, /&lt;img/);
  assert.match(html, /&lt;script/);
  assert.doesNotMatch(html, /<img|<script|href="javascript:|href="https:\/\/github\.com\.evil|href="https:\/\/attacker@/);
  assert.equal((html.match(/<a /g) || []).length, 1);
  assert.match(html, /target="_blank" rel="noopener noreferrer"/);
  assert.doesNotMatch(app.elements["project-filters"].innerHTML, /<script/);
});

test("전체 요청 제한 시간이 지나면 실제 signal을 취소하고 오류와 재시도를 표시한다", async () => {
  let signal;
  const app = mount((url, options) => {
    signal = options.signal;
    return new Promise((resolve, reject) => {
      signal.addEventListener("abort", () => {
        const error = new Error("Request aborted");
        error.name = "AbortError";
        reject(error);
      });
    });
  });
  assert.equal([...app.timers.values()][0].delay, 15000);
  app.expireTimers();
  await settle();
  assert.equal(signal.aborted, true);
  assert.equal(stateOf(app), "error");
  assert.match(app.elements["projects-state-description"].textContent, /응답 시간/);
  assert.equal(app.elements["projects-retry"].disabled, false);
  assert.equal(app.timers.size, 0);
});

for (const [name, fetch] of [
  ["HTTP 404", async () => response({}, { status: 404 })],
  ["HTTP 429", async () => response({}, { status: 429 })],
  ["HTTP 500", async () => response({}, { status: 500 })],
  ["네트워크 연결 실패", async () => { throw new TypeError("Failed to fetch"); }],
  ["JSON 문법 오류", async () => ({ ...response([]), json: async () => { throw new SyntaxError("Invalid JSON"); } })],
  ["배열이 아닌 응답", async () => response({ message: "unexpected" })],
  ["잘못된 저장소 항목", async () => response([null])],
]) {
  test(`${name}를 처리하고 로딩 상태를 해제한다`, async () => {
    const app = mount(fetch);
    await settle();
    assert.equal(stateOf(app), "error");
    assert.equal(app.elements["projects-grid"].hidden, true);
    assert.equal(app.elements["projects-grid"].getAttribute("aria-busy"), "false");
    assert.equal(app.elements["projects-retry"].hidden, false);
    assert.equal(app.timers.size, 0);
  });
}

test("외부 origin의 다음 페이지를 요청하지 않는다", async () => {
  let requests = 0;
  const app = mount(async () => {
    requests += 1;
    return response([], { link: '<https://evil.example/collect>; rel="next"' });
  });
  await settle();
  assert.equal(stateOf(app), "error");
  assert.equal(requests, 1);
});

test("순환하는 다음 페이지를 끝없이 요청하지 않는다", async () => {
  let requests = 0;
  const app = mount(async () => {
    requests += 1;
    return response([], { link: pageTwo });
  });
  await settle();
  assert.equal(stateOf(app), "error");
  assert.equal(requests, 2);
});

test("계정 미설정 시 다른 사람의 계정으로 대체하지 않는다", async () => {
  let requests = 0;
  const app = mount(async () => { requests += 1; return response([]); }, "");
  await settle();
  assert.equal(stateOf(app), "error");
  assert.equal(requests, 0);
  assert.match(app.elements["projects-state-description"].textContent, /등록/);
});
