import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import style from './Video.module.scss'

const cx = classNames.bind(style)

function VideoItem({ video }) {
    const resolutionX = video.meta.video.resolution_x
    const resolutionY = video.meta.video.resolution_y

    const videoSize = resolutionX > resolutionY ? 'row' : 'column'

    return (
        <div className={cx('wrapper', videoSize)}>
            <video src={video.file_url} className={cx('video-item')}></video>
        </div>
    )
}

VideoItem.propTypes = {
    video: PropTypes.object.isRequired,
}

export default VideoItem
