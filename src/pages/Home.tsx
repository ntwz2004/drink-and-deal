import { Link } from 'react-router-dom';
import { Dices } from 'lucide-react';

const games = [
  {
    title: 'ไพ่ปาร์ตี้',
    description: 'จั่วไพ่ 52 ใบ แต่ละใบมีกติกาสนุกๆ',
    emoji: '🃏',
    path: '/cards',
    glowClass: 'neon-glow-pink',
    borderColor: 'border-neon-pink/30 hover:border-neon-pink/70',
    gradient: 'from-neon-pink/20 to-neon-purple/20',
  },
  {
    title: 'ทอยลูกเต๋า',
    description: 'ใส่ชื่อผู้เล่น 1-6 แล้วทอยดูว่าใครโดน!',
    emoji: '🎲',
    path: '/dice',
    glowClass: 'neon-glow-cyan',
    borderColor: 'border-neon-cyan/30 hover:border-neon-cyan/70',
    gradient: 'from-neon-cyan/20 to-neon-green/20',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-4xl sm:text-6xl font-black neon-text-pink mb-2 text-center">
        🎉 Party Games 🍻
      </h1>
      <p className="text-muted-foreground text-sm sm:text-base mb-10 text-center">
        เลือกเกมที่อยากเล่นกับเพื่อนๆ
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-lg">
        {games.map((game) => (
          <Link
            key={game.path}
            to={game.path}
            className={`
              group relative rounded-2xl border bg-gradient-to-br ${game.gradient}
              ${game.borderColor}
              p-6 sm:p-8 flex flex-col items-center text-center
              transition-all duration-300
              hover:scale-[1.04] active:scale-[0.97]
              backdrop-blur-sm
            `}
          >
            <span className="text-6xl sm:text-7xl mb-4 transition-transform duration-300 group-hover:scale-110">
              {game.emoji}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
              {game.title}
            </h2>
            <p className="text-muted-foreground text-sm leading-snug">
              {game.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
