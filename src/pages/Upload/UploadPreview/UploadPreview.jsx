import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { createContext, useState, useEffect } from 'react'
import style from './UploadPreview.module.scss'
import Header from './Header'
import Preview from './Preview'

const cx = classNames.bind(style)

export const fileNameContext = createContext()

function UploadPreview({ file }) {
    const [fileName, setFileName] = useState(file && file.name)

    useEffect(() => {
        if (file) {
            setFileName(file.name)
        }
    }, [file])

    return (
        <fileNameContext.Provider value={{ fileName, setFileName }}>
            <div className={cx('wrapper')}>
                {file && <Header />}
                <Preview />
            </div>
        </fileNameContext.Provider>
    )
}

UploadPreview.propTypes = {
    file: PropTypes.object,
}

export default UploadPreview
