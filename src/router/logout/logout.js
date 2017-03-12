import animate from '../../method/components';
import method from '../../method/method';
let logout = `<h1>logout</h1><span id='success'></span>`;

export default function(nav,page){
  page.innerHTML = logout;
  localStorage.sign_in = false;
  localStorage.token = null;
  localStorage.username = null;
  animate.daojishi(document.getElementById('success'),'登出成功，','s后返回首页');
}
