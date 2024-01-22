import classNames from 'classnames/bind'
import style from './FormControl.module.scss'
import { useContext } from 'react'

import Caption from './Caption'
import Cover from './Cover'
import { fileUploadContext } from '../../Upload'
import useDarkMode from '~/hooks/useDarkMode'

const cx = classNames.bind(style)

function FormControl() {
    const { file } = useContext(fileUploadContext)

    return (
        <div
            className={cx('wrapper', {
                darkMode: useDarkMode(),
            })}
        >
            <div className={cx('header')}>
                <Caption></Caption>
            </div>
            {file && <Cover />}
        </div>
    )
}

export default FormControl
