class PetService{
    static getPets(successCb, errorCb, name = undefined){
        let request = new XMLHttpRequest();
        console.log(name);
        // debugger;
        if(name !== undefined){
            request.open('GET', `/pets/?name=${name}`);
        }
        else{
            request.open('GET', '/pets');
        }
        
        // request.setRequestHeader('content-type', 'application/json');
        request.addEventListener('load', event => {
            switch(request.status){
                case 200:
                    successCb(JSON.parse(request.response));
                    break;
                case 401:
                    errorCb(401);
                    break;
            }
        });
        request.addEventListener('error', event => {
            errorCb('error');
        });

        request.send();
    }

    static getPet(successCb, errorCb, id=undefined){
        let request = new XMLHttpRequest();
        if(id !== undefined){
            request.open('GET', `/pets/${id}`);
        }
        else{
            errorCb('BAD REQUEST');
        }
        
        request.addEventListener('load', event => {
            switch(request.status){
                case 200:
                    successCb(JSON.parse(request.response));
                    break;
                case 401:
                    errorCb(401);
                    break;
                case 404:
                    errorCb(404);
                    break;
            }
        });
        request.addEventListener('error', event => {
            errorCb('error');
        });

        request.send();
    }

    static addPet(payload, successCb, errorCb){
        let request = new XMLHttpRequest();
        request.open('POST', '/pets');
        request.setRequestHeader('content-type', 'application/json');
        request.addEventListener('load', event => {
            switch(request.status){
                case 200:
                    successCb(JSON.parse(request.response));
                    break;
                case 401:
                    errorCb(401);
                    break;
            }
        });
        request.addEventListener('error', event => {
            errorCb('error');
        });

        request.send(payload);
    }

    static updatePet(payload, successCb, errorCb){
        let request = new XMLHttpRequest();
        console.log(payload);
        request.open('PUT', `/pets/${payload['id']}`);
        request.setRequestHeader('content-type', 'application/json');
        request.addEventListener('load', event => {
            switch(request.status){
                case 200:
                    successCb(JSON.parse(request.response));
                    break;
                case 401:
                    errorCb(401);
                    break;
                case 404:
                    errorCb(404);
                    break;
            }
        });
        request.addEventListener('error', event => {
            errorCb('error');
        });

        request.send(payload);
    }

    static deletePets(id, successCb, errorCb){
        let request = new XMLHttpRequest();
        request.open('DELETE', `/pets}`);
        request.setRequestHeader('content-type', 'application/json');
        request.addEventListener('load', event => {
            switch(request.status){
                case 200:
                    successCb(JSON.parse(request.response));
                    break;
                case 401:
                    errorCb(401);
                    break;
            }
        });
        request.addEventListener('error', event => {
            errorCb('error');            
        });

        request.send();
    }
    
    static deletePet(id, successCb, errorCb){
        let request = new XMLHttpRequest();
        request.open('DELETE', `/pets/${id}`);
        request.setRequestHeader('content-type', 'application/json');
        request.addEventListener('load', event => {
            switch(request.status){
                case 200:
                    console.log(request.response);
                    successCb();
                    break;
                case 401:
                    errorCb(401);
                    break;
            }
        });
        request.addEventListener('error', event => {
            errorCb('error');            
        });

        request.send();
    }

}