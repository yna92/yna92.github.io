'use strict'
 
 //设置高度
;(function(){ 
	$('#box').height($(window).height());
	$('.box').height($(window).height()); 
	$("#ul1").height($('#ul1 .box').length * $('#ul1 .box').height());
	$('.allSkill').height($(window).height());
	$('.allSkill').css('top',-$(window).height()+'px');
	$(window).resize(function(){
		$('#box').height($(window).height());
		$('.box').height($(window).height());
		$('.allSkill').height($(window).height());
		$('.allSkill').css('top',-$(window).height()+'px');

	})
})();

fnWheel();
//滚轮滚动时
function changeNav(t){
	var index = -t/$(window).height();  
	$('#pos').css('background-color',$('#box'+index).css('background-color'));  
	startMove($('#pos')[0],'left',$('#navUl li:eq('+index+')')[0].offsetLeft);
}
//滚轮滚动时，设置ul的top值
function changeMain(t){
	if(t/$(window).height() != -4){
		$('.allSkill').css('top',-$(window).height()+'px');
		$(".oneLine").each(function(i,item){ 
			$(item).css('height',0); 
		})  
	}
	move($('#ul1')[0],{
		top:t
	},{
		easing:'ease-out',
		duration:1000,
		complete:function(){
			if(t/$(window).height() == -4){ 
				$('.allSkill').css('top','0px');
				ballFall();
			}
			changeNav(t)
			bOk =  true;
		}
	})  
}
//滚动滚轮
var bOk = true;
function fnWheel(){ 
 	addWheel(document,function(bDown){ 
 		if(bOk){
 			bOk = false;
 			if(bDown){ 
 				var t = $('#ul1').position().top - $('#ul1 .box').height(); 
 				if(t <= -($('#ul1').height() - $('#ul1 .box').height())){ 
 					t =  -($('#ul1').height() - $('#ul1 .box').height());
 				}
 				changeMain(t); 
 			}else{
 				var t = $('#ul1').position().top + $('#ul1 .box').height();  
 				if(t >= 0){ 
 					t =  0;
 				}
 				changeMain(t); 
 			} 
 		} 
 	})
 }
//  fnWheel();
//  $('#box0').css({background:'#ff6'});
//  $('#nav').show();
// $('#Introduce').show();
// 开始加载动画
;(function(){
	setTimeout(function(){
		$('#logoBox img').animate({
			opacity:0
		},function(){
			$('#logoBox').animate({
				width:'2000px',
				height:'2000px',  
				left:-(2000- $(window).width())/2,
				top:-(2000- $(window).height())/2,
			},3000,function(){
				$('#logoBox').css({
					'left':0,
					'top':0,
					'border-radius':0,
					'width':$(window).width()+'px',
					'height':$(window).height()+'px',
					'margin-left':0,
					'margin-top':0 
				});   
				$('#box0').css({background:'#ff6'});
				$('#nav').show();
				$('#Introduce').show();
				$('#logoBox').animate({
					opacity:0
				},500,function(){ 
					$('#logoBox').remove(); 
				})
				//动画加载完成，加载滚轮事件
				fnWheel();
			})
		}); 
	},1000);
})();
//导航菜单
function navMouseOut(){
	var index = -$('#ul1').offset().top/$(window).height();  
	var left = $('#navUl li').eq(index)[0].offsetLeft; 
	startMove($('#pos')[0],'left',left);
}
;(function(){  
	var left=0;  
	$('#navUl li').length = $('#navUl li').length - 1;
	$('#navUl li').each(function(i,item){
		$(this).mouseover(function(){
			startMove($('#pos')[0],'left',this.offsetLeft);
		})
		$(this).bind('mouseout',navMouseOut);
		$(this).click(function(){
			$(this).unbind('mouseout',navMouseOut)
			left=this.offsetLeft;
			startMove($('#pos')[0],'left',left);
			changeMain(-i*$(window).height()); 
		})
	})
})();
//自我介绍左侧
;(function(){  
	$('#introLeft div').mouseover(function(){  
		move(this,{width:300},{easing:'ease-out',duration:1000})
	})
	$('#introLeft div').mouseout(function(){ 
		move(this,{width:100},{easing:'ease-out',duration:1000}) 
	})
})();
//角转弧
function d2a(n){ 		
	return n*Math.PI/180;
}	
//弧转角	
function a2d(n){		
	return n*180/Math.PI;
}
  
//穿墙效果
;(function(){
	$('#moveBox ul').each(function(i,item){
		through(this);
	}) 
})();
//小球下落
function ballFall(){
	var arr = [{
		height:400,
		lineColor:'#f66',
		ballColor:'#f66',
		text:'html'
	},{
		height:400,
		lineColor:'#339',
		ballColor:'#339',
		text:'css'
	},{
		height:500,
		lineColor:'#069',
		ballColor:'#069',
		text:'JS'
	},{
		height:300,
		lineColor:'#06c',
		ballColor:'#06c',
		text:'nodeJs'
	},{
		height:450,
		lineColor:'#f90',
		ballColor:'#f90',
		text:'ajax'
	},{
		height:350,
		lineColor:'#f60',
		ballColor:'#f60',
		text:'angular'
	},{
		height:250,
		lineColor:'#09c',
		ballColor:'#09c',
		text:'vue'
	},{
		height:100,
		lineColor:'#f66',
		ballColor:'#f66',
		text:'php'
	},{
		height:150,
		lineColor:'#fc3',
		ballColor:'#fc3',
		text:'java'
	},{
		height:300,
		lineColor:'#f96',
		ballColor:'#f96',
		text:'c'
	} ]
	//9c3
	$('.oneBall').each(function(i,item){
		$(item).css('background',arr[i].ballColor);
		$(item).html(arr[i].text);
	})
	$('.oneBall').animate({
		'opacity':1
	}) 
	$(".oneLine").each(function(i,item){ 
		$(item).css('background',arr[i].lineColor);
		doMove(item,{
			'height':arr[i].height
		},{
			'duration':2600
		})
	})  
}