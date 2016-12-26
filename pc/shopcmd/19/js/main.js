'use strict'
//首页轮播图
;(function(){  
	var iNow = 0;
	mainWidth();
	$(window).resize(function(){
		mainWidth();
	})
	$(".main_ul")
	$('.main_bar div').click(function(){
		iNow = $(this).index(); 
		tab(); 
	}) 
	setInterval(function(){
		iNow++;
		if(iNow == $('.main_ul li').length) {
			iNow = 0; 
		} 
		// console.log(iNow)
		tab();
	},2000);

	function tab(){
		$('.main_bar div').each(function(i,item){
			$(item).removeClass('active');
		})  
		$('.main_bar div').eq(iNow).addClass('active'); 
		$('.main_ul').animate({
			left:-iNow*$('.main_ul li').width()
		},1000)
	}

})();
 

;(function(){
	var animated = true;
	$('.con_scroll_ul li').mouseover(function(){
		$(this).find('.scroll_mark').fadeIn();  
		$(this).find('img').stop().animate({
			width:344,
			height:221,
			left:-10,
			top:-10
		}) 
	})
	$('.con_scroll_ul li').mouseout(function(){
		$(this).find('.scroll_mark').fadeOut();
		$(this).find('img').stop().animate({
			width:324,
			height:201,
			left:0,
			top:0
		})
	})
})();

//导航条效果
;(function(){
	$(".hd_right .nav_a").mouseover(function(){

	})
})();


//轮播图的宽度
function mainWidth(){
	$(".main_box li").css('width',$(window).width());
	$(".main_box").css({
		'height':$('.main_ul li').height(),
		'width':$('.main_ul li').width()
	});
	$(".main_ul").css('width',$('.main_ul li').width()*$('.main_ul li').length*2);
}