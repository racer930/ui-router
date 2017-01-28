/**
 * Created by user on 1/28/17.
 *
 * @requires dom,http
 */

window.template_cache = {};

window.router = (function () {
    var default_route = 'home'
    function Router (dr) {
        default_route = dr || default_route
    }

    function get_cur_state(){
        var u_state = document.URL.split("#");
        if(u_state.length > 1){
            return  u_state[1].length ? u_state[1] : default_route;
        }
        else{
            return default_route
        }
    }

    /**
     *
     * @param url
     * @return {Promise}
     */
    function load_template(url,folder){
        folder = !!folder;
        return new Promise(function(resolve,reject){
            http.get('./' + url + (folder ? '/' + url :'') + '.html',{}).then(function(tpl){
                resolve(tpl);
            },function(c,err){
                console.warn('Loading template ERR:', err);
                reject(c,err);
            })
        })
    }

    /**
     * @name init
     * @description initialize start page
     * @param view {DOM / string} place for load template
     */
    Router.prototype.init = function (view) {
        var url = get_cur_state();
        view = view || 'body';
        return new Promise(function(resolve,reject) {
            if (!template_cache[url]) {
                load_template(url,true).then(function (tpl) {
                    console.log('TPL',tpl);
                    dom.setHtml(view, tpl);
                    template_cache[url] = tpl;
                    history.pushState(null, null, '#' + url);
                    resolve(true)
                },reject)
            }
            else {
                dom.setHtml(view, template_cache[url]);
                resolve();
            }
        })
    };
    /**
     * @name go
     * @param url {string}
     * @param view {DOM / string}
     * @param update {Boolean} update exist html or first start
     * @return {Promise}
     */
    Router.prototype.go = function (url,view,update) {
        view = view || 'body';
        url = url ||  get_cur_state();
        return new Promise(function(resolve,reject) {
            console.log(url,view)
            if (!template_cache[url]) {
                load_template(url,true).then(function (tpl) {
                    dom.setHtml(view, tpl);
                    template_cache[url] = tpl;
                    history.pushState(null, null, '#' + url);
                    resolve(true)
                },reject)
            }
            else {
                dom.setHtml(view, template_cache[url]);
                resolve();
            }
        })
    };

    document.addEventListener('click', function(event){
        var type = event.target.nodeName.toLowerCase();
        if(type == 'a'){
            var url = dom.getAttr(event.target,'href').split('#')[1];
            var view = dom.getAttr(event.target,'ui-view') || false;
            console.log('TESTET',url,view);
            new Router().go(url,view).then(function(){}).catch(function () {
                
            })
        }
    }, true); //Non-IE
    /**
     * @name current
     * @return {*}
     */
    Router.prototype.current = function(){
        return get_cur_state();
    };
    return new Router()
}());