import { useDateRangeContext } from './DateRangeMain'

interface DateRangeSelectedMonthProps {
  className?: string
}

export default function DateRangeSelectedMonth({
  className,
}: DateRangeSelectedMonthProps) {
  const { selectedMonth } = useDateRangeContext()

  return <p className={className}>{selectedMonth}</p>
}
