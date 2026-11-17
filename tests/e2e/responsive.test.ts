import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import puppeteer, { type Browser, type Page } from 'puppeteer-core';
import { spawn, type ChildProcess } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

/**
 * 移动端响应式 E2E 断言（真实浏览器视口）
 * 视口矩阵 × 页面矩阵 × Tailwind 断点边界（sm640 / md768 / lg1024）
 * 运行：npm run test:mobile（需先构建，脚本已内置 build）
 */

const PORT = 4179;
const BASE = `http://localhost:${PORT}`;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/** 视口矩阵：小屏极限 / 常见手机 / 大屏手机 / md 断点两侧 / lg 断点两侧 / 桌面 */
const VP = {
  xs: { width: 320, height: 568 },
  se: { width: 375, height: 667 },
  pro: { width: 390, height: 844 },
  plus: { width: 428, height: 926 },
  bp767: { width: 767, height: 1024 },
  md: { width: 768, height: 1024 },
  lg1023: { width: 1023, height: 768 },
  lg: { width: 1024, height: 768 },
  desk: { width: 1280, height: 800 }
};
type VPKey = keyof typeof VP;

/** 覆盖全部一级/二级页面（含沉浸式阅读与考试页） */
const ROUTES = [
  '/',
  '/library',
  '/paper/cet4-2024-12-01',
  '/words',
  '/mistakes',
  '/stats',
  '/practice',
  '/settings',
  '/read/cet4-2024-12-01',
  '/exam/cet4-2024-12-01?mode=practice'
];

const MOBILE_VPS: VPKey[] = ['xs', 'se', 'pro', 'plus'];
const ALL_LAYOUT_VPS: VPKey[] = [...MOBILE_VPS, 'bp767', 'md'];

let preview: ChildProcess;
let browser: Browser;
let page: Page;

async function waitServer(url: string, timeoutMs = 30000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // 未就绪，继续等待
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`preview server not ready: ${url}`);
}

async function open(vpKey: VPKey, route: string): Promise<void> {
  await page.setViewport(VP[vpKey]);
  await page.goto(BASE + route, { waitUntil: 'networkidle0', timeout: 20000 });
  await page.waitForFunction(() => (document.querySelector('#root')?.childElementCount ?? 0) > 0, {
    timeout: 10000
  });
}

/** 元素在当前视口是否可见（display/尺寸/可见性） */
function isVisible(selector: string): Promise<boolean> {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return false;
    const st = getComputedStyle(el);
    if (st.display === 'none' || st.visibility === 'hidden') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }, selector);
}

/** 横向溢出量（>1px 视为溢出） */
function overflow(): Promise<number> {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}

/** 按可见文本查找按钮（如“答题卡”“目录”） */
function buttonByText(text: string): Promise<boolean> {
  return page.evaluate((t) => {
    const btns = Array.from(document.querySelectorAll('button, a'));
    const hit = btns.find((b) => (b.textContent ?? '').includes(t));
    return !!hit;
  }, text);
}

beforeAll(async () => {
  preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: root,
    stdio: 'ignore'
  });
  await waitServer(BASE);
  browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--mute-audio']
  });
  page = await browser.newPage();
}, 120000);

afterAll(async () => {
  await browser?.close();
  preview?.kill('SIGTERM');
});

/* ---------------------------- 1. 横向溢出矩阵 ---------------------------- */

describe('横向溢出：视口 × 页面', () => {
  for (const vp of ALL_LAYOUT_VPS) {
    it(`${vp}（${VP[vp].width}px）下所有页面无横向滚动`, async () => {
      const offenders: string[] = [];
      for (const route of ROUTES) {
        await open(vp, route);
        const dx = await overflow();
        if (dx > 1) offenders.push(`${route} (+${dx}px)`);
      }
      expect(offenders).toEqual([]);
    });
  }
});

/* --------------------------- 2. 断点边界可见性 --------------------------- */

describe('断点边界：全局导航（md=768）', () => {
  const cases: { vp: VPKey; bottomNav: boolean; topNav: boolean; burger: boolean }[] = [
    { vp: 'xs', bottomNav: true, topNav: false, burger: true },
    { vp: 'plus', bottomNav: true, topNav: false, burger: true },
    { vp: 'bp767', bottomNav: true, topNav: false, burger: true }, // md 前 1px
    { vp: 'md', bottomNav: false, topNav: true, burger: false }, // md 边界
    { vp: 'desk', bottomNav: false, topNav: true, burger: false }
  ];

  for (const c of cases) {
    it(`${c.vp}（${VP[c.vp].width}px）：底部栏=${c.bottomNav} 顶部栏=${c.topNav} 汉堡=${c.burger}`, async () => {
      await open(c.vp, '/');
      expect(await isVisible('nav[class*="inset-x-0"]')).toBe(c.bottomNav);
      expect(await isVisible('header nav')).toBe(c.topNav);
      expect(await isVisible('button[aria-label="菜单"]')).toBe(c.burger);
    });
  }
});

describe('断点边界：阅读器（lg=1024）', () => {
  const cases: { vp: VPKey; tocBtn: boolean; sideToc: boolean }[] = [
    { vp: 'pro', tocBtn: true, sideToc: false },
    { vp: 'lg1023', tocBtn: true, sideToc: false }, // lg 前 1px
    { vp: 'lg', tocBtn: false, sideToc: true }, // lg 边界
    { vp: 'desk', tocBtn: false, sideToc: true }
  ];

  for (const c of cases) {
    it(`${c.vp}（${VP[c.vp].width}px）：移动目录钮=${c.tocBtn} 侧栏目录=${c.sideToc}`, async () => {
      await open(c.vp, '/read/cet4-2024-12-01');
      expect(await isVisible('button[aria-label="目录"]')).toBe(c.tocBtn);
      expect(await isVisible('aside[class*="w-[212px]"]')).toBe(c.sideToc);
    });
  }
});

