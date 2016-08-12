
/**
 * 整理老代码梳理结构 
 * 2016年04月08日18:03:15
 * By Julian zanjser@163.com
 * 
 */

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}

function hover(dom) {
    if (dom.length > 1) {
        dom.each(function (i, t) {
            new hover($(t));
        });
        return false;
    }
    var className = dom.attr('data-hover'),
                     settime = '';
    dom.hover(function () {
        clearTimeout(settime);
        dom.addClass(className);
    }, function () {
        settime = setTimeout(function () { dom.removeClass(className); }, 200);
    })

}

// 右边客服 位置计算
function RightK() {
    var bodyW = $('body,html').width();
    var $RightNav = $('.r_l_nav');
    if (bodyW >= 1484) {
        $RightNav.css({ 'right': '50%', 'marginRight': '-742px' });
    } else {
        $RightNav.css({ 'right': '25px', 'marginRight': '0' });
    }
}


supportCss3 = function (style) {
    var prefix = ['webkit', 'moz', 'o', 'ms'],
                humpStyle = document.documentElement.style;

    function replaces(str) {
        return str.replace(/-(\w)/g, function ($0, $1) {
            return $1.toUpperCase();
        });
    }
    for (var i = 0, len = prefix.length + 1; i < len; i++) {
        var styleName = '';

        styleName = i == 0 ? style : replaces(prefix[i - 1] + '-' + style);

        if (styleName in humpStyle) return styleName;
    }
    return false; 
}

 
String.prototype.replaces = function (oldrel, newrel) {
    if (!oldrel || oldrel == '') oldrel = '\\\w\+';
    var rel = new RegExp('{{' + oldrel + '}}', 'g');
    if (!newrel || newrel == 'null' || newrel == 'undefined') newrel = '';
    return this.replace(rel, newrel);
}
/**
 * 2016年04月09日15:54:20
 * By Julian
 * 依赖 panli.js
 * zanjser@163.com
 */
;(function () {
    
    function topFixNav(){
        
            
            var scrollTop = $(window).scrollTop();
            
            if($('#nav_list').length > 0){
                   var  topHeight = $('#nav_list').offset().top + 48;
                     if (scrollTop > topHeight) { }
                        $('.overHead')[scrollTop > topHeight ? 'addClass' : 'removeClass']('top_Show');
             }
           
            // (scrollTop > topHeight ? $('#topSearch') : $('#headSearch')).prev().focus();
            
            
            $('#black_Top')[scrollTop > 400 ? 'show' : 'hide']();
            
            if (window['IsIndex']) {

                $('#index_message')[scrollTop > 400 ? 'show' : 'hide']();
            }
            
       
        
         
    }
    
    
    $(window).resize(RightK); 

     $(window).scroll(function () {
        topFixNav();
     });
    
    PD(function () {
        
        
        
         RightK();    
           
        
        var tabObj = {
            "1":{
                text:"代购"
            },
            "2":{
                text:"转运"
            }
        }
        
        
        var clk = PD(".tab-sel-clk"),
            clk2 =PD(".tab-sel-2"),            
            t1 = tabObj["1"]["text"],
            t2 = tabObj["2"]["text"];
            
        
        
        
        clk.on("click",function () {
           
             
             clk2.slideToggle("fast");;
            
        });
        
        clk2.on("click",function () {
            var _t = PD(this),
                _v = _t.attr("data-val").toString();              
            
       
             isTabSeach(_v);
             
             clk2.slideToggle("100");
            
        });
        
        
        
        
        // 判断切换
        function isTabSeach(_v){
           
            if(_v == "2"){
                 seachTabDaigou();
             }else{
                 seachTabZhuanyun();
             }
            
        }
        
        
        // 切换代购
        function seachTabDaigou() {
            
            
            clk.attr("data-val","1").text(t1);
            
            clk2.attr("data-val","1").text(t2);
             
            PD(".search-val-text").text(t1);
            
            searchInputPla(t1);
            PD(".search-help-wrap").hide();
        }
        
        // 切换转运
        function seachTabZhuanyun() {
           
            
            clk2.attr("data-val","2").text(t1);
            
            clk.attr("data-val","2").text(t2);
            
            PD(".search-val-text").text(t2);
            
            searchInputPla(t2);
            
            PD(".search-help-wrap").show();
        }
        
        function searchInputPla(pla){
            PD(".head-search-text").attr("placeholder",'已经找好要'+ pla +'的宝贝了吗？快把宝贝的网址粘贴过来～');
        }
        
    })
    
    
})()