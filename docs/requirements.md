# 미션 요구사항 대응표

이 문서는 원본 「미션 - AI 도구 학습」 PDF 6쪽의 필수 기능, 규칙, 제출물, 선택 기능을 현재 구현과 연결합니다. **구현 위치는 소스 확인 근거이고, 검증 방법은 실행할 절차입니다.** 표에 적혀 있다는 이유만으로 브라우저 테스트나 배포가 완료되었다고 간주하지 않습니다.

실행 안내와 설계 이유는 [README](../README.md), 실제 수행 결과는 [검증 기록](verification.md), 개념 학습은 [학습 교재](../study-guide/README.md)를 참고하세요.

## 1. 프로젝트 구조와 HTML — PDF 2쪽

| ID | 요구사항 | 구현 위치·설계 | 검증 방법 |
| --- | --- | --- | --- |
| BASE-01 | `index.html`, `css/`, `js/`, `images/` 분리 | 루트 문서, `style.css`, 기능별 JS, SVG 이미지 | 파일 트리 확인 |
| BASE-02 | 외부 CSS·JS 연결 | `index.html`의 `link`, `script src` | Network에서 정적 파일의 정상 응답 확인 |
| BASE-03 | VS Code + Live Server | README 실행 안내, `.vscode` 설정·추천 확장, 로컬 Live Server 확장 설치 확인 | VS Code에서 Open with Live Server로 실행 |
| HTML-01 | 시맨틱 태그 사용 | `header`, `nav`, `main`, `section`, `footer`; API 카드의 `article` | 초기 HTML 및 API 완료 후 DOM 확인 |
| HTML-02 | Hero 인사말·CTA | `#hero`의 소개와 Projects·Contact 링크 | 두 CTA의 대상 이동 확인 |
| HTML-03 | About 자기소개·프로필 | `#about`, `#profile-image` | 이미지 표시와 오류 시 로컬 대체 확인 |
| HTML-04 | Skills 목록 | `#skills .skills-list` | HTML·CSS·JS·Git 목록 확인 |
| HTML-05 | API 기반 Projects 카드 | `#projects-grid`, `projects.js`의 `renderCard` | 실제 응답과 카드 내용 비교 |
| HTML-06 | Contact 폼 | `#contact-form` | 이름·이메일·메시지 입력 확인 |
| HTML-07 | Footer 저작권·소셜 | `#footer`, GitHub 링크, 현재 연도 | 링크 대상과 연도 확인 |
| HTML-08 | 각 섹션 앵커 메뉴 | `#nav-links`의 Hero·About·Skills·Projects·Contact·Footer | 모든 `href="#..."`가 실제 고유 ID를 가리키는지 확인 |
| HTML-09 | 의미 있는 이미지 alt | 학습 플래너 설명과 GitHub 프로필 설명 | 모든 `img`의 alt와 내용 비교 |
| HTML-10 | label 연결 | `for="contact-name/email/message"`, 해당 ID | label 클릭 시 입력 포커스 확인 |

## 2. CSS·반응형 — PDF 2~3쪽

| ID | 요구사항 | 구현 위치·설계 | 검증 방법 |
| --- | --- | --- | --- |
| CSS-01 | 외부 CSS | `css/style.css` | HTML link와 실제 적용 확인 |
| CSS-02 | `:root` 색상·폰트·간격 변수 | `--color-*`, `--font-*`, `--space-*` | 정의와 `var()` 사용 확인 |
| CSS-03 | 다크 테마 변수 | `[data-theme="dark"]` | 밝은·어두운 테마 계산 스타일 비교 |
| CSS-04 | 네비게이션 Flexbox | `.navigation`, `.nav-links`, `.nav-actions` | 넓은 화면에서 로고 왼쪽·메뉴 오른쪽 확인 |
| CSS-05 | 프로젝트 반응형 Grid | `.projects-grid`: `repeat(auto-fit, minmax(min(100%, 18rem), 1fr))` | 열 수 변경·작은 화면 가로 넘침 확인 |
| CSS-06 | 모바일 퍼스트 | 기본 한 열 배치, `min-width`로 확장 | 작은 화면 기본 스타일 확인 |
| CSS-07 | 768px·1024px 분기 | 두 `@media (min-width: ...)` | 767/768px, 1023/1024px 비교 |
| CSS-08 | 모바일 메뉴 숨김·햄버거 | `.nav-links`, `.nav-links.active`, `.menu-toggle` | 767px 이하 초기 상태와 768px 이상 비교 |
| CSS-09 | 버튼·카드 hover와 transition | `.button`, `.icon-button`, `.project-card` | 포인터 hover와 움직임 확인 |
| CSS-10 | 카드 그림자 | `.project-card`의 `box-shadow` | 기본·hover 그림자 확인 |

