/**
 * Created by Administrator on 2016/7/9.
 */
window.onload = function(){
    $(".band .row2 .col-xs-2:eq(3) a").addClass("active");
    updateActive($(".band .active").parent(".col-xs-2").index());
    tab("cart")
    createWrapper()
    appendCart();
    back();
    function appendCart(){
        //从服务器获取购物车数据
        var userID = localStorage.user;
        $.ajax({
            url:"http://datainfo.duapp.com/shopdata/getCar.php",
            data:{userID:userID},
            dataType:"jsonp",
            success:function(data){
                    for(var i=0;i<data.length;i++){
                        var handle = $("#wrapper .item").eq(0);
                        handle.find(".left img").prop("src",data[i]["goodsListImg"]);
                        handle.find(".right a").text(data[i]["goodsName"]).prop("href","detail.html?id="+data[i]["goodsID"]);
                        data[i]["discount"]==0?data[i]["discount"]=10:null;
                        handle.find(".right .price").text("$"+data[i]["price"]*data[i]["discount"]/10);
                        handle.find(".right .number").text(data[i]["number"])
                        handle.clone().appendTo("#wrapper ul").removeClass("hidden").addClass("item");
                    }
                //DOM添加完成后，才添加事件
                del()
            },
            error:function(err){
                console.log(err)
            }
        })
    }
    function del(){
        touch.on(".cancel","tap",function(){
            var id = $(this).siblings("a").prop("href").split("id=")[1];
            if(window.confirm("是否确定删除该商品？")){
                $(this).parent(".right").parent(".item").remove()
            }
        })
    }
}