/**
 * Created by s.zhitenev on 10.02.2016.
 */

'use strict';

var itemRepository = require('../repositories/itemRepository');

var getList = function(itemPage){
    return itemRepository.getList(itemPage);
};

var add = function(item) {
    return itemRepository.add(item);
};

var getByKey = function(id) {
    return itemRepository.getByKey(id);
};

var update = function(id, item){
    return itemRepository.update(id, item);
};

var deleteByKey = function(id) {
    return itemRepository.deleteByKey(id);
};

module.exports = {
    getList: getList,
    add: add,
    getByKey: getByKey,
    update: update,
    deleteByKey: deleteByKey
};