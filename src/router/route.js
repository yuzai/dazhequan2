import register from './register/register';
import login from './login/login';
import logout from './logout/logout';
import post from './post/post';
import home from './home';
import nopage from './nopage/p404';
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
console.log(router.methods);
export default router;
