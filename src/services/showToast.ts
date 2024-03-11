import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const showErrorToast = (message: string) => {
    return toast.error(message, {
        className: 'custom-toast',
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    })
}
