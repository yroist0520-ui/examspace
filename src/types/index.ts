/**
 * EXAMSPACE 核心类型定义
 * 包含所有业务实体、枚举和接口定义
 */

// ==================== 基础枚举类型 ====================

/** 考试类型 */
export type ExamType =
  | 'kaoyan-1'    // 考研英语一
  | 'kaoyan-2'    // 考研英语二
  | 'cet-4'       // 大学英语四级
  | 'cet-6'       // 大学英语六级
  | 'tem-4'       // 英语专业四级
  | 'tem-8'       // 英语专业八级
  | 'other';      // 其他可扩展考试

/** 题目类型 */
export type QuestionType =
  | 'choice-single'    // 单项选择
  | 'choice-multiple'  // 多项选择
  | 'fill-blank'       // 填空题
  | 'reading'          // 阅读理解
  | 'listening'        // 听力题
  | 'translation'      // 翻译题
  | 'writing'          // 写作题
  | 'cloze'            // 完形填空
  | 'matching'         // 匹配题
  | 'ordering'         // 排序题
  | 'dictation';       // 听写题

/** 练习模式 */
export type PracticeMode =
  | 'exam'       // 模拟考试模式（限时、不可暂停、不可查答案）
  | 'practice'   // 练习模式（不限时、可暂停、可查答案解析）
  | 'review'     // 复习模式（查看答案解析、错题回顾）
  | 'targeted';  // 专项练习（按题型/知识点）

/** 用户单词熟练度等级 (0-5，对应遗忘曲线阶段) */
export type WordProficiency = 0 | 1 | 2 | 3 | 4 | 5;

/** 同步状态 */
export type SyncStatus = 'synced' | 'pending' | 'conflict' | 'error';

/** 练习记录状态 */
export type PracticeStatus = 'not-started' | 'in-progress' | 'paused' | 'completed' | 'abandoned';

/** 书签类型 */
export type BookmarkType = 'paper' | 'section' | 'question' | 'word' | 'note';

/** 笔记关联类型 */
export type NoteTargetType = 'paper' | 'section' | 'question' | 'word';

/** 高亮颜色 */
export type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink' | 'orange' | 'purple';

/** 音频播放状态 */
export type AudioPlaybackState = 'idle' | 'loading' | 'playing' | 'paused' | 'ended' | 'error';

/** 主题模式 */
export type ThemeMode = 'light' | 'dark' | 'system';

// ==================== 考试/题库元数据 ====================

/** 考试类型元数据 */
export interface ExamTypeMeta {
  id: ExamType;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  levels: string[]; // 如 ['英语一', '英语二']
  years: number[];
  sections: string[]; // 支持的章节类型
}

/** 年份元数据 */
export interface YearMeta {
  year: number;
  label: string;
  paperCount: number;
  hasAudio: boolean;
  hasAnalysis: boolean;
}

/** 题型元数据 */
export interface QuestionTypeMeta {
  type: QuestionType;
  name: string;
  description: string;
  icon: string;
  estimatedTime: number; // 预估答题时间(秒)
  supportAutoScore: boolean;
}

// ==================== 试卷结构 ====================

/** 试卷基础信息 */
export interface ExamPaper {
  id: string;
  examType: ExamType;
  year: number;
  name: string; // 如 "2024年考研英语一真题"
  code?: string; // 试卷代码
  description?: string;
  coverImage?: string;
  totalScore: number;
  duration: number; // 考试时长(分钟)
  sections: string[]; // 章节ID数组
  tags: string[];
  isPublished: boolean;
  source?: string; // 来源标注
  license?: string; // 版权声明
  metadata?: Record<string, unknown>;
  createdAt: number;
  updatedAt: number;
}

/** 试卷章节 */
export interface PaperSection {
  id: string;
  paperId: string;
  order: number;
  type: QuestionType;
  name: string; // 如 "Section I: 完形填空"
  description?: string;
  instructions?: string; // 做题要求
  questions: string[]; // 题目ID数组
  score: number; // 本章节总分
  timeLimit?: number; // 章节限时(分钟)，可选
  metadata?: Record<string, unknown>;
}

