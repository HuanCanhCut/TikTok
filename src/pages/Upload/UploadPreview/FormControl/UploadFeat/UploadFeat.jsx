import classNames from 'classnames/bind'
import style from './UploadFeat.module.scss'
import { useState, useRef, useEffect, memo } from 'react'
import Tippy from '@tippyjs/react'
import { CircleInfo } from '~/Components/Icons'
import SwitchButton from '~/Components/SwitchButton'

const cx = classNames.bind(style)

function UploadFeat({ toolTip = false, title, message, className, ...props }) {
    const [isOn, setIsOn] = useState(false)

    const messageRef = useRef()

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.innerHTML = message
        }
    }, [message])

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
                <span className={cx('title')}>{title}</span>
                {toolTip && (
                    <div>
                        <Tippy content={message} placement="bottom" trigger="click">
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
