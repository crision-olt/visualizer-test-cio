import { useEffect, useRef } from 'react'
import { usePortal }         from '../../utils/portal'
import { createPortal }      from 'react-dom'

const Frame = ({ children, closeOnClickOutside = true, closeOnEsc = true, onClose, open = true }) => {
  const portal = usePortal()

  // close on click outside
  const container = useRef(null)
  const onOverlayClick = (e) => {
    if (!container.current?.contains(e.target)) onClose()
  }

  // close on esc
  useEffect(() => {
    const onKeyDown = (e) => {
      if (!open) return

      if (e.key === 'Escape') {
        if (closeOnEsc) onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeOnEsc, onClose, open])

  useEffect(() => {
    document.getElementById('root')?.setAttribute('aria-hidden', open.toString())
    portal.current?.setAttribute('aria-hidden', (
      !open
    ).toString())
  }, [open, portal])

  return createPortal(
    <div
      className={`fixed inset-0 z-20 text-white bg-gray-700/50 ${open ? 'visible' : 'invisible'}`}
      onClick={closeOnClickOutside ? onOverlayClick : undefined}
    >
      <div className="w-4/6 sm:w-3/6 md:w-2/6 lg:w-3/12 2xl:w-1/6  h-screen py-40 ml-auto mr-4" ref={container}>

        <div className="flex flex-col gap-3 overflow-y-scroll bg-transparent h-full no-scrollbar">{children}</div>

      </div>
    </div>,
    portal.current,
  )
}
export const Modal = { Frame }
