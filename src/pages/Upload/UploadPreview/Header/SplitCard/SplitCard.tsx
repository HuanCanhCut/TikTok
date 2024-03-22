import classNames from 'classnames/bind'
import style from './SplitCard.module.scss'
import { useTranslation } from 'react-i18next'
import { Minus, Plus } from '~/Components/Icons'
import Button from '~/Components/Button'
import { ReSize } from '~/Components/Icons'

const cx = classNames.bind(style)

function SplitCard() {
    const { t } = useTranslation()

    return (
        <div className={cx('wrapper')}>
            <div className={cx('split-body')}>
                <span className={cx('content')}>{t('upload.preview.split into multiple parts')}</span>
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
                    {t('upload.preview.split')}
                </Button>
            </div>
        </div>
    )
}

export default SplitCard
