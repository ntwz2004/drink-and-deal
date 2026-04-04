import type { Rank, Suit } from '@/lib/gameData';
import { isRedSuit } from '@/lib/gameData';

interface Props {
  rank: Rank;
  suit: Suit;
}

const FACE_CONFIG: Record<string, { bg: string; accent: string; label: string; crown?: boolean }> = {
  J: { bg: 'from-blue-400/30 to-blue-600/30', accent: '💂', label: 'Jack' },
  Q: { bg: 'from-rose-400/30 to-pink-600/30', accent: '👸', label: 'Queen', crown: true },
  K: { bg: 'from-amber-400/30 to-yellow-600/30', accent: '🤴', label: 'King', crown: true },
};

const FaceCard = ({ rank, suit }: Props) => {
  const config = FACE_CONFIG[rank];
  if (!config) return null;

  const red = isRedSuit(suit);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div
        className={`
          relative w-[80%] h-[72%] rounded-lg border
          bg-gradient-to-b ${config.bg}
          flex flex-col items-center justify-center
          ${red ? 'border-red-300/40' : 'border-gray-400/40'}
        `}
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%),
            repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.03) 4px, rgba(255,255,255,0.03) 8px)
          `,
        }}
      >
        {/* Decorative frame */}
        <div className="absolute inset-1 rounded border border-white/10" />

        {/* Character emoji */}
        <span className="text-7xl sm:text-8xl mb-1 drop-shadow-md">
          {config.accent}
        </span>

        {/* Suit below character */}
        <span className={`text-3xl sm:text-4xl ${red ? 'text-card-red' : 'text-card-black'}`}>
          {suit}
        </span>

        {/* Mirrored bottom half overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%] rounded-b-lg overflow-hidden opacity-20">
          <div className="w-full h-full flex items-start justify-center rotate-180 pt-1">
            <span className="text-4xl sm:text-5xl">
              {config.accent}
            </span>
          </div>
        </div>

        {/* Corner decorative diamonds */}
        <span className="absolute top-1 left-2 text-xs opacity-40">◆</span>
        <span className="absolute top-1 right-2 text-xs opacity-40">◆</span>
        <span className="absolute bottom-1 left-2 text-xs opacity-40 rotate-180">◆</span>
        <span className="absolute bottom-1 right-2 text-xs opacity-40 rotate-180">◆</span>
      </div>
    </div>
  );
};

export default FaceCard;
