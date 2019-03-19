import getApiOptions from '../../src/redux/api-options'

describe('getApiOptions', () => {
    it('should return the requested method', () => {
        const method = 'GET'
        const expectedOptions = {
            method,
        }
        const apiOptions = getApiOptions({ method })
        expect(expectedOptions).toEqual(apiOptions)
    })

    it('should return headers if headers is passed to function', () => {
        const method = 'GET'
        const headers = {
            token: 'foo',
        }
        const expectedOptions = {
            method,
            headers,
        }
        const apiOptions = getApiOptions({ method, headers })
        expect(expectedOptions).toEqual(apiOptions)
    })

    it('should return headers if method is POST', () => {
        const method = 'POST'
        const expectedOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const apiOptions = getApiOptions({ method })
        expect(expectedOptions).toEqual(apiOptions)
    })

    it('should return headers if method is PUT', () => {
        const method = 'PUT'
        const expectedOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const apiOptions = getApiOptions({ method })
        expect(expectedOptions).toEqual(apiOptions)
    })

    it('should return body if body is passed to function', () => {
        const method = 'GET'
        const body = {
            todo: 'foo',
        }
        const expectedOptions = {
            method,
            body,
        }
        const apiOptions = getApiOptions({ method, body })
        expect(expectedOptions).toEqual(apiOptions)
    })
})
