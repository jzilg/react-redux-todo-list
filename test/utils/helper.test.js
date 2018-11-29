import moment from 'moment'
import { getTodaysDate, getDurationBetweenDates } from '../../src/utils/helper'

describe('helper', () => {
    it('getTodaysDate should return todays date in the right format', () => {
        const expectedToday = moment().format('YYYY-MM-DD')
        const today = getTodaysDate()
        expect(today).toEqual(expectedToday)
    })

    it('should return the right duration between two dates', () => {
        const duration = getDurationBetweenDates('2018-11-29', '2018-10-28')
        expect(duration).toBe(32)
    })
})
