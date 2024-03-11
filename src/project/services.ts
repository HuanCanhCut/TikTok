import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const removeDuplicate = (duplicateStore: number[], duplicateValue: number) => {
    if (duplicateStore.includes(duplicateValue)) {
        for (var i = duplicateStore.length - 1; i >= 0; i--) {
            if (duplicateStore[i] === duplicateValue) {
                duplicateStore.splice(i, 1)
            }
        }
    }
    return duplicateStore
}

export const showToast = ({ message }: { message: string }) => {
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
