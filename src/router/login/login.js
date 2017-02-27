import method from '../../method/method';
import config from '../../config';
let form1 = `<form id='form1'>
  <label for='username'>用户名：</label><input name='username' type='text' id='username' placeHolder='username'/><span id='userwarn'></span><br>
  <label for='password'>密&nbsp码：</label><input name = 'password' type='password' id='password' /><span id='passwarn'></span><br>
  <input type='submit' value='submit' /><br>
  <span id='success'></span>
</form>`;

export default function(nav,page){
  //首先把form1显示出来
  page.innerHTML = form1;
  let form = document.getElementById('form1');
  //对该form绑定submit事件
  method.addevent(form,'submit',(event)=>{
    //阻止默认事件
    event.preventDefault();
    let form = event.target;
    let username = form.username.value;
    let password = form.password.value;
    if(username && password){
        document.getElementById('success').innerHTML='已提交至服务器，请耐心等待';
        //如果用户名和密码都进行了填写，用ajax将其发送至服务器端，根据不同的反应进行不同的处理
        method.ajax(JSON.stringify({'username':username,'password':password}),config+'login','post',function(responseText){
          var info = JSON.parse(responseText);
          if(info.right === 'no username'){
            document.getElementById('userwarn').innerHTML='*用户名不存在';
            document.getElementById('passwarn').innerHTML='';
            document.getElementById('success').innerHTML='';
          }else if(info.right === 'password wrong'){
            document.getElementById('passwarn').innerHTML='*密码不正确';
            document.getElementById('userwarn').innerHTML='';
            document.getElementById('success').innerHTML='';
          }else if(info.right === 'yes'){
            localStorage.sign_in = true;
            localStorage.token = info.token;
            // localStorage.username = username;
            let time = 3;
            document.getElementById('success').innerHTML='登录成功，'+(time-1)+'s后返回首页';
            let s = setInterval(function(){
              time--;
              if(time===1){
                clearInterval(s);
                location.hash = '#/';
              }
              document.getElementById('success').innerHTML='登录成功，'+(time-1)+'s后返回首页';
            },1000);
          }
          console.log(responseText)
        });
    }
  })
}
