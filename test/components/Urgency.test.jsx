import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import expect from 'expect'
import Urgency from '../../src/components/Urgency'

Enzyme.configure({ adapter: new Adapter() })

describe('Urgency', () => {
    const pastOneDayAgo = '2018-09-16'
    const pastMoreDaysAgo = '2018-09-14'
    const today = '2018-09-17'
    const schedule = 1

    it('should render "do it today" if lastEvent was one day ago and schedule is 1', () => {
        const output = shallow((
            <Urgency
                today={today}
                lastEvent={pastOneDayAgo}
                schedule={schedule}
            />
        ))
        expect(shallowToJson(output)).toMatchSnapshot()
    })

    it('should render "n Days left" if was n days ago', () => {
        const output = shallow((
            <Urgency
                today={today}
                lastEvent={pastMoreDaysAgo}
                schedule={schedule}
            />
        ))
        expect(shallowToJson(output)).toMatchSnapshot()
    })

    it('should render "1 day left" if lastEvent was today', () => {
        const output = shallow((
            <Urgency
                today={today}
                lastEvent={today}
                schedule={schedule}
            />
        ))
        expect(shallowToJson(output)).toMatchSnapshot()
    })

    it('should render "?" if last event is not set', () => {
        const output = shallow((
            <Urgency
                today={today}
                lastEvent=""
                schedule={schedule}
            />
        ))
        expect(shallowToJson(output)).toMatchSnapshot()
    })
})
