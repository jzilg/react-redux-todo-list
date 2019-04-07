import React, { ReactElement, useState } from 'react'
import equal from 'deep-equal'
import Todo from '../../entities/todo.interface'
import Icon from '../icon'
import Urgency from '../urgency'
import { getTodaysDate } from '../../utils/date'
import style from './todo-list-item.scss'

interface Props {
    todo: Todo
    saveTodo: Function
    removeTodo: Function
    isLoading: boolean
}

function TodoListItem(props: Props): ReactElement {
    const {
        todo,
        saveTodo,
        removeTodo,
        isLoading,
    } = props

    const today: string = getTodaysDate()
    const [name, setName] = useState(todo.name)
    const [schedule, setSchedule] = useState(todo.schedule)
    const [lastEvent, setLastEvent] = useState(todo.lastEvent)

    function setInputToday(): void {
        if (lastEvent === today) {
            return
        }
        setLastEvent(today)
        saveTodo()
    }

    function getUpdatedTodo(): Todo {
        return {
            id: todo.id,
            name,
            schedule,
            lastEvent,
        }
    }

    function todoHasChanged(): boolean {
        const updatedTodo: Todo = getUpdatedTodo()
        return !equal(todo, updatedTodo)
    }

    function saveButtonClickHandler(): void {
        const updatedTodo: Todo = getUpdatedTodo()
        saveTodo(updatedTodo)
    }

    function removeButtonClickHandler(): void {
        removeTodo(todo)
    }

    const saveBtnIsDisabled: boolean = !todoHasChanged() || isLoading
    const saveBtnTitle = saveBtnIsDisabled ? '' : 'Save Todo'

    return (
        <form className={style.todo} title={name}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="off"
                autoFocus={!name.length}
                className={style.input}
                value={name}
                onChange={event => setName(event.target.value)}
            />
            <div>
                <span>
                    Every
                </span>
                <input
                    type="number"
                    name="schedule"
                    className={style['schedule-input']}
                    min="1"
                    autoComplete="off"
                    value={schedule}
                    onChange={event => setSchedule(parseInt(event.target.value, 10))}
                />
                <span>
                    {schedule === 1 ? 'Day' : 'Days'}
                </span>
            </div>
            <div>
                <span>
                    Last done on
                </span>
                <input
                    type="date"
                    name="lastEvent"
                    className={style['last-event-input']}
                    value={lastEvent}
                    onChange={event => setLastEvent(event.target.value)}
                />
                <button
                    type="button"
                    onClick={setInputToday}
                >
                    Today
                </button>
            </div>
            <Urgency
                today={today}
                lastEvent={lastEvent}
                schedule={schedule}
            />
            <ul className={style['btn-list']}>
                <li className={style['btn-list-item']}>
                    <button
                        type="button"
                        className={style['save-btn']}
                        onClick={saveButtonClickHandler}
                        disabled={saveBtnIsDisabled}
                        title={saveBtnTitle}
                    >
                        <Icon name="save" width="1em" height="auto" />
                    </button>
                </li>
                <li className={style['btn-list-item']}>
                    <button
                        type="button"
                        className={style['delete-btn']}
                        onClick={removeButtonClickHandler}
                        disabled={isLoading}
                        title="Remove Todo"
                    >
                        ✕
                    </button>
                </li>
            </ul>
        </form>
    )
}

export default TodoListItem
