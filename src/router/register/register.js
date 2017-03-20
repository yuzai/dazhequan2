import method from '../../method/method';
import animate from '../../method/components';
import config from '../../config';
let form0 = `<form id='form0' class='am-form'>
  <fieldset>
  <legend>欢迎注册</legend>
  <label for='username'>用 户 名：</label><input name='username' type='text' id='username'/><span id='userwarn'></span><br>
  <label for='password1'>密 &nbsp 码：</label><input name = 'password1' type='password' id='password1'/><br>
  <label for='password2'>重复密码：</label><input name = 'password2' type='password' id='password2'/><span id='passwarn'></span><br>
  <button type="submit" id='sub' class="am-btn am-btn-primary">Submit</button><br>
  <span id='success'></span>
  </fieldset>
</form>`;

export default function(nav,page){
  if(method.testlogin()){
    let mainlist = `
        <li><a href="#">主页</a></li>
        <li><a href="#/post">发布</a></li>
        <li><a href="#/logout">登出</a></li>
    `;
    nav.innerHTML = mainlist;
  }else {
    let mainlist = `
        <li><a href="#">主页</a></li>
        <li><a href="#/register">注册</a></li>
        <li><a href="#/login">登录</a></li>
    `;
    nav.innerHTML = mainlist;
  }
  //先显示注册页面的form表单
  page.innerHTML = form0;
  let form = document.getElementById('form0');
  //对form绑定submit事件
  var inthrott = false;
  method.addevent(form,'submit',function(event){
    event.preventDefault();
    if(!inthrott){
      inthrott = true;
      let form = event.target;
      let username = method.html_encode(form.username.value);
      let password1 = method.html_encode(form.password1.value);
      let password2 = method.html_encode(form.password2.value);
      //用户名以及密码不能为空
      if(username && password1 && password2){
        //校验两次密码是否一致
        if(password1 === password2){
            document.getElementById('success').innerHTML='已提交至服务器，请耐心等待';
            //从服务器端检验进行
            method.ajax(JSON.stringify({'username':username,'password':password1}),config+'register','post',function(responseText){
                    var info = JSON.parse(responseText);
                    console.log(info);
                    if(info.right === 'no'){
                      document.getElementById('userwarn').innerHTML=`*用户名已存在`;
                    }else if(info.right === 'yes'){
                      localStorage.sign_in = true;
                      localStorage.username = username;
                      localStorage.token = info.token;
                      animate.daojishi(document.getElementById('success'),'登录成功，','s后返回首页');
                    }
                  }
            );
          }
        else {
          document.getElementById('passwarn').innerHTML=`*两次密码不一致`;
        }
      }else {
        if(username === ''){
          document.getElementById('userwarn').innerHTML="*用户名不能为空";
        }
        if(password1 === '' || password2 === ''){
          document.getElementById('passwarn').innerHTML="*密码不能为空";
        }
      }
      setTimeout(function(){
        inthrott = false;
      },4000)
    }
  })
}
