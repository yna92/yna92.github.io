

;(function(){
		var oBtn = document.getElementById("btn");
		var aBtn=oBtn.getElementsByTagName("div");
		var oLeftDoor = document.getElementById("leftDoor");
		var oRightDoor = document.getElementById("rightDoor");
		var oOutFloor = document.getElementById("outFloor");
		var oTitle = document.getElementsByTagName("title")[0];
		var oManage = document.getElementById("manage");
		var aInputManage = oManage.getElementsByTagName("input");
		 var audio_doorOpen = document.createElement("audio");//开门后走出电梯声
	  	 audio_doorOpen.autoplay = true;
	   	 document.body.appendChild(audio_doorOpen);
	   	 var audio_overWeight = document.createElement("audio");//超重提示声
	  	 audio_overWeight.autoplay = true;
	   	 document.body.appendChild(audio_overWeight);
		var arr = [0,0,0,0,0,0,0,0];//用来保存拿个楼层被按，1表示被按，0表示未被按
		var state = 0; //1表示电梯正在向上走，-1表示电梯在向下走，0表示电梯停止
		var curFloor = 1;
		var timerFloor  = null;
		var flag = false;//用来表示是否改变电梯当前的状态
		var doorState = false;
		var num = 0;

		var  iMinZindex = 2;
		var i;
		oOutFloor.value = curFloor;

	             aInputManage[0].value = 0;
		aInputManage[1].value = 0;
		aInputManage[2].value = 0;
		aInputManage[3].value = 0;

		timerFloor = setInterval(testState,50);

		for(i=0;i<aBtn.length;i++){
			aBtn[i].style.left=aBtn[i].offsetLeft+'px';
			aBtn[i].style.top=aBtn[i].offsetTop+'px';
		}
		for(i=0;i<aBtn.length;i++){
			aBtn[i].style.position='absolute';
			aBtn[i].style.margin='0';
		}
		for(i=0;i<aBtn.length;i++){

			aBtn[i].onmouseover=function (){
				this.style.zIndex=iMinZindex++;
				startMove(this, {width: 72, height: 63, marginLeft: -1, marginTop: -1});
			}
			aBtn[i].onmouseout=function (){
				startMove(this, {width: 70, height: 60, marginLeft: 0, marginTop: 0});
			}
			aBtn[aBtn.length-2].onclick=openDoor;
			aBtn[aBtn.length-1].onclick=closeDoor;


		}
		for(i = 0;i<aBtn.length-2;i++){
			aBtn[i].index = i;
			aBtn[i].onclick = function(){
				if(aInputManage[2].value>0){//当电梯内有人时才可以按下楼层按钮
					this.style.background = 'yellow';
					arr[this.index] = 1;
				}

			}
		}

})();
