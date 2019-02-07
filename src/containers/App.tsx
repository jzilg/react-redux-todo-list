import React, { ReactNode } from 'react'
import { connect } from 'react-redux'
import todosSortByUrgencySelector from '../redux/selectors/todosSortByUrgency.selector'
import Todo from '../interfaces/todo.interface'
import State from '../redux/interfaces/state.interface'
import TodoList from '../components/TodoList'
import { fetchTodos } from '../redux/actions/fetch-todos.actions'
import { addTodo } from '../redux/actions/add-todo.actions'
import { saveTodo } from '../redux/actions/save-todo.actions'
import { removeTodo } from '../redux/actions/remove-todo.actions'

interface AppProps extends AppStateProps {
    dispatch: Function
}

class App extends React.Component<AppProps, {}> {
    constructor(props) {
        super(props)
        this.addTodo = this.addTodo.bind(this)
        this.saveTodo = this.saveTodo.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
    }

    componentDidMount(): void {
        const { props } = this
        props.dispatch(fetchTodos())
    }

    saveTodo(todo: Todo): void {
        const { dispatch } = this.props
        dispatch(saveTodo(todo))
    }

    removeTodo(todo: Todo): void {
        const { dispatch } = this.props
        dispatch(removeTodo(todo))
    }

    addTodo(id: number): void {
        const { dispatch } = this.props
        const emptyTodo = {
            id,
            name: '',
            schedule: 1,
            lastEvent: '',
        }

        dispatch(addTodo(emptyTodo))
    }

    render(): ReactNode {
        const { isLoading, todos } = this.props

        return (
            <TodoList
                todos={todos}
                addTodo={this.addTodo}
                saveTodo={this.saveTodo}
                removeTodo={this.removeTodo}
                isLoading={isLoading}
            />
        )
    }
}

interface AppStateProps {
    isLoading: boolean
    todos: Todo[]
}

const mapStateToProps = (state: State): AppStateProps => ({
    isLoading: state.ui.isLoading,
    todos: todosSortByUrgencySelector(state),
})

export default connect(mapStateToProps)(App)
