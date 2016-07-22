/**
 * Created by Administrator on 2016/7/8.
 */
window.onload = function(){
    var cansignup = false;//能否注册的标志
    $(".band .row2 .col-xs-2:eq(3) a").addClass("active");
    updateActive($(".band .active").parent(".col-xs-2").index());
    tab("personal")
    testSignUp()
    signUp()
    back();
    function testSignUp(){
        var _regexp =/^\w{8,16}$/i;
        $("#userName").blur(function(){
            if(_regexp.test($(this).val())){
                cansignup = true;
                $(this).css({
                    backgroundColor:"#dcf485",
                    color:"#333"
                })
            }else{
                cansignup = false;
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
        $("#passWord").blur(function(){
            if(_regexp.test($(this).val())){
                cansignup = true;
                $(this).css({
                    backgroundColor:"#dcf485",
                    color:"#333"
                })
            }else{
                cansignup = false;
                $(this).css({
                    backgroundColor:"#fff",
                    color:"#ccc"
                })
                $("#alert").text("密码请输入8至16位字母数字下划线").css({
                    animation:"alert 3s"
                });
                setTimeout((function(){
                    $("#alert").css({
                        animation:""
                    })
                }),3000)
            }
        })
        $("#confirm").blur(function(){
            if($(this).val()==$("#passWord").val()){
                cansignup = true;
                $(this).css({
                    backgroundColor:"#dcf485",
                    color:"#333"
                })
            }else{
                cansignup = false;
                $(this).css({
                    backgroundColor:"#fff",
                    color:"#ccc"
                })
                $("#alert").text("两次密码输入不一致哟").css({
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
    function signUp(){
        touch.on("button","tap",function(){
            if(cansignup==true){
                var userID = $("#userName").val();
                var password = $("#passWord").val();
                $.ajax({
                    url:"http://datainfo.duapp.com/shopdata/userinfo.php",
                    data:{
                        status:"register",
                        userID:userID,
                        password:password
                    },
                    dataType:"json",
                    success:function(data){
                        if(data==1){
                            ani("rubberBand","注册成功");
                            setTimeout(function(){
                                window.location.href = "login.html"
                            },3000)
                        }else{
                            ani("rubberBand","注册失败，请试试别的用户名吧？")
                        }
                    },
                    error:function(err){
                        console.log(err)
                    }
                })
            }else{
                ani("rubberBand","请完成您的基本信息")
            }
        })

    }
}