import expect from 'expect'
import todosSortByUrgency from '../../../src/redux/selectors/todosSortByUrgency.selector'

describe('todosSortByUrgency.selector', () => {
    const state = {
        todos: [
            {
                id: 1,
                name: 'Papa anrufen',
                schedule: 4,
                lastEvent: '2018-06-03',
            },
            {
                id: 2,
                name: 'Superfit',
                schedule: 3,
                lastEvent: '2018-05-11',
            },
            {
                id: 3,
                name: 'Mama anrufen',
                schedule: 7,
                lastEvent: '2018-05-12',
            },
        ],
    }

    it('should sort the todos by urgency', () => {
        const expectedList = [
            {
                id: 2,
                name: 'Superfit',
                schedule: 3,
                lastEvent: '2018-05-11',
            },
            {
                id: 3,
                name: 'Mama anrufen',
                schedule: 7,
                lastEvent: '2018-05-12',
            },
            {
                id: 1,
                name: 'Papa anrufen',
                schedule: 4,
                lastEvent: '2018-06-03',
            },
        ]

        const sortedTodos = todosSortByUrgency(state)
        expect(sortedTodos).toEqual(expectedList)
    })
})
