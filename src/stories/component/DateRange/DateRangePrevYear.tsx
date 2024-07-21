import { PropsWithChildren } from "react";
import { useDateRangeContext } from "./DateRangeMain";

interface DateRangePrevYearProps {
  className?: string;
}

export default function DateRangePrevYear({
  children,
  className,
}: PropsWithChildren<DateRangePrevYearProps>) {
  const { onPrevYearClick } = useDateRangeContext();

  return (
    <button onClick={onPrevYearClick} className={className}>
      {children}
    </button>
  );
}
