/**
 * Created by s.zhitenev on 10.02.2016.
 */

'use strict';

module.exports = function($scope, $state) {

    console.log('Logout controller initialized...');

    var vm = this;

    var delete_cookie = function(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    delete_cookie('sessionid');
    delete_cookie('csrftoken');

    $state.go('login');
};