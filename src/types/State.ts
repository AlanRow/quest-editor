import type { Action } from "./Action";
import type { ComplexCondition } from "./Condition";

export interface State {
  actions: Action[];
  desc: string;
  picture?: string;
}

export interface OptionalState {
  state: State;
  probability?: number;
  condition?: ComplexCondition;
}
