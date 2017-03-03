var method = {};
method.addevent = function(element,type,handler){
  if(element.addEventListener){
    element.addEventListener(type,handler,false);
  }else if(element.attachEvent){
      element.attachEvent('on'+type,handler);
    }else {
       element['on'+type]=handler;
    }
};
method.ajax = function(data,url,methods,handler){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(xhr.readyState===4){
      if(xhr.status>=200 && xhr.status < 300||xhr.status === 304){
        handler(xhr.responseText);
      }
      else {
        alert("ajax通信失败 "+xhr.status);
      }
    }
  };
  xhr.open(methods,url,true);
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.send(data);
}
method.testlogin = function(){
  if(localStorage.sign_in==='true'){
    return true;
  }else {
    return false;
  }
}
method.throttling1 = function(func,delay){
  var inthrott = false;
  return function(){
    var self = this;
    var args = arguments;
    if(!inthrott){
      func.apply(self,args);
      inthrott = true;
      setTimeout(function(){
        inthrott = false;
      },delay);
    }
  }
}
method.throttling2 = function(func,delay){
  var inthrott = false;
  var timer;
  return function(){
    var self = this;
    var args = arguments;
    var last = false;
    if(!inthrott){
      func.apply(self,args);
      inthrott = true;
      setTimeout(function(){
        inthrott = false;
      },delay);
    }else {
      clearTimeout(timer);
      timer = setTimeout(function(){
        func.apply(self,args);
        inthrott = false;
      },500);
    }
  }
}
method.fadeIn = function($el,t){
    var o = 1;
    var step = 1/(t/50);
    if(!$el.style.opacity){
      $el.style.opacity = 1;
    }
    var timer = setInterval(function($el,step){
      if($el.style.opacity<0){
        clearInterval(timer);
      }else {
        $el.style.opacity -= step;
      }
    }.bind(null,$el,step),50);
  }
export default method;
