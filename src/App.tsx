import dayjs from "dayjs";
import { useState } from "react";
import DatePicker from "./stories/component/DatePicker/DatePickerMain";
import DateRange from "./stories/component/DateRange/DateRangeMain";

const dayOfTheWeek = ["일", "월", "화", "수", "목", "금", "토"];

function App() {
  const today = dayjs();
  const [date, setDate] = useState(today.format("YYYY-MM-DD"));
  const [dateRange, setDateRange] = useState({
    startDate: today.startOf("month").format("YYYY-MM-DD"),
    endDate: today.endOf("month").format("YYYY-MM-DD"),
  });

  const onDateChange = (date: string) => {
    setDate(date);
  };

  const onDateRangeChange = ({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) => {
    setDateRange((prev) => ({ ...prev, startDate, endDate }));
  };

  return (
    <div className="flex gap-4">
      <div className="w-[320px] border rounded-md p-4 shadow-lg">
        {date}
        <DatePicker
          selectedDate={date}
          monthFormat="YYYY년 MM월"
          onDateChange={onDateChange}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <DatePicker.PrevYear>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                  />
                </svg>
              </DatePicker.PrevYear>
              <DatePicker.PrevMonth>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </DatePicker.PrevMonth>
            </div>
            <DatePicker.SelectedMonth className="text-xl" />
            <div className="flex items-center gap-2">
              <DatePicker.NextMonth>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </DatePicker.NextMonth>
              <DatePicker.NextYear>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </DatePicker.NextYear>
            </div>
          </div>
          <div className="grid grid-cols-7 mt-4 mb-2 gap-4 text-center">
            {dayOfTheWeek.map((item, idx) => (
              <div
                key={idx}
                className={`size-8 flex items-center justify-center`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-4 text-center">
            <DatePicker.Date>
              {({ date, isSelected, isOtherMonth }) => (
                <div
                  className={`size-8 flex items-center justify-center border-b-2
                  ${
                    isSelected
                      ? "border-blue-600 text-gray-800"
                      : "border-transparent"
                  }
                  ${isOtherMonth ? "text-gray-400" : "text-gray-800"}
                `}
                >
                  {date.format("D")}
                </div>
              )}
            </DatePicker.Date>
          </div>
        </DatePicker>
      </div>
      <div className="w-[320px] border rounded-md p-4 shadow-lg">
        {`${dateRange.startDate} ~ ${dateRange.endDate}`}
        <DateRange
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          monthFormat="YYYY년 MM월"
          onRangeChange={onDateRangeChange}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <DateRange.PrevYear>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                  />
                </svg>
              </DateRange.PrevYear>
              <DateRange.PrevMonth>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </DateRange.PrevMonth>
            </div>
            <DateRange.SelectedMonth className="text-xl" />
            <div className="flex items-center gap-2">
              <DateRange.NextMonth>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </DateRange.NextMonth>
              <DateRange.NextYear>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </DateRange.NextYear>
            </div>
          </div>
          <div className="grid grid-cols-7 mt-4 mb-2 gap-y-4 text-center">
            {dayOfTheWeek.map((item, idx) => (
              <div
                key={idx}
                className={`size-8 flex items-center justify-center`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-4 text-center">
            <DateRange.Date>
              {({
                date,
                isFirstSelected,
                isSecondSelected,
                isBetween,
                isOtherMonth,
              }) => (
                <div
                  className={`flex items-center justify-center border-b-2
                  ${
                    isFirstSelected
                      ? "text-white !bg-blue-600 rounded-l-md"
                      : "border-transparent"
                  }
                  ${
                    isSecondSelected
                      ? "text-white !bg-blue-600 rounded-r-md"
                      : "border-transparent"
                  }
                  ${isBetween ? "bg-blue-200" : ""}
                  ${isOtherMonth ? "text-gray-400" : "text-gray-800"}
                `}
                >
                  {date.format("D")}
                </div>
              )}
            </DateRange.Date>
          </div>
        </DateRange>
      </div>
    </div>
  );
}

export default App;
