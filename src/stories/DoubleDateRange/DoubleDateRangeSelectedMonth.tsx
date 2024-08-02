import { useDoubleDateRangeContext } from './DoubleDateRangeMain'

interface DoubleDateRangeSelectedMonthProps {
  className?: string
}

export default function DoubleDateRangeSelectedMonth({
  className,
}: DoubleDateRangeSelectedMonthProps) {
  const { selectedMonth } = useDoubleDateRangeContext()

  return <p className={className}>{selectedMonth}</p>
}
