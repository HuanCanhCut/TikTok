import classNames from 'classnames/bind'
import style from './VideoActionItem.module.scss'
import { memo } from 'react'
import Tippy from '@tippyjs/react'
import { useSelector } from 'react-redux'
import { temporaryLiked, temporaryUnLiked } from '~/redux/selectors'
import { VideoListModal } from '../../VideoItem'

const cx = classNames.bind(style)

const defaultFN = () => {}

interface Item {
    type: string
    value: number
    icon: React.ReactNode
    toolTip?: string
    disabled?: boolean
}

interface Props {
    data: VideoListModal
    item: Item
    onChose: (type: string) => void
}

const VideoActionItem: React.FC<Props> = ({ item, data, onChose = defaultFN }) => {
    const temporaryLikeList = useSelector(temporaryLiked)
    const temporaryUnLikeList = useSelector(temporaryUnLiked)

    const isLiked = () => {
        if (data.is_liked || temporaryLikeList.includes(data.id)) {
            if (temporaryUnLikeList.includes(data.id)) {
                return false
            }
            return true
        }
    }

    const classes = {
        isLike: isLiked(),
    }

    return (
        <>
            {item.toolTip ? (
                <>
                    <Tippy content={item.toolTip}>
                        <button
                            className={cx('wrapper', classes)}
                            onClick={() => {
                                onChose(item.type)
                            }}
                        >
                            {item.icon}
                        </button>
                    </Tippy>
                    <strong className={cx('value')}>{item.value}</strong>
                </>
            ) : (
                <>
                    <button
                        disabled={item.disabled}
                        className={cx('wrapper', classes)}
                        data-type={item.type}
                        onClick={() => {
                            onChose(item.type)
                        }}
                    >
                        {item.icon}
                    </button>
                    <strong className={cx('value')}>{item.value}</strong>
                </>
            )}
        </>
    )
}

export default memo(VideoActionItem)
