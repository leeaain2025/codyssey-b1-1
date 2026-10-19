(() => {
  "use strict";

  const config = window.PORTFOLIO_CONFIG;
  const root = document.documentElement;
  const header = document.querySelector("#site-header");
  const themeButton = document.querySelector("#theme-toggle");
  const themeStatus = document.querySelector("#theme-status");
  const menuButton = document.querySelector("#menu-toggle");
  const menu = document.querySelector("#nav-links");
  const topButton = document.querySelector("#back-to-top");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const desktopMenu = window.matchMedia("(min-width: 768px)");

  const state = {
    theme: systemTheme.matches ? "dark" : "light",
    explicitTheme: false,
    menuOpen: false,
    scrolled: false,
    showBackToTop: false,
  };

  // 초기 설정 복원 → 상태 → DOM. 저장소 접근이 차단되어도 UI는 동작합니다.
  try {
    const savedTheme = localStorage.getItem(config.themeStorageKey);
    if (savedTheme === "dark" || savedTheme === "light") {
      state.theme = savedTheme;
      state.explicitTheme = true;
    }
  } catch (error) {
    console.warn("테마 설정을 읽을 수 없습니다.", error);
  }

  const renderTheme = () => {
    root.dataset.theme = state.theme;
    const nextLabel = state.theme === "dark" ? "라이트 모드로 변경" : "다크 모드로 변경";
    themeButton.setAttribute("aria-label", nextLabel);
    themeButton.title = nextLabel;
    document.querySelector('meta[name="theme-color"]').content =
      state.theme === "dark" ? "#151a20" : "#f1f2f2";
  };

  themeButton.addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    state.explicitTheme = true;
    renderTheme();
    themeStatus.textContent = state.theme === "dark" ? "다크 모드로 변경했습니다." : "라이트 모드로 변경했습니다.";
    try {
      localStorage.setItem(config.themeStorageKey, state.theme);
    } catch (error) {
      themeStatus.textContent += " 현재 브라우저에서 설정을 저장할 수 없습니다.";
      console.warn("테마 설정을 저장할 수 없습니다.", error);
    }
  });

  systemTheme.addEventListener("change", (event) => {
    if (state.explicitTheme) return;
    state.theme = event.matches ? "dark" : "light";
    renderTheme();
  });
  renderTheme();

  const renderMenu = () => {
    menu.classList.toggle("active", state.menuOpen);
    menuButton.classList.toggle("active", state.menuOpen);
    menuButton.setAttribute("aria-expanded", String(state.menuOpen));
    menuButton.setAttribute("aria-label", state.menuOpen ? "메뉴 닫기" : "메뉴 열기");
  };

  const closeMenu = (restoreFocus = false) => {
    state.menuOpen = false;
    renderMenu();
    if (restoreFocus) menuButton.focus();
  };

  menuButton.addEventListener("click", () => {
    state.menuOpen = !state.menuOpen;
    renderMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.menuOpen) closeMenu(true);
  });
  document.addEventListener("click", (event) => {
    if (state.menuOpen && !header.contains(event.target)) closeMenu();
  });
  desktopMenu.addEventListener("change", () => closeMenu());
  renderMenu();

  const scrollToElement = (target) => {
    target.scrollIntoView({ behavior: reducedMotion.matches ? "instant" : "smooth", block: "start" });
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.getElementById(link.getAttribute("href").slice(1));
      if (!target) return;
      event.preventDefault();
      closeMenu();
      scrollToElement(target);
      history.replaceState(null, "", link.getAttribute("href"));
      // 이동 후 키보드 탐색도 해당 영역에서 이어집니다.
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "instant" : "smooth" });
    document.querySelector(".brand").focus({ preventScroll: true });
  });

  const navLinks = [...document.querySelectorAll(".nav-link")];
  const sections = navLinks.map((link) => document.getElementById(link.hash.slice(1)));
  const renderScroll = () => {
    state.scrolled = window.scrollY >= config.navigationScrollThreshold;
    state.showBackToTop = window.scrollY >= config.backToTopThreshold;
    if (state.scrolled) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
    topButton.hidden = !state.showBackToTop;

    let activeId = "hero";
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= 150) activeId = section.id;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) activeId = "footer";
    navLinks.forEach((link) => {
      if (link.hash === `#${activeId}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  let scrollScheduled = false;
  window.addEventListener("scroll", () => {
    if (scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(() => {
      renderScroll();
      scrollScheduled = false;
    });
  }, { passive: true });
  window.addEventListener("resize", renderScroll);
  renderScroll();

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio < config.revealThreshold) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: config.revealThreshold });
    revealElements.forEach((element) => {
      element.classList.add("will-reveal");
      revealObserver.observe(element);
    });
    reducedMotion.addEventListener("change", (event) => {
      if (!event.matches) return;
      revealElements.forEach((element) => element.classList.add("is-visible"));
      revealObserver.disconnect();
    });
  }

  document.querySelectorAll("[data-profile-name]").forEach((element) => {
    element.textContent = config.displayName;
  });
  document.querySelectorAll("[data-github-name]").forEach((element) => {
    element.textContent = config.githubUsername;
  });
  document.querySelectorAll("[data-github-link]").forEach((element) => {
    element.href = `https://github.com/${encodeURIComponent(config.githubUsername)}`;
  });
  document.querySelector("#copyright-year").textContent = String(new Date().getFullYear());
  const avatar = document.querySelector("#profile-image");
  avatar.addEventListener("error", () => {
    avatar.src = "images/profile.svg";
    avatar.alt = `${config.displayName}의 이니셜 프로필 이미지`;
  }, { once: true });
})();
