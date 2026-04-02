interface Props {
  remaining: number;
  total: number;
  onClick: () => void;
  disabled: boolean;
}

const CardDeck = ({ remaining, total, onClick, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-56 h-80 sm:w-64 sm:h-96 rounded-xl
        bg-gradient-to-br from-neon-purple via-primary to-neon-pink
        flex flex-col items-center justify-center gap-3
        transition-all duration-300 cursor-pointer
        neon-glow-purple
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95 animate-float'}
      `}
    >
      {/* Card back pattern */}
      <div className="absolute inset-2 rounded-lg border-2 border-foreground/20 flex items-center justify-center">
        <div className="absolute inset-2 rounded-md border border-foreground/10" />
        <div className="text-center z-10">
          <div className="text-5xl sm:text-6xl mb-2">🃏</div>
          <p className="text-foreground text-lg sm:text-xl font-bold">แตะเพื่อจั่ว</p>
          <p className="text-foreground/70 text-sm mt-1">
            ไพ่ที่เหลือ: {remaining}/{total}
          </p>
        </div>
      </div>
    </button>
  );
};

export default CardDeck;
