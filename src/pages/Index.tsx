import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PlayingCard from '@/components/PlayingCard';
import CardDeck from '@/components/CardDeck';
import RulesModal from '@/components/RulesModal';
import { createDeck, DEFAULT_RULES, SPECIAL_RANKS, type PlayingCard as CardType, type Rank } from '@/lib/gameData';
import { RotateCcw, Dices } from 'lucide-react';

const TOTAL = 52;

const Index = () => {
  const [deck, setDeck] = useState<CardType[]>(() => createDeck());
  const [drawnCard, setDrawnCard] = useState<CardType | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [rules, setRules] = useState<Record<Rank, string>>({ ...DEFAULT_RULES });

  const remaining = deck.length;

  const drawCard = useCallback(() => {
    if (deck.length === 0 || isFlipping) return;
    setIsFlipping(true);
    const [card, ...rest] = deck;
    setDrawnCard(card);
    setDeck(rest);
    setTimeout(() => setIsFlipping(false), 600);
  }, [deck, isFlipping]);

  const resetGame = useCallback(() => {
    setDeck(createDeck());
    setDrawnCard(null);
    setIsFlipping(false);
  }, []);

  const isSpecial = drawnCard && SPECIAL_RANKS.includes(drawnCard.rank);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 sm:py-10">
      {/* Header */}
      <h1 className="text-3xl sm:text-5xl font-black neon-text-pink mb-1 text-center">
        🎉 Party Cards 🍻
      </h1>

      {/* Card counter badge */}
      <div className="flex items-center gap-2 mb-6">
        <p className="text-muted-foreground text-sm">
          {remaining > 0
            ? `ไพ่ที่เหลือ: ${remaining}/${TOTAL}`
            : '🎊 หมดไพ่แล้ว!'
          }
        </p>
        <div className="h-1.5 w-24 sm:w-32 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full transition-all duration-500"
            style={{ width: `${(remaining / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      {/* Card Area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full max-w-md">
        {drawnCard ? (
          <>
            <PlayingCard card={drawnCard} isFlipping={isFlipping} onClick={drawCard} />
            {/* Rule Display */}
            <div
              className={`
                text-center px-6 py-4 rounded-xl w-full
                bg-muted/60 backdrop-blur-sm border border-border
                ${isSpecial ? 'neon-glow-pink border-neon-yellow/50' : ''}
              `}
            >
              <p className="text-sm text-muted-foreground mb-1">กติกา ({drawnCard.rank})</p>
              <p className={`text-xl sm:text-2xl font-bold ${isSpecial ? 'text-neon-yellow neon-text-cyan' : 'text-foreground'}`}>
                {rules[drawnCard.rank]}
              </p>
            </div>
            {remaining === 0 && (
              <p className="text-neon-yellow text-lg font-bold animate-pulse-neon">แตะไพ่เพื่อจั่วใบสุดท้ายแล้ว!</p>
            )}
          </>
        ) : (
          <CardDeck remaining={remaining} total={TOTAL} onClick={drawCard} disabled={remaining === 0} />
        )}
      </div>

      {/* Bottom Controls */}
      <div className="flex gap-3 mt-8 mb-4">
        <Button
          onClick={resetGame}
          variant="outline"
          className="gap-2 border-neon-green/40 hover:border-neon-green hover:bg-neon-green/10 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          เริ่มเกมใหม่
        </Button>
        <RulesModal rules={rules} onSave={setRules} />
        <Link to="/dice">
          <Button variant="outline" className="gap-2 border-neon-yellow/40 hover:border-neon-yellow hover:bg-neon-yellow/10 transition-colors">
            <Dices className="w-4 h-4" />
            ลูกเต๋า
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
