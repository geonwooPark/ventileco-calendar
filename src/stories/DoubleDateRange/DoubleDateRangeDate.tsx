import dayjs from 'dayjs'
import { useDoubleDateRangeContext } from './DoubleDateRangeMain'

interface DoubleDateRangeDateProps {
  children: ({
    date,
    isFirstSelected,
    isSecondSelected,
    isBetween,
    isOtherMonth,
  }: {
    date: dayjs.Dayjs
    isFirstSelected: boolean
    isSecondSelected?: boolean
    isBetween: boolean
    isOtherMonth: boolean
  }) => React.ReactNode
}

export default function DoubleDateRangeDate({
  children,
}: DoubleDateRangeDateProps) {
  const {
    firstSelectedDate,
    secondSelectedDate,
    monthFormat,
    selectedMonth,
    days,
    onClick,
  } = useDoubleDateRangeContext()

  return (
    <>
      {days.map((date, idx) => (
        <button key={idx} onClick={() => onClick(date)}>
          {children({
            date,
            isFirstSelected: firstSelectedDate.isSame(date),
            isSecondSelected: secondSelectedDate?.isSame(date),
            isBetween:
              firstSelectedDate.isBefore(secondSelectedDate) &&
              date.isBetween(
                firstSelectedDate,
                secondSelectedDate,
                'day',
                '[]',
              ),
            isOtherMonth:
              dayjs(selectedMonth, monthFormat).month() !== date.month(),
          })}
        </button>
      ))}
    </>
  )
}
