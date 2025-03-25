<template>
  <input class="input" v-model="model">
</template>

<script setup lang='ts'>

defineProps({
  modelValue: {
    default: '',
    type: [String, Number],
  }
})

const model = defineModel<string | number>();
</script>

<style scoped>
.input {
  width: 100%;
}
</style>
