import cx from 'classix'
import { useState } from 'react'

const NUMBER_IMG_DISPLAY = 5

const ImageLoad = ({ img }: { img: string }): React.ReactNode => {
    const [loaded, setLoaded] = useState(false)

    return (
        <div className={cx('absolute inset-0 bg-gray-200', !loaded && 'animate-pulse')}>
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

const ProductImages = ({ images, name }: { images: string[]; name: string }) => {
    const [currentImgIndex, setCurrentImgIndex] = useState(0)
    const [idxSlider, setIdxSlider] = useState(0)

    const canPressNext = images.length > NUMBER_IMG_DISPLAY + idxSlider
    const canPressPrev = idxSlider > 0

    return (
        <>
            <div className='relative shadow pt-[100%] rounded w-full overflow-hidden'>
                <img
                    className='absolute inset-0 size-full object-cover animate-scale-up-center'
                    src={images[currentImgIndex]}
                    alt={name}
                    key={images[currentImgIndex]}
                />
            </div>
            <div className='relative gap-1 grid grid-cols-5 grid-rows-1 mt-4'>
                {images.length > NUMBER_IMG_DISPLAY && (
                    <button
                        disabled={!canPressNext}
                        onClick={() => setIdxSlider(idxSlider + 1)}
                        className={cx(
                            'top-1/2 left-full z-10 absolute flex justify-center items-center bg-black/30 backdrop-blur p-4 rounded-full size-8 transition-colors -translate-x-full -translate-y-1/2',
                            canPressNext ? 'hover:bg-black/20' : 'opacity-25 cursor-not-allowed'
                        )}
                    >
                        <i className='fa-chevron-right text-white fa-solid'></i>
                    </button>
                )}
                {images.slice(idxSlider, idxSlider + NUMBER_IMG_DISPLAY).map((e, idx) => (
                    <div
                        key={e + idx}
                        onClick={() => setCurrentImgIndex(idx + idxSlider)}
                        className='relative shadow pt-[100%] w-full cursor-pointer'
                    >
                        <ImageLoad img={e} />
                        {idx + idxSlider === currentImgIndex && (
                            <div className='absolute inset-0 bg-transparent border-2 border-primary w-full h-full'></div>
                        )}
                    </div>
                ))}
                {images.length > NUMBER_IMG_DISPLAY && (
                    <button
                        disabled={!canPressPrev}
                        onClick={() => setIdxSlider(idxSlider - 1)}
                        className={cx(
                            'top-1/2 left-0 z-10 absolute flex justify-center items-center bg-black/30 backdrop-blur rounded-full size-8 transition-colors -translate-y-1/2',
                            canPressPrev ? 'hover:bg-black/20' : 'opacity-25 cursor-not-allowed'
                        )}
                    >
                        <i className='fa-chevron-left text-white fa-solid'></i>
                    </button>
                )}
            </div>
        </>
    )
}

export default ProductImages
