import { PropsWithChildren } from "react";
import { useDatePickerContext } from "./DatePickerMain";

interface DatePickerPrevYearProps {
  className?: string;
}

export default function DatePickerPrevYear({
  children,
  className,
}: PropsWithChildren<DatePickerPrevYearProps>) {
  const { onPrevYearClick } = useDatePickerContext();

  return (
    <button onClick={onPrevYearClick} className={className}>
      {children}
    </button>
  );
}
