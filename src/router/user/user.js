import animate from '../../method/components';
import method from '../../method/method';
import config from '../../config';

var user = function(nav,page,username){
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
  page.innerHTML = `这里是${username}的地盘，显示文章的功能还在开发中...`;

}
export default user;
