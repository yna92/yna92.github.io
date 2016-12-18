'use script' 
//产生随机数[n,m)
function rnd(n,m){
	return parseInt(Math.random()*(m-n))+n
} 

//判断数组中是否包含某个数字
function findInArray(result,arr){
	for( var j=0;j<arr.length;j++){
		if(arr[j] == result){
			return true;
		} 
	}
	return false;
}
 
//变成两位数
function toDou(n){
	return n<10 ? '0' +n : ''+n ; 
}

//判断是不是整数
function isInt(n){
	return n == parseInt(n); 
}

//数字转化为字符串 
function intToStr(n){
	return ''+n; 
}

//通过class获取元素
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{//IE低版本
		var aElt = oParent.getElementsByTagName("*");
		var arr = [];
		for(var i = 0;i <aElt.length;i++){
			var arr2 = aElt[i].className.split(' ');
			if(findInArray(sClass,arr2)){
				arr.push(aElt[i]);
			} 
		}
		return arr;
	} 
}

//从数组中的第start个位置出开始找，找到start之后最小数的位置
//用于选择排序
function findMinIndex(arr,start){
	var minIndex = start;
	var minValue = arr[start];
	for(var i = start;i<arr.length;i++){
		if(arr[i] < minValue){
			minIndex = i;
			minValue = arr[i];
		}
	}
	return minIndex;
}

//事件绑定
function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn)
	} 
}

//事件解绑
function removeEvent(obj,sEv,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(sEv,fn,false);
	}else{
		obj.detachEvent('on'+sEv,fn)
	} 
}

//滚轮事件
 function addWheel(obj,fn){  
 	if(navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
 		addEvent(obj,'DOMMouseScroll',wheel)
 	}
 	else{
 		addEvent(obj,'mousewheel',wheel);
 	}
 	function wheel(ev){
	 	 var oEvent = ev || event; 
	 	 var bDown =oEvent.wheelDelta ?  (oEvent.wheelDelta < 0) : (oEvent.detail>0); 
	 	 fn && fn(bDown);  
	 	 oEvent.preventDefault &&oEvent.preventDefault();
	 	 return false;
 	}
 }; 

//获取某个元素的属性
 function getStyle(obj,sName){
 	return (obj.currentStyle||getComputedStyle(obj,false))[sName];
 }
 //运动框架
function move(obj,json,options){
 	options=options||{};
 	options.duration=options.duration||700;
 	options.easing=options.easing||'ease-out';
 	
 	var start={};
 	var dis={};
 	for(var name in json){
 		start[name]=parseFloat(getStyle(obj,name));
 		if(isNaN(start[name])){
 			start[name]=1;
 		};
 		
 		dis[name]=json[name]-start[name];
 	}
 	var count=Math.floor(options.duration/30);
 	var n=0;
 	clearInterval(obj.timer);
 	obj.timer=setInterval(function (){
 		n++;
 		for(var name in json){
 			switch(options.easing){
 				case 'linear':
 					var cur=start[name]+dis[name]*n/count;
 					break;
 				case 'ease-in':
 					var cur=start[name]+dis[name]*Math.pow(n/count,3);
 					break;
 				case 'ease-out':
 					var cur=start[name]+dis[name]*(1-Math.pow(1-n/count,3));
 					break;
 			}
 			if(name=='opacity'){
 				obj.style.opacity=cur;
 				obj.style.filter='alpha(opacity:'+cur*100+')';
 			}else{
 				obj.style[name]=cur+'px';
 			}
 		}
 		if(n==count){
 			clearInterval(obj.timer);
 			options.complete&&options.complete();
 		}
 	},30);
 }
//弹性运动
 ;(function (){
 	var start=0;
 	var iSpeed=20;
 	window.startMove=function (obj,name,iTarget){
 		clearInterval(obj.timer);
 		obj.timer=setInterval(function (){
 			iSpeed+=(iTarget-start)/5;
 			iSpeed*=0.8;
 			start+=iSpeed;
 			obj.style[name]=start+'px';
 			
 			if(Math.round(iSpeed)==0&&Math.round(start)==iTarget){
 				clearInterval(obj.timer);
 				obj.style[name]=iTarget+'px';
 			}
 		},16);
 	};
 })();
