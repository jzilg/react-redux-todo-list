import uiMiddleware from '../../../src/redux/middleware/ui.middleware'

jest.useFakeTimers()

describe('uiMiddleware', () => {
    const next = jest.fn()
    const store = jest.fn()

    it('should not call dispatch an action if no meta.showLoader is set', () => {
        store.dispatch = jest.fn()
        const action = {
            type: 'SOME_ACTION',
        }

        uiMiddleware(store)(next)(action)

        expect(store.dispatch.mock.calls.length).toBe(0)
    })

    it('should call dispatch an action if meta.showLoader is set', () => {
        store.dispatch = jest.fn()
        const action = {
            type: 'SOME_ACTION',
            meta: {
                ui: {
                    showLoader: true,
                },
            },
        }

        uiMiddleware(store)(next)(action)

        expect(store.dispatch.mock.calls.length).toBe(1)
    })

    it('should call dispatch an action if no meta.notification is set', () => {
        store.dispatch = jest.fn()
        const action = {
            type: 'SOME_ACTION',
            meta: {
                ui: {
                    notification: {},
                },
            },
        }

        uiMiddleware(store)(next)(action)

        expect(store.dispatch.mock.calls.length).toBe(1)
    })

    it('should call dispatch twice an action if no meta.notification.duration is set', () => {
        store.dispatch = jest.fn()
        const duration = 1000
        const action = {
            type: 'SOME_ACTION',
            meta: {
                ui: {
                    notification: {
                        duration,
                    },
                },
            },
        }

        uiMiddleware(store)(next)(action)

        jest.advanceTimersByTime(duration)
        expect(store.dispatch.mock.calls.length).toBe(2)
    })
})
