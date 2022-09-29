import type { Action } from "../Action";

export interface State {
  actions: Action[];
  desc: string;
  picture?: string;
}
