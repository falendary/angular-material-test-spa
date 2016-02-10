/**
 * Created by s.zhitenev on 10.02.2016.
 */

var authService = require('../services/authService');

'use strict';
module.exports = function($scope) {

    console.log('Login controller initialized...');

    var vm = this;

    vm.credentials = {username: null, password: null};

    vm.signIn = function(credentials) {
        authService.login(credentials.username, credentials.password).then(function(data){
            console.log('data', data);
        })
    }

};