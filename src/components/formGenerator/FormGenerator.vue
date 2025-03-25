<template>
  <BaseForm ref="formRef" :model="modelValue" :autocomplete :rules="rules">

    <Row v-for="(row, idx) in rows" :key="idx" :row="row" :rowIdx="`${idx}`" v-model="model">
      <template v-for="slotName in transitionSlots" #[slotName]="slotScope">
        <slot :name="slotName" v-bind="slotScope" />
      </template>
    </Row>

    <FormFooter @cancel="onCancel" @submit="onSubmit">
      <template #default="props">
        <slot name="footer" v-bind="props" />
      </template>
    </FormFooter>
  </BaseForm>
</template>

<script setup lang="ts">
import { BaseForm } from './base/baseForm';
import Row from './Row.vue'
import FormFooter from './formFooter/FormFooter.vue';
import type { IFormGenerator } from './types'
import type { IRulesObject } from './base/baseForm/types';
import { useSlots, ref, computed, type VNodeRef, } from 'vue';
import { cloneDeep } from 'lodash';

const props = withDefaults(defineProps<IFormGenerator<any>>(), {
  rows: () => ([]),
  modelValue: () => ({}),
});

const initialModel = cloneDeep(props.modelValue);

const formRef = ref<VNodeRef | null>(null);

const emits = defineEmits(['submit', 'cancel']);

const onSubmit = () => {
  emits('submit');
}

const model = defineModel();
const slots = useSlots();

const transitionSlots = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { footer, ...rest } = slots;

  return Object.keys(rest);
})

const rules = computed(() => {
  const rules: IRulesObject = {};

  props.rows.forEach((row) => {
    row.forEach((col) => {
      if (Array.isArray(col.validators)) {
        rules[col.modelKey] = col.validators;
      }
    })
  })

  return rules;

})


const onCancel = () => {
  model.value = cloneDeep(initialModel);
  formRef.value?.clearAllValidity();
  emits('cancel');
}

/* const rowsToModel = (rows: IFormGenerator['rows'] = []) => {
  const model = {};

  rows.forEach((row) => {
    row.forEach((col) => {
      model[col.modelKey] = col.initialValue ?? null;
    })
  })

  return model;
} */


/* const changeModel = (value, key) => {
  model.value[key] = value;
}
 */

const toExpose = computed(() => {
  return { ...formRef.value }
})

defineExpose({
  form: toExpose,
})
</script>

<style></style>
