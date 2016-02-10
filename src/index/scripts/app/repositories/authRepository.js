/**
 * Created by s.zhitenev on 10.02.2016.
 */

'use strict';

var host = 'http://test.quadrogroup.ru:4343/';
var contentApp = 'hr/';
var baseUrl = 'auth/';

var toJson = function(data){
    return data.json();
};

var login = function (username, password) {
    return fetch(host + contentApp + baseUrl + 'login/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
    }).then(toJson);
};

var logout = function() {
    return fetch(host + contentApp + baseUrl + 'logout/', {
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    }).then(toJson);
};

module.exports = {
    login: login,
    logout: logout
};
