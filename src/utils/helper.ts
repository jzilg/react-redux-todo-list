import moment from 'moment'

/**
 * @returns {string} todays date (YYYY-MM-DD)
 */
export function getTodaysDate(): string {
    return moment().format('YYYY-MM-DD')
}

/**
 * @param {string} startDate moment date format
 * @param {string} endDate moment date format
 * @returns {number} duration in days
 */
export function getDurationBetweenDates(startDate, endDate): number {
    const startDateMoment = moment(startDate)
    const endDateMoment = moment(endDate)
    return startDateMoment.diff(endDateMoment, 'days')
}

function randomIntFromInterval(min: number, max: number): number {
    const { random, floor } = Math
    return floor(random() * (max - min + 1) + min)
}

/**
 * @returns {number} new id base64 of timestamp and random number
 */
export function createUniqueId(): number {
    const date = new Date()
    const time = date.getTime()
    const randomNumber = randomIntFromInterval(10000, 99999)
    return Math.floor(time / randomNumber)
}
