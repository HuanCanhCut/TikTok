import classNames from 'classnames/bind'
import { useRef, useState } from 'react'
import style from './SplitCard.module.scss'
import { Minus, Plus } from '~/Components/Icons'
import Button from '~/Components/Button'
import { ReSize } from '~/Components/Icons'

const cx = classNames.bind(style)

const defaultValue = 2

function SplitCard() {
    const [thumbTime, setThumbTime] = useState(defaultValue)
    const inputRef = useRef()

    const handleIncrease = () => {
        setThumbTime((prev) => {
            return prev + 1
        })
    }

    const handleDecrease = () => {
        setThumbTime((prev) => {
            if (prev < 2) {
                return 1
            }
            return prev - 1
        })
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('split-body')}>
                <span className={cx('content')}>Split into multiple parts to get more exposure</span>
                <div className={cx('increment')}>
                    <span className={cx('minus')} onClick={handleDecrease}>
                        <Minus />
                    </span>
                    <span className={cx('increment-num')}>
                        <input
                            ref={inputRef}
                            type="number"
                            value={thumbTime}
                            onChange={(e) => {
                                setThumbTime(e.target.value)
                            }}
                            className={cx('increment-value')}
                        />
                    </span>
                    <span className={cx('plus')} onClick={handleIncrease}>
                        <Plus />
                    </span>
                </div>
            </div>
            <div className={cx('action-btn')}>
                <Button leftIcon={<ReSize />} outline className={cx('split-btn')}>
                    Split
                </Button>
            </div>
        </div>
    )
}

export default SplitCard
