const routerConfig = {
    home: '/',
    login: '/login',
    comment: '/:user/video/:uuid-video',
    following: '/following',
    profile: '/user/:nickName',
    search: '/feedback',
    upload: '/upload',
    live: '/live',
    notfound: '*',
}

export default routerConfig