function getDir(obj,ev){
 	var x = obj.offsetLeft + obj.offsetWidth/2 - ev.clientX;
 	var y = obj.offsetTop + obj.offsetHeight/2 - ev.clientY;
 	return Math.round((Math.atan2(y,x)*180/Math.PI + 180)/90)%4;
 }
 //穿墙效果 宽高定死
function through(obj){
 	var oLi = obj.children[0];
 	obj.onmouseenter = function(ev){
 		var oEvent = ev || event;
 		var dir = getDir(obj,oEvent); 
 		switch(dir){
 			case 0:
 				oLi.style.left = '250px';
 				oLi.style.top = 0;
 				break;
 			case 1:
 				oLi.style.left = 0 ;
 				oLi.style.top = '200px';
 				break;
 			case 2:
 				oLi.style.left = '-250px';
 				oLi.style.top = 0;
 				break;
 			case 3:
 				oLi.style.left = 0;
 				oLi.style.top = '-200px';
 				break;

 		}
 		move(oLi,{left:0,top:0});
 	}
 	obj.onmouseleave = function(ev){
 		var oEvent = ev || event;
 		var dir = getDir(obj,oEvent);
 		switch(dir){
 			case 0: 
 				move(oLi,{left:250,top:0})
 				break;
 			case 1: 
 				move(oLi,{left:0,top:200})
 				break;
 			case 2: 
 				move(oLi,{left:-250,top:0})
 				break;
 			case 3: 
 				move(oLi,{left:0,top:-200})
 				break; 
 		} 
 	} 
 }
 'use strict'
var Tween={Linear:function(t,b,c,d){return c*t/d+b},Quad:{easeIn:function(t,b,c,d){return c*(t/=d)*t+b},easeOut:function(t,b,c,d){return -c*(t/=d)*(t-2)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b}return -c/2*((--t)*(t-2)-1)+b}},Cubic:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b}return c/2*((t-=2)*t*t+2)+b}},Quart:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t+b},easeOut:function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b}return -c/2*((t-=2)*t*t*t-2)+b}},Quint:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t*t+b}return c/2*((t-=2)*t*t*t*t+2)+b}},Sine:{easeIn:function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b},easeOut:function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOut:function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b}},Expo:{easeIn:function(t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b},easeOut:function(t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOut:function(t,b,c,d){if(t==0){return b}if(t==d){return b+c}if((t/=d/2)<1){return c/2*Math.pow(2,10*(t-1))+b}return c/2*(-Math.pow(2,-10*--t)+2)+b}},Circ:{easeIn:function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOut:function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return -c/2*(Math.sqrt(1-t*t)-1)+b}return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b}},Elastic:{easeIn:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return(a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b)},easeInOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d/2)==2){return b+c}if(!p){p=d*(0.3*1.5)}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}if(t<1){return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b}return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b}},Back:{easeIn:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*(t/=d)*t*((s+1)*t-s)+b},easeOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b}return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b}},Bounce:{easeIn:function(t,b,c,d){return c-Tween.Bounce.easeOut(d-t,0,c,d)+b},easeOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else{if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b}else{if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b}}}},easeInOut:function(t,b,c,d){if(t<d/2){return Tween.Bounce.easeIn(t*2,0,c,d)*0.5+b}else{return Tween.Bounce.easeOut(t*2-d,0,c,d)*0.5+c*0.5+b}}}};


//t  当前时间 		n*duration/count
//b  初始值 			start
//c  现在位置 		总距离
//d  总时间 			duration
//var cur=fx(t,b,c,d) 
 
function doMove(obj,json,options){
	options=options||{};
	options.duration=options.duration||700;
	options.easing=options.easing||Tween.Bounce.easeOut;
	var start={};
	var dis={};	
	
	for(var name in json){
		start[name]=parseFloat(getStyle(obj,name));
		//opacity加默认值
		if(isNaN(start[name])){
			start[name]=1;
		}
		//alert(json[name]);
		dis[name]=parseFloat(json[name])-start[name];
	}
	
	var count=Math.floor(options.duration/16);
	
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		for(var name in json){
			var cur=options.easing(n*options.duration/count,start[name],dis[name],options.duration);
			if(name=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name]=cur+'px';
			}
		}
		if(n==count){
			clearInterval(obj.timer);
			options.complete&&options.complete();
		}
	},16);
}































































