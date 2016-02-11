/**
 * Created by s.zhitenev on 10.02.2016.
 */

'use strict';

var statRepository = require('../repositories/statRepository');

var getList = function() {
    return statRepository.getList();
};

var add = function(stat) {
    return statRepository.add(stat);
};

var getByKey = function(id) {
    return statRepository.getByKey(id);
};

var update = function(id, stat){
    return statRepository.update(id, stat);
};

var deleteByKey = function(id) {
    return statRepository.deleteByKey(id);
};

module.exports = {
    getList: getList,
    add: add,
    getByKey: getByKey,
    update: update,
    deleteByKey: deleteByKey
};