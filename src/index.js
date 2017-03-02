import amaze from './css/amazeui.css';
import style from './css/style.scss';
import method from './method/method';
import router from './router/route';
router.init();

//注册menu下拉菜单事件。
method.addevent(window,'click',function(){
  let dropmenu = document.getElementsByClassName('dropdown-menu')[0];
  dropmenu.style.display = 'none';
})
let menu = document.getElementById('menu');
method.addevent(menu,'click',function dropdowntoogle(event){
  event.stopPropagation();
  let dropmenu = document.getElementsByClassName('dropdown-menu')[0];
  let state = dropmenu.style.display;
  if(state ==='block'){
    dropmenu.style.display = 'none';
  }else {
    dropmenu.style.display = 'block';
  }
})
