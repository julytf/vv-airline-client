import { useState, useEffect, MouseEventHandler, RefObject } from 'react'

export const useDetectOutsideClick = (
  el: RefObject<HTMLElement>,
  initialState: boolean,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isActive, setIsActive] = useState(initialState)

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      // console.log(el.current !== null)
      // console.log(!(el.current as Node).contains(e.target as Node))

      // If the active element exists and is clicked outside of
      if (el.current !== null && !(el.current as Node).contains(e.target as Node)) {
        setIsActive(!isActive)
      }
    }

    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      // Delay re-attaching the listener to avoid catching the same click event
      setTimeout(() => {
        window.addEventListener('click', pageClickEvent)
        // window.removeEventListener('click', pageClickEvent)
      }, 0)
    }

    return () => {
      window.removeEventListener('click', pageClickEvent)
    }
  }, [isActive, el])

  return [isActive, setIsActive]
}
