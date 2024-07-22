import { PropsWithChildren } from 'react'
import { useDateRangeContext } from './DateRangeMain'

interface DateRangePrevMonthProps {
  className?: string
}

export default function DateRangePrevMonth({
  children,
  className,
}: PropsWithChildren<DateRangePrevMonthProps>) {
  const { onPrevMonthClick } = useDateRangeContext()

  return (
    <button onClick={onPrevMonthClick} className={className}>
      {children}
    </button>
  )
}
