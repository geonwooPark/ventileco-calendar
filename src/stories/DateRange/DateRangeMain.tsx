import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween'
import {
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
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
  onRangeChange?: ({
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
  onDateClick: (date: dayjs.Dayjs) => void
}

export const [useDateRangeContext, DateRangeProvider] =
  _createContext<DateRangeState>()

function DateRangeMain(
  {
    children,
    format = 'YYYY-MM-DD',
    monthFormat = 'MMM YYYY',
    ...props
  }: PropsWithChildren<DateRangeMainProps>,
  forwardRef: ForwardedRef<HTMLDivElement>,
) {
  const { startDate, endDate, onRangeChange } = props
  const {
    selectedMonth,
    days,
    onPrevMonthClick,
    onNextMonthClick,
    onPrevYearClick,
    onNextYearClick,
  } = useCalendar(monthFormat)

  const [firstSelectedDate, setFirstSelectedDate] = useState<dayjs.Dayjs>(
    dayjs(startDate),
  )
  const [secondSelectedDate, setSecondSelectedDate] = useState<dayjs.Dayjs>(
    dayjs(endDate),
  )
  const [isFirstTurn, setIsFirstTurn] = useState(true)

  const onDateClick = useCallback(
    (date: dayjs.Dayjs) => {
      if (isFirstTurn) {
        setFirstSelectedDate(date)
        setIsFirstTurn(false)
      } else {
        setSecondSelectedDate(date)
        setIsFirstTurn(true)
      }
    },
    [isFirstTurn],
  )

  useEffect(() => {
    if (!onRangeChange) return

    const orderCheck =
      firstSelectedDate.isBefore(secondSelectedDate) ||
      firstSelectedDate.isSame(secondSelectedDate)
    const startDate = firstSelectedDate.format(format)
    const endDate = secondSelectedDate.format(format)

    onRangeChange({
      startDate: orderCheck ? startDate : endDate,
      endDate: orderCheck ? endDate : startDate,
    })

    if (!orderCheck) {
      setIsFirstTurn((prev) => !prev)
      setFirstSelectedDate(secondSelectedDate)
      setSecondSelectedDate(firstSelectedDate)
    }
  }, [firstSelectedDate, secondSelectedDate])

  const providerValue = useMemo(
    () => ({
      firstSelectedDate,
      secondSelectedDate,
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
      firstSelectedDate,
      secondSelectedDate,
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
