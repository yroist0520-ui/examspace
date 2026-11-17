# EXAMSPACE 数据结构

数据分两层：**静态试卷数据**（构建期打包的 TS 模块）与**用户数据**（浏览器 IndexedDB）。
类型定义统一在 [src/types/paper.ts](../src/types/paper.ts)，数据库访问统一在 [src/db/index.ts](../src/db/index.ts)。

## 1. 静态试卷数据（src/data/）

所有试卷标记 `sample: true`，为功能演示用示例数据，未使用未经授权的真题。

### Paper（试卷）

```ts
interface Paper {
  id: string;              // 如 "cet4-2024-12-01"
  exam: ExamCode;          // kaoyan1 | kaoyan2 | cet4 | cet6 | tem4 | tem8
  year: number; session: string; setNo?: number;
  title: string; subtitle: string;
  difficulty: 1|2|3|4|5; minutes: number; words: number;
  tags: string[]; summary: string;
  parts: PaperPart[];      // 题部
  sample: true; sampleNote: string;
}
```

### PaperPart（题部）

```ts
type PartKind = 'listening'|'reading'|'cloze'|'vocabulary'|'translation'|'writing';

interface PaperPart {
  id: string; kind: PartKind; title: string; instructions: string;
  minutes?: number;
  passages?: Passage[];          // 阅读/完形文章（含段落 Paragraph[]）
  questions: Question[];         // 题目
  audio?: AudioTrack;            // 听力：segments 分段 + transcript；无真实音频时用语音合成
  bank?: Record<string,string>;  // 选词填空词库
  reference?: { translation?; essay?; guidance?[] }; // 主观题参考答案
}
```

### Question（题目）

```ts
type QuestionType = 'single'|'blank'|'bank'|'translation'|'writing';

interface Question {
  id: string; number: number; type: QuestionType;
  stem: string; options?: Option[];       // single 为 A-D 选项
  answer: string;                          // 客观题标准答案；主观题为空
  explanation: string;                     // 解析
  evidence?: { paragraphId: string; quote?: string }; // 题文联动定位
  score: number; groupId?: string;
}
```

判分规则（[src/lib/score.ts](../src/lib/score.ts)）：`single/blank/bank` 客观自动判分
（忽略大小写与多余空白），`translation/writing` 计入 `manualPending` 人工核对；
`scoreAttempt(paper, answers, scopePartIds?, scopeQuestionIds?)` 支持按部分/按题圈定（错题重练）。

## 2. 用户数据（IndexedDB：`examspace`）

Dexie 库名 `examspace`，当前 schema 版本 2。

| 表 | 主键 / 索引 | 说明 |
|---|---|---|
| `attempts` | `id`；`paperId, startedAt, mode` | 答题会话 |
| `words` | `id`；`word, addedAt, nextReviewAt, mastered, tag` | 生词本 |
| `mistakes` | `id`（`paperId::questionId`）；`paperId, questionId, kind, mastered, lastWrongAt` | 错题本 |
| `highlights` | `id`；`paperId, createdAt` | 阅读高亮与批注 |
| `positions` | `paperId` | 阅读位置（partId + 滚动比例） |
| `drafts` | `id`（`paperId::questionId`；范文 `essay::paperId::qid`）；`paperId, updatedAt` | 作答草稿 / 收藏范文 |
| `bookmarks` | `paperId`；`paperId, createdAt`（v2 新增） | 试卷收藏 |
| `daily` | `date`（`YYYY-MM-DD`） | 每日学习统计 |
| `settings` | `key`（`app`） | 应用设置（单行 JSON） |
| `pdfs` | `paperId` | 用户导入的 PDF 原卷（Blob） |

### 核心记录结构

```ts
// 答题会话
interface Attempt {
  id: string; paperId: string;
  mode: 'exam' | 'practice';       // 模拟考试 / 练习（含错题重练 retry）
  scopePartIds: string[];
  startedAt: number; submittedAt?: number; elapsedSec: number;
  answers: Record<questionId, string>;   // 每答一题即持久化，刷新不丢
  result?: AttemptResult;                // 判分快照
}
interface AttemptResult {
  autoScore: number; autoTotal: number;  // 客观题得分/总分
  correct: number; wrong: number; unanswered: number;
  byPart: { partId; title; correct; total }[];
  manualPending: number;                 // 主观题待人工核对数
}

// 生词（Leitner 记忆箱）
interface WordEntry {
  id: string;                 // "w-" + word 小写（同词去重）
  word: string; addedAt: number;
  source?: { paperId; paperTitle; partId?; sentence? }; // 出处语境（点词查词自动记录）
  tag: string;
  box: number;                // 记忆箱 0-7（7 = 已掌握）
  reviewCount: number; lastReviewedAt?: number;
  nextReviewAt: number;       // 下次复习时间戳（到期计算见 srs.ts）
  mastered: boolean;
}

// 错题
interface MistakeRecord {
  id: string;                 // paperId::questionId，重复答错合并计数
  paperId; paperTitle; exam; year; partId; questionId; questionNo; kind;
  wrongCount: number; lastWrongAt: number;
  mastered: boolean; lastAnswer: string;
}

// 每日统计
interface DailyStat {
  date: string;               // YYYY-MM-DD（主键）
  minutes: number; answered: number; correct: number; wordsAdded: number;
}

// 设置（key = "app"，与 defaultSettings 合并读取）
interface Settings {
  theme: 'paper'|'sepia'|'night';   // 三主题（data-theme 切换 CSS 运行时变量）
  paperSize: number; lineHeight: number;
  wordSound: boolean; autoNext: boolean;
  dailyGoalMinutes: number; showAnswersInReader: boolean;
  examDate: string;                 // 首页倒计时目标日
}
```

另有 `Highlight`（段落内 `start/end` 字符偏移 + 三色 + 笔记）、`ReadingPosition`、
`Draft`、`Bookmark`、`LexiconEntry`（演示词库 94 词，[src/data/lexicon.ts](../src/data/lexicon.ts)）。

## 3. 关键算法

| 算法 | 位置 | 说明 |
|---|---|---|
| Leitner 遗忘曲线 | [src/lib/srs.ts](../src/lib/srs.ts) | 间隔 `[0,1,2,4,7,15,30,60]` 天；认识升箱、忘记回箱 1、模糊保持原箱 |
| 判分 | [src/lib/score.ts](../src/lib/score.ts) | 客观题规范化比对 + 作用域圈题 + 正确率/时长聚合 |
| 分词查词 | [src/lib/text.ts](../src/lib/text.ts) | 单词令牌切分（保留字符偏移，供高亮与查词定位） |
| 连续学习天数 | `srs.streakDays` | 今天未学时从昨天起算，断档只计最近一段 |
