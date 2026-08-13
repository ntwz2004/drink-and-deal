import type { Rank, Suit } from '@/lib/gameData';
import { isRedSuit } from '@/lib/gameData';

interface Props {
  rank: Rank;
  suit: Suit;
}

const GOLD = '#D9A521';
const BLUE = '#2F5D8C';
const INK = '#1A1A1A';
const RED = '#C0392B';
const SKIN = '#F6E2D2';
const PAPER = '#FFFFFF';

/**
 * One half of a two-headed court card figure.
 * Drawn inside a 100 x 70 box (top half of a 100 x 140 card face).
 */
const CourtHalf = ({ rank, suit, main }: { rank: Rank; suit: Suit; main: string }) => {
  const isKing = rank === 'K';
  const isQueen = rank === 'Q';
  const isJack = rank === 'J';

  return (
    <g>
      {/* Shoulders / robe */}
      <path
        d="M18 70 L18 52 Q22 42 34 38 L66 38 Q78 42 82 52 L82 70 Z"
        fill={PAPER}
        stroke={INK}
        strokeWidth="1.2"
      />
      {/* Robe panels */}
      <path d="M18 70 L18 54 Q24 45 34 41 L40 70 Z" fill={main} opacity="0.85" />
      <path d="M82 70 L82 54 Q76 45 66 41 L60 70 Z" fill={BLUE} opacity="0.8" />
      {/* Collar */}
      <path d="M36 38 L50 52 L64 38" fill={GOLD} stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      {/* Chest ornament */}
      <path d="M44 56 L50 50 L56 56 L50 62 Z" fill={GOLD} stroke={INK} strokeWidth="0.8" />

      {/* Neck */}
      <rect x="45" y="32" width="10" height="8" fill={SKIN} stroke={INK} strokeWidth="0.9" />

      {/* Head */}
      <ellipse cx="50" cy="24" rx="11" ry="12" fill={SKIN} stroke={INK} strokeWidth="1.1" />
      {/* Hair sides */}
      <path d="M39 24 Q36 32 40 38 Q42 32 41 26 Z" fill={main} stroke={INK} strokeWidth="0.7" />
      <path d="M61 24 Q64 32 60 38 Q58 32 59 26 Z" fill={main} stroke={INK} strokeWidth="0.7" />
      {/* Eyes */}
      <circle cx="46" cy="23" r="1.2" fill={INK} />
      <circle cx="54" cy="23" r="1.2" fill={INK} />
      {/* Nose + mouth */}
      <path d="M50 24 L50 28" stroke={INK} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M47 30 Q50 32 53 30" stroke={INK} strokeWidth="0.8" fill="none" strokeLinecap="round" />

      {/* King: beard + big crown */}
      {isKing && (
        <>
          <path
            d="M39 25 Q40 40 50 41 Q60 40 61 25 Q57 33 50 33 Q43 33 39 25 Z"
            fill={PAPER}
            stroke={INK}
            strokeWidth="0.9"
          />
          <path
            d="M36 13 L40 4 L45 11 L50 2 L55 11 L60 4 L64 13 Z"
            fill={GOLD}
            stroke={INK}
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <rect x="36" y="12" width="28" height="5" rx="1" fill={GOLD} stroke={INK} strokeWidth="1.1" />
          <circle cx="43" cy="14.5" r="1.1" fill={main} />
          <circle cx="50" cy="14.5" r="1.1" fill={BLUE} />
          <circle cx="57" cy="14.5" r="1.1" fill={main} />
        </>
      )}

      {/* Queen: slim crown + hair + necklace */}
      {isQueen && (
        <>
          <path
            d="M38 14 L42 7 L46 12 L50 5 L54 12 L58 7 L62 14 Z"
            fill={GOLD}
            stroke={INK}
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <rect x="38" y="13" width="24" height="4" rx="1" fill={GOLD} stroke={INK} strokeWidth="1" />
          <circle cx="50" cy="15" r="1.1" fill={main} />
          <path d="M42 44 Q50 50 58 44" stroke={GOLD} strokeWidth="1.4" fill="none" />
          <circle cx="50" cy="48" r="2" fill={GOLD} stroke={INK} strokeWidth="0.7" />
        </>
      )}

      {/* Jack: feathered cap */}
      {isJack && (
        <>
          <path
            d="M37 18 Q38 7 50 6 Q62 7 63 18 Q56 12 50 12 Q44 12 37 18 Z"
            fill={main}
            stroke={INK}
            strokeWidth="1"
          />
          <path d="M63 15 Q74 8 72 0 Q66 6 61 10 Z" fill={GOLD} stroke={INK} strokeWidth="0.9" />
          <rect x="36" y="16" width="28" height="4" rx="2" fill={GOLD} stroke={INK} strokeWidth="0.9" />
        </>
      )}

      {/* Held suit emblem */}
      <text
        x="24"
        y="62"
        fontSize="13"
        textAnchor="middle"
        fill={isRedSuit(suit) ? RED : INK}
        style={{ fontFamily: 'serif' }}
      >
        {suit}
      </text>
      {/* Sceptre / sword on the other side */}
      <rect x="74" y="34" width="2.2" height="30" fill={GOLD} stroke={INK} strokeWidth="0.5" />
      <circle cx="75.1" cy="32" r="3" fill={GOLD} stroke={INK} strokeWidth="0.7" />
    </g>
  );
};

const FaceCard = ({ rank, suit }: Props) => {
  const main = isRedSuit(suit) ? RED : INK;

  return (
    <div className="absolute inset-[14%] top-[13%] bottom-[13%] z-10 pointer-events-none">
      <svg viewBox="0 0 100 140" className="w-full h-full" preserveAspectRatio="none">
        {/* Frame */}
        <rect x="0.6" y="0.6" width="98.8" height="138.8" rx="3" fill={PAPER} stroke={INK} strokeWidth="1.2" />
        {/* Diagonal divider */}
        <line x1="0.6" y1="70" x2="99.4" y2="70" stroke={INK} strokeWidth="1" />

        <CourtHalf rank={rank} suit={suit} main={main} />
        <g transform="rotate(180 50 70)">
          <CourtHalf rank={rank} suit={suit} main={main} />
        </g>
      </svg>
    </div>
  );
};

export default FaceCard;
