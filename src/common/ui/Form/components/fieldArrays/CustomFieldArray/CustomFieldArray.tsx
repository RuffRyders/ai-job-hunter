'use client'

import React from 'react'
import {
  ArrayPath,
  Control,
  FieldArrayWithId,
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayPrepend,
  UseFieldArrayRemove,
  useFieldArray,
} from 'react-hook-form'

export const CustomFieldArray = <FormData extends FieldValues>({
  control,
  name,
  renderHeader,
  renderFooter,
  renderRow,
  renderWrapper,
}: {
  control: Control<FormData>
  name: ArrayPath<FormData>
  renderHeader?(actions: {
    append: UseFieldArrayAppend<FormData, ArrayPath<FormData>>
    prepend: UseFieldArrayPrepend<FormData, ArrayPath<FormData>>
  }): React.ReactNode
  renderFooter?(actions: {
    append: UseFieldArrayAppend<FormData, ArrayPath<FormData>>
    prepend: UseFieldArrayPrepend<FormData, ArrayPath<FormData>>
  }): React.ReactNode
  renderRow(
    fieldConfig: FieldArrayWithId<FormData, ArrayPath<FormData>, 'id'>,
    index: number,
    actions: { remove: UseFieldArrayRemove },
  ): React.ReactNode
  renderWrapper?({
    children,
    fields,
  }: {
    children: React.ReactNode
    fields: FieldArrayWithId<FormData, ArrayPath<FormData>, 'id'>[]
  }): React.ReactNode
}): React.ReactNode => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormProvider)
      name, // unique name for your Field Array
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
