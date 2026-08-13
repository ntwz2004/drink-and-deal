import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const DEVICE_KEY = 'dd_device_id';

export function getDeviceId(): string {
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

type StateKey = 'card_state' | 'dice_state';

/**
 * Persists a game state object to Lovable Cloud, keyed by a random device id.
 * The stored state is only cleared when clear() is called (the "เริ่มใหม่" button).
 */
export function useGameSession<T extends object>(key: StateKey) {
  const [loaded, setLoaded] = useState(false);
  const [initial, setInitial] = useState<T | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await supabase
          .from('game_sessions')
          .select(key)
          .eq('device_id', getDeviceId())
          .maybeSingle();
        if (!active) return;
        const raw = (data as Record<string, unknown> | null)?.[key];
        if (raw && typeof raw === 'object' && Object.keys(raw).length > 0) {
          setInitial(raw as T);
        }
      } catch {
        // offline / no saved state — start fresh
      } finally {
        if (active) setLoaded(true);
      }
    })();
    return () => {
      active = false;
    };
  }, [key]);

  const save = useCallback(
    (state: T) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        supabase
          .from('game_sessions')
          .upsert(
            { device_id: getDeviceId(), [key]: state as unknown as never },
            { onConflict: 'device_id' },
          )
          .then(() => undefined);
      }, 400);
    },
    [key],
  );

  const clear = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current);
    await supabase
      .from('game_sessions')
      .upsert(
        { device_id: getDeviceId(), [key]: {} as unknown as never },
        { onConflict: 'device_id' },
      );
  }, [key]);

  return { loaded, initial, save, clear };
}
