/**
 * Created by Administrator on 2016/7/9.
 */
window.onload = function(){
    $(".band .row2 .col-xs-2:eq(3) a").addClass("active");
    updateActive($(".band .active").parent(".col-xs-2").index());
    tab("personal")
    createWrapper()
    appendGoods();
    back()
    function appendGoods(){
        //从服务器获取购物车数据
        if(localStorage.favorite){
            var arr = JSON.parse(localStorage.favorite);
            for(var i=0;i<arr.length;i++){
                $.ajax({
                    url:"http://datainfo.duapp.com/shopdata/getGoods.php",
                    data:{goodsID:arr[i]},
                    dataType:"jsonp",
                    success:function(data){
                        for(var i=0;i<data.length;i++){
                            var handle = $("#wrapper .item").eq(0);
                            handle.find(".left img").prop("src",data[0]["goodsListImg"]);
                            handle.find(".right a").text(data[0]["goodsName"]).prop("href","detail.html?id="+data[0]["goodsID"]);
                            handle.find(".right .discount").text(data[0]["discount"]+"折")
                            data[0]["discount"]==0?data[0]["discount"]=10:null;
                            handle.find(".right .lastPrice").text(data[0]["price"])
                            handle.find(".right .price").text("$"+parseInt(data[0]["price"]*data[0]["discount"]/10));
                            handle.clone().appendTo("#wrapper ul").removeClass("hidden").addClass("item");
                        }
                    },
                    error:function(err){
                        console.log(err)
                    }
                })
            }
            //for循环完成的回调函数
            var t=setInterval(function(){
                //有一个隐藏的模板，所以要-1
                var delLen=document.getElementsByClassName("delete").length-1;
                //当页面上的delete数组长度=获取到的数据数组的长度时，说明页面加载完毕，执行函数
                if(delLen==arr.length){
                    cart()
                    del();
                    clearInterval(t)
                }
            },30)
        }
    }
    function del(){
        //注：共3个项目，删除第一个会弹3次，第二个弹2次，第三个弹1次
        //和cart.js72行del函数一样
        touch.on(".delete","tap",function(){
            var id = $(this).siblings("a").prop("href").split("id=")[1];
            if(window.confirm("是否确定删除该商品？")){
                $(this).parent(".right").parent(".item").remove();
                var arr = JSON.parse(localStorage.favorite);
                for(var i=0;i<arr.length;i++){
                    if(id == arr[i]){
                        arr.splice(i,1);
                        break;
                    }
                }
                localStorage.favorite = JSON.stringify(arr);
            }
        })
    }
}