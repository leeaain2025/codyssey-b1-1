(() => {
  "use strict";

  const grid = document.querySelector("#projects-grid");
  const status = document.querySelector("#projects-status");
  const statePanel = document.querySelector("#projects-state");
  const stateTitle = document.querySelector("#projects-state-title");
  const stateDescription = document.querySelector("#projects-state-description");
  const retryButton = document.querySelector("#projects-retry");
  const filters = document.querySelector("#project-filters");
  const sortSelect = document.querySelector("#project-sort");
  const count = document.querySelector("#project-count");

  if (
    !grid || !status || !statePanel || !stateTitle || !stateDescription ||
    !retryButton || !filters || !sortSelect || !count
  ) {
    return;
  }

  // 원본 목록은 보존하고, 선택 상태로부터 매번 표시할 목록을 계산한다.
  const state = {
    repositories: [],
    language: "",
    sort: sortSelect.value === "stars" ? "stars" : "updated",
    isLoading: false,
  };

  const numberFormatter = new Intl.NumberFormat("ko-KR");
  const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // API에서 받은 문자열도 신뢰하지 않고 HTML 특수문자를 이스케이프한다.
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[character]));

  const getSafeRepositoryUrl = (value) => {
    try {
      const url = new URL(value);
      if (
        url.protocol !== "https:" || url.hostname !== "github.com" ||
        url.port || url.username || url.password
      ) {
        return "";
      }
      return url.href;
    } catch {
      return "";
    }
  };

  const getLanguage = ({ language }) => (
    typeof language === "string" && language.trim() ? language.trim() : "기타"
  );

  const getNumber = (value) => (
    typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : 0
  );

  const getUpdatedTime = ({ updated_at: updatedAt }) => {
    const timestamp = Date.parse(updatedAt);
    return Number.isFinite(timestamp) ? timestamp : 0;
  };

  const selectRepositories = (repositories, username) => {
    const descriptions = window.PORTFOLIO_CONFIG?.projectDescriptions;
    if (!descriptions) return repositories;

    // 실제 API 목록 중 검토한 프로젝트만 고른다. API의 이름·언어·별·날짜는 유지한다.
    return repositories.map((repository) => {
      const key = typeof repository.full_name === "string"
        ? repository.full_name
        : `${username}/${repository.name}`;
      const description = Object.hasOwn(descriptions, key) ? descriptions[key] : null;
      if (typeof description !== "string" || !description.trim()) return null;
      return { ...repository, description: description.trim() };
    }).filter((repository) => repository !== null);
  };

  const renderPanel = (kind, title, description, canRetry = false) => {
    statePanel.dataset.state = kind;
    statePanel.hidden = false;
    stateTitle.textContent = title;
    stateDescription.textContent = description;
    retryButton.hidden = !canRetry;
    retryButton.disabled = state.isLoading;
    grid.hidden = true;
    grid.replaceChildren();
    count.textContent = "0";
    status.textContent = `${title}. ${description}`;
  };

  const renderCard = (repository) => {
    const {
      name,
      description,
      html_url: repositoryUrl,
      stargazers_count: stars,
      forks_count: forks,
      fork,
    } = repository;
    const safeUrl = getSafeRepositoryUrl(repositoryUrl);
    const safeName = escapeHtml(typeof name === "string" ? name : "이름 없는 프로젝트");
    const safeDescription = escapeHtml(
      typeof description === "string" && description.trim()
        ? description
        : "아직 프로젝트 소개가 등록되지 않았습니다.",
    );
    const timestamp = getUpdatedTime(repository);
    const updatedLabel = timestamp ? dateFormatter.format(timestamp) : "날짜 정보 없음";
    const repositoryLink = safeUrl
      ? `<a class="project-card__link" href="${escapeHtml(safeUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${safeName} GitHub 저장소 보기 (새 탭)">저장소 보기 <span aria-hidden="true">↗</span></a>`
      : '<span class="project-card__link">저장소 주소 없음</span>';

    return `
      <article class="project-card">
        <div class="project-card__top">
          <span class="language-label">${escapeHtml(getLanguage(repository))}</span>
          ${fork ? '<span class="project-card__fork">Fork</span>' : ""}
        </div>
        <h3>${safeName}</h3>
        <p class="project-card__description">${safeDescription}</p>
        <div class="project-card__meta">
          <span aria-label="별 ${getNumber(stars)}개"><span aria-hidden="true">☆</span> ${numberFormatter.format(getNumber(stars))}</span>
          <span aria-label="포크 ${getNumber(forks)}개"><span aria-hidden="true">⑂</span> ${numberFormatter.format(getNumber(forks))}</span>
        </div>
        <div class="project-card__footer">
          <span class="project-card__updated">업데이트 ${escapeHtml(updatedLabel)}</span>
          ${repositoryLink}
        </div>
      </article>
    `;
  };

  const renderRepositories = () => {
    if (state.isLoading) return;

    // filter는 새 배열을 반환하므로 sort가 API 원본 배열을 바꾸지 않는다.
    const visibleRepositories = state.repositories
      .filter((repository) => !state.language || getLanguage(repository) === state.language)
      .sort((first, second) => {
        if (state.sort === "stars") {
          const difference = getNumber(second.stargazers_count) - getNumber(first.stargazers_count);
          if (difference !== 0) return difference;
        }
        return getUpdatedTime(second) - getUpdatedTime(first);
      });

    filters.querySelectorAll("button[data-language]").forEach((button) => {
      const isSelected = button.dataset.language === state.language;
      button.setAttribute("aria-pressed", String(isSelected));
      button.classList.toggle("is-active", isSelected);
    });

    if (visibleRepositories.length === 0) {
      const hasRepositories = state.repositories.length > 0;
      renderPanel(
        "empty",
        "표시할 프로젝트가 없습니다",
        hasRepositories
          ? "선택한 언어의 프로젝트가 없습니다. 다른 언어를 선택해 주세요."
          : "아직 소개할 프로젝트가 없습니다. 새로운 작업으로 곧 찾아올게요.",
      );
      filters.hidden = !hasRepositories;
      sortSelect.disabled = !hasRepositories;
      return;
    }

    statePanel.dataset.state = "success";
    statePanel.hidden = true;
    retryButton.hidden = true;
    filters.hidden = false;
    sortSelect.disabled = false;
    grid.innerHTML = visibleRepositories.map(renderCard).join("");
    grid.hidden = false;
    count.textContent = String(visibleRepositories.length);
    const languageLabel = state.language ? `${state.language} ` : "";
    const sortLabel = state.sort === "stars" ? "별이 많은 순" : "최근 업데이트 순";
    status.textContent = `${languageLabel}프로젝트 ${visibleRepositories.length}개를 ${sortLabel}으로 표시합니다.`;
  };

  const renderLanguageFilters = () => {
    const languages = [...new Set(state.repositories.map(getLanguage))]
      .sort((first, second) => first.localeCompare(second, "ko"));
    const options = [
      { value: "", label: "전체" },
      ...languages.map((language) => ({ value: language, label: language })),
    ];

    filters.innerHTML = options.map(({ value, label }) => `
      <button class="filter-chip" type="button" data-language="${escapeHtml(value)}" aria-pressed="${value === state.language}">${escapeHtml(label)}</button>
    `).join("");

    filters.querySelectorAll("button[data-language]").forEach((button) => {
      button.addEventListener("click", () => {
        state.language = button.dataset.language;
        renderRepositories();
      });
    });
  };

  const getNextPage = (linkHeader, expectedPath) => {
    if (!linkHeader) return null;
    const links = [...linkHeader.matchAll(/<([^>]+)>\s*;\s*rel="([^"]+)"/g)];
    const nextLink = links.find(([, , relation]) => relation.split(/\s+/).includes("next"));
    if (!nextLink) return null;

    const nextUrl = new URL(nextLink[1]);
    if (
      nextUrl.origin !== "https://api.github.com" ||
      nextUrl.pathname !== expectedPath || nextUrl.username || nextUrl.password
    ) {
      throw new Error("목록의 다음 페이지 주소를 확인할 수 없습니다. 다시 시도해 주세요.");
    }
    return nextUrl.href;
  };

  const fetchAllRepositories = async (username, signal) => {
    const expectedPath = `/users/${encodeURIComponent(username)}/repos`;
    let nextUrl = `https://api.github.com${expectedPath}?per_page=100&sort=updated&direction=desc&type=owner`;
    const visitedPages = new Set();
    const repositoriesById = new Map();

    while (nextUrl) {
      if (visitedPages.has(nextUrl)) {
        throw new Error("프로젝트 목록을 끝까지 불러오지 못했습니다. 다시 시도해 주세요.");
      }
      visitedPages.add(nextUrl);

      const response = await fetch(nextUrl, {
        signal,
        headers: { Accept: "application/vnd.github+json" },
      });

      // fetch는 404, 403 같은 HTTP 오류만으로 reject되지 않는다.
      if (!response.ok) {
        if (response.status === 403 || response.status === 429) {
          throw new Error("GitHub 요청이 일시적으로 제한되었습니다. 잠시 후 다시 시도해 주세요.");
        }
        if (response.status === 404) {
          throw new Error("연결된 GitHub 계정을 찾을 수 없습니다. 계정 정보를 확인해 주세요.");
        }
        throw new Error("GitHub에서 응답을 받지 못했습니다. 잠시 후 다시 시도해 주세요.");
      }

      const repositories = await response.json();
      if (
        !Array.isArray(repositories) ||
        repositories.some((repository) => (
          !repository || typeof repository !== "object" || !Number.isInteger(repository.id)
        ))
      ) {
        throw new Error("프로젝트 목록의 형식을 확인할 수 없습니다. 다시 시도해 주세요.");
      }

      repositories.forEach((repository) => {
        repositoriesById.set(repository.id, repository);
      });
      nextUrl = getNextPage(response.headers.get("Link"), expectedPath);
    }

    return [...repositoriesById.values()];
  };

  const loadRepositories = async () => {
    if (state.isLoading) return;
    state.isLoading = true;
    filters.hidden = true;
    sortSelect.disabled = true;
    grid.setAttribute("aria-busy", "true");
    renderPanel("loading", "프로젝트를 불러오는 중…", "GitHub에서 최신 프로젝트를 가져오고 있어요.");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const configuredUsername = window.PORTFOLIO_CONFIG?.githubUsername;
      const username = typeof configuredUsername === "string" ? configuredUsername.trim() : "";
      if (!username) {
        throw new Error("프로젝트를 연결할 GitHub 계정이 아직 등록되지 않았습니다.");
      }
      if (!/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(username)) {
        throw new Error("연결된 GitHub 계정 이름을 확인해 주세요.");
      }

      const repositories = await fetchAllRepositories(username, controller.signal);
      state.repositories = selectRepositories(repositories, username);
      state.language = "";
      state.isLoading = false;
      renderLanguageFilters();
      renderRepositories();
    } catch (error) {
      state.isLoading = false;
      const description = error.name === "AbortError"
        ? "응답 시간이 길어지고 있습니다. 잠시 후 다시 시도해 주세요."
        : error instanceof TypeError
          ? "인터넷 연결을 확인하고 다시 시도해 주세요."
          : error instanceof SyntaxError
            ? "GitHub 응답을 읽지 못했습니다. 다시 시도해 주세요."
            : error.message || "잠시 후 다시 시도해 주세요.";
      renderPanel("error", "프로젝트를 불러올 수 없습니다", description, true);
    } finally {
      window.clearTimeout(timeout);
      state.isLoading = false;
      retryButton.disabled = false;
      grid.setAttribute("aria-busy", "false");
    }
  };

  retryButton.addEventListener("click", loadRepositories);
  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value === "stars" ? "stars" : "updated";
    renderRepositories();
  });

  loadRepositories();
})();
