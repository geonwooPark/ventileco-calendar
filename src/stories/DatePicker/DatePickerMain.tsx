import dayjs from 'dayjs'
import {
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
  useCallback,
  useMemo,
} from 'react'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import DatePickerSelectedMonth from './DatePickerSelectedMonth'
import DatePickerDate from './DatePickerDate'
import DatePickerNextMonth from './DatePickerNextMonth'
import DatePickerNextYear from './DatePickerNextYear'
import DatePickerPrevMonth from './DatePickerPrevMonth'
import DatePickerPrevYear from './DatePickerPrevYear'
import { _createContext } from '../../utils/_createContext'
import { useCalendar } from '../../hooks/useCalendar'

dayjs.extend(customParseFormat)

interface DatePickerMainProps {
  /** 현재 선택된 날짜를 설정 */
  selectedDate: string
  /** 날짜가 표시되는 포맷을 설정 */
  format?: string
  /** 달을 표시하는 부분의 포맷을 설정 */
  monthFormat?: string
  /** 날짜의 상태를 변경하는 함수를 설정 */
  onDateChange: (date: string) => void
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
  onClick: (date: dayjs.Dayjs) => void
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
  const {
    selectedMonth,
    days,
    onPrevMonthClick,
    onNextMonthClick,
    onPrevYearClick,
    onNextYearClick,
  } = useCalendar(monthFormat)

  const onClick = useCallback((date: dayjs.Dayjs) => {
    const selectedDate = dayjs(date).format(format)
    onDateChange(selectedDate)
  }, [])

  const providerValue = useMemo(
    () => ({
      currentDate: dayjs(selectedDate),
      selectedMonth,
      days,
      monthFormat,
      onPrevMonthClick,
      onNextMonthClick,
      onPrevYearClick,
      onNextYearClick,
      onClick,
    }),
    [selectedDate, selectedMonth, days, monthFormat],
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
