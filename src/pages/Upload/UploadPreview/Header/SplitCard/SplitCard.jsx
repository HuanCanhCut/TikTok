import classNames from 'classnames/bind'
import style from './SplitCard.module.scss'
import { Minus, Plus } from '~/Components/Icons'
import Button from '~/Components/Button'
import { ReSize } from '~/Components/Icons'

const cx = classNames.bind(style)

function SplitCard() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('split-body')}>
                <span className={cx('content')}>Split into multiple parts to get more exposure 2</span>
                <div className={cx('increment')}>
                    <span className={cx('minus')}>
                        <Minus />
                    </span>
                    <span className={cx('increment-num')}>
                        <input type="number" value={2} onChange={() => {}} className={cx('increment-value')} />
                    </span>
                    <span className={cx('plus')}>
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
