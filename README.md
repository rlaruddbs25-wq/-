# 📖 독서 감상문 작성 도우미 (Pure Frontend Version)

이 프로젝트는 백엔드 서버나 별도의 복잡한 데이터베이스 설치 없이 **HTML, CSS, JavaScript**만을 사용하여 브라우저에서 즉시 동작하는 정적 웹 애플리케이션입니다. 모든 작성된 데이터는 브라우저 내부의 `localStorage`를 통해 안전하게 유지됩니다.

GitHub Pages 등에 별도의 빌드 과정 없이 바로 업로드하여 배포 및 실행할 수 있습니다.

---

## 🛠️ 기술 스택 및 구조

* **HTML5**: 웹사이트 뼈대 및 인쇄 템플릿 영역 제공
* **CSS3 (Vanilla)**: 반응형 2컬럼 레이아웃, 학생 친화적 파스텔 에메랄드 테마, 인쇄 전용 CSS 미디어 쿼리 제공
* **JavaScript (Vanilla)**: 추천 질문 아코디언 제어, 초안 실시간 문맥 조합 알고리즘, 로컬 스토리지 CRUD 제어
* **데이터 관리**: Browser LocalStorage (`book_reports` Key)

---

## 🚀 실행 방법

### 1. 로컬에서 즉시 실행
프로젝트 폴더 내에 있는 **`index.html`** 파일을 마우스로 더블 클릭하여 웹 브라우저(Chrome, Edge, Safari 등)에서 즉시 실행할 수 있습니다.
* 파일 경로: `C:\Users\김경윤\.gemini\antigravity\scratch\book_report_frontend\index.html`

### 2. GitHub Pages 배포 (웹 호스팅)
1. GitHub 레포지토리를 새로 생성합니다.
2. 아래 3개의 파일을 레포지토리에 업로드(Push)합니다.
   * `index.html`
   * `style.css`
   * `app.js`
3. 레포지토리의 **Settings > Pages** 메뉴로 이동하여 배포 브랜치(`main` 또는 `master`)를 지정하고 저장합니다.
4. 제공되는 GitHub Pages URL을 통해 스마트폰, 태블릿, PC 어디서든 즉시 웹사이트를 이용할 수 있습니다.

---

## 📂 파일 구성 목록

```
book_report_frontend/
├── index.html     # 메인 HTML UI 구조 및 폼 요소
├── style.css      # 단정하고 이쁜 학생 테마 스타일 및 프린트 지원 CSS
├── app.js         # 가이드 질문 템플릿 연동, 초안 생성 logic 및 localStorage CRUD 연동 스크립트
└── README.md      # 본 설명 안내서
```
