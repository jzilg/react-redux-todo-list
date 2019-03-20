import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Icon from '../../src/components/icon'

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
