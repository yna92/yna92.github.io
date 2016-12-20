//初始化食物和蛇体
function init(){
	window.randX = rand(0,19);
	window.randY = rand(0,19);
	window.oEat =  document.getElementById("eat");
	oEat.style.left = randX+"px";
	oEat.style.top = randY+"px";
	var aDiv =  oSnakeBorder.getElementsByTagName("div");
	for( var i = 0;i<arr.length;i++){//设置蛇体的位置
		aDiv[i+1].style.left = arr[i][0]+"px"; 
		aDiv[i+1].style.top = arr[i][1]+"px"; 
	}
}

//产生s，d之间的随机数，返回数比其大20倍
function rand(s,d){
	return Math.floor(Math.random()*(d-s+1)+s)*20;
}

//j计算用户所得分数
function computedGrade(){
//分数计算有两个方面：1：所吃食物的个数 2：平均吃每个食物的时间越长分数越少
	return countEat *10+parseInt(1/(countTime/60000/countEat));
}

function showGrade(grade){
	var oGrade = document.getElementById('grade');
	var oSpan = oGrade.getElementsByTagName('span')[1];
	oSpan.innerHTML = grade;

}

//蛇的具体移动过程
function moveProcess(){
	for(var i = arr.length-1;i>=0;i--){
		if(i == 0 &&direction == "right"){
			arr[i][0]+=20;
			if(arr[i][0] == 400){
				arr[i][0]=0;
			}
			window.l = arr[i][0];
			window.t = arr[i][1];
		}else if(i == 0 && direction == "left"){
			arr[i][0]-=20;
			if(arr[i][0] ==-20 ){
				arr[i][0]=380;
			}
			window.l = arr[i][0];
			window.t = arr[i][1];
		}else if(i == 0 && direction == "top"){
			arr[i][1]-=20;
			if(arr[i][1] ==-20 ){
				arr[i][1]=380;
			}	
			window.l = arr[i][0];
			window.t = arr[i][1];

		}else if(i == 0 && direction == "bottom"){
			arr[i][1]+=20;
			if(arr[i][1] == 400){
				arr[i][1]=0;
			}
			window.l = arr[i][0];
			window.t = arr[i][1];
		}
		else{
			arr[i][0] = arr[i-1][0];	
			arr[i][1] = arr[i-1][1];	
		}
	}
		for(var i = 1;i<aDiv.length;i++){
			aDiv[i].style.left = arr[i-1][0]+"px";	
			aDiv[i].style.top = arr[i-1][1]+"px";							
		}
		aDiv[aDiv.length-1].style.display = 'block';

}

//闯关成功
function succeed(){
	if(cTime <100){
		clearInterval(timer);
		alert("恭喜您...闯关成功！！！得分："+computedGrade());
	}
}

//闯关失败
function  fail(){
	for(i = 2;i<arr.length;i++){
		if(arr[0][0] == arr[i][0] && arr[0][1] == arr[i][1]){
			clearInterval(timer);
			alert("太遗憾了......闯关失败！！！得分："+computedGrade());
		}
	}
}

//蛇的移动
function move(){
	window.aDiv =  oSnakeBorder.getElementsByTagName("div");
	timer = setInterval(function(){
		countTime+=cTime;
		if(l == randX&& t==randY){
			window.oDiv = document.createElement("div");
			oDiv.style.display = 'none';			
			oSnakeBorder.appendChild(oDiv);
			aDiv =  oSnakeBorder.getElementsByTagName("div");
			arr.unshift([l,t]);
			randX = rand(0,19);
			randY = rand(0,19);
			oEat =  document.getElementById("eat");
			oEat.style.left = randX+"px";
			oEat.style.top = randY+"px";
			cTime-=10;
			countEat++;
			success();			
		}
		fail();			
		if(direction == "right"){
			moveProcess();				
		}else if(direction == "left"){	
			moveProcess();			
		}else if(direction == "top"){	
			moveProcess();			
		}else if(direction == "bottom"){
			 moveProcess();		
			
		}
		showGrade(computedGrade());
	},cTime)
}