/** 题目基础结构 */
export interface Question {
  id: string;
  sectionId: string;
  order: number;
  type: QuestionType;
  content: QuestionContent;
  options?: QuestionOption[];
  answer: QuestionAnswer;
  analysis?: QuestionAnalysis;
  score: number;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
  audioUrl?: string; // 听力题音频
  audioStartTime?: number; // 音频开始时间(秒)
  audioEndTime?: number; // 音频结束时间(秒)
  metadata?: Record<string, unknown>;
}

/** 题目内容（根据题型不同结构不同） */
export interface QuestionContent {
  // 通用字段
  stem?: string; // 题干文本
  passage?: string; // 篇章/材料（阅读、完形、翻译）
  passageTitle?: string;
  paragraphs?: string[]; // 分段落文本（用于段落定位）

  // 选择题特有
  questionText?: string; // 具体问题

  // 填空题特有
  blanks?: BlankItem[];

  // 翻译题特有
  sourceText?: string; // 源文本
  targetLanguage?: 'zh' | 'en';

  // 写作题特有
  prompt?: string; // 作文题目/提示
  wordLimit?: { min: number; max: number };
  type?: 'argument' | 'chart' | 'letter' | 'application';

  // 听力题特有
  audioScript?: string; // 听力原文
  questions?: SubQuestion[]; // 复合听力的子题
}

/** 空白项（填空题） */
export interface BlankItem {
  id: string;
  beforeText: string;
  afterText: string;
  answer: string | string[]; // 标准答案（可多个）
  caseSensitive?: boolean;
  fuzzyMatch?: boolean;
}

/** 子题（听力/阅读组合题） */
export interface SubQuestion {
  id: string;
  order: number;
  questionText: string;
  options?: QuestionOption[];
  answer: QuestionAnswer;
  analysis?: QuestionAnalysis;
}

/** 选择题选项 */
export interface QuestionOption {
  id: string; // A, B, C, D
  label: string;
  content: string;
}

/** 题目答案 */
export interface QuestionAnswer {
  // 选择题
  choices?: string[]; // ['A'] 或 ['A', 'C']
  // 填空题
  blanks?: Record<string, string | string[]>; // blankId -> answer
  // 主观题
  text?: string; // 参考答案文本
  keyPoints?: string[]; // 评分关键点
  // 通用
  acceptedVariants?: string[]; // 可接受的变体答案
}

/** 题目解析 */
export interface QuestionAnalysis {
  explanation: string; // 详细解析
  keyPoints?: string[]; // 核心考点
  vocabulary?: VocabularyItem[]; // 重点词汇
  grammarNotes?: string; // 语法点拨
  translation?: string; // 全文翻译（阅读/听力）
  tips?: string; // 解题技巧
  relatedQuestions?: string[]; // 相关题目ID
}

/** 词汇项（解析中用到） */
export interface VocabularyItem {
  word: string;
  phonetic?: string;
  definition: string;
  context?: string; // 语境例句
}

// ==================== 用户学习数据 ====================

/** 用户答题记录 */
export interface UserAnswer {
  questionId: string;
  userAnswer: QuestionAnswer;
  isCorrect?: boolean;
  score?: number; // 获得分数
  timeSpent: number; // 答题耗时(秒)
  attempts: number; // 尝试次数
  answeredAt: number;
}

/** 用户练习记录 */
export interface UserPracticeRecord {
  id: string;
  userId: string;
  paperId: string;
  examType: ExamType;
  mode: PracticeMode;
  status: PracticeStatus;
  startTime: number;
  endTime?: number;
  timeSpent: number; // 总耗时(秒)
  answers: UserAnswer[];
  currentQuestionIndex: number;
  score?: number;
  totalScore?: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  sectionScores?: Record<string, { score: number; total: number }>;
  isSubmitted: boolean;
  submittedAt?: number;
  metadata?: Record<string, unknown>;
}

