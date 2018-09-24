import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import expect from 'expect'
import Error from '../../src/components/Error'

Enzyme.configure({ adapter: new Adapter() })

describe('Error', () => {
    it('should render correcty', () => {
        const message = 'An Error occurred'
        const component = shallow(<Error message={message} />)
        const tree = shallowToJson(component)
        expect(tree).toMatchSnapshot()
    })
})
