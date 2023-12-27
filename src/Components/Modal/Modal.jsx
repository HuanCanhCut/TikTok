import classNames from 'classnames/bind'
import style from './Modal.module.scss'
import { Wrapper as PopperWrapper } from '../Popper'

const cx = classNames.bind(style)

function Modal() {
    return <PopperWrapper></PopperWrapper>
}

export default Modal
