import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import expect from 'expect'
import ErrorMsg from '../../src/components/ErrorMsg'

Enzyme.configure({ adapter: new Adapter() })

describe('ErrorMsg', () => {
    it('should render correctly', () => {
        const message = 'An ErrorMsg occurred'
        const component = shallow(<ErrorMsg message={message} />)
        const tree = shallowToJson(component)
        expect(tree).toMatchSnapshot()
    })
})
