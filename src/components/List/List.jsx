import React from 'react'
import PropTypes from 'prop-types'
import Todo from '../../components/Todo'
import { getTodaysDate, getDurationBetweenDates } from '../../utils/helper'
import './list.scss'

class List extends React.Component {
    constructor() {
        super()
        this.addNewTodo = this.addNewTodo.bind(this)
    }

    addNewTodo() {
        this.props.addTodo(this.props.todos.length)
    }

    render() {
        const {
            todos,
            saveTodo,
            removeTodo,
            isLoading,
        } = this.props
        const today = getTodaysDate()
        const todoElements = todos
            .sort((todoA, todoB) => {
                const durationA = getDurationBetweenDates(today, todoA.lastEvent)
                const durationB = getDurationBetweenDates(today, todoB.lastEvent)
                const daysA = todoA.schedule - durationA
                const daysB = todoB.schedule - durationB
                return daysA - daysB
            })
            .map(todo =>
                (
                    <li key={todo.id} styleName="list-element">
                        <Todo
                            todo={todo}
                            saveTodo={saveTodo}
                            removeTodo={removeTodo}
                            today={today}
                            isLoading={isLoading}
                        />
                    </li>
                ))

        return (
            <div className="container">
                <h1>Todo List</h1>
                <ul styleName="list">
                    {todoElements}
                </ul>
                <button
                    type="button"
                    styleName="add-todo-btn"
                    title="Add Todo"
                    onClick={this.addNewTodo}
                    disabled={isLoading}
                >
                    +
                </button>
            </div>
        )
    }
}

List.propTypes = {
    todos: PropTypes.array.isRequired,
    addTodo: PropTypes.func.isRequired,
    saveTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

export default List
