import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createMockStore } from 'redux-test-utils'
import { shallowToJson } from 'enzyme-to-json'
import expect from 'expect'
import { Map } from 'immutable'
import Root from '../../src/containers/Root'

Enzyme.configure({ adapter: new Adapter() })

describe('Root', () => {
    it('should render correctly when loading', () => {
        const state = {
            app: Map({
                isLoading: true,
                error: Map({
                    hasOccurred: false,
                    message: 'error',
                }),
            }),
        }
        const store = createMockStore(state)
        const output = shallow(<Root store={store} />)
        output.dive()
        expect(shallowToJson(output)).toMatchSnapshot()
    })

    it('should render correctly when error hasOccurred', () => {
        const state = {
            app: Map({
                isLoading: false,
                error: Map({
                    hasOccurred: true,
                    message: 'error',
                }),
            }),
        }
        const store = createMockStore(state)
        const output = shallow(<Root store={store} />)
        output.dive()
        expect(shallowToJson(output)).toMatchSnapshot()
    })

    it('should render correctly when not loading and no error hasOccurred', () => {
        const state = {
            app: Map({
                isLoading: false,
                error: Map({
                    hasOccurred: false,
                    message: 'error',
                }),
            }),
        }
        const store = createMockStore(state)
        const output = shallow(<Root store={store} />)
        output.dive()
        expect(shallowToJson(output)).toMatchSnapshot()
    })
})
