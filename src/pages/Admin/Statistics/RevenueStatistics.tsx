import { FunctionComponent, useEffect, useState } from 'react'
import Chart from 'react-google-charts'
import Radio from './Radio'
import bookingsService from '@/services/bookings.service'
import IBooking from '@/interfaces/booking/booking.interface'
import { addDays, addMonths, differenceInDays, differenceInMonths, format, subYears } from 'date-fns'
import { TicketClass } from '@/enums/ticket.enums'
import { FlightType } from '@/enums/flight.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'

interface RevenueStatisticsProps {
  bookings: IBooking[]
  revenueBy: 'day' | 'month'
  from: Date
  to: Date
}

const RevenueStatistics: FunctionComponent<RevenueStatisticsProps> = ({ bookings, revenueBy, from, to }) => {
  const getDataFromBooking = (booking: IBooking) => {
    const passengerQuantity = booking?.passengers?.length || 0

    let totalPrice = 0
    const totalByClass = {
      [TicketClass.ECONOMY]: 0,
      [TicketClass.BUSINESS]: 0,
    }
    let totalByAddOn = 0

    totalByClass[booking?.flightsInfo?.[FlightType.OUTBOUND].ticketClass] +=
      booking?.flightsInfo?.[FlightType.OUTBOUND].price * passengerQuantity

    if (booking?.flightsInfo?.[FlightType.INBOUND]) {
      totalByClass[booking?.flightsInfo?.[FlightType.INBOUND].ticketClass] +=
        booking?.flightsInfo?.[FlightType.INBOUND].price * passengerQuantity
    }

    booking?.flightsInfo?.[FlightType.OUTBOUND]?.reservations.forEach((reservation) => {
      totalByAddOn +=
        (reservation[FlightLegType.DEPARTURE]?.services?.baggage?.charge || 0) +
        (reservation[FlightLegType.DEPARTURE]?.services?.meal?.charge || 0) +
        (reservation[FlightLegType.DEPARTURE]?.services?.seat?.charge || 0) +
        (reservation[FlightLegType.TRANSIT]?.services?.baggage?.charge || 0) +
        (reservation[FlightLegType.TRANSIT]?.services?.meal?.charge || 0) +
        (reservation[FlightLegType.TRANSIT]?.services?.seat?.charge || 0)
    })
    booking?.flightsInfo?.[FlightType.INBOUND]?.reservations.forEach((reservation) => {
      totalByAddOn +=
        (reservation[FlightLegType.DEPARTURE]?.services?.baggage?.charge || 0) +
        (reservation[FlightLegType.DEPARTURE]?.services?.meal?.charge || 0) +
        (reservation[FlightLegType.DEPARTURE]?.services?.seat?.charge || 0) +
        (reservation[FlightLegType.TRANSIT]?.services?.baggage?.charge || 0) +
        (reservation[FlightLegType.TRANSIT]?.services?.meal?.charge || 0) +
        (reservation[FlightLegType.TRANSIT]?.services?.seat?.charge || 0)
    })

    totalPrice = booking.totalPrice

    return {
      totalPrice,
      totalByClass,
      totalByAddOn,
    }
  }

  const pieChartData = [0, 0, 0]

  const lineChartData = bookings.reduce<{ [key: string]: number[] }>(
    (data, booking) => {
      if (!booking.payment?.paidAt) return data

      const key = format(booking.payment?.paidAt, revenueBy === 'day' ? 'yyyy-MM-dd' : 'yyyy-MM')

      const bookingData = getDataFromBooking(booking)
      console.log(bookingData)

      data[key] = data[key] || [0, 0, 0, 0]

      data[key][0] += bookingData.totalByClass[TicketClass.BUSINESS]
      // || bookingData.totalByClass[TicketClass.BUSINESS]

      data[key][1] += bookingData.totalByClass[TicketClass.ECONOMY]
      // || bookingData.totalByClass[TicketClass.ECONOMY]

      data[key][2] += bookingData.totalByAddOn  
      // || bookingData.totalByAddOn

      data[key][3] += bookingData.totalPrice
      // || bookingData.totalPrice

      pieChartData[0] += bookingData.totalByClass[TicketClass.BUSINESS]
      pieChartData[1] += bookingData.totalByClass[TicketClass.ECONOMY]
      pieChartData[2] += bookingData.totalByAddOn

      console.log(data)
      console.log(data[key])
      return data
    },
    new Array(revenueBy === 'day' ? differenceInDays(to, from) : differenceInMonths(to, from))
      .fill(null)
      .reduce<{ [key: string]: number[] }>((data, _, index) => {
        const date = revenueBy === 'day' ? addDays(from, index) : addMonths(from, index)
        data[format(date, revenueBy === 'day' ? 'yyyy-MM-dd' : 'yyyy-MM')] = [0, 0, 0, 0]
        return data
      }, {}),
  )
  console.log(lineChartData)
  console.log('did',differenceInDays(to, from))
  console.log('test',new Array(revenueBy === 'day' ? differenceInDays(to, from) : differenceInMonths(to, from))
  .fill(null)
  .reduce<{ [key: string]: number[] }>((data, _, index) => {
    const date = revenueBy === 'day' ? addDays(from, index) : addMonths(from, index)
    console.log(date)
    data[format(date, revenueBy === 'day' ? 'yyyy-MM-dd' : 'yyyy-MM')] = [0, 0, 0, 0]
    return data
  }, {}))

  return (
    <div className='grid grid-cols-12 gap-4'>
      <div className='col-span-8'>
        <Chart
          chartType='LineChart'
          // data={[
          //   ['Tháng', 'Tổng', 'Hạng Phổ Thông', 'Hạng Thương Gia', 'Mua thêm hành lý'],
          //   [1, 71000000, 35000000, 29000000, 7000000],
          //   [2, 47000000, 5000000, 20000000, 22000000],
          //   [3, 26000000, 16000000, 3000000, 7000000],
          //   [4, 71000000, 28000000, 39000000, 4000000],
          //   [5, 101000000, 45000000, 49000000, 7000000],
          //   [6, 38000000, 5000000, 26000000, 7000000],
          //   [7, 43000000, 23000000, 3000000, 17000000],
          //   [8, 64000000, 16000000, 36000000, 12000000],
          //   [9, 33000000, 8000000, 19000000, 6000000],
          //   [10, 50000000, 28000000, 0, 22000000],
          //   [11, 98000000, 37000000, 40000000, 21000000],
          //   [12, 22000000, 21000000, 1000000, 0],
          // ]}
          data={[
            ['Tháng', 'Hạng Phổ Thông', 'Hạng Thương Gia', 'Mua thêm hành lý', 'Tổng'],
            ...Object.entries(lineChartData)
              .sort()
              .map(([month, data]) => [month, ...data]),
          ]}
          width='100%'
          height='400px'
          legendToggle
          options={{
            title: 'Doanh thu theo tháng',
            curveType: 'function',
            vAxis: {
              minValue: 0,
              viewWindow: {
                min: 0,
              },
            },
          }}
        />
      </div>
      <div className='col-span-4'>
        <div className='col-span-4 '>
          <Chart
            chartType='PieChart'
            data={[
              ['Loại', 'Doanh thu'],
              ['Hạng Phổ Thông', pieChartData[0]],
              ['Hạng Thương Gia', pieChartData[1]],
              ['Mua thêm hành lý', pieChartData[2]],
            ]}
            width='100%'
            height='400px'
            legendToggle
            options={{
              //   legend: 'none',
              pieSliceText: '',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default RevenueStatistics
