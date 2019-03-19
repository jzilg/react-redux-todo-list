import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createMockStore } from 'redux-test-utils'
import { shallowToJson } from 'enzyme-to-json'
import expect from 'expect'
import App from '../../src/containers/App'
import { REQUEST_TODOS } from '../../src/redux/actions/fetch-todos.actions'

Enzyme.configure({ adapter: new Adapter() })

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

    it('should call addTodo if addEmptyTodo is called', () => {
        const actionType = REQUEST_TODOS
        const output = shallow(<App store={store} />)
        output.dive().instance().addEmptyTodo(0)
        expect(store.isActionTypeDispatched(actionType)).toBe(true)
    })
})
