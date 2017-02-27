import method from '../../method/method';
let logout = `<h1>logout</h1><span id='success'></span>`;

export default function(nav,page){
  page.innerHTML = logout;
  localStorage.sign_in = false;
  let time = 3;
  document.getElementById('success').innerHTML='登出成功，'+(time-1)+'s后返回首页';
  let s = setInterval(function(){
    time--;
    if(time===1){
      clearInterval(s);
      location.hash = '#/';
    }
    document.getElementById('success').innerHTML='登出成功，'+(time-1)+'s后返回首页';
  },1000);
}
