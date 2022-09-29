import type { ComplexCondition } from "../conditions";
import type { State } from "./State";

export interface OptionalState {
  state: State;
  probability?: number;
  condition?: ComplexCondition;
}
