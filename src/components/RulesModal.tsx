import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RANKS, type Rank } from '@/lib/gameData';
import { Settings } from 'lucide-react';

interface Props {
  rules: Record<Rank, string>;
  onSave: (rules: Record<Rank, string>) => void;
}

const RulesModal = ({ rules, onSave }: Props) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(rules);

  const handleOpen = (o: boolean) => {
    if (o) setDraft({ ...rules });
    setOpen(o);
  };

  const handleSave = () => {
    onSave(draft);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-neon-cyan/40 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-colors">
          <Settings className="w-4 h-4" />
          ตั้งค่ากติกา
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto bg-popover border-border">
        <DialogHeader>
          <DialogTitle className="text-xl neon-text-pink">แก้ไขกติกา</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {RANKS.map((rank) => (
            <div key={rank} className="flex items-center gap-3">
              <span className="w-10 text-center text-lg font-bold text-neon-yellow shrink-0">{rank}</span>
              <Input
                value={draft[rank]}
                onChange={(e) => setDraft({ ...draft, [rank]: e.target.value })}
                className="bg-muted border-border focus:border-neon-cyan"
              />
            </div>
          ))}
        </div>
        <Button onClick={handleSave} className="w-full mt-4 bg-neon-pink hover:bg-neon-pink/80 text-primary-foreground font-bold">
          บันทึก
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RulesModal;
