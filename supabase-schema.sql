-- Supabase SQL Editor에서 전체 실행하세요.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
create policy "Admins can read own membership" on public.admin_users
for select to authenticated using (user_id = auth.uid());

create table if not exists public.site_content (
  id text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
create policy "Anyone can read published content" on public.site_content
for select to anon, authenticated using (true);
create policy "Admins can insert content" on public.site_content
for insert to authenticated with check (
  exists(select 1 from public.admin_users where user_id = auth.uid())
);
create policy "Admins can update content" on public.site_content
for update to authenticated using (
  exists(select 1 from public.admin_users where user_id = auth.uid())
) with check (
  exists(select 1 from public.admin_users where user_id = auth.uid())
);

insert into storage.buckets (id, name, public)
values ('portfolio-assets','portfolio-assets',true)
on conflict (id) do update set public = true;
create policy "Public portfolio image access" on storage.objects
for select to public using (bucket_id = 'portfolio-assets');
create policy "Admins upload portfolio images" on storage.objects
for insert to authenticated with check (
  bucket_id = 'portfolio-assets' and
  exists(select 1 from public.admin_users where user_id = auth.uid())
);
create policy "Admins update portfolio images" on storage.objects
for update to authenticated using (
  bucket_id = 'portfolio-assets' and
  exists(select 1 from public.admin_users where user_id = auth.uid())
);
create policy "Admins delete portfolio images" on storage.objects
for delete to authenticated using (
  bucket_id = 'portfolio-assets' and
  exists(select 1 from public.admin_users where user_id = auth.uid())
);

insert into public.site_content (id,content) values ('main', '{
  "heroTitle":"생각을 카드로,<br><em>콘텐츠를 브랜드로.</em>",
  "heroLead":"오로라닉은 심리 콘텐츠와 타로카드의 기획부터 카드 디자인, AI 이미지, 상세페이지와 웹페이지까지 하나의 이야기로 완성합니다.",
  "aboutTitle":"마음속 이야기를<br>손에 잡히는 콘텐츠로",
  "aboutText":"한 장의 카드에는 질문과 상징, 감정과 경험이 함께 담깁니다. 오로라닉은 복잡한 심리·철학 콘텐츠를 누구나 보고, 만지고, 사용할 수 있는 시각 언어로 바꿉니다.",
  "kakaoUrl":"https://open.kakao.com/o/slXbPiBi",
  "channelUrl":"https://litt.ly/auroranik",
  "projects":[
    {"name":"오로라컬러카드","description":"색채 심리와 감정을 연결한 셀프 리딩 카드. 직관적인 컬러 시스템과 모바일 콘텐츠를 하나의 경험으로 설계했습니다.","tags":"CONTENTS · CARD DESIGN · DETAIL PAGE","image":"assets/aurora-color.png"},
    {"name":"구궁카드","description":"동양 상징 체계를 현대적인 컬러와 이미지로 재해석한 81장 카드 프로젝트.","tags":"CONCEPT · ILLUSTRATION · PACKAGE","image":"assets/gugung.jpeg"},
    {"name":"유천주역가이드카드","description":"주역의 괘상과 해설을 한눈에 이해하도록 정보와 상징을 함께 담은 가이드 카드.","tags":"INFORMATION DESIGN · GUIDE CARD","image":"assets/yucheon-guide.png"},
    {"name":"유천주역 64괘","description":"64괘의 의미와 일상의 질문을 연결해 매일 한 장씩 펼쳐보는 주역 콘텐츠로 구성했습니다.","tags":"64 CONTENTS · CARD SYSTEM · PRODUCT PAGE","image":"assets/yucheon-64.png"},
    {"name":"달마일장경카드","description":"전통 역학의 시간 체계를 선명한 색과 캐릭터 일러스트로 풀어낸 카드 디자인.","tags":"VISUAL IDENTITY · CHARACTER · MOCKUP","image":"assets/dharma.png"},
    {"name":"래빗마르세유타로","description":"마르세유 타로의 원형을 친근한 토끼 캐릭터로 재구성한 감성 타로 덱.","tags":"TAROT · CHARACTER DESIGN · DETAIL PAGE","image":"assets/rabbit.jpg"}
  ]
}'::jsonb)
on conflict (id) do nothing;

-- Authentication > Users에서 관리자 계정을 만든 후 UUID를 아래에 넣고 실행하세요.
-- insert into public.admin_users(user_id) values ('관리자-사용자-UUID');