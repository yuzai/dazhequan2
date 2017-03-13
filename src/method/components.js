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
animate.load = function(parent,content,direction){
  this.parent = parent;
  this.loading = content || "正在玩命加载中";
  this.fangxiang = direction || "top";
  this.button = document.createElement('button');
  var Class = 'am-btn am-btn-primary progress';
  if(this.fangxiang === 'bottom'){
    Class+=' bottom';
  }else if(this.fangxiang === 'top'){
    Class+=' top';
  }
  this.button.setAttribute('class',Class);
  this.button.innerHTML = `<i class="am-icon-spinner am-icon-spin"></i>
                      ${this.loading}
                      `
}
animate.load.prototype.mount = function(){
  if(this.parent instanceof HTMLElement){
    this.parent.appendChild(this.button);
  }
}
animate.load.prototype.fadeIn = function(){
  if(this.button){
    this.button.style.opacity = 0;
    var self = this;
    setTimeout(function(){
      if(self.button.parentNode === self.parent){
        self.parent.removeChild(self.button);
      }
    },1000)
  }
}
// var s = new animate.load(document.body);
// s.mount();
// setTimeout(function(){
//   console.log(s);
//   s.fadeIn();
// },2000);

animate.uploadFile = function(filelist,callback){
  var result;
  filelist.addEventListener('change',function(event){
    var files = document.getElementById("uploadFile").files;
    var funcs = [].map.call(files,function(file,index){
      return new Promise(function(resolve,reject){
        var reader = new FileReader();
        if(/image/.test(file.type)){
          reader.readAsDataURL(file);
          // reader.onprogress = function(event){
          //   if(event.lengthComputable){
          //     progress.innerHTML = event.loaded+'/'+event.total;
          //   }
          // }
          reader.onerror = function(){
            console.log('上传失败，错误码为:'+reader.error.code);
            reject(reader.error.code);
            // progress.innerHTML = '上传失败，错误码为:'+reader.error.code;
          }
          reader.onload = function(event){
            resolve(reader.result);
            // imgcontainer.innerHTML += '<img style="width:100px;height:100px;" src = "'+reader.result+'">';
          }
        }else {
          reject('err');
          alert("请选择图片文件！");
        }
      })
    })
    // console.log(funcs);
    Promise.all(funcs).then(
      function(value)
      {
        callback(value);
      }).catch(function(err)
      {
        callback(err);
      });
  });
}

export default animate;
