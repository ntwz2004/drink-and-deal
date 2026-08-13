import { isRedSuit, type PlayingCard as CardType } from '@/lib/gameData';
import CardPips from './CardPips';
import FaceCard from './FaceCard';

interface Props {
  card: CardType;
  isFlipping: boolean;
  onClick?: () => void;
}

const FACE_RANKS = ['J', 'Q', 'K'] as const;

const PlayingCard = ({ card, isFlipping, onClick }: Props) => {
  const red = isRedSuit(card.suit);
  const isFace = (FACE_RANKS as readonly string[]).includes(card.rank);
  const colorClass = red ? 'text-card-red' : 'text-card-black';

  return (
    <button
      onClick={onClick}
      className="relative w-56 h-80 sm:w-64 sm:h-96 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
      style={{ perspective: '900px' }}
    >
      <div
        className={`relative w-full h-full rounded-xl ${isFlipping ? 'animate-card-3d-flip' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* === FRONT === */}
        <div
          className="absolute inset-0 rounded-xl bg-white"
          style={{
            backfaceVisibility: 'hidden',
            border: '1px solid rgba(0,0,0,0.14)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.18), 0 16px 32px rgba(0,0,0,0.32)',
          }}
        >
          {/* Corner index — top left */}
          <div className={`absolute top-2.5 left-3 flex flex-col items-center leading-none ${colorClass} z-20`}>
            <span className="text-xl font-semibold">{card.rank}</span>
            <span className="text-base -mt-0.5">{card.suit}</span>
          </div>

          {/* Center */}
          {isFace ? (
            <FaceCard rank={card.rank} suit={card.suit} />
          ) : (
            <CardPips rank={card.rank} suit={card.suit} colorClass={colorClass} />
          )}

          {/* Corner index — bottom right */}
          <div
            className={`absolute bottom-2.5 right-3 flex flex-col items-center leading-none rotate-180 ${colorClass} z-20`}
          >
            <span className="text-xl font-semibold">{card.rank}</span>
            <span className="text-base -mt-0.5">{card.suit}</span>
          </div>
        </div>

        {/* === BACK === */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden bg-secondary"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            border: '1px solid hsl(var(--border))',
            boxShadow: '0 16px 32px rgba(0,0,0,0.32)',
          }}
        >
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent 0 7px, hsl(var(--foreground) / 0.35) 7px 8px)`,
            }}
          />
          <div className="absolute inset-3 rounded-lg border border-foreground/20" />
        </div>
      </div>
    </button>
  );
};

export default PlayingCard;
