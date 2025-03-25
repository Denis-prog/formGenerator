<template>
  <form ref="form" class="base-form" :autocomplete="htmlAutocomplete" novalidate @submit.prevent="submit">
    <slot />
  </form>
</template>

<script lang="ts" setup>
import {
  ref,
  provide,
  defineExpose,
  defineEmits,
  type ComponentInternalInstance,
} from 'vue'
import { get, has } from 'lodash'

import { computed } from 'vue'
import type { IFormProps, IRule, IFormItemProps } from './types'
import { ProviderAddControl, ProviderRemoveFormControl } from './injectKey'

const props = withDefaults(defineProps<IFormProps>(), {
  rules: Object,
  model: Object,
})

const emit = defineEmits(['submit'])

const submit = (e: Event) => {
  emit('submit', e)
}

const fields = ref<Array<ComponentInternalInstance>>([])

const htmlAutocomplete = computed(() => {
  return props.autocomplete ? 'on' : 'off'
})

const clearFieldsValidity = function (fieldToClear: string | string[]) {
  const _fields: { [key: string]: boolean } = (
    Array.isArray(fieldToClear) ? fieldToClear : [fieldToClear]
  ).reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: true,
    }),
    {},
  )

  fields.value
    .filter((item) => {
      const current = item.props as unknown as IFormItemProps

      return (
        _fields[current.field] &&
        has(props.rules, current.field)
      )
    })
    .forEach((item) => {
      item.exposed?.clearValidity()
    })
}

const clearAllValidity = function () {
  fields.value.forEach((field) => {
    field.exposed?.clearValidity()
  })
}

const addControl = function (field: ComponentInternalInstance) {
  if (field) {
    fields.value.push(field)
  }
  return false
}

provide(ProviderAddControl, addControl)

const validateSingleItem = function (formItem: ComponentInternalInstance) {
  const current = (formItem.props as unknown as IFormItemProps).field

  if (!props.model) return false

  if (!props.rules[current]) return false

  const invalid = (props.rules[current] || []).find(
    (rule: IRule) => !rule.validator(get(props.model, current)),
  )
  formItem.exposed?.setValidity(!invalid, invalid ? invalid.message : null)

  return !invalid
}

const removeControl = function (field: ComponentInternalInstance) {
  if (field) {
    fields.value.splice(fields.value.indexOf(field), 1)
  }

  return false
}

provide(ProviderRemoveFormControl, removeControl)

const validate = function () {
  return new Promise((resolve, reject) => {
    let formValid = true

    fields.value
      .filter((item) => {
        const currentField = (item.props as unknown as IFormItemProps).field

        return item.props.field && has(props.rules, currentField)
      })
      .forEach((item) => {
        const fieldValid = validateSingleItem(item)

        if (formValid && !fieldValid) {
          formValid = false
        }
      })

    console.log(formValid);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    formValid ? resolve(formValid) : reject(formValid)
  })
}

const validateFields = function (fieldsToValidate: string | string[]) {
  if (!props.model) return false

  const _fields: { [key: string]: boolean } = (
    Array.isArray(fieldsToValidate) ? fieldsToValidate : [fieldsToValidate]
  ).reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: true,
    }),
    {},
  )

  return new Promise((resolve, reject) => {
    let formValid = true

    fields.value
      .filter((item) => {
        const current = (item.props as unknown as IFormItemProps).field

        return _fields[current] && has(props.rules, current)
      })
      .forEach((item) => {
        const fieldValid = validateSingleItem(item)

        if (formValid && !fieldValid) {
          formValid = false
        }
      })

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    formValid ? resolve(formValid) : reject(formValid)
  })
}

defineExpose({
  validate,
  clearAllValidity,
  validateFields,
  clearFieldsValidity,
})
</script>

<style scoped lang="scss">
@use './baseForm.scss' as style;
</style>
