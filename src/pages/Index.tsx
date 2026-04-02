import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import PlayingCard from '@/components/PlayingCard';
import CardDeck from '@/components/CardDeck';
import RulesModal from '@/components/RulesModal';
import { createDeck, DEFAULT_RULES, SPECIAL_RANKS, type PlayingCard as CardType, type Rank } from '@/lib/gameData';
import { RotateCcw } from 'lucide-react';

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
      <h1 className="text-3xl sm:text-5xl font-black neon-text-pink mb-2 text-center">
        🎉 Party Cards 🍻
      </h1>
      <p className="text-muted-foreground text-sm sm:text-base mb-6">แตะไพ่เพื่อเริ่มเล่น!</p>

      {/* Card Area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full max-w-md">
        {drawnCard ? (
          <>
            <PlayingCard card={drawnCard} isFlipping={isFlipping} />
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
          </>
        ) : (
          <CardDeck remaining={remaining} total={TOTAL} onClick={drawCard} disabled={remaining === 0} />
        )}

        {/* Draw next if card is showing */}
        {drawnCard && remaining > 0 && (
          <Button
            onClick={drawCard}
            disabled={isFlipping}
            className="w-full max-w-xs bg-gradient-to-r from-neon-purple to-neon-pink text-primary-foreground font-bold text-lg py-6 neon-glow-purple hover:opacity-90 transition-opacity"
          >
            จั่วไพ่ ({remaining} ใบ)
          </Button>
        )}

        {remaining === 0 && (
          <p className="text-neon-yellow text-xl font-bold animate-pulse-neon">🎊 หมดไพ่แล้ว! 🎊</p>
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
      </div>
    </div>
  );
};

export default Index;
