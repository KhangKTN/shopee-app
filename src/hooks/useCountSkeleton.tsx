import { useEffect, useState } from 'react'

const useCountSkeleton = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const onResize = () => {
            const windowWidth = window.innerWidth
            if (windowWidth >= 1280) {
                setCount(5)
                return
            }
            if (windowWidth >= 1024) {
                setCount(4)
                return
            }
            if (windowWidth >= 640) {
                setCount(3)
                return
            }
            setCount(2)
        }
        onResize()
        window.addEventListener('resize', onResize)
    }, [])

    return count
}

export default useCountSkeleton
