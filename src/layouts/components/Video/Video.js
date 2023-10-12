import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import style from './Video.module.scss'
import Header from './Header'
import VideoItem from '~/Components/VideoItem'

const cx = classNames.bind(style)

function Video({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Header data={data} />
            <VideoItem video={data} />
        </div>
    )
}

Video.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Video
