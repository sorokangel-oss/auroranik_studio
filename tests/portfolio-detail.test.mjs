import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

test('오로라컬러카드 프로젝트가 전용 상세페이지로 연결된다', () => {
  assert.equal(existsSync('aurora-color.html'), true, 'aurora-color.html 상세페이지가 필요합니다');
  const landing = readFileSync('index.html', 'utf8');
  assert.match(landing, /href=["']aurora-color\.html["']/, '랜딩페이지에 상세페이지 링크가 필요합니다');
});

test('상세페이지가 분할 상세 이미지 16장을 순서대로 표시한다', () => {
  const detail = readFileSync('aurora-color.html', 'utf8');
  const expected = [
    ...Array.from({length:15}, (_,i) => 'assets/aurora-detail-' + String(i+1).padStart(2,'0') + '.jpg'),
    'assets/aurora-detail-16-1.jpg'
  ];
  let cursor = -1;
  for (const image of expected) {
    const next = detail.indexOf(image);
    assert.ok(next > cursor, image + '가 앞 이미지 이후에 표시되어야 합니다');
    cursor = next;
  }
  assert.doesNotMatch(detail, /assets\/aurora-color-detail\.jpg/, '기존 단일 상세 이미지는 사용하지 않아야 합니다');
});

test('상세페이지가 상담 링크를 포함한다', () => {
  const detail = readFileSync('aurora-color.html', 'utf8');
  assert.match(detail, /https:\/\/open\.kakao\.com\/o\/slXbPiBi/, '카카오 상담 링크가 필요합니다');
});

test('구궁카드 프로젝트가 전용 상세페이지로 연결된다', () => {
  assert.equal(existsSync('gugung.html'), true, 'gugung.html 상세페이지가 필요합니다');
  const landing = readFileSync('index.html', 'utf8');
  assert.match(landing, /href=["']gugung\.html["']/, '구궁카드에 상세페이지 링크가 필요합니다');
});

test('구궁카드 상세페이지가 PDF 기반 이미지 10장을 순서대로 표시한다', () => {
  const page = readFileSync('gugung.html', 'utf8');
  const detail = page.slice(page.indexOf('<div class="detail-sheet'), page.indexOf('</div><aside'));
  const expected = Array.from(
    {length: 10},
    (_, i) => 'assets/gugung-detail-' + String(i + 1).padStart(2, '0') + '.jpg'
  );
  let cursor = -1;
  for (const image of expected) {
    const next = detail.indexOf(image);
    assert.ok(next > cursor, image + '가 앞 이미지 이후에 표시되어야 합니다');
    cursor = next;
  }
});

test('구궁카드 상세페이지가 상담과 채널 링크를 제공한다', () => {
  const detail = readFileSync('gugung.html', 'utf8');
  assert.match(detail, /https:\/\/open\.kakao\.com\/o\/slXbPiBi/, '카카오 상담 링크가 필요합니다');
  assert.match(detail, /https:\/\/litt\.ly\/auroranik/, '오로라닉 채널 링크가 필요합니다');
});

test('유천주역가이드카드 프로젝트가 전용 상세페이지로 연결된다', () => {
  assert.equal(existsSync('yucheon-iching.html'), true, 'yucheon-iching.html 상세페이지가 필요합니다');
  const landing = readFileSync('index.html', 'utf8');
  assert.match(landing, /href=["']yucheon-iching\.html["']/, '유천주역가이드카드에 상세페이지 링크가 필요합니다');
});

test('유천주역카드 상세페이지가 첨부 제품 이미지를 표시한다', () => {
  const detail = readFileSync('yucheon-iching.html', 'utf8');
  const images = [
    'assets/yucheon-main-01.png', 'assets/yucheon-main-02.png', 'assets/yucheon-main-03.png',
    'assets/yucheon-001.jpeg', 'assets/yucheon-002.jpeg', 'assets/yucheon-003.jpeg',
    'assets/yucheon-64.png', 'assets/yucheon-card-detail.png', 'assets/yucheon-faq.png'
  ];
  for (const image of images) {
    assert.match(detail, new RegExp(image.replaceAll('.', '\\.')), image + '가 상세페이지에 필요합니다');
    assert.equal(existsSync(image), true, image + ' 파일이 필요합니다');
  }
});

test('유천주역카드 상세페이지가 64괘 안내와 상담 링크를 제공한다', () => {
  const detail = readFileSync('yucheon-iching.html', 'utf8');
  assert.match(detail, /64괘/, '64괘 상품 설명이 필요합니다');
  assert.match(detail, /https:\/\/open\.kakao\.com\/o\/slXbPiBi/, '카카오 상담 링크가 필요합니다');
  assert.match(detail, /https:\/\/litt\.ly\/auroranik/, '오로라닉 채널 링크가 필요합니다');
});


