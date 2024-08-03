import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween'
import {
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
} from 'react'
import { _createContext } from '../../utils/_createContext'
import DateRangeSelectedMonth from './DateRangeSelectedMonth'
import DateRangeDate from './DateRangeDate'
import DateRangeNextMonth from './DateRangeNextMonth'
import DateRangePrevMonth from './DateRangePrevMonth'
import DateRangeNextYear from './DateRangeNextYear'
import DateRangePrevYear from './DateRangePrevYear'
import { useCalendar } from '../../hooks/useCalendar'

dayjs.extend(customParseFormat)
dayjs.extend(isBetween)

interface DateRangeMainProps {
  /** 날짜가 표시되는 포맷을 설정 */
  format?: string
  /** 날짜 범위의 시작 날짜를 설정 */
  startDate: string
  /** 날짜 범위의 끝 날짜를 설정 */
  endDate: string
  /** 달을 표시하는 부분의 포맷을 설정 */
  monthFormat?: string
  /** 날짜의 상태를 변경하는 함수를 설정 */
  onRangeChange: ({
    startDate,
    endDate,
  }: {
    startDate: string
    endDate: string
  }) => void
}

type DateRangeState = {
  firstSelectedDate: dayjs.Dayjs
  secondSelectedDate: dayjs.Dayjs
  selectedMonth: string
  days: dayjs.Dayjs[]
  monthFormat?: string
  onPrevMonthClick: () => void
  onNextMonthClick: () => void
  onPrevYearClick: () => void
  onNextYearClick: () => void
  onClick: (date: dayjs.Dayjs) => void
}

export const [useDateRangeContext, DateRangeProvider] =
  _createContext<DateRangeState>()

function DateRangeMain(
  {
    children,
    startDate,
    endDate,
    format = 'YYYY-MM-DD',
    monthFormat = 'MMM YYYY',
    onRangeChange,
  }: PropsWithChildren<DateRangeMainProps>,
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
  const isFirstTurn = useRef<boolean>(true)

  const onClick = useCallback(
    (date: dayjs.Dayjs) => {
      const selectedDate = dayjs(date).format(format)

      if (isFirstTurn.current) {
        isFirstTurn.current = false
        onRangeChange({
          startDate: selectedDate,
          endDate: dayjs(endDate).format(format),
        })
      } else {
        isFirstTurn.current = true
        onRangeChange({
          startDate: dayjs(startDate).format(format),
          endDate: selectedDate,
        })
      }
    },
    [isFirstTurn.current],
  )
  const providerValue = useMemo(
    () => ({
      firstSelectedDate: dayjs(startDate),
      secondSelectedDate: dayjs(endDate),
      selectedMonth,
      days,
      monthFormat,
      onPrevMonthClick,
      onNextMonthClick,
      onPrevYearClick,
      onNextYearClick,
      onClick,
    }),
    [startDate, endDate, selectedMonth, days, monthFormat],
  )

  return (
    <DateRangeProvider value={providerValue}>
      <div ref={forwardRef}>{children}</div>
    </DateRangeProvider>
  )
}

const DateRange = Object.assign(forwardRef(DateRangeMain), {
  SelectedMonth: DateRangeSelectedMonth,
  Date: DateRangeDate,
  NextMonth: DateRangeNextMonth,
  PrevMonth: DateRangePrevMonth,
  NextYear: DateRangeNextYear,
  PrevYear: DateRangePrevYear,
})

export default DateRange
