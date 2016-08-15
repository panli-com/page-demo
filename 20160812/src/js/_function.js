//定位楼层
function floorGo(index){

   var floor = PD(".floor-m").eq(index);
   if(floor.length <1){
       return false;
   }


  PD('html,body').animate({ scrollTop: floor.offset().top-80 }, 800);

   return true;
}