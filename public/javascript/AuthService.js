class AuthService {
    static login(successCb, errorCb){
        let request = new XMLHttpRequest();
       
        request.open('POST', `/login`);
        request.setRequestHeader('content-type', 'application/json');
        
        request.addEventListener('load', event => {
            switch(request.status){
                case 200:
                    // console.log(request);
                    localStorage.setItem('FirstUser', JSON.stringify(request.getResponseHeader('token')));
                    successCb('success');
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

    static logout(successCb, errorCb, token){
        let request = new XMLHttpRequest();
       
        request.open('POST', `/logout`);
        
        request.setRequestHeader('content-type', 'application/json');
        request.setRequestHeader('token', JSON.parse(localStorage.getItem('FirstUser')));
        request.addEventListener('load', event => {
            switch(request.status){
                case 200:
                    console.log('resp: ', request.response);
                    localStorage.removeItem('FirstUser');
                    successCb(request.response);
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