/** 用户单词记录 */
export interface UserWordRecord {
  id: string;
  userId: string;
  word: string;
  phonetic?: string;
  definitions: WordDefinition[];
  source: WordSource;
  proficiency: WordProficiency; // 0-5
  reviewCount: number;
  correctCount: number;
  wrongCount: number;
  lastReviewedAt: number;
  nextReviewAt: number;
  interval: number; // 当前间隔(天)
  easeFactor: number; // SM-2 易用因子
  tags: string[];
  isStarred: boolean;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

/** 单词释义 */
export interface WordDefinition {
  partOfSpeech: string;
  definition: string;
  examples?: string[];
  synonyms?: string[];
  antonyms?: string[];
}

/** 单词来源 */
export interface WordSource {
  type: 'paper' | 'section' | 'question' | 'manual' | 'import';
  paperId?: string;
  sectionId?: string;
  questionId?: string;
  context?: string; // 来源语境
}

/** 用户错题记录 */
export interface UserWrongQuestion {
  id: string;
  userId: string;
  questionId: string;
  paperId: string;
  sectionId: string;
  examType: ExamType;
  questionType: QuestionType;
  userAnswers: UserAnswer[]; // 历次作答记录
  wrongCount: number;
  lastWrongAt: number;
  isMastered: boolean;
  masteredAt?: number;
  nextReviewAt?: number;
  reviewInterval: number; // 复习间隔(天)
  tags: string[];
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

/** 用户书签 */
export interface UserBookmark {
  id: string;
  userId: string;
  type: BookmarkType;
  targetId: string; // paperId / sectionId / questionId / wordId
  paperId?: string;
  title: string;
  excerpt?: string; // 选中文本片段
  position?: {
    page?: number;
    offset?: number;
    scrollY?: number;
  };
  color?: HighlightColor;
  tags: string[];
  createdAt: number;
}

/** 用户笔记 */
export interface UserNote {
  id: string;
  userId: string;
  targetType: NoteTargetType;
  targetId: string; // paperId / sectionId / questionId / wordId
  paperId?: string;
  content: string; // 支持 Markdown
  excerpt?: string; // 引用的原文
  position?: {
    page?: number;
    offset?: number;
  };
  tags: string[];
  isPinned: boolean;
  createdAt: number;
  updatedAt: number;
}

/** 用户高亮 */
export interface UserHighlight {
  id: string;
  userId: string;
  paperId: string;
  questionId?: string;
  selectedText: string;
  color: HighlightColor;
  position: {
    page: number;
    startOffset: number;
    endOffset: number;
    startContainerPath: string; // XPath 或 CSS Selector
    endContainerPath: string;
  };
  noteId?: string; // 关联笔记
  createdAt: number;
}

// ==================== 学习统计 ====================

/** 用户学习统计 */
export interface UserStats {
  userId: string;
  // 学习时长
  totalStudyTime: number; // 总学习时长(秒)
  todayStudyTime: number; // 今日学习时长(秒)
  weeklyStudyTime: number; // 本周学习时长(秒)
  monthlyStudyTime: number; // 本月学习时长(秒)
  averageDailyTime: number; // 平均每日学习时长(秒)

  // 试卷完成
  completedPapersCount: number;
  completedPapersByType: Record<ExamType, number>;
  completedPapersByYear: Record<number, number>;

  // 答题统计
  totalQuestionsAttempted: number;
  totalCorrectAnswers: number;
  overallAccuracy: number; // 总正确率
  accuracyByType: Record<QuestionType, { attempted: number; correct: number }>;
  accuracyByExamType: Record<ExamType, { attempted: number; correct: number }>;

  // 单词积累
  totalWordsLearned: number;
  wordsByProficiency: Record<WordProficiency, number>;
  wordsReviewedToday: number;
  wordsMasteredCount: number; // 熟练度 >= 4

  // 错题统计
  totalWrongQuestions: number;
  masteredWrongQuestions: number;
  wrongQuestionsByType: Record<QuestionType, number>;

  // 连续学习
  currentStreak: number; // 当前连续天数
  longestStreak: number; // 最长连续天数
  lastStudyDate: string; // YYYY-MM-DD
  studyCalendar: Record<string, number>; // YYYY-MM-DD -> 学习时长(秒)

  // 收藏统计
  bookmarkCount: number;
  noteCount: number;
  highlightCount: number;

