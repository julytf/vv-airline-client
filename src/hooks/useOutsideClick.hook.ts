import { useState, useEffect, MouseEventHandler, RefObject, useRef, LegacyRef } from 'react'

const useOutsideClick = (elRef: RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // console.log('event', event)
      // console.log('1', ref.current)
      // console.log('2', !(ref.current as Node).contains(event.target as Node))

      if (elRef.current && !(elRef.current as Node).contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [elRef])
}

export default useOutsideClick
