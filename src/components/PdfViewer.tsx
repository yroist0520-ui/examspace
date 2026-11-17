import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

/** 轻量 PDF 阅读器：分页、缩放、页码跳转 */
export default function PdfViewer({ file }: { file: Blob }) {
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [scale, setScale] = useState(1.1);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTask = useRef<{ cancel: () => void } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    let task: pdfjsLib.PDFDocumentLoadingTask | null = null;
    file
      .arrayBuffer()
      .then((buf) => {
        task = pdfjsLib.getDocument({ data: new Uint8Array(buf) });
        return task.promise;
      })
      .then((doc) => {
        if (!alive) {
          task?.destroy();
          return;
        }
        setPdf(doc);
        setPages(doc.numPages);
        setPage(1);
      })
      .catch(() => alive && setError('PDF 解析失败，请确认文件未加密且格式正确。'));
    return () => {
      alive = false;
      task?.destroy();
    };
  }, [file]);

  useEffect(() => {
    if (!pdf || !canvasRef.current) return;
    let cancelled = false;
    pdf.getPage(page).then((p) => {
      if (cancelled) return;
      const viewport = p.getViewport({ scale });
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderTask.current?.cancel();
      const task = p.render({ canvasContext: ctx, viewport, canvas });
      renderTask.current = task as unknown as { cancel: () => void };
    });
    return () => {
      cancelled = true;
    };
  }, [pdf, page, scale]);

  if (error) {
    return <div className="px-4 py-10 text-center text-[12.5px] text-ink-mute">{error}</div>;
  }

  return (
    <div>
      <div className="no-print flex items-center gap-2 border-b hairline px-4 py-2">
        <button className="btn btn-quiet h-7 px-1.5" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
          <ChevronLeft size={15} />
        </button>
        <span className="font-mono text-[11.5px] text-ink-mute">
          {page} / {pages || '–'}
        </span>
        <button className="btn btn-quiet h-7 px-1.5" onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page >= pages}>
          <ChevronRight size={15} />
        </button>
        <div className="mx-2 h-4 w-px bg-black/10" />
        <button className="btn btn-quiet h-7 px-1.5" onClick={() => setScale((s) => Math.max(0.6, +(s - 0.15).toFixed(2)))}>
          <Minus size={14} />
        </button>
        <span className="font-mono text-[11px] text-ink-mute">{Math.round(scale * 100)}%</span>
        <button className="btn btn-quiet h-7 px-1.5" onClick={() => setScale((s) => Math.min(2.4, +(s + 0.15).toFixed(2)))}>
          <Plus size={14} />
        </button>
        <span className="ml-auto text-[11px] text-ink-faint">PDF · 支持缩放与分页</span>
      </div>
      <div ref={wrapRef} className="max-h-[70vh] overflow-auto bg-paper-deep px-4 py-5">
        <div className="mx-auto w-fit">
          <canvas ref={canvasRef} className="paper-page" />
        </div>
      </div>
    </div>
  );
}