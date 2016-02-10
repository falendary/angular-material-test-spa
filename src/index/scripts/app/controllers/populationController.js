/**
 * Created by s.zhitenev on 10.02.2016.
 */

'use strict';
module.exports = function ($scope, $mdDialog) {

    console.log('Population controller initialized...');

    var vm = this;

    vm.populationTableQuery = {
        groupItems: false,
        order: 'population'
    };

    vm.stats = [
        {
            id: 1,
            country: 'Russia',
            city: 'Moscow',
            population: 24000000
        },
        {
            id: 2,
            country: 'Russia',
            city: 'St.Peterburg',
            population: 12000000
        },
        {
            id: 3,
            country: 'USA',
            city: 'New York',
            population: 20000000
        },
        {
            id: 4,
            country: 'USA',
            city: 'Washington',
            population: 5000000
        }
    ];

    function tableSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    function transformStats(items, property) {

        var grouped = [];
        var i;

        var isGroupAlreadyAdded = function (items, property, value) {
            var i;
            for (i = 0; i < items.length; i = i + 1) {
                if (items[i][property] === value) {
                    return true;
                }
            }
        };

        var addGroupRoots = function (item) {
            var keys = Object.keys(item);
            var obj;
            var value;
            var p;
            for (p = 0; p < keys.length; p = p + 1) {
                if (keys[p] === property) {
                    obj = {};
                    value = item[property];
                    obj[property] = value;
                    if (!isGroupAlreadyAdded(grouped, property, value)) {
                        grouped.push(obj);
                    }
                    fillWithProps(item, property);
                }
            }
        };

        var fillWithProps = function (currentItem, groupByProperty) {
            var i;
            var p;
            var keys;
            var obj;
            for (i = 0; i < grouped.length; i = i + 1) {
                if (grouped[i][groupByProperty] === currentItem[groupByProperty]) {
                    keys = Object.keys(currentItem);
                    for (p = 0; p < keys.length; p = p + 1) {
                        console.log(grouped[i][keys[i] + 'Array']);
                        if (typeof grouped[i][keys[i] + 'Array'] === 'undefined') {
                            grouped[i][keys[i] + 'Array'] = [];
                        }
                        obj = {};
                        obj[keys[i]] = currentItem[keys[i]];
                        grouped[i][keys[i] + 'Array'].push(obj);
                    }
                }
            }
        };

        for (i = 0; i < items.length; i = i + 1) {
            addGroupRoots(items[i]);
        }

        console.log('grouped', grouped);

        return grouped;
    }

    vm.openSettings = function ($event) {
        console.log('$mdDialog', $mdDialog);
        var parent = angular.element(document.body);
        $mdDialog.show({
            parent: parent,
            scope: $scope.$new(),
            targetEvent: $event,
            templateUrl: 'settings-dialog-view.html',
            bindToController: true,
            locals: {
                query: vm.populationTableQuery
            },
            controller: DialogController,
            controllerAs: 'vm'
        }).then(function (result) {
            console.log('result', result);
            vm.populationTableQuery = result;
            vm.stats = vm.stats.sort(tableSort(vm.populationTableQuery.order));
            if (vm.populationTableQuery.groupItems) {
                vm.statsGrouped = transformStats(vm.stats, 'country');
            }
        });

        function DialogController() {
            console.log('here?', this);
            var vm = this;

            // изначально хотел сделать вьюшку не захардкоженной, но
            // решил что это не требуется от задачи

            vm.closeDialog = function () {
                $mdDialog.hide(vm.query);
            }
        }
    };

    vm.onReorder = function (order) {
        vm.stats = vm.stats.sort(tableSort(order));
        console.log('order', order);
    }

};