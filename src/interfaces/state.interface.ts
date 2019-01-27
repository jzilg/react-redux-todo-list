import Error from './error.interface'
import Todo from './todo.interface'

export default interface State {
    app: {
        isLoading: boolean
        error: Error
    }
    todos: Todo[]
}
