<script setup lang="ts">
import FormGenerator from '@/components/formGenerator/FormGenerator.vue';
import { ref, type VNodeRef } from 'vue';
import { ControlTypeEnum } from '@/components/formGenerator/types';
import { required } from '@/validators/required';
import { cloneDeep } from 'lodash';

type UserInfoType = {
  firstName: string,
  lastName: string,
  isMarried: boolean,
  comment: string,
  countryId: number | null,
}

const fieldMap: Record<keyof UserInfoType, string> = {
  firstName: 'Имя',
  lastName: 'Фамилия',
  isMarried: 'Состоит в браке',
  comment: 'Доп информация',
  countryId: 'Страна',
}

const formRef = ref<VNodeRef | null>(null);

const countries = [{
  value: 1,
  label: 'Russia'
}, {
  value: 2,
  label: 'USA'
}]



const rows = ref(
  [[
    {
      controlType: ControlTypeEnum.input,
      modelKey: 'firstName',
      label: fieldMap.firstName,
      validators: [required()],
    },
  ],
  [
    {
      controlType: ControlTypeEnum.input,
      modelKey: 'lastName',
      label: fieldMap.lastName,
      validators: [required()],
    },

  ],
  [
    {
      controlType: ControlTypeEnum.checkbox,
      modelKey: 'isMarried',
      label: fieldMap.isMarried,
      options: [{ label: 'да/нет' }]
    },

  ],
  [
    {
      controlType: ControlTypeEnum.textArea,
      modelKey: 'comment',
      label: fieldMap.comment,
    },
  ],
  [
    {
      controlType: ControlTypeEnum.select,
      modelKey: 'countryId',
      label: fieldMap.countryId,
      validators: [required()],
      options: countries,
    }
  ]
  ]
);

const model = ref<UserInfoType>({
  firstName: '',
  lastName: '',
  isMarried: false,
  comment: '',
  countryId: null,
});


const userInfo = ref<UserInfoType | null>(null);

const onSubmit = () => {
  formRef.value?.form.validate()
    .then(() => {
      userInfo.value = cloneDeep(model.value);
    }).catch(() => {
      console.log('ошибка валидации');
    })
}

const getUserInfo = (param: keyof UserInfoType, model: UserInfoType) => {
  if (param === 'countryId') {
    return countries.find(({ value }) => value === model[param])?.label
  }

  if (param === 'isMarried') {
    return model[param] ? 'в браке' : 'холост'
  }

  return model[param]
}

</script>

<template>
  <h1>Base</h1>
  <FormGenerator ref="formRef" :rows="rows" v-model="model" @submit="onSubmit" />
  <div v-if="userInfo">
    <h2>User info</h2>
    <div v-for="userParam in Object.keys(userInfo)" :key="userParam">
      <span>{{ fieldMap[userParam as keyof UserInfoType] }}</span>:
      <span>{{ getUserInfo(userParam as keyof UserInfoType, userInfo) }}</span>
    </div>
  </div>
</template>

<style scoped></style>
