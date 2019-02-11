export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface ApiOptions {
    method: string
    headers?: Headers
    body?: string
}

const JSONHeaders = new Headers({
    'Content-Type': 'application/json',
})

const defaultOptions: ApiOptions = {
    method: 'GET',
}

const postOptions: ApiOptions = {
    method: 'POST',
    headers: JSONHeaders,
}

const putOptions: ApiOptions = {
    method: 'PUT',
    headers: JSONHeaders,
}

const deleteOptions: ApiOptions = {
    method: 'DELETE',
}

function getApiOptions(method: HTTPMethod, body?: string): ApiOptions {
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
