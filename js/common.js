/**
 * Created by Administrator on 2016/7/8.
 */

    function updateActive(index){
        var width = $(".band .row2 .col-xs-2").width();
        index<0?index=0:null;
        $(".band .row1 .bor").css({
            transform:"translateX("+(index*width)+"px)"
        })
    }

//侧滑切换标签（其实是链接）
function tab(which){
    var content = document.getElementsByClassName("content")[0]
    var ev;
    document.addEventListener("touchstart",function(e){
        ev = e ||window.event;
        document.addEventListener("touchend",function(event){
            var event = event || window.event;
            var sub = event.changedTouches[0].clientX- ev.touches[0].clientX
            sub>600?gotoleft():null;
            sub<-600?gotoright():null
        })
    })
    function gotoleft(){
        var left =""
        switch (which) {
            case "index":left = "#";
                break;
            case "list":left = "index.html";
                break;
            case "cart":left = "list.html";
                break;
            case "personal":left = "cart.html";
                break;
            case "more":left = "personal.html";
                break;
        }
        window.location.href = left
    }
    function gotoright(){
        var right = ""
        switch (which) {
            case "index":right = "list.html";
                break;
            case "list":right = "cart.html";
                break;
            case "cart":right = "personal.html";
                break;
            case "personal":right = "more.html";
                break;
            case "more":right = "#";
                break;
        }
        window.location.href = right
    }
}
//添加iscroll
function createWrapper(){
    var myscroll;
    function loaded(){
        setTimeout(function(){
            myscroll = new iScroll("wrapper",{
                vScrollbar:false,
                checkDOMChanges:true
            });
        },100)
    }
    loaded()
}
//添加购物车的函数
function cart(){
    touch.on(".right .cart","tap",function(){
        if(localStorage.user) {
            var id = $(this).siblings("a").prop("href").split("=")[1];//获取到商品ID
            var userID = localStorage.user;
            $.ajax({
                url: "http://datainfo.duapp.com/shopdata/updatecar.php",
                data: {userID: userID, goodsID: id},
                dataType: "json",
                success: function () {
                    ani("rubberBand","添加购物车成功~")
                },
                error: function (err) {
                    console.log(err)
                }
            })
        }
        else{
            ani("fadeIn","请先登录哟")
        }
    })
}
//返回上个页面的函数
function back(){
    touch.on("header .back","tap",function(){
        history.go(-1)
    })
}
//动画
function ani(style,text){
    $("<div class='animated fadeIn black'></div>").appendTo("html");
    $("<p class='ani animated'></p>").text(text).addClass(style).appendTo(".black");
    setTimeout(function(){
        $(".ani").removeClass(style).addClass("bounceOutUp");
    },1000)
    setTimeout(function(){
        $(".black").removeClass("fadeIn").addClass("fadeOut")
    },2000)
    setTimeout(function(){
        $(".black").remove()
    },3000)
}