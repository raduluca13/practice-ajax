class AuthService {
    static login(successCb, errorCb){
        HTTP.request(
            'POST',
            '/login',
            { 
                'content-type': 'application/json',
            },
            (response, headers)=>{
                localStorage.setItem('firstItem', headers['token']);
                successCb();
            },
            errorCb
        );
    }

    static logout(successCb, errorCb, token){
        console.log()
        HTTP.request(
            'POST',
            '/logout',
            { 
                'content-type': 'application/json',
                'token' : localStorage.getItem('firstItem')
            },
            (response, headers)=>{
                localStorage.removeItem('firstItem');
                successCb();
            },
            errorCb
        );
    }
}