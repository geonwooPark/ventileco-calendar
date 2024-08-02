import { PropsWithChildren } from 'react'
import { useDoubleDateRangeContext } from './DoubleDateRangeMain'

interface DoubleDateRangePrevYearProps {
  className?: string
}

export default function DoubleDateRangePrevYear({
  children,
  className,
}: PropsWithChildren<DoubleDateRangePrevYearProps>) {
  const { onPrevYearClick } = useDoubleDateRangeContext()

  return (
    <button onClick={onPrevYearClick} className={className}>
      {children}
    </button>
  )
}
