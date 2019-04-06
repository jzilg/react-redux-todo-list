import { useEffect } from 'react'

function useOnMount(callback, cleanup = undefined): void {
    useEffect(() => {
        callback()
    }, [])
    return cleanup
}

export default useOnMount
