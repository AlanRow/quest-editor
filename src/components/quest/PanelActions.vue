<template>
  <ThePanel>
    <ul class="actions-list">
      <li
        v-for="action in props.actionsList"
        :key="action.id"
        class="actions-list__item action"
        @click="emit('select', action)"
      >
        {{ action.name }}
      </li>
    </ul>
  </ThePanel>
</template>

<script lang="ts">
export default {
  name: "PanelActions",
};
</script>

<script setup lang="ts">
import type { Action } from "@/types/Action";

import ThePanel from "./ThePanel.vue";

const props = defineProps<{
  actionsList: Action[];
}>();

const emit = defineEmits<{
  (event: "select", action: Action): void;
}>();
</script>

<style scoped lang="scss">
.actions-list {
  list-style: none;
  padding: 0;
  margin: 0;

  font-size: var(--font-size-big);

  // &__item {
  //   &:not(:last-child) {
  //     margin-bottom: var(--space-0);
  //   }
  // }
}
.action {
  padding: var(--space-0) var(--space-1);

  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: var(--color-light);
  }
}
</style>
