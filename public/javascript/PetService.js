class PetService {
    static getPets(successCb, errorCb, name = undefined) {
        if (name !== undefined) {
            HTTP.request('GET', `/pets/?name=${name}`, {}, successCb, errorCb);
        } else {
            HTTP.request('GET', `/pets`, {}, successCb, errorCb);
        }
    }

    static getPet(successCb, errorCb, id = undefined) {
        if (id !== undefined) {
            HTTP.request(
                'GET',
                `/pets/${id}`,
                { 
                    'token': localStorage.getItem('FirstUser') 
                },
                successCb,
                errorCb
            );
        } else {
            console.log('error');
            // errorCb('BAD REQUEST');
        }
    }

    static addPet(payload, successCb, errorCb) {
        console.log(payload);
        HTTP.request(
            'POST',
            `/pets`,
            {
                'token': localStorage.getItem('FirstUser'),
                'content-type': 'application/json'
            },
            successCb,
            errorCb,
            JSON.stringify(payload)
        );
    }

    static updatePet(payload, successCb, errorCb) {
        HTTP.request(
            'POST',
            `/pets/${payload}`,
            {
                'token': localStorage.getItem('FirstUser'),
                'content-type': 'application/json'
            },
            successCb,
            errorCb,
            payload
        );
    }

    static deletePets(id, successCb, errorCb) {
        HTTP.request(
            'DELETE',
            `/pets`,
            {
                'token': localStorage.getItem('FirstUser'),
                'content-type': 'application/json'
            },
            successCb,
            errorCb
        );
    }

    static deletePet(id, successCb, errorCb) {
        HTTP.request(
            'DELETE',
            `/pets/${id}`,
            {
                'token': localStorage.getItem('FirstUser'),
                'content-type': 'application/json'
            },
            successCb,
            errorCb,
        );
    }
}
