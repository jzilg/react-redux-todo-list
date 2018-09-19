import moment from 'moment'

/**
 * @returns {string} todays date (YYYY-MM-DD)
 */
export function getTodaysDate() {
    return moment().format('YYYY-MM-DD')
}

/**
 * @param {string} startDate moment date format
 * @param {string} endDate moment date format
 * @returns {number} duration in days
 */
export function getDurationBetweenDates(startDate, endDate) {
    const startDateMoment = moment(startDate)
    const endDateMoment = moment(endDate)
    return moment.duration(startDateMoment.diff(endDateMoment)).asDays()
}
