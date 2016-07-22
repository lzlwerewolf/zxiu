/**
 * Created by Administrator on 2016/7/13.
 */
window.onload = function(){
    back();
    var detail = new Swiper('.swiper-container',{
        pagination : '.swiper-pagination',
        paginationClickable :true,
    })
    var detailScroll ;
    function loaded(){
        setTimeout(function(){
            detailScroll = new iScroll("detailScroll",{
                checkDOMChanges:true
            })
        },800)
    }
    appendDetail();
    loaded()
    function appendDetail(){
        var goodsID = window.location.href.split("id=")[1]
        $.ajax({
            url:"http://datainfo.duapp.com/shopdata/getGoods.php",
            data:{goodsID:goodsID},
            dataType:"jsonp",
            success:function(data){
                var ben = JSON.parse(data[0]["goodsBenUrl"]);
                var img = JSON.parse(data[0]["imgsUrl"]);
                var html ="";
                //第一页
                var handle = $(".item").eq(0);
                handle.find(".discount").text(data[0]["discount"]+"折");
                handle.find(".info img").prop("src",data[0]["goodsListImg"]);
                handle.find(".info .name").text(data[0]["goodsName"]);
                handle.find(".info del").text("$"+data[0]["price"]);
                handle.find(".info .buynumber").text(data[0]["buynumber"]+"人购买");
                handle.clone().appendTo(".swiper-slide:eq(0)").removeClass("hidden").addClass("item");
                //第二页
                for(var i=0;i<ben.length;i++){
                    html += "<li>"+"<img src='"+ben[i]+"'/></li>"
                }
                html += "<li><p>"+data[0]["detail"]+"</p></li>"
                $("#detailScroll ul").append(html);
                html="";
                //第三页
                for(var i=0;i<img.length;i++){
                    html += "<div class='swiper-slide'><img src='"+img[i]+"'/></div>"
                }
                $(".swiper-container1 .swiper-wrapper").append(html)
                var third = new Swiper('.swiper-container1',{
                    pagination : '.swiper-pagination1',
                    nested:true
                })
            },
            error:function(err){
                console.log(err)
            }
        })
    }
    favorite()
    function favorite(){
        touch.on(".favorite","tap",function(){
            var arr = localStorage.favorite ==null?[]:JSON.parse(localStorage.favorite);
            var id = window.location.href.split("id=")[1];
            for(var i=0;i<arr.length;i++){
                if(id == arr[i]){
                    //重复，弹出您已收藏过,因为下面还要push同样的ID，所以把当前这一项删掉
                    arr.splice(i,1);
                    ani("rubberBand","已收藏过该宝贝了")
                    break
                }
            }
            arr.push(id)
            localStorage.favorite = JSON.stringify(arr)
        })
    }
    history()
    function history(){
        //添加历史记录
        var arr = localStorage.history ==null?[]:JSON.parse(localStorage.history);
        var id = window.location.href.split("id=")[1];
        for(var i=0;i<arr.length;i++){
            if(id == arr[i]){
                arr.splice(i,1);
                break
            }
        }
        arr.push(id)
        localStorage.history = JSON.stringify(arr)
    }
}