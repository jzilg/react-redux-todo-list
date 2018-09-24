import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createMockStore } from 'redux-test-utils'
import { shallowToJson } from 'enzyme-to-json'
import expect from 'expect'
import { Map, List } from 'immutable'
import App from '../../src/containers/App'

Enzyme.configure({ adapter: new Adapter() })

describe('App', () => {
    const state = {
        app: Map({
            isLoading: true,
            error: Map({
                hasOccurred: false,
            }),
        }),
        todos: List([]),
    }
    const store = createMockStore(state)
    const todo = {
        id: 1,
    }

    it('should render correctly', () => {
        const dispatch = () => {}
        const output = shallow(<App store={store} dispatch={dispatch} />)
        output.dive()
        expect(shallowToJson(output)).toMatchSnapshot()
    })

    it('should call dispatch if saveTodo is called', async () => {
        const dispatch = jest.fn().mockResolvedValue()
        const output = shallow(<App store={store} dispatch={dispatch} />)
        await dispatch()
        output.dive().instance().saveTodo(todo)
        expect(dispatch.mock.calls.length).toBe(1)
    })

    it('should call dispatch if removeTodo is called', async () => {
        const dispatch = jest.fn().mockResolvedValue()
        const output = shallow(<App store={store} dispatch={dispatch} />)
        await dispatch()
        output.dive().instance().removeTodo(todo)
        expect(dispatch.mock.calls.length).toBe(1)
    })

    it('should call dispatch if addTodo is called', async () => {
        const dispatch = jest.fn().mockResolvedValue()
        const output = shallow(<App store={store} dispatch={dispatch} />)
        await dispatch()
        output.dive().instance().addTodo(todo)
        expect(dispatch.mock.calls.length).toBe(1)
    })
})
