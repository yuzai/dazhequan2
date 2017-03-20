import register from './register/register';
import login from './login/login';
import logout from './logout/logout';
import post from './post/post';
import home from './home';
import nopage from './nopage/p404';
import paper from './paper/paper';
import user from './user/user';
import {paper_info} from './home';

import Router from '../method/Router';

let router = new Router();

//获取路由节点
let page = document.getElementById('page');
let nav = document.getElementById('menulist');

//绑定路由函数
router.route('/',home.bind(null,nav,page));
router.route('/login',login.bind(null,nav,page));
router.route('/logout',logout.bind(null,nav,page));
router.route('/post',post.bind(null,nav,page));
router.route('/register',register.bind(null,nav,page));
router.route('/nopage',nopage.bind(null,nav,page));

//各个文章页面的路由
var reg = /^\/paper\/([a-fA-F0-9]{24})$/;
var reg_user = /^\/user\/(.*)$/;
router.page = function(paper_info){
  var paper_id = this.currenturl.match(reg)[1];
  paper(nav,page,paper_info,paper_id);
}
router.user = function(username){
  user(nav,page,username);
}
router.refresh = function(){
  this.currenturl = location.hash.slice(1) || '/';
  if(this.methods[this.currenturl]){
    this.methods[this.currenturl]();
  }else if(reg.test(this.currenturl)){
    this.page(paper_info);
  }else if(reg_user.test(this.currenturl)){
    console.log(this.currenturl.match(reg_user)[1]);
    this.user(this.currenturl.match(reg_user)[1]);
  }else{
    console.log(this.currenturl);
    this.methods['/nopage']();
  }
}
export default router;
