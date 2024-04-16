import ReactModal from 'react-modal'
import { memo } from 'react'
import { Wrapper as PopperWrapper } from '~/Components/Popper'

interface Props {
    isOpen: boolean
    closeModal: () => void
    children: any
}

const Modal: React.FC<Props> = ({ isOpen, closeModal, children }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            overlayClassName={'overlay'}
            ariaHideApp={false}
            className={'modal'}
            closeTimeoutMS={200}
        >
            <PopperWrapper>{children}</PopperWrapper>
        </ReactModal>
    )
}

export default memo(Modal)
