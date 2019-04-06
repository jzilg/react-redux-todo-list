import React, { ReactElement } from 'react'
import { getDurationBetweenDates } from '../../utils/date'

interface Props {
    today: string
    lastEvent: string
    schedule: number
}

function Urgency(props: Props): ReactElement {
    const { today, lastEvent, schedule } = props

    if (!lastEvent || !schedule) {
        return (
            <span>
                ?
            </span>
        )
    }

    function getUrgency(duration: number): string {
        let days = schedule - duration
        if (days < 0) {
            days = -(days)
        }

        const dayText = days === 1 ? 'Day' : 'Days'
        const timeText = duration > schedule ? 'late' : 'left'

        return days === 0 ? 'Do it today' : `${days} ${dayText} ${timeText}`
    }

    function getUrgencyColor(duration: number): string {
        let color = ''

        if (duration !== schedule) {
            color = duration > schedule ? 'font-red' : 'font-green'
        }

        return color
    }

    const duration: number = getDurationBetweenDates(today, lastEvent)
    const color: string = getUrgencyColor(duration)
    const urgency: string = getUrgency(duration)

    return (
        <span className={color}>
            {urgency}
        </span>
    )
}

export default Urgency
