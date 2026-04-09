import type { Rank, Suit } from '@/lib/gameData';
import { isRedSuit } from '@/lib/gameData';

interface Props {
  rank: Rank;
  suit: Suit;
}

const FaceCard = ({ rank, suit }: Props) => {
  const red = isRedSuit(suit);
  const suitColor = red ? '#c0392b' : '#1a1a2e';
  const accentColor = red ? '#e74c3c' : '#2c3e50';

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div className="relative w-[78%] h-[70%] overflow-hidden rounded-sm"
        style={{
          border: `2px solid ${accentColor}40`,
          background: red
            ? 'linear-gradient(180deg, #fff8f0 0%, #fef0e0 100%)'
            : 'linear-gradient(180deg, #f0f4ff 0%, #e0e8f8 100%)',
        }}
      >
        {/* Inner ornate border */}
        <div className="absolute inset-[3px] rounded-sm"
          style={{ border: `1px solid ${accentColor}25` }}
        />

        {/* Top half - character */}
        <div className="absolute inset-0 bottom-1/2 flex flex-col items-center justify-center overflow-hidden">
          <FaceCharacter rank={rank} suitColor={suitColor} accentColor={accentColor} suit={suit} />
        </div>

        {/* Center divider line */}
        <div className="absolute left-[8%] right-[8%] top-1/2 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}30, transparent)` }}
        />

        {/* Bottom half - mirrored character */}
        <div className="absolute inset-0 top-1/2 flex flex-col items-center justify-center overflow-hidden rotate-180">
          <FaceCharacter rank={rank} suitColor={suitColor} accentColor={accentColor} suit={suit} />
        </div>

        {/* Corner suits */}
        <span className="absolute top-1 left-1.5 text-[10px]" style={{ color: suitColor }}>{suit}</span>
        <span className="absolute top-1 right-1.5 text-[10px]" style={{ color: suitColor }}>{suit}</span>
        <span className="absolute bottom-1 left-1.5 text-[10px] rotate-180" style={{ color: suitColor }}>{suit}</span>
        <span className="absolute bottom-1 right-1.5 text-[10px] rotate-180" style={{ color: suitColor }}>{suit}</span>
      </div>
    </div>
  );
};

const FaceCharacter = ({ rank, suitColor, accentColor, suit }: {
  rank: Rank; suitColor: string; accentColor: string; suit: Suit;
}) => {
  if (rank === 'J') return <JackFigure suitColor={suitColor} accentColor={accentColor} suit={suit} />;
  if (rank === 'Q') return <QueenFigure suitColor={suitColor} accentColor={accentColor} suit={suit} />;
  if (rank === 'K') return <KingFigure suitColor={suitColor} accentColor={accentColor} suit={suit} />;
  return null;
};

const JackFigure = ({ suitColor, accentColor, suit }: { suitColor: string; accentColor: string; suit: Suit }) => (
  <svg viewBox="0 0 100 120" className="w-full h-full" style={{ maxHeight: '100%' }}>
    {/* Hat */}
    <ellipse cx="50" cy="22" rx="22" ry="8" fill={accentColor} opacity="0.8" />
    <rect x="35" y="14" width="30" height="10" rx="2" fill={accentColor} opacity="0.9" />
    {/* Feather */}
    <path d="M65 14 Q72 4 68 0 Q66 8 62 12" fill={suitColor} opacity="0.6" />
    {/* Face */}
    <ellipse cx="50" cy="35" rx="16" ry="18" fill="#fdd9b5" />
    <ellipse cx="50" cy="35" rx="16" ry="18" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.3" />
    {/* Eyes */}
    <ellipse cx="44" cy="32" rx="2" ry="2.5" fill={accentColor} />
    <ellipse cx="56" cy="32" rx="2" ry="2.5" fill={accentColor} />
    <circle cx="43.5" cy="31.5" r="0.6" fill="white" />
    <circle cx="55.5" cy="31.5" r="0.6" fill="white" />
    {/* Nose & mouth */}
    <path d="M48 36 Q50 38 52 36" fill="none" stroke={accentColor} strokeWidth="0.6" opacity="0.5" />
    <path d="M46 41 Q50 43 54 41" fill="none" stroke="#c0392b" strokeWidth="0.8" />
    {/* Hair */}
    <path d="M34 30 Q34 18 42 16 L58 16 Q66 18 66 30 Q64 24 58 22 L42 22 Q36 24 34 30" fill={accentColor} opacity="0.7" />
    {/* Collar */}
    <path d="M36 52 L50 58 L64 52 L64 56 Q50 64 36 56 Z" fill="white" stroke={accentColor} strokeWidth="0.5" />
    {/* Tunic */}
    <rect x="36" y="56" width="28" height="40" rx="2" fill={accentColor} opacity="0.85" />
    <line x1="50" y1="56" x2="50" y2="96" stroke="white" strokeWidth="0.5" opacity="0.3" />
    {/* Buttons */}
    <circle cx="50" cy="66" r="1.5" fill="white" opacity="0.5" />
    <circle cx="50" cy="76" r="1.5" fill="white" opacity="0.5" />
    <circle cx="50" cy="86" r="1.5" fill="white" opacity="0.5" />
    {/* Suit symbol on chest */}
    <text x="50" y="72" textAnchor="middle" fontSize="8" fill={suitColor} opacity="0.4">{suit}</text>
    {/* Sleeves */}
    <path d="M36 58 L24 75 L30 78 L36 68" fill={accentColor} opacity="0.7" />
    <path d="M64 58 L76 75 L70 78 L64 68" fill={accentColor} opacity="0.7" />
    {/* Hands */}
    <circle cx="28" cy="78" r="4" fill="#fdd9b5" />
    <circle cx="72" cy="78" r="4" fill="#fdd9b5" />
  </svg>
);

