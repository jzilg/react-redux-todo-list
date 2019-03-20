import React from 'react'
import { shallow } from 'enzyme'
import { createMockStore } from 'redux-test-utils'
import { shallowToJson } from 'enzyme-to-json'
import Root from '../../src/containers/Root'

describe('Root', () => {
    it('should render correctly when loading', () => {
        const state = {
            ui: {
                isLoading: true,
                error: {
                    hasOccurred: false,
                    message: 'error',
                },
            },
        }
        const store = createMockStore(state)
        const output = shallow(<Root store={store} />)
        output.dive()
        expect(shallowToJson(output)).toMatchSnapshot()
    })

    it('should render correctly when error hasOccurred', () => {
        const state = {
            ui: {
                isLoading: false,
                error: {
                    hasOccurred: true,
                    message: 'error',
                },
            },
        }
        const store = createMockStore(state)
        const output = shallow(<Root store={store} />)
        output.dive()
        expect(shallowToJson(output)).toMatchSnapshot()
    })

    it('should render correctly when not loading and no error hasOccurred', () => {
        const state = {
            ui: {
                isLoading: false,
                error: {
                    hasOccurred: false,
                    message: 'error',
                },
            },
        }
        const store = createMockStore(state)
        const output = shallow(<Root store={store} />)
        output.dive()
        expect(shallowToJson(output)).toMatchSnapshot()
    })
})
