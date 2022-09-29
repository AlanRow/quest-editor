type NumberConditionType = "greater" | "lower";
type GenericConditionType = "eq";
type ConditionType = GenericConditionType | NumberConditionType;

interface BaseCondition {
  type: ConditionType;
}

interface ConstCondition extends BaseCondition {
  const: any;
  param: string;
}

interface ParamCondition extends BaseCondition {
  param1: string;
  param2: string;
}

export type Condition = ConstCondition | ParamCondition;
