import type { NumberEffect } from "./NumberEffect";
import type { GenericEffect } from "./GenericEffect";
import type { NoValueEffect } from "./NoValueEffect";

type EffectType = (NumberEffect | GenericEffect | NoValueEffect)["type"];

export interface BaseEffect {
  type: EffectType;
  param: string;
}
