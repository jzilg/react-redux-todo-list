import React, { ReactNode } from 'react'
import equal from 'deep-equal'
import Todo from '../../entities/todo.interface'
import Icon from '../icon'
import Urgency from '../urgency'
import { getTodaysDate } from '../../utils/helper'
import style from './todo-list-item.scss'

interface Props {
    todo: Todo
    saveTodo: Function
    removeTodo: Function
    isLoading: boolean
}

interface State extends Todo {}

class TodoListItem extends React.Component<Props, State> {
    today = getTodaysDate()

    constructor(props) {
        super(props)

        const { todo } = props

        this.state = {
            id: todo.id,
            name: todo.name,
            schedule: parseInt(todo.schedule, 10),
            lastEvent: todo.lastEvent || this.today,
        }

        this.inputChange = this.inputChange.bind(this)
        this.saveTodo = this.saveTodo.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
        this.setInputToday = this.setInputToday.bind(this)
    }

    setInputToday(): void {
        const { state } = this
        if (state.lastEvent === this.today) {
            return
        }

        this.setState({
            lastEvent: this.today,
        }, () => {
            this.saveTodo()
        })
    }

    /**
     * @returns {boolean}
     */
    todoHasChanged(): boolean {
        const { todo } = this.props
        return !equal(todo, this.state)
    }

    /**
     * @param {Object} event
     */
    inputChange(event): void {
        const { name } = event.target
        let { value } = event.target

        if (name === 'schedule') {
            value = parseInt(value, 10)
        }

        this.setState(state => ({
            ...state,
            [name]: value,
        }))
    }

    saveTodo(): void {
        const { saveTodo } = this.props
        saveTodo(this.state)
    }

    removeTodo(): void {
        const { removeTodo } = this.props
        removeTodo(this.state)
    }

    render(): ReactNode {
        const { isLoading } = this.props
        const { name, schedule, lastEvent } = this.state
        const saveBtnIsDisabled = (): boolean => !this.todoHasChanged() || isLoading
        const saveBtnTitle = saveBtnIsDisabled() ? '' : 'Save TodoListItem'

        return (
            <form className={style.todo} title={name}>
                <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Name"
                    autoComplete="off"
                    onChange={this.inputChange}
                    autoFocus={!name.length}
                    className={style.input}
                />
                <div>
                    <span>
                        Every
                    </span>
                    <input
                        type="number"
                        name="schedule"
                        className={style['schedule-input']}
                        value={schedule}
                        min="1"
                        autoComplete="off"
                        onChange={this.inputChange}
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
                        onChange={this.inputChange}
                    />
                    <button
                        type="button"
                        onClick={this.setInputToday}
                    >
                        Today
                    </button>
                </div>
                <Urgency
                    today={this.today}
                    lastEvent={lastEvent}
                    schedule={schedule}
                />
                <ul className={style['btn-list']}>
                    <li className={style['btn-list-item']}>
                        <button
                            type="button"
                            className={style['save-btn']}
                            onClick={this.saveTodo}
                            disabled={saveBtnIsDisabled()}
                            title={saveBtnTitle}
                        >
                            <Icon name="save" width="1em" height="auto" />
                        </button>
                    </li>
                    <li className={style['btn-list-item']}>
                        <button
                            type="button"
                            className={style['delete-btn']}
                            onClick={this.removeTodo}
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
}

export default TodoListItem
