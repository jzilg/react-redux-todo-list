import React, { ReactElement } from 'react'
import Todo from '../../entities/todo.interface'
import { createUniqueId } from '../../utils/helper'
import TodoListItem from '../TodoListItem'
import style from './todo-list.scss'

interface ListProps {
    todos: Todo[]
    addEmptyTodo: Function
    saveTodo: Function
    removeTodo: Function
    isLoading: boolean
}

const TodoList = ({
    todos,
    addEmptyTodo,
    saveTodo,
    removeTodo,
    isLoading,
}: ListProps): ReactElement<{}> => {
    const addNewTodo = (): void => {
        const id = createUniqueId()
        addEmptyTodo(id)
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
