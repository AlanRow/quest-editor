import type { GenericEffect, NumberEffect } from "@/types/Effect";
import type { Level } from "@/types/Level";
import type { State } from "@/types/State";

/** состояния */
const INIT_STATE: State = {
  actions: [],
  desc: "Начать?",
  picture: "/images/start.jpeg",
};

const CHOICE_STATE: State = {
  actions: [],
  desc: "Куда пойти?",
  picture: "/images/fork.jpeg",
};

const STUB_STATE: State = {
  actions: [],
  desc: "Вы в тупике",
  picture: "/images/wall.jpeg",
};

const FINISH_STATE: State = {
  actions: [],
  desc: "Вы победили!",
  picture: "/images/win.jpeg",
};

/** эффекты */
const SKIP_TIME_EFFECT: NumberEffect = {
  param: "time",
  type: "inc",
  value: 1,
};

const RESET_TIME_EFFECT: GenericEffect = {
  param: "time",
  type: "set",
  value: 0,
};

/** действия */
INIT_STATE.actions = [
  {
    id: "start",
    name: "Начать",
    next: CHOICE_STATE,
    effects: [SKIP_TIME_EFFECT],
  },
];

CHOICE_STATE.actions = [
  {
    id: "left",
    name: "Пойти налево",
    next: STUB_STATE,
    effects: [SKIP_TIME_EFFECT],
  },
  {
    id: "right",
    name: "Пойти направо",
    next: FINISH_STATE,
    effects: [SKIP_TIME_EFFECT],
  },
];

STUB_STATE.actions = [
  {
    id: "back",
    name: "Вернуться",
    next: CHOICE_STATE,
    effects: [SKIP_TIME_EFFECT],
  },
];

FINISH_STATE.actions = [
  {
    id: "restart",
    name: "Начать заново",
    next: INIT_STATE,
    effects: [RESET_TIME_EFFECT],
  },
];

/** статус */
const STATUS = {
  time: {
    name: "Время",
    value: 0,
    isHidden: false,
  },
};

const QUEST: Level = {
  start: INIT_STATE,
  status: STATUS,
};

export default QUEST;
