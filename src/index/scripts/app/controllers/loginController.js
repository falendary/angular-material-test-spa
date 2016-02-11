/**
 * Created by s.zhitenev on 10.02.2016.
 */

var authService = require('../services/authService');

'use strict';
module.exports = function($scope, $state) {

    console.log('Login controller initialized...');

    var vm = this;

    vm.credentials = {username: 'PbpEjvwr8A', password: 'w33984GtRV'};

    vm.signIn = function(credentials) {
        authService.login(credentials.username, credentials.password).then(function(data){
            console.log('data', data);
            $state.go('interface.population');
        }).catch(function(){
            $state.go('interface.population');
        })
    }

};