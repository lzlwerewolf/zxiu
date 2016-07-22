/**
 * Created by Administrator on 2016/7/8.
 */
window.onload = function(){
    var canlogin = false;//能否登陆的标志
    $(".band .row2 .col-xs-2:eq(3) a").addClass("active");
    updateActive($(".band .active").parent(".col-xs-2").index());
    tab("my");
    testLogin()
    back();
    function testLogin(){
        var _regexp =/^\w{8,16}$/i;
        $("#userName").blur(function(){
            if(_regexp.test($(this).val())){
                canlogin = true;
                $(this).css({
                    backgroundColor:"#dcf485",
                    color:"#333"
                })
            }else{
                canlogin = false;
                $(this).css({
                    backgroundColor:"#fff",
                    color:"#ccc"
                })
                $("#alert").text("用户名请输入8至16位字母数字下划线").css({
                    animation:"alert 3s"
                });
                setTimeout((function(){
                    $("#alert").css({
                        animation:""
                    })
                }),3000)
            }
        })
    }
    login()
    function login(){
        touch.on("button","tap",function(){
            if(canlogin==true){
                var userID = $("#userName").val();
                var password = $("#passWord").val();
                var remember ;
                $("#checkbox").prop("checked")?remember=true:remember=false;
                $.ajax({
                    url:"http://datainfo.duapp.com/shopdata/userinfo.php",
                    data:{
                        status:"login",
                        userID:userID,
                        password:password
                    },
                    dataType:"json",
                    success:function(data){
                        if(data==0){
                            ani("rubberBand","用户名不存在")
                        }else if(data==2){
                            ani("rubberBand","用户名与密码不符")
                        }else{
                            if(remember==true){
                                localStorage.setItem("user",userID);
                            }else{
                                sessionStorage.setItem("user",userID)
                            }
                            ani("rubberBand","登陆成功")
                            setTimeout(function(){
                                window.location.href = "personal.html"
                            },3000)
                        }
                    },
                    error:function(err){
                        console.log(err)
                    }
                })
            }else{
                ani("rubberBand","请输入您的账号和密码")
            }
        })
    }
}