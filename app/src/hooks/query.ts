import { useLocation } from 'react-router-dom'

export const useQueryParams = (...args: string[]) => {
    const location = useLocation()
    const params = []
    const query = new URLSearchParams(location.search)
    for (const key of args) {
        params.push(query.get(key))
    }
    return params
}
