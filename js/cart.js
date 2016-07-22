/**
 * Created by Administrator on 2016/7/9.
 */
window.onload = function(){
    $(".band .row2 .col-xs-2:eq(2) a").addClass("active");
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
                        if(data==0){
                            $("#content").empty()
                            $("<li class='empty'><p>您的购物车空空~~</p><a href='list.html'>去逛逛</a></li>").appendTo("#content");
                        }else{
                            for(var i=0;i<data.length;i++){
                                var handle = $("#content .item").eq(0);
                                handle.find(".left img").prop("src",data[i]["goodsListImg"]);
                                handle.find(".right a").text(data[i]["goodsName"]).prop("href","detail.html?id="+data[i]["goodsID"]);
                                data[i]["discount"]==0?data[i]["discount"]=10:null;
                                handle.find(".right .price").text("$"+parseInt(data[i]["price"]*data[i]["discount"]/10));
                                handle.find(".right .number").val(data[i]["number"])
                                handle.clone().appendTo("#content").removeClass("hidden").addClass("item");
                            }
                        }
                        //DOM添加完成后，才添加事件
                        update()
                        sumAndSub()
                        del()
                    },
                    error:function(err){
                        console.log(err)
                    }
                })
    }
    function update(){
        //更新商品数量和总价的函数
        var num = 0;
        var price = 0;
        //要把hidden规避掉，它是模板
        $("#content .item:not(.hidden) .price").each(function(){
            price += parseInt($(this).text().split("$")[1]*$(this).parent(".info").siblings(".numberBand").find(".number").val())
            $(".infoBand .price").text("$"+price)
        });
        $("#content .item:not(.hidden) .number").each(function(){
            num += parseInt($(this).val())
            $(".infoBand .num").text(num)
        })
    }
    function sumAndSub(){
        //减
        touch.on(".sub","tap",function(){
            var num = $(this).siblings(".number")
            var id = $(this).parent(".numberBand").siblings("a").prop("href").split("id=")[1];
            num.val()<=1?null:num.val(num.val()-1);
            update()
            onloadCart(id,num.val())
        })
        touch.on(".add","tap",function(){
            var num =  $(this).siblings(".number")
            var id = $(this).parent(".numberBand").siblings("a").prop("href").split("id=")[1];
            num.val(parseInt(num.val())+1);
            update()
            onloadCart(id,num.val())
        })
    }
    function del(){
        touch.on(".delete","tap",function(){
            var id = $(this).siblings("a").prop("href").split("id=")[1];
            console.log(this)
            if(window.confirm("是否确定删除该商品？")){
                $(this).parent(".right").parent(".item").remove()
            }
            update()
            onloadCart(id,0)
        })
    }
    function onloadCart(id,num){
        //每点击加减或删除时，都回传购物车数据
        //参数是商品ID和数量，数量为0时删除
        var user = localStorage.user;//获取用户ID
        $.ajax({
            url:"http://datainfo.duapp.com/shopdata/updatecar.php",
            data:{
                userID:user,
                goodsID:id,
                number:num
            },
            dataType:"json",
            success:function(data){
                console.log(data)
            },
            error:function(err){
                console.log(1)
            }
        })
    }
}