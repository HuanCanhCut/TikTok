import { useState, useCallback } from 'react'
import classNames from 'classnames/bind'
import style from './FrameLoginSidebar.module.scss'
import Button from '~/Components/Button'
import { useDispatch } from 'react-redux'
import { actions } from '~/redux'

const cx = classNames.bind(style)

function FrameLoginSidebar() {
    const dispatch = useDispatch()

    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>Log in to follow creators, like videos, and view comments.</p>
            <Button
                outline
                className={cx('login')}
                onClick={() => {
                    dispatch(actions.openAuth(true))
                }}
            >
                Login
            </Button>
        </div>
    )
}

export default FrameLoginSidebar
