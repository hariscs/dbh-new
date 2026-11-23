'use client'

import type { DefaultCellComponentProps } from 'payload'

type Props = { options: { label: string; value: string }[] }

export const LabelCell = (props: DefaultCellComponentProps) => {
  const { cellData } = props
  const { options } = props as unknown as Props
  return <span>{options.find((option) => option.value === cellData)?.label ?? String(cellData ?? '')}</span>
}
