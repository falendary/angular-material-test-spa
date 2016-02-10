/**
 * Created by s.zhitenev on 10.02.2016.
 */

'use strict';

var authRepository = require('../repositories/authRepository');

var login = function(username, password) {
    return authRepository.login(username, password);
};

var logout = function() {
    return authRepository.logout();
};

module.exports = {
    login: login,
    logout: logout
};