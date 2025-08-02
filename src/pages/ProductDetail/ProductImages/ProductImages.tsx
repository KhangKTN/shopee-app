import cx from 'classix'
import { useRef, useState } from 'react'
import { ImageLoad } from '~/components/Loading'

const NUMBER_IMG_DISPLAY = 5

const ProductImages = ({ images, name }: { images: string[]; name: string }) => {
    const [currentImgIndex, setCurrentImgIndex] = useState(0)
    const [idxSlider, setIdxSlider] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const imageRef = useRef<HTMLImageElement>(null)

    const canPressNext = images.length > NUMBER_IMG_DISPLAY + idxSlider
    const canPressPrev = idxSlider > 0

    const handleZoom = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const img = imageRef.current as HTMLImageElement
        const { naturalHeight, naturalWidth } = img
        img.style.width = naturalWidth + 'px'
        img.style.height = naturalHeight + 'px'
        img.style.maxWidth = 'unset'

        const rect = e.currentTarget.getBoundingClientRect()
        // Get mouse pointer coordinates
        const { offsetX, offsetY } = e.nativeEvent
        const top = offsetY * (1 - naturalHeight / rect.height)
        const left = offsetX * (1 - naturalWidth / rect.width)
        img.style.top = top + 'px'
        img.style.left = left + 'px'
    }

    const handleResetZoom = () => {
        imageRef.current?.removeAttribute('style')
    }

    return (
        <>
            {/* Image main */}
            <div
                onMouseMove={handleZoom}
                onMouseLeave={handleResetZoom}
                className={cx(
                    !loaded && 'animate-pulse',
                    'relative rounded shadow pt-[100%] w-full overflow-hidden hover:cursor-zoom-in'
                )}
            >
                <img
                    ref={imageRef}
                    className={cx(
                        'absolute inset-0 rounded size-full object-cover transition-opacity animate-scale-up-center duration-200 pointer-events-none',
                        loaded ? 'opacity-100' : 'opacity-0'
                    )}
                    src={images[currentImgIndex]}
                    onLoad={() => setLoaded(true)}
                    alt={name}
                    key={images[currentImgIndex]}
                />
            </div>
            {/* List image other */}
            <div className='relative gap-1 grid grid-cols-5 grid-rows-1 mt-4'>
                {images.length > NUMBER_IMG_DISPLAY && (
                    <button
                        disabled={!canPressNext}
                        onClick={() => setIdxSlider(idxSlider + 1)}
                        className={cx(
                            'top-1/2 left-full z-10 absolute flex justify-center items-center bg-black/30 backdrop-blur p-4 rounded-full size-8 transition-all -translate-x-full -translate-y-1/2',
                            canPressNext ? 'hover:bg-black/20 hover:scale-[135%]' : 'opacity-25 cursor-not-allowed'
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
                        <ImageLoad key={e} img={e} />
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
                            'top-1/2 left-0 z-10 absolute flex justify-center items-center bg-black/30 backdrop-blur rounded-full size-8 transition-all -translate-y-1/2',
                            canPressPrev ? 'hover:bg-black/20 hover:scale-[135%]' : 'opacity-25 cursor-not-allowed'
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
