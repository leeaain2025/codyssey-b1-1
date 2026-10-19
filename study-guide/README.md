# 포트폴리오를 만들며 배우는 웹 기초 교과서

> 대상: HTML·CSS·JavaScript로 첫 포트폴리오를 만드는 학습자  
> 학습 기준: 「나를 소개하는 웹페이지 처음부터 만들기」의 여섯 가지 과제 목표  
> 작성 및 공식 문서 확인일: 2026-10-19

이 교재의 목적은 코드를 읽고, 작은 예제를 실행하고, 자신의 구현 이유를 말로 설명할 수 있게 되는 것이다. 최종적으로는 “버튼을 누르면 화면이 바뀐다”는 현상을 HTML 구조, CSS 규칙, JavaScript 이벤트, 데이터와 상태의 관점에서 연결해 설명해야 한다.

예제의 이름과 자기소개는 학습용 가상 내용이다. 실제 자신의 설계·경험을 설명할 때는 직접 구현한 내용으로 바꾼다. 이 교재의 실습을 마쳤다는 것만으로 미션의 모든 제출 조건이 충족되는 것은 아니다. 배포, 스크린샷, 전체 섹션 구성과 추가 인터랙션은 원문 요구사항과 대조해야 한다.

## 목차

1. [웹페이지가 작동하는 전체 흐름과 학습 방법](#start)
2. [1장. HTML: 의미를 담아 문서 구조 설계하기](#chapter-1)
3. [2장. CSS: Flexbox와 Grid로 배치하기](#chapter-2)
4. [3장. DOM과 이벤트: 사용자의 행동에 반응하기](#chapter-3)
5. [4장. JavaScript 문법: 데이터를 다루기 쉽게 표현하기](#chapter-4)
6. [5장. 비동기 처리: GitHub 데이터를 가져와 화면에 표시하기](#chapter-5)
7. [6장. 이벤트 → 상태 → DOM: 하나의 기능 완성하기](#chapter-6)
8. [종합 실습과 학습 완료 체크리스트](#practice)
9. [용어 사전과 원문 자료](#reference)

<a id="start"></a>

## 시작하기: 웹페이지가 작동하는 전체 흐름

### 세 기술이 맡는 일

포트폴리오의 “프로젝트” 영역을 생각해 보자. HTML은 제목과 목록이 들어갈 영역을 만든다. CSS는 카드의 색, 간격, 열 수를 정한다. JavaScript는 GitHub에 데이터를 요청하고, 응답을 받아 그 영역에 카드를 넣는다.

| 기술 | 답해야 하는 질문 | 프로젝트 영역의 예 |
| --- | --- | --- |
| HTML | 무엇이며 어떤 의미를 가진 콘텐츠인가? | 섹션, 제목, 프로젝트별 글, 링크 |
| CSS | 어떤 모습으로 어디에 배치할 것인가? | 카드 배경색, Grid 열, 화면 크기별 여백 |
| JavaScript | 어떤 일이 발생하면 데이터를 어떻게 바꿀 것인가? | API 요청, 필터 변경, 오류 후 재시도 |
| DOM | 브라우저 안에서 어떤 요소를 읽고 바꿀 것인가? | 목록 요소를 찾아 카드 추가, 상태 문구 변경 |

HTML 파일의 내용은 브라우저에서 DOM이라는 객체 구조로 해석된다. JavaScript가 이 구조를 변경하면 브라우저는 그 결과를 화면에 반영한다. 이 교재에서는 데이터를 바탕으로 화면 내용을 만들거나 바꾸는 작업을 일반적으로 “렌더링”이라고 부른다. 6장에서 다루는 React의 렌더링은 UI 계산 단계라는 더 구체적인 의미도 있으므로 구분해서 읽는다.

```text
HTML 읽기 → DOM 구성
CSS 읽기 → 색상과 배치 규칙 적용
JavaScript 실행 → 요소 선택, 이벤트 연결
사용자 행동 또는 API 응답 → 상태 변경 → DOM 업데이트 → 화면 변화
```

### 여섯 가지 목표를 어떻게 확인하는가

| 과제 목표 | 학습 후 할 수 있어야 하는 행동 | 해당 장 |
| --- | --- | --- |
| 시맨틱 태그와 구조 설계 | 자신의 HTML에서 태그 선택 이유를 설명한다. | 1장 |
| Flexbox와 Grid | 배치의 기준을 정하고 두 방식 중 하나를 선택한다. | 2장 |
| DOM 선택과 이벤트 연결 | 요소를 찾고 이벤트 핸들러를 연결해 화면을 바꾼다. | 3장 |
| ES6+ 문법과 배열 메서드 | 객체에서 값을 꺼내고 목록을 선별·변환한다. | 4장 |
| 비동기 데이터와 UI 상태 | 요청 전후와 실패 상황을 사용자에게 보여준다. | 5장 |
| 이벤트·상태·렌더링 연결 | 기능의 흐름을 데이터와 코드로 추적한다. | 6장 |

### 예제를 실행하는 방법

문서의 코드 블록은 목적이 서로 다르다. “독립 실습”은 그 실습에 제시된 HTML·CSS·JavaScript를 함께 사용한다. “부분 예제”는 지정한 위치에 넣거나 흐름을 이해하기 위한 코드이다. 여러 장의 코드를 하나의 파일에 모두 이어 붙이지 않는다. 같은 이름의 `const`를 반복 선언하거나 이전 실습의 이벤트가 중복 연결될 수 있다.

파일을 직접 만들 때의 기본 구조는 다음과 같다. 아래는 학습자가 실습할 때 만들 구조이며, 교재 작성 과정에서 사이트 파일을 생성했다는 뜻은 아니다.

```text
실습 폴더/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
```

1. VS Code에서 해당 실습 폴더를 연다.
2. 코드 블록에 적힌 경로에 파일을 저장한다. 실습별 파일명이 다르면 해당 이름을 따른다.
3. Live Server로 `index.html`을 연다.
4. 브라우저 개발자 도구의 Console에서 오류와 출력값을 확인한다.
5. API 요청은 Network에서 주소, 응답 상태, 응답 데이터를 확인한다.
6. 예제의 값을 한 가지 바꾼 뒤 예상한 결과와 실제 결과를 비교한다.

순수 JavaScript 배열 예제는 개발자 도구 Console에서도 실행할 수 있다. 같은 선언을 반복해서 붙여 넣다가 재선언 오류가 발생하면 페이지를 새로고침하거나 예제를 별도 함수·블록 안에서 실행한다.

### 권장 학습 순서

각 장을 “개념 읽기 → 실행 전 결과 예상 → 코드 실행 → 한 가지 변경 → 말로 설명 → 복습 문제” 순서로 공부한다. 처음부터 모든 문법을 외우기보다, 설명에 등장하는 단어를 코드의 해당 부분과 연결한다.

이 교재에서 기본 예제는 외부 프레임워크나 UI 라이브러리를 사용하지 않는다. 프로젝트 언어 필터링은 원문에서 선택 기능이지만, `filter()`와 상태 변경을 연습하기 좋은 예제로 포함했다. 시스템 테마 감지, 실제 이메일 전송도 선택 과제이므로 기본 기능과 구분한다.

---

<a id="chapter-1"></a>

## 1장. HTML: 화면보다 먼저 내용의 의미를 설계한다

### 1.1 이 장의 학습 목표

이 장을 마치면 태그 이름을 나열하는 것을 넘어, “이 내용은 왜 이 태그에 들어가는가?”를 설명할 수 있어야 한다. 포트폴리오의 각 구역이 담당하는 정보와 제목의 관계를 먼저 정하고, 그 관계를 HTML로 표현하는 것이 목표이다.

### 1.2 시맨틱 태그를 사용하는 이유

**시맨틱(semantic)은 ‘의미를 담고 있다’는 뜻이다.** HTML의 의미는 요소가 어떤 역할의 내용인지를 말한다. `<h1>`은 최상위 제목이고, `<nav>`는 주요 탐색 링크의 영역이다. 글자를 크게 보이게 하거나 상자를 가로로 배치하는 일은 CSS가 담당한다.

다음 두 코드는 CSS를 적용하면 똑같이 보이게 할 수 있다. 그러나 문서에서 전달하는 의미는 다르다.

```html
<!-- 비교용 조각: 일반 구역 안에 글자가 들어 있다. -->
<div class="large-text">나의 프로젝트</div>

<!-- 비교용 조각: 이 구역의 제목이라는 의미가 있다. -->
<h2>나의 프로젝트</h2>
```

적절한 태그는 다른 개발자가 구조를 읽기 쉽게 하고, 화면 읽기 도구가 제목과 주요 구역을 탐색하도록 돕는다. 검색 엔진도 문서 내용을 해석하는 데 활용할 수 있다. 다만 시맨틱 태그만 사용했다고 접근성이나 검색 순위가 자동으로 완성되는 것은 아니다. 읽기 순서, 텍스트, 키보드 조작 등도 함께 설계해야 한다. [MDN — 시맨틱](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)

### 1.3 포트폴리오에서 사용할 태그 선택 기준

| 태그 | 먼저 던질 질문 | 이 포트폴리오의 적용 예 |
| --- | --- | --- |
| `header` | 페이지나 구역을 소개하는 내용인가? | 사이트 이름과 상단 탐색 영역 |
| `nav` | 주요 위치로 이동하는 탐색 링크 묶음인가? | About, Skills, Projects, Contact 링크 |
| `main` | 이 페이지의 핵심 내용인가? | Hero부터 Contact까지의 본문 |
| `section` | 제목으로 설명할 수 있는 하나의 주제인가? | About, Skills, Projects, Contact |
| `article` | 따로 떼어도 하나의 내용으로 이해할 수 있는가? | 이름·설명·링크가 있는 프로젝트 소개 |
| `footer` | 페이지나 구역의 마무리 정보인가? | 저작권 표시와 관련 링크 |
| `div` | 의미를 추가하지 않고 배치용으로만 묶는가? | 프로젝트 카드들을 정렬하는 컨테이너 |

`main`은 사이트 전체를 무조건 감싸는 태그가 아니다. 반복되는 사이트 메뉴와 저작권 표시를 제외한 핵심 내용을 담는 데 사용한다. 일반적인 이 포트폴리오에서는 화면에 드러나는 `main`을 하나 두면 된다. [MDN — main](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main)

`section`과 `article`은 크기가 아니라 내용으로 구분한다. “프로젝트” 전체는 하나의 주제이므로 `section`으로 묶을 수 있다. 그 안에서 프로젝트 하나의 이름·설명·링크가 독립적인 소개를 이룬다면 `article`이 어울린다. 카드를 표현한다고 반드시 `article`이어야 하는 것은 아니다. 내용이 단순한 링크 목록이라면 `ul`과 `li`가 더 자연스러울 수도 있다. [MDN — section](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section) · [MDN — article](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article)

### 1.4 제목은 글자 크기가 아니라 내용의 계층이다

이 교재의 포트폴리오는 다음처럼 제목을 배치한다.

```text
h1: 김개발의 포트폴리오
├─ h2: 소개
├─ h2: 기술
├─ h2: 프로젝트
│  ├─ h3: 자기소개 웹사이트
│  └─ h3: 할 일 관리 앱
└─ h2: 연락하기
```

이 페이지의 대표 제목을 `h1` 하나로 두고, 주요 구역은 `h2`, 구역 안의 항목은 `h3`으로 둔다. “작게 보이게 하려면 `h4`”처럼 선택하지 않는다. 같은 크기로 보이게 하고 싶다면 CSS에서 `font-size`를 조절한다. 제목 단계를 건너뛰지 않는 구조는 문서의 관계를 이해하는 데 도움이 된다. [MDN — 제목 요소](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements)

Hero는 HTML 태그 이름이 아니라 첫 화면의 소개 영역을 부르는 디자인 용어이다. 이 예제에서는 `section` 안에 대표 제목과 자기소개를 둔다. Footer 역시 과제의 필수 영역이지만, 의미에 맞는 `footer` 태그로 표현하며 `section`으로 감쌀 필요는 없다.

### 1.5 구조를 직접 읽어 보는 예제

**다음은 `index.html`의 구조 학습용 예제이다.** 필수 구역의 위치와 의미를 보여주기 위한 뼈대이며, 제출용 사이트의 모든 내용이나 JavaScript 기능이 완성된 코드는 아니다. 이미지 경로와 이름은 직접 준비한 자료로 바꾼다. CSS는 다음 장의 학습용 코드를 `css/style.css`에 넣어 연결할 수 있다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>김개발 | 포트폴리오</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="site-header container">
    <a href="#hero">김개발</a>
    <nav aria-label="주요 메뉴">
      <ul class="nav-links">
        <li><a href="#about">소개</a></li>
        <li><a href="#skills">기술</a></li>
        <li><a href="#projects">프로젝트</a></li>
        <li><a href="#contact">연락하기</a></li>
      </ul>
    </nav>
  </header>

  <main class="container">
    <section id="hero" aria-labelledby="hero-title">
      <h1 id="hero-title">김개발의 포트폴리오</h1>
      <p>사용자의 작은 불편을 해결하는 개발자를 꿈꾼다.</p>
      <a href="#projects">프로젝트 보기</a>
    </section>

    <section id="about" aria-labelledby="about-title">
      <h2 id="about-title">소개</h2>
      <img src="images/profile.jpg" alt="책상 앞에서 웃고 있는 김개발"
           width="320" height="320">
      <p>웹 개발의 기본기를 배우며 작은 결과물을 만들어 가고 있다.</p>
    </section>

    <section id="skills" aria-labelledby="skills-title">
      <h2 id="skills-title">기술</h2>
      <ul>
        <li>HTML: 내용의 의미에 맞는 구조 작성</li>
        <li>CSS: 반응형 화면 배치</li>
        <li>JavaScript: 사용자 동작에 반응하는 화면 구현</li>
      </ul>
    </section>

    <section id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title">프로젝트</h2>
      <div class="project-grid">
        <article class="project-card">
          <h3>자기소개 웹사이트</h3>
          <p>HTML, CSS, JavaScript로 나를 소개하는 페이지를 만들었다.</p>
          <a href="https://github.com/">저장소 보기</a>
        </article>
        <!-- 다른 프로젝트도 같은 수준의 article로 추가한다. -->
      </div>
    </section>

    <section id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">연락하기</h2>
      <form id="contact-form">
        <label for="contact-name">이름</label>
        <input id="contact-name" name="name" type="text" required>
        <label for="contact-email">이메일</label>
        <input id="contact-email" name="email" type="email" required>
        <label for="contact-message">메시지</label>
        <textarea id="contact-message" name="message" required></textarea>
        <!-- 제출 버튼과 검증 동작은 이후 장의 설계를 참고해 직접 연결한다. -->
      </form>
    </section>
  </main>

  <footer class="container">
    <p>© 김개발. 학습용 포트폴리오.</p>
  </footer>
</body>
</html>
```

`lang="ko"`는 문서의 기본 언어가 한국어임을 알려준다. `meta viewport`는 모바일에서 화면 폭에 맞춰 레이아웃을 계산하도록 돕는다. `href="#projects"`는 같은 문서에서 `id="projects"`인 요소로 이동한다. `id`는 문서 안에서 고유하게 부여한다.

`aria-labelledby="about-title"`는 이 구역의 이름이 `id="about-title"`인 제목에서 온다는 관계를 명시한다. 태그와 제목을 먼저 올바르게 작성하고, 필요한 관계를 이런 속성으로 보충한다. ARIA 속성이 HTML의 의미를 대신 설계해 주지는 않는다.

`project-grid`의 `div`는 여러 프로젝트의 배치를 위한 상자이다. 반면 그 안의 `article`은 각각 하나의 프로젝트 소개이다. 클래스 이름은 CSS나 JavaScript에서 요소를 찾기 위한 이름이며, `class="project-card"`만으로 독립적인 글이라는 의미가 생기지는 않는다.

### 1.6 이동에는 링크, 동작에는 버튼을 사용한다

**다음은 역할 비교용 부분 코드이다.** 버튼의 동작은 이후 JavaScript 장에서 연결한다.

```html
<a href="#contact">연락하기 영역으로 이동</a>
<button id="theme-toggle" type="button">다크 모드로 변경</button>
```

다른 위치나 페이지로 이동하면 `a`를, 메뉴를 열거나 테마를 변경하는 동작이면 `button`을 우선 검토한다. `div`에 클릭 처리를 붙여 버튼처럼 보이게 하면 키보드 조작과 의미를 별도로 구현해야 한다. 기본 버튼은 이미 이러한 상호작용을 위한 HTML 요소이다. 폼 안에서 제출이 목적이 아닌 버튼에는 `type="button"`을 명시해 의도하지 않은 제출을 피한다. [MDN — button](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button)

### 1.7 label과 alt도 구조 설계의 일부이다

`label`의 `for` 값과 입력 요소의 `id` 값이 같으면 두 요소가 연결된다. 사용자가 “이메일”이라는 레이블을 눌러 해당 입력 칸으로 이동할 수 있고, 보조 기술에도 입력 칸의 이름을 전달할 수 있다. `placeholder`는 입력 예시로 사용할 수 있지만, 입력 후 사라지는 안내를 레이블의 대체물로 삼지 않는다. [MDN — label](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label)

`alt`는 이미지를 볼 수 없을 때 필요한 정보를 텍스트로 전달한다. 이 과제의 프로필과 프로젝트 이미지는 내용에 맞는 설명을 작성한다. `alt="이미지"`나 파일 이름만 넣으면 무엇을 보여 주는지 알기 어렵다. 일반적인 웹 접근성 원칙에서 순수 장식 이미지는 `alt=""`로 처리할 수 있지만, 의미 있는 사진이나 작업 결과를 장식으로 취급해서는 안 된다. [MDN — img](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img)

### 1.8 흔한 오해와 수정 방향

| 오해 | 수정 방향 |
| --- | --- |
| `div`를 쓰면 잘못된 HTML이다. | 별도의 의미 없이 배치용으로 묶을 때는 적절하다. |
| 화면에 상자 하나가 보이면 `section`이다. | 제목으로 설명할 주제인지 먼저 판단한다. |
| `header`는 언제나 브라우저 맨 위에 고정된다. | 태그의 의미와 위치 고정 CSS는 별개이다. |
| `h1`은 글자가 너무 크므로 쓰지 않는다. | 제목의 역할을 유지하고 크기를 CSS로 바꾼다. |
| 필수 영역은 모두 `section`이어야 한다. | Footer처럼 내용에 맞는 별도 태그를 사용해도 된다. |

### 1.9 직접 해 보기

1. 종이에 Hero, About, Skills, Projects, Contact, Footer를 적고 각 영역의 목적을 한 문장으로 쓴다.
2. 페이지 제목, 구역 제목, 프로젝트 제목을 각각 `h1`, `h2`, `h3`에 대응시킨다.
3. 구조 예제의 이름과 소개 문장을 자신의 내용으로 바꾸고, 본인 사진 경로를 연결한다.
4. 프로젝트 `article`을 두 개 더 추가한다. 제목과 설명, 링크도 각각 다르게 작성한다.
5. CSS를 잠시 연결하지 않은 상태에서 읽는 순서가 자연스러운지 살펴본다.
6. 키보드의 Tab 키로 링크와 입력 칸에 차례로 이동하고, 레이블 클릭이 입력 칸과 연결되는지 확인한다.

### 1.10 복습 문제

1. Projects 전체에는 `section`, 개별 프로젝트 소개에는 `article`을 선택한 이유는 무엇인가?
2. 다크 모드 전환을 `a href="#"`로 만드는 것보다 `button`이 자연스러운 이유는 무엇인가?
3. `label for="email"`과 `input id="contact-email"`은 연결되는가?

<details>
<summary>해설 확인</summary>

1. Projects는 프로젝트라는 주제로 묶인 구역이며, 각 프로젝트가 이름·설명·링크를 갖추면 하나의 독립적인 소개로 읽을 수 있기 때문이다. 실제 내용이 다르면 태그 선택도 달라질 수 있다.
2. 테마 전환은 문서의 다른 위치로 이동하는 일이 아니라 현재 화면의 상태를 바꾸는 동작이기 때문이다.
3. 연결되지 않는다. `for` 값과 `id` 값이 정확히 같아야 한다. 예를 들어 둘 다 `contact-email`로 맞춘다.

</details>

### 1.11 본인 설계를 설명하는 예문

> 나는 페이지를 탐색하는 영역과 나를 소개하는 본문을 구분해 `header`와 `main`을 배치했다. 본문은 Hero, About, Skills, Projects, Contact의 주제별 구역으로 나눴다. 대표 제목은 `h1`, 구역 제목은 `h2`, 프로젝트 제목은 `h3`으로 정했다. 프로젝트 한 개의 소개가 독립적으로 읽히므로 `article`을 사용했고, 카드 배치를 위한 묶음에는 `div`를 사용했다. 연락 폼의 입력 칸은 `label`로 이름을 연결했다.

이 문장을 그대로 제출하는 것이 목표가 아니다. **자신이 실제로 선택한 구조와 그 이유에 맞게 고쳐 설명할 수 있어야 한다.**

<a id="chapter-2"></a>

## 2장. CSS: Flexbox와 Grid를 목적에 맞게 선택한다

### 2.1 이 장의 학습 목표

같은 HTML도 CSS에 따라 다른 배치를 만들 수 있다. 이 장에서는 “가로로 놓으려면 무엇을 쓸까?”에서 한 걸음 더 나아가, **어떤 관계로 정렬해야 하는지**를 먼저 판단한다. 이 과제에서는 내비게이션에 Flexbox, Projects에 `auto-fit`과 `minmax()`를 활용한 Grid를 사용하며, 모바일 퍼스트와 768px·1024px 브레이크포인트를 반영한다.

### 2.2 Flexbox는 한 축의 흐름을 중심으로 배치한다

Flexbox는 항목들을 한 방향으로 나열하면서 간격, 정렬, 늘어남과 줄어듦을 조절하는 데 적합하다. 부모에 `display: flex`를 지정하면 **직접 자식 요소**들이 flex 항목이 된다. `ul`을 flex 컨테이너로 만들면 직접 자식인 `li`들이 배치 대상이고, 그 안의 `a`까지 모두 같은 줄의 직접 항목이 되는 것은 아니다. [MDN — Flexbox 기본 개념](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts)

Flexbox에는 주축(main axis)과 그에 직각인 교차축(cross axis)이 있다. 일반적인 가로쓰기 문서에서 `flex-direction: row`는 주축이 가로이고, `column`은 주축이 세로이다. 따라서 `justify-content`를 무조건 “가로 정렬”이라고 외우면 `column`에서 혼동하게 된다.

| 속성 | 무엇을 결정하는가? | 예 |
| --- | --- | --- |
| `flex-direction` | 주축 방향 | `row`, `column` |
| `justify-content` | 주축의 남는 공간에 항목을 어떻게 배치할지 | `center`, `space-between` |
| `align-items` | 교차축에서 각 항목을 어떻게 정렬할지 | `center`, `stretch` |
| `gap` | 항목 또는 줄 사이의 간격 | `1rem` |
| `flex-wrap` | 한 줄에 들어가지 않을 때 줄바꿈을 허용할지 | `wrap` |

`justify-content`는 분배할 남는 공간이 있을 때 차이가 뚜렷하다. 컨테이너가 내용과 거의 같은 크기라면 `center`를 적용해도 이동이 눈에 띄지 않을 수 있다. [MDN — Flexbox 정렬](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Aligning_items)

**다음은 1장의 HTML에 적용하는 `css/style.css` 일부이다.**

```css
.nav-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  padding: 0;
  margin: 0;
  list-style: none;
}
```

여기서 `display: flex`는 메뉴 항목들을 주축을 따라 배치하고, `gap`은 메뉴 사이의 간격을 만든다. `padding`, `margin`, `list-style`은 목록에 기본으로 붙는 여백과 글머리표를 조절한다. 이 코드는 메뉴 배치만 보여주며, 모바일 햄버거 버튼과 열기·닫기는 별도의 상태와 이벤트를 연결해야 완성된다.

#### 줄바꿈을 해도 Flexbox가 Grid와 같아지지는 않는다

`flex-wrap: wrap`을 쓰면 여러 줄을 만들 수 있다. 하지만 각 줄은 독립적으로 공간을 분배한다. 첫 줄의 첫 번째 항목과 둘째 줄의 첫 번째 항목이 하나의 공통 열 너비를 공유하도록 설계하는 방식은 아니다. 여러 줄에서 열의 경계를 맞춰야 하는 카드 목록에는 Grid가 더 자연스럽다. [MDN — Flexbox 줄바꿈](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Wrapping_items)

항목 자체의 크기 변화를 조절할 때는 `flex`를 사용할 수 있다. 예를 들어 `flex: 1 1 12rem`은 성장 비율 1, 축소 비율 1, 기본 크기 `12rem`을 함께 지정한다. 실제 너비는 남는 공간, 다른 항목, 콘텐츠의 최소 크기 등에도 영향을 받으므로 항상 `12rem`이 되는 것은 아니다. [MDN — flex](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex)

### 2.3 Grid는 행과 열의 관계를 함께 설계한다

Grid는 가로 열과 세로 행으로 이루어진 격자를 만든다. 여러 카드가 줄바꿈된 뒤에도 공통 열의 경계에 맞춰 배치되도록 만들기 좋다. 부모의 `display: grid`는 직접 자식들을 grid 항목으로 만든다. `grid-template-columns`는 열의 크기를 정의하며, 필요한 행은 항목 수에 따라 자동으로 생길 수도 있다. [MDN — Grid 기본 개념](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts)

**다음은 열의 개념을 익히기 위한 비교용 조각이다. 과제 적용 예제는 바로 아래의 자동 열 배치 코드를 사용한다.**

```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}
```

`repeat(3, ...)`는 같은 열 정의를 세 번 반복한다. `1fr`은 분배 가능한 공간의 한 몫이며, 이 예제에서는 세 열이 같은 몫을 갖는다. `minmax(0, 1fr)`은 열이 콘텐츠의 최소 너비에 묶여 불필요하게 커지는 것을 줄이는 데 도움이 된다. 다만 고정된 3열만 사용하면 작은 화면에서 카드가 너무 좁아질 수 있다.

#### auto-fit과 minmax를 함께 읽는 방법

**다음은 과제의 Projects 영역에 적용할 수 있는 부분 코드이다. 앞의 비교용 `.project-grid` 규칙을 이것으로 교체한다.**

```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1rem;
}
```

안쪽부터 차례로 해석하면 다음과 같다.

1. `min(100%, 16rem)`: 최소 열 너비의 기준을 컨테이너 폭과 `16rem` 중 작은 값으로 정한다. 아주 좁은 화면에서는 카드 한 개가 부모 폭을 넘지 않도록 돕는다.
2. `minmax(최소값, 1fr)`: 정한 최소값부터 시작하되 남는 공간을 나누어 열이 늘어날 수 있도록 한다.
3. `auto-fit`: 들어갈 수 있는 만큼 열을 만들고, 항목이 배치되지 않은 빈 열을 접는다.
4. `repeat(...)`: 그 열 정의를 필요한 개수만큼 반복한다.

카드를 3개 배치할 공간이 있으면 3개를 나란히 놓고, 공간이 부족해지면 다음 줄로 넘긴다. `auto-fit`이 항상 3열을 뜻하지는 않는다. 카드 수와 컨테이너 폭, 최소 너비, 간격이 함께 결과를 결정한다. [MDN — grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-columns)

### 2.4 작은 화면부터 시작해 넓은 화면으로 확장한다

모바일 퍼스트는 작은 화면에서 읽을 수 있는 기본 CSS를 먼저 작성하고, 화면이 넓어지면 필요한 규칙을 덧붙이는 접근이다. 다음 코드는 앞의 메뉴와 Grid 규칙에 **추가**하는 학습용 CSS이다. 과제에 명시된 768px와 1024px 기준을 사용한다.

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  line-height: 1.6;
}

.container {
  width: 100%;
  margin-inline: auto;
  padding-inline: 1rem;
}

.site-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding-block: 1rem;
}

section {
  padding-block: 2rem;
}

.project-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 1rem;
  border: 1px solid currentColor;
  overflow-wrap: anywhere;
}

.project-card > a {
  margin-top: auto;
}

img {
  max-width: 100%;
  height: auto;
}

input,
textarea {
  display: block;
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  font: inherit;
}

@media (min-width: 768px) {
  .container { padding-inline: 2rem; }
  .site-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
}

@media (min-width: 1024px) {
  .container { max-width: 72rem; }
  .project-grid { gap: 1.5rem; }
}
```

`@media (min-width: 768px)` 안의 규칙은 화면 폭이 768 CSS 픽셀 이상일 때 추가로 적용된다. 1024px 이상에서는 기본 규칙과 두 미디어 쿼리의 해당 규칙이 모두 적용된다. 같은 속성이 겹치면 선택자 우선순위와 작성 순서 등을 통해 최종값이 정해진다. [MDN — 미디어 쿼리](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using)

`box-sizing: border-box`는 지정한 너비에 안쪽 여백과 테두리를 포함시켜 계산하도록 한다. 그래서 `.container`에 `width: 100%`와 좌우 padding이 있어도 둘을 단순히 더해 부모보다 커지는 문제를 피하기 쉽다. [MDN — box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing)

**320px처럼 좁은 화면에서도 가로 스크롤이 생기지 않는지 실제로 확인한다.** 카드의 고정 너비만 줄이는 것으로는 충분하지 않다. 긴 저장소 이름은 `overflow-wrap: anywhere`로 줄바꿈할 수 있게 하고, flex/grid 항목의 최소 너비가 문제라면 `min-width: 0`을 검토한다. 이미지에는 `max-width: 100%`를 적용한다. 페이지 전체에 `overflow-x: hidden`만 붙여 넘친 내용을 가리면 원인을 놓치기 쉽다.

### 2.5 두 배치 방법은 함께 사용할 수 있다

위 예제에서 카드들의 바깥 배치는 Grid이다. 각 카드 내부는 `display: flex; flex-direction: column`으로 제목, 설명, 링크를 세로로 놓았다. 카드 아래쪽 링크의 `margin-top: auto`는 카드 안의 남는 세로 공간을 위쪽 여백으로 흡수한다. 같은 행의 카드 높이가 늘어났을 때 링크를 아래쪽으로 배치하는 데 유용하다.

| 배치하려는 내용 | 우선 검토할 도구 | 판단 이유 |
| --- | --- | --- |
| 내비게이션 링크 | Flexbox | 한 방향의 항목 흐름과 간격이 중심이다. |
| 프로젝트 카드 목록 | Grid | 여러 줄의 카드가 공통 열을 공유한다. |
| 카드 내부의 제목·설명·링크 | Flexbox의 column | 위에서 아래로 흐르는 관계와 남는 공간을 다룬다. |
| 짧은 문단 여러 개 | 일반 문서 흐름 | 별도 레이아웃 도구 없이도 위에서 아래로 읽힌다. |

모든 부모에 Flexbox나 Grid를 선언할 필요는 없다. 원하는 배치 관계가 있을 때 그 관계를 가장 직접적으로 표현하는 도구를 선택한다.

### 2.6 테마에도 공통 기준을 둔다: :root와 CSS 변수

과제의 CSS 변수와 다크 테마 조건은 배치와 별개로 함께 설계한다. **다음은 `css/style.css`에 추가하는 색상 규칙이다.** 이 코드만으로 버튼 동작이나 설정 저장이 생기지는 않는다.

```css
:root {
  --page-background: #ffffff;
  --page-text: #202124;
  color-scheme: light;
}

[data-theme="dark"] {
  --page-background: #181a1b;
  --page-text: #f0f2f4;
  color-scheme: dark;
}

body {
  background-color: var(--page-background);
  color: var(--page-text);
}
```

`:root`는 HTML 문서에서 최상위 `html` 요소를 선택한다. 여기에 정의한 `--page-background` 같은 사용자 정의 속성은 기본적으로 자식 요소에 상속된다. `var(--page-background)`는 그 값을 사용하라는 뜻이다. 색을 한곳에서 바꾸어 여러 요소에 반영할 수 있다. [MDN — :root](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:root) · [MDN — CSS 변수](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)

`[data-theme="dark"]`는 `data-theme` 속성값이 `dark`인 요소를 선택한다. 이 예제에서는 JavaScript가 `html`에 그 속성을 붙인다. 그러면 `html`은 두 선택자에 모두 해당하며, 여기서는 우선순위가 같은 다크 규칙을 뒤에 작성했으므로 다크 색상 값이 적용된다. `data-theme`에 브라우저가 정해 둔 테마 전환 기능이 내장된 것은 아니다. 우리가 작성한 선택자와 변수가 함께 작동하는 것이다. 이벤트와 설정 저장은 이후 장에서 연결한다. [MDN — 속성 선택자](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Attribute_selectors)

### 2.7 흔한 오해와 직접 해 볼 실습

“Flexbox는 가로, Grid는 세로”는 잘못된 구분이다. 둘 다 가로와 세로 배치를 만들 수 있다. 차이는 한 축의 항목 흐름을 중심으로 다루는지, 행과 열의 관계를 함께 설계하는지에 있다. 또 반응형은 몇 가지 기기 크기에만 맞추는 일이 아니다. 기준 폭 사이에서도 읽을 수 있는지 확인해야 한다.

1. 1장의 카드 예제를 세 개 이상 만든 뒤 메뉴 Flexbox와 Projects Grid를 적용한다.
2. 브라우저 폭을 320px, 767px, 768px, 1023px, 1024px로 바꿔 경계 전후를 비교한다.
3. 카드 제목을 아주 긴 영문 저장소 이름으로 바꿔도 가로 스크롤이 생기는지 확인한다.
4. `16rem`을 `20rem`으로 바꾸고 한 줄의 카드 개수가 달라지는 이유를 설명한다.
5. `.site-header`의 `flex-direction`을 바꾸며 `justify-content`와 `align-items`가 작용하는 축을 관찰한다.
6. 개발자 도구에서 `html`에 `data-theme="dark"`를 직접 붙여 색상이 바뀌는지 확인한다.

### 2.8 복습 문제

1. `flex-direction: column`일 때 `justify-content`는 어느 축에 적용되는가?
2. `flex-wrap: wrap`만으로 프로젝트 카드의 열 너비가 줄마다 동일해지는가?
3. `minmax(20rem, 1fr)`을 320px 화면에서 사용할 때 어떤 문제가 생길 수 있는가?
4. 화면 폭이 1100px이면 768px 미디어 쿼리의 규칙은 사라지는가?

<details>
<summary>해설 확인</summary>

1. 주축에 적용되며, 일반적인 가로쓰기에서 `column`의 주축은 세로이다.
2. 아니다. 각 flex 줄은 독립적으로 공간을 계산한다. 공통 열에 맞추려는 목적에는 Grid를 검토한다.
3. 기본 글자 크기 16px일 때 20rem은 320px이다. 화면 자체가 320px이어도 좌우 여백을 빼면 실제 컨테이너는 더 좁을 수 있다. `min(100%, 20rem)`처럼 좁은 부모 폭을 반영하거나 다른 작은 화면 규칙이 필요하다.
4. 사라지지 않는다. 768px 이상과 1024px 이상 조건이 모두 참이다. 겹치는 선언은 CSS의 적용 규칙으로 최종값이 정해진다.

</details>

### 2.9 본인 설계를 설명하는 예문

> 나는 메뉴 항목의 한 방향 흐름과 간격을 조절하기 위해 Flexbox를 사용했다. 프로젝트 목록은 여러 줄에서도 열을 맞추기 위해 Grid를 사용했고, `auto-fit`과 `minmax()`로 공간에 따라 카드 수가 조절되게 했다. 작은 화면의 기본 스타일을 먼저 작성한 뒤 768px와 1024px에서 여백과 헤더 배치를 확장했다. 카드 안에서는 다시 Flexbox를 사용해 링크의 위치를 조절했다. 320px 폭과 긴 프로젝트 이름으로도 넘침이 없는지 확인한다.

<a id="chapter-3"></a>

## 3장. DOM을 선택하고 이벤트를 연결하기

### 3.1 학습 목표와 핵심 질문

이 장의 목표는 “버튼을 누르면 화면이 바뀐다”를 코드의 순서로 설명하는 것이다. 다음 네 문장을 자신의 말로 설명할 수 있어야 한다.

1. HTML을 읽은 브라우저는 DOM이라는 객체 구조를 만든다.
2. JavaScript는 선택자로 필요한 DOM 요소를 찾는다.
3. 요소에 이벤트가 발생했을 때 실행할 함수를 등록한다.
4. 그 함수에서 상태를 변경하고 DOM에 결과를 반영한다.

### 3.2 HTML과 DOM은 어떤 관계인가?

HTML 파일은 개발자가 작성한 문서이다. 브라우저는 그 문서를 읽고 요소들을 부모·자식 관계의 객체로 구성한다. 이 구조와 조작 방법을 DOM(Document Object Model)이라고 한다. JavaScript는 DOM을 통해 문구, 속성, 요소의 구성을 바꾼다. [MDN — DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

예를 들어 `<main><h1>소개</h1><button>보기</button></main>`은 다음 관계를 갖는다. 아래 그림은 요소 관계만 단순화한 것이며, 실제 DOM에는 텍스트 노드 등도 존재한다.

```text
document
└─ html
   ├─ head
   └─ body
      └─ main
         ├─ h1
         └─ button
```

`document`는 현재 문서를 나타내는 브라우저 제공 객체이다. `localStorage`처럼 웹페이지의 JavaScript에서 별도 `import` 없이 접근할 수 있다. JavaScript 언어 문법과 브라우저가 제공하는 API는 구분해야 한다. 배열의 `map`은 언어의 표준 기능이고, `document.querySelector`는 문서를 조작하는 Web API이다.

DOM을 바꿨다고 디스크의 HTML 파일까지 수정되는 것은 아니다. 개발자 도구의 Elements 탭에는 현재 DOM을, 편집기에는 저장된 소스를 확인한다. 새로고침하면 원래 문서를 읽고 JavaScript를 다시 실행한다.

### 3.3 `querySelector`: CSS 선택자로 요소 찾기

다음은 문법을 읽기 위한 예시이다. 해당 선택자와 일치하는 HTML 요소가 있어야 실제 요소를 얻는다.

```javascript
const menuButton = document.querySelector("#menu-toggle");
const firstCard = document.querySelector(".project-card");
const main = document.querySelector("main");
```

`#menu-toggle`은 ID, `.project-card`는 클래스, `main`은 태그 선택자이다. CSS에서 사용했던 선택자 문법을 JavaScript에서도 활용한다. `querySelector()`는 일치하는 **첫 번째 요소 하나**를 반환하고, 없으면 `null`을 반환한다. `null`은 “찾은 요소가 없다”는 결과이지 빈 버튼이 아니다. [MDN — querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

여러 요소를 다루려면 `querySelectorAll()`을 사용한다.

```javascript
const cards = document.querySelectorAll(".project-card");
console.log(cards.length);

cards.forEach((card) => {
  card.classList.add("is-ready");
});
```

`querySelectorAll()`의 반환값은 배열과 비슷한 `NodeList`이다. 결과가 없으면 길이가 0인 목록이다. 이 목록은 조회 시점의 요소 집합이며 이후 추가된 카드를 자동 포함하지 않는다. `forEach()`는 사용할 수 있지만 배열의 모든 메서드를 그대로 가진 것은 아니다. [MDN — querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)

| 선택 방법 | 반환값 | 일치하는 요소가 없을 때 | 대표 용도 |
|---|---|---|---|
| `querySelector()` | 요소 하나 | `null` | 메뉴 버튼, 폼, 상태 메시지 |
| `querySelectorAll()` | `NodeList` | 길이 0인 목록 | 메뉴 링크 전체, 카드 전체 |

### 3.4 요소를 찾는 시점과 `defer`

브라우저는 HTML을 위에서 아래로 읽는다. `<head>`의 스크립트가 먼저 실행되면 아직 아래쪽 버튼의 DOM이 만들어지지 않았을 수 있다. 이때 선택자 철자가 맞아도 `null`이 나온다.

이 교재의 예제는 외부 스크립트에 `defer`를 사용한다.

```html
<script src="js/main.js" defer></script>
```

외부 일반 스크립트에 붙인 `defer`는 HTML 해석을 기다렸다가 스크립트를 실행하게 한다. 파일 다운로드는 HTML 해석과 함께 진행할 수 있다. 외부 스크립트 경로가 틀리면 `defer`와 관계없이 코드를 불러오지 못하므로 개발자 도구의 Console과 Network도 확인한다. [MDN — script 요소](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script#defer)

선택 실패를 확인하려면 다음처럼 작성할 수 있다. 필수 요소가 없을 때 조용히 무시하면 구조나 철자 오류를 발견하기 어렵다.

```javascript
const button = document.querySelector("#menu-toggle");

if (button === null) {
  throw new Error("#menu-toggle 버튼을 찾지 못했습니다.");
}
```

### 3.5 `addEventListener`: 나중에 실행할 함수를 등록하기

이벤트는 클릭, 입력, 제출, 스크롤처럼 브라우저가 알리는 발생 사실이다. 이벤트 리스너는 그 사실을 받았을 때 실행할 함수이다. 다른 함수에 인자로 전달되어 호출되는 함수를 **콜백 함수**라고 한다. 이벤트 리스너는 이벤트 발생 시 호출되는 콜백이며, 모든 콜백이 비동기적으로 실행되는 것은 아니다. [MDN — addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

```javascript
// 위에서 menuButton을 선택했다는 가정의 문법 예시이다.
const handleClick = () => {
  console.log("메뉴 버튼을 눌렀습니다.");
};

menuButton.addEventListener("click", handleClick);
```

등록 시에는 `handleClick` 함수를 전달하고, 실제 클릭이 일어나면 브라우저가 호출한다. `handleClick()`을 전달하면 먼저 함수를 실행한 뒤 그 반환값을 전달하게 된다. 이 예제의 반환값은 `undefined`이므로 의도한 클릭 리스너가 등록되지 않는다.

```javascript
// 올바른 등록
menuButton.addEventListener("click", handleClick);

// 잘못된 등록: 클릭을 기다리지 않고 먼저 실행한다.
// menuButton.addEventListener("click", handleClick());
```

| 이벤트 | 주로 연결할 대상 | 포트폴리오에서의 역할 |
|---|---|---|
| `click` | 버튼, 링크 | 메뉴 열기, 테마 변경, 재시도 |
| `input` | 입력 칸 | 사용자가 입력하는 동안 값 확인 |
| `submit` | `form` 요소 | 연락 폼의 제출 시도와 검증 |
| `scroll` | 문서나 스크롤 요소 | 스크롤 위치에 따른 화면 처리 |

폼 검증은 제출 버튼의 `click`보다 폼의 `submit`에 연결하는 편이 적절하다. 사용자는 Enter 키로도 폼을 제출할 수 있기 때문이다. 스크롤 이벤트는 자주 발생할 수 있으므로 매번 많은 요소를 다시 만드는 작업은 피한다.

### 3.6 이벤트 객체와 기본 동작

브라우저는 리스너를 호출하면서 이벤트 정보를 담은 객체를 전달한다. 매개변수 이름은 `event`나 `e` 등 자유롭게 정할 수 있다.

```javascript
// 버튼 내부에 <span>메뉴</span>가 있다고 가정한다.
menuButton.addEventListener("click", (event) => {
  console.log(event.target);        // 실제로 클릭이 시작된 요소
  console.log(event.currentTarget); // 이 리스너가 연결된 버튼
});
```

버튼 안의 `span`을 누르면 `target`이 `span`일 수 있다. 버튼 자체를 다루려는 리스너에서는 `currentTarget`이 명확하다. `currentTarget`은 이벤트 리스너가 실행되는 동안의 값이므로 비동기 작업 뒤에도 필요하다면 먼저 지역 변수에 보관한다. [MDN — currentTarget](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget)

브라우저에는 링크 이동과 폼 제출 같은 기본 동작이 있다. 이를 취소하고 JavaScript로 처리하려면 취소 가능한 이벤트에서 `preventDefault()`를 호출한다.

```javascript
// id="contact-form"인 폼이 존재하는 페이지에서 사용한다.
const form = document.querySelector("#contact-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("페이지 이동 없이 입력값을 검사합니다.");
});
```

`preventDefault()` 자체가 입력값을 검사하거나 메일을 전송하는 것은 아니다. 이 예제는 기본 제출 동작을 취소할 뿐이다. 또한 이벤트가 부모 요소로 전달되는 현상을 막는 `stopPropagation()`과도 역할이 다르다. [MDN — preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)

### 3.7 DOM 업데이트: 텍스트와 클래스

글자만 바꿀 때는 `textContent`를 사용한다. `innerHTML`은 문자열을 HTML로 해석하지만 `textContent`는 문자 그대로 넣는다. GitHub 설명이나 사용자 입력처럼 외부에서 받은 문구를 표시할 때는 `textContent`가 적합하다. [MDN — textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)

```javascript
// 설명 문자열에 태그처럼 생긴 내용이 있어도 텍스트로 표시한다.
const description = document.createElement("p");
description.textContent = "<strong>나의 프로젝트</strong>";
```

화면에 넣으려면 기존 컨테이너의 `append(description)` 등으로 연결해야 한다. `createElement()`로 만든 것만으로는 페이지에 나타나지 않는다. 위 코드는 태그가 아닌 `<strong>나의 프로젝트</strong>`라는 글자를 담은 문단을 만든다.

클래스를 바꾸면 CSS와 역할을 나눌 수 있다. 다음은 `header` 요소를 선택한 뒤 사용할 수 있는 문법 예시이다.

```javascript
header.classList.add("is-scrolled");          // 클래스 추가
header.classList.remove("is-scrolled");       // 클래스 제거
header.classList.toggle("is-scrolled");       // 있으면 제거, 없으면 추가
header.classList.toggle("is-scrolled", true); // 반드시 추가
```

두 번째 인자를 `true` 또는 `false`로 전달하면 상태에 맞춰 클래스 유무를 결정한다. `classList`의 클래스 이름에는 점을 붙이지 않는다. `.is-scrolled`의 점은 CSS 선택자 문법이다. [MDN — classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)

### 3.8 직접 실행: 버튼 하나로 학습 횟수 표시하기

빈 연습 폴더에서 다음 두 파일을 같은 위치에 저장하고 `index.html`을 로컬 서버로 연다. 기존 프로젝트 파일에 그대로 덮어쓰지 말고 개념 실습용으로 사용한다.

**`index.html`**

```html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>이벤트 연습</title>
  <script src="main.js" defer></script>
</head>
<body>
  <main>
    <h1>학습 기록</h1>
    <button id="study-button" type="button">오늘 공부하기</button>
    <p id="study-count" aria-live="polite">학습 횟수: 0회</p>
  </main>
</body>
</html>
```

**`main.js`**

```javascript
const studyButton = document.querySelector("#study-button");
const countText = document.querySelector("#study-count");
let count = 0;

const render = () => {
  countText.textContent = `학습 횟수: ${count}회`;
};

studyButton.addEventListener("click", () => {
  count += 1;
  render();
});

render();
```

기대 결과는 처음에 0회, 한 번 클릭하면 1회, 두 번 클릭하면 2회이다. 새로고침하면 `count`가 0부터 다시 시작한다. 저장 기능은 아직 추가하지 않았기 때문이다. `aria-live="polite"`는 변경된 문구를 보조 기술이 적절한 시점에 알릴 수 있게 한다.

`count += 1`이 상태 변경이고, `render()`가 DOM 업데이트이다. 마지막 `render()`는 첫 화면도 상태에서 계산하기 위한 호출이다. 포트폴리오의 메뉴에서는 `count` 대신 `isMenuOpen`, 테마에서는 `theme` 같은 상태를 사용할 수 있다.

### 3.9 흔한 실수와 확인 순서

| 증상 | 먼저 확인할 사항 |
|---|---|
| `null`에서 메서드를 읽을 수 없다는 오류 | 선택자의 철자, `#`·`.` 구분, DOM 생성 시점 |
| 클릭하기 전에 함수가 실행됨 | 등록할 때 `handleClick()`을 쓰지 않았는지 |
| 첫 번째 카드만 바뀜 | 여러 요소가 필요한데 `querySelector()`를 썼는지 |
| 폼에서 버튼을 누르자 새로고침됨 | 폼의 `submit` 처리와 버튼의 `type` |
| 숫자는 바뀌는데 화면은 그대로임 | 상태 변경 뒤 `render()`를 호출했는지 |
| 한 번 클릭했는데 여러 번 증가함 | 같은 리스너를 반복해서 등록했는지 |

리스너 등록은 초기화 단계에서 한 번 하고, 화면 갱신 함수는 화면 갱신에 집중하도록 구성하면 중복 등록을 피하기 쉽다.

### 3.10 실습과 복습

**실습:** 위 학습 기록 예제에 “초기화” 버튼을 추가한다. 새 버튼의 이벤트에서 `count = 0`으로 변경한 뒤 기존 `render()`를 재사용한다. 화면 문구를 별도 코드로 다시 조립하지 않는 것이 조건이다.

**복습 문제**

1. `querySelector("#missing")`와 `querySelectorAll(".missing")`의 결과는 어떻게 다른가?
2. `addEventListener("click", render)`와 `addEventListener("click", render())`의 차이는 무엇인가?
3. 버튼 안의 아이콘을 클릭했을 때 버튼을 가리키는 값은 `target`인가, `currentTarget`인가?
4. `count = 10`만 실행했는데 화면이 바뀌지 않는 이유는 무엇인가?

<details>
<summary>해설 보기</summary>

1. 일치하는 요소가 없다는 가정에서 첫 번째는 `null`, 두 번째는 길이 0인 `NodeList`이다.
2. 앞의 코드는 함수 자체를 등록한다. 뒤의 코드는 등록 과정에서 함수를 먼저 실행하고 반환값을 넘긴다.
3. 리스너를 버튼에 연결했다면 `currentTarget`이다. `target`은 내부 아이콘일 수 있다.
4. 일반 변수의 변경은 DOM을 자동으로 바꾸지 않는다. 현재 상태를 읽어 DOM에 반영하는 코드가 필요하다.

</details>

**스스로 설명하는 예문:** “HTML에서 버튼의 ID를 정한 뒤 `querySelector`로 해당 DOM 요소를 찾았다. `addEventListener`에는 클릭 시 실행할 함수를 전달했다. 클릭하면 상태값을 바꾸고, 렌더링 함수가 그 값을 읽어 텍스트를 갱신하도록 역할을 나눴다.”

<a id="chapter-4"></a>

## 4장. 데이터를 다루는 JavaScript 문법

### 4.1 학습 목표와 예제 실행 방법

이 장에서는 함수로 작업을 표현하고, 객체에서 필요한 값을 꺼내고, 배열을 화면에 필요한 형태로 바꾸는 방법을 배운다. 문법을 짧게 쓰는 것보다 **입력 데이터가 어떤 결과로 바뀌는지**를 설명하는 것이 목표이다.

별도로 표시한 이벤트 문법 예시를 제외한 실행 예제는 브라우저 개발자 도구의 Console에서 각각 실행할 수 있다. 예제를 감싼 `{ ... }`는 변수의 유효 범위를 분리하기 위한 블록이다. 같은 이름의 `const`를 반복 선언하는 오류를 줄이기 위해 바깥 중괄호도 함께 복사한다. 기존 파일에 합칠 때는 필요한 이름과 범위를 정리한다.

### 4.2 `const`와 `let`: 무엇을 바꿀 수 있는가?

다른 값을 다시 대입할 변수에는 `let`을 사용한다. 다시 대입하지 않을 이름에는 `const`를 사용한다. `const`가 막는 것은 그 이름에 다른 값을 대입하는 일이며, 객체 내부의 값 변경까지 금지하는 것은 아니다. [MDN — const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

```javascript
{
  let selectedLanguage = "all";
  selectedLanguage = "JavaScript"; // 다시 대입할 수 있다.

  const profile = { name: "학습자", projectCount: 0 };
  profile.projectCount = 3; // 같은 객체의 속성 변경은 가능하다.

  const topics = ["HTML", "CSS"];
  topics.push("JavaScript"); // 같은 배열에 항목을 추가할 수 있다.

  console.log(selectedLanguage); // JavaScript
  console.log(profile.projectCount); // 3
  console.log(topics.length); // 3
  // profile = {}; // const 이름에 다른 객체를 대입하면 오류이다.
}
```

DOM 요소를 `const button = ...`으로 저장해도 `button.textContent`를 바꿀 수 있는 이유도 같다. 변수 이름이 가리키는 요소를 교체하지 않고, 그 요소의 내용을 변경하는 것이다.

### 4.3 화살표 함수: 수행할 작업을 값으로 전달하기

함수는 입력을 받아 작업을 수행하거나 결과를 반환하는 코드 묶음이다. 함수도 값으로 취급되므로 변수에 저장하거나 다른 함수의 인자로 전달할 수 있다. 화살표 함수는 함수를 표현하는 문법 중 하나이며 `map`, `filter`, 이벤트 리스너의 콜백에서 자주 사용한다.

```javascript
{
  const addOne = (number) => {
    return number + 1;
  };
  const addTwo = (number) => number + 2;

  console.log(addOne(3)); // 4
  console.log(addTwo(3)); // 5
}
```

`(number)`는 매개변수, `=>` 오른쪽은 실행할 내용이다. 중괄호를 사용한 본문은 결과를 돌려주려면 `return`이 필요하다. 표현식 하나를 바로 쓰는 형태는 그 결과를 자동 반환한다. 객체를 바로 반환할 때는 본문과 구분하기 위해 괄호로 감싼다. [MDN — 화살표 함수](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

```javascript
{
  const broken = (number) => { number * 2; };
  const correct = (number) => number * 2;
  const makeProject = (name) => ({ name, featured: false });

  console.log(broken(4)); // undefined: 계산만 하고 반환하지 않았다.
  console.log(correct(4)); // 8
  console.log(makeProject("portfolio"));
  // { name: "portfolio", featured: false }
}
```

화살표 함수는 일반 함수와 모든 동작이 같지 않다. 특히 자신만의 `this`를 만들지 않고 바깥 문맥의 `this`를 사용한다. 따라서 이벤트 리스너의 화살표 함수 안에서 `this`가 클릭한 버튼이라고 가정하면 안 된다. 다음은 `button`을 이미 선택했다는 가정의 문법 예시이다.

```javascript
button.addEventListener("click", (event) => {
  event.currentTarget.textContent = "선택됨";
});
```

이 과제에서는 버튼을 가리킬 때 `event.currentTarget`을 사용하면 의도가 분명하다. 화살표 함수를 쓴다는 사실이 자동으로 실행 속도나 코드 품질을 높이는 것은 아니다. 콜백의 입력·출력·책임을 명확히 하는 것이 더 중요하다.

### 4.4 템플릿 리터럴: 데이터로 문장 만들기

템플릿 리터럴은 백틱으로 둘러싼 문자열이다. `${표현식}` 자리에 계산 결과를 넣을 수 있어 API 데이터를 문구로 만들 때 편리하다. 작은따옴표나 큰따옴표로 감싸면 이 삽입 문법이 동작하지 않는다. [MDN — 템플릿 리터럴](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

```javascript
{
  const language = "JavaScript";
  const count = 2;
  const message = `${language} 프로젝트: ${count}개`;
  console.log(message); // JavaScript 프로젝트: 2개
}
```

템플릿 리터럴은 문자열을 만드는 문법이지 HTML을 안전하게 만드는 기능이 아니다. 외부 데이터가 섞인 문자열을 화면에 표시할 때는 앞 장에서 배운 `textContent`를 사용한다.

### 4.5 구조분해 할당: 필요한 값을 이름으로 꺼내기

API 응답에는 이름, 설명, 주소 등 여러 속성이 들어 있다. 구조분해 할당은 객체나 배열의 값을 꺼내 변수에 담는 문법이다. 객체에서는 **속성 이름**, 배열에서는 **순서**를 기준으로 꺼낸다. [MDN — 구조분해 할당](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring)

```javascript
{
  const repository = {
    name: "portfolio",
    description: null,
    language: "JavaScript",
  };

  const { name, language } = repository;
  const { name: projectName } = repository; // 다른 변수 이름으로 받기
  const [first, second] = ["HTML", "CSS"];

  console.log(name, language); // portfolio JavaScript
  console.log(projectName); // portfolio
  console.log(first, second); // HTML CSS
}
```

`{ name: projectName }`은 `name` 속성을 읽어 `projectName`이라는 변수에 저장한다. 객체의 속성 이름을 바꾸거나 원본을 수정하는 코드는 아니다. `[first, second]`는 배열의 첫 번째, 두 번째 값을 차례로 받는다.

기본값은 해당 값이 `undefined`일 때 적용되며 `null`에는 적용되지 않는다. GitHub의 설명이나 언어처럼 `null`이 올 수 있는 데이터는 이를 구분해야 한다.

```javascript
{
  const repository = { description: null };
  const { description = "설명 없음", language = "미분류" } = repository;
  const visibleDescription = description ?? "설명 없음";

  console.log(description); // null
  console.log(language); // 미분류: 속성이 없어서 undefined이다.
  console.log(visibleDescription); // 설명 없음
}
```

`??`는 왼쪽 값이 `null` 또는 `undefined`일 때 오른쪽 값을 사용한다. 빈 문자열 `""`까지 대체하지는 않는다. 또한 `null` 객체 자체에서 구조분해하면 오류가 발생한다. 응답 구조를 확인하지 않은 채 모든 데이터를 객체라고 가정하지 않는다.

### 4.6 `map`, `filter`, `forEach`의 선택 기준

배열은 저장소 목록처럼 여러 항목을 순서대로 담는다. 배열 메서드를 선택할 때 먼저 원하는 결과를 문장으로 정한다. “각 항목을 바꾼 새 목록이 필요한가?”, “일부만 골라야 하는가?”, “하나씩 작업만 해야 하는가?”가 선택 기준이다.

| 메서드 | 질문 | 반환값 | 일반적인 결과 길이 | 사용 예 |
|---|---|---|---|---|
| `map` | 각 항목을 무엇으로 바꿀까? | 변환한 새 배열 | 입력과 같음 | 저장소 객체 → 카드용 객체 |
| `filter` | 어떤 항목을 남길까? | 조건에 맞는 새 배열 | 입력 이하 | JavaScript 저장소만 선택 |
| `forEach` | 각 항목으로 어떤 작업을 할까? | `undefined` | 결과 배열 없음 | 요소마다 이벤트 연결 |

다음 예제는 숫자로 변환·선별·실행의 차이를 보여준다. [MDN — map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) · [MDN — filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) · [MDN — forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

```javascript
{
  const numbers = [1, 2, 3, 4];
  const doubled = numbers.map((number) => number * 2);
  const even = numbers.filter((number) => number % 2 === 0);
  const result = numbers.forEach((number) => console.log(number));

  console.log(doubled); // [2, 4, 6, 8]
  console.log(even); // [2, 4]
  console.log(result); // undefined
  console.log(numbers); // [1, 2, 3, 4]
}
```

`map`의 콜백은 변환한 값을 반환한다. `filter`의 콜백은 남길 항목에 대해 참으로 판단되는 값을 반환한다. 예제의 `number % 2 === 0`은 짝수이면 `true`이다. `forEach`는 작업을 수행하는 데 사용하며 반환값으로 새 배열을 얻으려고 선택하지 않는다.

### 4.7 GitHub 형태의 데이터에서 `filter → map` 적용하기

다음은 API를 호출하지 않는 독립적인 콘솔 예제이다. 가상 저장소 세 개 중 JavaScript 저장소만 골라 화면용 데이터로 바꾼다. **프로젝트를 언어 등으로 필터링하는 기능은 미션의 선택 과제**이다. `filter` 문법을 이해하는 것과 필터 UI를 필수 구현하는 것은 구분한다.

```javascript
{
  const repositories = [
    { id: 101, name: "portfolio", language: "JavaScript", description: "자기소개 페이지" },
    { id: 102, name: "layout-lab", language: "CSS", description: "배치 연습" },
    { id: 103, name: "quiz", language: "JavaScript", description: null },
  ];

  const cards = repositories
    .filter((repository) => repository.language === "JavaScript")
    .map(({ id, name, language, description }) => ({
      id,
      title: name,
      subtitle: `${language} 프로젝트`,
      description: description ?? "아직 설명을 작성하지 않았습니다.",
    }));

  console.log(cards);
  console.log(repositories.length); // 3: 원본 목록의 길이는 유지된다.
}
```

결과는 `portfolio`와 `quiz`에 해당하는 객체 두 개이다. `quiz`의 설명에는 대체 문구가 들어간다. 이 코드의 흐름을 읽으면 다음과 같다.

1. `filter`가 각 저장소의 `language`를 확인하여 두 항목을 남긴다.
2. `map`이 남은 객체에서 필요한 속성을 구조분해로 꺼낸다.
3. 각 항목을 `title`, `subtitle`, `description`을 가진 새 객체로 바꾼다.
4. `cards`에는 화면을 만들기 위한 배열이 저장된다. 아직 DOM은 바뀌지 않는다.

데이터 변환과 DOM 생성을 구분하면 API 응답의 모든 속성을 화면 코드가 직접 다룰 필요가 줄어든다. 이후 렌더링 함수가 `cards`를 읽어 요소를 생성하고 붙이는 역할을 맡을 수 있다.

### 4.8 새 배열이라는 말이 모든 내부 객체의 복사를 뜻하지는 않는다

`map`과 `filter`는 새 배열을 반환한다. 그러나 배열 안의 객체까지 자동으로 깊게 복사하지는 않는다. 콜백에서 원본 객체를 수정하면 원본 데이터도 바뀔 수 있다.

```javascript
{
  const original = [{ name: "portfolio", stars: 1 }];
  const selected = original.filter((project) => project.stars > 0);
  selected[0].stars = 9;

  console.log(original[0].stars); // 9: 같은 객체를 가리킨다.

  const renamed = original.map((project) => ({
    ...project,
    name: project.name.toUpperCase(),
  }));
  console.log(renamed[0].name); // PORTFOLIO
  console.log(original[0].name); // portfolio
}
```

`...project`는 속성을 새 객체에 펼치는 문법이다. 이 예제에서는 새 객체의 `name`만 바꾼다. 이것도 얕은 복사이므로 중첩된 객체가 있다면 내부 참조는 공유될 수 있다. 처음에는 “원본을 건드리지 않고 필요한 결과값을 반환한다”는 원칙으로 콜백을 작성하는 것이 좋다.

### 4.9 흔한 실수와 개선

| 실수 | 결과와 개선 방법 |
|---|---|
| `map((item) => { item.name; })` | 반환이 없어 `undefined`가 담긴다. `return`을 쓰거나 본문 중괄호를 제거한다. |
| `filter((item) => item.language = "CSS")` | 비교가 아닌 대입이다. 비교에는 `===`를 사용한다. |
| `const result = items.forEach(...)` | 새 목록 대신 `undefined`를 받는다. 변환 결과가 필요하면 `map`을 검토한다. |
| 구조분해의 기본값이 `null`도 처리한다고 생각함 | 기본값은 `undefined`에만 적용된다. 필요한 경우 `??`를 사용한다. |
| `const` 배열은 항목도 바꿀 수 없다고 생각함 | 이름의 재대입과 내부 내용 변경을 구분한다. |
| `map`이면 원본 변경이 불가능하다고 생각함 | 콜백이 객체를 수정할 수 있다. 새 객체를 반환하도록 작성한다. |

### 4.10 실습과 복습

**실습:** 4.7의 가상 데이터에 HTML 프로젝트를 하나 추가한다. `filter`의 조건을 “설명이 있는 저장소”로 바꾸고, `map`으로 저장소 이름만 담은 배열을 만든다. 우선 설명은 비어 있지 않은 문자열이거나 `null`이라고 가정한다. 원본 배열의 객체를 수정하지 않는 것이 조건이다.

**복습 문제**

1. 숫자 목록에서 10 이상인 항목만 고르려면 어떤 메서드를 사용하는가?
2. 저장소 객체 목록에서 이름 문자열 목록을 만들려면 어떤 메서드를 사용하는가?
3. `({ name }) => name`에서 `{ name }`은 무엇을 하는가?
4. `filter`로 얻은 배열의 첫 객체를 수정했더니 원본 객체도 바뀐 이유는 무엇인가?
5. 화살표 함수 본문의 중괄호를 추가한 뒤 결과가 `undefined`가 됐다면 무엇을 확인해야 하는가?

<details>
<summary>해설과 실습 힌트 보기</summary>

1. `filter((number) => number >= 10)`을 사용한다.
2. `map((repository) => repository.name)`을 사용한다.
3. 매개변수로 받은 객체에서 `name` 속성을 꺼내 지역 변수로 받는 구조분해이다.
4. 새 배열을 만들었어도 내부 객체 참조를 공유하기 때문이다.
5. 중괄호 본문에서 `return`을 빠뜨렸는지 확인한다.

실습에서는 `repositories.filter(({ description }) => description !== null && description !== "").map(({ name }) => name)`으로 결과를 만들 수 있다. 실제 외부 데이터에서는 속성 누락이나 타입도 확인하도록 검증을 확장한다.

</details>

**스스로 설명하는 예문:** “화살표 함수로 각 항목을 처리할 콜백을 작성했다. 구조분해로 저장소 객체의 필요한 속성만 꺼냈고, `filter`로 표시 조건에 맞는 항목을 고른 뒤 `map`으로 화면용 데이터로 변환했다. 원본 객체를 직접 수정하지 않고 결과를 반환하도록 구성했다.”

<a id="chapter-5"></a>

## 5장. 외부 데이터를 가져오고 상태에 맞는 화면 만들기

### 5.1 이 장의 학습 목표

이 장에서는 GitHub에 공개된 저장소 정보를 가져와 Projects 영역에 표시하는 과정을 배운다. 코드를 다 읽은 뒤에는 다음 질문에 답할 수 있어야 한다.

- API를 호출한다는 말은 실제로 무엇을 요청한다는 뜻인가?
- `fetch()`의 결과와 `response.json()`의 결과는 어떻게 다른가?
- 네트워크 오류와 HTTP 오류는 코드에서 어떻게 처리하는가?
- 로딩·성공·실패·빈 상태를 왜 따로 표현하는가?
- 재시도 버튼은 기존 요청 함수를 어떻게 다시 실행하는가?

이번 장의 실습은 API 흐름에 집중한다. [6장](#chapter-6)에서는 이를 상태 객체, 배열 필터링, DOM 렌더링과 연결해 하나의 기능으로 확장한다.

### 5.2 API·HTTP·JSON을 구별하기

포트폴리오의 프로젝트 카드를 HTML에 직접 적으면 저장소가 늘어날 때마다 HTML도 고쳐야 한다. GitHub가 가진 저장소 정보를 요청하고 그 결과로 카드를 만들면, 다음 조회 때 새 정보를 화면에 반영할 수 있다. 이것이 이번 과제에서 말하는 API 연동이다.

| 용어 | 이 과제에서의 의미 | 비유 |
|---|---|---|
| API | 프로그램이 GitHub의 정해진 기능을 이용하는 방법 | 주문할 수 있는 메뉴와 주문 규칙 |
| HTTP | 브라우저와 서버가 요청·응답을 주고받는 통신 규칙 | 주문과 답변을 전달하는 방식 |
| 엔드포인트 | API의 특정 기능을 요청하는 주소 | 특정 주문을 받는 창구 |
| JSON | 응답 데이터를 표현하는 텍스트 형식 | 정해진 양식으로 적힌 주문 결과 |

사용자 저장소 목록을 조회하는 엔드포인트는 다음과 같다.

```text
GET https://api.github.com/users/USERNAME/repos
```

`GET`은 조회를 요청하는 HTTP 메서드이고, `USERNAME`은 실제 GitHub 사용자 이름으로 바꿀 자리이다. `GET`이라는 글자를 URL에 붙여 입력하는 것은 아니다. 이 API는 해당 사용자의 **공개 저장소**를 반환하며 공개 자료 조회에는 인증 토큰이 필요 없다. 브라우저용 실습 코드에도 토큰을 넣지 않는다. [GitHub 공식 API 문서](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user)

응답에는 많은 필드가 있지만, 다음은 우리가 사용할 내용만 남긴 가상의 JSON 예시이다.

```json
[
  {
    "name": "my-portfolio",
    "description": "HTML과 CSS로 만든 자기소개 페이지",
    "language": "JavaScript",
    "html_url": "https://github.com/example-user/my-portfolio"
  }
]
```

바깥쪽 `[]`는 목록, 안쪽 `{}`는 저장소 하나를 나타낸다. JSON은 전송에 쓰이는 텍스트 형식이다. 이를 해석하면 JavaScript의 배열과 객체로 다룰 수 있다. 저장소가 여러 개이면 객체가 여러 개 들어 있고, 저장소가 없으면 빈 배열 `[]`이 온다. 설명이 없는 저장소의 `description`은 `null`일 수 있으므로 화면에서 사용할 대체 문구도 정해야 한다.

### 5.3 왜 비동기 처리가 필요한가?

변수에 숫자를 더하는 작업은 대개 바로 끝나지만, 서버에 요청을 보내는 작업은 도착 시간을 미리 알 수 없다. 네트워크를 기다리는 동안에도 사용자는 메뉴를 열거나 페이지를 스크롤할 수 있어야 한다.

**동기 흐름**은 현재 작업을 처리한 뒤 다음 작업으로 진행한다. **비동기 흐름**은 시간이 걸리는 작업을 시작하고, 그 결과가 준비되었을 때 이어서 처리할 수 있게 한다. 네트워크 요청을 기다리는 `await`는 해당 `async` 함수의 뒤쪽 진행을 잠시 멈춘다. 브라우저 전체의 실행을 정지시키는 명령이 아니다.

```javascript
async function readProject() {
  console.log("1. 요청 시작");
  const response = await fetch("https://api.github.com/users/octocat/repos");
  console.log("3. 응답 도착", response.status);
}

readProject();
console.log("2. 응답을 기다리는 동안 다른 코드 실행");
```

정상 응답을 받는 경우 출력 순서는 1 → 2 → 3이다. 요청이 끝나기 전에도 함수 바깥의 코드는 계속 진행한다. 이 코드는 실행 순서를 관찰하기 위한 조각이므로, 실제 화면에서는 뒤의 완성 예제처럼 오류 처리도 함께 작성한다.

`async`를 붙이면 무거운 계산까지 자동으로 별도 작업 공간에서 실행되는 것은 아니다. 긴 반복문처럼 JavaScript 실행 시간을 많이 쓰는 작업은 여전히 화면 반응을 지연시킬 수 있다. 여기서 배우는 비동기는 특히 **네트워크 응답을 기다리는 시간**을 다루는 방법이다.

### 5.4 Promise, async, await의 역할

`Promise`는 나중에 완료될 작업의 결과를 나타내는 객체이다. 아직 진행 중인 `pending`, 결과가 준비된 `fulfilled`, 실패한 `rejected` 상태를 갖는다. `fetch()`는 바로 저장소 배열을 반환하지 않고 Promise를 반환한다. [MDN — Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

`async` 함수 역시 항상 Promise를 반환한다. 함수 안에서 배열을 `return`해도, 함수를 호출한 쪽은 우선 Promise를 받는다. `await`는 그 결과가 준비되면 값을 꺼내 다음 줄로 진행하고, 실패하면 예외가 발생한 것처럼 처리하게 한다. 이 장의 일반 `<script>` 예제에서는 `await`를 `async` 함수 내부에서 사용한다. [MDN — async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

```javascript
async function getExampleName() {
  return "my-portfolio";
}

async function showExampleName() {
  const name = await getExampleName();
  console.log(name); // "my-portfolio"
}
```

API에서는 보통 두 번 기다린다.

```javascript
const response = await fetch(url);     // ① 서버 응답을 받는다.
const repositories = await response.json(); // ② 본문을 읽고 JSON을 해석한다.
```

첫 번째 결과인 `response`는 상태 코드, 헤더, 응답 본문을 다루는 기능을 가진 `Response` 객체이다. 저장소 배열 자체가 아니다. 두 번째 결과인 `repositories`가 실제 JavaScript 배열이다. `json()`도 비동기 메서드이므로 `await`가 필요하다. `response.json()`은 같은 응답에 대해 여러 번 호출하지 않고 읽은 결과를 변수에 보관해 사용한다. [MDN — Response.json()](https://developer.mozilla.org/en-US/docs/Web/API/Response/json)

### 5.5 실패는 한 가지가 아니다

다음 코드를 읽을 때 가장 중요한 부분은 `response.ok` 검사이다.

```javascript
try {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP 오류: ${response.status}`);
  }

  const repositories = await response.json();
  // 여기에서 화면을 만든다.
} catch (error) {
  // 네트워크 실패, 직접 throw한 HTTP 오류, JSON 해석 오류 등이 이곳에 온다.
  console.error(error);
} finally {
  // 성공·실패와 관계없이 로딩 표시를 끝내는 정리 작업을 한다.
}
```

| 구분 | 예시 | 코드의 반응 |
|---|---|---|
| 네트워크 차원의 실패 | 오프라인, 네트워크 연결 실패 | `fetch()`가 reject되고 `catch`로 이동할 수 있음 |
| HTTP 오류 응답 | 서버가 404 또는 500을 응답 | `fetch()`만으로는 자동 실패 처리되지 않으므로 `response.ok` 검사 |
| 데이터 해석 실패 | 본문이 올바른 JSON이 아님 | `response.json()`에서 오류 발생 가능 |
| 예상과 다른 데이터 | 저장소 배열 대신 다른 값이 옴 | `Array.isArray()` 등으로 확인 후 직접 오류 처리 |

`response.ok`는 상태 코드가 200~299이면 `true`이다. 서버가 오류 응답을 보내 왔다는 것은 “응답 자체를 받지 못했다”와 다르다. 그래서 `fetch()`는 HTTP 404나 500만으로 Promise를 reject하지 않는다. **통신 결과를 받는 단계와 응답을 성공으로 판정하는 단계를 구별해야 한다.** [MDN — Response.ok](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok) · [MDN — 응답 상태 확인](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_response_status)

`throw`는 현재 흐름에서 오류를 발생시키는 명령이다. `catch`는 그 오류에 대한 처리를 맡고, `finally`는 성공·실패 어느 쪽이든 필요한 정리를 맡는다. `finally`에서 무조건 “성공” 상태를 설정하면 실패 화면까지 덮어쓰므로, 여기에는 버튼 비활성화 해제 같은 공통 작업을 둔다.

### 5.6 네 가지 UI 상태를 먼저 설계하기

화면 상태는 통신 과정과 데이터를 사용자가 이해할 수 있는 표현으로 바꾼 결과이다. 이 교재에서는 성공하면서 데이터가 없는 경우를 별도의 `empty` 상태로 구분한다. 빈 상태를 성공 상태 안의 조건으로 구현하는 것도 가능하다.

| 상태 | 판단 기준 | 사용자가 볼 내용 | 재시도 버튼 |
|---|---|---|---|
| `loading` | 요청을 시작했고 아직 결과를 처리하지 못함 | “프로젝트를 불러오는 중…” | 숨김·비활성화 |
| `success` | 정상 응답이며 데이터가 한 개 이상 | 프로젝트 목록 | 숨김 |
| `empty` | 정상 응답이며 배열 길이가 0 | “표시할 공개 저장소가 없습니다.” | 숨김 |
| `error` | 요청·HTTP 처리·데이터 처리 중 실패 | 실패 안내 | 표시 |

오류가 났는데 빈 목록이라고 안내하면 사용자는 자신의 저장소가 없다고 오해할 수 있다. 반대로 빈 배열을 오류로 처리하면 정상적인 결과를 실패로 오해하게 된다. 로딩 화면도 필요하다. 목록이 나타나기 전 아무 안내가 없으면 사용자는 페이지가 멈췄는지 판단하기 어렵다.

```text
페이지 진입 또는 재시도 클릭
            ↓
          loading
        ↙    ↓    ↘
    error  empty  success
      ↓
재시도 클릭 → loading → 결과에 맞는 상태
```

### 5.7 독립 실습: GitHub 저장소 목록과 재시도 버튼

다음 두 파일을 같은 실습 폴더에 만들고 로컬 웹 서버로 연다. 이 예제에는 카드 디자인을 위한 CSS가 없으므로 기본 목록으로 표시된다. JavaScript의 `USERNAME`만 본인 아이디로 변경한다. 먼저 코드를 읽고 실행 흐름을 예상한 다음 실행한다.

**`index.html`**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GitHub 프로젝트 조회 연습</title>
  <script src="main.js" defer></script>
</head>
<body>
  <main>
    <h1>내 공개 프로젝트</h1>
    <p id="project-status" role="status" aria-live="polite"></p>
    <ul id="project-list" aria-label="공개 저장소 목록"></ul>
    <button id="retry-button" type="button" hidden>다시 시도</button>
  </main>
</body>
</html>
```

**`main.js`**

```javascript
const USERNAME = "octocat"; // 본인 GitHub 아이디로 변경한다.
const statusElement = document.querySelector("#project-status");
const listElement = document.querySelector("#project-list");
const retryButton = document.querySelector("#retry-button");
let isLoading = false;
let request = fetch; // 5.9절에서는 이 자리에 가짜 요청 함수를 넣는다.

async function loadRepositories() {
  if (isLoading) return; // 진행 중인 요청이 있으면 중복 실행하지 않는다.
  isLoading = true;
  statusElement.textContent = "프로젝트를 불러오는 중…";
  listElement.replaceChildren();
  listElement.setAttribute("aria-busy", "true");
  retryButton.hidden = true;
  retryButton.disabled = true;

  try {
    const username = encodeURIComponent(USERNAME);
    const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&page=1`;
    const response = await request(url, {
      headers: { Accept: "application/vnd.github+json" }
    });

    if (!response.ok) {
      throw new Error(`GitHub 응답 오류: HTTP ${response.status}`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("저장소 목록이 배열이 아닙니다.");
    }

    if (repositories.length === 0) {
      statusElement.textContent = "표시할 공개 저장소가 없습니다.";
      return; // return하더라도 아래 finally는 실행된다.
    }

    const fragment = document.createDocumentFragment();
    repositories.forEach((repository) => {
      const item = document.createElement("li");
      const name = document.createElement("strong");
      const description = document.createElement("p");
      name.textContent = repository.name;
      description.textContent = repository.description ?? "설명이 없는 저장소입니다.";
      item.append(name, description);
      fragment.append(item);
    });

    listElement.append(fragment);
    statusElement.textContent = `${repositories.length}개의 공개 저장소를 불러왔습니다.`;
  } catch (error) {
    statusElement.textContent = "프로젝트를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.";
    retryButton.hidden = false;
    console.error("저장소 조회 실패:", error);
  } finally {
    isLoading = false;
    retryButton.disabled = false;
    listElement.setAttribute("aria-busy", "false");
  }
}

retryButton.addEventListener("click", () => loadRepositories());
loadRepositories();
```

`request`는 새로운 브라우저 기능이 아니라, 여기서 만든 변수이다. 처음에는 브라우저가 제공하는 `fetch` 함수를 담아 두었으므로 `request(url)`가 실제 요청을 실행한다. 이처럼 함수를 변수에 넣으면 나중에 테스트용 함수로 교체하기 쉽다.

`encodeURIComponent()`는 사용자 이름을 URL 경로에 넣기 적절한 표현으로 바꾸고, `??`는 왼쪽 값이 `null` 또는 `undefined`일 때만 오른쪽 대체 문구를 사용한다. `DocumentFragment`는 여러 요소를 한 묶음으로 준비하는 임시 DOM 컨테이너이다. 별도 설치가 필요한 라이브러리가 아니다.

저장소의 이름과 설명은 외부에서 받은 문자열이므로 `textContent`로 넣었다. 문자열에 `<`나 `>`가 있어도 HTML 태그로 실행되지 않고 문자로 표시된다. 이번 작은 실습은 이름과 설명만 표시하지만, 6장에서는 링크와 필터를 포함한 카드 구조로 확장한다.

화면 상태 문구에는 `role="status"`와 `aria-live="polite"`를 두어 보조 기술이 변경을 알릴 수 있게 했다. `aria-busy`는 목록을 갱신 중임을 알리는 속성이다. 둘 다 요청 자체를 실행하거나 시각적인 로딩 애니메이션을 만드는 기능은 아니다.

### 5.8 API를 실제로 사용할 때 알아둘 범위

위 URL의 `?` 뒤는 조회 옵션인 쿼리 문자열이다. `sort=updated`는 최근 갱신 순으로 조회하는 설정이고, `per_page=100`은 한 페이지의 최대 항목 수를 100으로 요청한다. 이 API의 기본값은 한 페이지 30개이며, `per_page`의 최댓값은 100이다. **이 예제는 첫 페이지 최대 100개만 가져온다.** 저장소가 100개를 넘는 사용자의 전체 목록이 필요하면 다음 페이지를 조회하는 페이지네이션을 구현해야 한다. [GitHub — 저장소 조회 매개변수](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user) · [GitHub — 페이지네이션](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api)

무인증 REST API 요청의 기본 한도는 요청 출발 IP 주소 기준 시간당 60회이다. 같은 네트워크의 다른 사용자가 사용량에 영향을 줄 수 있다. 공식 문서 기준 확인일은 2026-10-19이며, 실제 한도 상태는 응답의 관련 헤더로 확인한다. [GitHub — 요청 제한](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)

403 또는 429를 받았을 때 숫자만 보고 원인을 모두 똑같이 처리해서는 안 된다. 특히 403은 요청 제한 이외의 접근 거부 상황에서도 쓰일 수 있다. GitHub 오류 응답의 메시지와 `x-ratelimit-remaining`, `x-ratelimit-reset`, `retry-after` 같은 헤더를 함께 읽는다. 요청 제한임을 확인했다면 GitHub가 안내하는 시점까지 기다린다. 재시도 버튼을 계속 누르거나 자동 반복 요청으로 해결하지 않는다. [GitHub — 제한 초과 시 대응](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api#exceeding-the-rate-limit) · [GitHub — REST API 문제 해결](https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api)

위 실습은 오류 안내와 수동 재시도라는 기본 동작을 보여준다. 재시도 가능 시각 표시, 여러 페이지 수집, 응답 캐시 등은 별도로 확장할 수 있다. 공개 프런트엔드 파일에 개인 토큰을 추가하는 방식으로 요청 제한을 해결해서는 안 된다. 배포된 JavaScript는 방문자가 읽을 수 있기 때문이다.

### 5.9 네트워크를 반복 호출하지 않고 네 상태 검증하기

좋은 테스트는 “지금 GitHub에 우연히 어떤 데이터가 있는가”에 의존하지 않는다. 아래 함수를 `main.js`에 추가하고 `let request = fetch;`를 `let request = createFakeFetch("success");`로 바꾼다. 함수 선언문이므로 파일의 마지막에 추가해도 사용할 수 있다. 그 뒤 새로고침하면 실제 GitHub 대신 가짜 응답을 사용한다.

```javascript
function createFakeFetch(mode) {
  let attempt = 0;

  return async () => {
    attempt += 1;
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (mode === "network-error" || (mode === "retry" && attempt === 1)) {
      throw new TypeError("연습용 네트워크 실패");
    }
    if (mode === "http-error") {
      return new Response('{"message":"연습용 서버 오류"}', { status: 503 });
    }

    const sample = mode === "empty" ? [] : [
      { name: "practice-portfolio", description: "로컬 테스트용 저장소" },
      { name: "<b>문자 그대로 보이는 이름</b>", description: null }
    ];
    return new Response(JSON.stringify(sample), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  };
}
```

여기서 `JSON.stringify()`는 JavaScript 배열을 JSON 문자열로 바꾼다. `Response`는 브라우저가 제공하는 응답 객체이며, 실제 요청 없이도 실습에 필요한 상태 코드와 본문을 갖춘 객체를 만들 수 있다. 이 테스트에서는 `request`가 그 객체를 반환하므로 요청 이후의 코드를 그대로 검증한다.

| `createFakeFetch()`에 넣는 값 | 관찰할 결과 |
|---|---|
| `"success"` | 약 1.2초 동안 로딩 후 목록 두 개 표시; 두 번째 이름의 `<b>`가 태그가 아닌 문자로 보임 |
| `"empty"` | 로딩 후 빈 상태 안내; 오류·재시도 버튼 없음 |
| `"http-error"` | HTTP 503을 `response.ok` 검사에서 잡고 오류 안내와 재시도 버튼 표시 |
| `"network-error"` | 응답 자체를 받지 못하는 경우에도 오류 안내와 재시도 버튼 표시 |
| `"retry"` | 첫 시도는 실패하고, 재시도 버튼을 한 번 누르면 성공 목록 표시 |

모든 모드에서 지연 시간 동안 로딩 상태를 관찰할 수 있다. 재시도 중 버튼이 숨겨지고 중복 요청이 막히는지도 확인한다. 테스트를 마치면 `let request = fetch;`로 되돌려 실제 계정과 연동한다. 가짜 응답은 UI 분기와 재시도 동작을 검사하지만 실제 GitHub 주소, 인터넷 연결, API 정책까지 검증하는 것은 아니므로 마지막에는 실제 조회도 한 번 확인한다.

### 5.10 개발자 도구에서 확인하는 순서

실제 연동에 문제가 있으면 다음 순서로 관찰하면 원인을 좁힐 수 있다.

1. **Console**에서 JavaScript 오류를 읽는다. 선택한 DOM이 `null`인지, 문법 오류가 있는지 확인한다.
2. **Network**에서 `repos` 요청이 존재하는지 찾는다. 요청이 없으면 함수 호출과 이벤트 연결부터 확인한다.
3. **Request URL / Method**에서 계정 이름, 경로, `GET`, 쿼리 문자열을 확인한다.
4. **Status**에서 HTTP 상태 코드를 확인한다. 요청이 완료되지 않았다면 네트워크 오류도 확인한다.
5. **Response / Preview**에서 배열이 왔는지, 빈 배열인지, 오류 메시지 객체인지 읽는다.
6. **Headers**에서 필요할 때 요청 제한 관련 값을 읽는다.
7. 응답은 정상인데 화면이 틀리면 DOM 선택, 데이터 필드 이름, 화면 갱신 코드를 살핀다.

가짜 요청을 사용하는 동안에는 실제 `fetch`가 실행되지 않으므로 GitHub 요청이 Network에 나타나지 않는 것이 정상이다. CORS 오류가 난다고 `mode: "no-cors"`를 추가하면 응답 내용을 JavaScript로 읽을 수 없게 될 수 있으므로 해결책이 되지 않는다. 먼저 요청 주소와 서버 응답을 확인한다. [MDN — 교차 출처 요청](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#making_cross-origin_requests)

### 5.11 설계를 설명하는 모범 답안

> GitHub 공개 저장소 API에 `fetch`로 GET 요청을 보냈다. 요청을 시작할 때 로딩 문구를 보여주고, `await`로 응답을 기다린 뒤 `response.ok`를 검사했다. 정상 응답이면 `response.json()`으로 본문을 배열로 바꾸고, 항목이 있으면 목록을, 없으면 빈 상태 안내를 표시했다. 네트워크 실패나 HTTP 오류 등은 `catch`에서 오류 상태로 표현하고 재시도 버튼을 보여주었다. 버튼은 동일한 조회 함수를 다시 실행하며, 요청 중에는 중복 실행을 막았다. 상태별 동작은 가짜 요청 함수로 확인했고 실제 API 조회도 확인했다. 현재 구현은 첫 페이지 최대 100개까지 조회한다.

마지막 답안의 “확인했다”라는 표현은 실제로 테스트한 뒤 사용한다. 아직 하지 않은 검증이나 구현하지 않은 범위를 했다고 설명해서는 안 된다.

### 5.12 복습 문제

1. `const data = fetch(url)`에서 `data`는 왜 저장소 배열이 아닌가?
2. `await fetch(url)` 다음에 `await response.json()`이 다시 필요한 이유는 무엇인가?
3. 서버가 HTTP 404를 응답하면 `catch`로 자동 이동하는가?
4. 저장소 배열이 `[]`인 경우와 요청이 실패한 경우의 UI는 어떻게 달라야 하는가?
5. `finally`에서 항상 성공 문구를 출력하면 무엇이 잘못되는가?
6. 코드가 GitHub 저장소 100개를 받았다면 전체 저장소를 모두 받았다고 말할 수 있는가?
7. 가짜 요청의 `"retry"` 모드로 무엇을 검증할 수 있는가?

<details>
<summary>정답과 해설</summary>

1. `fetch()`는 나중에 응답이 준비될 작업을 나타내는 Promise를 반환한다. 응답을 받은 뒤 본문을 해석해야 저장소 배열을 얻는다.
2. 첫 번째는 Response를 얻는 단계이고, 두 번째는 본문을 끝까지 읽고 JSON을 JavaScript 값으로 해석하는 단계이다.
3. 아니다. HTTP 오류는 `response.ok` 등을 확인하고 직접 `throw`해야 이 코드의 `catch`로 이동한다. 네트워크 실패와 구별한다.
4. 빈 배열에는 정상 조회 후 자료가 없다는 안내를, 실패에는 가져오지 못했다는 안내와 재시도 버튼을 보여준다.
5. `finally`는 실패 후에도 실행되므로 오류 메시지를 성공 메시지로 덮어쓴다. 공통 정리 작업만 수행해야 한다.
6. 아니다. 101개 이상이 있어도 첫 페이지는 최대 100개이다. 전체가 필요하면 다음 페이지 유무를 확인하고 추가로 요청해야 한다.
7. 첫 실패에서 버튼이 표시되는지, 클릭하면 다시 로딩으로 바뀌는지, 두 번째 성공에서 목록이 표시되고 오류 UI가 사라지는지를 검사한다.

</details>

<a id="chapter-6"></a>

## 6장. 이벤트 → 상태 변경 → DOM 업데이트로 기능 완성하기

### 6.1 이 장에서 답할 질문

- 상태는 무엇이며 DOM과 어떤 관계가 있는가?
- 다크 모드를 변경하는 코드와 설정을 저장하는 코드는 왜 따로 필요한가?
- 새로고침 뒤 저장된 테마가 화면에 적용되는 과정을 설명할 수 있는가?
- 폼 입력, API 요청, 필터 변경을 같은 원리로 설명할 수 있는가?
- 지금 배우는 방식이 이후 React 학습과 어떻게 연결되는가?

### 6.2 상태는 현재 화면을 결정하는 데이터다

상태(state)는 실행 중에 달라질 수 있으며 화면이나 동작을 결정하는 데이터이다. 예를 들어 `theme`이 `"dark"`이면 어두운 색을 쓰고, `menuOpen`이 `true`이면 메뉴를 연다. `status`가 `"loading"`이면 요청 중이라는 문구를 보여준다.

상태에 이름을 붙이면 개발자가 “지금 어떤 상황인가?”에 답하기 쉬워진다. 문자열을 이곳저곳에서 임의로 비교하기보다 가능한 값을 정해 두는 것이 좋다.

| 기능 | 상태의 예 | 상태로부터 결정할 화면 |
| --- | --- | --- |
| 다크 모드 | `theme: "light"` 또는 `"dark"` | 색상, 버튼의 동작 안내 |
| 모바일 메뉴 | `menuOpen: true` 또는 `false` | 메뉴 표시, `aria-expanded` |
| API 요청 | `status: "loading"`, `"success"`, `"error"`, `"empty"` | 로딩 문구, 카드, 오류, 빈 상태 |
| 문의 폼 | 입력값, 필드별 오류, 제출 성공 여부 | 입력 옆 오류, 제출 결과 |
| 프로젝트 필터 | `selectedLanguage: "all"` 또는 언어 이름 | 조건에 맞는 프로젝트 목록 |

상태는 반드시 하나의 객체에 모아야 하는 것은 아니다. 작은 기능은 `let theme = "light"`로 충분하다. 관련된 값이 많아지면 `const state = { ... }`처럼 모으면 읽기 쉽다. 이때 `const`는 변수 자체의 재할당을 막지만 객체 속성의 변경까지 막지는 않는다.

DOM은 상태를 사용자가 볼 수 있도록 표현하는 대상이다. 아래 예제에서는 JavaScript 변수에 현재 테마를 두고, 그 값을 읽어 DOM을 갱신하는 함수를 만든다. 함수 이름을 `renderTheme`으로 정하면 그 함수가 맡은 일이 드러난다.

```text
사용자가 클릭한다.
    ↓
이벤트 핸들러가 현재 상태를 읽고 다음 상태를 결정한다.
    ↓
theme 값이 바뀐다.
    ↓
renderTheme()이 상태를 읽고 HTML 속성과 버튼 문구를 바꾼다.
    ↓
CSS 규칙이 바뀐 속성에 맞춰 적용된다.
```

JavaScript 변수에 새 값을 넣었다고 일반 DOM이 저절로 갱신되는 것은 아니다. 다음 두 작업을 구분해야 한다.

```javascript
let theme = "light";

theme = "dark"; // 데이터 변경
document.documentElement.dataset.theme = theme; // DOM 업데이트
```

### 6.3 :root, data-theme, CSS 변수의 연결

`:root`는 HTML 문서에서 최상위 `<html>` 요소를 선택하는 가상 클래스 선택자이다. `[data-theme="dark"]`는 태그 종류와 관계없이 해당 속성값을 가진 요소를 고르는 속성 선택자이다. 예제에서는 그 속성을 `<html>`에 붙인다.

```html
<html lang="ko" data-theme="dark">
```

`data-theme`와 `dark`라는 이름은 개발자가 정한 약속이다. 브라우저가 `data-theme="dark"`만 보고 모든 색을 알아서 변경하는 것은 아니다. 이 값을 조건으로 하는 CSS 규칙이 있어야 한다.

`--`로 시작하는 CSS 사용자 정의 속성은 기본적으로 자식에게 상속된다. 따라서 `<html>`의 색상 변수를 바꾸면 그 변수를 사용하는 `body`, 카드, 버튼에 변경이 반영된다. 별도의 고정 색상을 쓴 요소는 이 변수의 영향을 받지 않는다. [MDN: CSS 사용자 정의 속성](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)

### 6.4 localStorage가 기억하는 것

`localStorage`는 브라우저가 제공하는 Web API이며 `window.localStorage`로 접근할 수 있다. 일반 웹페이지 스크립트에서는 `window.`를 생략할 수 있으므로 별도의 `import`나 `new`가 필요하지 않다. 모든 JavaScript 실행 환경에서 같은 기능이 제공되는 것은 아니므로 브라우저 환경을 기준으로 이해한다.

저장은 키와 문자열 값의 쌍으로 이루어진다.

```javascript
localStorage.setItem("portfolio-theme", "dark");
const savedTheme = localStorage.getItem("portfolio-theme");
console.log(savedTheme); // "dark"
```

예제에서 `portfolio-theme`은 저장할 항목의 이름이고 `dark`는 선택한 테마의 값이다. 키가 없으면 `getItem()`은 `null`을 반환한다. 객체를 저장하려면 문자열로 변환하는 과정이 필요하지만, 여기서는 테마 문자열 하나만 저장하므로 별도 변환이 필요 없다.

저장소는 같은 출처, 즉 프로토콜·호스트·포트가 같은 사이트에서 공유된다. 같은 출처의 다른 경로도 같은 저장소를 쓰므로 키에 프로젝트 이름을 붙이면 충돌을 줄일 수 있다. 일반적으로 브라우저를 닫아도 남지만, 사이트 데이터 삭제나 비공개 탐색 종료 등에 따라 지워질 수 있다. 다른 기기와 자동 동기화되는 기능은 아니다. 저장 접근이 차단되면 오류가 날 수도 있다. [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

`setItem()`은 기억할 값을 저장한다. 화면을 변경하려면 DOM을 갱신하는 코드가 별도로 필요하다. 또한 새로고침하면 JavaScript 변수는 다시 초기화되므로, 시작 시 저장 값을 읽어 상태로 복원한 뒤 화면에 적용해야 한다.

### 6.5 독립 실습: 저장되는 다크 모드

이 실습은 다음 세 파일만으로 실행한다. 다른 장의 실습 코드와 합치지 않고 별도 실습 폴더에서 먼저 확인한다.

**index.html**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>테마 상태 실습</title>
  <link rel="stylesheet" href="css/style.css">
  <script src="js/main.js" defer></script>
</head>
<body>
  <main class="theme-demo">
    <h1>테마 상태 실습</h1>
    <p>버튼을 누르고 새로고침해 보세요.</p>
    <button id="theme-toggle" type="button">다크 모드로 변경</button>
    <p id="theme-status" role="status"></p>
  </main>
</body>
</html>
```

**css/style.css**

```css
:root {
  --background: #ffffff;
  --foreground: #202020;
  --surface: #eeeeee;
  color-scheme: light;
}

[data-theme="dark"] {
  --background: #181818;
  --foreground: #eeeeee;
  --surface: #303030;
  color-scheme: dark;
}

body {
  margin: 0;
  padding: 1rem;
  background-color: var(--background);
  color: var(--foreground);
  font-family: sans-serif;
  line-height: 1.6;
}

.theme-demo {
  max-width: 42rem;
  margin-inline: auto;
}

button {
  padding: 0.75rem 1rem;
  border: 1px solid currentColor;
  border-radius: 0.5rem;
  background-color: var(--surface);
  color: var(--foreground);
  font: inherit;
  cursor: pointer;
}

button:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}
```

**js/main.js**

```javascript
const THEME_KEY = "portfolio-theme";
const root = document.documentElement;
const themeButton = document.querySelector("#theme-toggle");
const themeStatus = document.querySelector("#theme-status");

let theme = "light";

// 1. 이전 선택을 읽는다. 처음부터 기본값을 저장하면 이전 선택을 덮어쓴다.
try {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    theme = savedTheme;
  }
} catch (error) {
  console.warn("저장된 테마를 읽지 못했습니다.", error);
}

// 2. 현재 상태를 화면으로 표현한다.
const renderTheme = () => {
  root.dataset.theme = theme;
  themeButton.textContent =
    theme === "dark" ? "라이트 모드로 변경" : "다크 모드로 변경";
};

// 3. 최초 접속 시에도 복원한 상태를 적용한다.
renderTheme();

// 4. 클릭하면 상태를 바꾸고, 화면에 적용하고, 선택을 저장한다.
themeButton.addEventListener("click", () => {
  theme = theme === "light" ? "dark" : "light";
  renderTheme();
  themeStatus.textContent = "";

  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    themeStatus.textContent = "테마는 변경했지만 설정을 저장하지 못했습니다.";
    console.warn(error);
  }
});
```

#### 코드에서 찾아야 할 네 가지 역할

| 역할 | 코드 | 설명 |
| --- | --- | --- |
| 상태 | `let theme = "light"` | 현재 선택을 담는다. |
| 초기 복원 | `getItem()`과 값 검사 | 저장된 설정이 유효하면 초기 상태로 사용한다. |
| 렌더링 | `renderTheme()` | 상태를 읽어 속성과 버튼 문구를 일관되게 바꾼다. |
| 상태 전환과 저장 | 클릭 핸들러와 `setItem()` | 다음 상태를 선택하고 브라우저에 기억시킨다. |

`document.documentElement`는 이 문서의 `<html>` 요소이다. `root.dataset.theme = theme`은 그 요소의 `data-theme` 속성을 변경한다. 이 코드에 `style` 속성을 직접 넣을 필요는 없다. [MDN: dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)

CSS 예제에서는 두 선택자가 같은 `<html>`에 적용될 때 같은 변수의 값을 지정한다. 이 경우 선택자 명시도가 같고 다른 우선순위 조건도 같으므로 뒤에 선언한 다크 테마 값이 적용된다. `:root`의 규칙 자체가 사라지는 것은 아니다.

#### 실행 결과 확인

1. Live Server로 열고 다크 모드 버튼을 누른다. 배경색과 버튼 문구가 함께 바뀌어야 한다.
2. 개발자 도구 Console에서 `localStorage.getItem("portfolio-theme")`을 실행한다. `"dark"`가 나와야 한다.
3. 새로고침한다. 초기 복원 코드가 다시 실행되어 다크 모드가 유지되어야 한다.
4. 라이트 모드로 변경한 뒤 새로고침한다. 이번에는 라이트 모드가 유지되어야 한다.
5. `localStorage.removeItem("portfolio-theme")`으로 이 실습의 설정만 지우고 새로고침한다. 기본값인 라이트 모드로 돌아와야 한다.

저장 기능의 확인은 `file:` 주소로 직접 여는 방식보다 HTTP 로컬 서버에서 수행한다. `file:`의 저장소 동작은 브라우저별로 달라질 수 있다. 이 실습은 이해하기 쉬운 `defer` 실행을 사용하므로, 저장된 테마 적용 전에 기본 색이 잠깐 보일 가능성은 남는다. 처음 그려질 때의 깜박임을 줄이는 초기 테마 적용 전략은 이후 개선 과제로 둔다.

### 6.6 두 번째 연결: 문의 폼의 입력 상태와 오류 상태

폼도 같은 원리로 설명한다. 사용자가 입력하면 값이 바뀐다. 제출하면 검증 함수가 값에서 오류를 계산한다. 렌더링 함수는 오류를 입력 필드 근처에 표시한다.

검증 함수는 DOM을 직접 변경하지 않고, 입력값을 받아 오류 객체를 반환하도록 분리할 수 있다. 다음은 **Console에서 실행할 수 있는 독립적인 데이터 처리 예제**이다. 이메일 검사는 `@` 앞뒤에 공백이나 다른 `@`가 없는 문자가 있는지 확인하는 학습용 조건이다. 모든 유효한 주소를 완벽히 판별하는 규칙으로 보지 않는다.

```javascript
const validateContact = ({ name, email, message }) => {
  const errors = {};

  if (!name.trim()) {
    errors.name = "이름을 입력해 주세요.";
  }

  if (!email.trim()) {
    errors.email = "이메일을 입력해 주세요.";
  } else if (!/^[^\s@]+@[^\s@]+$/.test(email.trim())) {
    errors.email = "이메일 형식을 확인해 주세요.";
  }

  if (!message.trim()) {
    errors.message = "메시지를 입력해 주세요.";
  }

  return errors;
};

const errors = validateContact({
  name: "민서",
  email: "not-an-email",
  message: "협업을 제안합니다."
});

console.log(errors); // { email: "이메일 형식을 확인해 주세요." }
console.log(Object.keys(errors).length === 0); // false
```

브라우저 폼에서는 `type="email"`과 유효성 검사 API를 활용해 형식 검증을 보완한다. 위 연습을 그대로 최종 미션의 이메일 검증으로 끝내지 않는다. [MDN: 클라이언트 폼 유효성 검사](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)

실제 기능의 상태 설계는 다음처럼 작성할 수 있다. 아래는 **설계용 부분 예제**이며, 이 객체만으로 폼이 생성되거나 제출되는 것은 아니다.

```javascript
const contactState = {
  values: { name: "", email: "", message: "" },
  errors: {},
  submitted: false
};
```

| 발생한 일 | 상태 변경 | DOM 업데이트 |
| --- | --- | --- |
| `input` 이벤트 | 해당 입력값 갱신, 이전 성공 상태 해제 | 필요하면 해당 필드 오류 재검사·갱신 |
| 잘못된 값으로 `submit` | 오류 객체 갱신, `submitted = false` | 필드 옆 오류 문구, `aria-invalid` 설정 |
| 유효한 값으로 `submit` | 오류 비우기, `submitted = true` | 오류 숨김, 검증 성공 안내 표시 |

`submit` 핸들러에서는 `event.preventDefault()`로 기본 제출 이동을 막는다. 이 미션의 기본 요구는 유효성 검사와 성공 메시지이며, 실제 이메일 발송은 선택 기능이다. 서버에 보내지 않은 예제에서 “이메일이 전송되었습니다”라고 표시하면 실제 동작과 안내가 어긋난다. “입력값 검증을 통과했습니다”처럼 정확한 문구를 사용한다.

### 6.7 세 번째 연결: 프로젝트 목록과 필터 상태

5장의 요청 상태와 4장의 배열 처리를 연결해 보자. GitHub에서 받은 원본 목록은 유지하고, 사용자가 선택한 언어를 별도 상태로 저장한다. 화면에 표시할 목록은 원본과 현재 조건으로 계산한다.

다음은 **Console에서 실행하는 독립 예제**이다. 아직 DOM 카드를 생성하지 않고 어떤 목록을 그릴지 결정하는 부분만 검증한다.

```javascript
const projectState = {
  status: "success",
  selectedLanguage: "JavaScript",
  repos: [
    { name: "portfolio", language: "JavaScript" },
    { name: "python-practice", language: "Python" },
    { name: "todo", language: "JavaScript" }
  ]
};

const selectVisibleRepos = ({ repos, selectedLanguage }) => {
  if (selectedLanguage === "all") {
    return repos;
  }
  return repos.filter((repo) => repo.language === selectedLanguage);
};

console.log(selectVisibleRepos(projectState).map((repo) => repo.name));
// ["portfolio", "todo"]

projectState.selectedLanguage = "all";
console.log(selectVisibleRepos(projectState).length); // 3
```

이 구조에서 필터 버튼을 눌러도 저장소 API를 다시 요청할 필요는 없다. 이미 받은 목록에서 표시할 항목을 계산하면 된다. 단, API에서 일부 페이지만 가져왔다면 필터의 대상도 그 목록으로 제한된다. “GitHub 전체 저장소 중 결과”라고 안내하려면 전체 페이지를 가져오는 처리가 필요하다.

“계정의 저장소가 없음”과 “선택한 필터와 일치하는 저장소가 없음”은 원인이 다르다. 후자의 안내에는 “선택한 언어의 프로젝트가 없습니다”와 같이 조건을 알려 주면 사용자가 필터를 바꿀 수 있다.

#### 6.7.1 통합 실습: API 상태와 언어 필터로 카드 그리기

다음은 1~6장의 개념을 함께 사용하는 **별도의 독립 실습**이다. 5장의 실습 코드를 수정하면서 중복 선언하지 않도록, 새 실습 폴더에서 세 파일을 만든다. 이 작은 페이지는 전체 포트폴리오 제출물이 아니라 Projects 기능을 연습하는 페이지이다. 언어 필터 UI는 선택 기능이다.

**index.html**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>프로젝트 상태와 필터</title>
  <link rel="stylesheet" href="css/style.css">
  <script src="js/main.js" defer></script>
</head>
<body>
  <main>
    <h1>프로젝트 상태와 필터 실습</h1>
    <section aria-labelledby="project-title">
      <h2 id="project-title">내 프로젝트</h2>
      <label for="language-filter">프로젝트 언어</label>
      <select id="language-filter" disabled>
        <option value="all">전체</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
      </select>
      <p id="project-status" role="status"></p>
      <div id="project-list"></div>
      <button id="retry-button" type="button" hidden>다시 시도</button>
    </section>
  </main>
</body>
</html>
```

**css/style.css**

```css
body {
  margin: 0;
  padding: 1rem;
  font-family: sans-serif;
  line-height: 1.6;
}

#project-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1rem;
}

.project-card {
  min-width: 0;
  padding: 1rem;
  border: 1px solid #767676;
  border-radius: 0.5rem;
  overflow-wrap: anywhere;
}
```

**js/main.js**

```javascript
const USERNAME = "octocat"; // 본인 GitHub 아이디로 변경한다.
const statusElement = document.querySelector("#project-status");
const listElement = document.querySelector("#project-list");
const filterElement = document.querySelector("#language-filter");
const retryButton = document.querySelector("#retry-button");
let request = fetch;

const state = {
  status: "idle",
  repos: [],
  selectedLanguage: "all"
};

const createCard = ({ name, description, language, html_url }) => {
  const card = document.createElement("article");
  card.className = "project-card";

  // 개발자가 정한 구조만 HTML로 해석한다. 외부 문자열은 아래에서 넣는다.
  card.innerHTML = `
    <h3><a></a></h3>
    <p class="project-description"></p>
    <p class="project-language"></p>
  `;

  const link = card.querySelector("a");
  link.textContent = name;
  if (typeof html_url === "string" && html_url.startsWith("https://github.com/")) {
    link.href = html_url;
  }
  card.querySelector(".project-description").textContent = description ?? "설명 없음";
  card.querySelector(".project-language").textContent = language ?? "언어 정보 없음";
  return card;
};

const renderProjects = () => {
  const loading = state.status === "loading";
  listElement.replaceChildren();
  listElement.setAttribute("aria-busy", String(loading));
  retryButton.hidden = state.status !== "error";
  filterElement.disabled = state.status !== "success";

  if (loading) {
    statusElement.textContent = "프로젝트를 불러오는 중…";
    return;
  }
  if (state.status === "error") {
    statusElement.textContent = "프로젝트를 불러오지 못했습니다. 다시 시도해 주세요.";
    return;
  }
  if (state.status === "empty") {
    statusElement.textContent = "표시할 공개 저장소가 없습니다.";
    return;
  }
  if (state.status !== "success") return;

  const visibleRepos = state.repos.filter(({ language }) =>
    state.selectedLanguage === "all" || language === state.selectedLanguage
  );
  const cards = visibleRepos.map(createCard);
  listElement.append(...cards);
  statusElement.textContent = cards.length > 0
    ? `${cards.length}개의 프로젝트를 표시합니다.`
    : "선택한 언어의 프로젝트가 없습니다.";
};

const loadProjects = async () => {
  if (state.status === "loading") return;
  state.status = "loading";
  renderProjects();

  try {
    const username = encodeURIComponent(USERNAME);
    const response = await request(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&page=1`,
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const repos = await response.json();
    if (!Array.isArray(repos)) throw new Error("저장소 목록이 배열이 아닙니다.");
    state.repos = repos;
    state.status = repos.length === 0 ? "empty" : "success";
  } catch (error) {
    state.repos = [];
    state.status = "error";
    console.error(error);
  } finally {
    renderProjects();
  }
};

filterElement.addEventListener("change", (event) => {
  state.selectedLanguage = event.currentTarget.value;
  renderProjects();
});
retryButton.addEventListener("click", loadProjects);
loadProjects();
```

이 예제의 `innerHTML`은 고정된 카드 구조를 만들고, 이름·설명·언어는 `textContent`로 넣는다. 외부 데이터 전체를 검증 없이 HTML 문자열에 끼워 넣지 않는다. `map()`은 각 저장소를 카드 요소로 바꾸고, `append(...cards)`는 배열 안의 요소들을 목록에 붙인다. 여기서 `...`는 여러 인자로 펼치는 문법이다. [MDN: innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)

`renderProjects()`는 네트워크 요청을 하지 않는다. API를 한 번 조회한 뒤 언어를 여러 번 바꿔도 이미 받은 `state.repos`를 필터링할 뿐이다. 성공 상태에서 필터 결과가 0개여도 선택 상자를 활성 상태로 유지하므로 다른 언어로 돌아갈 수 있다.

필터 선택지는 설명을 단순하게 하기 위해 JavaScript와 Python 두 언어만 제공한다. 전체 보기에는 다른 언어와 `null`인 저장소도 포함된다. 받은 데이터에서 언어 목록을 추출해 선택지를 자동 생성하는 것은 확장 실습으로 남긴다. 실제 API는 5장과 같이 첫 페이지 최대 100개까지 조회한다.

5.9의 `createFakeFetch()`를 복사해서 가짜 응답을 주입할 수도 있다. 이때 가상 저장소의 `language`에 각각 `"JavaScript"`, `"Python"`을 넣고 `html_url`에 GitHub 형식의 연습용 주소를 넣으면 필터와 링크 표시도 관찰할 수 있다. 가상 주소가 실제 저장소라는 뜻은 아니다.

### 6.8 상태를 한곳에서 읽어 그리면 좋은 이유

클릭 핸들러마다 배경색, 버튼 문구, 접근성 속성을 제각각 바꾸면 일부만 갱신하기 쉽다. `renderTheme()`처럼 관련 화면을 하나의 함수에서 그리면 초기 접속과 클릭 이후에 같은 규칙을 적용할 수 있다.

함수의 책임은 다음처럼 나누어 생각한다.

- 이벤트 핸들러: 어떤 일이 발생했는지 받아 다음 작업을 시작한다.
- 상태 변경: 다음 화면을 결정할 데이터를 갱신한다.
- 렌더링: 현재 상태를 읽어 DOM에 반영한다.
- 외부 작업: API 요청이나 저장소 쓰기처럼 브라우저 밖의 자원 또는 저장 기능과 상호작용한다.

이 구분은 학습을 위한 설계 기준이다. 모든 코드를 무조건 여러 함수로 쪼개야 한다는 규칙은 아니다. 먼저 같은 상태가 서로 다른 화면 요소에서 일관되게 사용되는지 확인한다.

### 6.9 React와 연결해서 이해하기

현재 과제에서는 직접 `renderTheme()`을 호출하고 DOM 속성을 변경한다. React에서는 일반적으로 상태 변경 함수를 호출해 다음 렌더링을 요청하고, 컴포넌트가 상태에 맞는 UI를 반환하도록 작성한다. React는 렌더링 결과를 계산한 뒤 필요한 변경을 DOM에 반영하는 커밋 단계를 수행한다. [React 공식 문서: Render and Commit](https://react.dev/learn/render-and-commit)

| 지금의 순수 JavaScript 학습 | 이후 React에서 연결할 개념 |
| --- | --- |
| 현재 값을 담는 변수나 객체 | 컴포넌트의 상태 |
| `addEventListener()`로 등록한 핸들러 | 컴포넌트에 연결한 이벤트 핸들러 |
| 상태를 읽는 `renderTheme()` | 상태를 사용해 UI를 반환하는 컴포넌트 |
| 직접 DOM 변경 | React의 계산 결과를 DOM에 반영하는 과정 |

React에서도 “어떤 상태가 바뀌면 어떤 화면이 나와야 하는가?”라는 설계는 필요하다. 다만 일반 변수 재할당이 곧 React의 상태 업데이트가 되는 것은 아니다. React 상태는 각 렌더링 시점의 값으로 이해하며, 상태 변경 요청이 현재 실행 중인 핸들러 안의 값을 즉시 다시 쓰는 것처럼 해석하면 안 된다. [React 공식 문서: State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)

이 미션에서는 React를 설치하거나 사용하지 않는다. 위 비교는 다음 학습으로 이어지는 개념 설명이다.

### 6.10 흔한 실수와 원인

| 증상 | 가능한 원인 | 확인할 부분 |
| --- | --- | --- |
| 저장 값은 dark인데 화면은 밝다. | 저장만 하고 DOM 적용을 하지 않았다. | 초기 `renderTheme()` 호출, CSS 선택자 |
| 새로고침하면 항상 light가 된다. | 저장 값을 읽기 전에 기본값을 저장했다. | `getItem()`과 `setItem()` 실행 순서 |
| 배경은 바뀌는데 일부 카드는 그대로다. | 카드가 공통 변수를 사용하지 않는다. | 고정 배경색 선언 |
| 버튼 한 번에 테마가 두 번 바뀐다. | 같은 이벤트를 중복 연결했다. | 스크립트 중복 연결, 반복적인 이벤트 등록 |
| 필터를 되돌려도 목록이 복원되지 않는다. | 필터 결과로 원본 배열을 덮어썼다. | 원본 데이터와 표시용 계산 결과 |
| 저장이 차단되면 버튼도 작동하지 않는다. | 초기 저장소 오류가 이후 실행을 중단했다. | 저장 접근의 `try/catch` |

### 6.11 직접 해보는 실습

1. 다크 모드 예제에서 `renderTheme()`을 주석 처리하고 버튼을 눌러 본다. 저장 값과 화면이 서로 달라지는 이유를 설명한다. 관찰 후 원상복구한다.
2. `data-theme`를 `data-mode`로 바꾸려면 HTML 속성에 접근하는 JavaScript와 CSS 선택자 중 어디를 바꿔야 하는지 적는다.
3. 밝은 테마에서도 카드를 별도 색으로 표시하려면 어떤 CSS 변수를 추가할지 설계한다.
4. 필터 예제의 선택 언어를 `"Rust"`로 바꾸고 예상 목록 길이를 적는다. 빈 목록일 때 보여줄 문구도 작성한다.
5. 문의 폼을 이름·이메일·메시지·오류 객체·제출 결과로 나누어 상태 표를 작성한다.

### 6.12 복습 문제

1. `localStorage.setItem()`을 실행하면 CSS가 자동으로 변경되는가?
2. 새로고침 직후 상태를 복원하는 올바른 순서를 설명하라.
3. `data-theme="dark"`를 설정했지만 CSS 규칙이 없다면 어떤 일이 일어나는가?
4. 필터를 바꿀 때 원본 배열을 보존하면 무엇이 좋은가?
5. 상태 변경과 DOM 업데이트를 별도로 설명해야 하는 이유는 무엇인가?
6. React에서 일반 변수에 값을 대입하는 것과 상태 업데이트를 요청하는 것은 같은가?

<details>
<summary>해설 보기</summary>

1. 아니다. 저장소의 값만 바뀐다. 상태를 DOM 속성에 반영하고 그 속성을 조건으로 하는 CSS가 적용되어야 한다.
2. 기본 상태 준비 → 저장 값 읽기 → 유효한 값이면 상태에 반영 → 렌더링 순서이다. 사용자 선택 시에는 상태 변경 → 렌더링 → 저장으로 이어진다.
3. 속성값은 바뀌지만 그 값에 대응하는 색상 규칙이 없으므로 다크 모드 색상 변화는 일어나지 않는다.
4. 다른 조건이나 전체 보기를 선택할 때 다시 API를 호출하지 않고 표시 목록을 계산할 수 있다.
5. 데이터가 바뀌었다는 사실과 사용자가 보는 화면이 바뀌었다는 사실은 다르다. 연결 코드를 확인해야 화면 불일치를 찾을 수 있다.
6. 다르다. React가 상태 변경을 인지하고 다음 렌더링을 처리할 수 있도록 해당 상태 업데이트 방식을 사용해야 한다.

</details>

### 6.13 자신의 구현을 설명하는 연습

> “현재 테마는 `theme` 변수에 저장했습니다. 버튼을 클릭하면 이벤트 핸들러가 다음 테마를 결정합니다. `renderTheme()`은 그 값을 `<html>`의 `data-theme` 속성과 버튼 문구에 반영합니다. CSS는 속성값에 따라 색상 변수를 적용합니다. 선택은 로컬 스토리지에 별도로 저장하고, 페이지를 다시 열 때 읽어서 상태를 복원합니다. 그래서 새로고침 뒤에도 이전 테마를 유지할 수 있습니다.”

이 문장을 자신의 실제 함수명과 키 이름으로 바꿔 말한다. 이어서 프로젝트 API 상태와 문의 폼 상태도 각각 같은 순서로 설명한다. 세 기능의 “이벤트 → 상태 → 화면”을 종이에 그릴 수 있으면 과제의 상태 관리 목표를 점검하기 쉽다.

---

<a id="practice"></a>

## 종합 실습: 자신의 포트폴리오로 연결하기

### A. 구현 전에 설계 메모를 작성한다

다음 질문에 짧게 답한 뒤 코딩한다. 아직 구현하지 않은 것은 계획이라고 명확히 표시한다.

| 설계 질문 | 작성할 내용 |
| --- | --- |
| 누구에게 무엇을 보여줄 페이지인가? | 자신의 관심 분야와 프로젝트를 소개할 대상 |
| 어떤 정보가 서로 한 묶음인가? | Hero, About, Skills, Projects, Contact, Footer의 역할 |
| 어디에 Flexbox를 사용할 것인가? | 내비게이션의 로고·메뉴 정렬 기준 |
| 어디에 Grid를 사용할 것인가? | 프로젝트 카드의 최소 너비와 열 구성 |
| 어떤 상태가 필요한가? | 테마, 요청 상태, 폼 오류, 선택적으로 필터 상태 |
| 각 상태는 무엇을 바꾸는가? | 속성, 클래스, 텍스트, 카드 목록, 버튼 활성 여부 |
| 실패나 빈 데이터는 어떻게 안내하는가? | 로딩·오류·빈 상태별 문구와 다음 행동 |

### B. 다음 순서로 기능을 연결한다

1. **문서 구조:** 1장을 참고해 제목 계층과 여섯 영역을 작성한다. 내비게이션 링크의 `href`와 섹션의 `id`를 맞춘다.
2. **배치:** 좁은 화면부터 CSS를 적용한다. nav는 Flexbox, Projects는 Grid로 배치하고 768px와 1024px에서 필요한 변경을 작성한다.
3. **이벤트:** 작은 메뉴 또는 테마 버튼 하나를 연결한다. 클릭 시 값과 화면이 어떻게 달라지는지 Console과 Elements에서 확인한다.
4. **가상 데이터:** API를 연결하기 전에 저장소 형태의 배열을 만들어 카드 렌더링을 확인한다. 설명·언어가 `null`인 경우도 넣는다.
5. **실제 요청:** 가상 배열을 GitHub API 응답으로 바꾼다. 요청 전후와 오류의 상태 전환을 확인한다.
6. **폼과 저장:** 이름·이메일·메시지를 검증하고, 테마 선택을 저장·복원한다. 검증 성공과 실제 발송은 구분한다.
7. **설명과 기록:** 실제로 사용한 태그, 배치 방식, 함수, 상태를 가리키며 각 목표를 설명한다. README에 구현 내용과 테스트 결과를 기록한다.

이 순서는 교재의 권장 실습 순서이다. 미션의 80시간 전체를 세부 시간표로 재규정하는 것은 아니다. 처음부터 기능을 한 번에 붙이지 않고, 데이터와 화면을 확인할 수 있는 작은 단위로 연결한다.

### C. 완료 여부를 관찰로 판단한다

| 확인할 항목 | 직접 수행할 행동 | 통과 기준 |
| --- | --- | --- |
| HTML 구조 | CSS 없이 제목과 콘텐츠 순서를 읽는다. | 정보의 위계와 영역 역할이 이해된다. |
| 접근 가능한 조작 | Tab으로 링크·버튼·입력으로 이동한다. | 필요한 조작에 도달하고 현재 위치를 볼 수 있다. |
| 반응형 | 좁은 화면, 768px, 1024px 이상에서 확인한다. | 가로 넘침 없이 콘텐츠를 읽고 조작할 수 있다. |
| DOM 이벤트 | 메뉴 또는 테마 버튼을 반복 클릭한다. | 한 번의 조작에 상태가 한 번 변경된다. |
| 로딩 | 가짜 요청에 지연을 넣는다. | 응답을 기다리는 안내가 보인다. |
| 성공 | 가짜 또는 실제 저장소 목록을 받는다. | 이름·설명·링크가 데이터에 맞게 표시된다. |
| 빈 상태 | 가짜 응답으로 `[]`를 돌려준다. | 오류와 구별된 빈 상태가 보인다. |
| 오류와 재시도 | 첫 요청 실패, 두 번째 성공을 재현한다. | 오류 안내 → 재시도 → 로딩 → 성공으로 바뀐다. |
| 테마 저장 | 변경 후 새로고침한다. | 저장된 설정을 복원한다. |
| 폼 검증 | 빈 값·잘못된 이메일·유효한 값을 각각 제출한다. | 오류 위치와 성공 안내가 상황에 맞다. |

가짜 요청 테스트는 UI와 제어 흐름을 재현하기 위한 것이다. 실제 네트워크 연결이나 배포 주소의 동작을 대신 확인해 주지는 않는다. 마지막에는 실제 계정과 배포 URL에서도 기능을 확인한다.

### D. 여섯 가지 학습 목표 자기 점검

- [ ] `main`, `section`, `article`, `nav`를 선택한 이유를 내 HTML에서 설명할 수 있다.
- [ ] `div`가 필요한 경우와 제목을 가진 의미 있는 영역이 필요한 경우를 구분할 수 있다.
- [ ] Flexbox의 주축·교차축과 Grid의 행·열을 코드에 연결해 설명할 수 있다.
- [ ] 프로젝트 카드에 `auto-fit`, `minmax()`를 사용하는 이유를 설명할 수 있다.
- [ ] `querySelector()`가 `null`을 반환하는 상황을 재현하고 원인을 찾을 수 있다.
- [ ] 이벤트 함수의 등록과 즉시 실행의 차이를 설명할 수 있다.
- [ ] 화살표 함수에서 `return`이 필요한 형태를 구분할 수 있다.
- [ ] 구조분해의 객체 이름 기준과 배열 순서 기준을 구분할 수 있다.
- [ ] `map`, `filter`, `forEach`를 원하는 결과에 맞게 선택할 수 있다.
- [ ] `await fetch()`와 `await response.json()`의 결과를 각각 설명할 수 있다.
- [ ] HTTP 오류를 왜 `response.ok`로 검사하는지 설명할 수 있다.
- [ ] 로딩·성공·오류·빈 상태를 각각 재현할 수 있다.
- [ ] 테마, API, 폼에서 세 가지 이상의 “이벤트 → 상태 → 화면” 흐름을 설명할 수 있다.
- [ ] 구현하거나 검증하지 않은 내용을 했다고 말하지 않고, 현재 범위를 설명할 수 있다.

### E. 구술 평가 연습

각 질문에 자신의 코드 한 부분을 가리키며 1~2분 정도 답한다. 예문을 암기하는 것보다 “선택 이유 → 코드의 동작 → 확인한 결과”를 연결하는 것이 중요하다.

1. Projects 전체를 `section`으로, 저장소 하나를 `article`로 표현했다면 어떤 기준으로 나눴는가?
2. 내비게이션에 Flexbox를 사용한 이유와 카드 목록에 Grid를 사용한 이유는 무엇인가?
3. HTML 버튼이 실제 JavaScript 함수 실행으로 이어지는 순서를 설명하라.
4. GitHub 배열을 받아 일부를 골라 화면용 결과로 바꾸는 과정에서 구조분해·`filter`·`map`은 각각 무엇을 하는가?
5. 요청에 실패한 사용자가 다시 프로젝트를 볼 때까지 어떤 상태 전환이 일어나는가?
6. 새로고침해도 테마를 유지하기 위해 상태 변경, 저장, 초기 복원, 렌더링을 어떻게 연결했는가?

좋은 답변에는 함수 이름만 나열하는 대신 입력과 결과가 들어간다. 예를 들어 “`map`을 사용했다”보다 “저장소 배열의 각 객체를 카드 요소 하나로 바꿔 새 배열을 얻고, 그 요소들을 목록에 붙였다”라고 설명한다.

---

<a id="reference"></a>

## 용어 사전과 원문 자료

### 용어 사전

| 용어 | 이 교재에서의 의미 |
| --- | --- |
| 시맨틱 | 요소나 코드가 가진 의미와 역할 |
| 선택자 | 스타일이나 조작의 대상 요소를 고르는 표현 |
| 속성 | HTML 요소에 붙는 추가 정보. 예: `id`, `href`, `data-theme` |
| 가상 클래스 | 요소의 상태나 구조적 특성을 기준으로 선택하는 문법. 예: `:root` |
| CSS 변수 | `--색상`처럼 이름을 붙여 재사용하는 사용자 정의 속성 |
| DOM | 브라우저가 문서를 표현하고 조작하도록 제공하는 객체 구조와 인터페이스 |
| 이벤트 | 클릭·입력·제출처럼 브라우저가 알리는 발생 사실 |
| 핸들러·리스너 | 이벤트를 받았을 때 실행하도록 연결한 함수 |
| 콜백 | 다른 코드에 전달되어 그 코드에서 호출되는 함수 |
| 상태 | 현재 화면이나 동작을 결정하는, 실행 중 변할 수 있는 데이터 |
| 렌더링 | 이 교재의 일반 설명에서는 상태·데이터를 화면 내용으로 표현하는 작업 |
| 구조분해 | 객체의 속성이나 배열 항목을 꺼내 변수로 받는 문법 |
| 얕은 복사 | 바깥 컨테이너는 새로 만들지만 내부 객체 참조는 공유할 수 있는 복사 |
| API | 프로그램이 다른 기능이나 데이터에 접근하도록 정한 인터페이스 |
| 엔드포인트 | 특정 API 기능을 요청하는 주소 |
| HTTP 상태 코드 | 서버가 응답 결과의 종류를 알려 주는 숫자 |
| JSON | 객체·배열 형태의 데이터를 교환할 때 사용하는 텍스트 형식 |
| Promise | 나중에 완료될 작업의 결과를 나타내는 객체 |
| async/await | Promise를 사용하는 비동기 흐름을 작성하는 JavaScript 문법 |
| Web API | 브라우저 환경 등이 제공하는 기능. DOM, fetch, 저장소 등이 해당 |
| localStorage | 브라우저에 같은 출처의 문자열 데이터를 저장하는 기능 |
| 페이지네이션 | 큰 목록을 여러 페이지로 나누어 조회하는 방식 |
| 반응형 | 화면 크기 등에 맞춰 배치나 표현이 바뀌는 설계 |

### 원문과 추가 학습

이 교재는 프로젝트에 있는 [미션 원문 PDF](/Users/leeaain/codyssey/b1-1/미션%20-%20AI%20도구%20학습.pdf)의 과제 목표를 풀어 쓴 학습 자료이다. 원문의 기능 요구와 교재의 설명용 선택 실습을 구분한다. 제출물의 최종 조건은 원문을 다시 확인한다.

기술적 근거와 자세한 정의는 각 절의 공식 문서 링크에 연결했다. 자주 돌아볼 문서는 다음과 같다.

- [MDN HTML 시맨틱](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [MDN Flexbox 기초](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts)
- [MDN Grid 기초](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts)
- [MDN 이벤트 연결](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [MDN 화살표 함수](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [MDN 구조분해](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring)
- [MDN Fetch 사용법](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [GitHub 사용자 저장소 목록 API](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user)
- [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [React 렌더링과 커밋](https://react.dev/learn/render-and-commit)

문서의 예제는 학습을 위해 작게 구성했다. 기능을 합칠 때에는 ID 중복, 이벤트 중복 등록, 서로 다른 실습의 변수 이름 충돌을 점검한다. 설명할 수 없는 줄이 있다면 그 줄의 입력값과 실행 후 결과부터 다시 확인한다.
