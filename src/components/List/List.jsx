import React from 'react'
import PropTypes from 'prop-types'
import Todo from '../Todo'
import style from './list.scss'

const List = ({
    todos,
    addTodo,
    saveTodo,
    removeTodo,
    isLoading,
}) => {
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

    const todoElements = todos.map(todo => (
        <li key={todo.id} className={style['list-element']}>
            <Todo
                todo={todo}
                saveTodo={saveTodo}
                removeTodo={removeTodo}
                isLoading={isLoading}
            />
        </li>
    ))

    return (
        <div className="container">
            <h1>
                Todo List
            </h1>
            <ul className={style.list}>
                {todoElements}
            </ul>
            <button
                type="button"
                className={style['add-todo-btn']}
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
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    addTodo: PropTypes.func.isRequired,
    saveTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

export default List
