import { UiState } from '../reducers/ui.reducer'
import { TodosState } from '../reducers/todos.reducer'

export default interface State {
    ui: UiState
    todos: TodosState
}
