/**
 * Created by Administrator on 2016/7/8.
 */
$(function(){
    createSwiper();
    boundEvents();
    appendGoods();
    //为了防止闪屏时向下滑动，测试时先用这个方法
    function initHtml(){
        $("html").css({
            height:"100vh",
            overflow:"hidden"
        })
        $("body").css({
            height:"100vh",
            overflow:"hidden"
        })
    }
    function boundEvents(){
        //闪屏
        if(!localStorage.first){
            //如果不存在，说明是新用户，那么播放闪屏
            initHtml()
            $(".goin").click(function(){
                localStorage.setItem("first","false")
                $(".splash").animate({
                    opacity:0
                },500,function(){
                    $(".splash").remove();
                    $(".band").css({
                        display:"block"
                    })
                    $("header.index").css({
                        display:"block"
                    })
                    $(".band .row2 .col-xs-2:eq(0) a").addClass("active");
                    $("html").css({
                        height:"auto",
                        overflow:"visible"
                    })
                    $("body").css({
                        height:"auto",
                        overflow:"visible",
                        paddingTop:"8vh"
                    })
                })
            })
        }else{
            $(".splash").remove()
            $(".band").css({
                display:"block"
            })
            $("header.index").css({
                display:"block"
            })
            $("body").css({
                paddingTop:"8vh"
            })
        }

    }
    function createSwiper(){
        var mySwiper = new Swiper('.swiper-container', {
            autoplay: 5000,
            loop:true,
            pagination : '.swiper-pagination',
        })
        var mySwiper = new Swiper('.splash-container', {
            autoplay: 5000,
            noSwipingClass : 'stop-swiping',
            pagination : '.swiper-pagination',
        })
    }
    function appendGoods(){
        $.ajax({
            url:"http://datainfo.duapp.com/shopdata/getGoods.php",
            data:"",
            dataType:"jsonp",
            success:function(data){
                var handle = $("#contentUl .test").eq(0);
                for(var i=0;i<data.length;i++){
                    handle.find(".discount").text(data[i]["discount"]+"折");
                    handle.find(".left img").prop("src",data[i]["goodsListImg"]);
                    handle.find(".right a").text(data[i]["goodsName"]).prop("href","detail.html?id="+data[i]["goodsID"]);
                    data[i]["discount"]==0?data[i]["discount"]=10:null;
                    handle.find(".right del").text("$"+data[i]["price"]);
                    handle.find(".right .price").text("$"+data[i]["price"]*data[i]["discount"]/10);
                    handle.clone().appendTo("#contentUl").removeClass("hidden").addClass("item");
                }
            },
            error:function(err){
                alert(err)
            }
        })
    }
})
window.onload = function(){
    updateActive($(".band .active").parent(".col-xs-2").index());
    tab("index");
    var myScroll,searchScroll,
        pullDownEl, pullDownOffset,
        generatedCount = 0;
    iscroll();
    function iscroll(){
        var page =1;
        loaded();//wr
        function loaded() {
            pullDownEl = document.getElementById('pullDown');
            pullDownOffset = pullDownEl.offsetHeight;
            searchScroll = new iScroll('wrapper1'),{
                checkDOMChanges:true
            };
            myScroll = new iScroll('wrapper', {
                useTransition: true,
                topOffset: pullDownOffset,
                vScrollbar:false,
                checkDOMChanges:true,
                onRefresh: function () {
                    if (pullDownEl.className.match('loading')) {
                        pullDownEl.className = '';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                    }
                },
                onScrollMove: function () {
                    if (this.y > 5 && !pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'flip';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
                        this.minScrollY = 0;
                    } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                        pullDownEl.className = '';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                        this.minScrollY = -pullDownOffset;
                    }
                },
                onScrollEnd: function () {
                    if (pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'loading';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
                        pullDownAction();	// Execute custom function (ajax call?)
                    }
                }
            });
            setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
        }
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
        function pullDownAction () {
            $.ajax({
                url:"http://datainfo.duapp.com/shopdata/getGoods.php",
                dataType:"jsonp",
                success:function(data){
                    var handle = $("#contentUl .test").eq(0);
                    for(var i=0;i<data.length;i++){
                        handle.find(".discount").text(data[i]["discount"]+"折");
                        handle.find(".left img").prop("src",data[i]["goodsListImg"]);
                        handle.find(".right a").text(data[i]["goodsName"]);
                        data[i]["discount"]==0?data[i]["discount"]=1:null;
                        handle.find(".right del").text("$"+data[i]["price"]);
                        handle.find(".right .price").text("$"+data[i]["price"]*data[i]["discount"]/10);
                        handle.clone().appendTo("ul").removeClass("hidden").addClass("item");
                    }
                    myScroll.refresh();
                },
                error:function(err){
                    alert(err)
                }
            })
        }
    }
    search()
    function search(){
        $("#searchInput").keydown(function(){
            var key = window.encodeURIComponent($(this).val());
            $("#searchUl .item").remove()
            $.ajax({
                url:"http://datainfo.duapp.com/shopdata/selectGoodes.php",
                data:{selectText:key},
                dataType:"jsonp",
                success:function(data){
                    var handle = $("#searchUl .test").eq(0);
                    for(var i=0;i<data.length;i++){
                        handle.find(".discount").text(data[i]["discount"]+"折");
                        handle.find(".left img").prop("src",data[i]["goodsListImg"]);
                        handle.find(".right a").text(data[i]["goodsName"]);
                        data[i]["discount"]==0?data[i]["discount"]=1:null;
                        handle.find(".right del").text("$"+data[i]["price"]);
                        handle.find(".right .price").text("$"+parseInt(data[i]["price"]*data[i]["discount"]/10));
                        handle.clone().appendTo("#searchUl").removeClass("hidden").addClass("item");
                    }

                    searchScroll.refresh();
                    $("#wrapper1").css({
                        display:"block"
                    })
                },
                error:function(err){
                    alert(err)
                }
            })
        })
        $("#searchInput").blur(function(){
            $("#wrapper1").css({
                display:"none"
            })
        })
        touch.on("#wrapper1","tap",function(){
            $("#wrapper1").css({
                display:"block"
            })
        })
    }
    cart()
}