const QueenFigure = ({ suitColor, accentColor, suit }: { suitColor: string; accentColor: string; suit: Suit }) => (
  <svg viewBox="0 0 100 120" className="w-full h-full" style={{ maxHeight: '100%' }}>
    {/* Crown */}
    <path d="M32 22 L38 8 L44 18 L50 4 L56 18 L62 8 L68 22 Z" fill="#f1c40f" stroke="#e67e22" strokeWidth="0.8" />
    <circle cx="38" cy="8" r="2" fill="#e74c3c" />
    <circle cx="50" cy="4" r="2.5" fill="#3498db" />
    <circle cx="62" cy="8" r="2" fill="#2ecc71" />
    {/* Face */}
    <ellipse cx="50" cy="37" rx="17" ry="18" fill="#fdd9b5" />
    <ellipse cx="50" cy="37" rx="17" ry="18" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.2" />
    {/* Eyes */}
    <ellipse cx="44" cy="34" rx="2.2" ry="2.8" fill={accentColor} />
    <ellipse cx="56" cy="34" rx="2.2" ry="2.8" fill={accentColor} />
    <circle cx="43.5" cy="33.5" r="0.7" fill="white" />
    <circle cx="55.5" cy="33.5" r="0.7" fill="white" />
    {/* Eyelashes */}
    <path d="M41 31.5 Q42 30 43 31" fill="none" stroke={accentColor} strokeWidth="0.4" />
    <path d="M57 31 Q58 30 59 31.5" fill="none" stroke={accentColor} strokeWidth="0.4" />
    {/* Nose & lips */}
    <path d="M48 38 Q50 40 52 38" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.4" />
    <path d="M45 43 Q50 46 55 43" fill="#e74c3c" opacity="0.6" />
    {/* Hair */}
    <path d="M33 35 Q32 20 42 18 L58 18 Q68 20 67 35 Q66 28 60 24 Q54 22 50 22 Q46 22 40 24 Q34 28 33 35" fill={accentColor} opacity="0.8" />
    <path d="M33 35 Q30 50 34 55" fill={accentColor} opacity="0.5" />
    <path d="M67 35 Q70 50 66 55" fill={accentColor} opacity="0.5" />
    {/* Necklace */}
    <path d="M38 54 Q50 58 62 54" fill="none" stroke="#f1c40f" strokeWidth="1.2" />
    <circle cx="50" cy="57" r="2.5" fill="#e74c3c" stroke="#f1c40f" strokeWidth="0.5" />
    {/* Dress */}
    <path d="M34 56 Q30 70 28 96 L72 96 Q70 70 66 56 Q50 62 34 56" fill={accentColor} opacity="0.85" />
    <path d="M34 56 Q50 62 66 56" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
    {/* Dress pattern */}
    <path d="M42 70 Q50 75 58 70" fill="none" stroke="white" strokeWidth="0.4" opacity="0.3" />
    <path d="M40 82 Q50 87 60 82" fill="none" stroke="white" strokeWidth="0.4" opacity="0.3" />
    {/* Suit on dress */}
    <text x="50" y="78" textAnchor="middle" fontSize="8" fill={suitColor} opacity="0.35">{suit}</text>
    {/* Sleeves */}
    <path d="M34 58 L22 72 L26 76 L34 66" fill={accentColor} opacity="0.7" />
    <path d="M66 58 L78 72 L74 76 L66 66" fill={accentColor} opacity="0.7" />
    {/* Hands with flower/scepter */}
    <circle cx="24" cy="76" r="3.5" fill="#fdd9b5" />
    <circle cx="76" cy="76" r="3.5" fill="#fdd9b5" />
    {/* Flower in hand */}
    <circle cx="20" cy="72" r="3" fill="#e74c3c" opacity="0.6" />
    <circle cx="20" cy="72" r="1.5" fill="#f1c40f" opacity="0.8" />
  </svg>
);

