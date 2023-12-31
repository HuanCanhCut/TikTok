import { memo } from 'react'

function Live() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'calc(100vh - 60px)',
                textAlign: 'center',
                paddingLeft: 50,
                paddingRight: 50,
            }}
        >
            <h1 style={{ fontSize: '70px' }}>The API don't support live viewing.</h1>
        </div>
    )
}

export default memo(Live)