  // 更新时间
  updatedAt: number;
}

/** 每日学习记录 */
export interface DailyStudyLog {
  date: string; // YYYY-MM-DD
  studyTime: number; // 秒
  papersCompleted: string[]; // paperId[]
  questionsAttempted: number;
  correctAnswers: number;
  wordsReviewed: number;
  wordsAdded: number;
  wrongQuestionsReviewed: number;
  sessions: StudySession[];
}

/** 单次学习会话 */
export interface StudySession {
  id: string;
  startTime: number;
  endTime: number;
  type: 'paper' | 'listening' | 'reading' | 'vocabulary' | 'writing' | 'wrong-review';
  paperId?: string;
  duration: number; // 秒
  questionsCount?: number;
  correctCount?: number;
  metadata?: Record<string, unknown>;
}

// ==================== 用户设置 ====================

/** 用户设置 */
export interface UserSettings {
  userId: string;
  // 界面
  theme: ThemeMode;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  fontFamily: 'system' | 'serif' | 'sans' | 'mono';
  lineHeight: number;
  letterSpacing: number;
  reducedMotion: boolean;
  highContrast: boolean;

  // 试卷阅读
  paperViewMode: 'single' | 'double' | 'continuous';
  showPageNumbers: boolean;
  showAnswerToggle: boolean;
  autoSaveReadingPosition: boolean;

  // 练习设置
  autoSaveAnswers: boolean;
  showTimer: boolean;
  timerWarningThreshold: number; // 分钟
  confirmBeforeSubmit: boolean;
  enableKeyboardShortcuts: boolean;

  // 听力设置
  defaultPlaybackRate: number;
  autoPlayNext: boolean;
  loopCurrent: boolean;
  showTranscript: boolean;

  // 查词设置
  dictionarySource: 'built-in' | 'oxford' | 'cambridge' | 'collins' | 'youdao';
  showPhonetic: boolean;
  showExamples: boolean;
  autoPlayPronunciation: boolean;
  pronunciationAccent: 'us' | 'uk';

  // 生词本设置
  reviewAlgorithm: 'sm2' | 'leitner' | 'custom';
  dailyNewWordsLimit: number;
  dailyReviewLimit: number;
  reviewReminderTime?: string; // HH:MM

  // 同步设置
  autoSync: boolean;
  syncOnWifiOnly: boolean;
  backupEnabled: boolean;

  // 通知设置
  pushEnabled: boolean;
  studyReminderEnabled: boolean;
  studyReminderTime?: string; // HH:MM
  streakReminderEnabled: boolean;

  // 隐私
  analyticsEnabled: boolean;
  crashReportingEnabled: boolean;

