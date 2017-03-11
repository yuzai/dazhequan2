import method from '../method/method';
import config from '../config';
import home from './style.scss';

//记录请求的文章id
let num = 0;

//记录元素最终的高度，同时可以同来判断元素是否加载成功
var eleheight=0;

//记录是否正在获取数据，保证请求只做一次
let state = true;

//记录图片数据，index,src,height三个关键元素
var img_data =[];

//记录表单的距离页面顶端的距离
var list_height = 0;

//预加载函数判决
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

//获得对象距离页面顶端的距离
function getH(obj) {
    var h = 0;
    while (obj) {
        h += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return h;
}

//图片懒加载的实现函数
function lazy_load(){
  // console.log(img_data);
  // console.log('lazy_load');
  var height1 = document.body.scrollTop+document.body.clientHeight;
  img_data.forEach(function(item){
    if(!item.loaded && item.height>document.body.scrollTop-100 && item.height < height1){
      var img = document.querySelector("img[img-index='"+item.index+"']");
      if(img){
        img.src = item.src;
        item.loaded = true;
        img.onload = function(){
          img.style.opacity = 1;
        }
        img.onerror = function(){
          img.style.opacity = 1;
          img.src = '/failed.jpg';
        }
      }
    }
  })
  img_data = img_data.filter(function(item){
    return !item.loaded;
  })
}

//从服务器端获取商家发布的新信息
function getInfo(){
  state = false;
  method.ajax(null,config,'post',function(responseText){
    let infos = JSON.parse(responseText);
    let s='1';
    let list = ``;
    infos.forEach(function(data){
      list += `
      <li class='info-item'>
        <div class='info-img'>  <img class='img' img-index = ${num} ></div>
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
        index:(num),
        height:list_height+(140)*(num),
        src:'http://imgstore.cdn.sogou.com/app/a/100540002/'+(num++)+'_s_90_2_219x160.jpg',
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

//主函数
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
  method.addevent(window,'scroll',method.throttling2(scrollTop,1000))
  method.addevent(window,'scroll',method.debounce(lazy_load,500));
  getInfo();
}
