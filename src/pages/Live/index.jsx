import { memo } from 'react'

function Live() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1 style={{ fontSize: '60px' }}>The Api dose not support live viewing</h1>
        </div>
    )
}

export default memo(Live)
