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
        <Button variant="outline" size="sm" className="gap-2 border-border hover:bg-card">
          <Settings className="w-3.5 h-3.5" />
          กติกา
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto bg-popover border-border">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium text-foreground">แก้ไขกติกา</DialogTitle>
        </DialogHeader>
        <div className="space-y-2.5 mt-4">
          {RANKS.map((rank) => (
            <div key={rank} className="flex items-center gap-3">
              <span className="w-8 text-center text-sm font-medium text-muted-foreground shrink-0">{rank}</span>
              <Input
                value={draft[rank]}
                onChange={(e) => setDraft({ ...draft, [rank]: e.target.value })}
                className="bg-card/60 border-border focus:border-foreground/30 h-9 text-sm"
              />
            </div>
          ))}
        </div>
        <Button onClick={handleSave} className="w-full mt-4">
          บันทึก
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RulesModal;
