import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import Dice3D from '@/components/Dice3D';
import { useGameSession } from '@/hooks/useGameSession';


interface DiceState {
  players: Record<number, string>;
  result: number | null;
  displayFace: number;
}

const EMPTY_PLAYERS: Record<number, string> = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' };

const DiceGame = () => {
  const [players, setPlayers] = useState<Record<number, string>>({ ...EMPTY_PLAYERS });
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [displayFace, setDisplayFace] = useState(1);
  const [diceSize, setDiceSize] = useState(180);
  const [popupOpen, setPopupOpen] = useState(false);


  const { loaded, initial, save, clear } = useGameSession<DiceState>('dice_state');

  // Restore saved state
  useEffect(() => {
    if (loaded && initial) {
      setPlayers({ ...EMPTY_PLAYERS, ...(initial.players ?? {}) });
      setResult(initial.result ?? null);
      setDisplayFace(initial.displayFace ?? 1);
    }
  }, [loaded, initial]);

  // Persist state (only cleared by "เริ่มใหม่")
  useEffect(() => {
    if (!loaded || isRolling) return;
    save({ players, result, displayFace });
  }, [loaded, isRolling, players, result, displayFace, save]);

  // Responsive dice size
  useEffect(() => {
    const update = () => setDiceSize(window.innerWidth < 380 ? 140 : window.innerWidth < 640 ? 165 : 190);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const roll = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);
    setResult(null);

    const final = Math.floor(Math.random() * 6) + 1;
    setDisplayFace(final);

    setTimeout(() => {
      setResult(final);
      setIsRolling(false);
    }, 1800);
  }, [isRolling]);

  const resetGame = () => {
    setResult(null);
    setIsRolling(false);
    setDisplayFace(1);
    setPlayers({ ...EMPTY_PLAYERS });
    clear();
  };

  const winner = result ? players[result]?.trim() : null;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 sm:py-10">
      {/* Nav */}
      <Link to="/" className="self-start mb-6">
        <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          กลับ
        </Button>
      </Link>

      <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-2">Dice Game</p>
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 text-center">
        ทอยลูกเต๋า
      </h1>
      <p className="text-muted-foreground text-xs mb-8">ใส่ชื่อผู้เล่นในแต่ละหมายเลข แล้วแตะลูกเต๋า</p>

      {/* Player inputs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full max-w-sm mb-10">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className="flex items-center gap-2">
            <span className="text-sm font-mono text-muted-foreground w-5 text-right">{num}</span>
            <Input
              placeholder={`ผู้เล่น ${num}`}
              value={players[num]}
              onChange={(e) => setPlayers({ ...players, [num]: e.target.value })}
              className="bg-card/50 border-border focus:border-foreground/30 text-sm h-9 rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* 3D Dice */}
      <div className="flex flex-col items-center gap-4">
        <Dice3D face={displayFace} isRolling={isRolling} onClick={roll} size={diceSize} />
        <p className="text-muted-foreground text-xs">
          {isRolling ? 'กำลังทอย...' : 'แตะลูกเต๋าเพื่อทอย'}
        </p>
      </div>

      {/* Result */}
      {result && !isRolling && (
        <div className="mt-8 text-center px-6 py-5 rounded-xl w-full max-w-sm bg-card/50 border border-border animate-scale-in">
          <p className="text-[11px] tracking-widest uppercase text-muted-foreground mb-1">ผลลัพธ์</p>
          <p className="text-3xl font-semibold text-foreground mb-1 tabular-nums">{result}</p>
          {winner && <p className="text-base text-accent font-medium">{winner} โดน!</p>}
        </div>
      )}

      {/* Controls */}
      <div className="mt-8">
        <Button
          onClick={resetGame}
          variant="outline"
          size="sm"
          className="gap-2 border-border hover:bg-card"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          เริ่มใหม่
        </Button>
      </div>
    </div>
  );
};

export default DiceGame;
