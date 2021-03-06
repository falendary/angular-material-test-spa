/**
 * Created by s.zhitenev on 10.02.2016.
 */

'use strict';

var categoryRepository = require('../repositories/categoryRepository');

var getList = function(categoryPage){
    return categoryRepository.getList(categoryPage);
};

var add = function(category) {
    return categoryRepository.add(category);
};

var getByKey = function(id) {
    return categoryRepository.getByKey(id);
};

var update = function(id, category){
    return categoryRepository.update(id, category);
};

var deleteByKey = function(id) {
    return categoryRepository.deleteByKey(id);
};

module.exports = {
    getList: getList,
    add: add,
    getByKey: getByKey,
    update: update,
    deleteByKey: deleteByKey
};