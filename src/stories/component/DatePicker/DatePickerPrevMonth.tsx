import { PropsWithChildren } from "react";
import { useDatePickerContext } from "./DatePickerMain";

interface DatePickerPrevMonthProps {
  className?: string;
}

export default function DatePickerPrevMonth({
  children,
  className,
}: PropsWithChildren<DatePickerPrevMonthProps>) {
  const { onPrevMonthClick } = useDatePickerContext();

  return (
    <button onClick={onPrevMonthClick} className={className}>
      {children}
    </button>
  );
}
