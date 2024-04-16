import classNames from 'classnames/bind'
import style from './UploadPreview.module.scss'
import Button from '~/Components/Button'
import { useTranslation } from 'react-i18next'

const cx = classNames.bind(style)

interface Modal {
    title: string
    description: string
    allowTitle: string
    cancelTitle: string
}

interface Props {
    modal: Modal
    closeModal: () => void
    handleDiscard: () => void
    vertical?: boolean
}

const Discard: React.FC<Props> = ({ modal, closeModal, handleDiscard, vertical = false }) => {
    const { t } = useTranslation()

    return (
        <div className={cx('discard-wrapper')}>
            <div className={cx('header')}>
                {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                <h2 className={cx('title')}>{t(`upload.preview.${modal.title.toLowerCase()}`)}</h2>
                <p className={cx('description')}>{t(`upload.preview.${modal.description.toLowerCase()}`)}</p>
            </div>
            <div
                className={cx('actions', {
                    directionButton: vertical,
                })}
            >
                <Button className={cx('action-btn', 'cancel')} roundedOutline onClick={closeModal}>
                    {t(`upload.preview.${modal.cancelTitle.toLowerCase()}`)}
                </Button>
                <Button className={cx('action-btn', 'allow')} primary onClick={handleDiscard}>
                    {t(`upload.preview.${modal.allowTitle.toLowerCase()}`)}
                </Button>
            </div>
        </div>
    )
}

export default Discard
