/**
 * EXAMSPACE IndexedDB 数据层
 * 使用 idb 库提供类型安全的数据库操作
 */

import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase, IDBPTransaction, StoreNames } from 'idb';
import type {
  ExamPaper,
  PaperSection,
  Question,
  UserPracticeRecord,
  UserWordRecord,
  UserWrongQuestion,
  UserBookmark,
  UserNote,
  UserHighlight,
  UserStats,
  UserSettings,
  SyncData,
  ExamType,
  QuestionType,
  WordProficiency,
} from '../../types';

// ==================== 数据库 Schema 定义 ====================

interface ExamSpaceDB extends DBSchema {
  // 试卷存储
  papers: {
    key: string;
    value: ExamPaper;
    indexes: {
      'by-exam-type': ExamType;
      'by-year': number;
    };
  };
  // 试卷章节（可单独查询）
  sections: {
    key: string;
    value: PaperSection;
    indexes: {
      'by-paper': string;
    };
  };
  // 题目存储
  questions: {
    key: string;
    value: Question;
    indexes: {
      'by-section': string;
      'by-type': QuestionType;
      'by-paper': string; // 通过 section 关联
    };
  };
  // 用户练习记录
  practiceRecords: {
    key: string;
    value: UserPracticeRecord;
    indexes: {
      'by-user': string;
      'by-paper': string;
      'by-status': string;
      'by-start-time': number;
    };
  };
  // 用户单词记录
  wordRecords: {
    key: string;
    value: UserWordRecord;
    indexes: {
      'by-user': string;
      'by-word': string;
      'by-proficiency': WordProficiency;
      'by-next-review': number;
      'by-user-word': [string, string]; // [userId, word]
    };
  };
  // 用户错题
  wrongQuestions: {
    key: string;
    value: UserWrongQuestion;
    indexes: {
      'by-user': string;
      'by-question': string;
      'by-paper': string;
      'by-exam-type': ExamType;
      'by-next-review': number;
      'by-user-question': [string, string]; // [userId, questionId]
    };
  };
  // 用户书签
  bookmarks: {
    key: string;
    value: UserBookmark;
    indexes: {
      'by-user': string;
      'by-type': string;
      'by-target': string;
      'by-paper': string;
    };
  };
  // 用户笔记
  notes: {
    key: string;
    value: UserNote;
    indexes: {
      'by-user': string;
      'by-paper': string;
      'by-question': string;
      'by-word': string;
    };
  };
  // 用户高亮
  highlights: {
    key: string;
    value: UserHighlight;
    indexes: {
      'by-user': string;
      'by-paper': string;
      'by-question': string;
    };
  };
  // 用户统计
  userStats: {
    key: string;
    value: UserStats;
    indexes: {
      'by-user': string;
    };
  };
  // 用户设置
  userSettings: {
    key: string;
    value: UserSettings;
    indexes: {
      'by-user': string;
    };
  };
  // 同步队列
  syncQueue: {
    key: string;
    value: {
      id: string;
      entityType: string;
      entityId: string;
      operation: 'create' | 'update' | 'delete';
      data: unknown;
      timestamp: number;
      retries: number;
    };
    indexes: {
      'by-entity': [string, string]; // [entityType, entityId]
      'by-timestamp': number;
    };
  };
  // 缓存元数据
  cacheMeta: {
    key: string;
    value: {
      key: string;
      data: unknown;
      expiresAt: number;
      version: number;
    };
    indexes: {
      'by-expires': number;
    };
  };
}

// ==================== 数据库实例管理 ====================

/** 所有 object store 名称的联合类型（排除继承自 DBSchema 的字符串索引签名） */
type StoreName = StoreNames<ExamSpaceDB>;

let dbInstance: IDBPDatabase<ExamSpaceDB> | null = null;
let initPromise: Promise<IDBPDatabase<ExamSpaceDB>> | null = null;

const DB_NAME = 'examspace-db';
const DB_VERSION = 1;

/**
 * 获取数据库实例（单例模式）
 */
