import classNames from 'classnames/bind'
import style from './EditProfileModal.module.scss'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FileUploadModal } from '~/pages/Upload/Upload'

import * as userServices from '~/services/userService'
import { UserModal } from '~/modal/modal'
import Image from '~/Components/Images/Image'
import { useReducer } from 'react'
import { Reducer } from 'redux'
import { useLocation } from 'react-router-dom'
import Button from '~/Components/Button'
import { showToast } from '~/project/services'

const cx = classNames.bind(style)

interface Props {
    currentUser: UserModal
    setProfileIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    file?: FileUploadModal
    setFile: React.Dispatch<React.SetStateAction<FileUploadModal | undefined>>
}

interface Field {
    type: string
    label: string
    value: string
    description?: string
}

const reducer: Reducer<any, any> = (state, action) => {
    switch (action.type) {
        case 'tiktok-id':
            return state.map((item: Field) => {
                if (item.type === 'tiktok-id') {
                    return { ...item, value: action.payload }
                }
                return item
            })
        case 'name':
            return state.map((item: Field) => {
                if (item.type === 'name') {
                    return { ...item, value: action.payload }
                }
                return item
            })
        case 'bio':
            return state.map((item: Field) => {
                if (item.type === 'bio') {
                    return { ...item, value: action.payload }
                }
                return item
            })
        default:
            break
    }
}

const EditProfileModal: React.FC<Props> = ({ currentUser, setProfileIsOpen, file, setFile }) => {
    const { t } = useTranslation()
    const accessToken = JSON.parse(localStorage.getItem('token')!)

    const { pathname } = useLocation()

    let fields: Field[] = [
        {
            type: 'tiktok-id',
            label: 'Tiktok ID',
            value: currentUser.nickname,
            description: 'tiktok id description',
        },
        {
            type: 'name',
            label: 'Name',
            value: `${currentUser.first_name} ${currentUser.last_name}`,
            description: 'name description',
        },
        {
            type: 'bio',
            label: 'Bio',
            value: currentUser.bio,
        },
    ]

    const [field, dispatch] = useReducer(reducer, fields)

    const handleCloseModal = () => {
        setProfileIsOpen(false)
    }

    const handleChangeImage = (e: any) => {
        const file = e.target.files[0]
        setFile(file)

        if (file) {
            URL.revokeObjectURL(file.preview)
            file.preview = URL.createObjectURL(file)
        }
    }

    const handleChange = (e: any, item: Field) => {
        if (e.target.name === 'textarea') {
            if (e.target.value.length > 80) {
                return
            }
        }
        dispatch({ type: item.type, payload: e.target.value })
    }

    const handleUpdateProfile = async () => {
        let first_name, last_name, bio

        const formData = new FormData()

        for (let i = 0; i < field.length; ++i) {
            switch (field[i].type) {
                case 'name':
                    const fullNameArr = field[i].value.split(' ')
                    const middleIndex = Math.floor(fullNameArr.length / 2)

                    first_name = fullNameArr.slice(0, middleIndex).join(' ')
                    last_name = fullNameArr.slice(middleIndex).join(' ')
                    break
                case 'bio':
                    bio = field[i].value
                    break
                default:
                    break
            }
        }

        formData.append('first_name', first_name)
        formData.append('last_name', last_name)
        formData.append('bio', bio)
        if (file) {
            formData.append('avatar', file)
        }
        formData.append('gender', 'male')
        formData.append('date_of_birth', '2005-01-14')
        formData.append('website_url', 'https://fullstack.edu.vn/')

        try {
            handleCloseModal()
            const response = await userServices.updateCurrentUser({ accessToken, formData, _method: 'PATCH' })
            if (response) {
                file && URL.revokeObjectURL(file.preview)

                showToast({ message: t('profile.editprofile.profile has been updated') })

                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h1>{t('profile.edit profile')}</h1>
                <span className={cx('close-modal')} onClick={handleCloseModal}>
                    <FontAwesomeIcon icon={faXmark as IconProp} />
                </span>
            </header>
            <div className={cx('body')}>
                <div className={cx('profile-image')}>
                    <h4 className={cx('label')}>{t('profile.editprofile.profile image')}</h4>

                    <div className={cx('image-container')}>
                        <label htmlFor="change-image">
                            <Image
                                src={file?.preview ? file.preview : currentUser.avatar}
                                alt=""
                                className={cx('image')}
                            />
                        </label>
                        <label htmlFor="change-image" className={cx('chose-image')} aria-label="change-image">
                            <FontAwesomeIcon icon={faPenToSquare as IconProp} />
                        </label>
                        <input
                            accept="image/*"
                            type="file"
                            name=""
                            id="change-image"
                            hidden
                            onChange={handleChangeImage}
                        />
                    </div>
                </div>
                {field.map((item: Field, index: number) => {
                    return (
                        <div className={cx('field')} key={index}>
                            <div className={cx('label-container')}>
                                <h4 className={cx('label')}>{item.label}</h4>
                            </div>
                            <div className={cx('input-container')}>
                                {item.type === 'bio' ? (
                                    <textarea
                                        className={cx('input-field', 'input-field-textarea')}
                                        name="textarea"
                                        value={item.value}
                                        onChange={(e) => {
                                            handleChange(e, item)
                                        }}
                                    ></textarea>
                                ) : (
                                    <input
                                        className={cx('input-field')}
                                        type="text"
                                        value={item.value}
                                        onChange={(e) => {
                                            handleChange(e, item)
                                        }}
                                    />
                                )}
                                {item.type === 'tiktok-id' && (
                                    <p className={cx('preview')}>{`${window.location.href.replace(
                                        pathname,
                                        ''
                                    )}/user/@${item.value}`}</p>
                                )}
                                <p className={cx('description')}>
                                    {item.type === 'bio'
                                        ? `${item.value.length}/80`
                                        : item.description &&
                                          t(`profile.editprofile.${item.description.toLowerCase()}`)}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={cx('action')}>
                <Button rounded onClick={handleCloseModal}>
                    {t('profile.editprofile.cancel')}
                </Button>
                <Button primary onClick={handleUpdateProfile}>
                    {t('profile.editprofile.save')}
                </Button>
            </div>
        </div>
    )
}

export default EditProfileModal
