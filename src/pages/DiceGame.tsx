import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import Dice3D from '@/components/Dice3D';

const DiceGame = () => {
  const [players, setPlayers] = useState<Record<number, string>>({
    1: '', 2: '', 3: '', 4: '', 5: '', 6: '',
  });
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [displayFace, setDisplayFace] = useState(1);

  const roll = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);
    setResult(null);

    const final = Math.floor(Math.random() * 6) + 1;
    setDisplayFace(final);

    setTimeout(() => {
      setResult(final);
      setIsRolling(false);
    }, 1400);
  }, [isRolling]);

  const resetGame = () => {
    setResult(null);
    setIsRolling(false);
    setDisplayFace(1);
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
        <Dice3D face={displayFace} isRolling={isRolling} onClick={roll} />
        <p className="text-muted-foreground text-xs">
          {isRolling ? 'กำลังทอย...' : 'แตะลูกเต๋าเพื่อทอย'}
        </p>
      </div>

      {/* Result */}
      {result && !isRolling && (
        <div className="mt-8 text-center px-6 py-5 rounded-xl w-full max-w-sm bg-card/50 backdrop-blur-sm border border-border animate-scale-in">
          <p className="text-3xl font-bold text-foreground mb-1">
            ได้เลข {result}
          </p>
          {winner && (
            <p className="text-lg text-primary font-semibold">
              🎯 {winner} โดน!
            </p>
          )}
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
