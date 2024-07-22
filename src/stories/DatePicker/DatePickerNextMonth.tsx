import { PropsWithChildren } from 'react'
import { useDatePickerContext } from './DatePickerMain'

interface DatePickerNextMonthProps {
  className?: string
}

export default function DatePickerNextMonth({
  children,
  className,
}: PropsWithChildren<DatePickerNextMonthProps>) {
  const { onNextMonthClick } = useDatePickerContext()

  return (
    <button onClick={onNextMonthClick} className={className}>
      {children}
    </button>
  )
}
