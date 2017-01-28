/**
 * Created by user on 1/28/17.
 *
 * Sending http requests
 *
 * @requires convert
 */


window.http = (function () {
    function Http () {

    }

    Http.prototype.get = function (url,params,ecb,scb) {
       return send('GET',url,params,ecb,scb);
    };

    Http.prototype.post = function (url,params) {
        return send('POST',url,params);
    };
    Http.prototype.put = function (url,params) {
        return send('PUT',url,params);
    };
    Http.prototype.delete = function (url,params) {
        return send('DELETE',url,params);
    };

    return new Http();
}());

var query_types = ['GET','DELETE','PUT'];
function send(method, url, params) {
    return new Promise(function(resolve,reject){
        if (!method || !url) reject({error: "no params"});
        params = params.length() ? JSON.stringify(params) : null;
        method = method.toUpperCase();

        if(query_types.indexOf(method) > -1 && params)
            if(url.indexOf('?') >-1)
                url += "&" + convert.toQs(params);
            else
                url += '?' + convert.toQs(params);

        var xhr = new XMLHttpRequest();

console.log('TEST',url);
        xhr.open(method, url, true);
        xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.onreadystatechange = function () {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {
                    return resolve(convert.fromJSON(xhr.responseText));
                }
                else {
                    return reject(xhr.status,convert.fromJSON(xhr.responseText));
                }
            }
        };
        xhr.send(params);
    })
}