/**
 * Created by Administrator on 2016/7/9.
 */
window.onload = function(){
    $(".band .row2 .col-xs-2:eq(3) a").addClass("active");
    updateActive($(".band .active").parent(".col-xs-2").index());
    tab("cart")
    back();
    touch.on(".tabs span","tap",function(){
        var index = $(this).index()
        $(this).addClass("active").siblings("span").removeClass("active");
        $(".couponBand .coupons").eq(index).addClass("index").siblings("div").removeClass("index")
    })
}