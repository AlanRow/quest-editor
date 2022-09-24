<template>
  <main class="quest">
    <PanelDescription :description="currentState.desc" class="quest__desc" />
    <PanelActions
      :actionsList="currentState.actions"
      class="quest__actions"
      @select="doAction"
    />
    <PanelPicture :imageUrl="currentState.picture" class="quest__picture" />
    <PanelStatus :status="status" />
    <!--<section class="quest__status panel"></section> -->
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { Action } from "@/types/Action";
import type { Status } from "@/types/Status";

import {
  isNumberEffect,
  isGenericEffect,
  type RestEffect,
} from "@/types/Effect";

import { BASE_LEVEL } from "./../../game";

import PanelDescription from "./PanelDescription.vue";
import PanelActions from "./PanelActions.vue";
import PanelPicture from "./PanelPicture.vue";
import PanelStatus from "./PanelStatus.vue";

const currentState = ref(BASE_LEVEL.start);
const status: Status = reactive(BASE_LEVEL.status);

function doAction(action: Action): void {
  currentState.value = action.next;

  for (const effect of action.effects) {
    const param = status[effect.param];

    if (!param) {
      console.error(`Parameter ${effect.param} does not exist`);
      return;
    }

    if (isNumberEffect(effect)) {
      if (typeof param.value === "string") {
        console.error(
          `Parameter ${effect.param} should be a number but it has type string`
        );
        return;
      }

      switch (effect.type) {
        case "inc":
          param.value += effect.value;
          break;
        case "dec":
          param.value -= effect.value;
          break;
        default:
          return effect.type;
      }
    } else if (isGenericEffect(effect)) {
      switch (effect.type) {
        case "set":
          param.value = effect.value;
          break;
        default:
          return effect.type;
      }
    } else {
      const restEffect = effect as RestEffect;
      switch (restEffect.type) {
        case "hide":
          param.isHidden = true;
          break;
        case "show":
          param.isHidden = false;
          break;
        default:
          return restEffect.type;
      }
    }
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
