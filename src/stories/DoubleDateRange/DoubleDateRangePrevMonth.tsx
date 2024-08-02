import { PropsWithChildren } from 'react'
import { useDoubleDateRangeContext } from './DoubleDateRangeMain'

interface DoubleDateRangePrevMonthProps {
  className?: string
}

export default function DoubleDateRangePrevMonth({
  children,
  className,
}: PropsWithChildren<DoubleDateRangePrevMonthProps>) {
  const { onPrevMonthClick } = useDoubleDateRangeContext()

  return (
    <button onClick={onPrevMonthClick} className={className}>
      {children}
    </button>
  )
}
