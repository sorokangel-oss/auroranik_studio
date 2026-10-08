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