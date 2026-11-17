import { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import {
  BookOpen,
  ChartNoAxesColumn,
  ClipboardCheck,
  House,
  Library,
  NotebookPen,
  Settings as SettingsIcon,
  Target,
  Menu,
  X
} from 'lucide-react';
import Home from '@/pages/Home';
import LibraryPage from '@/pages/Library';
import PaperDetail from '@/pages/PaperDetail';
import Reader from '@/pages/Reader';
import Exam from '@/pages/Exam';
import Result from '@/pages/Result';
import Practice from '@/pages/Practice';
import Words from '@/pages/Words';
import Mistakes from '@/pages/Mistakes';
import Stats from '@/pages/Stats';
import Settings from '@/pages/Settings';
import WordPopover from '@/components/WordPopover';
import InstallPrompt from '@/components/InstallPrompt';

const nav = [
  { to: '/', label: '今日', icon: House, end: true },
  { to: '/library', label: '真题库', icon: Library },
  { to: '/practice', label: '练习中心', icon: Target },
  { to: '/words', label: '生词本', icon: NotebookPen },
  { to: '/mistakes', label: '错题本', icon: ClipboardCheck },
  { to: '/stats', label: '学习统计', icon: ChartNoAxesColumn }
];

const mobileNav = [
  { to: '/', label: '今日', icon: House, end: true },
  { to: '/library', label: '真题库', icon: Library },
  { to: '/practice', label: '练习', icon: Target },
  { to: '/words', label: '生词', icon: NotebookPen },
  { to: '/stats', label: '统计', icon: ChartNoAxesColumn }
];

export default function App() {
  const location = useLocation();
  const [drawer, setDrawer] = useState(false);
  const immersive = /^\/(read|exam|result)\//.test(location.pathname);

  useEffect(() => {
    setDrawer(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  if (immersive) {
    return (
      <>
        <Routes>
          <Route path="/read/:paperId" element={<Reader />} />
          <Route path="/exam/:paperId" element={<Exam />} />
          <Route path="/result/:attemptId" element={<Result />} />
        </Routes>
        <WordPopover />
      </>
    );
  }

  return (
    <div className="min-h-full">
      <header className="no-print sticky top-0 z-40 border-b hairline bg-paper/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-content items-center gap-4 px-4 sm:px-6">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-[7px] bg-brand-600 text-[12px] font-bold tracking-tight text-white">
              E
            </span>
            <span className="text-[13.5px] font-semibold tracking-[0.14em]">EXAMSPACE</span>
          </NavLink>

          <nav className="ml-4 hidden items-center gap-0.5 md:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  clsx(
                    'rounded-md px-2.5 py-1.5 text-[13px] font-medium transition',
                    isActive ? 'bg-black/[0.055] text-ink' : 'text-ink-soft hover:text-ink'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <NavLink
              to="/settings"
              className="btn btn-quiet px-2"
              aria-label="设置"
            >
              <SettingsIcon size={16} />
            </NavLink>
            <button className="btn btn-quiet px-2 md:hidden" onClick={() => setDrawer(true)} aria-label="菜单">
              <Menu size={17} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-content px-4 pb-24 pt-5 sm:px-6 sm:pt-7 md:pb-12">
        <InstallPrompt />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/library/:exam" element={<LibraryPage />} />
          <Route path="/paper/:paperId" element={<PaperDetail />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/words" element={<Words />} />
          <Route path="/mistakes" element={<Mistakes />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<div className="card p-10 text-center text-sm text-ink-mute">页面不存在</div>} />
        </Routes>
      </main>

      <nav className="no-print fixed inset-x-0 bottom-0 z-40 border-t hairline bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
        <div className="mx-auto flex h-14 max-w-content items-stretch justify-around px-2">
          {mobileNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                clsx(
                  'flex flex-1 flex-col items-center justify-center gap-0.5 text-[10.5px]',
                  isActive ? 'text-brand-600' : 'text-ink-mute'
                )
              }
            >
              <item.icon size={18} strokeWidth={1.8} />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {drawer && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 right-0 w-[272px] bg-surface p-4 shadow-float">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[13px] font-semibold tracking-[0.14em]">EXAMSPACE</span>
              <button className="btn btn-quiet px-2" onClick={() => setDrawer(false)} aria-label="关闭">
                <X size={16} />
              </button>
            </div>
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13.5px]',
                    isActive ? 'bg-brand-50 font-semibold text-brand-700' : 'text-ink-soft'
                  )
                }
              >
                <item.icon size={17} strokeWidth={1.8} />
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/settings" className="mt-1 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13.5px] text-ink-soft">
              <BookOpen size={17} strokeWidth={1.8} />
              设置与数据
            </NavLink>
          </div>
        </div>
      )}

      <WordPopover />
    </div>
  );
}
