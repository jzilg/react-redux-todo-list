import moment from 'moment'
import { getTodaysDate, getDurationBetweenDates } from '../../src/utils/helper'

describe('helper', () => {
    it('getTodaysDate should return todays date in the right format', () => {
        const expectedToday = moment().format('YYYY-MM-DD')
        const today = getTodaysDate()
        expect(today).toEqual(expectedToday)
    })

    it('should return -1 if the date one is one day behind date two', () => {
        const duration = getDurationBetweenDates('2018-09-18', '2018-09-19')
        expect(duration).toBe(-1)
    })
})
