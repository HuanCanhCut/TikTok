import { useSelector } from 'react-redux'
import { themeSelector } from '~/redux/selectors'

const useDarkMode = () => {
    return useSelector(themeSelector)
}

export default useDarkMode
