const defaultOptions = {
    method: 'GET',
}

const postOptions = {
    ...defaultOptions,
    method: 'POST',
    headers: {
        ...defaultOptions.headers,
        'Content-Type': 'application/json',
    },
}

const putOptions = {
    ...defaultOptions,
    method: 'PUT',
    headers: {
        ...defaultOptions.headers,
        'Content-Type': 'application/json',
    },
}

const deleteOptions = {
    ...defaultOptions,
    method: 'DELETE',
}

/**
 * @param {string} [method]
 * @param {string} [body = undefined]
 * @returns {Object} fetch options
 */
function getApiOptions(method, body = undefined) {
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
