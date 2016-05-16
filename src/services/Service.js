class Service {
    constructor() {}

    static httpAsync(url, operation) {
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();

            request.onload = function () {
                if (request.status == 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject(request.statusText);
                }
            };

            request.onerror = function() {
                reject("Network Error");
            };

            request.open(operation, url, true);
            request.setRequestHeader('Content-type', 'application/json');
            request.setRequestHeader('Accept', 'application/json');
            request.send();
        });
    }

    static httpSendAsync(url, operation, data) {
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();

            request.onload = function() {
                if (request.status == 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject(request.statusText);
                }
            };

            request.onerror = function() {
                reject("Network Error");
            };

            request.open(operation, url, true);
            request.setRequestHeader('Content-type', 'application/json');
            request.setRequestHeader('Accept', 'application/json');
            request.send(JSON.stringify(data));
        });
    }
}

module.exports = Service;