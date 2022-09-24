<template>
  <ThePanel class="picture">
    <img v-if="props.imageUrl" class="picture__img" :src="props.imageUrl" />
  </ThePanel>
</template>

<script lang="ts">
export default {
  name: "PanelPicture",
};
</script>

<script setup lang="ts">
import ThePanel from "./ThePanel.vue";

const props = defineProps<{
  imageUrl: string | undefined | null;
}>();
</script>

<style scoped lang="scss">
.picture {
  width: 100%;
  height: 100%;
  background-color: var(--color-black);

  &__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
