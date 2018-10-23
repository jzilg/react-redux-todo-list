import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import List from '../components/List'
import { fetchTodos } from '../redux/actions/fetch-todos.actions'
import { addTodo } from '../redux/actions/add-todo.actions'
import { saveTodo } from '../redux/actions/save-todo.actions'
import { removeTodo } from '../redux/actions/remove-todo.actions'

class App extends React.Component {
    constructor() {
        super()
        this.addTodo = this.addTodo.bind(this)
        this.saveTodo = this.saveTodo.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
    }

    componentDidMount() {
        const { props } = this
        props.dispatch(fetchTodos())
    }

    saveTodo(data) {
        const { dispatch } = this.props
        dispatch(saveTodo(data))
    }

    removeTodo(data) {
        const { dispatch } = this.props
        dispatch(removeTodo(data))
    }

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
    todos: state.todos,
})

export default connect(mapStateToProps)(App)
