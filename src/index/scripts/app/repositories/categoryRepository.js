/**
 * Created by s.zhitenev on 10.02.2016.
 */
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

var add = function(category) {
    return fetch(host + contentApp + baseUrl + 'category/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(category)
    }).then(toJson);
};

var getByKey = function(id) {
    return fetch(host + contentApp + baseUrl + 'category/' + id, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    }).then(toJson);
};

var update = function(id, category) {
    return fetch(host + contentApp + baseUrl + 'category/' + id, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(category)
    }).then(toJson);
};

var deleteByKey = function(id) {
    return fetch(host + contentApp + baseUrl + 'category/' + id, {
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