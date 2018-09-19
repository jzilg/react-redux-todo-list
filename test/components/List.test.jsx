import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import expect from 'expect'
import List from '../../src/components/List'

Enzyme.configure({ adapter: new Adapter() })

describe('List', () => {
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

    it('should render correcty one todo', () => {
        const addTodo = () => {}
        const todo = todos.slice().splice(0, 1)
        const component = shallow((
            <List
                todos={todo}
                addTodo={addTodo}
                saveTodo={saveTodo}
                removeTodo={removeTodo}
                isLoading={isLoading}
            />
        ))
        const tree = shallowToJson(component)
        expect(tree).toMatchSnapshot()
    })

    it('should render correcty more todos right sorted', () => {
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

    it('should call add todo if button is clicked', () => {
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
})
