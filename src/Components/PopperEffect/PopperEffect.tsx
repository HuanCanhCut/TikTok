import { useSpring } from 'framer-motion'
import Tippy from '@tippyjs/react'
import { motion } from 'framer-motion'
import { Wrapper as PopperWrapper } from '~/Components/Popper'
import React from 'react'

interface Props {
    children: React.ReactNode
    timeDelayOpen?: number
    timeDelayClose?: number
    renderItem: (onHide?: boolean) => React.ReactNode
    offsetX?: number
    offsetY?: number
    hideOnClick?: boolean
}

const PopperEffect: React.FC<Props> = ({
    children,
    renderItem,
    timeDelayOpen = 0,
    timeDelayClose = 0,
    offsetX = 0,
    offsetY = 0,
    hideOnClick = false,
}) => {
    const render = (attrs: any) => {
        return (
            <motion.div style={{ scale, opacity }}>
                <div {...attrs}>
                    <PopperWrapper>{renderItem()}</PopperWrapper>
                </div>
            </motion.div>
        )
    }

    // define config framer-motion
    const springConfig: any = { damping: 15, stiffness: 300 }
    const initialScale = 0.5
    const opacity = useSpring(springConfig)
    const scale = useSpring(initialScale, springConfig)

    const onMount = () => {
        scale.set(1)
        opacity.set(1)
    }

    const onHide = ({ unmount }: { unmount: any }) => {
        scale.on('change', (value) => {
            if (value <= initialScale) {
                unmount()
            }
        })

        scale.set(initialScale)
        opacity.set(0)

        renderItem(true)
    }

    return (
        <Tippy
            animation={true}
            appendTo={document.body}
            interactive
            delay={[timeDelayOpen, timeDelayClose]}
            offset={[offsetX, offsetY]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={render}
            onMount={onMount}
            onHide={onHide}
        >
            <div>{children}</div>
        </Tippy>
    )
}

export default PopperEffect
