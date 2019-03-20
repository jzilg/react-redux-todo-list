import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Loading from '../../src/components/loading'

describe('Loading', () => {
    it('should render correctly', () => {
        const component = shallow(<Loading />)
        const tree = shallowToJson(component)
        expect(tree).toMatchSnapshot()
    })
})
