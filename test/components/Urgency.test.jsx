import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import expect from 'expect'
import Urgency from '../../src/components/Urgency'

Enzyme.configure({ adapter: new Adapter() })

describe('Urgency', () => {
    const pastOutsideSchedule = '2018-09-01'
    const pastInsideScheduleOneDay = '2018-09-16'
    const pastInsideScheduleMoreDays = '2018-09-14'
    const today = '2018-09-17'
    const schedule = 4

    it('should render correcty if lastEvent was insde of schedule one day', () => {
        const output = shallow((
            <Urgency
                today={today}
                lastEvent={pastInsideScheduleOneDay}
                schedule={schedule}
            />
        ))
        expect(shallowToJson(output)).toMatchSnapshot()
    })

    it('should render correcty if lastEvent was inseide of schedule more days', () => {
        const output = shallow((
            <Urgency
                today={today}
                lastEvent={pastInsideScheduleMoreDays}
                schedule={schedule}
            />
        ))
        expect(shallowToJson(output)).toMatchSnapshot()
    })

    it('should render correcty if lastEvent was outside of schedule', () => {
        const output = shallow((
            <Urgency
                today={today}
                lastEvent={pastOutsideSchedule}
                schedule={schedule}
            />
        ))
        expect(shallowToJson(output)).toMatchSnapshot()
    })

    it('should render correcty if lastEvent was today', () => {
        const output = shallow((
            <Urgency
                today={today}
                lastEvent={today}
                schedule={schedule}
            />
        ))
        expect(shallowToJson(output)).toMatchSnapshot()
    })

    it('should render correcty if last event is not set', () => {
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
