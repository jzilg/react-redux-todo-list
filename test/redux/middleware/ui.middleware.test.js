import uiMiddleware from '../../../src/redux/middleware/ui.middleware'

describe('uiMiddleware', () => {
    const next = jest.fn()
    const store = jest.fn()
    store.dispatch = jest.fn()

    it('should not call dispatch an action if no meta.showLoader is set', () => {
        const action = {
            type: 'SOME_ACTION',
        }

        uiMiddleware(store)(next)(action)

        expect(store.dispatch.mock.calls.length).toBe(0)
    })

    it('should call dispatch an action if no meta.showLoader is set', () => {
        const action = {
            type: 'SOME_ACTION',
            meta: {
                showLoader: true,
            },
        }

        uiMiddleware(store)(next)(action)

        expect(store.dispatch.mock.calls.length).toBe(1)
    })
})
