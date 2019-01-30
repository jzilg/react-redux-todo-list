import AppState from './app-state.interface'
import TodosState from './todos-state.interface'

export default interface State {
    app: AppState
    todos: TodosState
}
