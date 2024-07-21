import { PropsWithChildren } from "react";
import { useDateRangeContext } from "./DateRangeMain";

interface DateRangeNextMonthProps {
  className?: string;
}

export default function DateRangeNextMonth({
  children,
  className,
}: PropsWithChildren<DateRangeNextMonthProps>) {
  const { onNextMonthClick } = useDateRangeContext();

  return (
    <button onClick={onNextMonthClick} className={className}>
      {children}
    </button>
  );
}
