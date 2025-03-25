<template>
  <Component @focusin="onFocus" v-if="!hasSlot" v-bind="$attrs" :is="controlType" v-model="model" />
  <slot v-else :name="slotName" :value="modelValue" v-bind="$attrs" :changeControlValue="changeControlValue"
    :clearValidateIndicator="clearValidateIndicator" />
</template>


<script setup lang="ts">
import { computed, inject, useSlots, type DefineSetupFnComponent, type PropType } from 'vue';
import Select from './Select.vue';
import Input from './Input.vue';
import { ControlTypeEnum, type IField } from '../types';
import CheckBox from './CheckBox.vue';
import TextArea from './TextArea.vue';
import { ProviderClearValidity } from '@/components/formGenerator/base/baseForm/injectKey';

const contolMap: Record<ControlTypeEnum, DefineSetupFnComponent<any>> = {
  select: Select,
  input: Input,
  checkbox: CheckBox,
  textArea: TextArea,
};

defineOptions({
  inheritAttrs: false
})

const clearValidateIndicator = inject(ProviderClearValidity);

const slots = useSlots();

const emits = defineEmits(['update:modelValue']);

const props = defineProps({
  controlType: {
    type: String as PropType<IField['controlType']>,
    required: true,
  },
  slotName: String,
  modelValue: null,
});

const onFocus = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  clearValidateIndicator && clearValidateIndicator();
}

const model = defineModel();

const changeControlValue = <T>(v: T) => {
  emits('update:modelValue', v)
}

const hasSlot = computed(() => typeof props.slotName === 'string' && !!slots[props.slotName])

const controlType = computed(() => {
  const list = Object.values(ControlTypeEnum);

  if (list.indexOf(props.controlType)) {

    return contolMap[props.controlType];
  }

  return contolMap[ControlTypeEnum.input];
})

</script>
