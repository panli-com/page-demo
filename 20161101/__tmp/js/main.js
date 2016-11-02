/**
 * 2016年8月15日10:11:50
 * By Julian
 * 依赖 panli.js
 * zanjser@163.com
 */
;(function () {

   
    $(function(){
        var obj = {
            count:2,
            on:2,
            pageSize:6
        };
      PanliPaging.init(obj);
     

    });


})()
// //定位楼层
// function floorGo(index){

//    var floor = PD(".floor-m").eq(index);
//    if(floor.length <1){
//        return false;
//    }


//   PD('html,body').animate({ scrollTop: floor.offset().top-80 }, 800);

//    return true;
// }

// var helpPostage = {
//     init:function(){
//         this.hoverSidebar();
//         this.city();
//         this.ajaxCountry();
//     },
//     loading:function(sta){
//         if(sta){
//             $(".loading-box").show();
//         }else{
//             $(".loading-box").hide();
//         }
//     },
//     Country:[],
//     CountryType:[],
//     ajaxCountry:function(call){
//         var vm = this;
 
//         $.ajax({
//                 type: "POST",
//                 contentType: "application/json;utf-8",
//                 url: "http://www.panli.com/App_Services/wsShip.asmx/GetCountry",
//                 cache: false,
//                 dataType: "json",
//                 timeout: 15000,
//                 error: function () { console.log("api error") },
//                 success: function (r) {
//                    vm.Country = r.d;
//                    if(call){
//                         call(r.d);
//                    }
                  
//                 }
//         });
//     },
//     hoverSidebar:function(){
//         var line = $(".siber-line-on");

//         $(".help-postage-select-header").on("click",'a',function(){
//             line.show();
//             var _t = $(this);
//             var _p = _t.parent();
//             var _t_w = _t.width();
//             var _t_offset = _t.position();
//             _p.find("a").removeClass("on");
//             _t.addClass("on");
//             console.log(_t_offset);
//            line.animate({
//                 width:_t_w,
//                 left:_t_offset.left+10
//             },200);
//         });

//         $(".help-postage-select-header a").eq(0).click();
//         return true; 
//     },
//     city:function(){
//         $(".help-postage-select-city").on("click",'a',function(){
          
//             var _t = $(this);
//             var _p = _t.parents('ul');
//             var _t_w = _t.width();
//             _p.find("a").removeClass("on");
//             _t.addClass("on");
        
//         });
//     }
// }


!function (root, factory) {
  if (typeof module === 'object' && module.exports)
    module.exports = factory(root);
  else
    root.PanliPaging = factory(root);
}(typeof window !== 'undefined' ? window : this,
function (){
var PanliPaging = {
    count: 1,
    on: 1,
    start: 1,
    pageSize: 10,
    maxNum: 1,
    init: function(obj) {
        var vm = this;
        if (obj) {
            obj.count ? vm.count = obj.count : "";
            obj.on ? vm.on = obj.on : "";
            obj.pageSize ? vm.pageSize = obj.pageSize : "";
        }
        vm.reader(); 
    },
    reader: function() {
        var vm = this;
        var pageCount = Math.ceil(vm.count / vm.pageSize);
        var onPage = Number(vm.on);
        var netxPage = onPage + 1;
        var prevPage = onPage - 1;
        vm.maxNum = pageCount;
        vm.start = vm.start + 1;
        var listn = '';
        var newObj = '';
        if (pageCount < 2) {
            return false;
        }
        //上一页
        if (onPage > 1) {
            newObj += '<a href="javascript:void(0);" data-id="' + prevPage + '" class="paging-prev paging-click" >上一页</a>';
        }
        //中间页码
        if (onPage != 1 && onPage >= 4 && pageCount != 4) {
            newObj += '<a href="javascript:void(0);" data-id="1"  class="paging-num paging-click">' + 1 + '</a>';
        }
        if (onPage - 2 > 2 && onPage <= pageCount && pageCount > 5) {
            newObj += '<span class="paging-more">...</span>';
        }
        var start = onPage - 2,
            end = onPage + 2;

        if ((start > 1 && onPage < 4) || onPage == 1) {
            end++;
        }
        if (onPage > pageCount - 4 && onPage >= pageCount) {
            start--;
        }
        for (; start <= end; start++) {
            if (start <= pageCount && start >= 1) {
                if (start != onPage) {
                    newObj += '<a href="javascript:void(0);" data-id="' + start + '"  class="paging-num paging-click">' + start + '</a>';
                } else {
                    newObj += '<a href="javascript:void(0);" data-id="' + start + '" class="on">' + start + '</a>';
                }
            }
        }
        if (onPage + 2 < pageCount - 1 && onPage >= 1 && pageCount > 5) {
            newObj += '<span class="paging-more">...</span>';
        }
        if (onPage != pageCount && onPage < pageCount - 2 && pageCount != 4) {
            newObj += '<a href="javascript:void(0);" data-id="' + pageCount + '" class="paging-num paging-click">' + pageCount + '</a>';
        };
        //下一页
        if (onPage < pageCount) {
            newObj += '<a href="javascript:void(0);" data-id="' + netxPage + '" class="paging-next paging-click">下一页</a>';
        }

        var goS = '<span class="paging-go-text">到第</span><span class="paging-input-box">' +
            '<input type="text" class="paging-input"  data-max="' + pageCount + '" value="'+ onPage +'" >' +
            '</span><span class="paging-go-text">页</span>' +
            '<a href="javascript:void(0);" class="paging-go-btn">Go</a>';

        PD("#panli-paging").html(newObj + goS);

        PD(".paging-input").on('keyup',function(){
            var _t = $(this);
            var _max = _t.attr('data-max');
            var _v = _t.val().replace(/[^\d\.]/g,'');
            if(_max-_v < 0){
                _v = _max;
            }
            _t.val(_v);
        });
    }
}
  return PanliPaging;
});
