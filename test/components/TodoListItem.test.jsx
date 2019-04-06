import React from 'react'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import TodoListItem from '../../src/components/todo-list-item'
import { getTodaysDate } from '../../src/utils/date'

describe('TodoListItem', () => {
    const today = '2018-12-04'
    const todo = {
        id: 1,
        name: 'Papa anrufen',
        schedule: 4,
        lastEvent: '2018-06-03',
    }

    it('should render correctly one todo if duration between lastEvent and schedule is > 1', () => {
        // pretend today is the date when the snapshot was taken
        Date.now = () => 1543881600000 // 2018-12-04

        const removeTodo = jest.fn()
        const saveTodo = jest.fn()

        const component = shallow((
            <TodoListItem
                todo={todo}
                isLoading={false}
                removeTodo={removeTodo}
                saveTodo={saveTodo}
            />
        ))
        const tree = shallowToJson(component)
        expect(tree).toMatchSnapshot()
    })

    it('should render correctly one todo if duration between lastEvent and schedule is == 1', () => {
        // pretend today is the date when the snapshot was taken
        Date.now = () => 1543881600000 // 2018-12-04

        const removeTodo = jest.fn()
        const saveTodo = jest.fn()
        const todoWithLastEventYesterday = {
            ...todo,
            lastEvent: '2018-12-03',
            schedule: 1,
        }

        const component = shallow((
            <TodoListItem
                todo={todoWithLastEventYesterday}
                isLoading={false}
                removeTodo={removeTodo}
                saveTodo={saveTodo}
            />
        ))
        const tree = shallowToJson(component)
        expect(tree).toMatchSnapshot()
    })

    it('should call saveTodo if save-button is clicked', () => {
        const removeTodo = jest.fn()
        const saveTodo = jest.fn()

        const component = shallow((
            <TodoListItem
                todo={todo}
                isLoading={false}
                removeTodo={removeTodo}
                saveTodo={saveTodo}
            />
        ))
        component.find('button').at(1).simulate('click')
        expect(saveTodo.mock.calls.length).toBe(1)
    })

    it('should call removeTodo if remove-button is cliced', () => {
        const removeTodo = jest.fn()
        const saveTodo = jest.fn()

        const component = shallow((
            <TodoListItem
                todo={todo}
                isLoading={false}
                removeTodo={removeTodo}
                saveTodo={saveTodo}
            />
        ))
        component.find('button').last().simulate('click')
        expect(removeTodo.mock.calls.length).toBe(1)
    })

    it('should not call saveTodo if setInputToday is called but last event is today', () => {
        // pretend today is the date when the snapshot was taken
        Date.now = () => 1543881600000 // 2018-12-04

        const removeTodo = jest.fn()
        const saveTodo = jest.fn()

        const todoWithLastEventToday = {
            ...todo,
            lastEvent: today,
        }
        const component = shallow((
            <TodoListItem
                todo={todoWithLastEventToday}
                isLoading={false}
                removeTodo={removeTodo}
                saveTodo={saveTodo}
            />
        ))
        component.find('button').first().simulate('click')
        expect(saveTodo.mock.calls.length).toBe(0)
    })

    it('should set lastEvent if lastEvent-input changes', () => {
        const removeTodo = jest.fn()
        const saveTodo = jest.fn()
        const newLastEvent = '2018-03-20'
        const event = {
            target: {
                value: newLastEvent,
            },
        }

        const component = mount((
            <TodoListItem
                todo={todo}
                isLoading={false}
                removeTodo={removeTodo}
                saveTodo={saveTodo}
            />
        ))

        component.find('input').at(2).simulate('change', event)
        component.update()

        const name = component.find('input').at(2).props().value
        expect(name).toBe(newLastEvent)
    })

    it('should set lastEvent to today, if setInputToday is called and last event was in the past', () => {
        const removeTodo = jest.fn()
        const saveTodo = jest.fn()

        const component = mount((
            <TodoListItem
                todo={todo}
                isLoading={false}
                removeTodo={removeTodo}
                saveTodo={saveTodo}
            />
        ))
        component.find('button').first().simulate('click')
        const lastEvent = component.find('input').at(2).props().value
        expect(lastEvent).toBe(today)
        expect(saveTodo.mock.calls.length).toBe(1)
    })

    it('should set name if name-input changes', () => {
        const removeTodo = jest.fn()
        const saveTodo = jest.fn()
        const newName = 'Foo'
        const event = {
            target: {
                value: newName,
            },
        }

        const component = mount((
            <TodoListItem
                todo={todo}
                isLoading={false}
                removeTodo={removeTodo}
                saveTodo={saveTodo}
            />
        ))

        component.find('input').first().simulate('change', event)
        component.update()

        const name = component.find('input').first().props().value
        expect(name).toBe(newName)
    })

    it('should set schedule if schedule-input changes', () => {
        const removeTodo = jest.fn()
        const saveTodo = jest.fn()
        const newSchedule = 3
        const event = {
            target: {
                value: newSchedule,
            },
        }

        const component = mount((
            <TodoListItem
                todo={todo}
                isLoading={false}
                removeTodo={removeTodo}
                saveTodo={saveTodo}
            />
        ))

        component.find('input').at(1).simulate('change', event)
        component.update()

        const name = component.find('input').at(1).props().value
        expect(name).toBe(newSchedule)
    })
})
