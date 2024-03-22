import HeadlessTippy from '@tippyjs/react/headless'
import { useEffect, useState, useRef, memo } from 'react'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { useTranslation } from 'react-i18next'

import * as searchService from '~/services/searchService'
import { Wrapper as PopperWrapper } from '~/Components/Popper'
import AccountItem from '~/Components/AccountItem'
import style from './Search.module.scss'
import classNames from 'classnames/bind'
import { SearchIcon } from '~/Components/Icons'
import useDebounce from '~/hooks/useDebounce'
import { UserModal } from '~/modal/modal'

const cx = classNames.bind(style)

function Search() {
    const { t } = useTranslation()
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchResult, setSearchResult] = useState<Array<UserModal>>([])
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

    const debounceValue = useDebounce(searchValue, 500)

    const inputRef = useRef<HTMLInputElement | null>(null)

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
        inputRef.current && inputRef.current.focus()
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
                            <h4 className={cx('search-title')}>{t('header.account')}</h4>
                            {searchResult.map((result) => {
                                return <AccountItem key={result.id} data={result} to={`/user/@${result.nickname}`} />
                            })}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        placeholder={t('header.search placeholder')}
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
                            <FontAwesomeIcon icon={faCircleXmark as IconProp} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner as IconProp} />}
                    <div className={cx('seperate')}></div>
                    <button
                        className={cx('search-btn')}
                        onMouseDown={(e) => {
                            e.preventDefault()
                        }}
                    >
                        <SearchIcon className={cx('search-btn-icon')} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    )
}

export default memo(Search)
