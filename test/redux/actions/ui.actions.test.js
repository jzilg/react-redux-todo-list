import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import { SET_LOADER, setLoader } from '../../../src/redux/actions/ui.actions'

describe('ui.actions', () => {
    const mockStore = configureMockStore()

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
})
