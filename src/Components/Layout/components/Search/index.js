import HeadlessTippy from '@tippyjs/react/headless'
import { useEffect, useState, useRef } from 'react'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Wrapper as PopperWrapper } from '~/Components/Popper'
import AccountItem from '~/Components/AccountItem'
import style from './Search.module.scss'
import classNames from 'classnames/bind'
import { SearchIcon } from '~/Components/Icons'

const cx = classNames.bind(style)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

    const inputRef = useRef()

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([])
            return
        }

        setLoading(true)
        ;(async function () {
            try {
                const reponse = await fetch(
                    `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`
                )
                const result = await reponse.json()
                setSearchResult(result.data)
                setLoading(false)
            } catch {
                console.error('Failed to fetch')
            }
        })()
    }, [searchValue])

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setShowResult(false)
    }

    return (
        <HeadlessTippy
            interactive
            appendTo={() => {
                return document.body
            }}
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex={-1} {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Account</h4>
                        {searchResult.map((result) => {
                            return <AccountItem key={result.id} data={result} />
                        })}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    placeholder="Search account and videos"
                    spellCheck={false}
                    value={searchValue}
                    onChange={(e) => {
                        e.target.value = e.target.value.trimStart()
                        setSearchValue(e.target.value)
                    }}
                    onFocus={() => {
                        setShowResult(true)
                    }}
                />
                {Boolean(searchValue) && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    )
}

export default Search
