import classNames from 'classnames/bind'
import style from './Upload.module.scss'
import { memo, useState, createContext } from 'react'
import UploadDrop from './UploadDrop'
import UploadPreview from './UploadPreview'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const cx = classNames.bind(style)

export const fileUploadContext = createContext()

function Upload() {
    const [file, setFile] = useState(null)

    const showToast = (message) => {
        return toast.error(message, {
            className: 'custom-toast',
            position: 'top-center',
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        })
    }

    const handleSetFile = (e) => {
        if (Array.from(e.dataTransfer.files).length > 1) {
            showToast('Please select only one file.')
        } else {
            const fileType = Array.from(e.dataTransfer.files)[0].type
            if (fileType === 'video/mp4' || fileType === 'video/webm') {
                setFile(Array.from(e.dataTransfer.files)[0])
            } else {
                showToast('Unsupported file. Use Mp4 or WebM instead.')
            }
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        handleSetFile(e)
    }

    return (
        <div className={cx('wrapper')}>
            {file ? (
                <fileUploadContext.Provider value={{ file }}>
                    <UploadPreview file={file} />
                </fileUploadContext.Provider>
            ) : (
                <UploadDrop handleDrop={handleDrop} showToast={showToast} setFile={setFile} />
            )}
            <ToastContainer />
        </div>
    )
}

export default memo(Upload)
