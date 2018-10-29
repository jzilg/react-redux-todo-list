import { API } from '../middleware/api.middleware'
import getApiOptions from '../api-options'

export const REQUEST_TODOS = `${API}_REQUEST_TODOS`
export const RECEIVE_TODOS = 'RECEIVE_TODOS'

const receiveTodos = todos => ({
    type: RECEIVE_TODOS,
    payload: {
        todos,
    },
})

export const fetchTodos = () => {
    const url = `${BACKEND_URL}/todos`
    const options = getApiOptions('GET')

    return {
        type: REQUEST_TODOS,
        payload: {
            url,
            options,
            successAction: receiveTodos,
        },
    }
}
