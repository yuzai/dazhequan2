var animate = {};

/*
实现倒计时的效果
参数说明：
node:目标节点
content1:时间前面的语句
content2:时间后面的语句
*/
animate.daojishi = function(node,content1,content2){
  if(node){
    var time = 3
    node.innerHTML=content1+(time-1)+content2;
    var s = setInterval(function(){
      time--;
      if(time===1){
        clearInterval(s);
        location.hash = '#/';
      }
      node.innerHTML=content1+(time-1)+content2;
    },1000);
  }
}
/*
实现加载中的效果
参数说明：
parent:挂载的目标节点
content:加载的时候要显示的信息

mount:进行挂载
fadeIn:渐隐并移除
*/
animate.load = function(parent,content){
  var loading = content || "正在玩命加载中";
  var button = document.createElement('button');
  button.id = 'progress';
  button.setAttribute('class','am-btn am-btn-primary');
  button.innerHTML = `<i class="am-icon-spinner am-icon-spin"></i>
                      ${loading}
                      `
  animate.load.prototype.mount = function(){
    if(parent instanceof HTMLElement){
      parent.appendChild(button);
    }
  }
  animate.load.prototype.fadeIn = function(){
    if(button){
      button.style.opacity = 0;
      setTimeout(function(){
        // parent.removeChild(button);
      },1000)
    }
  }
}
// var s = new animate.load(document.body);
// s.mount();
// setTimeout(function(){
//   console.log(s);
//   s.fadeIn();
// },2000);

export default animate;
