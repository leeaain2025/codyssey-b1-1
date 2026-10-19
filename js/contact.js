(() => {
  "use strict";

  const form = document.querySelector("#contact-form");

  if (!form) {
    return;
  }

  const fieldNames = ["name", "email", "message"];
  const fields = {
    name: document.querySelector("#contact-name"),
    email: document.querySelector("#contact-email"),
    message: document.querySelector("#contact-message"),
  };
  const errorElements = {
    name: document.querySelector("#name-error"),
    email: document.querySelector("#email-error"),
    message: document.querySelector("#message-error"),
  };
  const messageCount = document.querySelector("#message-count");
  const feedback = document.querySelector("#contact-feedback");
  const emailDraft = document.querySelector("#contact-email-draft");

  if (fieldNames.some((name) => !fields[name] || !errorElements[name]) || !feedback) {
    return;
  }

  // Keep the form's values and validation state separate from its presentation.
  const state = {
    values: {
      name: fields.name.value,
      email: fields.email.value,
      message: fields.message.value,
    },
    errors: { name: "", email: "", message: "" },
    touched: { name: false, email: false, message: false },
    submitted: false,
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name) => {
    const value = state.values[name].trim();

    if (!value) {
      const requiredMessages = {
        name: "이름을 입력해 주세요.",
        email: "이메일 주소를 입력해 주세요.",
        message: "메시지를 입력해 주세요.",
      };

      return requiredMessages[name];
    }

    if (name === "name" && state.values.name.length > 80) {
      return "이름은 80자 이내로 입력해 주세요.";
    }

    if (name === "email") {
      if (state.values.email.length > 254) {
        return "이메일 주소는 254자 이내로 입력해 주세요.";
      }

      if (!emailPattern.test(value) || fields.email.validity.typeMismatch) {
        return "올바른 이메일 주소를 입력해 주세요. 예: hello@example.com";
      }
    }

    if (name === "message") {
      if (state.values.message.length > 2000) {
        return "메시지는 2,000자 이내로 입력해 주세요.";
      }

      if (value.length < 10) {
        return "메시지는 앞뒤 공백을 제외하고 10자 이상 입력해 주세요.";
      }
    }

    return "";
  };

  const renderField = (name) => {
    const error = state.touched[name] ? state.errors[name] : "";

    errorElements[name].textContent = error;
    fields[name].setAttribute("aria-invalid", String(Boolean(error)));
    fields[name].classList.toggle("is-invalid", Boolean(error));

    if (name === "message" && messageCount) {
      messageCount.textContent = `${state.values.message.length.toLocaleString("ko-KR")} / 2,000자`;
    }
  };

  const renderFeedback = () => {
    const hasErrors = fieldNames.some((name) => Boolean(state.errors[name]));
    const isSuccess = state.submitted && !hasErrors;

    feedback.classList.toggle("is-success", isSuccess);
    feedback.classList.toggle("is-error", state.submitted && hasErrors);
    form.dataset.status = state.submitted ? (hasErrors ? "invalid" : "success") : "idle";

    if (emailDraft) {
      emailDraft.hidden = true;
      emailDraft.removeAttribute("href");
    }

    if (!state.submitted) {
      feedback.textContent = "";
      return;
    }

    if (hasErrors) {
      feedback.textContent = "입력 내용을 확인해 주세요. 각 항목 아래에서 수정할 내용을 확인할 수 있습니다.";
      return;
    }

    const configuredEmail = window.PORTFOLIO_CONFIG?.contactEmail;
    const recipient = typeof configuredEmail === "string" ? configuredEmail.trim() : "";

    if (emailDraft && recipient.length <= 254 && emailPattern.test(recipient)) {
      const { name, email, message } = state.values;
      const subject = `포트폴리오 문의 · ${name.trim()}`;
      const body = `이름: ${name.trim()}\n이메일: ${email.trim()}\n\n${message.trim()}`;

      emailDraft.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      emailDraft.hidden = false;
      feedback.textContent = "입력 확인이 완료되었습니다. 아래 링크를 눌러 메일 앱에서 전송을 마무리해 주세요.";
      return;
    }

    feedback.textContent = "입력 확인이 완료되었습니다. 아직 메시지는 전송되지 않았습니다.";
  };

  fieldNames.forEach((name) => {
    fields[name].addEventListener("input", () => {
      state.values[name] = fields[name].value;
      state.submitted = false;

      if (state.touched[name]) {
        state.errors[name] = validateField(name);
      }

      renderField(name);
      renderFeedback();
    });

    fields[name].addEventListener("blur", () => {
      state.values[name] = fields[name].value;
      state.touched[name] = true;
      state.errors[name] = validateField(name);
      renderField(name);
    });

    renderField(name);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    fieldNames.forEach((name) => {
      state.values[name] = fields[name].value;
      state.touched[name] = true;
      state.errors[name] = validateField(name);
      renderField(name);
    });

    state.submitted = true;
    renderFeedback();

    const firstInvalidName = fieldNames.find((name) => Boolean(state.errors[name]));

    if (firstInvalidName) {
      fields[firstInvalidName].focus();
    }
  });

  renderFeedback();
})();
