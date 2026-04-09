import { useMemo } from 'react';

interface Props {
  face: number;
  isRolling: boolean;
  onClick: () => void;
}

const DOT_POSITIONS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[28, 28], [72, 28], [28, 50], [72, 50], [28, 72], [72, 72]],
};

// Each face maps to a rotation that brings it to front
const FACE_ROTATIONS: Record<number, string> = {
  1: 'rotateX(0deg) rotateY(0deg)',
  2: 'rotateY(90deg)',
  3: 'rotateX(-90deg)',
  4: 'rotateX(90deg)',
  5: 'rotateY(-90deg)',
  6: 'rotateY(180deg)',
};

const DiceFace = ({ dots, transform, bg }: { dots: [number, number][]; transform: string; bg?: string }) => (
  <div
    className="absolute w-full h-full rounded-xl"
    style={{
      transform,
      backfaceVisibility: 'hidden',
      background: bg || 'linear-gradient(145deg, hsl(0 0% 98%), hsl(0 0% 90%))',
      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.6), inset 0 -1px 2px rgba(0,0,0,0.08)',
    }}
  >
    {dots.map(([x, y], i) => (
      <div
        key={i}
        className="absolute w-[16%] h-[16%] rounded-full"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle at 35% 35%, hsl(0 0% 30%), hsl(0 0% 10%))',
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.15), 0 1px 1px rgba(0,0,0,0.2)',
        }}
      />
    ))}
  </div>
);

const Dice3D = ({ face, isRolling, onClick }: Props) => {
  const size = 120; // px
  const half = size / 2;

  const rollRotation = useMemo(() => {
    if (!isRolling) return '';
    // Random multi-axis spins
    const rx = (Math.floor(Math.random() * 4) + 2) * 360 + Math.random() * 180;
    const ry = (Math.floor(Math.random() * 4) + 2) * 360 + Math.random() * 180;
    return `rotateX(${rx}deg) rotateY(${ry}deg)`;
  }, [isRolling]);

  const finalRotation = FACE_ROTATIONS[face];

  return (
    <button
      onClick={onClick}
      disabled={isRolling}
      className="cursor-pointer outline-none border-none bg-transparent"
      style={{
        perspective: '600px',
        width: size,
        height: size,
      }}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transition: isRolling ? 'transform 1.2s cubic-bezier(0.2, 0.8, 0.3, 1)' : 'transform 0.5s ease-out',
          transform: isRolling ? rollRotation : finalRotation,
        }}
      >
        {/* Front - face 1 */}
        <DiceFace
          dots={DOT_POSITIONS[1]}
          transform={`translateZ(${half}px)`}
        />
        {/* Back - face 6 */}
        <DiceFace
          dots={DOT_POSITIONS[6]}
          transform={`rotateY(180deg) translateZ(${half}px)`}
        />
        {/* Right - face 5 */}
        <DiceFace
          dots={DOT_POSITIONS[5]}
          transform={`rotateY(90deg) translateZ(${half}px)`}
        />
        {/* Left - face 2 */}
        <DiceFace
          dots={DOT_POSITIONS[2]}
          transform={`rotateY(-90deg) translateZ(${half}px)`}
        />
        {/* Top - face 3 */}
        <DiceFace
          dots={DOT_POSITIONS[3]}
          transform={`rotateX(90deg) translateZ(${half}px)`}
        />
        {/* Bottom - face 4 */}
        <DiceFace
          dots={DOT_POSITIONS[4]}
          transform={`rotateX(-90deg) translateZ(${half}px)`}
        />
      </div>
    </button>
  );
};

export default Dice3D;
