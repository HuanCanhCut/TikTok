import classNames from 'classnames/bind'
import style from './Upload.module.scss'
import { memo, useState, createContext, useEffect } from 'react'
import UploadDrop from './UploadDrop'
import UploadPreview from './UploadPreview/UploadPreview'

const cx = classNames.bind(style)

export interface FileUploadModal extends File {
    preview: string
    description: string
    ratio: 'column' | 'row'
    width: number | string
    height: number | string
}

export interface FileContextModal {
    file: FileUploadModal
    setFile: any
}

export const fileUploadContext = createContext<FileContextModal | null>(null)

function Upload() {
    const [file, setFile] = useState()

    useEffect(() => {
        document.title = 'TikTok Creator Center'
    }, [])

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
