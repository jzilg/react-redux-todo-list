import expect from 'expect'
import { RECEIVE_ERROR, receiveError } from '../../../src/redux/actions/error.actions'

describe('error.actions', () => {
    it('should create the action RECEIVE_ERROR if receiveError is called', () => {
        const error = {
            msg: 'Error!',
        }
        const expectedAction = {
            type: RECEIVE_ERROR,
            payload: {
                error,
            },
        }

        expect(receiveError(error)).toEqual(expectedAction)
    })
})
