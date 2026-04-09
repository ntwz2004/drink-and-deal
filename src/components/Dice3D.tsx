import { useState, useEffect, useRef } from 'react';

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

// Final X,Y degrees to show each face
const FACE_ANGLES: Record<number, [number, number]> = {
  1: [0, 0],
  2: [0, 90],
  3: [-90, 0],
  4: [90, 0],
  5: [0, -90],
  6: [0, 180],
};

const DiceFace = ({ dots, transform }: { dots: [number, number][]; transform: string }) => (
  <div
    className="absolute w-full h-full rounded-xl"
    style={{
      transform,
      backfaceVisibility: 'hidden',
      background: 'linear-gradient(145deg, hsl(0 0% 98%), hsl(0 0% 90%))',
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
  const size = 120;
  const half = size / 2;

  // Track cumulative rotation to avoid jumps
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const prevRolling = useRef(false);

  useEffect(() => {
    if (isRolling && !prevRolling.current) {
      // Start rolling: add multiple full spins + land on the target face
      const [targetX, targetY] = FACE_ANGLES[face];
      // Add 3-5 full spins on each axis for dramatic effect
      const spinsX = (Math.floor(Math.random() * 3) + 3) * 360;
      const spinsY = (Math.floor(Math.random() * 3) + 3) * 360;
      setRotation({
        x: targetX + spinsX * (Math.random() > 0.5 ? 1 : -1),
        y: targetY + spinsY * (Math.random() > 0.5 ? 1 : -1),
      });
    }
    prevRolling.current = isRolling;
  }, [isRolling, face]);

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
          transition: 'transform 1.6s cubic-bezier(0.15, 0.8, 0.3, 1)',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <DiceFace dots={DOT_POSITIONS[1]} transform={`translateZ(${half}px)`} />
        <DiceFace dots={DOT_POSITIONS[6]} transform={`rotateY(180deg) translateZ(${half}px)`} />
        <DiceFace dots={DOT_POSITIONS[5]} transform={`rotateY(90deg) translateZ(${half}px)`} />
        <DiceFace dots={DOT_POSITIONS[2]} transform={`rotateY(-90deg) translateZ(${half}px)`} />
        <DiceFace dots={DOT_POSITIONS[3]} transform={`rotateX(90deg) translateZ(${half}px)`} />
        <DiceFace dots={DOT_POSITIONS[4]} transform={`rotateX(-90deg) translateZ(${half}px)`} />
      </div>
    </button>
  );
};

export default Dice3D;
