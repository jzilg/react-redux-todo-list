import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import TodoList from '../../src/components/todo-list'

Enzyme.configure({ adapter: new Adapter() })

describe('TodoList', () => {
    Date.now = () => '2018-09-18' // otherwise today is today

    const saveTodo = () => {}
    const removeTodo = () => {}
    const isLoading = false
    const todos = [
        {
            id: 1,
            name: 'Papa anrufen',
            schedule: 4,
            lastEvent: '2018-06-03',
        },
        {
            id: 2,
            name: 'Superfit',
            schedule: 3,
            lastEvent: '2018-05-11',
        },
        {
            id: 3,
            name: 'Mama anrufen',
            schedule: 7,
            lastEvent: '2018-05-12',
        },
    ]

    it('should render correctly one todo', () => {
        const addEmptyTodo = () => {}
        const todosWithOneTodo = todos.filter(todo => todo.id === 1)
        const component = shallow((
            <TodoList
                todos={todosWithOneTodo}
                addEmptyTodo={addEmptyTodo}
                saveTodo={saveTodo}
                removeTodo={removeTodo}
                isLoading={isLoading}
            />
        ))
        const tree = shallowToJson(component)
        expect(tree).toMatchSnapshot()
    })

    it('should render correctly more todos', () => {
        const addEmptyTodo = () => {}
        const component = shallow((
            <TodoList
                todos={todos}
                addEmptyTodo={addEmptyTodo}
                saveTodo={saveTodo}
                removeTodo={removeTodo}
                isLoading={isLoading}
            />
        ))
        const tree = shallowToJson(component)
        expect(tree).toMatchSnapshot()
    })

    it('should call addEmptyTodo if button is clicked and todos are set', () => {
        const addEmptyTodo = jest.fn()
        const component = shallow((
            <TodoList
                todos={todos}
                addEmptyTodo={addEmptyTodo}
                saveTodo={saveTodo}
                removeTodo={removeTodo}
                isLoading={isLoading}
            />
        ))
        component.find('button').simulate('click')
        expect(addEmptyTodo.mock.calls.length).toBe(1)
    })

    it('should call addEmptyTodo if button is clicked and todos are empty', () => {
        const addEmptyTodo = jest.fn()
        const component = shallow((
            <TodoList
                todos={[]}
                addEmptyTodo={addEmptyTodo}
                saveTodo={saveTodo}
                removeTodo={removeTodo}
                isLoading={isLoading}
            />
        ))
        component.find('button').simulate('click')
        expect(addEmptyTodo.mock.calls.length).toBe(1)
    })
})
