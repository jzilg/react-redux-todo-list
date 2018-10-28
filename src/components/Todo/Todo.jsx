import React from 'react'
import PropTypes from 'prop-types'
import equal from 'deep-equal'
import Urgency from '../Urgency'
import './todo.scss'

class Todo extends React.Component {
    constructor(props) {
        super()

        const { todo } = props

        this.state = {
            id: todo.id,
            name: todo.name,
            schedule: parseInt(todo.schedule, 10),
            lastEvent: todo.lastEvent || props.today,
        }

        this.inputChange = this.inputChange.bind(this)
        this.saveTodo = this.saveTodo.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
        this.setInputToday = this.setInputToday.bind(this)
    }

    setInputToday() {
        const { state, props } = this
        if (state.lastEvent === props.today) {
            return
        }

        this.setState({
            lastEvent: props.today,
        }, () => {
            this.saveTodo()
        })
    }

    todoHasChanged() {
        const { todo } = this.props
        return !equal(todo, this.state)
    }

    inputChange(event) {
        const { name } = event.target
        let { value } = event.target

        if (name === 'schedule') {
            value = parseInt(value, 10)
        }

        this.setState({
            [name]: value,
        })
    }

    saveTodo() {
        const { saveTodo } = this.props
        saveTodo(this.state)
    }

    removeTodo() {
        const { removeTodo } = this.props
        removeTodo(this.state)
    }

    render() {
        const { isLoading, today } = this.props
        const {
            id,
            name,
            schedule,
            lastEvent,
        } = this.state
        const saveBtnIsDisabled = () => !this.todoHasChanged() || isLoading
        const saveBtnTitle = saveBtnIsDisabled() ? '' : 'Save Todo'

        return (
            <form key={id} styleName="todo" title={name}>
                <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Name"
                    autoComplete="off"
                    onChange={this.inputChange}
                    autoFocus={!name.length}
                    styleName="input"
                />
                <div>
                    <span>
                        Every
                    </span>
                    <input
                        type="number"
                        name="schedule"
                        styleName="schedule-input"
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
                        styleName="last-event-input"
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
                    today={today}
                    lastEvent={lastEvent}
                    schedule={schedule}
                />
                <ul styleName="btn-list">
                    <li styleName="btn-list-item">
                        <button
                            type="button"
                            styleName="save-btn"
                            onClick={this.saveTodo}
                            disabled={saveBtnIsDisabled()}
                            title={saveBtnTitle}
                        >
                            <svg
                                width="1em"
                                viewBox="0 0 448 512"
                                aria-hidden="true"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="currentColor"
                                    d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM288 64v96H96V64h192zm128 368c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V80c0-8.822 7.178-16 16-16h16v104c0 13.255 10.745 24 24 24h208c13.255 0 24-10.745 24-24V64.491a15.888 15.888 0 0 1 7.432 4.195l83.882 83.882A15.895 15.895 0 0 1 416 163.882V432zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 144c-30.879 0-56-25.121-56-56s25.121-56 56-56 56 25.121 56 56-25.121 56-56 56z"
                                />
                            </svg>
                        </button>
                    </li>
                    <li styleName="btn-list-item">
                        <button
                            type="button"
                            styleName="delete-btn"
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

Todo.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        schedule: PropTypes.number.isRequired,
        lastEvent: PropTypes.string.isRequired,
    }).isRequired,
    saveTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    today: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

export default Todo
