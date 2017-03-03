import method from '../../method/method';
import config from '../../config';
let post = `
<form id='form3' class='am-form'>
<fieldset>
  <label for='title'>标题:</label><input name='title' type='text' id='title' placeHolder='人人乐打折啦'/><span id='title-warn'></span><br>
  <div class="am-form-group">
      <label for='info'>内容:</label>
      <textarea name='info' rows="10" placeHolder='想要发布的具体打折信息'></textarea>
      <span id='info-warn'></span>
    </div>
  <button type="submit" id='sub' class="am-btn am-btn-primary right">发布</button>
  <span id='success'></span>
  </fieldset>
</form>
`

export default function(nav,page){
  if(method.testlogin()){
    let mainlist = `
      <li><a href="#">主页</a></li>
      <li><a href="#/logout">登出</a></li>
    `;
    nav.innerHTML = mainlist;
    page.innerHTML = post;
    let form = document.getElementById('form3');
    method.addevent(form,'submit',function(form){
      event.preventDefault();
      if(!this.title.value || !this.info.value){
        if(!this.title.value){
          document.getElementById('title-warn').innerHTML="*标题不能为空";
        }
        if(!this.info.value){
          document.getElementById('info-warn').innerHTML="*内容不能为空";
        }
      }else{
      document.getElementById('success').innerHTML='已提交至服务器，请耐心等待';
      method.ajax(JSON.stringify({'token':localStorage.token,'title':this.title.value,'info':this.info.value}),config+'post','post',function(responseText){
        if(responseText==='yes'){
          let time = 3;
          document.getElementById('success').innerHTML='发布成功，'+(time-1)+'s后返回首页';
          let s = setInterval(function(){
            time--;
            if(time===1){
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
    }})
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
