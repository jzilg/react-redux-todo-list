import Error from './error.interface'

export default interface UiState {
    numOfLoadingRequests: number
    isLoading: boolean
    error: Error
}
