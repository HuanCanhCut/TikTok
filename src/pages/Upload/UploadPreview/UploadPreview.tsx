import classNames from 'classnames/bind'
import { createContext, useState, useEffect, memo } from 'react'
import style from './UploadPreview.module.scss'
import Header from './Header'
import Preview from './Preview/Preview'
import { FileUploadModal } from '../Upload'

const cx = classNames.bind(style)

export interface fileNameContextModal {
    fileName: string
    setFileName: any
}

export const fileNameContext = createContext<fileNameContextModal | null>(null)

const UploadPreview = ({ file }: { file: FileUploadModal }) => {
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

export default memo(UploadPreview)
