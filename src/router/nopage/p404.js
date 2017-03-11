import method from '../../method/method';
export default function(nav,page){
  var img = new Image();
  img.src = '/404.jpg';
  img.style.width = '100%';
  page.innerHTML = null;
  page.appendChild(img);
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
}
