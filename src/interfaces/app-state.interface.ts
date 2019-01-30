import Error from './error.interface'

export default interface AppState {
    isLoading: boolean
    error: Error
}
