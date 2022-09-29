import type { State } from "./states";
import type { Status } from "./statuses";

export interface Level {
  start: State;
  status: Status;
}
