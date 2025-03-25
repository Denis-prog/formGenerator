<template>
  <textarea v-model="model" />
</template>

<script setup lang='ts'>

defineProps({
  modelValue: [String, Number],
})

const model = defineModel<string | number>();
</script>
