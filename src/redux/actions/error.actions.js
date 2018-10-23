export const RECEIVE_ERROR = 'RECIEVE_ERROR'

export function receiveError(error) {
    return {
        error,
        type: RECEIVE_ERROR,
    }
}
