/**
 * Created by s.zhitenev on 10.02.2016.
 */

var statService = require('../services/statService');

'use strict';
module.exports = function ($scope, $mdDialog) {

    console.log('Population controller initialized...');

    var vm = this;

    vm.populationTableQuery = {
        groupItems: false,
        order: 'population'
    };

    statService.getList().then(function (data) {
        vm.stats = data;
        console.log('data', vm.stats);
        $scope.$apply();
    });

    //TODO вынести в отдельный сервис
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

    //TODO Вынести в отдельный сервис,
    //контроллер не должен знать как работать с данными
    function transformStats(items, property) {

        var grouped = [];
        var i;

        // Хотел сделать контенто-независимую но понял
        // что это займет еще больше методов

        // проверяем добавлен ли уже такой корень
        var isGroupAlreadyAdded = function (items, property, value) {
            var i;
            for (i = 0; i < items.length; i = i + 1) {
                if (items[i][property] === value) {
                    return true;
                }
            }
        };

        // Добавляем групируемое свойство как корень
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
                }
            }
        };

        // наполняем данными
        var fillWithProps = function (currentItem, groupByProperty) {
            var i;
            var p;
            var keys;
            var obj;
            for (i = 0; i < grouped.length; i = i + 1) {
                if (grouped[i][groupByProperty] === currentItem[groupByProperty]) {
                    keys = Object.keys(currentItem);
                    for (p = 0; p < keys.length; p = p + 1) {
                        if (typeof grouped[i][keys[p] + 'Array'] === 'undefined') {
                            grouped[i][keys[p] + 'Array'] = [];
                        }
                        obj = {};
                        obj[keys[p]] = currentItem[keys[p]];
                        grouped[i][keys[p] + 'Array'].push(obj);
                    }
                }
            }
        };

        // создаем свойство total
        var calcTotal = function (items) {
            var i, k;
            var keys;
            var keyName;


            var sum = function (array, property) {
                var i;
                var total = 0;

                for (i = 0; i < array.length; i = i + 1) {
                    total = total + array[i][property];
                }

                return total;
            };
            var getPropertyName = function (key) {
                return key.split('Array')[0];
            };

            for (i = 0; i < items.length; i = i + 1) {
                items[i].total = {caption: 'Total'};
                keys = Object.keys(items[i]);
                for (k = 0; k < keys.length; k = k + 1) {
                    keyName = getPropertyName(keys[k]);
                    items[i].total[keyName] = sum(items[i][keys[k]], keyName);
                }
            }

            return items;
        };

        for (i = 0; i < items.length; i = i + 1) {
            addGroupRoots(items[i]);
            fillWithProps(items[i], property);
        }

        grouped = calcTotal(grouped);

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