'use client'

import React from 'react'
import {
  Control,
  FieldArrayPath,
  FieldArrayWithId,
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayPrepend,
  UseFieldArrayRemove,
  useFieldArray,
} from 'react-hook-form'

export const FieldArray = <
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues>,
>({
  control,
  name,
  renderHeader,
  renderFooter,
  renderRow,
  renderWrapper,
}: {
  control: Control<TFieldValues>
  name: TFieldArrayName
  renderHeader?(actions: {
    append: UseFieldArrayAppend<TFieldValues, TFieldArrayName>
    prepend: UseFieldArrayPrepend<TFieldValues, TFieldArrayName>
  }): React.ReactNode
  renderFooter?(actions: {
    append: UseFieldArrayAppend<TFieldValues, TFieldArrayName>
    prepend: UseFieldArrayPrepend<TFieldValues, TFieldArrayName>
  }): React.ReactNode
  renderRow(
    fieldConfig: FieldArrayWithId<TFieldValues, TFieldArrayName, 'id'>,
    index: number,
    actions: { remove: UseFieldArrayRemove },
  ): React.ReactNode
  renderWrapper?({
    children,
    fields,
  }: {
    children: React.ReactNode
    fields: FieldArrayWithId<TFieldValues, TFieldArrayName, 'id'>[]
  }): React.ReactNode
}): React.ReactNode => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name,
    },
  )

  const children = fields?.map((fieldConfig, index) => (
    <ul key={index} className="flex flex-col">
      {renderRow(fieldConfig, index, { remove })}
    </ul>
  ))

  return (
    <div className="flex flex-1 flex-col  gap-8 items-stretch">
      {renderHeader?.({ append, prepend })}
      {renderWrapper ? renderWrapper({ children, fields }) : children}
      {renderFooter?.({ append, prepend })}
    </div>
  )
}
