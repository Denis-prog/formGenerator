import type { IFormProps } from './base/baseForm/types'
import type { OptionType } from './control/types'
import type { IRule } from './base/baseForm/types'

export enum ControlTypeEnum {
  input = 'input',
  textArea = 'textArea',
  select = 'select',
  checkbox = 'checkbox',
}

export interface IField extends Partial<HTMLInputElement> {
  controlType: ControlTypeEnum
  idx: string
  modelKey: string
  options?: Array<OptionType>
  slotName?: string
  validators?: Array<IRule>
}

export type RowType = Array<IField>

export type ExternalFieldType = Omit<IField, 'idx'>

export interface IRowType {
  rowIdx: string
  row?: Array<ExternalFieldType>
}

export type ExternalRowType = Array<ExternalFieldType>

export interface IFormGenerator<T extends object> extends Omit<IFormProps, 'model'> {
  rows?: Array<ExternalRowType>
  modelValue?: T
}
