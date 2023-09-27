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

    return (
        <Tippy
            interactive
            delay={[0, 400]}
            offset={[4, 8]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex={-1} {...attrs}>
                    <PopperWrapper className={cx('menu-wrapper')}>
                        {history.length > 1 && (
                            <Header
                                title="language"
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
            )}
            onHide={() => {
                setHistory((prev) => {
                    return prev.slice(0, 1)
                })
            }}
        >
            {children}
        </Tippy>
    )
}

export default Menu
