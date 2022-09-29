import type { Action } from "@/types/Action";
import type { Condition } from "@/types/conditions";
import type { GenericEffect, NumberEffect } from "@/types/effects";
import type { Level } from "@/types/Level";
import type { OptionalState, State } from "@/types/states";
import type { Status } from "@/types/statuses";

/** состояния */
const CHOOSE_WEAPON: State = {
  actions: [],
  desc: "Выберите оружие",
};

const ENEMY_CHOICE_BOW: State = {
  actions: [],
  desc: "Противник выбрал лук",
};

const ENEMY_CHOICE_SWORD: State = {
  actions: [],
  desc: "Противник выбрал меч",
};

const ENEMY_CHOICE_MAGIC: State = {
  actions: [],
  desc: "Противник выбрал магию",
};

const WIN_ROUND: State = {
  actions: [],
  desc: "Вы ранили противника",
};

const LOOSE_ROUND: State = {
  actions: [],
  desc: "Вас ранили",
};

const DRAW_ROUND: State = {
  actions: [],
  desc: "Ничья",
};

const WIN_FIGHT: State = {
  actions: [],
  desc: "Вы выиграли",
};

const LOOSE_FIGHT: State = {
  actions: [],
  desc: "Вы проиграли",
};

/** эффекты */
type WeaponType = "bow" | "sword" | "magic";

function setUserWeaponEffect(value: WeaponType): GenericEffect {
  return {
    type: "set",
    param: "player_weapon",
    value,
  };
}

/** условия */
function checkWeapon(target: WeaponType): Condition {
  return {
    type: "eq",
    const: target,
    param: "player_weapon",
  };
}

const HIT_PLAYER_EFFECT: NumberEffect = {
  type: "inc",
  param: "player_hits",
  value: 1,
};

const HIT_ENEMY_EFFECT: NumberEffect = {
  type: "inc",
  param: "enemy_hits",
  value: 1,
};

/** действия */

const RANDOM_WEAPON_STATES: OptionalState[] = [
  {
    state: ENEMY_CHOICE_BOW,
    probability: 0.33,
  },
  {
    state: ENEMY_CHOICE_SWORD,
    probability: 0.33,
  },
  {
    state: ENEMY_CHOICE_MAGIC,
    probability: 0.33,
  },
];

CHOOSE_WEAPON.actions = [
  {
    id: "bow",
    name: "Лук",
    next: RANDOM_WEAPON_STATES,
    effects: [setUserWeaponEffect("bow")],
  },
  {
    id: "sword",
    name: "Меч",
    next: RANDOM_WEAPON_STATES,
    effects: [setUserWeaponEffect("sword")],
  },
  {
    id: "magic",
    name: "Магия",
    next: RANDOM_WEAPON_STATES,
    effects: [setUserWeaponEffect("magic")],
  },
];

function getNextAction(
  win: WeaponType,
  draw: WeaponType,
  loose: WeaponType
): Action {
  return {
    id: "next",
    name: "Далее",
    next: [
      {
        state: WIN_ROUND,
        condition: [[checkWeapon(win)]],
      },
      {
        state: DRAW_ROUND,
        condition: [[checkWeapon(draw)]],
      },
      {
        state: LOOSE_ROUND,
        condition: [[checkWeapon(loose)]],
      },
    ],
    effects: [],
  };
}

ENEMY_CHOICE_BOW.actions = [getNextAction("magic", "bow", "sword")];

ENEMY_CHOICE_SWORD.actions = [getNextAction("bow", "sword", "magic")];

ENEMY_CHOICE_MAGIC.actions = [getNextAction("sword", "magic", "bow")];

WIN_ROUND.actions = [
  {
    id: "choose",
    name: "Выбрать оружие",
    next: CHOOSE_WEAPON,
    effects: [HIT_ENEMY_EFFECT],
    conditions: [[{ type: "lower", const: 2, param: "enemy_hits" }]],
  },
  {
    id: "win",
    name: "Враг пошатнулся и упал",
    next: WIN_FIGHT,
    effects: [HIT_ENEMY_EFFECT],
    conditions: [[{ type: "greater", const: 1, param: "enemy_hits" }]],
  },
];

LOOSE_ROUND.actions = [
  {
    id: "choose",
    name: "Выбрать оружие",
    next: CHOOSE_WEAPON,
    effects: [HIT_PLAYER_EFFECT],
    conditions: [[{ type: "lower", const: 2, param: "player_hits" }]],
  },
  {
    id: "loose",
    name: "Вы почувствовали что больше не можете сражаться. В ваших глазах потемнело и мир пошатнулся",
    next: LOOSE_FIGHT,
    effects: [HIT_PLAYER_EFFECT],
    conditions: [[{ type: "greater", const: 1, param: "player_hits" }]],
  },
];

DRAW_ROUND.actions = [
  {
    id: "choose",
    name: "Выбрать оружие",
    next: CHOOSE_WEAPON,
    effects: [],
  },
];

const ACTION_RESTART: Action = {
  id: "restart",
  name: "Начать заново",
  next: CHOOSE_WEAPON,
  effects: [
    {
      type: "set",
      param: "player_hits",
      value: 0,
    },
    {
      type: "set",
      param: "enemy_hits",
      value: 0,
    },
  ],
};

LOOSE_FIGHT.actions = [ACTION_RESTART];
WIN_FIGHT.actions = [ACTION_RESTART];

/** статус */
const STATUS: Status = {
  player_hits: {
    name: "Ваши ранения",
    value: 0,
    isHidden: false,
  },
  player_weapon: {
    name: "Ваше оружие",
    value: "",
    isHidden: true,
  },
  enemy_hits: {
    name: "Ранения противника",
    value: 0,
    isHidden: false,
  },
};

const QUEST: Level = {
  start: CHOOSE_WEAPON,
  status: STATUS,
};

export default QUEST;
