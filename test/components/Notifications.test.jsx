import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Notifications from '../../src/components/notifications'

describe('Icon', () => {
    const notifications = [
        {
            id: 0,
            type: 'error',
            message: 'Error',
        },
    ]

    it('should return null if notifications array is empty', () => {
        const emptyNotifications = []
        const component = shallow(<Notifications notifications={emptyNotifications} />)
        expect(shallowToJson(component)).toMatchSnapshot()
    })

    it('should render correctly', () => {
        const component = shallow(<Notifications notifications={notifications} />)
        expect(shallowToJson(component)).toMatchSnapshot()
    })

    it('should call removeNotification if button is clicked', () => {
        const removeNotification = jest.fn()
        const component = shallow((
            <Notifications
                notifications={notifications}
                removeNotification={removeNotification}
            />
        ))
        component.find('button').simulate('click')
        expect(removeNotification.mock.calls.length).toBe(1)
    })
})
