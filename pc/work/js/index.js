'use strict';


//导航条变换
;(function(){
    var onOff = false;
    //窗口大小改变时，改变导航的位置
    $(window).resize(function(){
        if(onOff){ //导航展开时
            $('#nav').css({
                top:0
            })
        }else{//导航关闭时
            $('#nav').css({
                top:-$('#nav').innerHeight()
            })
        }
    })
    $('#nav').css({
        top:-$('#nav').innerHeight()
    })

    $('#menu .switch .open').click(function(){
        $('#nav').stop().animate({
            top:0
        },150,'linear',function(){
            $('#menu .switch ul').css({
                transform : 'translateX(-35px)'
            })
        });
        onOff = true;
    })
    $('#menu .switch .close').click(function(){
        $('#nav').stop().animate({
            top:-$('#nav').innerHeight()
        },50,'linear',function(){
            $('#menu .switch ul').css({
                transform : 'translateX(0px)'
            })
        });
        onOff = false;
    })
})();
//小人头部与底部运动
;(function(){
    setInterval(function(){
        $('.picTop').css('transform','translateX('+-rnd(0,5)*44+'px)');
    },2500)
    setInterval(function(){
        $('.picBottom').css('transform','translateX('+-rnd(0,5)*44+'px)');
    },3000)
})();
//电视屏幕切换
;(function(){
    var bOk = true;
    setInterval(function(){
        if(bOk){
            $('.bg24').css('transform','translateY(100%)');
            bOk = false;
        }else{
            $('.bg24').css('transform','translateY(0%)');
            bOk = true;
        }
    },3000)
})();
//手机屏幕切换
;(function(){
    var bOk = true;
    setInterval(function(){
        if(bOk){
            $('.bg29').css('transform','translateX(-50%)');
            bOk = false;
        }else{
            $('.bg29').css('transform','translateX(0%)');
            bOk = true;
        }
    },3000)
})();
//设置日期
;(function(){
    var oDate = new Date();
    var iDay = oDate.getDate();
    $('.date').css('top',-(iDay-1)*28);
})();
;(function(){
    var flag = true;
    setInterval(function(){
        flag&&$('.bg46').css('transform','translateY(42px)');
        flag||$('.bg46').css('transform','translateY(0px)');
        flag = !flag;
    },3000)
})();
//飞机
;(function(){
    var n = 1;
    var bOk = false; //转动停止状态
    $('.plane').mouseover(function(){
        var _this = this;
        if(bOk) return;
        bOk = true;
        $(this).css({
            'transform':'rotateZ('+n*360+'deg)',
            'animation-play-state': 'paused'
        })
        function transEnd(){
            $(_this).css({
                'animation-play-state': 'running'
            })
            bOk = false;
            n++;
            _this.removeEventListener('transitionend',transEnd,false);
        }
        this.addEventListener('transitionend',transEnd,false);
    })
})();
//鼠标移入动画
;(function(){
    $('.move').bOk = false;
    $('.move').mouseover(function(){
        if($(this).bOk) return;
        $(this).bOk = true;
        var _this = this;
        $(this).css({
            'transition':'0.2s all ease-out',
            'transform':'translateY('+$(this).height()*0.1+'px)'
        });
        function transEnd(){
            $(this).bOk = false;
            this.removeEventListener('transitionend',transEnd,false);
        }
        this.addEventListener('transitionend',transEnd, false);
         $('.move').mouseout(function(){
             var _this = this;
                 $(this).css({
                     'transition':'0.2s all ease-out',
                     'transform':'translateY(0px)'
                 });
                 $(_this).bOk = true;
                 function transEnd(){
                     $(_this).bOk = false;
                     _this.removeEventListener('transitionend',transEnd,false);
                 }
                 _this.addEventListener('transitionend',transEnd, false);
        })
    })

})();
//鼠标点击动画
;(function(){
    $('.move').bOk = false;
    var n = 1;
    // $('.move').css('transition','3s ease all')
    $('.move').click(function(){
        if($(this).bOk) return;
        $(this).unbind('mouseout');
        $(this).bOk = true;
        var _this = this;
        $(this).css({
            'transition':'3s all ease-out',
            'transform':'translateY(200px)'
        });
        // this.timer = setInterval(function(){
        //     if(n == -10){
        //         n = 10;
        //     }else{
        //         n = -10;
        //     }
        //     $(_this).css({
        //         'transform':'translate('+n+'px , 200px)'
        //     })
        // },5);
        function transEnd(){
            $(this).bOk = false;
            this.removeEventListener('transitionend',transEnd,false);
            this.timer = null;
            $(this).css({
                'transition':'0.4s all ease-out',
                'transform':'translateY(0px)'
            });
        }
        this.addEventListener('transitionend',transEnd, false)

    })

})();