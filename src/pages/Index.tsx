import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PlayingCard from '@/components/PlayingCard';
import CardDeck from '@/components/CardDeck';
import RulesModal from '@/components/RulesModal';
import HistoryPanel from '@/components/HistoryPanel';
import { createDeck, DEFAULT_RULES, type PlayingCard as CardType, type Rank } from '@/lib/gameData';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import { useGameSession } from '@/hooks/useGameSession';

interface CardState {
  deck: CardType[];
  drawnCard: CardType | null;
  history: CardType[];
  rules: Record<Rank, string>;
}

const TOTAL = 52;

const Index = () => {
  const [deck, setDeck] = useState<CardType[]>(() => createDeck());
  const [drawnCard, setDrawnCard] = useState<CardType | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [history, setHistory] = useState<CardType[]>([]);
  const [rules, setRules] = useState<Record<Rank, string>>({ ...DEFAULT_RULES });

  const { loaded, initial, save, clear } = useGameSession<CardState>('card_state');

  // Restore saved state
  useEffect(() => {
    if (loaded && initial?.deck) {
      setDeck(initial.deck);
      setDrawnCard(initial.drawnCard ?? null);
      setHistory(initial.history ?? []);
      setRules({ ...DEFAULT_RULES, ...(initial.rules ?? {}) });
    }
  }, [loaded, initial]);

  // Persist state (only cleared by "เริ่มใหม่")
  useEffect(() => {
    if (!loaded) return;
    save({ deck, drawnCard, history, rules });
  }, [loaded, deck, drawnCard, history, rules, save]);

  const remaining = deck.length;

  const drawCard = useCallback(() => {
    if (deck.length === 0 || isFlipping) return;
    setIsFlipping(true);
    const [card, ...rest] = deck;
    setDrawnCard(card);
    setDeck(rest);
    setHistory((h) => [...h, card]);
    setTimeout(() => setIsFlipping(false), 900);
  }, [deck, isFlipping]);

  const resetGame = useCallback(() => {
    setDeck(createDeck());
    setDrawnCard(null);
    setHistory([]);
    setIsFlipping(false);
    setRules({ ...DEFAULT_RULES });
    clear();
  }, [clear]);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 sm:py-10">
      <Link to="/" className="self-start mb-6">
        <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          กลับ
        </Button>
      </Link>

      <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-2">Card Game</p>
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-center">ไพ่ปาร์ตี้</h1>

      {/* Counter */}
      <div className="flex items-center gap-3 mb-8">
        <p className="text-muted-foreground text-xs tabular-nums">
          {remaining > 0 ? `เหลือ ${remaining}/${TOTAL}` : 'หมดสำรับแล้ว'}
        </p>
        <div className="h-px w-24 sm:w-32 bg-border overflow-hidden">
          <div
            className="h-full bg-foreground/60 transition-all duration-500"
            style={{ width: `${(remaining / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      {/* Card area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full max-w-sm">
        {drawnCard ? (
          <>
            <PlayingCard card={drawnCard} isFlipping={isFlipping} onClick={drawCard} />
            <div className="text-center px-5 py-4 rounded-xl w-full bg-card/50 border border-border animate-fade-up">
              <p className="text-[11px] tracking-widest uppercase text-muted-foreground mb-1">
                กติกา · {drawnCard.rank}
              </p>
              <p className="text-lg sm:text-xl font-medium text-foreground">{rules[drawnCard.rank]}</p>
            </div>
            {remaining === 0 && (
              <p className="text-muted-foreground text-xs">จั่วครบทั้งสำรับแล้ว</p>
            )}
          </>
        ) : (
          <CardDeck remaining={remaining} total={TOTAL} onClick={drawCard} disabled={remaining === 0} />
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-2 mt-10 mb-4">
        <Button onClick={resetGame} variant="outline" size="sm" className="gap-2 border-border hover:bg-card">
          <RotateCcw className="w-3.5 h-3.5" />
          เริ่มใหม่
        </Button>
        <HistoryPanel history={history} rules={rules} />
        <RulesModal rules={rules} onSave={setRules} />
      </div>
    </div>
  );
};

export default Index;
