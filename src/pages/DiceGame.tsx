import { useState, useCallback, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Dices, RotateCcw, ArrowLeft } from 'lucide-react';

const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
const FACE_DOTS: Record<number, number[][]> = {
  1: [[50, 50]],
  2: [[25, 25], [75, 75]],
  3: [[25, 25], [50, 50], [75, 75]],
  4: [[25, 25], [75, 25], [25, 75], [75, 75]],
  5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
  6: [[25, 25], [75, 25], [25, 50], [75, 50], [25, 75], [75, 75]],
};

const DiceGame = () => {
  const [players, setPlayers] = useState<Record<number, string>>({
    1: '', 2: '', 3: '', 4: '', 5: '', 6: '',
  });
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [rollingFace, setRollingFace] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const roll = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);
    setResult(null);

    // Rapidly cycle through faces
    let count = 0;
    const maxCount = 20;
    intervalRef.current = setInterval(() => {
      setRollingFace(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count >= maxCount) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        const final = Math.floor(Math.random() * 6) + 1;
        setRollingFace(final);
        setResult(final);
        setIsRolling(false);
      }
    }, 80);
  }, [isRolling]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const resetGame = () => {
    setResult(null);
    setIsRolling(false);
    setRollingFace(1);
  };

  const displayFace = result ?? rollingFace;
  const winner = result ? players[result]?.trim() : null;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 sm:py-10">
      {/* Nav */}
      <Link to="/" className="self-start mb-4">
        <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          ไพ่ปาร์ตี้
        </Button>
      </Link>

      <h1 className="text-3xl sm:text-5xl font-black neon-text-pink mb-2 text-center">
        🎲 ทอยลูกเต๋า 🎲
      </h1>
      <p className="text-muted-foreground text-sm mb-6">ใส่ชื่อผู้เล่นในแต่ละหมายเลข แล้วทอยเลย!</p>

      {/* Player assignment */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-md mb-8">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className="flex items-center gap-2">
            <span className="text-2xl w-8 text-center shrink-0">{DICE_FACES[num - 1]}</span>
            <Input
              placeholder={`เลข ${num}`}
              value={players[num]}
              onChange={(e) => setPlayers({ ...players, [num]: e.target.value })}
              className="bg-muted border-border focus:border-neon-cyan text-sm h-9"
            />
          </div>
        ))}
      </div>

      {/* Dice */}
      <button
        onClick={roll}
        disabled={isRolling}
        className={`
          relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl cursor-pointer
          transition-all duration-200
          ${isRolling ? 'animate-dice-shake' : 'hover:scale-105 active:scale-95'}
          ${!isRolling && result ? 'animate-dice-land' : ''}
        `}
        style={{
          background: 'linear-gradient(145deg, hsl(0 0% 100%) 0%, hsl(0 0% 92%) 100%)',
          boxShadow: result
            ? '0 4px 12px rgba(0,0,0,0.3), 0 0 30px hsl(50 100% 55% / 0.4)'
            : '0 4px 12px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.2)',
        }}
      >
        {/* Dots */}
        <div className="absolute inset-0">
          {FACE_DOTS[displayFace].map((pos, i) => (
            <div
              key={i}
              className="absolute w-[18%] h-[18%] rounded-full"
              style={{
                left: `${pos[0]}%`,
                top: `${pos[1]}%`,
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle at 35% 35%, hsl(0 0% 25%), hsl(0 0% 8%))',
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.3)',
              }}
            />
          ))}
        </div>
      </button>

      <p className="text-muted-foreground text-sm mt-4">
        {isRolling ? 'กำลังทอย...' : 'แตะลูกเต๋าเพื่อทอย'}
      </p>

      {/* Result */}
      {result && !isRolling && (
        <div className="mt-6 text-center px-6 py-4 rounded-xl w-full max-w-md bg-muted/60 backdrop-blur-sm border border-border animate-scale-in">
          <p className="text-4xl sm:text-5xl font-black mb-2">{DICE_FACES[result - 1]}</p>
          <p className="text-2xl font-bold text-neon-yellow neon-text-cyan">
            ได้เลข {result}!
          </p>
          {winner && (
            <p className="text-xl mt-2 text-neon-pink font-bold">
              🎯 {winner} โดน!
            </p>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-3 mt-8 mb-4">
        <Button
          onClick={resetGame}
          variant="outline"
          className="gap-2 border-neon-green/40 hover:border-neon-green hover:bg-neon-green/10 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          ทอยใหม่
        </Button>
      </div>
    </div>
  );
};

export default DiceGame;
