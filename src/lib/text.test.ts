import { describe, expect, it } from 'vitest';
import { countWords, escapeRegExp, formatClock, highlightMatches, relativeDay, tokenize } from './text';

describe('tokenize', () => {
  it('切分单词与非单词令牌并保持偏移', () => {
    const tokens = tokenize("It's a dog, isn't it?");
    const words = tokens.filter((t) => t.word);
    expect(words.map((t) => t.text)).toEqual(["It's", 'a', 'dog', "isn't", 'it']);
    // 偏移可还原原文
    const text = "It's a dog, isn't it?";
    for (const t of tokens) {
      expect(text.slice(t.start, t.end)).toBe(t.text);
    }
  });

  it('空串返回空数组', () => {
    expect(tokenize('')).toEqual([]);
  });
});

describe('countWords', () => {
  it('统计英文单词数，忽略标点与数字', () => {
    expect(countWords('Hello, world! 2024 tests.')).toBe(3);
    expect(countWords('   ')).toBe(0);
  });
});

describe('formatClock', () => {
  it('格式化秒数为时:分:秒', () => {
    expect(formatClock(65)).toBe('01:05');
    expect(formatClock(3600 + 125)).toBe('1:02:05');
    expect(formatClock(0)).toBe('00:00');
    expect(formatClock(-5)).toBe('00:00');
  });
});

describe('relativeDay', () => {
  it('今天 / 昨天 / 天数', () => {
    const now = Date.now();
    expect(relativeDay(now)).toBe('今天');
    expect(relativeDay(now - 86400000)).toBe('昨天');
    expect(relativeDay(now - 3 * 86400000)).toBe('3 天前');
  });
});

describe('highlightMatches', () => {
  it('忽略大小写定位引文', () => {
    expect(highlightMatches('The quick brown fox', 'BROWN')).toEqual([10, 15]);
    expect(highlightMatches('text', 'missing')).toEqual([]);
    expect(highlightMatches('text', '  ')).toEqual([]);
    expect(highlightMatches('text')).toEqual([]);
  });
});

describe('escapeRegExp', () => {
  it('转义正则特殊字符', () => {
    const re = new RegExp(escapeRegExp('a.b*c'), 'i');
    expect(re.test('a.b*c')).toBe(true);
    expect(re.test('axbxc')).toBe(false);
  });
});
