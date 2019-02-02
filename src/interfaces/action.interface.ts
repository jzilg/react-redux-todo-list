export default interface Action {
    type: string
    payload?: object
    meta?: {
        entity: string
    }
}
