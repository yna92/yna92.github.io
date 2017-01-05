'use strict'
//首页轮播图
;(function(){
	var iNow = 0;
	mainWidth();
	$(window).resize(function(){
		mainWidth();
	})
	$('.main_bar div').click(function(){
		iNow = $(this).index();
		tab();
	})
	setInterval(function(){
		iNow++;
		tab();
	},2000);
	function tab(){

		$('.main_bar div').each(function(i,item){
			$(item).removeClass('active');
		})


		if(iNow == $('.main_ul li').length/2){
			$('.main_bar div').eq(0).addClass('active');
		}else{
			$('.main_bar div').eq(iNow).addClass('active');
		}

		$('.main_ul').animate({
			left:-iNow*$('.main_ul li').width()
		},1000,function(){
			if(iNow == $('.main_ul li').length/2){
				$('.main_ul').css({
					left:0
				})
				iNow = 0;
			}
		})
	}
})();


;(function(){
	var animated = true;
	$('.con_scroll_ul li').mouseover(function(){
		$(this).find('.scroll_mark').stop().animate({
			opacity:1
		})
		// $(this).find('img').stop().animate({
		// 	width:344,
		// 	height:221,
		// 	left:-10,
		// 	top:-10
		// })
	})
	$('.con_scroll_ul li').mouseout(function(){
		$(this).find('.scroll_mark').stop().animate({
			opacity:0
		})
		// $(this).find('img').stop().animate({
		// 	width:324,
		// 	height:201,
		// 	left:0,
		// 	top:0
		// })
	})
})();
//经典案例无缝滚动效果
;(function(){
	var liW = $('.con_scroll_ul li').outerWidth()+40;
	var left =0;
	$('.con_scroll_ul').css('width',$('.con_scroll_ul li').length * liW);
	$('.con_next').click(function(){
		left = $('.con_scroll_ul').position().left - liW*3;
		if( left < -($('.con_scroll_ul').width() - 3*liW) ){
			left = -($('.con_scroll_ul').width() - 3*liW);
			$(this).css('backgroundPosition','0 -180px');

		}else{
			$(this).css('backgroundPosition','0 -120px');
		}
		$('.con_prev').css('backgroundPosition','0 -60px');
		$('.con_scroll_ul').animate({
			left:left
		})
	})
	$('.con_prev').click(function(){
		left = $('.con_scroll_ul').position().left + liW*3 ;
		if(left >0){
			left = 0;
			$(this).css('backgroundPosition','0 0');
		}else{
			$(this).css('backgroundPosition','0 -60px')
		}$('.con_next').css('backgroundPosition','0 -120px');
		$('.con_scroll_ul').animate({
			left:left
		})
	})
})();
//导航条效果
;(function(){
	var iNow = $('.hd_right .active').index('.nav_a');
	$('.hd_right .nav_a').mouseover(function(){
		$(this).css('color','#2288f6');
	})
	$('.hd_right .nav_a').mouseout(function(){
		if(iNow != $(this).index('.nav_a')){
			$(this).css('color','#000');
		}
	})
})();
//底部导航条效果
;(function(){
	var iNow = $('.ft_ul .active').index('.ft_a');
	$('.ft_ul .ft_a').mouseover(function(){
		$(this).css('color','#2288f6');
	})
	$(".ft_ul .ft_a").mouseout(function(){
		if(iNow != $(this).index('.ft_a')){
			$(this).css('color','#fff');
		}
	})
})();


//轮播图的宽度
function mainWidth(){
	$('.main_box li').css('width',$(window).width());
	$('.main_box').css({
		'height':$('.main_ul li').height(),
		'width':$('.main_ul li').width()
	});
	$('.main_ul').css('width',$('.main_ul li').width()*$('.main_ul li').length*2);
}