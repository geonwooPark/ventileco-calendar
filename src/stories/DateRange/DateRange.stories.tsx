import type { Meta } from '@storybook/react'
import dayjs from 'dayjs'
import { useState } from 'react'
import DateRange from './DateRangeMain'

const dayOfTheWeek = ['일', '월', '화', '수', '목', '금', '토']

export default {
  title: 'COMPONENTS/DateRange',
  component: DateRange,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} as Meta

export function Normal() {
  const today = dayjs()

  const [dateRange, setDateRange] = useState({
    startDate: today.startOf('month').format('YYYY-MM-DD'),
    endDate: today.endOf('month').format('YYYY-MM-DD'),
  })

  const onDateRangeChange = ({
    startDate,
    endDate,
  }: {
    startDate: string
    endDate: string
  }) => {
    setDateRange((prev) => ({ ...prev, startDate, endDate }))
  }

  return (
    <div>
      <h4 className="m-4 text-center text-lg">{`${dateRange.startDate} ~ ${dateRange.endDate}`}</h4>
      <div className="w-[320px] rounded-md border p-4 shadow-lg">
        <DateRange
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          monthFormat="YYYY년 MM월"
          onRangeChange={onDateRangeChange}
        >
          <div className="flex items-center justify-between">
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
          <div className="mb-2 mt-4 grid grid-cols-7 gap-y-4 text-center">
            {dayOfTheWeek.map((item, idx) => (
              <div
                key={idx}
                className={`flex size-8 items-center justify-center`}
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
                        ? 'rounded-l-md !bg-blue-600 text-white'
                        : 'border-transparent'
                    }
                    ${
                      isSecondSelected
                        ? 'rounded-r-md !bg-blue-600 text-white'
                        : 'border-transparent'
                    }
                    ${isBetween ? 'bg-blue-200' : ''}
                    ${isOtherMonth ? 'text-gray-400' : 'text-gray-800'}
                  `}
                >
                  {date.format('D')}
                </div>
              )}
            </DateRange.Date>
          </div>
        </DateRange>
      </div>
    </div>
  )
}
