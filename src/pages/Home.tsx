import { Link } from 'react-router-dom';
import { Spade, Dices } from 'lucide-react';

const games = [
  {
    title: 'ไพ่ปาร์ตี้',
    description: 'จั่วไพ่ 52 ใบ แต่ละใบมีกติกาสนุกๆ',
    Icon: Spade,
    path: '/cards',
  },
  {
    title: 'ทอยลูกเต๋า',
    description: 'ใส่ชื่อผู้เล่น 1-6 แล้วทอยดูว่าใครโดน',
    Icon: Dices,
    path: '/dice',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="flex items-center gap-2 mb-6">
        <Spade className="w-4 h-4 text-foreground/70" strokeWidth={1.5} />
        <span className="text-sm tracking-[0.35em] uppercase text-foreground/80">Drink &amp; Deal</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2 text-center">
        เลือกเกมที่จะเล่น
      </h1>
      <p className="text-muted-foreground text-sm mb-12 text-center">แตะเพื่อเริ่มเล่นกับเพื่อนๆ</p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md sm:max-w-lg">
        {games.map(({ Icon, ...game }) => (
          <Link
            key={game.path}
            to={game.path}
            className="group flex-1 rounded-xl border border-border bg-card/40
              p-8 flex flex-col items-center text-center
              transition-colors duration-300
              hover:bg-card hover:border-foreground/25"
          >
            <Icon
              className="w-7 h-7 mb-5 text-foreground/70 transition-colors group-hover:text-foreground"
              strokeWidth={1.25}
            />
            <h2 className="text-base font-medium text-foreground mb-1">{game.title}</h2>
            <p className="text-muted-foreground text-xs leading-relaxed">{game.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
