import { FunctionComponent } from 'react'

export const SeatIcon: FunctionComponent<{ color?: 'white' | 'blue' | 'orange' | 'green' | 'yellow' }> = ({
  color = 'white',
}) => {

  if (color === 'white')
    return (
      <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
        <g>
          {/* <title>Open Seat</title> */}
          <line stroke='#000' id='svg_2' y2='19' x2='2' y1='14' x1='2' fill='none' />
          <line id='svg_3' y2='2' x2='20' y1='2' x1='4' stroke='#000' fill='none' />
          <line id='svg_5' y2='6' x2='5' y1='6' x1='3' stroke='#000' fill='none' />
          <line id='svg_6' y2='6' x2='4' y1='2' x1='4' stroke='#000' fill='none' />
          <line id='svg_9' y2='19' x2='22' y1='19' x1='2' stroke='#000' fill='none' />
          <line stroke='#000' id='svg_13' y2='19' x2='22' y1='14' x1='22' fill='none' />
          <line id='svg_16' y2='6' x2='21' y1='6' x1='19' stroke='#000' fill='none' />
          <line id='svg_17' y2='6' x2='20' y1='2' x1='20' stroke='#000' fill='none' />
          <line id='svg_21' y2='14' x2='21' y1='14' x1='3' stroke='#9b9b9b' fill='none' />
          <line id='svg_8' y2='14' x2='3' y1='6' x1='3' stroke='#000' fill='none' />
          <line id='svg_15' y2='14' x2='21' y1='6' x1='21' stroke='#000' fill='none' />
          <line id='svg_37' y2='14' x2='19' y1='6' x1='19' stroke='#000' fill='none' />
          <line id='svg_38' y2='14' x2='5' y1='6' x1='5' stroke='#000' fill='none' />
        </g>
      </svg>
    )

  if (color === 'blue')
    return (
      <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
        <g>
          {/* <title>Occupied Seat</title> */}
          <rect id='svg_19' height='5' width='20' y='14' x='2' strokeWidth='0' stroke='#000' fill='#2b6cad' />
          <rect stroke='#000' strokeWidth='0' id='svg_18' height='12' width='16' y='2' x='4' fill='#2b6cad' />
          <line stroke='#000' id='svg_2' y2='19' x2='2' y1='14' x1='2' fill='none' />
          <line id='svg_3' y2='2' x2='20' y1='2' x1='4' stroke='#000' fill='none' />
          <line id='svg_6' y2='6' x2='4' y1='2' x1='4' stroke='#000' fill='none' />
          <line id='svg_9' y2='19' x2='22' y1='19' x1='2' stroke='#000' fill='none' />
          <line stroke='#000' id='svg_13' y2='19' x2='22' y1='14' x1='22' fill='none' />
          <line id='svg_17' y2='6' x2='20' y1='2' x1='20' stroke='#000' fill='none' />
          <line id='svg_21' y2='14' x2='21' y1='14' x1='3' stroke='#204f7d' fill='none' />
          <line id='svg_8' y2='14' x2='3' y1='6' x1='3' stroke='#000' fill='none' />
          <line id='svg_15' y2='14' x2='21' y1='6' x1='21' stroke='#000' fill='none' />
          <line id='svg_41' y2='14' x2='4' y1='6' x1='4' stroke='#ffffff' fill='none' />
          <line id='svg_5' y2='6' x2='5' y1='6' x1='3' stroke='#000' fill='none' />
          <line id='svg_43' y2='14' x2='20' y1='6' x1='20' stroke='#ffffff' fill='none' />
          <line id='svg_16' y2='6' x2='21' y1='6' x1='19' stroke='#000' fill='none' />
        </g>
      </svg>
    )

  if (color === 'orange')
    return <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
      <g>
        <title>Occupied Seat</title>
        <rect id='svg_19' height='5' width='20' y='14' x='2' strokeWidth='0' stroke='#000' fill='#ffa64d'></rect>
        <rect stroke='#000' strokeWidth='0' id='svg_18' height='12' width='16' y='2' x='4' fill='#ffa64d'></rect>
        <line stroke='#000' id='svg_2' y2='19' x2='2' y1='14' x1='2' fill='none'></line>
        <line id='svg_3' y2='2' x2='20' y1='2' x1='4' stroke='#000' fill='none'></line>
        <line id='svg_6' y2='6' x2='4' y1='2' x1='4' stroke='#000' fill='none'></line>
        <line id='svg_9' y2='19' x2='22' y1='19' x1='2' stroke='#000' fill='none'></line>
        <line stroke='#000' id='svg_13' y2='19' x2='22' y1='14' x1='22' fill='none'></line>
        <line id='svg_17' y2='6' x2='20' y1='2' x1='20' stroke='#000' fill='none'></line>
        <line id='svg_21' y2='14' x2='21' y1='14' x1='3' stroke='#cc6600' fill='none'></line>
        <line id='svg_8' y2='14' x2='3' y1='6' x1='3' stroke='#000' fill='none'></line>
        <line id='svg_15' y2='14' x2='21' y1='6' x1='21' stroke='#000' fill='none'></line>
        <line id='svg_41' y2='14' x2='4' y1='6' x1='4' stroke='#ffffff' fill='none'></line>
        <line id='svg_5' y2='6' x2='5' y1='6' x1='3' stroke='#000' fill='none'></line>
        <line id='svg_43' y2='14' x2='20' y1='6' x1='20' stroke='#ffffff' fill='none'></line>
        <line id='svg_16' y2='6' x2='21' y1='6' x1='19' stroke='#000' fill='none'></line>
      </g>
    </svg>
}

export const PartitionIcon: FunctionComponent = () => {
  return (
    <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
      <g>
        <title>Partition</title>
        <rect id='svg_28' height='22' width='22' y='1' x='1' stroke='#1c446c' fill='#2b6cad' />
        <rect
          transform='rotate(45 12 12.5)'
          id='svg_35'
          height='3'
          width='16'
          y='11'
          x='4'
          strokeWidth='0'
          stroke='#1c446c'
          fill='#fcfcfc'
        />
        <rect
          transform='rotate(-45 12 12.5)'
          id='svg_36'
          height='3'
          width='16'
          y='11'
          x='4'
          strokeWidth='0'
          stroke='#1c446c'
          fill='#fcfcfc'
        />
      </g>
    </svg>
  )
}
