import classNames from 'classnames/bind'
import style from './FormControl.module.scss'
import { useContext, useCallback } from 'react'

import UploadFeat from '~/pages/Upload/UploadPreview/FormControl/UploadFeat'

import Caption from './Caption'
import Cover from './Cover'
import { fileUploadContext } from '../../Upload'
import AllowUser from './AllowUser'
import Button from '~/Components/Button'

const cx = classNames.bind(style)

const options = [
    {
        title: 'Schedule video',
        type: 'schedule',
        message:
            'By scheduling your video, you allow your video to be uploaded and stored on our servers before posting.',
    },
    {
        title: 'Disclose post content',
        type: 'disclose',
        message: 'Let others know this post promotes a brand, product or service.',
    },
    {
        title: 'Run a copyright check',
        type: 'check',
        message: `We'll check your video for potential copyright infringements on used sounds. If infringements are found, you can edit the video before posting. <strong style="cursor: pointer">Learn more</strong>`,
    },
]

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

            {options.map((item, index) => {
                return (
                    <UploadFeat
                        title={item.title}
                        key={index}
                        toolTip={item.type === 'schedule'}
                        message={item.message}
                    />
                )
            })}

            <div className={cx('upload-btn-wrapper')}>
                <Button outline large className={cx('discard')}>
                    Discard
                </Button>
                <Button primary large>
                    Post
                </Button>
            </div>
        </div>
    )
}

export default FormControl
