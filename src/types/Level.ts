import type { State } from "./State";
import type { Status } from "./Status";

export interface Level {
  start: State;
  status: Status;
}
