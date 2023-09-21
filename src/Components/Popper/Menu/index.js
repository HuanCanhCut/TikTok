import Tippy from '@tippyjs/react/headless'
import style from './Menu.module.scss'
import classNames from 'classnames/bind'
import { Wrapper as PopperWrapper } from '~/Components/Popper'
import MenuItem from './MenuItem'

const cx = classNames.bind(style)

function Menu({ children, items = [] }) {
    const renderItems = () => {
        return items.map((item, index) => {
            return <MenuItem key={index} data={item} />
        })
    }

    return (
        <Tippy
            interactive
            delay={[0, 700]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex={-1} {...attrs}>
                    <PopperWrapper className={cx('menu-wrapper')}>{renderItems()}</PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    )
}

export default Menu
