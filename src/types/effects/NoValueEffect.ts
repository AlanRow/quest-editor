import type { BaseEffect } from "./BaseEffect";

type NoValueEffectType = "show" | "hide";

export interface NoValueEffect extends BaseEffect {
  type: NoValueEffectType;
}
