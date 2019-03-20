import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import Loading from '../../src/components/loading'

Enzyme.configure({ adapter: new Adapter() })

describe('Loading', () => {
    it('should render correctly', () => {
        const component = shallow(<Loading />)
        const tree = shallowToJson(component)
        expect(tree).toMatchSnapshot()
    })
})
