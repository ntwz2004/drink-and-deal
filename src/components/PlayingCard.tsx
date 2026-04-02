import { isRedSuit, type PlayingCard as CardType, SPECIAL_RANKS } from '@/lib/gameData';

interface Props {
  card: CardType;
  isFlipping: boolean;
  onClick?: () => void;
}

const PlayingCard = ({ card, isFlipping, onClick }: Props) => {
  const red = isRedSuit(card.suit);
  const isSpecial = SPECIAL_RANKS.includes(card.rank);
  const colorClass = red ? 'text-card-red' : 'text-card-black';

  return (
    <button
      onClick={onClick}
      className={`
        relative w-56 h-80 sm:w-64 sm:h-96 rounded-2xl
        bg-card-face flex flex-col justify-between p-4
        cursor-pointer transition-transform duration-200
        hover:scale-[1.03] active:scale-[0.97]
        ${isFlipping ? 'animate-card-flip' : ''}
        ${isSpecial ? 'animate-celebrate' : ''}
      `}
      style={{
        boxShadow: isSpecial
          ? `
            0 2px 4px rgba(0,0,0,0.1),
            0 8px 16px rgba(0,0,0,0.15),
            0 20px 40px rgba(0,0,0,0.2),
            0 0 30px hsl(50 100% 55% / 0.4),
            0 0 60px hsl(50 100% 55% / 0.15),
            inset 0 1px 0 rgba(255,255,255,0.6)
          `
          : `
            0 1px 2px rgba(0,0,0,0.08),
            0 4px 8px rgba(0,0,0,0.12),
            0 12px 24px rgba(0,0,0,0.18),
            0 24px 48px rgba(0,0,0,0.22),
            inset 0 1px 0 rgba(255,255,255,0.6),
            inset 0 -1px 0 rgba(0,0,0,0.04)
          `,
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f8 50%, #f0f0f0 100%)',
        border: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      {/* Inner border for realism */}
      <div className="absolute inset-[6px] rounded-xl border border-black/[0.04] pointer-events-none" />

      {/* Top left */}
      <div className={`flex flex-col items-start leading-none ${colorClass} z-10`}>
        <span className="text-2xl sm:text-3xl font-bold">{card.rank}</span>
        <span className="text-xl sm:text-2xl">{card.suit}</span>
      </div>

      {/* Center */}
      <div className={`flex items-center justify-center ${colorClass} z-10`}>
        <span className="text-6xl sm:text-7xl drop-shadow-sm">{card.suit}</span>
      </div>

      {/* Bottom right */}
      <div className={`flex flex-col items-end leading-none rotate-180 ${colorClass} z-10`}>
        <span className="text-2xl sm:text-3xl font-bold">{card.rank}</span>
        <span className="text-xl sm:text-2xl">{card.suit}</span>
      </div>

      {/* Special card particles */}
      {isSpecial && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="absolute w-2 h-2 rounded-full animate-particle-burst"
              style={{
                top: '50%',
                left: '50%',
                backgroundColor: ['#ff6b9d', '#00e5ff', '#ffea00', '#76ff03', '#e040fb', '#ff3d00'][i],
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}
    </button>
  );
};

export default PlayingCard;
