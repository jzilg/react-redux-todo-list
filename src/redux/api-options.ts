export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface ApiOptions {
    method: HTTPMethod
    headers?: Headers
    body?: string
}

interface ApiOptionsConfig {
    method: HTTPMethod
    headers?: object
    body?: string
}

function getApiOptions({ method, headers, body }: ApiOptionsConfig): ApiOptions {
    const options: ApiOptions = {
        method,
    }

    if (method === 'POST' || method === 'PUT') {
        options.headers = new Headers({
            'Content-Type': 'application/json',
            ...headers,
        })
    } else if (headers) {
        options.headers = new Headers({
            ...headers,
        })
    }

    if (body) {
        options.body = body
    }

    return options
}

export default getApiOptions
