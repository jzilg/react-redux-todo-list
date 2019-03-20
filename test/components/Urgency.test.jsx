import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import Urgency from '../../src/components/urgency'

Enzyme.configure({ adapter: new Adapter() })

describe('Urgency', () => {
    const pastOneDayAgo = '2018-09-16'
    const pastMoreDaysAgo = '2018-09-14'
    const today = '2018-09-17'
    const schedule = 1

    it('should render "do it today" if lastEvent was one day ago and schedule is 1', () => {
        const component = shallow((
            <Urgency
                today={today}
                lastEvent={pastOneDayAgo}
                schedule={schedule}
            />
        ))
        const tree = shallowToJson(component)
        expect(tree).toMatchSnapshot()
    })

    it('should render "n Days left" if was n days ago', () => {
        const component = shallow((
            <Urgency
                today={today}
                lastEvent={pastMoreDaysAgo}
                schedule={schedule}
            />
        ))
        const tree = shallowToJson(component)
        expect(tree).toMatchSnapshot()
    })

    it('should render "1 day left" if lastEvent was today', () => {
        const component = shallow((
            <Urgency
                today={today}
                lastEvent={today}
                schedule={schedule}
            />
        ))
        const tree = shallowToJson(component)
        expect(tree).toMatchSnapshot()
    })

    it('should render "?" if last event is not set', () => {
        const component = shallow((
            <Urgency
                today={today}
                lastEvent=""
                schedule={schedule}
            />
        ))
        const tree = shallowToJson(component)
        expect(tree).toMatchSnapshot()
    })
})
