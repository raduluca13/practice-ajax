class HTTP {
    static request(
        method,
        url,
        headers = { 'content-type': 'application/json' },
        successCb,
        errorCb,
        payload = undefined
    ) {
        let xhr = new XMLHttpRequest();

        xhr.open(method, url);
        console.log('HTTP request headers: ', headers);
        if (headers !== null) {
            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });
        }

        xhr.addEventListener('load', function onLoad() {
            let headers = xhr.getAllResponseHeaders();
            let arr = headers.trim().split(/[\r\n]+/);
            let headerMap = {};
            arr.forEach(function(line) {
                let parts = line.split(': ');
                let header = parts.shift();
                let value = parts.join(': ');
                headerMap[header] = value;
            });
            console.log('HTTP response headers: ', headerMap);
            switch (xhr.status) {
                case 200:
                    if (xhr.response !== '') {
                        successCb(JSON.parse(xhr.response), headerMap);
                    } else {
                        successCb(null, headerMap);
                    }
                    break;
                default:
                    if (xhr.response !== '') {
                        errorCb(xhr.response, xhr.status, headerMap);
                    } else {
                        errorCb(null, xhr.status, headerMap);
                    }
                    break;
            }
        });

        xhr.addEventListener('error', function onError() {
            errorCb('Network error');
        });

        console.log('HTTP payload: ', payload);
        if (payload !== undefined) {
            xhr.send(payload);
        } else {
            xhr.send();
        }
    }
}
