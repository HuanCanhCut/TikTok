import classNames from 'classnames/bind'
import style from './UploadFeat.module.scss'
import { useState, useRef, useEffect, memo } from 'react'
import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'

import { CircleInfo } from '~/Components/Icons'
import SwitchButton from '~/Components/SwitchButton'

const cx = classNames.bind(style)

interface Props {
    toolTip?: boolean
    title: string
    message: string
    className?: any
    type: string
}

const UploadFeat: React.FC<Props> = ({ toolTip = false, title, type, message, className, ...props }) => {
    const { t } = useTranslation()
    const [isOn, setIsOn] = useState(false)

    const messageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.innerHTML = t(`upload.preview.${type} description`)
        }
    }, [message, t, type])

    const passProps = { ...props }

    const classes = cx('wrapper', {
        [className]: className,
    })

    const handleClick = () => {
        setIsOn(!isOn)
    }

    return (
        <div className={classes} {...passProps}>
            <div className={cx('item')}>
                <span className={cx('title')}>{t(`upload.preview.${title.toLowerCase()}`)}</span>
                {toolTip && (
                    <div>
                        <Tippy content={t(`upload.preview.${type} tooltip`)} placement="bottom" trigger="click">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CircleInfo className={cx('circle-icon')} />
                            </div>
                        </Tippy>
                    </div>
                )}
                <SwitchButton isOn={isOn} onClick={handleClick} />
            </div>
            {!toolTip && <span ref={messageRef} className={cx('message')}></span>}
        </div>
    )
}

export default memo(UploadFeat)
