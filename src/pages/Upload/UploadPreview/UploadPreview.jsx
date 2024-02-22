import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { createContext, useState, useEffect, memo } from 'react'
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

        return () => {
            if (file) {
                URL.revokeObjectURL(file.preview)
            }
        }
    }, [file])

    if (file) {
        file.preview = URL.createObjectURL(file)
    }

    useEffect(() => {
        return () => {
            file.preview && URL.revokeObjectURL(file.preview)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

export default memo(UploadPreview)
