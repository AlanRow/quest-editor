<template>
  <ThePanel>
    <ul v-if="hasVisibleParams">
      <li v-for="param in visibleParamsList" :key="param.key">
        {{ param.name }}: {{ param.value }}
      </li>
    </ul>
    <span v-else> Нет видимых параметров </span>
  </ThePanel>
</template>

<script lang="ts">
export default {
  name: "PanelStatus",
};
</script>

<script setup lang="ts">
import type { Status } from "@/types/Status";

import { computed } from "vue";
import ThePanel from "./ThePanel.vue";

const props = defineProps<{
  status: Status;
}>();

const paramsList = computed(() => {
  const list = [];
  for (const key in props.status) {
    const value = props.status[key];
    list.push({ ...value, key: key });
  }
  return list;
});
const visibleParamsList = computed(() =>
  paramsList.value.filter(({ isHidden }) => !isHidden)
);
const hasVisibleParams = computed(() => visibleParamsList.value.length > 0);
</script>
