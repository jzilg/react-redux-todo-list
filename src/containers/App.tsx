import React, { ReactNode } from 'react'
import { connect } from 'react-redux'
import todosSortByUrgencySelector from '../redux/selectors/todosSortByUrgency.selector'
import Todo from '../entities/todo.interface'
import ReduxState from '../redux/interfaces/state.interface'
import TodoList from '../components/todo-list'
import { fetchTodos as fetchTodosActionCreator } from '../redux/actions/fetch-todos.actions'
import { addTodo as addTodoActionCreator } from '../redux/actions/add-todo.actions'
import { saveTodo as saveTodoActionCreator } from '../redux/actions/save-todo.actions'
import { removeTodo as removeTodoActionCreator } from '../redux/actions/remove-todo.actions'

interface Props extends StateProps, DispatchProps {}

class App extends React.Component<Props, {}> {
    componentDidMount(): void {
        const { fetchTodos } = this.props
        fetchTodos()
    }

    addEmptyTodo = (id: number): void => {
        const { addTodo } = this.props
        const emptyTodo = {
            id,
            name: '',
            schedule: 1,
            lastEvent: '',
        }
        addTodo(emptyTodo)
    }

    render(): ReactNode {
        const {
            isLoading,
            todos,
            saveTodo,
            removeTodo,
        } = this.props

        return (
            <TodoList
                todos={todos}
                addEmptyTodo={this.addEmptyTodo}
                saveTodo={saveTodo}
                removeTodo={removeTodo}
                isLoading={isLoading}
            />
        )
    }
}

interface StateProps {
    isLoading: boolean
    todos: Todo[]
}

const mapStateToProps = (state: ReduxState): StateProps => ({
    isLoading: state.ui.isLoading,
    todos: todosSortByUrgencySelector(state),
})

interface DispatchProps {
    fetchTodos: Function
    saveTodo: Function
    removeTodo: Function
    addTodo: Function
}

const mapDispatchToProps = {
    fetchTodos: fetchTodosActionCreator,
    addTodo: addTodoActionCreator,
    saveTodo: saveTodoActionCreator,
    removeTodo: removeTodoActionCreator,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
