import { Link } from 'react-router-dom';

const games = [
  {
    title: 'ไพ่ปาร์ตี้',
    description: 'จั่วไพ่ 52 ใบ แต่ละใบมีกติกาสนุกๆ',
    icon: '🃏',
    path: '/cards',
  },
  {
    title: 'ทอยลูกเต๋า',
    description: 'ใส่ชื่อผู้เล่น 1-6 แล้วทอยดูว่าใครโดน!',
    icon: '🎲',
    path: '/dice',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">Party Games</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-1 text-center">
        เลือกเกมที่จะเล่น
      </h1>
      <p className="text-muted-foreground text-sm mb-12 text-center">
        แตะเพื่อเริ่มเล่นกับเพื่อนๆ
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md sm:max-w-lg">
        {games.map((game) => (
          <Link
            key={game.path}
            to={game.path}
            className="group flex-1 rounded-2xl border border-border bg-card/50 backdrop-blur-sm
              p-8 flex flex-col items-center text-center
              transition-all duration-300
              hover:bg-card hover:border-muted-foreground/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="text-5xl mb-5 transition-transform duration-300 group-hover:scale-110">
              {game.icon}
            </span>
            <h2 className="text-lg font-semibold text-foreground mb-1">
              {game.title}
            </h2>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {game.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
