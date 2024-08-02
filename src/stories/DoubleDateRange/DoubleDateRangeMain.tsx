import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween'
import { useCalendar } from '../../hooks/useCalendar'
import {
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
  useCallback,
  useMemo,
} from 'react'
import { _createContext } from '../../utils/_createContext'
import DoubleDateRangeDate from './DoubleDateRangeDate'
import DoubleDateRangeSelectedMonth from './DoubleDateRangeSelectedMonth'
import DoubleDateRangeNextMonth from './DoubleDateRangeNextMonth'
import DoubleDateRangePrevMonth from './DoubleDateRangePrevMonth'
import DoubleDateRangeNextYear from './DoubleDateRangeNextYear'
import DoubleDateRangePrevYear from './DoubleDateRangePrevYear'

dayjs.extend(customParseFormat)
dayjs.extend(isBetween)

interface DoubleDateRangeMainProps {
  /** 날짜가 표시되는 포맷을 설정 */
  format?: string
  /** 날짜 범위의 시작 날짜를 설정 */
  startDate: string
  /** 날짜 범위의 끝 날짜를 설정 */
  endDate: string
  /** 달을 표시하는 부분의 포맷을 설정 */
  monthFormat?: string
  /** 날짜의 상태를 변경하는 함수를 설정 */
  onRangeChange: (date: string) => void
}

type DoubleDateRangeState = {
  firstSelectedDate: dayjs.Dayjs
  secondSelectedDate: dayjs.Dayjs | null
  selectedMonth: string
  days: dayjs.Dayjs[]
  monthFormat?: string
  onPrevMonthClick: () => void
  onNextMonthClick: () => void
  onPrevYearClick: () => void
  onNextYearClick: () => void
  onClick: (date: dayjs.Dayjs) => void
}

export const [useDoubleDateRangeContext, DoubleDateRangeProvider] =
  _createContext<DoubleDateRangeState>()

function DoubleDateRangeMain(
  {
    children,
    startDate,
    endDate,
    format = 'YYYY/MM/DD',
    monthFormat = 'YYYY MMM',
    onRangeChange,
  }: PropsWithChildren<DoubleDateRangeMainProps>,
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
    onRangeChange(selectedDate)
  }, [])

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
    <DoubleDateRangeProvider value={providerValue}>
      <div ref={forwardRef}>{children}</div>
    </DoubleDateRangeProvider>
  )
}

const DoubleDateRange = Object.assign(forwardRef(DoubleDateRangeMain), {
  SelectedMonth: DoubleDateRangeSelectedMonth,
  Date: DoubleDateRangeDate,
  NextMonth: DoubleDateRangeNextMonth,
  PrevMonth: DoubleDateRangePrevMonth,
  NextYear: DoubleDateRangeNextYear,
  PrevYear: DoubleDateRangePrevYear,
})

export default DoubleDateRange
