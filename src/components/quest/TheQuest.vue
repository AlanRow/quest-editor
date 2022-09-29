<template>
  <main class="quest">
    <PanelDescription :description="currentState.desc" class="quest__desc" />
    <PanelActions
      :actionsList="currentState.actions"
      :status="status"
      class="quest__actions"
      @select="doAction"
    />
    <PanelPicture :imageUrl="currentState.picture" class="quest__picture" />
    <PanelStatus :status="status" />
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

import type { Action } from "@/types/Action";
import type { Status, StatusNumber, StatusParam } from "@/types/statuses";
import type {
  Effect,
  NumberEffect,
  GenericEffect,
  NoValueEffect,
} from "@/types/effects";
import type { State } from "@/types/states";

import { checkComplexCondition } from "@/utils/conditions";
import { isNumberEffect } from "@/utils/effects";

import PanelDescription from "./PanelDescription.vue";
import PanelActions from "./PanelActions.vue";
import PanelPicture from "./PanelPicture.vue";
import PanelStatus from "./PanelStatus.vue";

import { THREE_FIGHT } from "@/quests";

const currentState = ref(THREE_FIGHT.start);
const status: Status = reactive(THREE_FIGHT.status);

function doAction(action: Action): void {
  currentState.value = getNextState(action, status);

  for (const effect of action.effects) {
    const param = status[effect.param];

    if (!param) {
      console.error(`Parameter ${effect.param} does not exist`);
      return;
    }

    status[effect.param] = getEffectedParam(effect, param);
  }
}

function getNextState(action: Action, status: Status): State {
  const { next } = action;

  if (Array.isArray(next)) {
    const filteredState = next.filter((state) =>
      checkComplexCondition(state.condition || [], status)
    );

    if (filteredState.length === 0) {
      throw Error("No state to go");
    }

    const r = Math.random();
    let p = 0;

    for (const state of filteredState.slice(0, -1)) {
      if (!state.probability) return state.state;

      p += state.probability;

      if (r <= p) {
        return state.state;
      }
    }

    return filteredState[filteredState.length - 1].state;
  } else {
    return next;
  }
}

function getEffectedParam(effect: Effect, param: StatusParam): StatusParam {
  if ("value" in effect) {
    if (isNumberEffect(effect)) {
      if (typeof param.value === "string") {
        console.error(
          `Parameter ${effect.param} should be a number but it has type string`
        );
        return param;
      }

      return getEffectedNumber(effect, {
        ...param,
        value: param.value,
      });
    } else {
      return getEffectedGeneric(effect, param);
    }
  } else {
    return getEffectedNoValue(effect, param);
  }
}

function getEffectedNumber(effect: NumberEffect, param: StatusNumber) {
  switch (effect.type) {
    case "inc":
      return {
        ...param,
        value: param.value + effect.value,
      };
    case "dec":
      return {
        ...param,
        value: param.value - effect.value,
      };
    default:
      return effect.type;
  }
}

function getEffectedGeneric(effect: GenericEffect, param: StatusParam) {
  switch (effect.type) {
    case "set":
      return {
        ...param,
        value: effect.value,
      };
    default:
      return effect.type;
  }
}

function getEffectedNoValue(effect: NoValueEffect, param: StatusParam) {
  switch (effect.type) {
    case "hide":
      return {
        ...param,
        isHidden: true,
      };
    case "show":
      return {
        ...param,
        isHidden: false,
      };
    default:
      return effect.type;
  }
}
</script>

<style scoped lang="scss">
.quest {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  padding: var(--space-2);

  display: grid;
  grid-template-areas:
    "desc picture"
    "actions status";
  grid-template-rows: 60% 40%;
  grid-template-columns: 65% 35%;
  grid-gap: var(--space-1);

  background-color: var(--color-dark);

  &__desc {
    grid-area: desc;
  }
  &__picture {
    grid-area: picture;
  }
  &__actions {
    grid-area: actions;
  }
  &__status {
    grid-area: status;
  }
}
</style>
