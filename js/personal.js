/**
 * Created by Administrator on 2016/7/8.
 */
$(function(){
})
window.onload = function(){
    $(".band .row2 .col-xs-2:eq(3) a").addClass("active");
    updateActive($(".band .active").parent(".col-xs-2").index());
    tab("personal")
    checkUser()
    back();
    function checkUser(){
        if(localStorage.getItem("user") || sessionStorage.getItem("user")){
            var userID = localStorage.getItem("user") || sessionStorage.getItem("user");
            $(".myInfo .right").empty().html("<p>欢迎您！尊敬的"+userID+"</p>")
        }
    }
}