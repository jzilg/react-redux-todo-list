import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import expect from 'expect'
import Todo from '../../src/components/Todo/Todo'
import { getTodaysDate } from '../../src/utils/helper'

Enzyme.configure({ adapter: new Adapter() })

describe('Todo', () => {
    const removeTodo = jest.fn()
    const saveTodo = jest.fn()
    const today = '2018-06-02'
    const todo = {
        id: 1,
        name: 'Papa anrufen',
        schedule: 4,
        lastEvent: '2018-06-03',
    }

    it('should render correctly one todo', () => {
        const component = shallow((
            <Todo
                todo={todo}
                isLoading={false}
                removeTodo={removeTodo}
                saveTodo={saveTodo}
            />
        ))
        const tree = shallowToJson(component)
        expect(tree).toMatchSnapshot()
    })

    it('should call saveTodo', () => {
        const component = shallow((
            <Todo
                todo={todo}
                isLoading={false}
                removeTodo={removeTodo}
                saveTodo={saveTodo}
            />
        ))

        component.instance().saveTodo()
        expect(saveTodo.mock.calls.length).toBe(1)
    })

    it('should call removeTodo', () => {
        const component = shallow((
            <Todo
                todo={todo}
                isLoading={false}
                removeTodo={removeTodo}
                saveTodo={saveTodo}
            />
        ))

        component.instance().removeTodo()
        expect(removeTodo.mock.calls.length).toBe(1)
    })

    it('should update state if inputChanged is called', () => {
        const component = shallow((
            <Todo
                todo={todo}
                isLoading={false}
                removeTodo={removeTodo}
                saveTodo={saveTodo}
            />
        ))
        const event = {
            target: {
                name: 'foo',
                value: 'bar',
            },
        }

        component.instance().inputChange(event)
        const newState = component.state('foo')
        expect(newState).toBe('bar')
    })

    it('should update state with number if inputChanged is called and name is schedule', () => {
        const component = shallow((
            <Todo
                todo={todo}
                isLoading={false}
                removeTodo={removeTodo}
                saveTodo={saveTodo}
            />
        ))
        const event = {
            target: {
                name: 'schedule',
                value: '1',
            },
        }

        component.instance().inputChange(event)
        const newState = component.state('schedule')
        expect(newState).toBe(1)
    })

    it('should not set state.lastEvent if setInputToday is called but last event is today', () => {
        const todoWithLastEventToday = {
            ...todo,
            lastEvent: today,
        }
        const component = shallow((
            <Todo
                todo={todoWithLastEventToday}
                isLoading={false}
                removeTodo={removeTodo}
                saveTodo={saveTodo}
            />
        ))

        const instance = component.instance()
        instance.today = today
        instance.setInputToday()

        const stateToday = component.state('lastEvent')
        expect(stateToday).toBe(today)
    })

    it('should set state.lastEvent to today, if setInputToday is called and last event was in the past', () => {
        const component = shallow((
            <Todo
                todo={todo}
                isLoading={false}
                removeTodo={removeTodo}
                saveTodo={saveTodo}
            />
        ))

        const instance = component.instance()
        instance.today = today
        instance.setInputToday()

        const stateToday = component.state('lastEvent')
        expect(stateToday).toBe(today)
    })

    it('should set initial state.lastEvent to today if none is set', () => {
        const todoWithNoLastEvent = {
            ...todo,
            lastEvent: '',
        }
        const component = shallow((
            <Todo
                todo={todoWithNoLastEvent}
                isLoading={false}
                removeTodo={removeTodo}
                saveTodo={saveTodo}
            />
        ))

        const state = component.state('lastEvent')
        expect(state).toBe(getTodaysDate())
    })
})
