import LoginManager from '../Helpers/LoginManager';

const apiRequest = (url, method, parameters, block, signal, headers = {}) => {
    fetchJSON(url, {
        method,
        headers: {
            Accept: 'application/json',
            'Authorization': 'Bearer ' + LoginManager.shared().getToken(),
            'Content-Type': parameters instanceof FormData ? 'multipart/form-data' : 'application/json',
            ...headers,
        },
        body: parameters ? (parameters instanceof FormData ? parameters : JSON.stringify(parameters)) : null,
        signal,
    })
        .then((responseJson) => {
            console.log('responseJson', responseJson);
            block(null, responseJson);
        })
        .catch((error) => {
            // console.log('error', error);
            if ((error.message || '').includes('Network request failed')) {
                block(new Error('Отсутствует соединение с сервером'), null);
            } else {
                block(error, null);
            }
        });
};


const FETCH_TIMEOUT = 20000;

const timeoutFetch = (url, {method, headers, body, signal}) => {
    let didTimeOut = false;
    const request = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            didTimeOut = true;
            reject(new Error('Истекло время ожидания ответа от сервера'));
        }, FETCH_TIMEOUT);

        fetch(url, {
            method,
            headers,
            body,
            signal,
        })
            .then((response) => {
                // Clear the timeout as cleanup
                clearTimeout(timeout);
                if (!didTimeOut) {
                    resolve(response);
                }
            })
            .catch((err) => {
                // Clear the timeout as cleanup
                clearTimeout(timeout);
                // Rejection already happened with setTimeout
                if (didTimeOut) {
                    return;
                }
                // Reject with error
                reject(err);
            });
    });
    return request;
};

const fetchJSON = (url, {method, headers, body, signal}) => {
    return timeoutFetch(url, {
        method,
        headers,
        body,
        signal,
    })
        .then(validateResponse)
        .then(readResponseAsJSON)
        .catch(handleResponseError);
};

const validateResponse = (response) => {
    console.log('initial response', response);
    if (!response.ok) {
        return Promise.reject(response);
    }
    return response.text();
};

const readResponseAsJSON = (text) => {
    let res = {};
    if (text.length) {
        try {
            res = JSON.parse(text);
        } catch (e) {
            // do nothing
        }
    }
    return res;
};

const handleResponseError = (response) => {
    if (response instanceof Error) {
        return Promise.reject(response);
    }
    // explicitly returning a promise, because I can't figure out the right syntax otherwise
    return new Promise((resolve, reject) => {
        const statusText = `${response.status}: ${response.statusText}`;
        response.text() // response.json() doesn't appear to support sensible error handling of non-JSON
            .then((text) => {
                let jsonData = {};
                try {
                    jsonData = JSON.parse(text); // try to do our own parsing of the json here
                } catch (err) {
                    // do nothing
                }
                return jsonData;
            })
            .then((jsonData) => {
                console.log('JSON error from response', jsonData);
                if (jsonData) {
                    return reject(jsonData, response.status);
                }
                return reject(new Error(statusText));
            });
    });
};

export {
    apiRequest,
};
