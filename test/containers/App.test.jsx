import React from 'react'
import { shallow } from 'enzyme'
import { createMockStore } from 'redux-test-utils'
import { shallowToJson } from 'enzyme-to-json'
import App from '../../src/containers/App'
import { ADD_TODO_REQUEST } from '../../src/redux/actions/add-todo.actions'

describe('App', () => {
    const state = {
        ui: {
            isLoading: true,
        },
        todos: [],
    }
    const store = createMockStore(state)

    it('should render correctly', () => {
        const output = shallow(<App store={store} />)
        output.dive()
        expect(shallowToJson(output)).toMatchSnapshot()
    })

    it('should call addTodo if addEmptyTodo is called by click in child component', () => {
        const actionType = ADD_TODO_REQUEST
        const output = shallow(<App store={store} />)

        output.dive().dive().find('button').simulate('click')
        expect(store.isActionTypeDispatched(actionType)).toBe(true)
    })
})
