function HttpClient(url) {
    //https://reqbin.com/

    return {
        async get(id) {
            return await fetch(`${url}/${id}`, {
                method: 'GET',
            }).then(this.handleErrorsAsync);
        },
        async list() {
            return await fetch(url, {
                method: 'GET'
            }).then(this.handleErrorsAsync);
        },
        async post(model = {}) {
            return await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({model})
            }).then(this.handleErrorsAsync);
        },
        async put(id, model = {}) {
            return await fetch(`${url}/${id}`, model, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model
                })
            }).then(this.handleErrorsAsync);
        },
        async delete(id) {
            return await fetch(`${url}/${id}`, {
                method: 'DELETE'
            }).then(this.handleErrorsAsync);
        },
        async handleErrorsAsync(response) {
        if (response.ok) {
            return await response.json();
        }
        return await Promise.reject(response.json());
    }
    }
}
 

// (async () => {

//     const httpClient = HttpClient('https://localhost:44342/api/LoggedArea');
//     let model = {
//         "userName": "user1",
//         "password": "user1"
//      };

//     const result = await httpClient.post(model);
    
//     console.log(result);

//     result.then(function (result) {
//         console.log(result);
//     });    

// })();


