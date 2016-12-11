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

 ;(function (){
 	var start=0;
 	var iSpeed=20;
 	window.doMove=function (obj,name,iTarget){
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









































