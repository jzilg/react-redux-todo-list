import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Loading from '../components/Loading'
import Error from '../components/Error'
import List from '../components/List'
import {
    fetchTodos,
    addTodo,
    saveTodo,
    removeTodo,
} from '../store/actions'

class App extends React.Component {
    constructor() {
        super()
        this.addTodo = this.addTodo.bind(this)
        this.saveTodo = this.saveTodo.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(fetchTodos())
            .then(() => {
                if (!this.props.todos.length) {
                    this.addInitTodo()
                }
            })
    }

    saveTodo(index, data) {
        this.props.dispatch(saveTodo(index, data))
    }

    removeTodo(data) {
        this.props.dispatch(removeTodo(data))
    }

    addInitTodo() {
        this.addTodo(0)
    }

    addTodo(id) {
        const emptyTodo = {
            id,
            name: '',
            schedule: '',
            lastEvent: '',
        }

        this.props.dispatch(addTodo(emptyTodo))
    }

    render() {
        const { error, isLoading } = this.props
        const loader = isLoading ? <Loading /> : null

        if (error.appears) {
            return <Error obj={error.obj} />
        }

        return (
            <main>
                {loader}
                <List
                    todos={this.props.todos}
                    addTodo={this.addTodo}
                    saveTodo={this.saveTodo}
                    removeTodo={this.removeTodo}
                    isLoading={isLoading}
                />
            </main>
        )
    }
}

App.propTypes = {
    error: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    todos: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    error: state.app.error,
    isLoading: state.app.isLoading,
    todos: state.todos,
})


export default connect(mapStateToProps)(App)
