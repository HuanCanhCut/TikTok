import HeadlessTippy from '@tippyjs/react/headless'
import { useEffect, useState, useRef } from 'react'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as searchService from '~/services/searchService'
import { Wrapper as PopperWrapper } from '~/Components/Popper'
import AccountItem from '~/Components/AccountItem'
import style from './Search.module.scss'
import classNames from 'classnames/bind'
import { SearchIcon } from '~/Components/Icons'
import useDebounce from '~/hooks/useDebounce'

const cx = classNames.bind(style)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

    const debounceValue = useDebounce(searchValue, 500)

    const inputRef = useRef()

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([])
            return
        }

        ;(async function () {
            try {
                setLoading(true)

                const result = await searchService.search(debounceValue)
                setSearchResult(result)

                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        })()
    }, [debounceValue])

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setShowResult(false)
    }

    return (
        //  Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive
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
                    <button
                        className={cx('search-btn')}
                        onMouseDown={(e) => {
                            e.preventDefault()
                        }}
                    >
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    )
}

export default Search
