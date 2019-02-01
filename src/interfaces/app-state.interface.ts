import Error from './error.interface'

export default interface AppState {
    numOfLoadingRequests: number
    isLoading: boolean
    error: Error
}
