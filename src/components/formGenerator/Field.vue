<template>
  <div class="col">
    <BaseFormItem :field="modelKey" :label>
      <Control v-bind="$attrs" :modelValue="model[modelKey]" @update:modelValue="onInput" :controlType>
        <template v-for="slotName in Object.keys($slots)" #[slotName]="slotScope">
          <slot :name="slotName" v-bind="slotScope" />
        </template>
      </Control>
    </BaseFormItem>
  </div>

</template>

<script setup lang="ts">

import { type PropType } from 'vue';
import { type IField } from './types'
import { BaseFormItem } from './base/baseForm';
import Control from './control/Control.vue';

const model = defineModel<Record<string, any>>({ required: true });

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  idx: {
    type: String as PropType<IField['idx']>,
    required: true
  },
  label: String,
  modelValue: {
    type: Object,
    required: true,
  },
  modelKey: {
    type: String as PropType<IField['idx']>,
    required: true,
  },
  controlType: {
    type: String as PropType<IField['controlType']>,
    required: true,
  }
});


const onInput = (e: Event) => {
  model.value[props.modelKey] = e;
}

</script>

<style lang="scss" scoped>
.col {
  width: 100%;

  &:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
