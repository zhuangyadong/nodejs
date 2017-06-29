/**
 * Created by Admin on 2017/6/28.
 */
$(function () {
    var $loginBox = $('#loginBox');
    var $registerBox = $('#registerBox');
    var $userInfo = $('#userInfo');
    $loginBox.find('a').on('click',function () {
        $registerBox.show();
        $loginBox.hide();
    })


    $registerBox.find('a').on('click',function () {
        $loginBox.show();
        $registerBox.hide();
    });
    //注册
    $registerBox.find('button').on('click',function () {
        //ajax提交数据
        $.ajax({
            type:'post',
            url:'/api/user/register',
            data:{
                username:$registerBox.find('[name="username"]').val(),
                password:$registerBox.find('[name="password"]').val(),
                repassword:$registerBox.find('[name="repassword"]').val()
            },
            dataType:'json',
            success:function (result) {
                $registerBox.find('.colWarning').html(result.message);
                if(!result.code){
                    setTimeout(function () {
                        $loginBox.show();
                        $registerBox.hide();
                    },1000)
                }
            }
        })
    });

    //登陆
    $loginBox.find('button').on('click',function () {
        //通过ajax提交
        $.ajax({
            type : 'post',
            url : '/api/user/login',
            data:{
                username:$loginBox.find('[name="username"]').val(),
                password:$loginBox.find('[name="password"]').val()
            },
            dataType: 'json',
            success:function (result) {
                $loginBox.find('.colWarning').html(result.message);

                if (!result.code){
                    //登陆成功
                    setTimeout(function () {
                        $loginBox.hide();
                        $userInfo.show();

                        //显示登陆用户名
                        $('.name').html(result.userInfo.username);

                    })
                }
            }
        })
    })
})