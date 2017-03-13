import animate from '../../method/components';
import style from './style.scss';
import method from '../../method/method';
import config from '../../config';

var paper = function(nav,page,paper_info,paper_id){
  if(method.testlogin()){
    let mainlist = `
        <li><a href="#">主页</a></li>
        <li><a href="#/post">发布</a></li>
        <li><a href="#/logout">登出</a></li>
    `;
    nav.innerHTML = mainlist;
  }else {
    let mainlist = `
        <li><a href="#">主页</a></li>
        <li><a href="#/register">注册</a></li>
        <li><a href="#/login">登录</a></li>
    `;
    nav.innerHTML = mainlist;
  }
  page.innerHTML = null;
  if(paper_info){
    var ul = document.createElement('ul');
    ul.setAttribute('class','info-container');
    ul.appendChild(paper_info);
    page.appendChild(ul);
    var div = document.createElement('div');
    div.style.position = 'relative';
    page.appendChild(div);
    var load = new animate.load(div,'loading');
    load.mount();
    method.ajax(JSON.stringify({_id:paper_id}),config+'paper','post',function(responseText){
      load.fadeIn();
      load = null;
      var data = JSON.parse(responseText);
      div.innerHTML = data.content;
    })
  }else {
    var load = new animate.load(page,'loading');
    load.mount();
    method.ajax(JSON.stringify({_id:paper_id}),config+'paper','post',function(responseText){
      load.fadeIn();
      var data = JSON.parse(responseText);
      var ul = document.createElement('ul');
      ul.setAttribute('class','info-container');
      var list = `
      <li class='info-item'>
        <div class='info-img'>  <img class='img' src ='${config+'upload/'+data.imgsrc[0]}'></div>
        <div class='info-mesg'>
            <div class='row-1'>
              <div class='item-title'><a href = '#/paper/${data._id}'>${data.title}</a></div>
            </div>
            <div class='row-2'>
              <div class='item-time'>${data.time}</div>
              <div class='item-user'>${data.username}</div>
            </div>
        </div>
      </li>
      `;
      var div = document.createElement('div');
      div.innerHTML = list;
      ul.appendChild(div);
      page.appendChild(ul);
      var div = document.createElement('div');
      div.innerHTML = data.content;
      page.appendChild(div);
    })
  }
}
export default paper;
