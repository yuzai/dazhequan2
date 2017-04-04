require('./pullreload.scss');

var isDragging = false;
var isThresholdReached = false;
var popStart = 0;
var threshold = 20;
var isend = true;
var isTop = true;
function getheight(event) {
    if (event.pageY === undefined && event.touches !== undefined) {
      if (event.touches.length <= 0) {
        return false;
      }
      event.pageY = event.touches[event.touches.length - 1].pageY;
    }
    return event.pageY;
};
function movestart(event){
  var top = document.body.scrollTop;
  if(top === 0){
    isTop = true;
    document.addEventListener('mousemove',moving)
    document.addEventListener('touchmove',moving,{passive:false})
    document.addEventListener('mouseup',moveend)
    document.addEventListener('touchend',moveend)
  }else {
    isTop = false;
    document.removeEventListener('mousemove',moving)
    document.removeEventListener('touchmove',moving,{passive:false})
    document.removeEventListener('mouseup',moveend)
    document.removeEventListener('touchend',moveend)
    return ;
  }
  if(!isend){
    return ;
  }
  isDragging = true;
  isThresholdReached = false;
  popStart = getheight(event);
}
function moving(event){
  if(isend && isTop && isDragging){
  event.stopImmediatePropagation();
  var offset = Math.floor(getheight(event) - popStart);
  if(offset>=0){
    event.preventDefault();
    if(offset>threshold){
      isThresholdReached = true;
      ptr.innerHTML = 'loading...';
    }else {
      isThresholdReached = false;
      ptr.innerHTML = '...';
    }
    var height = 41-offset;
    ptr.style.marginTop = '-' + (height>0?height:0) + 'px';
  }
  }
}
function moveend(){
  if(!isend || !isTop){
    return ;
  }
  if(isThresholdReached){
    isend = false;
    ptr.style.marginTop = '0px';
    callback().then(function(data){
      console.log(data);
      isend = true;
      ptr.style.marginTop = '-41px';
      ptr.innerHTML = '...';
    });
  }else {
    ptr.style.marginTop = '-41px';
  }
  isDragging = false;
  isThresholdReached = false;
}
var callback;
var pullReload = function(options){
  this.content = document.getElementById(options.content);
  this.ptr = document.getElementById('ptr');
  callback = options.callback || function(){return
    new Promise(function(resolve,reject){
      setTimeout(function(){
        resolve('no refresh');
      },1000);
    })
  };
  this.start = function(){
    this.content.addEventListener('mousedown',movestart);
    this.content.addEventListener('touchstart',movestart)
  }
  this.remove = function(){
    this.content.removeEventListener('mousedown',movestart);
    this.content.removeEventListener('touchstart',movestart)
  }
  return this;
}
export default pullReload;
