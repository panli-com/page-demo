//定位楼层
function floorGo(index){

   var floor = PD(".floor-m").eq(index);
   if(floor.length <1){
       return false;
   }


  PD('html,body').animate({ scrollTop: floor.offset().top-80 }, 800);

   return true;
}

var helpPostage = {
    init:function(){
        this.hoverSidebar();
        this.city();
        this.ajaxCountry();
    },
    loading:function(sta){
        if(sta){
            $(".loading-box").show();
        }else{
            $(".loading-box").hide();
        }
    },
    Country:[],
    CountryType:[],
    ajaxCountry:function(call){
        var vm = this;
 
        $.ajax({
                type: "POST",
                contentType: "application/json;utf-8",
                url: "http://www.panli.com/App_Services/wsShip.asmx/GetCountry",
                cache: false,
                dataType: "json",
                timeout: 15000,
                error: function () { console.log("api error") },
                success: function (r) {
                   vm.Country = r.d;
                   if(call){
                        call(r.d);
                   }
                  
                }
        });
    },
    hoverSidebar:function(){
        var line = $(".siber-line-on");

        $(".help-postage-select-header").on("click",'a',function(){
            line.show();
            var _t = $(this);
            var _p = _t.parent();
            var _t_w = _t.width();
            var _t_offset = _t.position();
            _p.find("a").removeClass("on");
            _t.addClass("on");
            console.log(_t_offset);
           line.animate({
                width:_t_w,
                left:_t_offset.left+10
            },200);
        });

        $(".help-postage-select-header a").eq(0).click();
        return true; 
    },
    city:function(){
        $(".help-postage-select-city").on("click",'a',function(){
          
            var _t = $(this);
            var _p = _t.parents('ul');
            var _t_w = _t.width();
            _p.find("a").removeClass("on");
            _t.addClass("on");
        
        });
    }
}

