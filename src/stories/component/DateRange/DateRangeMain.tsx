import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import {
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { _createContext } from "../../utils/_createContext";
import DateRangeSelectedMonth from "./DateRangeSelectedMonth";
import DateRangeDate from "./DateRangeDate";
import DateRangeNextMonth from "./DateRangeNextMonth";
import DateRangePrevMonth from "./DateRangePrevMonth";
import DateRangeNextYear from "./DateRangeNextYear";
import DateRangePrevYear from "./DateRangePrevYear";

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

interface DateRangeMainProps {
  format?: string;
  startDate: string;
  endDate: string;
  monthFormat?: string;
  onRangeChange?: ({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) => void;
}

type DateRangeState = {
  firstSelectedDate: dayjs.Dayjs;
  secondSelectedDate: dayjs.Dayjs;
  selectedMonth: string;
  days: dayjs.Dayjs[];
  monthFormat?: string;
  onPrevMonthClick: () => void;
  onNextMonthClick: () => void;
  onPrevYearClick: () => void;
  onNextYearClick: () => void;
  onDateClick: (date: dayjs.Dayjs) => void;
};

export const [useDateRangeContext, DateRangeProvider] =
  _createContext<DateRangeState>();

function DateRangeMain(
  {
    children,
    format = "YYYY-MM-DD",
    monthFormat = "MMM YYYY",
    ...props
  }: PropsWithChildren<DateRangeMainProps>,
  forwardRef: ForwardedRef<HTMLDivElement>
) {
  const { startDate, endDate, onRangeChange } = props;
  const today = dayjs();

  const [firstSelectedDate, setFirstSelectedDate] = useState<dayjs.Dayjs>(
    dayjs(startDate)
  );
  const [secondSelectedDate, setSecondSelectedDate] = useState<dayjs.Dayjs>(
    dayjs(endDate)
  );
  const [isFirstTurn, setIsFirstTurn] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    today.format(monthFormat)
  );

  const parsedMonth = useMemo(
    () => dayjs(selectedMonth, monthFormat),
    [selectedMonth, monthFormat]
  );

  const days = useMemo(() => {
    const startOfMonth = parsedMonth.startOf("month");
    const endOfMonth = parsedMonth.endOf("month");
    const startOfFirstWeek = startOfMonth.startOf("week");
    const endOfLastWeek = endOfMonth.endOf("week");

    const daysArray: dayjs.Dayjs[] = [];
    for (
      let date = startOfFirstWeek;
      date.isBefore(endOfLastWeek) || date.isSame(endOfLastWeek);
      date = date.add(1, "day")
    ) {
      daysArray.push(date);
    }
    return daysArray;
  }, [parsedMonth]);

  const onPrevMonthClick = useCallback(() => {
    setSelectedMonth((prev) =>
      dayjs(prev, monthFormat).add(-1, "month").format(monthFormat)
    );
  }, [monthFormat]);

  const onNextMonthClick = useCallback(() => {
    setSelectedMonth((prev) =>
      dayjs(prev, monthFormat).add(1, "month").format(monthFormat)
    );
  }, [monthFormat]);

  const onPrevYearClick = useCallback(() => {
    setSelectedMonth((prev) =>
      dayjs(prev, monthFormat).add(-1, "year").format(monthFormat)
    );
  }, [monthFormat]);

  const onNextYearClick = useCallback(() => {
    setSelectedMonth((prev) =>
      dayjs(prev, monthFormat).add(1, "year").format(monthFormat)
    );
  }, [monthFormat]);

  const onDateClick = useCallback(
    (date: dayjs.Dayjs) => {
      if (isFirstTurn) {
        setFirstSelectedDate(date);
        setIsFirstTurn(false);
      } else {
        setSecondSelectedDate(date);
        setIsFirstTurn(true);
      }
    },
    [isFirstTurn]
  );

  useEffect(() => {
    if (!onRangeChange) return;

    const orderCheck =
      firstSelectedDate.isBefore(secondSelectedDate) ||
      firstSelectedDate.isSame(secondSelectedDate);
    const startDate = firstSelectedDate.format(format);
    const endDate = secondSelectedDate.format(format);

    onRangeChange({
      startDate: orderCheck ? startDate : endDate,
      endDate: orderCheck ? endDate : startDate,
    });

    if (!orderCheck) {
      setIsFirstTurn((prev) => !prev);
      setFirstSelectedDate(secondSelectedDate);
      setSecondSelectedDate(firstSelectedDate);
    }
  }, [firstSelectedDate, secondSelectedDate]);

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
    ]
  );

  return (
    <DateRangeProvider value={providerValue}>
      <div ref={forwardRef}>{children}</div>
    </DateRangeProvider>
  );
}

const DateRange = Object.assign(forwardRef(DateRangeMain), {
  SelectedMonth: DateRangeSelectedMonth,
  Date: DateRangeDate,
  NextMonth: DateRangeNextMonth,
  PrevMonth: DateRangePrevMonth,
  NextYear: DateRangeNextYear,
  PrevYear: DateRangePrevYear,
});

export default DateRange;
