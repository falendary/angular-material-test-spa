/**
 * Created by s.zhitenev on 10.02.2016.
 */

'use strict';
module.exports = function($scope) {

    console.log('Shell controller initialized...');

    var vm = this;

    vm.menu = [
        {
            state : 'interface.population',
            title: 'Population',
            icon: 'dashboard'
        },
        {
            state : 'interface.goods',
            title: 'Goods',
            icon: 'group'
        },
        {
            state : 'logout',
            title: 'Logout',
            icon: 'message'
        }
    ];

};