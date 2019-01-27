import React, { ReactElement } from 'react'
import PropTypes from 'prop-types'
import { getDurationBetweenDates } from '../../utils/helper'

const Urgency = ({ today, lastEvent, schedule }): ReactElement<{}> => {
    if (!lastEvent || !schedule) {
        return (
            <span>
                ?
            </span>
        )
    }

    /**
     * @param {number} duration
     * @returns {string}
     */
    function getUrgency(duration): string {
        let days = schedule - duration
        if (days < 0) {
            days = -(days)
        }

        const dayText = days === 1 ? 'Day' : 'Days'
        const timeText = duration > schedule ? 'late' : 'left'

        return days === 0 ? 'Do it today' : `${days} ${dayText} ${timeText}`
    }

    /**
     * @param {number} duration
     * @returns {string}
     */
    function getUrgencyColor(duration): string {
        let color = ''

        if (duration !== schedule) {
            color = duration > schedule ? 'font-red' : 'font-green'
        }

        return color
    }

    const duration = getDurationBetweenDates(today, lastEvent)
    const color = getUrgencyColor(duration)
    const urgency = getUrgency(duration)

    return (
        <span className={color}>
            {urgency}
        </span>
    )
}

Urgency.propTypes = ({
    today: PropTypes.string.isRequired,
    lastEvent: PropTypes.string.isRequired,
    schedule: PropTypes.number.isRequired,
})

export default Urgency