export async function getDB(): Promise<IDBPDatabase<ExamSpaceDB>> {
  if (dbInstance) return dbInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    dbInstance = await openDB<ExamSpaceDB>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion, newVersion) {
        console.log(`[DB] Upgrading from v${oldVersion} to v${newVersion}`);

        // v1: 初始化所有存储
        if (oldVersion < 1) {
          // papers
          const paperStore = db.createObjectStore('papers', { keyPath: 'id' });
          paperStore.createIndex('by-exam-type', 'examType');
          paperStore.createIndex('by-year', 'year');

          // sections
          const sectionStore = db.createObjectStore('sections', { keyPath: 'id' });
          sectionStore.createIndex('by-paper', 'paperId');

          // questions
          const questionStore = db.createObjectStore('questions', { keyPath: 'id' });
          questionStore.createIndex('by-section', 'sectionId');
          questionStore.createIndex('by-type', 'type');

          // practiceRecords
          const practiceStore = db.createObjectStore('practiceRecords', { keyPath: 'id' });
          practiceStore.createIndex('by-user', 'userId');
          practiceStore.createIndex('by-paper', 'paperId');
          practiceStore.createIndex('by-status', 'status');
          practiceStore.createIndex('by-start-time', 'startTime');

          // wordRecords
          const wordStore = db.createObjectStore('wordRecords', { keyPath: 'id' });
          wordStore.createIndex('by-user', 'userId');
          wordStore.createIndex('by-word', 'word');
          wordStore.createIndex('by-proficiency', 'proficiency');
          wordStore.createIndex('by-next-review', 'nextReviewAt');
          wordStore.createIndex('by-user-word', ['userId', 'word'], { unique: true });

          // wrongQuestions
          const wrongStore = db.createObjectStore('wrongQuestions', { keyPath: 'id' });
          wrongStore.createIndex('by-user', 'userId');
          wrongStore.createIndex('by-question', 'questionId');
          wrongStore.createIndex('by-paper', 'paperId');
          wrongStore.createIndex('by-exam-type', 'examType');
          wrongStore.createIndex('by-next-review', 'nextReviewAt');
          wrongStore.createIndex('by-user-question', ['userId', 'questionId'], { unique: true });

          // bookmarks
          const bookmarkStore = db.createObjectStore('bookmarks', { keyPath: 'id' });
          bookmarkStore.createIndex('by-user', 'userId');
          bookmarkStore.createIndex('by-type', 'type');
          bookmarkStore.createIndex('by-target', 'targetId');
          bookmarkStore.createIndex('by-paper', 'paperId');

          // notes
          const noteStore = db.createObjectStore('notes', { keyPath: 'id' });
          noteStore.createIndex('by-user', 'userId');
          noteStore.createIndex('by-paper', 'paperId');
          noteStore.createIndex('by-question', 'questionId');
          noteStore.createIndex('by-word', 'wordId');

          // highlights
          const highlightStore = db.createObjectStore('highlights', { keyPath: 'id' });
          highlightStore.createIndex('by-user', 'userId');
          highlightStore.createIndex('by-paper', 'paperId');
          highlightStore.createIndex('by-question', 'questionId');

          // userStats
          const statsStore = db.createObjectStore('userStats', { keyPath: 'userId' });
          statsStore.createIndex('by-user', 'userId');

          // userSettings
          const settingsStore = db.createObjectStore('userSettings', { keyPath: 'userId' });
          settingsStore.createIndex('by-user', 'userId');

          // syncQueue
          const syncStore = db.createObjectStore('syncQueue', { keyPath: 'id' });
          syncStore.createIndex('by-entity', ['entityType', 'entityId']);
          syncStore.createIndex('by-timestamp', 'timestamp');

          // cacheMeta
          const cacheStore = db.createObjectStore('cacheMeta', { keyPath: 'key' });
          cacheStore.createIndex('by-expires', 'expiresAt');
        }
      },
      blocked(currentVersion, blockedVersion) {
        console.warn(`[DB] Blocked: current v${currentVersion}, blocked v${blockedVersion}`);
      },
      blocking(currentVersion, blockedVersion) {
        console.warn(`[DB] Blocking: current v${currentVersion}, blocked v${blockedVersion}`);
        if (dbInstance) {
          dbInstance.close();
          dbInstance = null;
        }
      },
      terminated() {
        console.warn('[DB] Database connection terminated');
        dbInstance = null;
        initPromise = null;
      },
    });

    return dbInstance;
  })();

  return initPromise;
}