const KingFigure = ({ suitColor, accentColor, suit }: { suitColor: string; accentColor: string; suit: Suit }) => (
  <svg viewBox="0 0 100 120" className="w-full h-full" style={{ maxHeight: '100%' }}>
    {/* Crown - bigger & more ornate */}
    <path d="M28 24 L33 6 L40 18 L50 0 L60 18 L67 6 L72 24 Z" fill="#f1c40f" stroke="#e67e22" strokeWidth="1" />
    <rect x="28" y="22" width="44" height="5" rx="1" fill="#f1c40f" stroke="#e67e22" strokeWidth="0.5" />
    <circle cx="50" cy="3" r="3" fill="#e74c3c" stroke="#c0392b" strokeWidth="0.5" />
    <circle cx="33" cy="8" r="2" fill="#3498db" />
    <circle cx="67" cy="8" r="2" fill="#2ecc71" />
    <circle cx="40" cy="24" r="1.5" fill="#e74c3c" opacity="0.7" />
    <circle cx="50" cy="24" r="1.5" fill="#3498db" opacity="0.7" />
    <circle cx="60" cy="24" r="1.5" fill="#e74c3c" opacity="0.7" />
    {/* Face */}
    <ellipse cx="50" cy="40" rx="17" ry="18" fill="#fdd9b5" />
    <ellipse cx="50" cy="40" rx="17" ry="18" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.2" />
    {/* Beard */}
    <path d="M36 46 Q38 60 50 62 Q62 60 64 46 Q60 54 50 56 Q40 54 36 46" fill={accentColor} opacity="0.5" />
    {/* Eyes */}
    <ellipse cx="44" cy="37" rx="2.2" ry="2.5" fill={accentColor} />
    <ellipse cx="56" cy="37" rx="2.2" ry="2.5" fill={accentColor} />
    <circle cx="43.5" cy="36.5" r="0.7" fill="white" />
    <circle cx="55.5" cy="36.5" r="0.7" fill="white" />
    {/* Eyebrows */}
    <path d="M40 33 Q44 31 48 33" fill="none" stroke={accentColor} strokeWidth="1" />
    <path d="M52 33 Q56 31 60 33" fill="none" stroke={accentColor} strokeWidth="1" />
    {/* Nose & mouth */}
    <path d="M48 41 Q50 43 52 41" fill="none" stroke={accentColor} strokeWidth="0.6" opacity="0.4" />
    <path d="M46 46 Q50 48 54 46" fill="none" stroke="#8b4513" strokeWidth="0.6" opacity="0.5" />
    {/* Mustache */}
    <path d="M42 45 Q46 43 50 45 Q54 43 58 45" fill={accentColor} opacity="0.5" />
    {/* Hair/sideburns */}
    <path d="M33 38 Q32 26 44 26 L56 26 Q68 26 67 38 Q66 30 58 28 L42 28 Q34 30 33 38" fill={accentColor} opacity="0.7" />
    {/* Robe/cape collar */}
    <path d="M30 62 L40 58 L50 64 L60 58 L70 62 L68 68 Q50 76 32 68 Z" fill="#8b0000" opacity="0.8" />
    <path d="M40 58 L50 64 L60 58" fill="none" stroke="#f1c40f" strokeWidth="1" />
    {/* Fur trim */}
    <path d="M30 62 Q50 56 70 62" fill="none" stroke="white" strokeWidth="2" opacity="0.5" />
    {/* Robe body */}
    <rect x="32" y="68" width="36" height="30" rx="2" fill="#8b0000" opacity="0.85" />
    <line x1="50" y1="68" x2="50" y2="98" stroke="#f1c40f" strokeWidth="1" opacity="0.6" />
    {/* Belt */}
    <rect x="34" y="78" width="32" height="4" rx="1" fill="#f1c40f" opacity="0.7" />
    <rect x="47" y="77" width="6" height="6" rx="1" fill="#f1c40f" stroke="#e67e22" strokeWidth="0.5" />
    {/* Suit on robe */}
    <text x="50" y="92" textAnchor="middle" fontSize="8" fill={suitColor} opacity="0.35">{suit}</text>
    {/* Sleeves */}
    <path d="M32 68 L20 84 L26 88 L34 76" fill="#8b0000" opacity="0.7" />
    <path d="M68 68 L80 84 L74 88 L66 76" fill="#8b0000" opacity="0.7" />
    {/* Fur sleeve trim */}
    <path d="M20 84 L26 88" stroke="white" strokeWidth="2" opacity="0.4" />
    <path d="M80 84 L74 88" stroke="white" strokeWidth="2" opacity="0.4" />
    {/* Hands */}
    <circle cx="24" cy="88" r="4" fill="#fdd9b5" />
    <circle cx="76" cy="88" r="4" fill="#fdd9b5" />
    {/* Sword in right hand */}
    <rect x="75" y="60" width="2" height="28" rx="0.5" fill="#bdc3c7" />
    <rect x="72" y="58" width="8" height="3" rx="1" fill="#f1c40f" />
    <circle cx="76" cy="57" r="1.5" fill="#e74c3c" />
  </svg>
);

export default FaceCard;
