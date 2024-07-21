import dayjs from "dayjs";
import { useDateRangeContext } from "./DateRangeMain";

interface DateRangeDateProps {
  children: ({
    date,
    isFirstSelected,
    isSecondSelected,
    isBetween,
    isOtherMonth,
  }: {
    date: dayjs.Dayjs;
    isFirstSelected: boolean;
    isSecondSelected: boolean;
    isBetween: boolean;
    isOtherMonth: boolean;
  }) => React.ReactNode;
}

export default function DateRangeDate({ children }: DateRangeDateProps) {
  const {
    firstSelectedDate,
    secondSelectedDate,
    monthFormat,
    selectedMonth,
    days,
    onDateClick,
  } = useDateRangeContext();

  return (
    <>
      {days.map((date, idx) => (
        <button key={idx} onClick={() => onDateClick(date)}>
          {children({
            date,
            isFirstSelected: firstSelectedDate.isSame(date),
            isSecondSelected: secondSelectedDate.isSame(date),
            isBetween: date.isBetween(
              firstSelectedDate,
              secondSelectedDate,
              "day",
              "[]"
            ),
            isOtherMonth:
              dayjs(selectedMonth, monthFormat).month() !== date.month(),
          })}
        </button>
      ))}
    </>
  );
}
