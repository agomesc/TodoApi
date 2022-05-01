function HttpClient(uri) {
    return {
        async get(id) {
            return await fetch(`${uri}/${id}`, {
                method: 'GET',
            }).then(this.handleErrorsAsync);
        },
        async list() {
            return await fetch(uri, {
                method: 'GET'
            }).then(this.handleErrorsAsync);
        },
        async post(model = {}) {
            return await fetch(uri, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(model)
            }).then(this.handleErrorsAsync);
        },
        async put(id, model = {}) {
            return await fetch(`${uri}/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(model)
            });
        },
        async delete(id) {
            return await fetch(`${uri}/${id}`, {
                method: 'DELETE'
            });
        },
        async handleErrorsAsync(response) {
            if (response.ok) {
                return await response.json();
            }
            return await Promise.reject(response.json());
        }
    }
}


