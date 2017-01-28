/**
 * Created by user on 1/28/17.
 */

window.dom = (function () {
    function DOM (els) {

    }


    /**
     * @name get Get one dom element by selector
     * @param sl {DOM  / string} selector for search dom element
     * @return {DOM / null}
     */
    DOM.prototype.get = function (el) {
        if(!el) return null;
        if (typeof el === "string") {
            el = document.querySelector(el);
        }
        return el;
    };
    /**
     * @name gets Get all dom element by selector
     * @param sl {DOM  / string} selector for search dom element
     * @return {DOM / null}
     */
    DOM.prototype.gets = function (sl) {
        var els;
        if (typeof sl === "string") {
            els = document.querySelectorAll(sl);
        }
        return els;
    };

    /**
     * @name setHtml
     * @param sl {DOM  / string} selector
     * @param html {string}  new html for el
     * @return {Boolean}
     */
    DOM.prototype.setHtml = function (sl,html) {
        var el = this.get(sl);
        if(el){
            console.log(el);
            el.innerHTML = html;
            return true;
        }
        else{
            console.warn('Element not found. Selector: ', sl);
            return false;
        }
    };


    /**
     * @name setHtml
     * @param sl {DOM  / string} selector
     * @param attr {string}  new html for el
     * @return {Boolean}
     */
    DOM.prototype.getAttr = function (sl,attr) {
        var el = this.get(sl);
        console.log(el);
        if(el){
            return el.getAttribute(attr) || '';
        }
        else{
            return '';
        }
    };

    /**
     * @name setText
     * @param sl {DOM  / string} selector
     * @param text {string}  new text for el
     * @return {Boolean}
     */
    DOM.prototype.setText = function (sl,text) {
        var el = this.get(sl);
        if(el){
            el.innerText = text;
            return true;
        }
        else{
            console.warn('Element not found. Selector: ', sl);
            return false;
        }
    };

    return new DOM();
}());