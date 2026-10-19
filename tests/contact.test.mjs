// 실행: node --test tests/*.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { mountScript } from "./browser-stub.mjs";

const ids = [
  "contact-form", "contact-name", "contact-email", "contact-message", "name-error",
  "email-error", "message-error", "message-count", "contact-feedback", "contact-email-draft",
];
const mount = (contactEmail = "") => mountScript("contact.js", ids, { config: { contactEmail } });
const fill = (app, values = {}) => {
  const defaults = { name: "테스터", email: "visitor@example.com", message: "프로젝트에 대한 자세한 문의입니다." };
  Object.entries({ ...defaults, ...values }).forEach(([name, value]) => {
    app.elements[`contact-${name}`].value = value;
  });
};
const submit = (app) => app.elements["contact-form"].dispatch("submit");

test("처음부터 오류를 표시하지 않고 빈 제출 시 각 오류와 첫 입력 포커스를 제공한다", () => {
  const app = mount();
  const { elements: e } = app;
  assert.equal(e["contact-form"].dataset.status, "idle");
  ["name", "email", "message"].forEach((name) => assert.equal(e[`${name}-error`].textContent, ""));
  const event = submit(app);
  assert.equal(event.defaultPrevented, true);
  assert.equal(e["contact-form"].dataset.status, "invalid");
  ["name", "email", "message"].forEach((name) => {
    assert.notEqual(e[`${name}-error`].textContent, "");
    assert.equal(e[`contact-${name}`].getAttribute("aria-invalid"), "true");
  });
  assert.equal(app.document.activeElement, e["contact-name"]);
});

test("공백만 있는 이름과 메시지는 필수 입력으로 인정하지 않는다", () => {
  const app = mount();
  fill(app, { name: "   ", message: "          " });
  submit(app);
  assert.equal(app.elements["contact-form"].dataset.status, "invalid");
  assert.match(app.elements["name-error"].textContent, /입력/);
  assert.match(app.elements["message-error"].textContent, /입력/);
});

for (const email of ["plain-text", "name@", "name@example", "name with space@example.com"]) {
  test(`잘못된 이메일 ${email} 제출 시 이메일에 포커스를 이동한다`, () => {
    const app = mount();
    fill(app, { email });
    submit(app);
    assert.equal(app.elements["contact-form"].dataset.status, "invalid");
    assert.equal(app.document.activeElement, app.elements["contact-email"]);
    assert.match(app.elements["email-error"].textContent, /올바른 이메일/);
  });
}

test("브라우저 이메일 형식 검사 결과도 적용한다", () => {
  const app = mount();
  fill(app);
  app.elements["contact-email"].validity.typeMismatch = true;
  submit(app);
  assert.equal(app.elements["contact-form"].dataset.status, "invalid");
  assert.match(app.elements["email-error"].textContent, /올바른 이메일/);
});

test("메시지 최소 길이는 앞뒤 공백을 제외한 10자이며 9자는 실패한다", () => {
  const app = mount();
  fill(app, { message: " 123456789 " });
  submit(app);
  assert.equal(app.elements["contact-form"].dataset.status, "invalid");
  assert.match(app.elements["message-error"].textContent, /10자/);
  app.elements["contact-message"].value = " 1234567890 ";
  app.elements["contact-message"].dispatch("input");
  assert.equal(app.elements["message-error"].textContent, "");
  assert.equal(app.elements["message-count"].textContent, "12 / 2,000자");
  submit(app);
  assert.equal(app.elements["contact-form"].dataset.status, "success");
});

test("이름과 메시지 최대 길이 경계를 검증한다", () => {
  const app = mount();
  fill(app, { name: "가".repeat(80), message: "가".repeat(2000) });
  submit(app);
  assert.equal(app.elements["contact-form"].dataset.status, "success");
  app.elements["contact-name"].value += "가";
  app.elements["contact-message"].value += "가";
  submit(app);
  assert.match(app.elements["name-error"].textContent, /80자/);
  assert.match(app.elements["message-error"].textContent, /2,000자/);
  assert.equal(app.elements["contact-form"].dataset.status, "invalid");
});

test("이메일 최대 254자 경계를 검증한다", () => {
  const app = mount();
  const email = `${"a".repeat(242)}@example.com`;
  assert.equal(email.length, 254);
  fill(app, { email });
  submit(app);
  assert.equal(app.elements["contact-form"].dataset.status, "success");
  app.elements["contact-email"].value = `a${email}`;
  submit(app);
  assert.match(app.elements["email-error"].textContent, /254자/);
  assert.equal(app.elements["contact-form"].dataset.status, "invalid");
});

test("blur로 확인한 오류는 다시 입력하는 동안 제거하고 ARIA도 갱신한다", () => {
  const app = mount();
  const email = app.elements["contact-email"];
  email.value = "wrong";
  email.dispatch("blur");
  assert.equal(email.getAttribute("aria-invalid"), "true");
  email.value = "new@example.com";
  email.dispatch("input");
  assert.equal(email.getAttribute("aria-invalid"), "false");
  assert.equal(app.elements["email-error"].textContent, "");
});

test("서버 전송 없이 검증 완료를 표시하고 작성한 내용을 보존한다", () => {
  const app = mount();
  fill(app);
  const originalMessage = app.elements["contact-message"].value;
  submit(app);
  assert.equal(app.elements["contact-form"].dataset.status, "success");
  assert.match(app.elements["contact-feedback"].textContent, /아직 메시지는 전송되지 않았습니다/);
  assert.equal(app.elements["contact-message"].value, originalMessage);
  assert.equal(app.elements["contact-email-draft"].hidden, true);
});

test("메일 초안은 값을 인코딩하며 성공 후 수정하면 이전 초안을 제거한다", () => {
  const app = mount("owner@example.com");
  fill(app, { name: "이름 & 이름", message: "질문입니다 &bcc=attacker@example.com\n두 번째 줄입니다." });
  submit(app);
  const { elements: e } = app;
  const link = e["contact-email-draft"];
  assert.equal(link.hidden, false);
  assert.match(link.href, /^mailto:owner%40example\.com\?/);
  const query = new URLSearchParams(link.href.split("?")[1]);
  assert.equal(query.get("subject"), "포트폴리오 문의 · 이름 & 이름");
  assert.match(query.get("body"), /&bcc=attacker@example\.com\n두 번째 줄/);
  assert.equal(query.has("bcc"), false);
  e["contact-message"].value = "새로 수정한 메시지입니다.";
  e["contact-message"].dispatch("input");
  assert.equal(e["contact-form"].dataset.status, "idle");
  assert.equal(e["contact-feedback"].textContent, "");
  assert.equal(link.hidden, true);
  assert.equal(link.getAttribute("href"), null);
});

test("유효하지 않은 수신 이메일 설정으로 메일 링크를 만들지 않는다", () => {
  const app = mount("owner@example.com\nBcc:attacker@example.com");
  fill(app);
  submit(app);
  assert.equal(app.elements["contact-form"].dataset.status, "success");
  assert.equal(app.elements["contact-email-draft"].hidden, true);
  assert.equal(app.elements["contact-email-draft"].getAttribute("href"), null);
});
