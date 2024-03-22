import classNames from 'classnames/bind'
import style from './FrameLoginSidebar.module.scss'
import { useTranslation } from 'react-i18next'
import Button from '~/Components/Button'
import { sendEvent } from '~/helpers/event'

const cx = classNames.bind(style)

function FrameLoginSidebar() {
    const { t } = useTranslation()

    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>{t('sidebar.frame login title')}</p>
            <Button
                outline
                className={cx('login')}
                onClick={() => {
                    sendEvent({ eventName: 'auth:open-auth-modal', detail: true })
                }}
            >
                {t('sidebar.login')}
            </Button>
        </div>
    )
}

export default FrameLoginSidebar
