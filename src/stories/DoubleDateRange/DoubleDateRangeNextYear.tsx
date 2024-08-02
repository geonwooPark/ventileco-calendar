import { PropsWithChildren } from 'react'
import { useDoubleDateRangeContext } from './DoubleDateRangeMain'

interface DoubleDateRangeNextYearProps {
  className?: string
}

export default function DoubleDateRangeNextYear({
  children,
  className,
}: PropsWithChildren<DoubleDateRangeNextYearProps>) {
  const { onNextYearClick } = useDoubleDateRangeContext()

  return (
    <button onClick={onNextYearClick} className={className}>
      {children}
    </button>
  )
}
