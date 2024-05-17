import classNames from 'classnames/bind'
import style from './VideoActionItem.module.scss'
import { memo } from 'react'
import { VideoModal } from '~/modal/modal'
import Share from '~/Components/Share/Share'

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
    video: VideoModal
    item: Item
    onChose: (type: string) => void
    temporaryLikeList: number[]
    temporaryUnLikeList: number[]
}

const VideoActionItem: React.FC<Props> = ({
    item,
    video,
    onChose = defaultFN,
    temporaryLikeList,
    temporaryUnLikeList,
}) => {
    const isLiked = () => {
        if (video.is_liked || temporaryLikeList.includes(video.id)) {
            if (temporaryUnLikeList.includes(video.id)) {
                return false
            }
            return true
        }
    }

    const renderItem = (item: Item) => {
        return (
            <div
                style={{
                    color: isLiked() && item.type === 'like' ? 'var(--primary)' : '',
                    cursor: item.disabled ? 'not-allowed' : 'pointer',
                }}
                className={cx('wrapper')}
                onClick={() => {
                    onChose(item.type)
                }}
            >
                {item.icon}
            </div>
        )
    }

    return (
        <>
            {/* 
                Hãy để cái này là thẻ div, tâm linh lắm, nếu bạn thay đổi thành thẻ button thì
                khi mở comment -> next/prev 1 vài video -> đóng comment thì sẽ thấy nó scroll loạn xì
                ngậu lên. Tâm linh không đùa được đâu
             */}
            {item.type === 'share' ? (
                <Share copyValue={`${window.location.href}@${video.user.nickname}/video/${video.uuid}`}>
                    {renderItem(item)}
                </Share>
            ) : (
                renderItem(item)
            )}
            <strong className={cx('value')}>{item.value}</strong>
        </>
    )
}

export default memo(VideoActionItem)
