import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './VideoActionItem.module.scss'
import { memo } from 'react'
import Tippy from '@tippyjs/react'
import { useSelector } from 'react-redux'
import { temporaryLiked, temporaryUnLiked } from '~/redux/selectors'

const cx = classNames.bind(style)

const defaultFN = () => {}
function VideoActionItem({ item, data, onChose = defaultFN }) {
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
                        className={cx('wrapper', classes)}
                        onClick={() => {
                            onChose(item.type)
                        }}
                        type={item.type}
                    >
                        {item.icon}
                    </button>
                    <strong className={cx('value')}>{item.value}</strong>
                </>
            )}
        </>
    )
}

VideoActionItem.propTypes = {
    item: PropTypes.object.isRequired,
}

export default memo(VideoActionItem)
