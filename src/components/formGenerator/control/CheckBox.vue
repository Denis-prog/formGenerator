<template>
  <div class='checkbox-group'>
    <div class="checkbox-item" v-for="(option, idx) in options" :key="option.value">
      <input class="checkbox-item__input" v-bind="$attrs" type="checkbox" :value="option.value" v-model="model"
        :id="getId(idx, option)" />
      <label class="checkbox-item__label" :for="getId(idx, option)">{{ option.label }}</label>
    </div>
  </div>

</template>

<script setup lang='ts'>
import type { PropType } from 'vue';
import type { OptionType } from './types';
import { isUndefined } from 'lodash'

defineOptions({
  inheritAttrs: false
})

defineProps({
  modelValue: [Array, Boolean],
  options: Array as PropType<Array<OptionType>>
})

const getId = (idx: number, option: OptionType) => {
  if(!isUndefined(option.id)) return option.id

  if(!isUndefined(option.value)) return option.value

  return idx;
}

const model = defineModel();
</script>

<style lang="scss" scoped>
.checkbox-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

.checkbox-item {
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-right: 10px;
  }

  &__input {
    margin-right: 5px;
  }
}
</style>
