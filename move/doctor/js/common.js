//设定rem
;(function(){
	document.documentElement.style.fontSize 
		= document.documentElement.clientWidth/3.75 + 'px';
	window.onresize=function(){
		document.documentElement.style.fontSize 
		= document.documentElement.clientWidth/3.75 + 'px';
	}
})();
;(function(){
	$('.nav_close').click(function(){
		$('.nav_detaile').hide();
	})
	$('.nav_img').click(function(){
		$('.nav_detaile').show();
	})
	$('.nav_link_box').find('li').click(function(){
		$('.nav_detaile').hide();
	}) 
})();
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{
		var re = new RegExp('\\b'+sClass+'\\b');
		var aResult = [];
		var aEle = oParent.getElementsByTagName('*');
		for(var i=0;i<aEle.length;i++){
			if(aEle[i].className.search(re)!=-1){
				aResult.push(aEle[i]);
			}
		}
		return aResult;
	}
}
function addClass(obj,sClass){
	var regx = new RegExp('\\b'+sClass+'\\b');
	var regx2 = /^\s|$\s/;
	if(obj.className.search(regx) != -1){
		obj.className += ' '+sClass;
		obj.className = obj.className.replace(regx2,'');
	}
}