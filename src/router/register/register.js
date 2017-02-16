import method from '../../method/method';

let form0 = `<form id='form0'>
  <label for='username'>用 户 名：</label><input name='username' type='text' id='username'/><span id='userwarn'></span><br>
  <label for='password1'>密 &nbsp 码：</label><input name = 'password1' type='password' id='password1'/><br>
  <label for='password2'>重复密码：</label><input name = 'password2' type='password' id='password2'/><span id='passwarn'></span><br>
  <input type='submit' value='submit' /><br>
  <span id='success'></span>
</form>`;

export default function(nav,page){
  //先显示注册页面的form表单
  page.innerHTML = form0;
  let form = document.getElementById('form0');
  //对form绑定submit事件
  method.addevent(form,'submit',(event)=>{
    event.preventDefault();
    let form = event.target;
    let username = form.username.value;
    let password1 = form.password1.value;
    let password2 = form.password2.value;
    //用户名以及密码不能为空
    if(username && password1 && password2){
      //校验两次密码是否一致
      if(password1 === password2){
          document.getElementById('success').innerHTML='已提交至服务器，请耐心等待';
          //从服务器端检验进行
          method.ajax(JSON.stringify({'username':username,'password':password1}),'http://localhost:8082/register','post',function(responseText){
                  var info = JSON.parse(responseText);
                  console.log(info);
                  if(info.right === 'no'){
                    document.getElementById('userwarn').innerHTML=`*用户名已存在`;
                  }else if(info.right === 'yes'){
                    localStorage.sign_in = true;
                    // localStorage.username = username;
                    localStorage.token = info.token;
                    let time = 3;
                    document.getElementById('success').innerHTML='登录成功，'+(time-1)+'s后返回首页';
                    let s = setInterval(function(){
                      time--;
                      if(time===0){
                        clearInterval(s);
                        location.hash = '#/';
                      }
                      document.getElementById('success').innerHTML='登录成功，'+(time-1)+'s后返回首页';
                    },1000);
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
  })
}
