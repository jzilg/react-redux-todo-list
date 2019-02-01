export default interface Action {
    type: string
    payload?: object
    meta?: {
        api?: {
            url: string
            method: string
            body?: string
            successAction: Function
        }
        showLoader?: boolean
    }
}