/* ------------------------------ 3. 移动交互 ------------------------------ */

describe('移动端交互', () => {
  it('390px：汉堡菜单打开抽屉，含全部导航与设置入口', async () => {
    await open('pro', '/');
    await page.click('button[aria-label="菜单"]');
    await new Promise((r) => setTimeout(r, 400));
    const drawerOk = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      const texts = links.filter((a) => a.closest('.fixed.inset-0')).map((a) => a.textContent ?? '');
      const need = ['今日', '真题库', '练习中心', '生词本', '错题本', '学习统计', '设置与数据'];
      return need.every((n) => texts.some((t) => t.includes(n)));
    });
    expect(drawerOk).toBe(true);
    // 抽屉内点击“生词本”跳转且抽屉关闭
    await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      const target = links.find((a) => (a.textContent ?? '').includes('生词本') && a.closest('.fixed.inset-0'));
      target?.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    expect(page.url()).toContain('/words');
    expect(await isVisible('button[aria-label="关闭"]')).toBe(false);
  });

  it('390px：底部导航切换到统计页', async () => {
    await open('pro', '/');
    await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('nav[class*="inset-x-0"] a'));
      links.find((a) => (a.textContent ?? '').includes('统计'))?.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    expect(page.url()).toContain('/stats');
  });

  it('390px：底部导航触控高度 ≥ 44px', async () => {
    await open('pro', '/');
    const heights = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('nav[class*="inset-x-0"] a'));
      return links.map((a) => a.getBoundingClientRect().height);
    });
    expect(heights.length).toBeGreaterThanOrEqual(5);
    expect(Math.min(...heights)).toBeGreaterThanOrEqual(44);
  });

  it('390px：阅读器“目录”抽屉可开合', async () => {
    await open('pro', '/read/cet4-2024-12-01?part=reading');
    expect(await isVisible('button[aria-label="目录"]')).toBe(true);
    await page.click('button[aria-label="目录"]');
    await new Promise((r) => setTimeout(r, 400));
    // 抽屉含“目录”标题
    const tocOpen = await page.evaluate(() =>
      Array.from(document.querySelectorAll('div,span')).some((el) => el.textContent === '目录' && el.children.length === 0)
    );
    expect(tocOpen).toBe(true);
    // 点遮罩关闭（遮罩为 .fixed.inset-0 下的 .bg-ink/30 层）
    await page.evaluate(() => {
      const mask = document.querySelector<HTMLElement>('.fixed.inset-0 .bg-ink\\/30');
      mask?.click();
    });
    await new Promise((r) => setTimeout(r, 400));
    // 关闭后遮罩消失、外层“目录”按钮仍可见
    const maskGone = await page.evaluate(() => !document.querySelector('.fixed.inset-0 .bg-ink\\/30'));
    expect(maskGone).toBe(true);
    expect(await isVisible('button[aria-label="目录"]')).toBe(true);
  });

  it('390px：考试页“答题卡”抽屉可开合', async () => {
    await open('pro', '/exam/cet4-2024-12-01?mode=practice');
    expect(await buttonByText('答题卡')).toBe(true);
    await page.evaluate(() => {
      const hit = Array.from(document.querySelectorAll('button')).find((b) => (b.textContent ?? '').includes('答题卡'));
      hit?.click();
    });
    await new Promise((r) => setTimeout(r, 400));
    const drawerTitle = await page.evaluate(() =>
      Array.from(document.querySelectorAll('span')).some((el) => el.textContent === '答题卡')
    );
    expect(drawerTitle).toBe(true);
    await page.evaluate(() => document.querySelector('button[aria-label="关闭"]')?.click());
    await new Promise((r) => setTimeout(r, 300));
    expect(await buttonByText('答题卡')).toBe(true);
  });

  it('428px：阅读页点词弹窗不超出视口', async () => {
    await open('plus', '/read/cet4-2024-12-01?part=reading');
    // 点击正文第一个可点单词
    const clicked = await page.evaluate(() => {
      const token = document.querySelector('.word-token');
      if (!token) return false;
      (token as HTMLElement).click();
      return true;
    });
    expect(clicked).toBe(true);
    await new Promise((r) => setTimeout(r, 500));
    const inBounds = await page.evaluate(() => {
      const pop = document.querySelector('.card.fixed, [class*="z-[70]"], [class*="z-[90]"]');
      if (!pop) return true; // 未出现弹窗不判失败
      const r = pop.getBoundingClientRect();
      return r.left >= -1 && r.right <= window.innerWidth + 1;
    });
    expect(inBounds).toBe(true);
    expect(await overflow()).toBeLessThanOrEqual(1);
  });
});

/* ------------------------------ 4. 桌面回归 ------------------------------ */

describe('桌面视口回归', () => {
  it('1280px：全局页底部导航隐藏、顶部导航可见、无横向溢出', async () => {
    for (const route of ['/', '/stats']) {
      await open('desk', route);
      expect(await isVisible('nav[class*="inset-x-0"]')).toBe(false);
      expect(await isVisible('header nav')).toBe(true);
      expect(await overflow()).toBeLessThanOrEqual(1);
    }
  });

  it('1280px：沉浸式阅读器全屏布局（无全局导航）无溢出', async () => {
    await open('desk', '/read/cet4-2024-12-01?part=reading');
    // 沉浸式阅读器使用自身工具栏 header，不含全局 nav / 底部栏
    expect(await isVisible('nav[class*="inset-x-0"]')).toBe(false);
    expect(await isVisible('button[aria-label="阅读设置"]')).toBe(true);
    expect(await overflow()).toBeLessThanOrEqual(1);
  });
});
