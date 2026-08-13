import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { isRedSuit, type PlayingCard as CardType, type Rank } from '@/lib/gameData';

interface Props {
  history: CardType[];
  rules: Record<Rank, string>;
}

const HistoryPanel = ({ history, rules }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-border hover:bg-card">
          <History className="w-3.5 h-3.5" />
          ประวัติ
          {history.length > 0 && (
            <span className="text-xs text-muted-foreground">({history.length})</span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] sm:max-w-sm bg-background border-border overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-foreground">ประวัติการจั่วไพ่</SheetTitle>
        </SheetHeader>

        {history.length === 0 ? (
          <p className="text-muted-foreground text-sm mt-8 text-center">ยังไม่ได้จั่วไพ่</p>
        ) : (
          <ul className="mt-6 space-y-2">
            {history
              .map((card, i) => ({ card, order: i + 1 }))
              .reverse()
              .map(({ card, order }) => (
                <li
                  key={`${card.id}-${order}`}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card/50 px-3 py-2"
                >
                  <span className="text-[11px] text-muted-foreground w-5 tabular-nums">{order}</span>
                  <span
                    className={`w-9 h-12 shrink-0 rounded-[4px] bg-white border border-black/10
                      flex flex-col items-center justify-center leading-none
                      ${isRedSuit(card.suit) ? 'text-card-red' : 'text-card-black'}`}
                  >
                    <span className="text-sm font-semibold">{card.rank}</span>
                    <span className="text-xs">{card.suit}</span>
                  </span>
                  <span className="text-sm text-foreground/90 leading-snug">{rules[card.rank]}</span>
                </li>
              ))}
          </ul>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default HistoryPanel;
