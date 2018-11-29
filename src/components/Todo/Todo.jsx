import React from 'react'
import PropTypes from 'prop-types'
import equal from 'deep-equal'
import Icon from '../Icon'
import Urgency from '../Urgency'
import './todo.scss'

class Todo extends React.Component {
    constructor(props) {
        super(props)

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

    /**
     * @returns {boolean}
     */
    todoHasChanged() {
        const { todo } = this.props
        return !equal(todo, this.state)
    }

    /**
     * @param {Object} event
     */
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
        const { name, schedule, lastEvent } = this.state
        const saveBtnIsDisabled = () => !this.todoHasChanged() || isLoading
        const saveBtnTitle = saveBtnIsDisabled() ? '' : 'Save Todo'

        return (
            <form styleName="todo" title={name}>
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
                            <Icon name="save" width="1em" height="auto" />
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
