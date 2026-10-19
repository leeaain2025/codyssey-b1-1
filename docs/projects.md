# 프로젝트 소개와 선정 근거

확인일: **2026-10-19**

포트폴리오의 Projects 영역에는 공개 저장소의 파일과 커밋을 확인한 뒤, 실제 작업 내용이 있는 프로젝트를 소개합니다. 소개 문구는 [`js/config.js`](../js/config.js)의 `projectDescriptions`에서 관리합니다. 아래 문장은 해당 설정과 같습니다.

## 프로젝트별 소개

| 저장소 | 한 문장 소개 | 확인한 근거 파일 |
| --- | --- | --- |
| [codyssey-b1-1](https://github.com/leeaain2025/codyssey-b1-1) | GitHub 프로젝트 조회와 다크 모드, 문의 폼 검증을 담은 HTML·CSS·JavaScript 반응형 포트폴리오입니다. | [index.html](https://github.com/leeaain2025/codyssey-b1-1/blob/main/index.html), [main.js](https://github.com/leeaain2025/codyssey-b1-1/blob/main/js/main.js), [projects.js](https://github.com/leeaain2025/codyssey-b1-1/blob/main/js/projects.js), [contact.js](https://github.com/leeaain2025/codyssey-b1-1/blob/main/js/contact.js) |
| [codyssey-b5-1](https://github.com/leeaain2025/codyssey-b5-1) | 해시맵과 연결 리스트를 직접 구현해 키·값 저장, 만료 시간, LRU 메모리 관리를 지원하는 미니 Redis입니다. | [mini_redis/redis.py](https://github.com/leeaain2025/codyssey-b5-1/blob/main/mini_redis/redis.py) |
| [codyssey-b6-1](https://github.com/leeaain2025/codyssey-b6-1) | 회원·도서·대출·연체 관계를 테이블과 샘플 데이터로 설계한 MySQL 데이터베이스 학습 프로젝트입니다. | [schema.sql](https://github.com/leeaain2025/codyssey-b6-1/blob/main/schema.sql), [create.sql](https://github.com/leeaain2025/codyssey-b6-1/blob/main/create.sql) |
| [codyssey-e1-1](https://github.com/leeaain2025/codyssey-e1-1) | Nginx와 FastAPI를 Docker로 실행하고, PostgreSQL 연동 환경과 포트·볼륨 문제 해결 과정을 기록한 실습 프로젝트입니다. | [try1/Dockerfile](https://github.com/leeaain2025/codyssey-e1-1/blob/main/try1/Dockerfile), [try2/main.py](https://github.com/leeaain2025/codyssey-e1-1/blob/main/try2/main.py), [try2/compose.yml](https://github.com/leeaain2025/codyssey-e1-1/blob/main/try2/compose.yml), [README.md](https://github.com/leeaain2025/codyssey-e1-1/blob/main/README.md) |
| [codyssey-e1-2](https://github.com/leeaain2025/codyssey-e1-2) | 딥러닝 개념을 난이도별 퀴즈로 복습하고, 문제 추가와 최고 점수 저장까지 할 수 있는 Python 콘솔 게임입니다. | [main.py](https://github.com/leeaain2025/codyssey-e1-2/blob/main/main.py), [quiz.json](https://github.com/leeaain2025/codyssey-e1-2/blob/main/quiz.json) |
| [codyssey-e1-3](https://github.com/leeaain2025/codyssey-e1-3) | 행렬 연산으로 십자와 X 패턴을 판별하고, 2차원·1차원 구현의 실행 시간을 비교하는 미니 NPU 시뮬레이터입니다. | [main.py](https://github.com/leeaain2025/codyssey-e1-3/blob/main/main.py) |
| [nvim](https://github.com/leeaain2025/nvim) | Python 개발과 Markdown 작업에 맞춰 디버거·테스트·파일 탐색·편집 화면을 구성한 개인 Neovim 설정입니다. | [lazyvim.json](https://github.com/leeaain2025/nvim/blob/main/lazyvim.json), [lua/plugins/bufferline.lua](https://github.com/leeaain2025/nvim/blob/main/lua/plugins/bufferline.lua), [설정 변경 커밋](https://github.com/leeaain2025/nvim/commit/ac7edc6634603608c8c12fd04b6ce2ef293f314b) |

## 선정 기준과 제외한 저장소

- 커밋 수, 저장소 크기(`size`), GitHub의 대표 언어(`language`) 유무만으로 판단하지 않습니다. 커밋이 하나여도 실제 코드, SQL 설계, 개인 설정 등 설명할 수 있는 작업물이 있으면 포함합니다.
- README가 기본 템플릿이어도 다른 파일에 실제 변경 사항이 있는지 확인합니다. `nvim`은 README가 LazyVim 기본 문구지만, 개인 설정과 이를 추가한 커밋이 있어 포함했습니다.
- **`codyssey-b2-1`은 제외했습니다.** 확인 당시 파일은 15바이트의 `README.md`뿐이며, 커밋도 `Initial commit` 한 개였습니다. 아직 프로젝트 기능을 소개할 근거가 없습니다.
- 설명은 구현된 범위에 맞춥니다. 예를 들어 `codyssey-e1-1`의 FastAPI 코드는 기본 응답 엔드포인트이고, PostgreSQL 연결은 Compose 구성 및 컨테이너 간 명령 실행 실습으로 확인했습니다. 따라서 웹 API에서 데이터베이스 CRUD까지 구현했다고 표현하지 않았습니다.

## 페이지에 반영되는 방식

Projects 영역은 GitHub API가 반환한 실제 저장소 목록과 `projectDescriptions`에 등록된 저장소의 **교집합**을 표시합니다. 목록을 정적인 HTML 카드로 대체하지 않습니다.

소개 문장은 직접 작성한 설정을 사용하고, 별 수·업데이트 날짜·대표 언어·저장소 링크는 GitHub API 응답을 사용합니다. 언어 필터와 정렬도 표시 대상 프로젝트에 적용됩니다. API에서 더 이상 반환되지 않는 저장소는 소개 설정이 남아 있어도 표시되지 않습니다.

새 프로젝트를 추가할 때는 다음 순서로 관리합니다.

1. 해당 공개 저장소의 코드·설계·설정 파일과 커밋을 확인합니다.
2. 실제로 구현한 내용을 한 문장으로 작성합니다.
3. [`js/config.js`](../js/config.js)의 `projectDescriptions`에 `"소유자/저장소명": "소개 문장"` 형식으로 추가합니다. 키는 GitHub API의 `full_name`과 일치해야 합니다.
4. 이 문서에 근거 파일 링크를 추가하고 화면의 표시·언어 필터·정렬을 확인합니다.

이번 변경은 포트폴리오의 소개 설정과 화면 표시를 위한 것입니다. 소개 대상인 다른 원격 저장소의 파일이나 GitHub 저장소 설명 필드는 변경하지 않았습니다.
