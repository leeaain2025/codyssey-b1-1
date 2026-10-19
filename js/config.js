"use strict";

// 개인 정보와 계정 연결은 이 파일 한 곳에서 관리합니다. 비밀 키는 넣지 않습니다.
window.PORTFOLIO_CONFIG = Object.freeze({
  displayName: "이아인",
  githubUsername: "leeaain2025",
  githubAvatar: "https://avatars.githubusercontent.com/u/309934322?v=4",
  // 파일과 커밋을 확인한 프로젝트만 소개합니다. 선정 근거는 docs/projects.md에 기록합니다.
  projectDescriptions: Object.freeze({
    "leeaain2025/codyssey-b1-1": "GitHub 프로젝트 조회와 다크 모드, 문의 폼 검증을 담은 HTML·CSS·JavaScript 반응형 포트폴리오입니다.",
    "leeaain2025/codyssey-b5-1": "해시맵과 연결 리스트를 직접 구현해 키·값 저장, 만료 시간, LRU 메모리 관리를 지원하는 미니 Redis입니다.",
    "leeaain2025/codyssey-b6-1": "회원·도서·대출·연체 관계를 테이블과 샘플 데이터로 설계한 MySQL 데이터베이스 학습 프로젝트입니다.",
    "leeaain2025/codyssey-e1-1": "Nginx와 FastAPI를 Docker로 실행하고, PostgreSQL 연동 환경과 포트·볼륨 문제 해결 과정을 기록한 실습 프로젝트입니다.",
    "leeaain2025/codyssey-e1-2": "딥러닝 개념을 난이도별 퀴즈로 복습하고, 문제 추가와 최고 점수 저장까지 할 수 있는 Python 콘솔 게임입니다.",
    "leeaain2025/codyssey-e1-3": "행렬 연산으로 십자와 X 패턴을 판별하고, 2차원·1차원 구현의 실행 시간을 비교하는 미니 NPU 시뮬레이터입니다.",
    "leeaain2025/nvim": "Python 개발과 Markdown 작업에 맞춰 디버거·테스트·파일 탐색·편집 화면을 구성한 개인 Neovim 설정입니다.",
  }),
  contactEmail: "", // 공개할 연락 이메일이 있을 때 입력합니다. 미입력 시 실제 발송하지 않습니다.
  themeStorageKey: "leeaain2025-portfolio-theme",
  navigationScrollThreshold: 60,
  backToTopThreshold: 300,
  revealThreshold: 0.2,
});
