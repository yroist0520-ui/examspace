import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

interface BIPEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let deferred: BIPEvent | null = null;
let listenReady = false;

/** PWA 安装提示：监听 beforeinstallprompt，首次可安装时在首页顶部显示条幅 */
export default function InstallPrompt() {
  const [evt, setEvt] = useState<BIPEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (!listenReady) {
      listenReady = true;
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferred = e as BIPEvent;
        deferredListeners.forEach((fn) => fn(deferred));
      });
      window.addEventListener('appinstalled', () => setInstalled(true));
    }
    const fn = (e: BIPEvent | null) => setEvt(e);
    deferredListeners.add(fn);
    if (deferred) setEvt(deferred);
    if (window.matchMedia('(display-mode: standalone)').matches) setInstalled(true);
    return () => {
      deferredListeners.delete(fn);
    };
  }, []);

  if (installed || dismissed || !evt) return null;

  return (
    <div className="mb-4 flex items-center gap-3 rounded-xl border border-brand-500/30 bg-brand-50 px-4 py-3">
      <Download size={16} className="shrink-0 text-brand-600" />
      <p className="flex-1 text-[12.5px] leading-relaxed text-brand-700">
        安装 EXAMSPACE 到桌面，离线也能刷题背词。
      </p>
      <button
        className="btn h-7 shrink-0 bg-brand-600 px-3 text-[12px] text-white hover:bg-brand-700"
        onClick={async () => {
          const e = deferred;
          if (!e) return;
          deferred = null;
          setEvt(null);
          await e.prompt();
          const { outcome } = await e.userChoice;
          if (outcome === 'dismissed') setDismissed(true);
        }}
      >
        安装
      </button>
      <button className="btn btn-quiet h-7 shrink-0 px-1.5" onClick={() => setDismissed(true)} aria-label="忽略安装提示">
        <X size={14} />
      </button>
    </div>
  );
}

const deferredListeners = new Set<(e: BIPEvent | null) => void>();
