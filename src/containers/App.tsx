import React, { ReactNode } from 'react'
import { connect } from 'react-redux'
import todosSortByUrgencySelector from '../redux/selectors/todosSortByUrgency.selector'
import Todo from '../interfaces/todo.interface'
import State from '../interfaces/state.interface'
import TodoList from '../components/TodoList'
import { fetchTodos } from '../redux/actions/todos.actions'
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

    /**
     * @param {Object} todo
     */
    saveTodo(todo): void {
        const { dispatch } = this.props
        dispatch(saveTodo(todo))
    }

    /**
     * @param {Object} todo
     */
    removeTodo(todo): void {
        const { dispatch } = this.props
        dispatch(removeTodo(todo))
    }

    /**
     * @param {number} id
     */
    addTodo(id): void {
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
    isLoading: state.app.isLoading,
    todos: todosSortByUrgencySelector(state),
})

export default connect(mapStateToProps)(App)
