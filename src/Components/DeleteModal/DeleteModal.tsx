import classNames from 'classnames/bind'
import style from './DeleteModal.module.scss'
import { memo, useCallback, useState } from 'react'
import ReactModal from 'react-modal'
import Button from '../Button'
import { useTranslation } from 'react-i18next'
import PopperEffect from '../PopperEffect'
import Tippy from '@tippyjs/react'

const cx = classNames.bind(style)

interface Props {
    firstOption: string
    handleDelete: () => void
    children: React.ReactNode
    title: string
    deleteBtn?: boolean
}

const DeleteModal: React.FC<Props> = ({ children, handleDelete, firstOption, title, deleteBtn }) => {
    const { t } = useTranslation()
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const renderOptions = useCallback(() => {
        return (
            <div className={cx('action-wrapper')}>
                <Tippy content={t('comment.sorry, the API does not support this feature')}>
                    <Button rounded className={cx('privacy-btn', 'video-action-btn')}>
                        {t(`comment.${firstOption.toLowerCase()}`)}
                    </Button>
                </Tippy>
                {deleteBtn && (
                    <Button
                        rounded
                        className={cx('delete-btn-modal', 'video-action-btn')}
                        onClick={() => {
                            setDeleteModalOpen(true)
                        }}
                    >
                        {t('comment.delete')}
                    </Button>
                )}
            </div>
        )
    }, [deleteBtn, firstOption, t])

    return (
        <>
            <ReactModal
                isOpen={deleteModalOpen}
                onRequestClose={() => setDeleteModalOpen(false)}
                className={'modal'}
                ariaHideApp={false}
                overlayClassName={cx('overlay')}
                closeTimeoutMS={200}
            >
                <div className={cx('delete-modal')}>
                    <p className={cx('delete-title')}>{t(`comment.${title.toLowerCase()}`)}</p>
                    <Button
                        className={cx('delete-btn')}
                        onClick={() => {
                            setDeleteModalOpen(false)
                            handleDelete()
                        }}
                    >
                        {t('comment.delete')}
                    </Button>
                    <Button
                        className={cx('cancel-btn')}
                        onClick={() => {
                            setDeleteModalOpen(false)
                        }}
                    >
                        {t('comment.cancel')}
                    </Button>
                </div>
            </ReactModal>
            <PopperEffect
                renderItem={renderOptions}
                hideOnClick={false}
                timeDelayClose={200}
                timeDelayOpen={600}
                offsetX={0}
                offsetY={15}
            >
                <button className={cx('option-btn')}>{children}</button>
            </PopperEffect>
        </>
    )
}

export default memo(DeleteModal)
