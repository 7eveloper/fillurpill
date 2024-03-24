## React 심화 프로젝트

### 📢 과제 개요

**24. 03. 18 - 24. 03. 25**

- 프로젝트명 : Fill ur Pill
- 개요 : 건강기능식품 추천, 섭취 이력 관리, 구매까지 연계된 웹사이트

### 📑 사용 기술

- Typescript, Next.js 적용
- 전역상태 관리 : zustand
- 서버상태 관리 : react-query
- 인증/인가 : supabase
- 디자인 시스템: Shadcn UI (Tailwind CSS)사용
- 버전관리 : Github
- 협업 툴: Figma, Notion, Slack, Canva
- 배포 : Vercel

### 💡 기술 선정 이유

- Typescript: type에러 방지 및 개발생산성 향상
- Next Js: SSG, SSR ,CSR 등 검색엔진 최적화와 초기 로딩성능 향상
- Zustand: Redux에 비해서 코드량이 적고, 러닝 커브가 낮음
- React-query : 간편한 비동기 상태 서버관리
- Supabase: 서버리스DB이고 빠른 성능 및 관계형 데이터베이스 기반

# 페이지 소개

- 로그인/회원가입
- 설문조사
- 마이페이지
- 섭취이력
- 제품검색 페이지
  - 상세페이지
- 리뷰작성 페이지

## 실제 구현 화면(프로젝트 사용 방법)

### 로그인, 회원 가입

![image](https://github.com/7eveloper/fillurpill/assets/97039528/8fae6b20-9df7-4280-889e-cecd688ec467)

- email , password(비밀번호는 최소 6자의 대/소문자, 숫자와 특수문자를 포함해야) 기입시 회원가입 성공

### 설문조사

![image](https://github.com/7eveloper/fillurpill/assets/97039528/e5033dde-60f2-4846-8a1c-ce1c588ed4bf)

- 키(0~300cm), 몸무게(0,200kg), 성별, 나이 기입하면 설문조사 완료

### 마이페이지

![image](https://github.com/7eveloper/fillurpill/assets/97039528/3a03b4f0-f01b-45b1-9a2d-ec8fd7f95132)

- 닉네임을 따로 수정이 가능하고, 설문조사 페이지에서 저장된 값들을 수정이 되도록 구현

![image](https://github.com/7eveloper/fillurpill/assets/97039528/5beff7e9-6689-42a7-a0ad-cca157c98b22)

- 영양제 섭취 일자나 자신의 건강에 관한 내용을 날짜 클릭을 통해 저장할수있고, 필요가 없어지면 삭제가 가능하도록 구현
  ![image](https://github.com/7eveloper/fillurpill/assets/97039528/bf6a11b5-b849-4986-8460-e7371c3be08d)
- 설문조사에 대한 정보를 가지고 나의 bmi수치가 어느정도인지
  차트로 알려주는 페이지

### 제품검색 페이지

![image](https://github.com/7eveloper/fillurpill/assets/97039528/eb79510e-25bb-4352-89b8-c907b30dacdc)

- 기능, 이름, 성분별로 검색이 가능하도록 구현하였고, 스켈레톤ui사용및 무한스크롤 기능을 삽입.

![image](https://github.com/7eveloper/fillurpill/assets/97039528/af735080-9ec3-458c-994b-c7914695c335)

- 제품에 대한 상세페이지로서, 해당 제품에 대해 구매욕구가 생기면 링크로 들어갈 수 있는페이지 구현

### 리뷰작성 페이지

![image](https://github.com/7eveloper/fillurpill/assets/97039528/7aac481e-775a-4c1b-9408-18116aeada21)

- 영양제를 검색하여 추천영양제를 클릭하고 제목, 추천이유, 별점을 이용하여 해당 영양제에 대한 리뷰를 남길 수 있는페이지
