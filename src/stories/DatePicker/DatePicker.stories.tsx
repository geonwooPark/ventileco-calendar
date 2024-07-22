import type { Meta } from '@storybook/react'
import DatePicker from './DatePickerMain'
import dayjs from 'dayjs'
import { useState } from 'react'

const dayOfTheWeek = ['일', '월', '화', '수', '목', '금', '토']

export default {
  title: 'COMPONENTS/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
} as Meta

export function Normal() {
  const today = dayjs()
  const [date, setDate] = useState(today.format('YYYY-MM-DD'))

  const onDateChange = (date: string) => {
    setDate(date)
  }

  return (
    <div className="w-[320px] rounded-md border p-4 shadow-lg">
      <DatePicker
        selectedDate={date}
        monthFormat="YYYY년 MM월"
        onDateChange={onDateChange}
      >
        <div className="flex items-center justify-between">
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
        <div className="mb-2 mt-4 grid grid-cols-7 gap-4 text-center">
          {dayOfTheWeek.map((item, idx) => (
            <div
              key={idx}
              className={`flex size-8 items-center justify-center`}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-4 text-center">
          <DatePicker.Date>
            {({ date, isSelected, isOtherMonth }) => (
              <div
                className={`flex size-8 items-center justify-center border-b-2
              ${
                isSelected
                  ? 'border-blue-600 text-gray-800'
                  : 'border-transparent'
              }
              ${isOtherMonth ? 'text-gray-400' : 'text-gray-800'}
            `}
              >
                {date.format('D')}
              </div>
            )}
          </DatePicker.Date>
        </div>
      </DatePicker>
      <p className="mt-4 text-center text-sm">{date}</p>
    </div>
  )
}
