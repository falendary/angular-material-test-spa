/**
 * Created by s.zhitenev on 10.02.2016.
 */


var itemService = require('../services/itemService');
var categoryService = require('../services/categoryService');

'use strict';

module.exports = function($scope, $mdDialog) {

    console.log('Goods controller initialized...');

    var vm = this;
    vm.currentPage = 1;

    var extendItemCategories = function(item, categories) {

        var i, c;

        for (i = 0; i < categories.length; i = i + 1) {
            for(c = 0; c < item.categories.length; c = c + 1) {
                if (categories[i].id === item.categories[c]) {
                    item.categories[c] = categories[i];
                }
            }
        }
        return item;
    };

    var reduceItemCategories = function(item) {
        var i;

        for(i = 0; i < item.categories.length; i = i + 1) {
            item.categories[i] = item.categories[i].id;
        }

        return item;
    };

    vm.getAllCategories = function(){
        var categoriesPerPage = 2;
        return categoryService.getList().then(function(initCategory){

            var promises = [];
            var categoryPage = 1;
            var totalPages = Math.round(initCategory.count / categoriesPerPage);
            for(var i = 1; i < totalPages; i = i + 1) {
                categoryPage = categoryPage + 1;
                promises.push(categoryService.getList(categoryPage))
            }

            return Promise.all(promises).then(function(data){
                var result = [];
                var i;
                for(i = 0; i < data.length; i = i + 1) {
                    result = result.concat(data[i].results);
                }
                return result;
            })

        })
    };

    vm.getData = function(itemPage) {

        var promises = [];

        promises.push(vm.getAllCategories());
        promises.push(itemService.getList(itemPage));

        Promise.all(promises).then(function(data) {
            if(data[1].detail) {
                vm.getData();
            }
            vm.categories = data[0];
            vm.items = data[1].results;

            vm.nextPageStatus = !!data[1].next;

            console.log(vm.nextPageStatus);

            var i;

            for(i = 0; i < vm.items.length; i = i + 1) {
                vm.items[i] = extendItemCategories(vm.items[i], vm.categories);
            }

            console.log('vm.items', vm.items);
            console.log('vm.categories', vm.categories);

            $scope.$apply();
        })

    };

    vm.getData();

    vm.prevPage = function() {
        vm.currentPage = vm.currentPage - 1;
        vm.getData(vm.currentPage);
    };

    vm.nextPage = function() {
        vm.currentPage = vm.currentPage + 1;
        vm.getData(vm.currentPage);
    };

    vm.editItem = function($event, item) {

        var parent = angular.element(document.body);
        $mdDialog.show({
            parent: parent,
            scope: $scope.$new(),
            targetEvent: $event,
            templateUrl: 'item-dialog-view.html',
            bindToController: true,
            locals: {
                categories: vm.categories,
                isEdit: true,
                item: item
            },
            controller: EditItemController,
            controllerAs: 'vm'
        }).then(function (result) {
            if(result.method === 'UPDATE') {
                result.entity = reduceItemCategories(result.entity);
                itemService.update(result.entity.id, result.entity);
                vm.getData(vm.currentPage);
            }
            if (result.method === 'DELETE') {
                itemService.deleteByKey(result.entity.id);
                vm.getData(vm.currentPage);
            }
        });

        function EditItemController() {
            var vm = this;

            vm.searchText = '';
            vm.selectedItem = null;
            vm.autocompleteDemoRequireMatch = true;

            vm.transformChip = function(chip) {
                // If it is an object, it's already a known chip
                if (angular.isObject(chip)) {
                    return chip;
                }
                // Otherwise, create a new one
                return { name: chip, type: 'new' }
            };

            vm.querySearch = function(query) {
                var results = query ? vm.categories.filter(createFilterFor(query)) : [];
                return results;
            };

            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(category) {
                    category._lowername = category.name.toLowerCase();
                    return (category._lowername.indexOf(lowercaseQuery) === 0);
                };
            }

            vm.updateItem = function() {
                $mdDialog.hide({method: 'UPDATE', entity: vm.item});
            };

            vm.deleteItem = function(){
                $mdDialog.hide({method:'DELETE', entity: vm.item});
            };

            vm.closeDialog = function () {
                $mdDialog.hide({method: 'CANCEL'});
            }
        }

    };

    vm.editCategory = function($event, category) {

        var parent = angular.element(document.body);
        $mdDialog.show({
            parent: parent,
            scope: $scope.$new(),
            targetEvent: $event,
            templateUrl: 'category-dialog-view.html',
            bindToController: true,
            locals: {
                isEdit: true,
                category: category
            },
            controller: EditCategoryController,
            controllerAs: 'vm'
        }).then(function (result) {

            if(result.method === 'UPDATE') {
                categoryService.update(result.entity.id, result.entity);
                vm.getData(vm.currentPage);
            }
            if (result.method === 'DELETE') {
                categoryService.deleteByKey(result.entity.id);
                vm.getData(vm.currentPage);
            }

        });

        function EditCategoryController(){

            var vm = this;

            vm.updateCategory = function() {
                $mdDialog.hide({method:'UPDATE', entity: vm.category});
            };

            vm.deleteCategory = function(){
                $mdDialog.hide({method:'DELETE', entity: vm.category});
            };

            vm.closeDialog = function () {
                $mdDialog.hide({method: 'CANCEL'});
            }
        }


    };

    vm.createItem = function($event) {

        var parent = angular.element(document.body);
        $mdDialog.show({
            parent: parent,
            scope: $scope.$new(),
            targetEvent: $event,
            templateUrl: 'item-dialog-view.html',
            bindToController: true,
            locals: {
                categories: vm.categories
            },
            controller: CreateItemController,
            controllerAs: 'vm'
        }).then(function (result) {
            if(result.method === 'POST') {
                result.entity = reduceItemCategories(result.entity);
                itemService.add(result.entity).then(function(){
                    vm.getData(vm.currentPage);
                });

            }
        });

        function CreateItemController() {
            var vm = this;

            vm.searchText = '';
            vm.selectedItem = null;
            vm.autocompleteDemoRequireMatch = true;

            vm.transformChip = function(chip) {
                // If it is an object, it's already a known chip
                if (angular.isObject(chip)) {
                    return chip;
                }
                // Otherwise, create a new one
                return { name: chip, type: 'new' }
            };

            vm.querySearch = function(query) {
                var results = query ? vm.categories.filter(createFilterFor(query)) : [];
                return results;
            };

            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(category) {
                    category._lowername = category.name.toLowerCase();
                    return (category._lowername.indexOf(lowercaseQuery) === 0);
                };
            }

            vm.item = {name: '', categories: [], value_int: null, value_float: null};

            vm.createItem = function() {
                $mdDialog.hide({method: 'POST', entity: vm.item});
            };

            vm.closeDialog = function () {
                $mdDialog.hide({method: 'CANCEL'});
            }
        }

    };

    vm.createCategory = function($event) {

        var parent = angular.element(document.body);
        $mdDialog.show({
            parent: parent,
            scope: $scope.$new(),
            targetEvent: $event,
            templateUrl: 'category-dialog-view.html',
            bindToController: true,
            controller: CreateCategoryController,
            controllerAs: 'vm'
        }).then(function (result) {

            if(result.method === 'POST') {
                categoryService.add(result.entity).then(function(){
                    vm.getData(vm.currentPage);
                });
            }

        });

        function CreateCategoryController(){

            var vm = this;

            vm.category = {name: '', description: ''};

            vm.createCategory = function() {
                $mdDialog.hide({method: 'POST', entity: vm.category});
            };

            vm.closeDialog = function () {
                $mdDialog.hide({method: 'CANCEL'});
            }
        }

    };



};