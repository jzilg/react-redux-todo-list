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
