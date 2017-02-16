import method from '../../method/method';

let post = `
<form id='form3'>
  <textarea name='info' placeHolder='想要发布的打折信息'></textarea><br>
  <button id='cancel'>取消</cancel></button><input type='submit' value = '发布'><br>
  <span id='success'></span>
</form>
`

export default function(nav,page){
  if(method.testlogin()){
    let mainlist = `
      <li><a href="#/post">发布</a></li>
      <li><a href="#/logout">登出</a></li>
    `;
    nav.innerHTML = mainlist;
    page.innerHTML = post;
    let form = document.getElementById('form3');
    method.addevent(form,'submit',function(form){
      event.preventDefault();
      document.getElementById('success').innerHTML='已提交至服务器，请耐心等待';
      method.ajax(JSON.stringify({'token':localStorage.token,'info':this.info.value,'time':(new Date()).toLocaleString()}),'http://localhost:8082/post','post',function(responseText){
        if(responseText==='yes'){
          let time = 3;
          document.getElementById('success').innerHTML='发布成功，'+(time-1)+'s后返回首页';
          let s = setInterval(function(){
            time--;
            if(time===0){
              clearInterval(s);
              location.hash = '#/';
            }
            document.getElementById('success').innerHTML='发布成功，'+(time-1)+'s后返回首页';
          },1000);
        }else {
          alert('用户未登陆');
          location.hash='#/login';
        }
      });
    })
  }else {
    let mainlist = `
      <li><a href="#/register">注册</a></li>
      <li><a href="#/login">登录</a></li>
    `;
    menulist.innerHTML = mainlist;
    page.innerHTML = `<h1>您尚未登录</h1><span id='success'></span>`;
    let time = 3;
    document.getElementById('success').innerHTML='尚未登录，'+(time-1)+'s后返回首页';
    let s = setInterval(function(){
      time--;
      if(time===0){
        clearInterval(s);
        location.hash = '#/login';
      }
      document.getElementById('success').innerHTML='尚未登录，'+(time-1)+'s后返回首页';
    },1000);
  }

}
