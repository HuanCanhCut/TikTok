import classNames from 'classnames/bind'
import style from './Caption.module.scss'
import { useContext, useRef, useEffect, useState, useCallback, memo, KeyboardEvent } from 'react'
import Tippy from '@tippyjs/react/headless'
import { useTranslation } from 'react-i18next'

import { fileNameContext } from '../../UploadPreview'
import { fileUploadContext } from '~/pages/Upload/Upload'
import { HashTag, Tag } from '~/Components/Icons'
import Input from '~/Components/Input'
import AccountItem from '~/Components/AccountItem'
import * as userServices from '~/services/userService'
import { SearchIcon } from '~/Components/Icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { UserModal } from '~/modal/modal'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const cx = classNames.bind(style)
const maxLength = 2200

function Caption() {
    const { t } = useTranslation()
    const fileName: any = useContext(fileNameContext)
    const { file }: any = useContext(fileUploadContext)

    const inputRef = useRef<HTMLVideoElement | null>(null)
    const scrollItemRef = useRef<HTMLDivElement>(null)
    const accessToken = JSON.parse(localStorage.getItem('token')!)

    const [page, setPage] = useState(1)
    const [followingAccounts, setFollowingAccounts] = useState<UserModal[]>([])
    const [totalPage, setTotalPage] = useState(1)
    const [showAccounts, setShowAccounts] = useState(false)
    const [apiCalling, setApiCalling] = useState(false)

    //Fix: If you click add hashtag and select all then delete, the file name will not be updated.
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener('input', (e: any) => {
                fileName?.setFileName(e.target.value)
                requestIdleCallback(() => {
                    file.description = e.target.value.toString()
                })
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileName])

    const updateFileName = (value: string) => {
        if (fileName?.fileName.length >= maxLength || apiCalling) {
            return
        }

        if (inputRef.current) {
            const inputElement: any = inputRef.current
            const start = inputElement.selectionStart
            const end = inputElement.selectionEnd

            inputElement.focus()

            start && end && inputElement.setRangeText(value, start, end, 'end')
            fileName.setFileName(inputElement.value)
            file.description = inputElement.value.toString()
        }
    }

    const addHashTag = () => {
        updateFileName('#')
    }

    const tagAccount = () => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
        showAccounts ? setShowAccounts(false) : setShowAccounts(true)
    }

    const handleTagFriend = useCallback((nickname: string) => {
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
                requestIdleCallback(async () => {
                    const response = await userServices.getFollowingAccounts({ page, accessToken })
                    if (response) {
                        setTotalPage(response.meta.pagination.total_pages)
                        setFollowingAccounts((prev) => {
                            return [...prev, ...response.data]
                        })
                    }
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
    const handleScroll = (e: any) => {
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

    const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'Escape':
                setShowAccounts(false)
                break
            default:
                break
        }
    }

    return (
        <div className={cx('wrapper')} onKeyDown={handleKeyDown}>
            <div className={cx('caption')}>
                <span className={cx('caption-title')}>
                    {showAccounts ? `@${t('upload.preview.friends')}` : t('upload.preview.caption')}
                </span>
                <span className={cx('caption-length')}>{`${fileName.fileName.length} / ${maxLength}`}</span>
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
                                <span className={cx('following-title')}>{t('upload.preview.following')}</span>
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
                        value={file ? fileName.fileName : ''}
                        onChange={(e) => {
                            fileName.setFileName(e.target.value)
                            file.description = e.target.value.toString()
                        }}
                        maxLength={maxLength}
                        type="text"
                        className={cx('input')}
                        leftIcon={showAccounts && <SearchIcon width="20" />}
                        rightIcon={showAccounts && <FontAwesomeIcon icon={faX as IconProp} />}
                        onClickRightIcon={tagAccount}
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
