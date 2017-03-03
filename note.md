## 浏览器window对象中的各种高度
js中有太多的宽高,距离,而且,兼容情况不一,下面是总结的一些,欢迎大家测试 - - 纠错 以及补充.

html元素距离,宽度,高度特别多,下面总结了一些原生js获取元素距离,宽度,高度的方法和兼容情况

//注意,以下内容都是在<!DOCTYPE html>    //html5声明中使用测试

下面node代表元素对象,event需要做兼容处理        //event=event||window.event;

### 高度
1. node.scrollWidth node.scrollHeight:表示该与元素的整体宽高，溢出部分也会计算（除非hidden）
2. node.scrollTop node.scrollLeft:元素内容上滚的高度，一般发生在overflow:scroll或者auto的时候
3. node.offsetHeight - - node.offsetWidth  //注意:不包含溢出部分
//如果node不是body,那么,此处是元素的最终的高度和宽度(如何内容溢出,则不包含溢出部分),而且,主流浏览器都一样,IE8也兼容,
//如果node是body,那么,此处在标准浏览器代表整个文档的高度(如何设定了body的高度,那么,就是设置的高度,溢出部分不计算),跟窗口大小无关,但是在IE8中却表示的是浏览器窗口的高度(不管是否设置body高度,是否溢出,在IE8中,此值都不变化).
4. node.clientHeight - - node.clientWidth   
//如果node不是body,则此值与offsetHeight,offsetWidth相等.
//如果node是body,则此值表示浏览器窗口区的宽高,调整浏览器窗口大小,值也会相应变化   与body设置宽高无关 兼容主流浏览器

5. window.innerHeight  - - window.innerWidth;表示浏览器可操作窗口的宽高
    //等于document.body.clientHeight
6. window.screen.height - -window.screen.width  //都表示显示器的高度和宽度,与窗口大小无关,兼容主流浏览器,包括IE8
7. window.screen.availHeight - - window.screen.availWidth  //表示显示器的高度和宽度,与窗口大小无关,只是除去任务栏。别的和window.height一样;

### 距离

1. node.scrollTop - - node.scrollLeft         //元素内容上滚的高度，父元素的滚动条下滚的高度      //所有主流浏览器都兼容
//document.body.scrollTop就是窗口滚动条下滚的高度
2. node.offsetTop - - node.offsetLeft         //元素距离父元素的高度和宽度,兼容所有主流浏览器,包括IE8

3. event.offsetX - - event.offsetY         //鼠标在当前元素中的坐标    //所有主流浏览器都兼容但是因为盒模式的不同,在IE和其他标准浏览器中获取的坐标值有一定差异
4. event.clientX - - event.clientY         //鼠标在视窗中的坐标  相对视窗，所以叫client 所有主流浏览器都兼容
5. event.pageX - - event.pageY        //鼠标在document.body中的坐标，无滚动的时候和client一样，有滚动则显示真实位置 IE9+以及其它主流浏览器都兼容
