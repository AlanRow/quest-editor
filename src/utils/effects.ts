import type { Effect, NumberEffect } from "@/types/effects";

const numberTypes = ["inc", "dec"] as const;

/** хитровымудренная схема, чтобы получить сбой в случае когда массив не стыкуется с типами */
type NumberTypes = typeof numberTypes[keyof typeof numberTypes];
type RestTypes = Exclude<NumberEffect["type"], NumberTypes>;

export function isNumberEffect(
  effect: Effect | RestTypes
): effect is NumberEffect {
  for (let i = 0; i < numberTypes.length; i++) {
    const type: NumberEffect["type"] = numberTypes[i];
    if (type === effect.type) {
      return true;
    }
  }

  return false;
}
