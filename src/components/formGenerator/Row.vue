<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div class="row">
    <Field v-for="({ validators, ...col }, idx) in row" v-bind="col" :key="getKey(idx)" :idx="getKey(idx)"
      v-model="model">
      <template v-for="slotName in Object.keys($slots)" #[slotName]="slotScope">
        <slot :name="slotName" v-bind="slotScope" />
      </template>
    </Field>
  </div>
</template>

<script setup lang="ts">
import type { IRowType, } from './types';
import Field from './Field.vue';

const props = withDefaults(defineProps<IRowType>(), {
  row: () => ([]),
  modelValue: null,
});

const model = defineModel();

const getKey = (colIdx: number) => `${colIdx}_${props.rowIdx}`;

</script>

<style lang="scss" scoped>
.row {
  display: flex;
  overflow: auto;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
