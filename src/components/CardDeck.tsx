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
        bg-secondary border border-border overflow-hidden
        transition-all duration-300 cursor-pointer
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:border-foreground/25 active:scale-[0.98] animate-float'}
      `}
      style={{ boxShadow: '0 16px 32px rgba(0,0,0,0.3)' }}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent 0 7px, hsl(var(--foreground) / 0.35) 7px 8px)`,
        }}
      />
      <div className="absolute inset-3 rounded-lg border border-foreground/20" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-1">
        <p className="text-foreground text-base font-medium">แตะเพื่อจั่ว</p>
        <p className="text-muted-foreground text-xs tabular-nums">
          {remaining}/{total}
        </p>
      </div>
    </button>
  );
};

export default CardDeck;
