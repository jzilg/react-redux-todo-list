import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Todo from '../Todo'
import { getTodaysDate, getDurationBetweenDates } from '../../utils/helper'
import './list.scss'

const List = ({
    todos,
    addTodo,
    saveTodo,
    removeTodo,
    isLoading,
}) => {
    const today = getTodaysDate()

    /**
     * @returns {number}
     */
    const createNewId = () => {
        if (!todos.size) {
            return 0
        }
        const ids = todos.map(todo => todo.id)
        const highestId = Math.max(...ids)
        return highestId + 1
    }

    const addNewTodo = () => {
        const id = createNewId()
        addTodo(id)
    }

    /**
     * @param {Object} todoA
     * @param {Object} todoB
     * @returns {number}
     */
    const sortByMostUrgent = (todoA, todoB) => {
        const durationA = getDurationBetweenDates(today, todoA.lastEvent)
        const durationB = getDurationBetweenDates(today, todoB.lastEvent)
        const daysA = todoA.schedule - durationA
        const daysB = todoB.schedule - durationB
        return daysA - daysB
    }

    const todoElements = todos
        .sort(sortByMostUrgent)
        .map(todo => (
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
            <h1>
                Todo List
            </h1>
            <ul styleName="list">
                {todoElements}
            </ul>
            <button
                type="button"
                styleName="add-todo-btn"
                title="Add Todo"
                onClick={addNewTodo}
                disabled={isLoading}
            >
                +
            </button>
        </div>
    )
}

List.propTypes = {
    todos: ImmutablePropTypes.list.isRequired,
    addTodo: PropTypes.func.isRequired,
    saveTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

export default List
