export default interface Action {
    type: string
    payload: object
    meta?: {
        showLoader?: boolean
    }
}
