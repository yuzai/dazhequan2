import method from '../method/method';
import config from '../config';
import home from './style.scss';

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
  var progress = `<button id='progress' class="am-btn am-btn-primary">
                    <i class="am-icon-spinner am-icon-spin"></i>
                    正在玩命加载中
                  </button>
  `;
  page.innerHTML = progress;
  //从服务器端获取商家发布的新信息
  method.ajax(null,config,'post',function(responseText){
    let infos = JSON.parse(responseText);
    let s='1';
    let list = `<ul class='info-container'>`;
    infos.forEach(function(data){
      list += `
      <li class='info-item'>
        <div class='info-img'><a><img class='info-img'></a></div>
        <div class='info-mesg'>
            <div class='row-1'>
              <div class='item-title'><a>${data.info}</a></div>
              <div class='item-time'>${data.time.slice(10)}</div>
            </div>
            <div class='row-2'>
              <div class='item-user'>${data.username}</div>
            </div>
        </div>
      </li><hr>`;
    });
    list+='</ul>';
    //将新信息写入page中，整个页面中，打折圈三个字是不变的，别的都是改变的
    page.innerHTML += list;
    method.fadeIn(document.getElementById('progress'),1000);
  })
}
