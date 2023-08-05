import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { CardProps } from './card.types'

export function Card(props: PropsWithChildren<CardProps>) {
  const { className, children, ...rest } = props
  return (
    <div
      {...rest}
      className={twMerge(
        'p-4 card bg-base-100 dark:bg-base-200 shadow-lg',
        className,
      )}
    >
      {children}
    </div>
  )
}
