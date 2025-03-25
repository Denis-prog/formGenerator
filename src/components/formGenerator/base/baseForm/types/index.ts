import type { ComponentInternalInstance } from 'vue'

export interface IRule {
  message: string
  validator(value: any): boolean
}

export interface IRulesObject {
  [field: string]: Array<IRule>
}

export interface IFormProps {
  autocomplete?: boolean
  model?: object | Array<object>
  rules?: IRulesObject
}

export interface IFormItemProps {
  field: string
  label?: string | null
  required?: boolean
  showErrorMessage?: boolean
  message?: string | null
}

export type AddControlType = (field: ComponentInternalInstance) => boolean

export type RemoveControlType = (field: ComponentInternalInstance) => boolean

export type ClearValidityType = () => void
