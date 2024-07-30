import dayjs from 'dayjs'
import { useCallback, useMemo, useState } from 'react'

export const useCalendar = (monthFormat?: string) => {
  const today = dayjs()

  const [selectedMonth, setSelectedMonth] = useState<string>(
    today.format(monthFormat),
  )

  const parsedMonth = useMemo(
    () => dayjs(selectedMonth, monthFormat),
    [selectedMonth, monthFormat],
  )

  const days = useMemo(() => {
    const startOfMonth = parsedMonth.startOf('month')
    const endOfMonth = parsedMonth.endOf('month')
    const startOfFirstWeek = startOfMonth.startOf('week')
    const endOfLastWeek = endOfMonth.endOf('week')

    const daysArray: dayjs.Dayjs[] = []
    for (
      let date = startOfFirstWeek;
      date.isBefore(endOfLastWeek) || date.isSame(endOfLastWeek);
      date = date.add(1, 'day')
    ) {
      daysArray.push(date)
    }
    return daysArray
  }, [parsedMonth])

  const onPrevMonthClick = useCallback(() => {
    setSelectedMonth((prev) =>
      dayjs(prev, monthFormat).add(-1, 'month').format(monthFormat),
    )
  }, [monthFormat])

  const onNextMonthClick = useCallback(() => {
    setSelectedMonth((prev) =>
      dayjs(prev, monthFormat).add(1, 'month').format(monthFormat),
    )
  }, [monthFormat])

  const onPrevYearClick = useCallback(() => {
    setSelectedMonth((prev) =>
      dayjs(prev, monthFormat).add(-1, 'year').format(monthFormat),
    )
  }, [monthFormat])

  const onNextYearClick = useCallback(() => {
    setSelectedMonth((prev) =>
      dayjs(prev, monthFormat).add(1, 'year').format(monthFormat),
    )
  }, [monthFormat])

  return {
    selectedMonth,
    days,
    onPrevMonthClick,
    onNextMonthClick,
    onPrevYearClick,
    onNextYearClick,
  }
}
