import { HeaderOnly } from '~/Components/Layout'
import Home from '~/pages/Home'
import Following from '~/pages/Following'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'
import Feedback from '~/pages/Feedback/Feedback'
import routerConfig from '~/config/routes'

const publicRoutes = [
    {
        path: routerConfig.home,
        component: Home,
    },
    {
        path: routerConfig.following,
        component: Following,
    },
    {
        path: routerConfig.profile,
        component: Profile,
    },
    {
        path: routerConfig.search,
        component: Feedback,
    },
    {
        path: routerConfig.upload,
        component: Upload,
        layout: HeaderOnly,
    },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
