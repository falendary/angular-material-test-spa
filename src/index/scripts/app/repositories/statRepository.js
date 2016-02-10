/**
 * Created by s.zhitenev on 10.02.2016.
 */

'use strict';

var host = 'http://test.quadrogroup.ru:4343/';
var contentApp = 'hr/';
var baseUrl = 'api/';

var toJson = function(data){
    return data.json();
};

var add = function(stat) {
    return fetch(host + contentApp + baseUrl + 'stat/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(stat)
    }).then(toJson);
};

var getByKey = function(id) {
    return fetch(host + contentApp + baseUrl + 'stat/' + id, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    }).then(toJson);
};

var update = function(id, stat) {
    return fetch(host + contentApp + baseUrl + 'stat/' + id, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(stat)
    }).then(toJson);
};

var deleteByKey = function(id) {
    return fetch(host + contentApp + baseUrl + 'stat/' + id, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    }).then(toJson);
};

module.exports = {
    add: add,
    getByKey: getByKey,
    update: update,
    deleteByKey: deleteByKey
};