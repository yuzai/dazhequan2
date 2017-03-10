import method from '../method/method';
import config from '../config';
import home from './style.scss';

let num = 0;
var eleheight=0;
let state = true;
var img_data =[];
var list_height = 0;
function scrollTop(){
  var height1 = document.body.scrollTop+document.body.clientHeight;
  var height2 = document.body.offsetHeight;
  if(state){
      if(height2 - height1 < eleheight*5){
        console.log('到达预加载阈值，开始预加载');
        getInfo();
      }
  }
}

function setImage(index){
}
//获得对象距离页面顶端的距离
function getH(obj) {
    var h = 0;
    while (obj) {
        h += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return h;
}

function lazy_load(){
  console.log(img_data);
  console.log('lazy_load');
  var height1 = document.body.scrollTop+document.body.clientHeight;
  img_data.forEach(function(item,index){
    var img = document.querySelector("img[img-index='"+index+"']");
    if(img){
      if(!item.loaded && item.height>document.body.scrollTop && item.height < height1){
        img.src = item.src;
        item.loaded = true;
        img.onload = function(){
          console.log('1');
          img.style.opacity = 1;
        }
        img.onerror = function(){
          console.log('2');
          img.style.opacity = 1;
          img.innerHTML = 'failed';
        }
      }
    }
  })

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
        <div class='info-img'>  <img class='img' img-index = ${num++} ></div>
        <div class='info-mesg'>
            <div class='row-1'>
              <div class='item-title'><a>${data.title}</a></div>
            </div>
            <div class='row-2'>
              <div class='item-time'>${data.time}</div>
              <div class='item-user'>${data.username}</div>
            </div>
        </div>
      </li><div class='info-fenge'></div>`;
      img_data.push({
        height:list_height+(140)*(num-1),
        src:'http://imgstore.cdn.sogou.com/app/a/100540002/'+(num-1)+'_s_90_2_219x160.jpg',
        loaded:false
      })
    });
    //将新信息写入page中，整个页面中，打折圈三个字是不变的，别的都是改变的
    var div = document.createElement('div');
    div.innerHTML = list;
    document.getElementById('list').appendChild(div);
    if(eleheight === 0){
      lazy_load();
    }
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
  list_height = getH(document.getElementById('list'));
  console.log(list_height);
  method.addevent(window,'scroll',method.throttling2(scrollTop,1000))
  method.addevent(window,'scroll',method.debounce(lazy_load,500));
  getInfo();
}
