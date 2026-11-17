import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { LexiconEntry, Settings, WordEntry } from '@/types/paper';
import { defaultSettings, loadSettings, saveSettings } from '@/db';
import { lookupWord } from '@/data/lexicon';

interface WordPopoverState {
  entry: LexiconEntry;
  raw: string;
  anchor: { x: number; y: number };
  source?: WordEntry['source'];
}

interface AppContextValue {
  settings: Settings;
  update: (patch: Partial<Settings>) => Promise<void>;
  word: WordPopoverState | null;
  openWord: (
    raw: string,
    anchor: { x: number; y: number },
    source?: WordEntry['source']
  ) => void;
  closeWord: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [word, setWord] = useState<WordPopoverState | null>(null);

  useEffect(() => {
    loadSettings().then(setSettings);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.style.setProperty('--paper-text', `${settings.paperSize}px`);
    document.documentElement.style.setProperty('--paper-leading', `${settings.lineHeight}`);
  }, [settings.theme, settings.paperSize, settings.lineHeight]);

  const update = useCallback(async (patch: Partial<Settings>) => {
    const next = await saveSettings(patch);
    setSettings(next);
  }, []);

  const openWord = useCallback((raw: string, anchor: { x: number; y: number }, source?: WordEntry['source']) => {
    const found = lookupWord(raw);
    const cleaned = raw.toLowerCase().replace(/[^a-z'-]/g, '');
    if (!found && !cleaned) return;
    // 词库未收录时也给出反馈，避免点击无响应
    const entry: LexiconEntry =
      found ?? {
        word: cleaned,
        phonetic: '',
        pos: '',
        senses: [{ pos: '', cn: '测试词库暂未收录该词（演示词库共 94 词）。仍可发音或加入生词本。' }]
      };
    setWord({ entry, raw, anchor, source });
  }, []);

  const closeWord = useCallback(() => setWord(null), []);

  useEffect(() => {
    if (!word) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeWord();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [word, closeWord]);

  const value = useMemo(
    () => ({ settings, update, word, openWord, closeWord }),
    [settings, update, word, openWord, closeWord]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

/** 全局数据版本号：写入本地库后自增，驱动页面刷新 */
const invalidation = { listeners: new Set<() => void>() };

export function useDbVersion(): [number, () => void] {
  const [v, setV] = useState(0);
  useEffect(() => {
    const fn = () => setV((x) => x + 1);
    invalidation.listeners.add(fn);
    return () => {
      invalidation.listeners.delete(fn);
    };
  }, []);
  const bump = useCallback(() => {
    invalidation.listeners.forEach((fn) => fn());
  }, []);
  return [v, bump];
}

export function notifyDataChanged() {
  invalidation.listeners.forEach((fn) => fn());
}