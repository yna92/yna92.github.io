//获取元素的当前样式
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj, false)[attr];
	}
}

//控制元素的各种运动
function startMove(obj, json, fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;		
		for(var attr in json){		
			var iCur=0;			
			if(attr=='opacity'){
				iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
			}
			else{
				iCur=parseInt(getStyle(obj, attr));
			}			
			var iSpeed=(json[attr]-iCur)/16;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);			
			if(iCur!=json[attr]){
				bStop=false;
			}			
			if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}		
		if(bStop){
			clearInterval(obj.timer);			
			if(fn){
				fn();
			}
		}
	}, 30)
}

//随机生成人的重量，重量在80到130之间
function rand(){
	return Math.floor(Math.random()*(130-80)+80);
}
//开门
function openDoor(){
	startMove(oLeftDoor,{width:2});
	startMove(oRightDoor,{width:2});
	audio_doorOpen.src = "audio/door.mp3";
	doorState = true;
	aInputManage[0].disabled = false;
	aInputManage[1].disabled = false;
	aInputManage[0].style.cursor = "text";
	aInputManage[1].style.cursor = "text";
	aBtn[aBtn.length-2].style.background = "blue";	
	aBtn[aBtn.length-1].style.background= "#fff"
	if(aInputManage[2].value - aInputManage[1].value<0){
		alert("移除人数过多");
	}else{
		clearInterval(timerFloor);
		timer = setTimeout(function(){
			if(doorState ){
				closeDoor();
			}			
		},10000);
	}

} 
//关门
function closeDoor(){
	aInputManage[2].value = parseInt(aInputManage[2].value)+ parseInt(aInputManage[0].value)- parseInt(aInputManage[1].value);
	aInputManage[3].value = parseInt(aInputManage[2].value)*rand() +"斤";
	aInputManage[0].value = 0;
	aInputManage[1].value = 0;
	if(parseInt(aInputManage[3].value)>1300){//超重
		audio_overWeight.src = "audio/warn.mp3";

	}else{
		startMove(oLeftDoor,{width:200});
		startMove(oRightDoor,{width:200});
		doorState = false;
		aInputManage[0].style.cursor = "not-allowed";
		aInputManage[1].style.cursor = "not-allowed";
		aInputManage[0].disabled = true;
		aInputManage[1].disabled = true;
		//alert(parseInt(aInputManage[0].value));		
		aBtn[aBtn.length-1].style.background = "blue";
		aBtn[aBtn.length-2].style.background= "#fff"
		timerFloor = setInterval(testState,50);
	}
}

//电梯升降过程
function moveFloor(){
	var timer = null;
	num++;
	if(num == 60){
		num =0;
		if( state == 1){
			curFloor++;
		}else if(state == -1){
			curFloor--;
		}
		if(arr[curFloor]==1){
			openDoor();
			aBtn[curFloor].style.background = "#fff";
			arr[curFloor] = 0;
			
		}
	}
	oOutFloor.value = curFloor;
}
 //随时检测是否有楼层被按下
function testState(){ 
              if(state == 0){ //电梯正处于停止状态
              	for(j = 0;j<arr.length;j++){
              		if(arr[j]==1){
              			if(j>curFloor){
              				state = 1;
              				flag = true;
					moveFloor();
				}else if(j<curFloor){
					state = -1;
					flag = true;
				  	moveFloor();
				}else{
					moveFloor();
				}
			}
              	}
              }else if(state ==1){//电梯正处于上升状态
		for(var j= curFloor;j<arr.length;j++){
			if(arr[j]==1){
				moveFloor();
				flag = true;
			}
		}			
	}else if(state ==-1){//电梯正处于下降状态
		for(j = curFloor;j>0;j--){
			if(arr[j]==1){
				moveFloor();
				flag = true;
			}
		}			
	}	
	if(flag == false){
		state = 0;			
	}else{
		flag = false;
	}	
}