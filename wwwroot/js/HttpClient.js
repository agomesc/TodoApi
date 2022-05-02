const HttpClient = (uri) => {

    const httpClient = {};

    get = async (id) =>
        await fetch(`${uri}/${id}`, {
            method: 'GET',
        }).then(this.handleErrorsAsync);


    list = async () => await fetch(uri, { method: 'GET' })
        .then(this.handleErrorsAsync);

    post = async (model = {}) => await fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
    }).then(this.handleErrorsAsync);


    put = async (id, model = {}) => await fetch(`${uri}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
    });

    del = async (id) => await fetch(`${uri}/${id}`, { method: 'DELETE' });

    handleErrorsAsync = async (response) => {
        if (response.ok) {
            return await response.json();
        }
        return await Promise.reject(response.json());
    }

    //Publicos
    httpClient.list = list;
    httpClient.post = post;
    httpClient.put = put;
    httpClient.del = del;
    httpClient.handleErrorsAsync = handleErrorsAsync;

    return httpClient;

}


