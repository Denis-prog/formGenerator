<script setup lang="ts">
import FormGenerator from '@/components/formGenerator/FormGenerator.vue';
import { ref, type VNodeRef } from 'vue';
import { ControlTypeEnum } from '@/components/formGenerator/types';
import { required } from '@/validators/required';
import { cloneDeep } from 'lodash';
import Select from '@/components/formGenerator/control/Select.vue';
import Input from '@/components/formGenerator/control/Input.vue';

const responsibleList = [
  { value: 1, label: 'Иванов' },
  { value: 2, label: 'Петров' },
  { value: 3, label: 'Сидоров' },
]

const objectList = [
  { value: 1, label: 'Астра' },
  { value: 2, label: 'Блюхера' },
  { value: 3, label: 'Озинки' },
]


type OrderInfoType = {
  responsibleIds: Array<number>,
  customer: string,
  executor: string,
  objectIds: Array<number>,
}

const fieldMap: Record<keyof OrderInfoType, string> = {
  responsibleIds: 'Ответственные',
  customer: 'ФИО заказчика',
  executor: 'ФИО исполнителя',
  objectIds: 'Объект',
}

const formRef = ref<VNodeRef | null>(null);

const rows = ref(
  [[
    {
      controlType: ControlTypeEnum.checkbox,
      modelKey: 'responsibleIds',
      label: fieldMap.responsibleIds,
      validators: [required()],
      options: responsibleList,
    },
  ],
  [
    {
      controlType: ControlTypeEnum.input,
      modelKey: 'customer',
      label: fieldMap.customer,
      slotName: 'select',
      validators: [required()],
    },
    {
      controlType: ControlTypeEnum.input,
      modelKey: 'executor',
      label: fieldMap.executor,
      validators: [required()],
    },
  ],
  [
    {
      controlType: ControlTypeEnum.select,
      modelKey: 'objectIds',
      label: fieldMap.objectIds,
      validators: [required()],
      options: objectList,
      slotName: 'customField',
      multiple: true,
    },
  ]
  ]
);

const model = ref<OrderInfoType>({
  responsibleIds: [],
  customer: '',
  executor: '',
  objectIds: [1, 2],
});


const orderInfo = ref<OrderInfoType | null>(null);

const onSubmit = () => {
  formRef.value?.form.validate()
    .then(() => {
      orderInfo.value = cloneDeep(model.value);
    }).catch(() => {
      console.log('ошибка валидации');

    })
}

const getParamString = <T extends { value: K, label: string }, K>(allData: Array<T>, selectedValues: Array<K>) => {
  const list = allData.filter(({ value }) => selectedValues.includes(value));

  const res = list.reduce((acc, { label }) => {
    acc += `${label}, `;

    return acc;
  }, '')

  return res.slice(0, -2)
}

const getOrderInfo = (param: keyof OrderInfoType, model: OrderInfoType) => {
  if (param === 'responsibleIds') {
    return getParamString(responsibleList, model[param]);
  }

  if (param === 'objectIds') {
    return getParamString(objectList, model[param]);
  }

  return model[param]
}

const getObjectount = (objIds: Array<number>) => {
  return Array.isArray(objIds) && objIds.length ? `Выбрано объектов ${objIds.length}` : 'Объекты не выбраны'
}

</script>

<template>
  <h1>Advanced</h1>
  <h2>Используется кастомизация футера и одного из контролов формы</h2>

  <FormGenerator ref="formRef" :rows="rows" v-model="model" @submit="onSubmit">
    <template #footer="{ onSubmit, onCancel }">

      <button class="button" @click="onSubmit">Кастомная кнопка сабмита</button>
      <button class="button" @click="onCancel">Кастомная кнопка ресета</button>

    </template>
    <template #customField="{ changeControlValue, clearValidateIndicator, value, ...rest }">
      <div>
        <div>
          <Select @focus="clearValidateIndicator" v-bind="rest" :modelValue="value"
            @update:modelValue="changeControlValue" />
        </div>
        <div>
          <Input disabled :modelValue="getObjectount(value)" />
        </div>
      </div>
    </template>
  </FormGenerator>

  <div v-if="orderInfo">

    <h2>Order info</h2>

    <div v-for="userParam in Object.keys(orderInfo)" :key="userParam">
      <span>{{ fieldMap[userParam as keyof OrderInfoType] }}</span>:
      <span>{{ getOrderInfo(userParam as keyof OrderInfoType, orderInfo) }}</span>
    </div>
  </div>
</template>

<style scoped></style>
