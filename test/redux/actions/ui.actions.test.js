import configureMockStore from 'redux-mock-store'
import {
    setLoader,
    setNotification,
    unsetNotification,
    SET_LOADER,
    SET_NOTIFICATION,
    UNSET_NOTIFICATION,
} from '../../../src/redux/actions/ui.actions'

describe('ui.actions', () => {
    const mockStore = configureMockStore()

    const notificationId = 0
    const notification = {
        id: notificationId,
        type: 'error',
        message: 'Error!',
    }

    it('should return correct action if setLoader is called', () => {
        const store = mockStore()
        const value = true
        const triggeredBy = 'SOME_ACTION'

        const expectedActions = [
            {
                type: SET_LOADER,
                payload: {
                    value,
                },
                meta: {
                    triggeredBy,
                },
            },
        ]

        store.dispatch(setLoader(value, triggeredBy))

        expect(store.getActions()).toEqual(expectedActions)
    })

    it('should return correct action if setNotification is called', () => {
        const store = mockStore()
        const triggeredBy = 'SOME_ACTION'

        const expectedActions = [
            {
                type: SET_NOTIFICATION,
                payload: {
                    notification,
                },
                meta: {
                    triggeredBy,
                },
            },
        ]

        store.dispatch(setNotification(notification, triggeredBy))

        expect(store.getActions()).toEqual(expectedActions)
    })

    it('should return correct action if unsetNotification is called', () => {
        const store = mockStore()
        const triggeredBy = 'SOME_ACTION'

        const expectedActions = [
            {
                type: UNSET_NOTIFICATION,
                payload: {
                    notificationId,
                },
                meta: {
                    triggeredBy,
                },
            },
        ]

        store.dispatch(unsetNotification(notificationId, triggeredBy))

        expect(store.getActions()).toEqual(expectedActions)
    })
})
