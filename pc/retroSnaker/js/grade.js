
function drag()
{
	var oGrade=document.getElementById('snakeBorder');
	
	var disX=0;
	var disY=0;
	
	oGrade.onmousedown=function (ev)
	{
		var oEvent=ev||event;
		
		disX=oEvent.clientX-oGrade.offsetLeft;
		disY=oEvent.clientY-oGrade.offsetTop;
		
		document.onmousemove=function (ev)
		{
			var oEvent=ev||event;
			var l=oEvent.clientX-disX;
			var t=oEvent.clientY-disY;
			
			if(l<0)
			{
				l=0;
			}
			else if(l>document.documentElement.clientWidth-oGrade.offsetWidth)
			{
				l=document.documentElement.clientWidth-oGrade.offsetWidth;
			}
			
			if(t<0)
			{
				t=0;
			}
			else if(t>document.documentElement.clientHeight-oGrade.offsetHeight)
			{
				t=document.documentElement.clientHeight-oGrade.offsetHeight;
			}
			
			oGrade.style.left=l+'px';
			oGrade.style.top=t+'px';
		};
		
		document.onmouseup=function ()
		{
			document.onmousemove=null;
			document.onmouseup=null;
		};
		
		return false;
	};
};