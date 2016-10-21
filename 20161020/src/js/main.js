/**
 * 2016年8月15日10:11:50
 * By Julian
 * 依赖 panli.js
 * zanjser@163.com
 */
;(function () {

    PD(".floor-nav").on("click","a",function(){
        var _t = PD(this),
            _li = _t.parents("li"),
            _index = _li.index();


        floorGo(_index)
   
        return false;

    })

    PD(function(){

        helpPostage.init();

    });
    


})()