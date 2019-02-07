import React, { ReactElement } from 'react'
import Todo from '../../entities/todo.interface'
import TodoListItem from '../TodoListItem'
import style from './todo-list.scss'

interface ListProps {
    todos: Todo[]
    addTodo: Function
    saveTodo: Function
    removeTodo: Function
    isLoading: boolean
}

const TodoList = ({
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
            <TodoListItem
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

export default TodoList
