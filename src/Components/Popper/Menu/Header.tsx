import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import style from './Menu.module.scss'
import classNames from 'classnames/bind'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(style)

interface Props {
    title: string
    onBack: () => void
}

const Menu: React.FC<Props> = ({ title, onBack }) => {
    return (
        <header className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft as IconProp} />
            </button>
            <h4 className={cx('header-title')}>{title}</h4>
        </header>
    )
}

export default Menu
