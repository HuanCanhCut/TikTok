import { HeaderOnly } from '~/Components/Layout'

import Home from '~/pages/Home'
import Following from '~/pages/Following'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'
import Feedback from '~/pages/Feedback/Feedback'

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/following',
        component: Following,
    },
    {
        path: '/:nickname',
        component: Profile,
    },
    {
        path: '/feedback',
        component: Feedback,
    },
    {
        path: '/upload',
        component: Upload,
        layout: HeaderOnly,
    },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
