import classNames from 'classnames/bind'
import style from './Select.module.scss'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState, useEffect, memo, KeyboardEvent } from 'react'
import { ArrowDownSelect } from '../Icons'

const cx = classNames.bind(style)

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
}

interface Props {
    options: string[]
    value: string
    handleSetValue: (item: string) => void
}

const Select: React.FC<Props> = ({ options, value, handleSetValue }) => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    const handleSelected = (item: string) => {
        handleSetValue(item)
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!e.target || !(e.target instanceof HTMLElement) || !e.target.closest('#btn-select')) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            window.addEventListener('click', handleClickOutside)
        }

        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [isOpen])

    const handleKeyUp = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'Escape':
                setIsOpen(false)
                break
            default:
                break
        }
    }

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            className={cx('menu')}
            onKeyUp={(e: KeyboardEvent) => {
                handleKeyUp(e)
            }}
        >
            <motion.button onClick={() => setIsOpen(!isOpen)} className={cx('person-can-watch-btn')} id="btn-select">
                {t(`upload.preview.${value.toLowerCase()}`)}
                <motion.div
                    variants={{
                        open: { rotate: 180 },
                        closed: { rotate: 0 },
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ originY: 0.55 }}
                >
                    <ArrowDownSelect />
                </motion.div>
            </motion.button>
            <motion.ul
                className={cx('dropdown-menu')}
                variants={{
                    open: {
                        // border radius is 4px
                        clipPath: 'inset(0% 0% 0% 0% round 4px)',
                        transition: {
                            type: 'spring',
                            bounce: 0,
                            duration: 0.4,
                            delayChildren: 0.3,
                            staggerChildren: 0.02,
                        },
                    },
                    closed: {
                        clipPath: 'inset(10% 50% 90% 50% round 10px)',
                        transition: {
                            type: 'spring',
                            bounce: 0,
                            duration: 0.3,
                        },
                    },
                }}
                style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
            >
                {options.map((item: string, index: number) => {
                    return (
                        <motion.li
                            key={index}
                            className={cx('dropdown-menu-item', {
                                isSelected: item === value,
                            })}
                            variants={itemVariants}
                            onClick={() => {
                                handleSelected(item)
                            }}
                        >
                            {t(`upload.preview.${item.toLowerCase()}`)}
                        </motion.li>
                    )
                })}
            </motion.ul>
        </motion.nav>
    )
}

export default memo(Select)
