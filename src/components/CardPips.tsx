import type { Rank, Suit } from '@/lib/gameData';

interface Props {
  rank: Rank;
  suit: Suit;
  colorClass: string;
}

// Standard playing-card pip layouts. Coordinates are percentages of the
// pip area; pips in the lower half are rotated 180deg like a real deck.
type PipPos = { top: number; left: number; flip?: boolean };

const PIP_LAYOUTS: Partial<Record<Rank, PipPos[]>> = {
  A: [{ top: 50, left: 50 }],
  '2': [
    { top: 8, left: 50 },
    { top: 92, left: 50, flip: true },
  ],
  '3': [
    { top: 8, left: 50 },
    { top: 50, left: 50 },
    { top: 92, left: 50, flip: true },
  ],
  '4': [
    { top: 8, left: 22 },
    { top: 8, left: 78 },
    { top: 92, left: 22, flip: true },
    { top: 92, left: 78, flip: true },
  ],
  '5': [
    { top: 8, left: 22 },
    { top: 8, left: 78 },
    { top: 50, left: 50 },
    { top: 92, left: 22, flip: true },
    { top: 92, left: 78, flip: true },
  ],
  '6': [
    { top: 8, left: 22 },
    { top: 8, left: 78 },
    { top: 50, left: 22 },
    { top: 50, left: 78 },
    { top: 92, left: 22, flip: true },
    { top: 92, left: 78, flip: true },
  ],
  '7': [
    { top: 8, left: 22 },
    { top: 8, left: 78 },
    { top: 29, left: 50 },
    { top: 50, left: 22 },
    { top: 50, left: 78 },
    { top: 92, left: 22, flip: true },
    { top: 92, left: 78, flip: true },
  ],
  '8': [
    { top: 8, left: 22 },
    { top: 8, left: 78 },
    { top: 29, left: 50 },
    { top: 50, left: 22 },
    { top: 50, left: 78 },
    { top: 71, left: 50, flip: true },
    { top: 92, left: 22, flip: true },
    { top: 92, left: 78, flip: true },
  ],
  '9': [
    { top: 8, left: 22 },
    { top: 8, left: 78 },
    { top: 36, left: 22 },
    { top: 36, left: 78 },
    { top: 50, left: 50 },
    { top: 64, left: 22, flip: true },
    { top: 64, left: 78, flip: true },
    { top: 92, left: 22, flip: true },
    { top: 92, left: 78, flip: true },
  ],
  '10': [
    { top: 8, left: 22 },
    { top: 8, left: 78 },
    { top: 25, left: 50 },
    { top: 36, left: 22 },
    { top: 36, left: 78 },
    { top: 64, left: 22, flip: true },
    { top: 64, left: 78, flip: true },
    { top: 75, left: 50, flip: true },
    { top: 92, left: 22, flip: true },
    { top: 92, left: 78, flip: true },
  ],
};

const CardPips = ({ rank, suit, colorClass }: Props) => {
  const layout = PIP_LAYOUTS[rank];
  if (!layout) return null;

  const isAce = rank === 'A';

  return (
    <div className="absolute inset-x-[22%] inset-y-[13%] pointer-events-none z-10">
      {layout.map((pos, i) => (
        <span
          key={i}
          className={`absolute leading-none ${colorClass}`}
          style={{
            top: `${pos.top}%`,
            left: `${pos.left}%`,
            transform: `translate(-50%, -50%) ${pos.flip ? 'rotate(180deg)' : ''}`,
            fontSize: isAce ? '5.5rem' : '2.1rem',
          }}
        >
          {suit}
        </span>
      ))}
    </div>
  );
};

export default CardPips;
