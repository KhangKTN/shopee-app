import cx from 'classix'
import { useState } from 'react'

interface Prop {
    img: string
}

const ImageLoad = ({ img }: Prop) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <div className={cx('absolute inset-0 bg-gray-300', !loaded && 'animate-pulse')}>
            <img
                onLoad={() => setLoaded(true)}
                className={cx(
                    'size-full object-cover transition-opacity duration-200',
                    loaded ? 'opacity-100' : 'opacity-0'
                )}
                src={img}
                alt={img}
            />
        </div>
    )
}

export default ImageLoad
