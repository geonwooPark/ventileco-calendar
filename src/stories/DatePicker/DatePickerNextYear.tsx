import { PropsWithChildren } from 'react'
import { useDatePickerContext } from './DatePickerMain'

interface DatePickerNextYearProps {
  className?: string
}

export default function DatePickerNextYear({
  children,
  className,
}: PropsWithChildren<DatePickerNextYearProps>) {
  const { onNextYearClick } = useDatePickerContext()

  return (
    <button onClick={onNextYearClick} className={className}>
      {children}
    </button>
  )
}
