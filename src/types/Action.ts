import type { OptionalState, State } from "./State";
import type { Effect } from "./Effect";
import type { ComplexCondition } from "./Condition";

export interface Action {
  id: string;
  name: string;
  next: State | OptionalState[];
  effects: Effect[];
  conditions?: ComplexCondition;
}
