import classNames from 'classnames/bind'
import style from './Caption.module.scss'
import { useContext, useRef, useEffect, useState, useCallback, memo } from 'react'
import useDarkMode from '~/hooks/useDarkMode'
import Tippy from '@tippyjs/react/headless'

import { currentUserData } from '~/App'
import { fileNameContext } from '../../UploadPreview'
import { fileUploadContext } from '~/pages/Upload/Upload'
import { HashTag, Tag } from '~/Components/Icons'
import Input from '~/Components/Input'
import AccountItem from '~/Components/AccountItem'
import * as userServices from '~/services/userService'
import { SearchIcon } from '~/Components/Icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(style)
const maxLength = 2200

function Caption() {
    const currentUser = useContext(currentUserData)
    const { fileName, setFileName } = useContext(fileNameContext)
    const { file } = useContext(fileUploadContext)

    const inputRef = useRef(null)
    const scrollItemRef = useRef(null)
    const accessToken = currentUser && currentUser.meta.token

    const [page, setPage] = useState(1)
    const [followingAccounts, setFollowingAccounts] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [showAccounts, setShowAccounts] = useState(false)
    const [apiCalling, setApiCalling] = useState(false)

    //Fix: If you click add hashtag and select all then delete, the file name will not be updated.
    useEffect(() => {
        inputRef.current.addEventListener('input', (e) => {
            setFileName(e.target.value)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileName])

    const updateFileName = (value) => {
        if (fileName.length >= maxLength) {
            return
        }

        if (apiCalling) {
            return
        }

        const inputElement = inputRef.current
        const start = inputElement.selectionStart
        const end = inputElement.selectionEnd

        inputElement.focus()
        inputElement.setRangeText(value, start, end, 'end')
        setFileName(inputElement.value)
    }

    const addHashTag = () => {
        updateFileName('#')
    }

    const tagAccount = () => {
        showAccounts ? setShowAccounts(false) : setShowAccounts(true)
    }

    const handleTagFriend = useCallback((nickname) => {
        updateFileName(` @${nickname}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        ;(async () => {
            if (page > totalPage) {
                return
            }

            setApiCalling(true)

            try {
                const response = await userServices.getFollowingAccounts(page, accessToken)
                setTotalPage(response.meta.pagination.total_pages)
                setFollowingAccounts((prev) => {
                    return [...prev, ...response.data]
                })
            } catch (error) {
                console.log(error)
            } finally {
                setApiCalling(false)
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, page])

    // bug
    const handleScroll = (e) => {
        if (!scrollItemRef.current || apiCalling) {
            return
        }

        // Adding 80px when scrolling down near the bottom will setPage to call the api
        if (e.target.scrollTop + e.target.offsetHeight + 80 > scrollItemRef.current.offsetHeight) {
            if (page < totalPage) {
                setPage(page + 1)
            }
        }
    }

    return (
        <div
            className={cx('wrapper', {
                darkMode: useDarkMode(),
            })}
        >
            <div className={cx('caption')}>
                <span className={cx('caption-title')}>{showAccounts ? '@Friends' : 'Caption'}</span>
                <span className={cx('caption-length')}>{`${fileName.length} / ${maxLength}`}</span>
            </div>
            <Tippy
                interactive
                visible={showAccounts}
                onClickOutside={tagAccount}
                placement="bottom-start"
                offset={[0, 2]}
                render={(attrs) => (
                    <div className={cx('tag-friend-wrapper')} tabIndex={-1} {...attrs}>
                        <div className={cx('tag-friend')} onScroll={handleScroll}>
                            <div ref={scrollItemRef}>
                                <span className={cx('following-title')}>Following</span>
                                {followingAccounts.map((account, index) => (
                                    <AccountItem data={account} key={index} onClick={handleTagFriend} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            >
                <div className={cx('input-wrapper')}>
                    <Input
                        ref={inputRef}
                        value={file ? fileName : ''}
                        onChange={(e) => {
                            setFileName(e.target.value)
                        }}
                        maxLength={maxLength}
                        type="text"
                        className={cx('input')}
                        leftIcon={showAccounts && <SearchIcon width="20" />}
                        rightIcon={showAccounts && <FontAwesomeIcon icon={faX} />}
                        rightClick={tagAccount}
                    />
                    {showAccounts || (
                        <div className={cx('input-action')}>
                            <button className={cx('tag')} onClick={tagAccount}>
                                <Tag width="1.8rem" />
                            </button>
                            <button className={cx('hashtag')} onClick={addHashTag}>
                                <HashTag width="2rem" />
                            </button>
                        </div>
                    )}
                </div>
            </Tippy>
        </div>
    )
}

export default memo(Caption)
