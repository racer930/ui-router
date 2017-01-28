/**
 * Created by user on 1/28/17.
 */

window.convert = (function () {
    function Convert () {

    }

    /**
     * @param strict {Boolean} Check if item should be only json
     * @param item {Boolean} Variable for the converting
     * @return {Object}/ {string}
     */
    Convert.prototype.fromJSON = function (item,strict) {
        if (!item) return null;
        if(typeof item != 'string') return strict ? null : item;
        try {
            return JSON.parse(item);
        }
        catch (e) {
            return strict ? null : item;
        }
    };
    /**
     *
     * @param obj {Object}
     * @return {string}
     */
    Convert.prototype.toQs  = function(obj){
        var arr = [];
        for(var index in obj) {
            arr.push(index + '=' + obj[index])
        }
        return arr.join("&");
    };

    return new Convert();
}());