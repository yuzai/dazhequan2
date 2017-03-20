import animate from '../method/components';
import method from '../method/method';
import config from '../config';
import home from './style.scss';

var reg = /^[a-fA-F0-9]{24}$/;

var paper_info;
//记录请求的文章id
let num = 0;

//记录元素最终的高度，同时可以同来判断元素是否加载成功
var eleheight=0;

//记录是否正在获取数据，保证请求只做一次
let state = true;

//记录图片数据，index,src,height三个关键元素
var img_data =[];

var loading;
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
  var height1 = document.body.scrollTop+document.body.clientHeight;
  img_data.forEach(function(item){
    if(!item.loaded && item.height>document.body.scrollTop-100 && item.height < height1){
      var img = document.querySelector("img[img-index='"+item.index+"']");
      if(img){
        // img.src = item.src;
        if(item.src!=='/failed.jpg'){
          img.src = 'http://omqetq58r.bkt.gdipper.com/'+item.src;
        }else {
          img.src = '/failed.jpg';
        }
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
      var init = (data.like.indexOf(localStorage.username)===-1)?'unlike':'like';
      list += `
      <li class='info-item'>
        <div class='info-img'>  <img class='img' img-index = ${num} ></div>
        <div class='info-mesg'>
            <div class='row-1'>
              <div class='item-title'><a href = '#/paper/${data._id}'>${data.title}</a></div>
            </div>
            <div class='row-2'>
              <div class='item-heart'><i data-index='${data._id}' data-init ='${init}' class="am-icon-heart ${init}">${data.like.length}</i></div>
              <div class='item-time'>${data.time}</div>
              <div class='item-user'><a href = '#/user/${data.username}'style='cursor: pointer;'>${data.username}</a></div>
            </div>
        </div>
      </li><div class='info-fenge'></div>`;
      img_data.push({
        index:(num),
        height:list_height+(140)*(num++),
        src:data.imgsrc[0]?data.imgsrc[0]:'/failed.jpg',
        loaded:false
      })
    });
    //将新信息写入page中，整个页面中，打折圈三个字是不变的，别的都是改变的
    var div = document.createElement('div');
    div.innerHTML = list;
    document.getElementById('list').appendChild(div);
    if(eleheight === 0){
      lazy_load();
      var loading2  = new animate.load(page,"loading","bottom");
      loading2.mount();
    }
    if(eleheight===0 && document.getElementsByClassName('info-item')[0]) eleheight = document.getElementsByClassName('info-item')[0].clientHeight;
    if(loading)
    {
      loading.fadeIn();
      loading = null;
    }
    state = true;
  })
}

//主函数
export default function(nav,page){
  num = 0;
  eleheight=0;
  img_data =[];
  list_height = 0;
  state = true;
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
  loading = new animate.load(page,"loading","top");
  var progress = `<ul id = 'list' class='info-container'>
                  </ul>
  `;
  page.innerHTML = progress;
  loading.mount();
  list_height = getH(document.getElementById('list'));
  var scroll_event = method.throttling2(scrollTop,1000);
  var lazy_event = method.debounce(lazy_load,500);
  method.addevent(window,'scroll',scroll_event)
  method.addevent(window,'scroll',lazy_event);
  getInfo();
  var click_num = {};
  var timer = null;
  var click_event = function(event){
    var target = event.target;
    if(target.href){
      if(location.hash === '' || location.hash === '#/' );
      {
        method.removeevent(window,'scroll',scroll_event);
        method.removeevent(window,'scroll',lazy_event);
        method.removeevent(window,'click',click_event);
      }
      paper_info = target.parentNode.parentNode.parentNode.parentNode;
    }else if(target.tagName === 'I' && reg.test(target.dataset.index)){
      if(method.testlogin()){
         var classes = target.className.split(' ');
         var index = classes.indexOf('like');
         if(index===-1){
           target.className = target.className.replace('unlike','like');
           target.innerHTML = (Number(target.innerHTML))+1;
         }else {
           target.className = target.className.replace('like','unlike');
           target.innerHTML = (Number(target.innerHTML))-1;
         }
         var _id = target.dataset.index;
         click_num[_id] = !click_num[_id];
         clearTimeout(timer);
         timer = setTimeout(function(){
           for(var id in click_num){
             if(click_num[id])
             {
               click_num[id] = !click_num[id];
               console.log('send');
               method.ajax(JSON.stringify({username:localStorage.username,_id:id}),config+'like','post',function(responseText){
                //  console.log(responseText);
               })
             }
           }
           click_num = {};
        },2000);
      }else {
        alert("尚未登录，请登录");
        location.hash = '#/login';
        method.removeevent(window,'scroll',scroll_event);
        method.removeevent(window,'scroll',lazy_event);
        method.removeevent(window,'click',click_event);
      }
    }
  };
  method.addevent(window,'click',click_event);
}
export {paper_info};