## 3. JavaScript 문법·DOM·이벤트 — PDF 3~4쪽

| ID | 요구사항 | 구현 근거 | 검증 방법 |
| --- | --- | --- | --- |
| JS-01 | 외부 JS와 `defer` | 모든 스크립트에 `src`와 `defer` | `index.html` 확인 |
| JS-02 | `const`, `let` 사용 | 모든 JavaScript 파일 | `var` 선언 부재 확인 |
| JS-03 | `addEventListener` | 메뉴·테마·폼·프로젝트의 이벤트 등록 | 인라인 이벤트 속성 부재 확인 |
| JS-04 | `querySelector`, `querySelectorAll` | 버튼·폼 선택, 앵커·필터·반복 요소 선택 | 호출과 선택된 DOM 확인 |
| JS-05 | `textContent`, `innerHTML` | 상태·오류는 텍스트, 카드·필터는 이스케이프한 템플릿 | 외부 문자열이 HTML로 실행되지 않는지 확인 |
| JS-06 | `classList.add/remove/toggle` | 헤더 배경 add/remove, 메뉴·필터 toggle | 스크롤·클릭 전후 class 확인 |
| JS-07 | click·submit·scroll·input | 세 기능 파일에 각 이벤트 등록 | 해당 사용자 조작 확인 |
| JS-08 | `preventDefault()` | 폼 submit과 내부 앵커 click | 폼 제출 후 문서 새로고침이 없는지 확인 |
| ES6-01 | 화살표 함수 | 검증·렌더 함수, 배열·이벤트 콜백 | 실제 호출 구조 확인 |
| ES6-02 | 템플릿 리터럴 HTML 생성 | `renderCard`, `renderLanguageFilters` | 템플릿과 카드 DOM 비교 |
| ES6-03 | 구조분해 할당 | `renderCard(repository)`의 이름·설명·주소 등 | 해당 변수가 카드에 쓰이는지 확인 |
| ES6-04 | `map`으로 API 카드 변환 | `visibleRepositories.map(renderCard).join("")` | 데이터 개수와 표시 카드 비교 |
| ES6-05 | `forEach` 순회 | 앵커, 필터 버튼, 폼 필드, Observer 요소 | 반복 항목의 이벤트 연결 확인 |

## 4. 화면 동작과 기준값 — PDF 3쪽

| ID | 요구사항 | 구현 위치·기준 | 검증 방법 |
| --- | --- | --- | --- |
| UI-01 | 햄버거 열기·닫기 | `state.menuOpen → renderMenu()` | 모바일에서 연속 클릭 |
| UI-02 | `classList.toggle('active')` | 메뉴·버튼의 active 클래스 | DOM class와 `aria-expanded` 일치 확인 |
| UI-03 | 앵커 부드러운 이동 | `scrollToElement`, `scrollIntoView` | 메뉴·CTA·바로가기 이동 확인 |
| UI-04 | 300px 이상 맨 위 버튼 | `backToTopThreshold: 300`, `>=` | 299px 숨김 / 300px 표시 |
| UI-05 | 맨 위로 이동 | 버튼 click의 `window.scrollTo({ top: 0 })` | 스크롤 후 클릭하여 최상단 도달 확인 |
| UI-06 | 60px 이상 헤더 배경 변경 | `navigationScrollThreshold: 60`, `>=` | 59px 기본 / 60px 변경 |
| UI-07 | 밝은·어두운 테마 토글 | `state.theme → renderTheme()` | 반복 클릭·아이콘·접근성 이름 확인 |
| UI-08 | 테마 저장·복원 | `localStorage`, 저장 키 `leeaain2025-portfolio-theme` | 토글 후 새로고침, 잘못된 저장값·저장 차단 확인 |
| UI-09 | Intersection Observer 효과 | `revealThreshold: 0.2`, `.is-visible`, `unobserve` | 스크롤 진입·한 번만 실행·모션 줄이기 확인 |

