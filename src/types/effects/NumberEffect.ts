import type { BaseEffect } from "./BaseEffect";

type NumberEffectType = "inc" | "dec";

export interface NumberEffect extends BaseEffect {
  type: NumberEffectType;
  value: number;
}
