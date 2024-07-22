import dayjs from 'dayjs'
import {
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import DatePickerSelectedMonth from './DatePickerSelectedMonth'
import DatePickerDate from './DatePickerDate'
import DatePickerNextMonth from './DatePickerNextMonth'
import DatePickerNextYear from './DatePickerNextYear'
import DatePickerPrevMonth from './DatePickerPrevMonth'
import DatePickerPrevYear from './DatePickerPrevYear'
import { _createContext } from '../../utils/_createContext'

dayjs.extend(customParseFormat)

interface DatePickerMainProps {
  selectedDate: string
  format?: string
  monthFormat?: string
  onDateChange?: (date: string) => void
}

type DatePickerState = {
  currentDate: dayjs.Dayjs
  selectedMonth: string
  days: dayjs.Dayjs[]
  monthFormat?: string
  onPrevMonthClick: () => void
  onNextMonthClick: () => void
  onPrevYearClick: () => void
  onNextYearClick: () => void
  onDateClick: (date: dayjs.Dayjs) => void
}

export const [useDatePickerContext, DatePickerProvider] =
  _createContext<DatePickerState>()

function DatePickerMain(
  {
    children,
    selectedDate,
    format = 'YYYY-MM-DD',
    monthFormat = 'MMM YYYY',
    onDateChange,
  }: PropsWithChildren<DatePickerMainProps>,
  forwardRef: ForwardedRef<HTMLDivElement>,
) {
  const today = dayjs()

  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(
    dayjs(selectedDate, format),
  )
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

  const onDateClick = useCallback((date: dayjs.Dayjs) => {
    setCurrentDate(date)
  }, [])

  useEffect(() => {
    if (!onDateChange) return

    onDateChange(currentDate.format(format))
  }, [currentDate])

  const providerValue = useMemo(
    () => ({
      currentDate,
      selectedMonth,
      days,
      monthFormat,
      onPrevMonthClick,
      onNextMonthClick,
      onPrevYearClick,
      onNextYearClick,
      onDateClick,
    }),
    [
      currentDate,
      selectedMonth,
      days,
      monthFormat,
      onPrevMonthClick,
      onNextMonthClick,
      onPrevYearClick,
      onNextYearClick,
      onDateClick,
    ],
  )

  return (
    <DatePickerProvider value={providerValue}>
      <div ref={forwardRef}>{children}</div>
    </DatePickerProvider>
  )
}

const DatePicker = Object.assign(forwardRef(DatePickerMain), {
  SelectedMonth: DatePickerSelectedMonth,
  Date: DatePickerDate,
  NextMonth: DatePickerNextMonth,
  PrevMonth: DatePickerPrevMonth,
  NextYear: DatePickerNextYear,
  PrevYear: DatePickerPrevYear,
})

export default DatePicker
