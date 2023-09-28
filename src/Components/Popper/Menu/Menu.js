import PropTypes from 'prop-types'
import style from './Menu.module.scss'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'

import { Wrapper as PopperWrapper } from '~/Components/Popper'
import Header from './Header'
import MenuItem from './MenuItem'
import { useState } from 'react'

const cx = classNames.bind(style)

const defaultFn = () => {}

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }])

    const current = history[history.length - 1]

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = Boolean(item.children)

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        // next menu page
                        if (isParent) {
                            setHistory((prev) => {
                                return [...prev, item.children]
                            })
                        } else {
                            onChange(item)
                        }
                    }}
                />
            )
        })
    }

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex={-1} {...attrs}>
            <PopperWrapper className={cx('menu-wrapper')}>
                {history.length > 1 && (
                    <Header
                        title={current.title}
                        onBack={() => {
                            setHistory((prev) => {
                                return prev.slice(0, prev.length - 1)
                            })
                        }}
                    ></Header>
                )}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    )

    // trở về page menu đầu tiên khi menu bị hide
    const handleResetMenu = () => {
        setHistory((prev) => {
            return prev.slice(0, 1)
        })
    }

    return (
        <Tippy
            interactive
            delay={[0, 400]}
            offset={[4, 8]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={renderResult}
            onHide={handleResetMenu}
        >
            {children}
        </Tippy>
    )
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.func,
    onChange: PropTypes.func,
}

export default Menu
