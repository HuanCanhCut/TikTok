import { useSelector } from 'react-redux'
import { themeSelector } from '~/redux/selectors'

const useDarkMode = () => {
    const isDarkMode = useSelector(themeSelector)
    return isDarkMode
}

export default useDarkMode
