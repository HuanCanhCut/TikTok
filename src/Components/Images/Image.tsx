import classNames from 'classnames'
import { useState, forwardRef } from 'react'
import image from '~/assets/images'
import style from './Image.module.scss'

interface Props {
    src?: string
    alt?: string
    className?: string
    fallback?: string
}

const Image = forwardRef<HTMLImageElement, Props>(
    ({ src, alt, className, fallback: customFallback = image.noImage, ...props }, ref) => {
        const [fallback, setFallback] = useState('')

        const handleError = () => {
            setFallback(customFallback)
        }

        return (
            <img
                className={classNames(style.wrapper, className)}
                ref={ref}
                src={fallback || src}
                alt={alt}
                {...props}
                onError={handleError}
            />
        )
    }
)

export default Image
