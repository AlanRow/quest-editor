export type NumberEffectType = "inc" | "dec";
export type GenericEffectType = "set";
export type EffectType = NumberEffectType | GenericEffectType | "show" | "hide";
// export type EffectValue<T extends EffectType> = T extends NumberEffectType
//   ? number
//   : number | string;

export interface Effect {
  type: EffectType;
  param: string;
  value?: any;
}

export interface ValueEffect extends Effect {
  value: string | number;
}

export interface GenericEffect extends ValueEffect {
  type: GenericEffectType;
}

export interface NumberEffect extends ValueEffect {
  type: NumberEffectType;
  value: number;
}

export interface RestEffect extends Effect {
  type: Exclude<EffectType, GenericEffectType | NumberEffectType>;
}

export function isNumberEffect(effect: Effect): effect is NumberEffect {
  return ["inc", "dec"].includes(effect.type);
}

export function isGenericEffect(effect: Effect): effect is GenericEffect {
  return ["set"].includes(effect.type);
}
