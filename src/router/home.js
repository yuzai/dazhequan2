import method from '../method/method';
import config from '../config';
import home from './style.scss';

let num = 0;
var eleheight=0;
let state = true;

function scrollTop(){
  var height1 = document.body.scrollTop+document.body.clientHeight;
  var height2 = document.body.offsetHeight;
  if(state){
      if(height2 - height1 < eleheight*3){
        console.log('到达预加载阈值，开始预加载');
        getInfo();
      }
  }
}

function getInfo(){
  //从服务器端获取商家发布的新信息
  state = false;
  method.ajax(null,config,'post',function(responseText){
    let infos = JSON.parse(responseText);
    let s='1';
    let list = ``;
    infos.forEach(function(data){
      list += `
      <li class='info-item'>
        <div class='info-img'><a>${num++}<img class='img'></a></div>
        <div class='info-mesg'>
            <div class='row-1'>
              <div class='item-title'><a>${data.title}</a></div>
              <div class='item-time'>${data.time}</div>
            </div>
            <div class='row-2'>
              <div class='item-user'>${data.username}</div>
            </div>
        </div>
      </li><hr>`;
    });
    //将新信息写入page中，整个页面中，打折圈三个字是不变的，别的都是改变的
    var div = document.createElement('div');
    div.innerHTML = list;
    document.getElementById('list').appendChild(div);
    if(eleheight===0 && document.getElementsByClassName('info-item')[0]) eleheight = document.getElementsByClassName('info-item')[0].clientHeight;
    method.fadeIn(document.getElementById('progress'),1000);
    state = true;
  })
}
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
                  <ul id = 'list' class='info-container'>
                  </ul>
                  <div id='progress2'>
                  <button class="am-btn am-btn-primary">
                    <i class="am-icon-spinner am-icon-spin"></i>
                    正在玩命加载中
                  </button>
                  </div>
  `;
  page.innerHTML = progress;
  method.addevent(window,'scroll',method.throttling2(scrollTop,1000))
  getInfo();
}
