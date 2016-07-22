/**
 * Created by Administrator on 2016/7/9.
 */
window.onload = function(){
    $(".band .row2 .col-xs-2:eq(1) a").addClass("active");
    updateActive($(".band .active").parent(".col-xs-2").index());
    tab("list")
    back();
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
    appendList()
    function appendList(){
        $.ajax({
            //返回json数组对象[{classID:"分类ID",className:"分类名称",icon:"iconfont图标"}]
            //字体图标不好使
            url:"http://datainfo.duapp.com/shopdata/getclass.php",
            dataType:"json",
            success:function(data){
                console.log(data)
                $("<div class='item'>全部</div>").appendTo(".list1");
                for(var i=0;i<data.length;i++){
                    $("<div class='item'></div>").addClass("id"+data[i]["classID"]).text(data[i]["className"]).appendTo(".list1");
                }
                boundEvent()
            },
            error:function(err){
                console.log(err)
            }
        })
    }
    function boundEvent(){
        touch.on(".item","tap",function(){
            $(".item").css({
                display:"none"
            })
            var classID = $(this).attr("class").split("id")[1];
            $.ajax({
                url:"http://datainfo.duapp.com/shopdata/getGoods.php",
                data:classID,
                dataType:"jsonp",
                success:function(data){
                    var handle = $(".list1 .test").eq(0);
                    for(var i=0;i<data.length;i++){
                        handle.find(".discount").text(data[i]["discount"]+"折");
                        handle.find(".left img").prop("src",data[i]["goodsListImg"]);
                        handle.find(".right a").text(data[i]["goodsName"]).prop("href","detail.html?id="+data[i]["goodsID"]);
                        data[i]["discount"]==0?data[i]["discount"]=10:null;
                        handle.find(".right del").text("$"+data[i]["price"]);
                        handle.find(".right .price").text("$"+data[i]["price"]*data[i]["discount"]/10);
                        handle.clone().appendTo(".list1").removeClass("hidden").addClass("test");
                    }
                },
                error:function(err){
                    console.log(err)
                }
            })
        })
        $("#searchInput").focus(function(){
            $(".test:not(.hidden)").remove()
            $(".item").css({
                display:"block"
            })
        })
    }
}