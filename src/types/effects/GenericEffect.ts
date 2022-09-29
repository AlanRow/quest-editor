import type { BaseEffect } from "./BaseEffect";

type GenericEffectType = "set";

export interface GenericEffect extends BaseEffect {
  type: GenericEffectType;
  value: string | number;
}
