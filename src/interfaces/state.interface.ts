import UiState from './ui-state.interface'
import Todo from './todo.interface'

export default interface State {
    ui: UiState
    todos: Todo[]
}