  updatedAt: number;
}

// ==================== 同步数据结构 ====================

/** 完整同步数据包 */
export interface SyncData {
  papers?: ExamPaper[];
  sections?: PaperSection[];
  questions?: Question[];
  practiceRecords?: UserPracticeRecord[];
  wordRecords?: UserWordRecord[];
  wrongQuestions?: UserWrongQuestion[];
  bookmarks?: UserBookmark[];
  notes?: UserNote[];
  highlights?: UserHighlight[];
  userStats?: UserStats;
  userSettings?: UserSettings;
  dailyLogs?: DailyStudyLog[];
  version: number;
  exportedAt: number;
}

/** 增量同步变更 */
export interface SyncDelta {
  entityType: keyof SyncData;
  operation: 'create' | 'update' | 'delete';
  entityId: string;
  data?: unknown;
  timestamp: number;
  userId: string;
  version: number;
}

// ==================== API/服务接口 ====================

/** 词典查询结果 */
export interface DictionaryResult {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  source: string;
  audioUrls?: { us?: string; uk?: string };
}

/** 音标 */
export interface Phonetic {
  text: string;
  audio?: string;
  source?: string;
}

/** 词义 */
export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms?: string[];
  antonyms?: string[];
}

/** 释义 */
export interface Definition {
  definition: string;
  example?: string;
  translation?: string;
}

/** 听力音频元数据 */
export interface AudioMetadata {
  duration: number;
  format: string;
  bitrate: number;
  sampleRate: number;
  channels: number;
  size: number;
}

/** PDF 页面信息 */
export interface PDFPageInfo {
  pageNumber: number;
  width: number;
  height: number;
  rotation: number;
  textContent?: string;
}

/** 搜索/筛选参数 */
export interface PaperFilterParams {
  examTypes?: ExamType[];
  years?: number[];
  questionTypes?: QuestionType[];
  difficulties?: number[];
  keyword?: string;
  tags?: string[];
  hasAudio?: boolean;
  hasAnalysis?: boolean;
  sortBy?: 'year' | 'name' | 'popularity' | 'difficulty';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

/** 搜索结果 */
export interface SearchResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

// ==================== 组件 Props 类型 ====================

/** 通用加载状态 */
export interface LoadingState {
  isLoading: boolean;
  error?: string;
  progress?: number;
}

/** 分页参数 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/** 排序参数 */
export interface SortParams<T extends string = string> {
  field: T;
  order: 'asc' | 'desc';
}

/** 表格列定义 */
export interface TableColumn<T> {
  key: string;
  header: string;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
}

// ==================== 事件/回调类型 ====================

/** 试卷阅读事件 */
export interface PaperViewEvents {
  onPageChange: (page: number, totalPages: number) => void;
  onTextSelect: (text: string, position: TextSelectionPosition) => void;
  onAnnotationAdd: (annotation: Annotation) => void;
  onAnnotationUpdate: (annotation: Annotation) => void;
  onAnnotationDelete: (id: string) => void;
  onNavigation: (target: NavigationTarget) => void;
}

/** 文本选中位置 */
export interface TextSelectionPosition {
  page: number;
  rect: DOMRect;
  startOffset: number;
  endOffset: number;
  containerPath: string;
}

/** 注释（高亮/笔记/书签） */
export interface Annotation {
  id: string;
  type: 'highlight' | 'note' | 'bookmark';
  page: number;
  position: TextSelectionPosition;
  color?: HighlightColor;
  content?: string;
  metadata?: Record<string, unknown>;
}

/** 导航目标 */
export interface NavigationTarget {
  type: 'page' | 'section' | 'question' | 'bookmark';
  value: string | number;
}

/** 答题事件 */
export interface AnswerEvents {
  onAnswerChange: (questionId: string, answer: QuestionAnswer) => void;
  onQuestionNavigate: (index: number) => void;
  onSubmit: (record: UserPracticeRecord) => void;
  onPause: () => void;
  onResume: () => void;
  onTimeWarning: (remainingSeconds: number) => void;
  onTimeUp: () => void;
}

/** 听力播放事件 */
export interface AudioEvents {
  onPlay: () => void;
  onPause: () => void;
  onEnded: () => void;
  onTimeUpdate: (currentTime: number, duration: number) => void;
  onRateChange: (rate: number) => void;
  onError: (error: Error) => void;
  onLoadedMetadata: (metadata: AudioMetadata) => void;
}

// ==================== 常量 ====================

/** 考试类型元数据常量 */
export const EXAM_TYPE_META: Record<ExamType, ExamTypeMeta> = {
  'kaoyan-1': {
    id: 'kaoyan-1',
    name: '考研英语一',
    shortName: '英语一',
    description: '全国硕士研究生招生考试英语一',
    icon: 'graduation-cap',
    color: '#1e40af',
    levels: ['英语一'],
    years: Array.from({ length: 30 }, (_, i) => 2025 - i),
    sections: ['cloze', 'reading', 'translation', 'writing'],
  },
  'kaoyan-2': {
    id: 'kaoyan-2',
    name: '考研英语二',
    shortName: '英语二',
    description: '全国硕士研究生招生考试英语二',
    icon: 'graduation-cap',
    color: '#1e40af',
    levels: ['英语二'],
    years: Array.from({ length: 30 }, (_, i) => 2025 - i),
    sections: ['cloze', 'reading', 'translation', 'writing'],
  },
  'cet-4': {
    id: 'cet-4',
    name: '大学英语四级',
    shortName: '四级',
    description: '全国大学英语四级考试',
    icon: 'award',
    color: '#166534',
    levels: ['四级'],
    years: Array.from({ length: 30 }, (_, i) => 2025 - i),
    sections: ['listening', 'reading', 'translation', 'writing'],
  },
  'cet-6': {
    id: 'cet-6',
    name: '大学英语六级',
    shortName: '六级',
    description: '全国大学英语六级考试',
    icon: 'award',
    color: '#166534',
    levels: ['六级'],
    years: Array.from({ length: 30 }, (_, i) => 2025 - i),
    sections: ['listening', 'reading', 'translation', 'writing'],
  },
  'tem-4': {
    id: 'tem-4',
    name: '英语专业四级',
    shortName: '专四',
    description: '全国高校英语专业四级考试',
    icon: 'book-open',
    color: '#7c2d12',
    levels: ['专四'],
    years: Array.from({ length: 30 }, (_, i) => 2025 - i),
    sections: ['dictation', 'listening', 'cloze', 'reading', 'writing'],
  },
  'tem-8': {
    id: 'tem-8',
    name: '英语专业八级',
    shortName: '专八',
    description: '全国高校英语专业八级考试',
    icon: 'book-open',
    color: '#7c2d12',
    levels: ['专八'],
    years: Array.from({ length: 30 }, (_, i) => 2025 - i),
    sections: ['listening', 'reading', 'translation', 'writing', 'proofreading'],
  },
  'other': {
    id: 'other',
    name: '其他考试',
    shortName: '其他',
    description: '其他英语考试',
    icon: 'file-text',
    color: '#525252',
    levels: [],
    years: [],
    sections: [],
  },
};

/** 题型元数据常量 */
export const QUESTION_TYPE_META: Record<QuestionType, QuestionTypeMeta> = {
  'choice-single': {
    type: 'choice-single',
    name: '单项选择',
    description: '从四个选项中选择一个正确答案',
    icon: 'circle-dot',
    estimatedTime: 45,
    supportAutoScore: true,
  },
  'choice-multiple': {
    type: 'choice-multiple',
    name: '多项选择',
    description: '从多个选项中选择所有正确答案',
    icon: 'check-square',
    estimatedTime: 60,
    supportAutoScore: true,
  },
  'fill-blank': {
    type: 'fill-blank',
    name: '填空题',
    description: '根据上下文填入正确单词或短语',
    icon: 'type',
    estimatedTime: 30,
    supportAutoScore: true,
  },
  'reading': {
    type: 'reading',
    name: '阅读理解',
    description: '阅读篇章并回答相关问题',
    icon: 'book-open',
    estimatedTime: 120,
    supportAutoScore: true,
  },
  'listening': {
    type: 'listening',
    name: '听力题',
    description: '听取音频材料并回答问题',
    icon: 'volume-2',
    estimatedTime: 90,
    supportAutoScore: true,
  },
  'translation': {
    type: 'translation',
    name: '翻译题',
    description: '将英语翻译为中文或反之',
    icon: 'languages',
    estimatedTime: 180,
    supportAutoScore: false,
  },
  'writing': {
    type: 'writing',
    name: '写作题',
    description: '根据题目要求撰写作文',
    icon: 'pen-tool',
    estimatedTime: 1800,
    supportAutoScore: false,
  },
  'cloze': {
    type: 'cloze',
    name: '完形填空',
    description: '在短文空白处填入最合适的词',
    icon: 'file-text',
    estimatedTime: 120,
    supportAutoScore: true,
  },
  'matching': {
    type: 'matching',
    name: '匹配题',
    description: '将左栏项目与右栏正确匹配',
    icon: 'arrow-right-left',
    estimatedTime: 60,
    supportAutoScore: true,
  },
  'ordering': {
    type: 'ordering',
    name: '排序题',
    description: '将选项按正确顺序排列',
    icon: 'list-ordered',
    estimatedTime: 60,
    supportAutoScore: true,
  },
  'dictation': {
    type: 'dictation',
    name: '听写题',
    description: '听取音频并完整记录文本',
    icon: 'mic',
    estimatedTime: 120,
    supportAutoScore: false,
  },
};

/** 熟练度标签 */
export const PROFICIENCY_LABELS: Record<WordProficiency, string> = {
  0: '新词',
  1: '刚学',
  2: '熟悉',
  3: '掌握',
  4: '精通',
  5: '烂熟',
};

/** 熟练度颜色 */
export const PROFICIENCY_COLORS: Record<WordProficiency, string> = {
  0: '#9ca3af', // gray-400
  1: '#f59e0b', // amber-500
  2: '#3b82f6', // blue-500
  3: '#22c55e', // green-500
  4: '#8b5cf6', // violet-500
  5: '#ec4899', // pink-500
};