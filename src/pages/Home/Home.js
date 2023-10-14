import { memo, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { useContext } from 'react'

import style from './Home.module.scss'
import Video from '~/layouts/components/Video'
import * as videoService from '~/services/videoService'
import { AuthUserContext } from '~/App'
import { Virtuoso } from 'react-virtuoso'

const cx = classNames.bind(style)

const INIT_PAGE = 1
function Home() {
    const [videos, setVideos] = useState([])
    const [page, setPage] = useState(INIT_PAGE)
    const currentUser = useContext(AuthUserContext)
    const accessToken = currentUser && currentUser.meta.token

    useEffect(() => {
        ;(async () => {
            try {
                const response = await videoService.getVideo({
                    type: 'for-you',
                    page: page,
                    accessToken: accessToken,
                })

                setVideos((prev) => {
                    return [...prev, ...response.data]
                })
            } catch (error) {
                console.log(error)
            }
        })()
    }, [page])

    return (
        <div className={cx('wrapper')}>
            <Virtuoso
                data={videos}
                useWindowScroll
                endReached={() => {
                    setPage(page + 1)
                }}
                itemContent={(index, item) => {
                    return <Video key={index} data={item} />
                }}
            />
        </div>
    )
}

export default memo(Home)
