<template>
  <div class='form-footer'>
    <slot :onSubmit="onSubmit" :onCancel="onCancel">
      <button class="button" type="button" @click="onSubmit">Сохранить</button>
      <button class="button" type="button" @click="onCancel">Очистить</button>
    </slot>
  </div>
</template>


<script setup lang="ts">
const emits = defineEmits(['submit', 'cancel']);

const onSubmit = () => {
  emits('submit')
}

const onCancel = () => {
  emits('cancel')
}

</script>

<style scoped lang="scss">
.form-footer {
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
}
</style>
