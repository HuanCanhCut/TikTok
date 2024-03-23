import classNames from 'classnames/bind'
import style from './Modal.module.scss'
import ReactModal from 'react-modal'
import { Wrapper as PopperWrapper } from '~/Components/Popper'
import Button from '../Button'

const cx = classNames.bind(style)

interface Props {
    isOpen: boolean
    closeModal: () => void
    title: string
    description: string
    allowTitle?: string
    cancelTitle?: string
    vertical?: boolean
    onAllow: () => void
}

const Modal: React.FC<Props> = ({
    isOpen,
    closeModal,
    title,
    description,
    allowTitle = 'Allow',
    cancelTitle = 'Cancel',
    vertical = false,
    onAllow = () => {},
}) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            overlayClassName={'overlay'}
            ariaHideApp={false}
            className={'modal'}
            closeTimeoutMS={200}
        >
            <PopperWrapper>
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                        <h2 className={cx('title')}>{title}</h2>
                        <p className={cx('description')}>{description}</p>
                    </div>
                    <div
                        className={cx('actions', {
                            directionButton: vertical,
                        })}
                    >
                        <Button className={cx('action-btn', 'cancel')} roundedOutline onClick={closeModal}>
                            {cancelTitle}
                        </Button>
                        <Button className={cx('action-btn', 'allow')} primary onClick={onAllow}>
                            {allowTitle}
                        </Button>
                    </div>
                </div>
            </PopperWrapper>
        </ReactModal>
    )
}

export default Modal
