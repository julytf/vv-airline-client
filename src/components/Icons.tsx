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
    return (
      <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
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
    )

  if (color === 'green')
    return (
      <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
        <g>
          <title>Occupied Seat</title>
          <rect id='svg_19' height='5' width='20' y='14' x='2' strokeWidth='0' stroke='#000' fill='#58D68D'></rect>
          <rect stroke='#000' strokeWidth='0' id='svg_18' height='12' width='16' y='2' x='4' fill='#58D68D'></rect>
          <line stroke='#000' id='svg_2' y2='19' x2='2' y1='14' x1='2' fill='none'></line>
          <line id='svg_3' y2='2' x2='20' y1='2' x1='4' stroke='#000' fill='none'></line>
          <line id='svg_6' y2='6' x2='4' y1='2' x1='4' stroke='#000' fill='none'></line>
          <line id='svg_9' y2='19' x2='22' y1='19' x1='2' stroke='#000' fill='none'></line>
          <line stroke='#000' id='svg_13' y2='19' x2='22' y1='14' x1='22' fill='none'></line>
          <line id='svg_17' y2='6' x2='20' y1='2' x1='20' stroke='#000' fill='none'></line>
          <line id='svg_21' y2='14' x2='21' y1='14' x1='3' stroke='#52BE80' fill='none'></line>
          <line id='svg_8' y2='14' x2='3' y1='6' x1='3' stroke='#000' fill='none'></line>
          <line id='svg_15' y2='14' x2='21' y1='6' x1='21' stroke='#000' fill='none'></line>
          <line id='svg_41' y2='14' x2='4' y1='6' x1='4' stroke='#ffffff' fill='none'></line>
          <line id='svg_5' y2='6' x2='5' y1='6' x1='3' stroke='#000' fill='none'></line>
          <line id='svg_43' y2='14' x2='20' y1='6' x1='20' stroke='#ffffff' fill='none'></line>
          <line id='svg_16' y2='6' x2='21' y1='6' x1='19' stroke='#000' fill='none'></line>
        </g>
      </svg>
    )
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

export const SpinningCircle: FunctionComponent = () => {
  return (
    <div role='status'>
      <svg
        aria-hidden='true'
        className='h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600'
        viewBox='0 0 100 101'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
          fill='currentColor'
        />
        <path
          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
          fill='currentFill'
        />
      </svg>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}
