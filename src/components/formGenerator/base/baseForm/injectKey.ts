import type { InjectionKey } from 'vue'
import type { AddControlType, RemoveControlType, ClearValidityType } from './types'

export const ProviderAddControl = <InjectionKey<AddControlType>>Symbol()
export const ProviderRemoveFormControl = <InjectionKey<RemoveControlType>>Symbol()
export const ProviderClearValidity = <InjectionKey<ClearValidityType>>Symbol()
