import { PropsWithChildren } from 'react'
import { useDoubleDateRangeContext } from './DoubleDateRangeMain'

interface DoubleDateRangeNextMonthProps {
  className?: string
}

export default function DoubleDateRangeNextMonth({
  children,
  className,
}: PropsWithChildren<DoubleDateRangeNextMonthProps>) {
  const { onNextMonthClick } = useDoubleDateRangeContext()

  return (
    <button onClick={onNextMonthClick} className={className}>
      {children}
    </button>
  )
}
