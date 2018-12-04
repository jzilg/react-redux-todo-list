import { createSelector } from 'reselect'
import { getTodaysDate, getDurationBetweenDates } from '../../utils/helper'

const todosSelector = state => state.todos

const today = getTodaysDate()

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

const todosSortByUrgency = todos => todos.sort(sortByMostUrgent)

export default createSelector(
    todosSelector,
    todosSortByUrgency,
)
