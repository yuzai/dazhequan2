import method from './method';

var Router = function(){
  this.currenturl = '';
  this.methods = {
  };
};
Router.prototype.route = function(url,handler){
  this.methods[url] =handler;
};
Router.prototype.refresh = function(){
  this.currenturl = location.hash.slice(1) || '/';
  if(this.methods[this.currenturl]){
    this.methods[this.currenturl]();
  }else {
    console.log(this.currenturl);
    this.methods['/nopage']();
  }
}
Router.prototype.init = function(){
  method.addevent(window,'load',this.refresh.bind(this));
  method.addevent(window,'hashchange',this.refresh.bind(this));
};
export default Router;
