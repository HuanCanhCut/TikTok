import classNames from 'classnames/bind'
import style from './Upload.module.scss'
import { memo, useState, createContext } from 'react'
import UploadDrop from './UploadDrop'
import UploadPreview from './UploadPreview'

const cx = classNames.bind(style)

export const fileUploadContext = createContext()

function Upload() {
    const [file, setFile] = useState()

    return (
        <div className={cx('wrapper')}>
            {file ? (
                <fileUploadContext.Provider value={{ file, setFile }}>
                    <UploadPreview file={file} />
                </fileUploadContext.Provider>
            ) : file === null ? (
                <fileUploadContext.Provider value={{ file, setFile }}>
                    <UploadPreview file={file} />
                </fileUploadContext.Provider>
            ) : (
                <UploadDrop setFile={setFile} />
            )}
        </div>
    )
}

export default memo(Upload)
