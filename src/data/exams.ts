import type { ExamCode, ExamDef } from '@/types/paper';

export const exams: ExamDef[] = [
  {
    code: 'kaoyan1',
    name: '考研英语（一）',
    short: '考研英语一',
    alias: 'Postgraduate Entrance Exam · English I',
    blurb: '学术型硕士统考，阅读与写作权重高，长难句密集。',
    accent: '#1F5D4C',
    defaultMinutes: 180,
    years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018],
    kinds: ['cloze', 'reading', 'translation', 'writing']
  },
  {
    code: 'kaoyan2',
    name: '考研英语（二）',
    short: '考研英语二',
    alias: 'Postgraduate Entrance Exam · English II',
    blurb: '专业学位硕士统考，题材偏应用与商业，题型结构略有差异。',
    accent: '#2E705C',
    defaultMinutes: 180,
    years: [2026, 2025, 2024, 2023, 2022, 2021, 2020],
    kinds: ['cloze', 'reading', 'translation', 'writing']
  },
  {
    code: 'cet4',
    name: '大学英语四级',
    short: '四级',
    alias: 'CET-4',
    blurb: '听力、阅读、写作与翻译四部分，425 分为常见通过线。',
    accent: '#C48F2B',
    defaultMinutes: 125,
    years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
    kinds: ['writing', 'listening', 'reading', 'cloze', 'translation']
  },
  {
    code: 'cet6',
    name: '大学英语六级',
    short: '六级',
    alias: 'CET-6',
    blurb: '与四级同构，词汇与语篇难度更高，长对话与讲座占比大。',
    accent: '#B4413A',
    defaultMinutes: 130,
    years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018],
    kinds: ['writing', 'listening', 'reading', 'cloze', 'translation']
  },
  {
    code: 'tem4',
    name: '英语专业四级',
    short: '专四',
    alias: 'TEM-4',
    blurb: '英语专业基础阶段考试，听写、听力、语言知识、阅读与写作。',
    accent: '#4C8E7B',
    defaultMinutes: 130,
    years: [2025, 2024, 2023, 2022, 2021, 2019],
    kinds: ['listening', 'cloze', 'reading', 'writing']
  },
  {
    code: 'tem8',
    name: '英语专业八级',
    short: '专八',
    alias: 'TEM-8',
    blurb: '英语专业高年级阶段考试，强调听力理解、改错、翻译与写作。',
    accent: '#194A3D',
    defaultMinutes: 150,
    years: [2025, 2024, 2023, 2022, 2021, 2019],
    kinds: ['listening', 'reading', 'translation', 'writing']
  }
];

export const examMap = new Map(exams.map((e) => [e.code, e]));

export function examName(code: ExamCode): string {
  return examMap.get(code)?.name ?? code;
}

export const partKindLabel: Record<string, string> = {
  listening: '听力',
  reading: '阅读',
  cloze: '完形 / 选词',
  vocabulary: '词汇',
  translation: '翻译',
  writing: '写作'
};

export const difficultyLabel = ['入门', '基础', '进阶', '较难', '挑战'];