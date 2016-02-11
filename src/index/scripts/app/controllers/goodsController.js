/**
 * Created by s.zhitenev on 10.02.2016.
 */

'use strict';
module.exports = function($scope, $mdDialog) {

    console.log('Goods controller initialized...');

    var vm = this;

    vm.items = [
        {
            id: 1,
            name: 'Orange',
            value_int: 100,
            value_float: 1.5,
            categories: [
                {
                    id: 2,
                    name: 'citrus',
                    description: ''
                },
                {
                    id: 3,
                    name: 'fresh',
                    description: ''
                }
            ]
        },
        {
            id: 4,
            name: 'Banana',
            value_int: 300,
            value_float: 2.9,
            categories: [
                {
                    id: 5,
                    name: 'palma',
                    description: ''
                }
            ]
        }
    ]



};