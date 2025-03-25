<template>
  <select class="select" v-model="model">
    <option v-for="{ label, value, ...rest } in options" v-bind="rest" :value="value" :key="value">{{ label }}</option>
  </select>
</template>

<script setup lang='ts'>
import { type PropType } from 'vue';
import type { OptionType } from './types';


defineProps({
  options: {
    type: Array as PropType<Array<OptionType>>,
    default: () => []
  },
  modelValue: null,
})

const model = defineModel();
</script>

<style scoped>
.select {
  width: 100%;
}
</style>
