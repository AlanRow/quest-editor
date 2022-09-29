import type { OptionalState, State } from "./states";
import type { Effect } from "./effects";
import type { ComplexCondition } from "./conditions";

export interface Action {
  id: string;
  name: string;
  next: State | OptionalState[];
  effects: Effect[];
  conditions?: ComplexCondition;
}
