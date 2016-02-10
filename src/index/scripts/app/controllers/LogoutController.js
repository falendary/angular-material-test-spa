/**
 * Created by s.zhitenev on 10.02.2016.
 */

'use strict';

module.exports = function($scope, $state) {

    console.log('Logout controller initialized...');

    var vm = this;

    $state.go('login');
};