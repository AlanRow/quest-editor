<template>
  <ThePanel>
    <p class="description">{{ props.description }}</p>
  </ThePanel>
</template>

<script lang="ts">
export default {
  name: "PanelDescription",
};
</script>

<script setup lang="ts">
import ThePanel from "./ThePanel.vue";

const props = defineProps<{
  description: string;
}>();
</script>

<style scoped lang="scss">
.description {
  margin: 0;
  padding: 0 var(--space-1);
}
</style>
