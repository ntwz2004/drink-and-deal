import { isRedSuit, type PlayingCard as CardType, SPECIAL_RANKS } from '@/lib/gameData';

interface Props {
  card: CardType;
  isFlipping: boolean;
}

const PlayingCard = ({ card, isFlipping }: Props) => {
  const red = isRedSuit(card.suit);
  const isSpecial = SPECIAL_RANKS.includes(card.rank);
  const colorClass = red ? 'text-card-red' : 'text-card-black';

  return (
    <div
      className={`
        relative w-56 h-80 sm:w-64 sm:h-96 rounded-xl shadow-2xl
        bg-card-face flex flex-col justify-between p-4
        ${isFlipping ? 'animate-card-flip' : ''}
        ${isSpecial ? 'animate-celebrate' : ''}
      `}
      style={{
        boxShadow: isSpecial
          ? '0 0 30px hsl(50 100% 55% / 0.5), 0 0 60px hsl(50 100% 55% / 0.2)'
          : '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      {/* Top left */}
      <div className={`flex flex-col items-start leading-none ${colorClass}`}>
        <span className="text-2xl sm:text-3xl font-bold">{card.rank}</span>
        <span className="text-xl sm:text-2xl">{card.suit}</span>
      </div>

      {/* Center */}
      <div className={`flex items-center justify-center ${colorClass}`}>
        <span className="text-6xl sm:text-7xl">{card.suit}</span>
      </div>

      {/* Bottom right */}
      <div className={`flex flex-col items-end leading-none rotate-180 ${colorClass}`}>
        <span className="text-2xl sm:text-3xl font-bold">{card.rank}</span>
        <span className="text-xl sm:text-2xl">{card.suit}</span>
      </div>

      {/* Special card particles */}
      {isSpecial && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
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
    </div>
  );
};

export default PlayingCard;
