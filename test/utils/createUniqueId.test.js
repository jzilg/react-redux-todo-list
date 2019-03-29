import createUniqueId from '../../src/utils/createUniqueId'

describe('createUniqueId', () => {
    it('should not create the same id', () => {
        const random0 = createUniqueId()
        const random1 = createUniqueId()
        expect(random0).not.toBe(random1)
    })

    it('should return a number with 10 digdets', () => {
        const random = createUniqueId()
        const randomAsString = String(random)
        expect(randomAsString.length).toBe(10)
    })
})
