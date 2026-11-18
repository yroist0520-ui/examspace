export type ExamCode = 'kaoyan1' | 'kaoyan2' | 'cet4' | 'cet6' | 'tem4' | 'tem8';

export type PartKind = 'listening' | 'reading' | 'cloze' | 'vocabulary' | 'translation' | 'writing';

export type QuestionType = 'single' | 'blank' | 'bank' | 'translation' | 'writing';

export interface ExamDef {
  code: ExamCode;
  name: string;
  short: string;
  alias: string;
  blurb: string;
  accent: string;
  defaultMinutes: number;
  years: number[];
  kinds: PartKind[];
}

export interface Option {
  key: string;
  text: string;
}

export interface Evidence {
  paragraphId: string;
  quote?: string;
}

export interface Question {
  id: string;
  number: number;
  type: QuestionType;
  stem: string;
  options?: Option[];
  answer: string;
  explanation: string;
  evidence?: Evidence;
  score: number;
  groupId?: string;
}

export interface Paragraph {
  id: string;
  /** 段落标记，例如 A / B，用于题目定位 */
  marker?: string;
  text: string;
}

export interface Passage {
  id: string;
  title?: string;
  source?: string;
  paragraphs: Paragraph[];
}

export interface AudioSegment {
  id: string;
  label: string;
  text: string;
  /** 关联题号，用于单题循环 */
  questionNo?: number;
  seconds?: number;
}

export interface AudioTrack {
  /** 存在真实音频时使用；为空时使用浏览器语音合成朗读 transcript */
  src?: string;
  segments: AudioSegment[];
  note?: string;
}

export interface PaperPart {
  id: string;
  kind: PartKind;
  title: string;
  instructions: string;
  minutes?: number;
  passages?: Passage[];
  questions: Question[];
  audio?: AudioTrack;
  bank?: Record<string, string>;
  reference?: { translation?: string; essay?: string; guidance?: string[] };
}

export interface Paper {
  id: string;
  exam: ExamCode;
  year: number;
  session: string;
  setNo?: number;
  title: string;
  subtitle: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  minutes: number;
  words: number;
  tags: string[];
  summary: string;
  parts: PaperPart[];
  /** 示例数据标记，避免与真实真题混淆 */
  sample: boolean;
  sampleNote?: string;
  /** 真实资源的来源、授权与核验记录 */
  provenance?: Provenance;
}

export interface PaperMeta {
  id: string;
  exam: ExamCode;
  year: number;
  session: string;
  setNo?: number;
  title: string;
  subtitle: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  minutes: number;
  words: number;
  tags: string[];
  summary: string;
  sample: boolean;
  provenance?: Provenance;
  hasAudio: boolean;
  kinds: PartKind[];
  questionCount: number;
}

/** 授权状态：仅记录合法可用方式；无授权不转载 */
export type LicenseKind = 'authorized' | 'link-only' | 'unknown' | 'none';

/** 内容核验状态 */
export type VerifyState = 'verified' | 'pending' | 'unverified';

/** 资源状态标记（正式列表展示用） */
export type ResourceFlag =
  | 'collected' // 已收录（站内有经授权的完整内容）
  | 'external-only' // 仅提供外部来源链接
  | 'no-audio' // 缺少原始听力音频
  | 'no-answers' // 缺少参考答案
  | 'no-analysis' // 缺少可靠解析
  | 'pending' // 待核验
  | 'no-legal-resource'; // 暂无合法可用资源

/** 单一资源来源 */
export interface PaperSource {
  /** 发布机构 / 渠道名称 */
  name: string;
  kind: '试题' | '答案' | '解析' | '听力音频' | '页面';
  license: LicenseKind;
  /** 核验日期 YYYY-MM-DD */
  verifiedAt?: string;
  /** 该来源的补充说明（覆盖范围、限制等） */
  note?: string;
}

/** 试卷的来源、授权与核验记录 */
export interface Provenance {
  sources: PaperSource[];
  license: LicenseKind;
  verification: VerifyState;
  flags: ResourceFlag[];
  /** 最近核验日期 YYYY-MM-DD */
  checkedAt?: string;
  note?: string;
}

/** 持久化：答题会话 */
export interface Attempt {
  id: string;
  paperId: string;
  mode: 'exam' | 'practice';
  scopePartIds: string[];
  startedAt: number;
  submittedAt?: number;
  elapsedSec: number;
  answers: Record<string, string>;
  result?: AttemptResult;
}

export interface AttemptResult {
  autoScore: number;
  autoTotal: number;
  correct: number;
  wrong: number;
  unanswered: number;
  byPart: { partId: string; title: string; correct: number; total: number }[];
  manualPending: number;
}

export interface WordEntry {
  id: string;
  word: string;
  addedAt: number;
  source?: { paperId: string; paperTitle: string; partId?: string; sentence?: string };
  tag: string;
  box: number;
  reviewCount: number;
  lastReviewedAt?: number;
  nextReviewAt: number;
  mastered: boolean;
}

export interface MistakeRecord {
  id: string;
  paperId: string;
  paperTitle: string;
  exam: ExamCode;
  year: number;
  partId: string;
  questionId: string;
  questionNo: number;
  kind: PartKind;
  wrongCount: number;
  lastWrongAt: number;
  mastered: boolean;
  lastAnswer: string;
}

export interface Highlight {
  id: string;
  paperId: string;
  partId: string;
  paragraphId: string;
  start: number;
  end: number;
  quote: string;
  color: 'brand' | 'amber' | 'rose';
  note?: string;
  createdAt: number;
}

export interface ReadingPosition {
  paperId: string;
  partId: string;
  ratio: number;
  updatedAt: number;
}

export interface Draft {
  id: string;
  paperId: string;
  questionId: string;
  text: string;
  updatedAt: number;
  selfScore?: number;
}

export interface Bookmark {
  paperId: string;
  createdAt: number;
}

export interface DailyStat {
  date: string;
  minutes: number;
  answered: number;
  correct: number;
  wordsAdded: number;
}

export interface LexiconEntry {
  word: string;
  phonetic: string;
  pos: string;
  senses: { pos: string; cn: string }[];
  example?: string;
  exampleCn?: string;
  collocations?: string[];
  level?: string;
  examTags?: string[];
  syllables?: string;
}

export interface Settings {
  theme: 'paper' | 'sepia' | 'night';
  paperSize: number;
  lineHeight: number;
  wordSound: boolean;
  autoNext: boolean;
  dailyGoalMinutes: number;
  showAnswersInReader: boolean;
  examDate: string;
}