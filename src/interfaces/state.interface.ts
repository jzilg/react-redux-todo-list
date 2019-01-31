import AppState from './app-state.interface'
import Todo from './todo.interface'

export default interface State {
    app: AppState
    todos: Todo[]
}
