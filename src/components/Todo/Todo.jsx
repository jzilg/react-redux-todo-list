import React from 'react'
import PropTypes from 'prop-types'
import Urgency from '../Urgency'
import './todo.scss'

class Todo extends React.Component {
    constructor(props) {
        super()

        const { todo } = props

        this.state = {
            id: todo.id,
            name: todo.name,
            schedule: parseInt(todo.schedule, 10) || 1,
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

        return (
            <form key={id} styleName="todo" title={name}>
                <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Name"
                    autoComplete="off"
                    onChange={this.inputChange}
                    onBlur={this.saveTodo}
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
                        onBlur={this.saveTodo}
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
                        onBlur={this.saveTodo}
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
                <button
                    type="button"
                    styleName="delete-btn"
                    onClick={this.removeTodo}
                    disabled={isLoading}
                    title="Remove Todo"
                >
                    ✕
                </button>
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
