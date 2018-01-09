import moment from 'moment'

export function getTodaysDate() {
    return moment().format('YYYY-MM-DD')
}

export function getDurationBetweenDates(startDate, endDate) {
    const startDateMoment = moment(startDate)
    const endDateMoment = moment(endDate)
    return moment.duration(startDateMoment.diff(endDateMoment)).asDays()
}
