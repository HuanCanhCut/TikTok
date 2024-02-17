import classNames from 'classnames/bind'
import style from './FormControl.module.scss'
import { useContext } from 'react'

import Caption from './Caption'
import Cover from './Cover'
import { fileUploadContext } from '../../Upload'
import AllowUser from './AllowUser'

const cx = classNames.bind(style)

function FormControl({ captureImages, slideQuantity }) {
    const { file } = useContext(fileUploadContext)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Caption></Caption>
            </div>
            {file && captureImages.length === slideQuantity && (
                <Cover captureImages={captureImages} slideQuantity={slideQuantity} />
            )}

            <AllowUser />
        </div>
    )
}

export default FormControl
