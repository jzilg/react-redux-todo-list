import expect from 'expect'
import { RECEIVE_ERROR, receiveError } from '../../../src/redux/actions/error.actions'

describe('error.actions', () => {
    it('should create the action RECEIVE_ERROR if receiveError is called', () => {
        const errorMsg = 'ErrorMsg!'

        const expectedAction = {
            type: RECEIVE_ERROR,
            payload: {
                errorMsg,
            },
        }

        expect(receiveError(errorMsg)).toEqual(expectedAction)
    })
})
