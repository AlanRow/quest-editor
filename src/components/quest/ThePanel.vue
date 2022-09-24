<template>
  <section class="panel">
    <slot></slot>
  </section>
</template>

<style scoped lang="scss">
.panel {
  box-sizing: border-box;
  padding: var(--space-1);
  background-color: var(--color-lightest);
  border: var(--border-normal) solid var(--color-black);
  border-radius: var(--border-radius-smooth);
}
</style>
