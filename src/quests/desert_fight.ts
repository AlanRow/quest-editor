import type {
  Effect,
  GenericEffect,
  NumberEffect,
  ValueEffect,
} from "@/types/Effect";
import type { Level } from "@/types/Level";
import type { State } from "@/types/State";
import type { Status } from "@/types/Status";

type UserClass = "logger" | "duom" | "kiel" | "guardian";

/** состояния */
const STATE_CHOICE_CLASS: State = {
  actions: [],
  desc: `Выберите класс персонажа. В мире поста есть разные специализации.
  Бродячие ученые-логгеры, умеющие управлять сложными приборами силой мысли и заставляющие мазать даже лучших снайперов,
  Оборотни-дуомы, что способны оборачиваться и уничтожать противника в ближнем бою,
  Благородные киэлы, обладающие невероятной скоростью, точностью и интеллектом,
  Оперативники-стражи, подготовленные к работе в поле и вооруженные по последнему слову техники
  `,
};

const STATE_UNEXPECTED_ENEMY: State = {
  actions: [],
  desc: `Идя по пустоши к брезжущим вдали огням Дора вы слышите шум мотоцикла.
  Обернувшись, вы понимаете, что избежать столкновения не удастся -  что будете делать?
  `,
};

const STATE_TRAP: State = {
  actions: [],
  desc: `Вы спрятались и атаковали противника из засады ранив его в плечо`,
};

const STATE_FIGHT_CHOICE: State = {
  actions: [],
  desc: `У вас появилась возможность атаковать - что вы предпримете?`,
};

const STATE_DEFENSE: State = {
  actions: [],
  desc: `Ваш противник собирается атаковать - как будете защищаться?`,
};

const STATE_DEFENSE_: State = {
  actions: [],
  desc: `Ваш противник собирается атаковать - как будете защищаться?`,
};

/** эффекты */

function initParamsEffects(
  userClass: UserClass,
  health: number,
  agility: number,
  strength: number,
  accuracy: number
): ValueEffect[] {
  return [
    {
      type: "set",
      param: "your_class",
      value: userClass,
    },
    {
      type: "set",
      param: "your_health",
      value: health,
    },
    {
      type: "set",
      param: "your_agility",
      value: agility,
    },
    {
      type: "set",
      param: "your_strength",
      value: strength,
    },
    {
      type: "set",
      param: "your_accuracy",
      value: accuracy,
    },
  ];
}

const EFFECTS_SHOW_USER: Effect[] = [
  {
    type: "show",
    param: "your_health",
  },
  {
    type: "show",
    param: "your_agility",
  },
  {
    type: "show",
    param: "your_strength",
  },
  {
    type: "show",
    param: "your_accuracy",
  },
];

const EFFECTS_SHOW_ENEMY: Effect[] = [
  {
    type: "show",
    param: "enemy_health",
  },
  {
    type: "show",
    param: "enemy_agility",
  },
  {
    type: "show",
    param: "enemy_strength",
  },
  {
    type: "show",
    param: "enemy_accuracy",
  },
];
// const SKIP_TIME_EFFECT: NumberEffect = {
//   param: "time",
//   type: "inc",
//   value: 1,
// };

/** действия */

STATE_CHOICE_CLASS.actions = [
  {
    id: "logger",
    name: "Ученый-логгер",
    next: STATE_UNEXPECTED_ENEMY,
    effects: [
      ...initParamsEffects("logger", 24, 12, 6, 8),
      ...EFFECTS_SHOW_USER,
    ],
  },
  {
    id: "duom",
    name: "Дуом",
    next: STATE_UNEXPECTED_ENEMY,
    effects: [...initParamsEffects("duom", 36, 14, 8, 6), ...EFFECTS_SHOW_USER],
  },
  {
    id: "kiel",
    name: "Киэл",
    next: STATE_UNEXPECTED_ENEMY,
    effects: [
      ...initParamsEffects("kiel", 21, 8, 14, 11),
      ...EFFECTS_SHOW_USER,
    ],
  },
  {
    id: "guardian",
    name: "Страж",
    next: STATE_UNEXPECTED_ENEMY,
    effects: [
      ...initParamsEffects("guardian", 27, 8, 9, 12),
      ...EFFECTS_SHOW_USER,
    ],
  },
];

/** статус */
const STATUS: Status = {
  your_class: {
    name: "Ваш класс",
    value: "",
    isHidden: true,
  },
  your_health: {
    name: "Ваша стойкость",
    value: 0,
    isHidden: true,
  },
  your_agility: {
    name: "Ваша скорость",
    value: 0,
    isHidden: true,
  },
  your_strength: {
    name: "Ваша сила",
    value: 0,
    isHidden: true,
  },
  your_accuracy: {
    name: "Ваша точность",
    value: 0,
    isHidden: true,
  },

  enemy_health: {
    name: "Стойкость противинка",
    value: 30,
    isHidden: true,
  },
  enemy_agility: {
    name: "Скорость противинка",
    value: 10,
    isHidden: true,
  },
  enemy_strength: {
    name: "Сила противинка",
    value: 10,
    isHidden: true,
  },
  enemy_accuracy: {
    name: "Точность противинка",
    value: 10,
    isHidden: true,
  },
};

const QUEST: Level = {
  start: STATE_CHOICE_CLASS,
  status: STATUS,
};

export default QUEST;
