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
