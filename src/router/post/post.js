import animate from '../../method/components';
import method from '../../method/method';
import config from '../../config';
let post = `
<form id='form3' class='am-form'>
<fieldset>
  <label for='title'>标题:</label><input name='title' type='text' id='title' placeHolder='人人乐打折啦'/><span id='title-warn'></span><br>
  <div class="am-form-group">
      <label for='info'>内容:</label>
      <textarea name='info' rows="10" placeHolder='想要发布的具体打折信息'></textarea>
      <span id='info-warn'></span>
      <button type="submit" id='sub' class="am-btn am-btn-primary right">发布</button>
      <span id='success'></span>
      <input id="uploadFile" type="file" multiple="multiple" accept="image/*">
      <p id='upload_progress'></p>
      <div id='imgcontainer'></div>
    </div>
  </fieldset>
</form>
`
//文件类型检测
function checkFile() {
    //获取文件
    var file = document.getElementById("uploadFile").files;
    // console.log(file);
    //文件为空判断
    if (file === null || file === undefined) {
        alert("请选择您要上传的文件！");
        return false;
    }

    //检测文件类型
    if(file.type.indexOf('image') === -1) {
        alert("请选择图片文件！");
        return false;
    }

    //计算文件大小
    var size = Math.floor(file.size/1024);
    if (size > 5000) {
        alert("上传文件不得超过5M!");
        return false;
    };
    return true;
};

export default function(nav,page){
  if(method.testlogin()){
    let mainlist = `
      <li><a href="#">主页</a></li>
      <li><a href="#/logout">登出</a></li>
    `;
    nav.innerHTML = mainlist;
    page.innerHTML = post;
    let form = document.getElementById('form3');
    var inthrott = false;
    var filelist = document.getElementById('uploadFile');
    var imgcontainer = document.getElementById('imgcontainer');
    var img_data = null;
    animate.uploadFile(filelist,function(result){
      img_data = result;
      result.forEach(function(item){
        imgcontainer.innerHTML += '<img style="width:100px;height:100px;" src = "'+item+'">'

      })
    });
    method.addevent(form,'submit',function(form){
      event.preventDefault();
      if(!inthrott){
        if(!this.title.value || !this.info.value){
          if(!this.title.value){
            document.getElementById('title-warn').innerHTML="*标题不能为空";
          }
          if(!this.info.value){
            document.getElementById('info-warn').innerHTML="*内容不能为空";
          }
        }else{
        document.getElementById('success').innerHTML='已提交至服务器，请耐心等待';
        method.ajax(JSON.stringify({'token':localStorage.token,'title':method.html_encode(this.title.value),'info':method.html_encode(this.info.value),'img_data':img_data}),config+'post','post',function(responseText){
          if(responseText==='yes'){
            animate.daojishi(document.getElementById('success'),'发布成功，','s后返回首页');
          }else {
            alert('用户未登陆');
            location.hash='#/login';
          }
        });
      }
      setTimeout(function(){
        inthrott = false;
      },4000)
    }
    })
  }else {
    let mainlist = `
      <li><a href="#/register">注册</a></li>
      <li><a href="#/login">登录</a></li>
    `;
    menulist.innerHTML = mainlist;
    page.innerHTML = `<h1>您尚未登录</h1><span id='success'></span>`;
    animate.daojishi(document.getElementById('success'),'尚未登录，','s后返回首页');
  }

}
