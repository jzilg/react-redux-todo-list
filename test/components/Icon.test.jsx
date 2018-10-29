import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import expect from 'expect'
import Icon from '../../src/components/Icon'

Enzyme.configure({ adapter: new Adapter() })

describe('Icon', () => {
    it('should render correctly', () => {
        const component = shallow(<Icon name="save" />)
        expect(shallowToJson(component)).toMatchSnapshot()
    })

    it('should return null if invalid name is given', () => {
        const component = shallow(<Icon name="wrong" />)
        expect(shallowToJson(component)).toMatchSnapshot()
    })
})
