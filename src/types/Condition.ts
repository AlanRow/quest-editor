import type { Status } from "./Status";

export type NumberConditionType = "greater" | "lower";
export type GenericConditionType = "eq";
export type ConditionType = GenericConditionType | NumberConditionType;

interface BaseCondition {
  type: ConditionType;
}

export interface ConstCondition extends BaseCondition {
  const: any;
  param: string;
}

export interface ParamCondition extends BaseCondition {
  param1: string;
  param2: string;
}

export type Condition = ConstCondition | ParamCondition;

//export interface NumberCondition extends Condition<number> {
//   type: NumberConditionType;
// }

// export interface GenericCondition extends Condition<string | number> {
//   type: GenericConditionType;
// }

export type ComplexCondition = Condition[][];

function checkCondition(condition: Condition, status: Status): boolean {
  let param1;
  let param2;

  if ("const" in condition) {
    param1 = status[condition.param].value;
    param2 = condition.const;
  } else {
    param1 = status[condition.param1].value;
    param2 = status[condition.param2].value;
  }

  switch (condition.type) {
    case "eq":
      return param1 === param2;
    case "greater":
      return param1 > param2;
    case "lower":
      return param1 < param2;
    default:
      return condition.type;
  }
}

export function checkComplexCondition(
  orConditions: ComplexCondition,
  status: Status
): boolean {
  if (orConditions.length === 0) {
    return true;
  }

  return orConditions.some((andConditions) =>
    andConditions.every((cond) => checkCondition(cond, status))
  );
}
