export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface PlayingCard {
  suit: Suit;
  rank: Rank;
  id: string;
}

export const SUITS: Suit[] = ['♠', '♥', '♦', '♣'];
export const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export const isRedSuit = (suit: Suit): boolean => suit === '♥' || suit === '♦';

export const DEFAULT_RULES: Record<Rank, string> = {
  'A': 'โดนคนเดียว',
  '2': 'หาเพื่อนโดนด้วย 1 คน',
  '3': 'หาเพื่อนโดนด้วย 2 คน',
  '4': 'เพื่อนฝั่งซ้ายโดน',
  '5': 'ห้าเฮฮา (โดนทุกคน)',
  '6': 'เพื่อนฝั่งขวาโดน',
  '7': 'Buddy',
  '8': 'พักได้',
  '9': 'เกมนับเลข',
  '10': 'ซ้าย ขวากิน',
  'J': 'จับหน้า (ใครจับคนสุดท้ายโดน)',
  'Q': 'ห้ามคุยด้วย (ใครคุยด้วยโดน)',
  'K': 'สั่งคนอื่นได้',
};

export const SPECIAL_RANKS: Rank[] = ['5', 'K', 'A'];

export function createDeck(): PlayingCard[] {
  const deck: PlayingCard[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank, id: `${rank}${suit}` });
    }
  }
  return shuffle(deck);
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
