import { useSearchParams } from 'react-router-dom'

const useQueryParam = () => {
    const [searchParam] = useSearchParams()
    return Object.fromEntries([...searchParam])
}

export default useQueryParam
