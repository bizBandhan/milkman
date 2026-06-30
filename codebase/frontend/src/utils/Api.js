export class API {
    #tokenPath
    #token
    #controller = new Map();
    constructor(baseUrl = "", tokenPath = "token") {
        this.#tokenPath = tokenPath;
        this.baseUrl = baseUrl;
    }
    set Token(token) {
        this.#token = token
    }
    cancel(requestKey) {
        if (!requestKey) return;
        const controller = this.#controller.get(requestKey);
        if (!controller) return;
        controller.abort();
        this.#controller.delete(requestKey);
    }
    async request(method, endpoint, { body, headers = {} } = {}) {
        let requestKey = `${method}-${endpoint}`;
        const controller = new AbortController();
        this.cancel(requestKey);
        this.#controller.set(requestKey, controller)
        const url = `${this.baseUrl}${endpoint}`;
        const token = typeof window !== 'undefined'
            ? localStorage.getItem(this.#tokenPath)
            : null;

        // Set default headers
        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${this.#token ?? token}` }),
        };

        // Merge headers
        const mergedHeaders = {
            ...defaultHeaders,
            ...headers,
        };

        // Handle FormData content type
        if (body instanceof FormData) {
            delete mergedHeaders['Content-Type'];
        }

        const config = {
            method,
            headers: mergedHeaders,
            credentials: "include",
            signal: controller.signal
        };

        if (body && method !== 'GET') {
            config.body = body instanceof FormData ? body : JSON.stringify(body);
        }
        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                let errorData = await parseResponseError(response);


                document.dispatchEvent(
                    new CustomEvent('error-received', {
                        detail: {
                            status: response.status,
                            message: errorData.message
                        },
                    })
                )
                return errorData;//throw new Error(errorData.message || 'Request failed');
            }
            return response.json();

        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Cancelled : ", requestKey);
                return {
                    status: "canceled",
                    data: [],
                    message: ""
                };
            }
            throw error;
        } finally {
            this.#controller.delete(requestKey);
        }
    }
    async getHtml(url, config = { mode: "no-cors" }) {
        console.log(url);

        const response = await fetch(url, config);
        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
                console.log(errorData)
            } catch {

                errorData = { message: response.statusText };
            }

            document.dispatchEvent(
                new CustomEvent('error-received', {
                    detail: {
                        status: response.status,
                        message: errorData.message
                    },
                })
            )
            return errorData;//throw new Error(errorData.message || 'Request failed');
        }
        return await response.text();
    }
    get(endpoint, options = {}) {
        return this.request('GET', endpoint, options);
    }

    post(endpoint, body, options = {}) {
        return this.request('POST', endpoint, { ...options, body });
    }

    put(endpoint, body, options = {}) {
        return this.request('PUT', endpoint, { ...options, body });
    }

    patch(endpoint, body, options = {}) {
        return this.request('PATCH', endpoint, { ...options, body });
    }

    delete(endpoint, body, options = {}) {
        return this.request('DELETE', endpoint, { ...options, body });
    }
    copy(endpoint, body = {}, options = {}) {
        return this.request('COPY', endpoint, { ...options, body });
    }
}


const api = new API();
export default api;