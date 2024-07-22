import { useDatePickerContext } from './DatePickerMain'

interface DatePickerSelectedMonthProps {
  className?: string
}

export default function DatePickerSelectedMonth({
  className,
}: DatePickerSelectedMonthProps) {
  const { selectedMonth } = useDatePickerContext()

  return <p className={className}>{selectedMonth}</p>
}
