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
		var left = $('#pos')[0].offsetLeft;
		var index = left/100;
		var t = - index * $(window).height();
		$('#ul1').css('top',t);
		$('.allSkill').css('top',0);
		if(index!= 4){
			$('.allSkill').css('top',-$(window).height()+'px');
			$(".oneLine").each(function(i,item){
				$(item).css('height',0);
			})
		}


	})
})();

// fnWheel();
//滚轮滚动时
function changeNav(t){
	var index = -t/$(window).height();
	$('#pos').css('background-color',$('#box'+index).css('background-color'));
	startMove($('#pos')[0],'left',$('#navUl li:eq('+index+')')[0].offsetLeft);
}
//滚轮滚动时，设置ul的top值
function changeMain(t){
	$('#box4').css('background','#ccf');
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
 				var t = $('#ul1').position().top - $(window).height();
 				if(t <= -($('#ul1').height() - $(window).height())){
 					t =  -($('#ul1').height() - $(window).height());
 				}
 				changeMain(t);
 			}else{
 				var t = $('#ul1').position().top + $(window).height();
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

;(function(){
	var arr = [{
		height:300,
		lineColor:'#f66',
		ballColor:'#f66',
		text:'html',
		txt:'掌握html，能够配合css完成兼容各种浏览器的页面'
	},{
		height:300,
		lineColor:'#339',
		ballColor:'#339',
		text:'css',
		txt:'掌握css,能够完成无兼容问题的页面'
	},{
		height:320,
		lineColor:'#069',
		ballColor:'#069',
		text:'JS',
		txt:'掌握JS，对JS的各大对象有深入了解，熟悉面向对象编程'
	},{
		height:200,
		lineColor:'#06c',
		ballColor:'#06c',
		text:'nodeJs',
		txt:'熟悉nodeJs，能够用node抓取网页数据，node搭建个人博客正在进行中'
	},{
		height:250,
		lineColor:'#f90',
		ballColor:'#f90',
		text:'ajax',
		txt:'熟悉ajax，独立完成过微博发表，许愿墙等数据交互'
	},{
		height:200,
		lineColor:'#f60',
		ballColor:'#f60',
		text:'angular',
		txt:'熟悉angular，--------'
	},{
		height:200,
		lineColor:'#09c',
		ballColor:'#09c',
		text:'vue',
		txt:'熟悉vue，--------'
	},{
		height:50,
		lineColor:'#f66',
		ballColor:'#f66',
		text:'php',
		txt:'了解php，了解php的基本语法'
	},{
		height:80,
		lineColor:'#fc3',
		ballColor:'#fc3',
		text:'java',
		txt:'熟悉java，学校时期完成过超市管理系统'
	},{
		height:120,
		lineColor:'#f96',
		ballColor:'#f96',
		text:'c',
		txt:'熟悉c，学校时期完成各种管理系统'
	} ]
	$(arr).each(function(){
		$('<div class="oneSkill"><div class="oneLine"></div><div class="oneBall"></div><div class="oneTxt"></div></div>')
		.appendTo($('.skillBox').get(0));
	})
	$('<div id="showTxt"><span></span><div>').appendTo($('.skillBox').get(0));
	$('.oneTxt').each(function(i,item){//设置描述文字
		$(item).html(arr[i].txt);
	})
	//移入小球
	$('.oneBall').mouseover(function(){

		$('.oneBall').each(function(i,item){  //恢复小球原来的颜色
			$(item).css({
				'background':arr[i].ballColor,
				color:'#fff'
			});
			$(item).html(arr[i].text);
		})
		$(".oneLine").each(function(i,item){ //恢复线的颜色
			$(item).css('background',arr[i].lineColor);
		})
		var _this = this;
		$('#showTxt span').html("");
		doMove($('#showTxt span')[0],{
			top:60
		},{
			complete:function(){
				$('#showTxt span').html($('.oneTxt').eq($(_this).index('.oneBall')).html()); //改变显示文字
				doMove($('#showTxt span')[0],{
					top:30
				})
			}
		})
		$('#box4').css({
			opacity:0.8,
			'backgroundColor':$(this).css('backgroundColor')
		});
		$('#box4').animate({
			opacity:1
		})
	 	$(this).css({
	 		background:'#fff',
	 		color:$('#box4').css('backgroundColor')
	 	})
	 	$('.oneLine').eq($(this).index('.oneBall')).css({
	 		background:'#fff'
	 	})
	})
	//小球下落
	window.ballFall = function (){
		//9c3
		$('.oneBall').each(function(i,item){
			$(item).css({
				'background':arr[i].ballColor,
				'color':'#fff'
			});
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
				'duration':3000
			})
		})
	}

})();
//折纸效果
;(function(){
	var iDelay=200;
	var oTimer=null;
	var i=0;
	var bOff=true;
	setTimeout(function(){
		oTimer=setInterval(function(){
			$('.perData div').eq(i).removeClass('hide');
			$('.perData div').eq(i).addClass('show');
			i++;
			if(i==$('.perData div').length)
			{
				clearInterval(oTimer);
				oTimer=null;
				bOff=false;
			}
		},iDelay);
	},5000)

	$('.perData h2').click(function(){
		if(oTimer){
			return;
		}
		if(bOff){
			i=0;
			oTimer=setInterval(function(){
				$('.perData div').eq(i).removeClass('hide');
				$('.perData div').eq(i).addClass('show');
				i++;
				if(i==$('.perData div').length)
				{
					clearInterval(oTimer);
					oTimer=null;
					bOff=false;
				}
			},iDelay);
		}
		else{
			i=$('.perData div').length-1;
			oTimer=setInterval(function(){
				$('.perData div').eq(i).removeClass('show');
				$('.perData div').eq(i).addClass('hide');
				i--;
				if(i<0)
				{
					clearInterval(oTimer);
					bOff=true;
					oTimer=null;
				}
			},iDelay);
		}
	})
})();

