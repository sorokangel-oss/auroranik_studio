# Auroranik Studio

오로라닉 심리 콘텐츠·타로카드 제작 포트폴리오입니다.

## 파일

- `index.html` — 공개 랜딩페이지
- `admin.html` — 로그인형 관리자 페이지
- `config.js` — Supabase 연결 설정
- `supabase-schema.sql` — 데이터베이스, 권한, 이미지 저장소 설정
- `assets/` — 기본 포트폴리오 이미지

## 관리자 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트를 만듭니다.
2. SQL Editor에서 `supabase-schema.sql` 전체를 실행합니다.
3. Authentication > Users에서 관리자 이메일·비밀번호 계정을 만듭니다.
4. 생성된 사용자의 UUID를 복사하여 SQL 파일 마지막 예시처럼 `admin_users`에 등록합니다.
5. Project Settings > API에서 Project URL과 anon public key를 복사해 `config.js`에 입력합니다.
6. 사이트의 `/admin.html`에서 로그인합니다.

관리자 페이지에서 소개 문구, 상담 링크, 6개 프로젝트의 이름·설명·태그·이미지를 수정할 수 있습니다. 이미지는 Supabase Storage의 `portfolio-assets` 버킷에 저장됩니다.

> `anon key`는 브라우저 공개용 키입니다. 절대로 service-role key를 `config.js`에 넣지 마세요.
