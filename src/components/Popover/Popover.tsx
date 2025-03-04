import { arrow, FloatingArrow, FloatingPortal, type Placement, shift, useFloating } from '@floating-ui/react'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'motion/react'
import React, { ElementType, useRef, useState } from 'react'

interface Props {
    children: React.ReactNode,
    popover: React.ReactNode,
    className?: string,
    as?: ElementType,
    initStatus?: boolean,
    position?: Placement
}

const Popover = ({ children, className, popover, as: Element = 'button', initStatus, position }: Props) => {
    const [open, setOpen] = useState<boolean>(initStatus ?? false)
    const arrowRef = useRef(null)
    const { refs, context, strategy, x, y, middlewareData } = useFloating({
        placement: position ?? 'bottom-end',
        middleware: [arrow({ element: arrowRef }), shift()]
    })

    const setShowPopover = (status: boolean) => {
        setOpen(status)
    }

    return (
        <Element
            ref={refs.setReference}
            className={className ?? 'flex gap-x-1 mx-2 items-center'}
            onMouseEnter={() => setShowPopover(true)}
            onMouseLeave={() => setShowPopover(false)}
        >
            {children}
            <FloatingPortal>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            className='flex flex-col items-start bg-white font-semibold shadow rounded-sm border'
                            style={{
                                position: strategy,
                                top: y ?? 0,
                                left: x ?? 0,
                                transformOrigin: `${middlewareData.arrow?.x}px top`
                            }}
                            ref={refs.setFloating}
                            initial={{ opacity: 0, transform: 'scale(0)' }}
                            animate={{ opacity: 1, transform: 'scale(1)' }}
                            exit={{ opacity: 0, transform: 'scale(0)' }}
                            transition={{ duration: 0.2 }}
                        >
                            {popover}
                            <FloatingArrow fill='white' ref={arrowRef} context={context} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </FloatingPortal>
        </Element>
    )
}

export default Popover
