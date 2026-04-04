import type { Rank, Suit } from '@/lib/gameData';

interface Props {
  rank: Rank;
  suit: Suit;
  colorClass: string;
}

// Pip positions for each number rank, based on real playing card layouts
// Coordinates are percentages [top%, left%], with optional 'flip' for upside-down pips
type PipPos = { top: number; left: number; flip?: boolean };

const PIP_LAYOUTS: Partial<Record<Rank, PipPos[]>> = {
  'A': [
    { top: 50, left: 50 },
  ],
  '2': [
    { top: 20, left: 50 },
    { top: 80, left: 50, flip: true },
  ],
  '3': [
    { top: 20, left: 50 },
    { top: 50, left: 50 },
    { top: 80, left: 50, flip: true },
  ],
  '4': [
    { top: 20, left: 30 },
    { top: 20, left: 70 },
    { top: 80, left: 30, flip: true },
    { top: 80, left: 70, flip: true },
  ],
  '5': [
    { top: 20, left: 30 },
    { top: 20, left: 70 },
    { top: 50, left: 50 },
    { top: 80, left: 30, flip: true },
    { top: 80, left: 70, flip: true },
  ],
  '6': [
    { top: 20, left: 30 },
    { top: 20, left: 70 },
    { top: 50, left: 30 },
    { top: 50, left: 70 },
    { top: 80, left: 30, flip: true },
    { top: 80, left: 70, flip: true },
  ],
  '7': [
    { top: 20, left: 30 },
    { top: 20, left: 70 },
    { top: 35, left: 50 },
    { top: 50, left: 30 },
    { top: 50, left: 70 },
    { top: 80, left: 30, flip: true },
    { top: 80, left: 70, flip: true },
  ],
  '8': [
    { top: 20, left: 30 },
    { top: 20, left: 70 },
    { top: 35, left: 50 },
    { top: 50, left: 30 },
    { top: 50, left: 70 },
    { top: 65, left: 50, flip: true },
    { top: 80, left: 30, flip: true },
    { top: 80, left: 70, flip: true },
  ],
  '9': [
    { top: 18, left: 30 },
    { top: 18, left: 70 },
    { top: 38, left: 30 },
    { top: 38, left: 70 },
    { top: 50, left: 50 },
    { top: 62, left: 30, flip: true },
    { top: 62, left: 70, flip: true },
    { top: 82, left: 30, flip: true },
    { top: 82, left: 70, flip: true },
  ],
  '10': [
    { top: 18, left: 30 },
    { top: 18, left: 70 },
    { top: 32, left: 50 },
    { top: 38, left: 30 },
    { top: 38, left: 70 },
    { top: 62, left: 30, flip: true },
    { top: 62, left: 70, flip: true },
    { top: 68, left: 50, flip: true },
    { top: 82, left: 30, flip: true },
    { top: 82, left: 70, flip: true },
  ],
};

const CardPips = ({ rank, suit, colorClass }: Props) => {
  const layout = PIP_LAYOUTS[rank];
  if (!layout) return null;

  const isAce = rank === 'A';

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {layout.map((pos, i) => (
        <span
          key={i}
          className={`absolute ${colorClass} ${pos.flip ? 'rotate-180' : ''}`}
          style={{
            top: `${pos.top}%`,
            left: `${pos.left}%`,
            transform: `translate(-50%, -50%) ${pos.flip ? 'rotate(180deg)' : ''}`,
            fontSize: isAce ? '5.5rem' : '2.2rem',
          }}
        >
          {suit}
        </span>
      ))}
    </div>
  );
};

export default CardPips;
