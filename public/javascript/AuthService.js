class AuthService {
    static login(successCb, errorCb){
        HTTP.request(
            'POST',
            '/login',
            { 
                'content-type': 'application/json',
            },
            (response, headers)=>{
                localStorage.setItem('firstUser', headers['token']);
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
                'token' : localStorage.getItem('firstUser')
            },
            (response, headers)=>{
                localStorage.removeItem('firstUser');
                successCb();
            },
            errorCb
        );
    }
}