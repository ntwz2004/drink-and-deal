import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGameSession } from '@/hooks/useGameSession';

interface WheelState {
  names: string[];
  angle: number;
  result: string | null;
}

const SEGMENT_COLORS = [
  'hsl(6 63% 46%)',
  'hsl(157 25% 24%)',
  'hsl(40 15% 82%)',
  'hsl(157 20% 34%)',
  'hsl(28 55% 48%)',
  'hsl(200 25% 32%)',
];

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)] as const;
};

const WheelGame = () => {
  const [names, setNames] = useState<string[]>([]);
  const [draft, setDraft] = useState('');
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { loaded, initial, save, clear } = useGameSession<WheelState>('wheel_state');

  useEffect(() => {
    if (loaded && initial) {
      setNames(initial.names ?? []);
      setAngle(initial.angle ?? 0);
      setResult(initial.result ?? null);
    }
  }, [loaded, initial]);

  useEffect(() => {
    if (!loaded || spinning) return;
    save({ names, angle, result });
  }, [loaded, spinning, names, angle, result, save]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const addName = () => {
    const v = draft.trim();
    if (!v || names.length >= 12) return;
    setNames((n) => [...n, v]);
    setDraft('');
  };

  const removeName = (i: number) => setNames((n) => n.filter((_, idx) => idx !== i));

  const spin = useCallback(() => {
    if (spinning || names.length < 2) return;
    setSpinning(true);
    setResult(null);
    const seg = 360 / names.length;
    const winner = Math.floor(Math.random() * names.length);
    // center of winning segment must land under the top pointer
    const target = 360 * (Math.floor(Math.random() * 3) + 5) - (winner * seg + seg / 2);
    const next = angle + ((target - (angle % 360)) + 360) % 360 + 360 * 5;
    setAngle(next);
    timer.current = setTimeout(() => {
      setResult(names[winner]);
      setSpinning(false);
    }, 4200);
  }, [spinning, names, angle]);

  const reset = () => {
    if (timer.current) clearTimeout(timer.current);
    setNames([]);
    setDraft('');
    setAngle(0);
    setResult(null);
    setSpinning(false);
    clear();
  };

  const seg = names.length ? 360 / names.length : 360;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 sm:py-10">
      <Link to="/" className="self-start mb-6">
        <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          กลับ
        </Button>
      </Link>

      <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-2">Wheel</p>
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 text-center">วงล้อสุ่มชื่อ</h1>
      <p className="text-muted-foreground text-xs mb-8">เพิ่มชื่อผู้เล่น แล้วหมุนวงล้อดูว่าใครโดน</p>

      {/* Add names */}
      <div className="w-full max-w-sm mb-4 flex gap-2">
        <Input
          placeholder="ใส่ชื่อผู้เล่น"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addName()}
          className="bg-card/50 border-border focus:border-foreground/30 text-sm h-10 rounded-lg"
        />
        <Button onClick={addName} size="icon" variant="outline" className="h-10 w-10 shrink-0 border-border">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {names.length > 0 && (
        <div className="w-full max-w-sm mb-8 flex flex-wrap gap-2">
          {names.map((n, i) => (
            <span
              key={`${n}-${i}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/50 pl-3 pr-2 py-1 text-xs text-foreground"
            >
              {n}
              <button onClick={() => removeName(i)} className="text-muted-foreground hover:text-accent">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Wheel */}
      <div className="relative w-[min(90vw,340px)] aspect-square mb-6">
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 z-10">
          <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[18px] border-l-transparent border-r-transparent border-t-accent" />
        </div>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full rounded-full border border-border"
          style={{
            transform: `rotate(${angle}deg)`,
            transition: spinning ? 'transform 4.2s cubic-bezier(0.12, 0.7, 0.15, 1)' : 'none',
          }}
        >
          {names.length < 2 ? (
            <circle cx="100" cy="100" r="98" fill="hsl(157 25% 15%)" />
          ) : (
            names.map((n, i) => {
              const start = i * seg;
              const end = start + seg;
              const [x1, y1] = polar(100, 100, 98, start);
              const [x2, y2] = polar(100, 100, 98, end);
              const large = seg > 180 ? 1 : 0;
              const fill = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
              const light = i % SEGMENT_COLORS.length === 2;
              return (
                <g key={`${n}-${i}`}>
                  <path
                    d={`M100 100 L${x1} ${y1} A98 98 0 ${large} 1 ${x2} ${y2} Z`}
                    fill={fill}
                    stroke="hsl(158 29% 10%)"
                    strokeWidth="0.8"
                  />
                  <text
                    x="100"
                    y="100"
                    fill={light ? 'hsl(158 29% 10%)' : 'hsl(40 15% 94%)'}
                    fontSize="8"
                    fontWeight="500"
                    dominantBaseline="middle"
                    transform={`rotate(${start + seg / 2} 100 100) translate(0 -60) rotate(90 100 100)`}
                    textAnchor="middle"
                  >
                    {n.length > 12 ? `${n.slice(0, 12)}…` : n}
                  </text>
                </g>
              );
            })
          )}
          <circle cx="100" cy="100" r="14" fill="hsl(157 25% 15%)" stroke="hsl(157 18% 30%)" />
        </svg>
      </div>

      <Button
        onClick={spin}
        disabled={spinning || names.length < 2}
        className="px-8"
      >
        {spinning ? 'กำลังหมุน...' : 'หมุนวงล้อ'}
      </Button>
      {names.length < 2 && (
        <p className="text-muted-foreground text-xs mt-3">ต้องมีอย่างน้อย 2 ชื่อ</p>
      )}

      {result && !spinning && (
        <div className="mt-8 text-center px-6 py-5 rounded-xl w-full max-w-sm bg-card/50 border border-border animate-scale-in">
          <p className="text-[11px] tracking-widest uppercase text-muted-foreground mb-1">ผลลัพธ์</p>
          <p className="text-2xl font-semibold text-accent">{result} โดน!</p>
        </div>
      )}

      <div className="mt-8">
        <Button onClick={reset} variant="outline" size="sm" className="gap-2 border-border hover:bg-card">
          <RotateCcw className="w-3.5 h-3.5" />
          เริ่มใหม่
        </Button>
      </div>
    </div>
  );
};

export default WheelGame;
