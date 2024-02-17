import classNames from 'classnames/bind'
import style from './AllowUser.module.scss'
import { useState, useEffect, memo, useReducer, useCallback } from 'react'

import { CheckboxTick } from '~/Components/Icons'
import * as action from './Actions'
import Select from '~/Components/Select'

const personCanWatchOptions = ['Public', 'Friends', 'Private']

let allowUserTo = [
    {
        title: 'Comment',
        type: 'comment',
        isChecked: true,
    },
    {
        title: 'Duet',
        type: 'duet',
        isChecked: true,
    },
    {
        title: 'Stitch',
        type: 'stitch',
        isChecked: true,
    },
]

const reducer = (state, action) => {
    switch (action.type) {
        case 'allowSelect':
            const newState = [...state]
            for (let i = 0; i < newState.length; ++i) {
                if (action.payload.type === newState[i].type) {
                    newState[i] = { ...newState[i], isChecked: !action.payload.isChecked }
                    break
                }
            }
            return newState
        default:
            break
    }
}

const cx = classNames.bind(style)

function AllowUser() {
    const [personCanWatch, setPersonCanWatch] = useState(personCanWatchOptions[0])
    const [allowUser, dispatch] = useReducer(reducer, allowUserTo)

    const handleSelected = useCallback((item) => {
        setPersonCanWatch(item)
    }, [])

    const handleSelectedAllowUser = (item) => {
        dispatch(action.allowAction(item))
    }

    return (
        <div className={cx('allow-wrapper')}>
            <div className={cx('person-can-watch')}>
                <p style={{ display: 'inline-block', fontWeight: 600 }}>Who can watch this video</p>
                <Select options={personCanWatchOptions} handleSetValue={handleSelected} value={personCanWatch} />
            </div>
            <div className={cx('allow-user-to')}>
                <p style={{ display: 'inline-block', fontWeight: 600 }}>Allow user to:</p>
                <div className={cx('allow-menu')}>
                    {allowUser.map((item, index) => {
                        return (
                            <div className={cx('allow-item')} key={index}>
                                <div
                                    className={cx('checkbox', {
                                        notChecked: !item.isChecked,
                                    })}
                                    onClick={() => {
                                        handleSelectedAllowUser(item)
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        style={{ opacity: 0, position: 'absolute', zIndex: 3, cursor: 'pointer' }}
                                    />

                                    {item.isChecked && (
                                        <CheckboxTick width="12" height="12" className={cx('checkbox-icon')} />
                                    )}
                                </div>
                                <span>{item.title}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default memo(AllowUser)
