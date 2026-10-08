import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

test('오로라컬러카드 프로젝트가 전용 상세페이지로 연결된다', () => {
  assert.equal(existsSync('aurora-color.html'), true, 'aurora-color.html 상세페이지가 필요합니다');
  const landing = readFileSync('index.html', 'utf8');
  assert.match(landing, /href=["']aurora-color\.html["']/, '랜딩페이지에 상세페이지 링크가 필요합니다');
});

test('상세페이지가 세 개의 제공 이미지와 상담 링크를 포함한다', () => {
  const detail = readFileSync('aurora-color.html', 'utf8');
  for (const image of ['aurora-color-hero-01.png','aurora-color-hero-02.png','aurora-color-detail.jpg']) {
    assert.match(detail, new RegExp('assets/' + image.replace('.', '\\.')), image + '가 상세페이지에 필요합니다');
  }
  assert.match(detail, /https:\/\/open\.kakao\.com\/o\/slXbPiBi/, '카카오 상담 링크가 필요합니다');
});