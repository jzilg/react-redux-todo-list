type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ApiOptionsHeaders {
    'Content-Type': string
}

interface ApiOptions {
    method: string
    headers?: ApiOptionsHeaders
    body?: object
}

const defaultOptions: ApiOptions = {
    method: 'GET',
}

const postOptions: ApiOptions = {
    ...defaultOptions,
    method: 'POST',
    headers: {
        ...defaultOptions.headers,
        'Content-Type': 'application/json',
    },
}

const putOptions: ApiOptions = {
    ...defaultOptions,
    method: 'PUT',
    headers: {
        ...defaultOptions.headers,
        'Content-Type': 'application/json',
    },
}

const deleteOptions: ApiOptions = {
    ...defaultOptions,
    method: 'DELETE',
}

function getApiOptions(method: Method, body?: object): ApiOptions {
    const options = {
        GET: defaultOptions,
        POST: body ? {
            ...postOptions,
            body,
        } : postOptions,
        PUT: body ? {
            ...putOptions,
            body,
        } : putOptions,
        DELETE: deleteOptions,
    }

    return options[method]
}

export default getApiOptions
