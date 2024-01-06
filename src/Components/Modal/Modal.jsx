import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './Modal.module.scss'
import ReactModal from 'react-modal'
import { Wrapper as PopperWrapper } from '../Popper'
import useDarkMode from '~/hooks/useDarkMode'
import Button from '../Button'

const cx = classNames.bind(style)

function Modal({ isOpen, closeModal, title, description, allow = 'Allow', onAllow = () => {} }) {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            overlayClassName={'overlay'}
            ariaHideApp={false}
            className={'modal'}
        >
            <PopperWrapper>
                <div
                    className={cx('wrapper', {
                        darkMode: useDarkMode(),
                    })}
                >
                    <div className={cx('header')}>
                        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                        <h2 className={cx('title')}>{title}</h2>
                        <p className={cx('description')}>{description}</p>
                    </div>
                    <div className={cx('actions')}>
                        <Button className={cx('action-btn')} rounded onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button className={cx('action-btn', 'allow')} primary onClick={onAllow}>
                            {allow}
                        </Button>
                    </div>
                </div>
            </PopperWrapper>
        </ReactModal>
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
}

export default Modal
