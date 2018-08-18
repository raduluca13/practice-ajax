class AuthService {
    static login(successCb, errorCb){
        let request = new XMLHttpRequest();
       
        request.open('POST', `/login`);
        request.setRequestHeader('content-type', 'application/json');
        
        request.addEventListener('load', event => {
            switch(request.status){
                case 200:
                    // console.log(request);
                    successCb();
                    break;
                case 401:
                    errorCb(request.getResponseHeader('token'));
                    break;
            }
        });
        request.addEventListener('error', event => {
            errorCb('error');
        });

        request.send();
    }

    static logout(successCb, errorCb){
        let request = new XMLHttpRequest();
       
            request.open('GET', `/pets/?name=${name}`);
        
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
}