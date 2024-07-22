import { PropsWithChildren } from 'react'
import { useDateRangeContext } from './DateRangeMain'

interface DateRangeNextYearProps {
  className?: string
}

export default function DateRangeNextYear({
  children,
  className,
}: PropsWithChildren<DateRangeNextYearProps>) {
  const { onNextYearClick } = useDateRangeContext()

  return (
    <button onClick={onNextYearClick} className={className}>
      {children}
    </button>
  )
}
