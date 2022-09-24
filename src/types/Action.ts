import type { State } from "./State";
import type { Effect } from "./Effect";

export interface Action {
  id: string;
  name: string;
  next: State;
  effects: Effect[];
}
