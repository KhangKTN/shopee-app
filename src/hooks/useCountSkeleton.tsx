const useCountSkeleton = () => {
    const windowWidth = window.innerWidth

    if (windowWidth >= 1280) {
        return 5
    }
    if (windowWidth >= 1024) {
        return 4
    }
    if (windowWidth >= 640) {
        return 3
    }
    return 2
}

export default useCountSkeleton
