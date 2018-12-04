import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import todosSortByUrgencySelector from '../redux/selectors/todosSortByUrgency.selector'
import List from '../components/List'
import { fetchTodos } from '../redux/actions/fetch-todos.actions'
import { addTodo } from '../redux/actions/add-todo.actions'
import { saveTodo } from '../redux/actions/save-todo.actions'
import { removeTodo } from '../redux/actions/remove-todo.actions'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.addTodo = this.addTodo.bind(this)
        this.saveTodo = this.saveTodo.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
    }

    componentDidMount() {
        const { props } = this
        props.dispatch(fetchTodos())
    }

    /**
     * @param {Object} todo
     */
    saveTodo(todo) {
        const { dispatch } = this.props
        dispatch(saveTodo(todo))
    }

    /**
     * @param {Object} todo
     */
    removeTodo(todo) {
        const { dispatch } = this.props
        dispatch(removeTodo(todo))
    }

    /**
     * @param {number} id
     */
    addTodo(id) {
        const { dispatch } = this.props
        const emptyTodo = {
            id,
            name: '',
            schedule: 1,
            lastEvent: '',
        }

        dispatch(addTodo(emptyTodo))
    }

    render() {
        const { isLoading, todos } = this.props

        return (
            <List
                todos={todos}
                addTodo={this.addTodo}
                saveTodo={this.saveTodo}
                removeTodo={this.removeTodo}
                isLoading={isLoading}
            />
        )
    }
}

App.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    todos: ImmutablePropTypes.list.isRequired,
    dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isLoading: state.app.get('isLoading'),
    todos: todosSortByUrgencySelector(state),
})

export default connect(mapStateToProps)(App)
