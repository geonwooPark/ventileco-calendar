import dayjs from 'dayjs'
import { useDatePickerContext } from './DatePickerMain'

interface DatePickerDateProps {
  children: ({
    date,
    isSelected,
    isOtherMonth,
  }: {
    date: dayjs.Dayjs
    isSelected: boolean
    isOtherMonth: boolean
  }) => React.ReactNode
}

export default function DatePickerDate({ children }: DatePickerDateProps) {
  const { currentDate, monthFormat, selectedMonth, days, onDateClick } =
    useDatePickerContext()

  return (
    <>
      {days.map((date, idx) => (
        <button key={idx} onClick={() => onDateClick(date)}>
          {children({
            date,
            isSelected: currentDate.isSame(date),
            isOtherMonth:
              dayjs(selectedMonth, monthFormat).month() !== date.month(),
          })}
        </button>
      ))}
    </>
  )
}
