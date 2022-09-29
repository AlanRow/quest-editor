import type { GenericEffect } from "./GenericEffect";
import type { NoValueEffect } from "./NoValueEffect";
import type { NumberEffect } from "./NumberEffect";

export type Effect = GenericEffect | NumberEffect | NoValueEffect;
