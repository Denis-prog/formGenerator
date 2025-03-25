<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { paths } from './router/paths';

</script>

<template>
  <div class="header">
    <nav class="nav">
      <RouterLink class="nav-item" v-for="{ path, label } in paths" :to="path" :key="path">
        <span class="">{{ label }}</span>
      </RouterLink>
    </nav>
  </div>
  <div class="body">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
@use './styles/variables/variables' as style;

.header {
  margin-bottom: 20px;
}

.body {
  padding: 0 15px;
}

.nav {
  display: flex;
  font-size: 20px;
  padding: 15px;
  border: style.$base-border;
}

.nav-item {
  color: #11cedb;
  text-decoration: none;

  &:not(:last-child) {
    margin-right: 30px;
  }

  &.router-link-exact-active {
    color: #0b82ad;
  }
}
</style>