//3d幻灯片效果
;(function(){
	var oPicList=document.getElementById("picList");
	var oCss=document.getElementById("css");
	var aeBtns=document.getElementById("eBtns").getElementsByTagName("li");
	var aLi=null;
	var sLi="";
	var sCss="";
	var iLiw=40;
	var iZindex=0;
	var iNow=0;
	var iLength=oPicList.clientWidth/iLiw;
	var arr = ["effect/翻页.html",
				"effect/分块翻转.html",
				"effect/3d旋转.html",
				"effect/爆炸.html"
	]
	for(var i=0;i<iLength;i++)
	{
	    i>iLength/2?iZindex--:iZindex++;
	    sLi+='<li><a href="'+arr[0]+'"></a><a href="'+arr[1]+'"></a><a href="'+arr[2]+'"></a><a href="'+arr[3]+'"></a><span></span><span></span></li>';
	    sCss+="#picList li:nth-of-type("+(i+1)+") a{ background-position:-"+i*iLiw+"px 0;}";
	    sCss+="#picList li:nth-of-type("+(i+1)+"){z-index:"+iZindex+"}";


	}
	oPicList.innerHTML=sLi;
	oCss.innerHTML+=sCss;
	aLi=oPicList.children;
	for(var i=0;i<aeBtns.length;i++)
	{
	    (function(a){
	        aeBtns[a].onclick=function()
	        {
	            for(var i=0;i<aLi.length;i++)
	            {
	                aLi[i].style.transition="0.5s "+i*50+"ms";
	                aLi[i].style.WebkitTransform="rotateX(-"+a*90+"deg)";
	            }
	            this.className="active";
	            aeBtns[iNow].className="";
	            iNow=a;
	        };
	    })(i)
	}

})();
//立方体
// ;(function(){
// 	var oBox = document.querySelector(".cubeBox");
// 	var x = 0;
// 	var y = 0;
// 	var iSpeedX = 0;
// 	var iSpeesY = 0;
// 	var lastX = 0;
// 	var lastY = 0;

// 	oBox.onmousedown = function(ev){
// 		 var disX = ev.clientX - x;
// 		 var disY = ev.clientY - y;
// 		 document.onmousemove = function(ev){
// 		 	x = ev.clientX - disX;
// 		 	y = ev.clientY - disY;
// 		 	oBox.style.transform = 'perspective(800px) rotateX('+-(y)+'deg) rotateY('+(x)+'deg)';
// 		 	iSpeedX = ev.clientX - lastX;
// 		 	iSpeedY = ev.clientY - lastY;

// 		 	lastX = ev.clientX;
// 		 	lastY = ev.clientY;
// 		 }
// 		 document.onmouseup = function(){
// 		 	document.onmousemove=null;
// 		 	document.onmouseup=null;

// 		 	oBox.timer=setInterval(function (){
// 		 		iSpeedX*=0.8;
// 		 		iSpeedY*=0.8;

// 		 		x+=iSpeedX;
// 		 		y+=iSpeedY;
// 		 		oBox.style.transform='perspective(800px) rotateX('+-(y)+'deg) rotateY('+(x)+'deg)';

// 		 		if(Math.abs(iSpeedX)<1)iSpeedX=0;
// 		 		if(Math.abs(iSpeedY)<1)iSpeedY=0;

// 		 		if(iSpeedX==0&&iSpeedY==0){
// 		 			clearInterval(oBox.timer);
// 		 		}
// 		 	},16);

// 		 }
// 		return false;
// 	}
// })();



