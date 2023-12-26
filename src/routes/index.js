import { HeaderOnly } from '~/layouts'
import Home from '~/pages/Home'
import Following from '~/pages/Following'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'
import Feedback from '~/pages/Feedback'
import Live from '~/pages/Live'
import Login from '~/pages/Login'

import config from '~/config'
import NotFound from '~/pages/NotFound'

const allRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.login,
        component: Login,
        layout: null,
    },
    {
        path: config.routes.following,
        component: Following,
    },
    {
        path: config.routes.profile,
        component: Profile,
    },
    {
        path: config.routes.search,
        component: Feedback,
    },
    {
        path: config.routes.live,
        component: Live,
    },
    {
        path: config.routes.notfound,
        component: NotFound,
        layout: null,
    },
    {
        path: config.routes.notfound,
        component: NotFound,
    },
    {
        path: config.routes.upload,
        component: Upload,
        layout: HeaderOnly,
        private: true,
        redirectTo: config.routes.login,
    },
]

export { allRoutes }
