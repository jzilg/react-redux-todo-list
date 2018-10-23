import 'whatwg-fetch'
import { receiveError } from './error.actions'

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST'
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'

function addTodoRequest() {
    return {
        type: ADD_TODO_REQUEST,
    }
}

function addTodoSuccess(data) {
    return {
        data,
        type: ADD_TODO_SUCCESS,
    }
}

export function addTodo(data) {
    return (dispatch) => {
        dispatch(addTodoRequest())
        return fetch(`${BACKEND_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(() => dispatch(addTodoSuccess(data)))
            .catch(error => dispatch(receiveError(error)))
    }
}

export const REMOVE_TODO_REQUEST = 'REMOVE_TODO_REQUEST'
export const REMOVE_TODO_SUCCESS = 'REMOVE_TODO_SUCCESS'

function removeTodoRequest() {
    return {
        type: REMOVE_TODO_REQUEST,
    }
}

function removeTodoSuccess(data) {
    return {
        data,
        type: REMOVE_TODO_SUCCESS,
    }
}

export function removeTodo(data) {
    return (dispatch) => {
        dispatch(removeTodoRequest())
        return fetch(`${BACKEND_URL}/todos/${data.id}`, {
            method: 'DELETE',
        })
            .then(() => dispatch(removeTodoSuccess(data)))
            .catch(error => dispatch(receiveError(error)))
    }
}

export const SAVE_TODO_REQUEST = 'SAVE_TODO_REQUEST'
export const SAVE_TODO_SUCCESS = 'SAVE_TODO_SUCCESS'

function saveTodoRequest() {
    return {
        type: SAVE_TODO_REQUEST,
    }
}

function saveTodoSuccess(data) {
    return {
        data,
        type: SAVE_TODO_SUCCESS,
    }
}

export function saveTodo(data) {
    return (dispatch) => {
        dispatch(saveTodoRequest())
        return fetch(`${BACKEND_URL}/todos/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(() => dispatch(saveTodoSuccess(data)))
            .catch(error => dispatch(receiveError(error)))
    }
}

export const REQUEST_TODOS = 'REQUEST_TODOS'
export const RECEIVE_TODOS = 'RECEIVE_TODOS'

function requestTodos() {
    return {
        type: REQUEST_TODOS,
    }
}

function receiveTodos(json) {
    return {
        type: RECEIVE_TODOS,
        data: json,
    }
}

export function fetchTodos() {
    return (dispatch) => {
        dispatch(requestTodos())
        return fetch(`${BACKEND_URL}/todos`)
            .then(json => json.json())
            .then(json => dispatch(receiveTodos(json)))
            .catch(error => dispatch(receiveError(error)))
    }
}
