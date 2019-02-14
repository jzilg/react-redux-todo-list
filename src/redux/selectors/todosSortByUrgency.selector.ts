import { createSelector } from 'reselect'
import State from '../interfaces/state.interface'
import Todo from '../../entities/todo.interface'
import { TodosState } from '../reducers/todos.reducer'
import { getTodaysDate, getDurationBetweenDates } from '../../utils/helper'

const today: string = getTodaysDate()

const sortByMostUrgent = (todoA: Todo, todoB: Todo): number => {
    const durationA = getDurationBetweenDates(today, todoA.lastEvent)
    const durationB = getDurationBetweenDates(today, todoB.lastEvent)
    const daysA = todoA.schedule - durationA
    const daysB = todoB.schedule - durationB
    return daysA - daysB
}

const todosSelector = (state: State): TodosState => state.todos
const todosSortByUrgency = (todos: Todo[]): Todo[] => todos.sort(sortByMostUrgent)

export default createSelector(
    todosSelector,
    todosSortByUrgency,
)
