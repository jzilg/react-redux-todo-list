import { FETCH_TODOS, TODOS, setTodos } from '../actions/todos.actions'
import MiddlewareCreator from '../../interfaces/middleware-creator.interface'
import { API_ERROR, API_SUCCESS, apiRequest } from '../actions/api.actions'
import { setIsLoading } from '../actions/app.actions'
import BACKEND_URL from '../../constants/api'
import { receiveError } from '../actions/error.actions'

const todosMiddleware = ({ dispatch }): MiddlewareCreator => next => (action) => {
    next(action)

    switch (action.type) {
        case FETCH_TODOS: {
            const { entity } = action.meta
            dispatch(setIsLoading(true, entity))

            const url = `${BACKEND_URL}/todos`
            dispatch(apiRequest(url, 'GET', null, entity))

            break
        }
        case `${TODOS} ${API_SUCCESS}`: {
            const { entity } = action.meta
            dispatch(setTodos(action.payload.response))
            dispatch(setIsLoading(false, entity))
            break
        }
        case `${TODOS} ${API_ERROR}`: {
            const { entity } = action.meta
            dispatch(receiveError(action.payload.error))
            dispatch(setIsLoading(false, entity))
            break
        }
        default:
    }
}

export default todosMiddleware