세 기준값은 원문의 권장값을 사용하고 [README 기준값 표](../README.md#기준값과-설정)에도 기록했습니다. 스크롤 핸들러는 `requestAnimationFrame`과 수동 스크롤을 막지 않는 passive 옵션을 사용합니다. 모션 줄이기 환경에서는 이동과 등장 효과를 줄입니다.

## 5. 문의 폼 — PDF 3쪽

| ID | 요구사항 | 구현 위치·규칙 | 검증 방법 |
| --- | --- | --- | --- |
| FORM-01 | 이름·이메일·메시지 | `index.html`의 세 필드 | 필드·label·required 확인 |
| FORM-02 | 필수값 검증 | `validateField`의 `trim()` 빈 값 검사 | 빈 문자열 및 공백만 입력 후 제출 |
| FORM-03 | 이메일 형식 | 이메일 패턴과 `validity.typeMismatch` | `abc`, `a@b` 거부 / `student@example.com` 허용 |
| FORM-04 | 필드 근처 오류 | `name-error`, `email-error`, `message-error` | 오류 문구·`aria-invalid`·수정 반영 확인 |
| FORM-05 | 기본 제출 방지·성공 메시지 | submit의 `preventDefault`, `renderFeedback` | 유효한 입력 시 새로고침 없이 검증 완료 안내 |

추가 검사로 이름 80자, 이메일 254자, 메시지 10~2,000자 제한을 적용했습니다. `input`에서는 이미 확인한 필드만 재검증하고, `blur`에서는 해당 필드를 확인한 상태로 바꿉니다. 전체 제출 실패 시 첫 오류 항목으로 포커스를 이동합니다.

**실제 전송 여부:** 자동 이메일 전송 서버는 없습니다. 성공은 입력 검증 완료를 뜻하며 화면에도 전송되지 않았음을 안내합니다. `contactEmail`을 설정하면 사용자가 메일 앱에서 전송을 마무리할 수 있는 초안 링크만 제공합니다.

## 6. GitHub API — PDF 4~5쪽

| ID | 요구사항 | 구현 근거 | 검증 방법 |
| --- | --- | --- | --- |
| API-01 | `fetch`, `async/await` | `fetchAllRepositories`, `loadRepositories` | Network 요청과 응답 확인 |
| API-02 | 본인 계정 저장소 엔드포인트 | `/users/leeaain2025/repos` | 계정 설정·요청 주소·카드 링크 비교 |
| API-03 | 요청 중 로딩 | `renderPanel("loading", ...)`, CSS 스피너 | Network 지연 중 상태 확인 |
| API-04 | 성공 카드 | `renderRepositories`, `renderCard` | 실제 응답과 카드 일치 확인 |
| API-05 | 실패 안내·재시도 | `renderPanel("error", ..., true)` | Offline 후 Online으로 복구하여 재시도 |
| API-06 | 빈 응답 안내 | 표시 목록 길이 0이면 empty 패널 | 응답을 `[]`로 모의하여 확인 |
| API-07 | `try/catch` | 요청·JSON·검증 오류를 catch에서 처리 | 네트워크 오류·잘못된 JSON 모의 |
| API-08 | 403 요청 제한 처리 | 403·429 상태에 제한 안내 | 403/429 응답 모의 후 버튼 확인 |

추가 동작: 페이지당 100개 요청과 `Link` 다음 페이지 처리, 저장소 ID 중복 제거, 15초 시간 초과, 404 안내, 잘못된 응답 형태 검사, 요청 중 중복 재시도 방지. API 텍스트는 HTML 이스케이프하고 저장소 URL은 GitHub HTTPS 주소인지 검사합니다.

빈 배열·403·429·잘못된 JSON은 계정 데이터를 바꾸거나 실제 요청 한도를 소진하여 만들 필요가 없습니다. 테스트 도구의 응답 가로채기 또는 개발자 도구의 로컬 응답 재정의로 재현하고, 이후 재정의를 해제하여 실제 API 호출을 확인하세요.

## 7. 상태와 학습 목표 — PDF 2·4쪽

| ID | 요구사항 | 구현·설명 위치 |
| --- | --- | --- |
| STATE-01 | 이벤트 → 상태 → 화면 흐름 | `main.js`, `projects.js`, `contact.js`의 상태와 렌더 함수 |
| STATE-02 | 최소 세 가지 흐름 | 테마, API·필터, 문의 폼. 추가로 모바일 메뉴 |
| GOAL-01 | 시맨틱 구조의 이유 설명 | README 기술 선택: 주제별 section, 독립 프로젝트 article |
| GOAL-02 | Flexbox·Grid 선택 기준 | README 기술 선택: 한 줄 정렬과 행·열 배치 |
| GOAL-03 | DOM 선택·이벤트 연결 설명 | README 상태 흐름과 실제 `querySelector → addEventListener` |
| GOAL-04 | 화살표·구조분해·map/filter | README 프로젝트 렌더 흐름, `projects.js` |
| GOAL-05 | 비동기 요청·UI 상태 | README 네 가지 API 상태 표 |
| GOAL-06 | 기능 단위 상태·렌더 설명 | README 세 가지 상세 흐름, 학습 교재 |

## 8. 제약과 호환성 — PDF 5쪽

| ID | 요구사항 | 구현·검증 기준 |
| --- | --- | --- |
| RULE-01 | 순수 HTML·CSS·JS, 외부 UI 라이브러리 금지 | React/Vue/jQuery/Bootstrap/Tailwind 의존성 없음. 브라우저 기본 API와 로컬 SVG 사용 |
| RULE-02 | 인라인 style 금지 | 정적 HTML, 생성 템플릿, DOM 스타일 직접 할당을 확인. 클래스·데이터 속성으로 스타일 제어 |
| RULE-03 | 최신 Chrome 정상 동작 | Chrome 155.0.8059.82 및 내장 브라우저에서 기능·레이아웃 확인. 상세 결과는 검증 기록 참고 |

보조 접근성: skip link, `:focus-visible`, 의미 있는 이미지 설명, 폼 `aria-describedby`, 메뉴 `aria-expanded`, 상태 영역 `role="status"`, 필터 `aria-pressed`, 새 탭 링크 `rel="noopener noreferrer"`를 적용했습니다.

## 9. 선택 기능 — PDF 4~5쪽

| ID | 항목 | 현재 범위 |
| --- | --- | --- |
| OPTION-01 | 언어별 필터와 `filter()` | 구현. API 언어를 모아 버튼 생성, null 언어는 “기타” |
| OPTION-02 | Hero 타이핑 효과 | 미구현. 정적인 인사말 사용 |
| OPTION-03 | Formspree·EmailJS 실제 전송 | 미구현. 폼 유효성 검사와 선택적 메일 앱 초안 링크 |
| OPTION-04 | 시스템 다크 모드 감지 | 구현. 저장된 선택이 없으면 시스템 테마 적용 |

추가 기능으로 프로젝트 정렬, 메뉴 Escape 닫기, 프로필 이미지 대체, API 페이지네이션과 시간 초과를 적용했습니다.

## 10. 문서·배포·제출 — PDF 3~5쪽

| ID | 요구사항 | 현재 위치 / 완료 조건 |
| --- | --- | --- |
| DOC-01 | 설명·기술·배포 URL·스크린샷 | README에 설명·기술·공개 URL·실제 세 유형 스크린샷 포함 |
| DOC-02 | 스크롤·Observer 기준 문서화 | README에 60px / 300px / 0.2 기록 |
| DEPLOY-01 | GitHub Pages 공개 URL | `https://leeaain2025.github.io/codyssey-b1-1/` 빌드 성공 및 공개 화면 확인 |
| DEPLOY-02 | 배포 주소에서 모든 기능 | 공개 주소에서 화면·에셋·메뉴·테마 저장·API·폼 재확인. 강제 오류 등 검증 범위는 별도 기록 |
| DELIVERY-01 | 저장소 URL 제출 | 공개 저장소 `https://github.com/leeaain2025/codyssey-b1-1` |
| DELIVERY-02 | 세 종류 스크린샷 | `docs/screenshots/desktop.png`, `mobile.png`, `dark.png` 생성·README 임베드. 세 유형의 전체 페이지 캡처도 포함 |

## 11. 검증 기록과 재현 시나리오

2026년 10월 19일 원본 PDF를 다시 대조하고 플래너 디자인으로 변경한 후 재검증했습니다. Chrome에서 320·375·767·768·1023·1024·1440px 레이아웃, 프로젝트 7개 및 Python 필터 3개, 정렬, 모바일 메뉴, 다크 모드 복원, 폼 오류·성공을 확인했습니다. 임시 모의 응답 페이지에서는 로딩·빈 상태·403 오류·재시도 복구를 확인했습니다.

자동 테스트 46개도 모두 통과했습니다(`main` 5, `projects` 22, `contact` 14, `structure` 5). 실제 브라우저 검증과 모의 검증의 구분 및 한계는 [검증 기록](verification.md)을 기준으로 합니다. 아래 표는 재현 절차입니다.

| 시나리오 | 조작 | 기대 결과 |
| --- | --- | --- |
| 모바일 진입 | 375px에서 새로고침 | 메뉴 닫힘, 햄버거 표시, 한 열 카드, 가로 넘침 없음 |
| 메뉴 조작 | 열기 → Escape / 섹션 선택 / 바깥 클릭 | 메뉴 닫힘, `aria-expanded=false`; Escape 시 버튼 포커스 |
| 경계값 | 59→60px, 299→300px 스크롤 | 헤더 배경과 맨 위 버튼이 지정 경계에서 변경 |
| 테마 지속 | 다크 선택 → 새로고침 | 다크 유지, 저장 키에 `dark` |
| 시스템 테마 | 저장 키 삭제 → 시스템 다크 → 새로고침 | 다크 적용; 사용자 선택 후에는 선택값 우선 |
| API 로딩 | Slow 3G에서 새로고침 | 로딩 텍스트·스피너, 완료 후 카드 |
| API 실패·복구 | Offline 새로고침 → Online → 재시도 | 에러 안내 → 로딩 → 성공 |
| API 빈 목록 | 200 응답 본문을 `[]`로 모의 | 빈 상태 문구, 잘못된 성공 카드 없음 |
| API 요청 제한 | 403/429로 모의 | 제한 안내와 재시도 버튼 |
| API 긴 응답 | 15초 넘게 응답 지연 | 시간 초과 안내, 버튼으로 재시도 가능 |
| 필터·정렬 | 언어 선택, 별이 많은 순 선택 | 일치하는 카드만 표시, 별 내림차순·동률이면 최근순 |
| 폼 오류 | 공백 이름·`abc` 이메일·짧은 메시지 제출 | 필드별 오류, 첫 오류 포커스, 전송·새로고침 없음 |
| 폼 성공 | 이름·정상 이메일·10자 이상 메시지 | 검증 완료 문구, 자동 전송 없음, 값 보존 |
| 키보드 | Tab·Shift+Tab·Enter로 주요 기능 | 포커스 확인 가능, 버튼·링크·폼 조작 가능 |
| 모션 줄이기 | OS 또는 개발자 도구에서 reduce 설정 | 모든 콘텐츠 표시, 강한 이동·등장 효과 축소 |
| 배포 정적 파일 | Pages 주소에서 새로고침 | 하위 경로에서도 CSS·JS·이미지 정상 로드 |

최종 결과를 기록할 때에는 실행한 브라우저·뷰포트·날짜와 실제 결과를 남기고, 수행하지 않은 항목은 미확인으로 유지합니다.
