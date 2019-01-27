import React, { ReactElement } from 'react'
import TodoType from '../../interfaces/todo.interface'
import Todo from '../Todo'
import style from './list.scss'

interface ListProps {
    todos: TodoType[],
    addTodo: Function,
    saveTodo: Function,
    removeTodo: Function,
    isLoading: boolean,
}

const List = ({
    todos,
    addTodo,
    saveTodo,
    removeTodo,
    isLoading,
}: ListProps): ReactElement<{}> => {
    const createNewId = (): number => {
        if (!todos.length) {
            return 0
        }
        const ids = todos.map(todo => todo.id)
        const highestId = Math.max(...ids)
        return highestId + 1
    }

    const addNewTodo = (): void => {
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

export default List
