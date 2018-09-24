import React from 'react'
import { List as ImmutableList } from 'immutable'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import expect from 'expect'
import List from '../../src/components/List'

Enzyme.configure({ adapter: new Adapter() })

describe('List', () => {
    Date.now = () => '2018-09-18' // otherwise today is today

    const saveTodo = () => {}
    const removeTodo = () => {}
    const isLoading = false
    const todos = ImmutableList([
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
    ])

    it('should render correctly one todo', () => {
        const addTodo = () => {}
        const todosWithOneTodo = todos.filter(todo => todo.id === 1)
        const component = shallow((
            <List
                todos={todosWithOneTodo}
                addTodo={addTodo}
                saveTodo={saveTodo}
                removeTodo={removeTodo}
                isLoading={isLoading}
            />
        ))
        const tree = shallowToJson(component)
        expect(tree).toMatchSnapshot()
    })

    it('should render correctly more todos right sorted', () => {
        const addTodo = () => {}
        const component = shallow((
            <List
                todos={todos}
                addTodo={addTodo}
                saveTodo={saveTodo}
                removeTodo={removeTodo}
                isLoading={isLoading}
            />
        ))
        const tree = shallowToJson(component)
        expect(tree).toMatchSnapshot()
    })

    it('should call add todo if button is clicked and todos are set', () => {
        const addTodo = jest.fn()
        const component = shallow((
            <List
                todos={todos}
                addTodo={addTodo}
                saveTodo={saveTodo}
                removeTodo={removeTodo}
                isLoading={isLoading}
            />
        ))
        component.find('button').simulate('click')
        expect(addTodo.mock.calls.length).toBe(1)
    })

    it('should call add todo if button is clicked and todos are empty', () => {
        const addTodo = jest.fn()
        const component = shallow((
            <List
                todos={ImmutableList()}
                addTodo={addTodo}
                saveTodo={saveTodo}
                removeTodo={removeTodo}
                isLoading={isLoading}
            />
        ))
        component.find('button').simulate('click')
        expect(addTodo.mock.calls.length).toBe(1)
    })
})
