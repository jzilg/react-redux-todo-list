import uiReducer, { defaultState } from '../../../src/redux/reducers/ui.reducer'
import { SET_LOADER, SET_NOTIFICATION, UNSET_NOTIFICATION } from '../../../src/redux/actions/ui.actions'

describe('uiReducer', () => {
    const loadingState = {
        ...defaultState,
        numOfLoadingRequests: 1,
        isLoading: true,
    }

    const notification = {
        id: 0,
        type: 'error',
        message: 'Error!',
    }

    const stateWithNotification = {
        ...defaultState,
        notifications: [
            ...defaultState.notifications,
            notification,
        ]
    }

    it('should return the initial state if no matching action is called', () => {
        const action = {
            type: '',
            payload: {},
        }

        expect(uiReducer(undefined, action)).toEqual(defaultState)
    })

    it('should return loading state if SET_LOADER is called with value true', () => {
        const action = {
            type: SET_LOADER,
            payload: {
                value: true,
            },
        }

        const expectedState = {
            ...defaultState,
            numOfLoadingRequests: 1,
            isLoading: true,
        }

        expect(uiReducer(defaultState, action)).toEqual(expectedState)
    })

    it('should return non loading state if SET_LOADER is called with value false', () => {
        const action = {
            type: SET_LOADER,
            payload: {
                value: false,
            },
        }

        expect(uiReducer(loadingState, action)).toEqual(defaultState)
    })

    it('should return state with notification if SET_NOTIFICATION is called', () => {
        const action = {
            type: SET_NOTIFICATION,
            payload: {
                notification,
            },
        }

        const expectedState = {
            ...defaultState,
            notifications: [
                notification,
            ],
        }

        expect(uiReducer(defaultState, action)).toEqual(expectedState)
    })

    it('should return default state if UNSET_LOADER is called', () => {
        const action = {
            type: UNSET_NOTIFICATION,
            payload: {
                notificationId: notification.id,
            },
        }

        expect(uiReducer(stateWithNotification, action)).toEqual(defaultState)
    })
})