/**
 * 关闭数据库连接
 */
export function closeDB(): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
    initPromise = null;
  }
}

/**
 * 重置数据库（开发/测试用）
 */
export async function resetDB(): Promise<void> {
  closeDB();
  await new Promise<void>((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// ==================== 通用 CRUD 操作 ====================

/**
 * 通用获取单条记录
 */
export async function get<T extends StoreName>(
  storeName: T,
  key: ExamSpaceDB[T]['key']
): Promise<ExamSpaceDB[T]['value'] | undefined> {
  const db = await getDB();
  return db.get(storeName, key);
}

/**
 * 通用获取多条记录
 */
export async function getMany<T extends StoreName>(
  storeName: T,
  keys: ExamSpaceDB[T]['key'][]
): Promise<ExamSpaceDB[T]['value'][]> {
  const db = await getDB();
  const tx = db.transaction(storeName, 'readonly');
  const results = await Promise.all(keys.map(key => tx.store.get(key)));
  await tx.done;
  return results.filter(r => r !== undefined) as ExamSpaceDB[T]['value'][];
}

/**
 * 通用添加/更新记录
 */
export async function put<T extends StoreName>(
  storeName: T,
  value: ExamSpaceDB[T]['value']
): Promise<ExamSpaceDB[T]['key']> {
  const db = await getDB();
  return db.put(storeName, value);
}

/**
 * 通用批量添加/更新
 */
export async function putMany<T extends StoreName>(
  storeName: T,
  values: ExamSpaceDB[T]['value'][]
): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(storeName, 'readwrite');
  await Promise.all(values.map(v => tx.store.put(v)));
  await tx.done;
}

/**
 * 通用删除记录
 */
export async function del<T extends StoreName>(
  storeName: T,
  key: ExamSpaceDB[T]['key']
): Promise<void> {
  const db = await getDB();
  await db.delete(storeName, key);
}

/**
 * 通用查询所有记录
 */
export async function getAll<T extends StoreName>(
  storeName: T
): Promise<ExamSpaceDB[T]['value'][]> {
  const db = await getDB();
  return db.getAll(storeName);
}

/**
 * 通用索引查询
 */
export async function getByIndex<T extends StoreName>(
  storeName: T,
  indexName: keyof ExamSpaceDB[T]['indexes'] & string,
  key: IDBValidKey | IDBKeyRange
): Promise<ExamSpaceDB[T]['value'][]> {
  const db = await getDB();
  return db.getAllFromIndex(storeName, indexName, key as never);
}

/**
 * 通用索引查询单条
 */
export async function getOneByIndex<T extends StoreName>(
  storeName: T,
  indexName: keyof ExamSpaceDB[T]['indexes'] & string,
  key: IDBValidKey | IDBKeyRange
): Promise<ExamSpaceDB[T]['value'] | undefined> {
  const db = await getDB();
  return db.getFromIndex(storeName, indexName, key as never);
}

/**
 * 通用计数
 */
export async function count<T extends StoreName>(
  storeName: T,
  indexName?: keyof ExamSpaceDB[T]['indexes'] & string,
  key?: IDBValidKey | IDBKeyRange
): Promise<number> {
  const db = await getDB();
  if (indexName) {
    return db.countFromIndex(storeName, indexName, key! as never);
  }
  return db.count(storeName);
}

/**
 * 清空存储
 */
export async function clear<T extends StoreName>(storeName: T): Promise<void> {
  const db = await getDB();
  await db.clear(storeName);
}

// ==================== 事务支持 ====================

/**
 * 执行读写事务
 */
export async function transaction<T>(
  storeNames: StoreName[],
  callback: (tx: IDBPTransaction<ExamSpaceDB, StoreName[], 'readwrite'>) => Promise<T>
): Promise<T> {
  const db = await getDB();
  const tx = db.transaction(storeNames, 'readwrite');
  try {
    const result = await callback(tx);
    await tx.done;
    return result;
  } catch (error) {
    tx.abort();
    throw error;
  }
}

/**
 * 执行只读事务
 */
export async function readonlyTransaction<T>(
  storeNames: StoreName[],
  callback: (tx: IDBPTransaction<ExamSpaceDB, StoreName[], 'readonly'>) => Promise<T>
): Promise<T> {
  const db = await getDB();
  const tx = db.transaction(storeNames, 'readonly');
  const result = await callback(tx);
  await tx.done;
  return result;
}

// ==================== 业务专用查询方法 ====================

// --- 试卷相关 ---

export async function getPapersByExamType(examType: ExamType): Promise<ExamPaper[]> {
  return getByIndex('papers', 'by-exam-type', examType);
}

export async function getPublishedPapers(): Promise<ExamPaper[]> {
  const papers = await getAll('papers');
  return papers.filter(p => p.isPublished);
}

export async function getPapersByYear(year: number): Promise<ExamPaper[]> {
  return getByIndex('papers', 'by-year', year);
}

export async function getPaperWithStructure(paperId: string): Promise<{
  paper: ExamPaper | undefined;
  sections: PaperSection[];
  questions: Question[];
} | null> {
  const paper = await get('papers', paperId);
  if (!paper) return null;

  const sections = await getByIndex('sections', 'by-paper', paperId);
  const questionIds = sections.flatMap(s => s.questions);
  const questions = await getMany('questions', questionIds);

  return { paper, sections, questions };
}

// --- 练习记录相关 ---

export async function getUserPracticeRecords(
  userId: string,
  limit = 50
): Promise<UserPracticeRecord[]> {
  const db = await getDB();
  const records = await db.getAllFromIndex('practiceRecords', 'by-user', userId);
  return records
    .sort((a, b) => b.startTime - a.startTime)
    .slice(0, limit);
}

export async function getUserPracticeRecordByPaper(
  userId: string,
  paperId: string
): Promise<UserPracticeRecord | undefined> {
  const db = await getDB();
  const records = await db.getAllFromIndex('practiceRecords', 'by-user', userId);
  return records.find(r => r.paperId === paperId && r.status === 'in-progress');
}

export async function getInProgressRecord(userId: string): Promise<UserPracticeRecord | undefined> {
  const db = await getDB();
  const records = await db.getAllFromIndex('practiceRecords', 'by-user', userId);
  return records.find(r => r.status === 'in-progress' || r.status === 'paused');
}

// --- 单词相关 ---

export async function getUserWordRecord(userId: string, word: string): Promise<UserWordRecord | undefined> {
  return getOneByIndex('wordRecords', 'by-user-word', [userId, word.toLowerCase()]);
}

export async function getUserWords(
  userId: string,
  proficiency?: WordProficiency,
  limit = 100
): Promise<UserWordRecord[]> {
  let words: UserWordRecord[];
  if (proficiency !== undefined) {
    words = await getByIndex('wordRecords', 'by-proficiency', proficiency);
    words = words.filter(w => w.userId === userId);
  } else {
    words = await getByIndex('wordRecords', 'by-user', userId);
  }
  return words
    .sort((a, b) => a.nextReviewAt - b.nextReviewAt)
    .slice(0, limit);
}

export async function getWordsDueForReview(userId: string, now = Date.now()): Promise<UserWordRecord[]> {
  const words = await getByIndex('wordRecords', 'by-user', userId);
  return words.filter(w => w.nextReviewAt <= now && w.proficiency < 5);
}

// --- 错题相关 ---

export async function getUserWrongQuestions(
  userId: string,
  options?: { mastered?: boolean; examType?: ExamType; limit?: number }
): Promise<UserWrongQuestion[]> {
  const db = await getDB();
  let wrongs = await db.getAllFromIndex('wrongQuestions', 'by-user', userId);

  if (options?.mastered !== undefined) {
    wrongs = wrongs.filter(w => w.isMastered === options.mastered);
  }
  if (options?.examType) {
    wrongs = wrongs.filter(w => w.examType === options.examType);
  }

  return wrongs
    .sort((a, b) => (a.nextReviewAt ?? 0) - (b.nextReviewAt ?? 0))
    .slice(0, options?.limit ?? 100);
}

export async function getWrongQuestion(userId: string, questionId: string): Promise<UserWrongQuestion | undefined> {
  return getOneByIndex('wrongQuestions', 'by-user-question', [userId, questionId]);
}

// --- 书签相关 ---

export async function getUserBookmarks(userId: string, type?: string): Promise<UserBookmark[]> {
  let bookmarks = await getByIndex('bookmarks', 'by-user', userId);
  if (type) {
    bookmarks = bookmarks.filter(b => b.type === type);
  }
  return bookmarks.sort((a, b) => b.createdAt - a.createdAt);
}

// --- 笔记相关 ---

export async function getUserNotes(
  userId: string,
  options?: { paperId?: string; questionId?: string; wordId?: string }
): Promise<UserNote[]> {
  let notes = await getByIndex('notes', 'by-user', userId);

  if (options?.paperId) {
    notes = notes.filter(n => n.paperId === options.paperId);
  }
  if (options?.questionId) {
    notes = notes.filter(n => n.targetType === 'question' && n.targetId === options.questionId);
  }
  if (options?.wordId) {
    notes = notes.filter(n => n.targetType === 'word' && n.targetId === options.wordId);
  }

  return notes.sort((a, b) => b.updatedAt - a.updatedAt);
}

// --- 高亮相关 ---

export async function getUserHighlights(
  userId: string,
  paperId?: string
): Promise<UserHighlight[]> {
  let highlights = await getByIndex('highlights', 'by-user', userId);
  if (paperId) {
    highlights = highlights.filter(h => h.paperId === paperId);
  }
  return highlights.sort((a, b) => a.createdAt - b.createdAt);
}

// --- 统计相关 ---

export async function getUserStats(userId: string): Promise<UserStats | undefined> {
  return get('userStats', userId);
}

export async function upsertUserStats(stats: UserStats): Promise<void> {
  await put('userStats', stats);
}

// --- 设置相关 ---

export async function getUserSettings(userId: string): Promise<UserSettings | undefined> {
  return get('userSettings', userId);
}

export async function upsertUserSettings(settings: UserSettings): Promise<void> {
  await put('userSettings', settings);
}

// --- 同步队列 ---

export interface SyncQueueItem {
  id: string;
  entityType: string;
  entityId: string;
  operation: 'create' | 'update' | 'delete';
  data: unknown;
  timestamp: number;
  retries: number;
}

export async function addToSyncQueue(item: Omit<SyncQueueItem, 'id' | 'timestamp' | 'retries'>): Promise<void> {
  const db = await getDB();
  const queueItem: SyncQueueItem = {
    ...item,
    id: `${item.entityType}-${item.entityId}-${Date.now()}`,
    timestamp: Date.now(),
    retries: 0,
  };
  await db.put('syncQueue', queueItem);
}

export async function getSyncQueue(limit = 100): Promise<SyncQueueItem[]> {
  const db = await getDB();
  const items = await db.getAllFromIndex('syncQueue', 'by-timestamp', IDBKeyRange.upperBound(Date.now()));
  return items.slice(0, limit);
}

export async function removeFromSyncQueue(id: string): Promise<void> {
  await del('syncQueue', id);
}

export async function incrementSyncRetry(id: string): Promise<void> {
  const db = await getDB();
  const item = await db.get('syncQueue', id);
  if (item) {
    item.retries++;
    await db.put('syncQueue', item);
  }
}

// --- 缓存相关 ---

export interface CacheEntry<T = unknown> {
  key: string;
  data: T;
  expiresAt: number;
  version: number;
}

export async function setCache<T>(key: string, data: T, ttlMs: number, version = 1): Promise<void> {
  const db = await getDB();
  await db.put('cacheMeta', {
    key,
    data,
    expiresAt: Date.now() + ttlMs,
    version,
  });
}

export async function getCache<T>(key: string): Promise<T | undefined> {
  const db = await getDB();
  const entry = await db.get('cacheMeta', key);
  if (!entry) return undefined;
  if (entry.expiresAt < Date.now()) {
    await db.delete('cacheMeta', key);
    return undefined;
  }
  return entry.data as T;
}

export async function clearExpiredCache(): Promise<void> {
  const db = await getDB();
  const now = Date.now();
  const entries = await db.getAllFromIndex('cacheMeta', 'by-expires', IDBKeyRange.upperBound(now));
  const tx = db.transaction('cacheMeta', 'readwrite');
  await Promise.all(entries.map(e => tx.store.delete(e.key)));
  await tx.done;
}

// ==================== 初始化/迁移工具 ====================

/**
 * 检查数据库是否已初始化
 */
export async function isDBInitialized(): Promise<boolean> {
  try {
    const db = await getDB();
    const count = await db.count('papers');
    return count > 0;
  } catch {
    return false;
  }
}

/**
 * 获取数据库统计信息
 */
export async function getDBStats(): Promise<Record<string, number>> {
  const db = await getDB();
  const storeNames = db.objectStoreNames;
  const stats: Record<string, number> = {};
  for (const name of storeNames) {
    stats[name] = await db.count(name);
  }
  return stats;
}

/**
 * 导出所有数据（用于备份）
 */
export async function exportAllData(): Promise<Partial<SyncData>> {
  const db = await getDB();
  const data: Partial<SyncData> = {};

  for (const name of db.objectStoreNames) {
    if (name === 'syncQueue' || name === 'cacheMeta') continue;
    data[name as keyof SyncData] = await db.getAll(name) as any;
  }

  return data;
}

/** 可导入/导出的用户数据存储（排除同步队列与缓存） */
const SYNCABLE_STORES: StoreName[] = [
  'papers',
  'sections',
  'questions',
  'practiceRecords',
  'wordRecords',
  'wrongQuestions',
  'bookmarks',
  'notes',
  'highlights',
  'userStats',
  'userSettings',
];

/**
 * 导入数据（用于恢复/同步）
 */
export async function importData(data: Partial<SyncData>): Promise<void> {
  const db = await getDB();
  const source = data as Record<string, unknown>;
  const storeNames = SYNCABLE_STORES.filter(name => Array.isArray(source[name]));
  if (storeNames.length === 0) return;

  const tx = db.transaction(storeNames, 'readwrite');
  for (const storeName of storeNames) {
    const store = tx.objectStore(storeName);
    for (const record of source[storeName] as unknown[]) {
      await store.put(record as ExamSpaceDB[StoreName]['value']);
    }
  }

  await tx.done;
}

// ==================== React Hooks 预留接口 ====================

/**
 * 订阅数据库变更（配合 useSyncExternalStore 使用）
 * 由于 IndexedDB 不原生支持订阅，需配合广播通道或自定义事件
 */
export type DBChangeListener = (storeName: string) => void;

const listeners = new Set<DBChangeListener>();

export function subscribeToDBChanges(listener: DBChangeListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notifyDBChange(storeName: string): void {
  listeners.forEach(l => l(storeName));
}

// 重写 put/del 以触发通知
const originalPut = put;
const originalDel = del;

export async function putWithNotify<T extends StoreName>(
  storeName: T,
  value: ExamSpaceDB[T]['value']
): Promise<ExamSpaceDB[T]['key']> {
  const key = await originalPut(storeName, value);
  notifyDBChange(storeName);
  return key;
}

export async function delWithNotify<T extends StoreName>(
  storeName: T,
  key: ExamSpaceDB[T]['key']
): Promise<void> {
  await originalDel(storeName, key);
  notifyDBChange(storeName);
}