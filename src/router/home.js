import method from '../method/method';
import config from '../config';

export default function(nav,page){
  if(method.testlogin()){
    let mainlist = `
        <li><a href="#/post">发布</a></li>
        <li><a href="#/logout">登出</a></li>
    `;
    nav.innerHTML = mainlist;
  }else {
    let mainlist = `
        <li><a href="#/register">注册</a></li>
        <li><a href="#/login">登录</a></li>
    `;
    nav.innerHTML = mainlist;
  }
  var progress = `<button id='progress' style='display:block;margin:0 auto;' class="am-btn am-btn-primary">
                    <i class="am-icon-spinner am-icon-spin"></i>
                    正在玩命加载中
                  </button>
  `;
  page.innerHTML = progress;
  //从服务器端获取商家发布的新信息
  method.ajax(null,config,'post',function(responseText){
    let infos = JSON.parse(responseText);
    let s='1';
    let list = `<div>`;
    infos.forEach(function(data){
      list += `
      <div>
      <h1>${data.username}</h1>
      <p style='padding-left:10%;'>${data.info}</p>
      <p style='text-align:right;'>${data.time}</p><br>
      </div>`;
    });
    list+='</div>';
    //将新信息写入page中，整个页面中，打折圈三个字是不变的，别的都是改变的
    page.innerHTML += list;
    console.log(!document.getElementById('progress').style.opacity);
     method.fadeIn(document.getElementById('progress'),1000);
  })
}
