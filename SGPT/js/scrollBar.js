	
			var oBox=document.getElementById("box");
			var oBar=document.getElementById("scrollbtn");
			var oscrollline=document.getElementById("scrollline");
			var disX = 0;
			var maxL = 669;
			var iScale = 0;
			
			
			var oInner=document.getElementById("inner");
			var oContent=document.getElementById("content");
			

			oBar.onmousedown = function (event)
			{
				var event = event || window.event;
				disX = event.clientX - oBar.offsetLeft;		
				document.onmousemove = function (event)
				{
					var event = event || window.event;
					var iL = event.clientX - disX;			
					iL <= 0 && (iL = 0);
					iL >= maxL && (iL = maxL);
					oBar.style.left = iL + "px";
					oInner.style.marginLeft=-(oInner.offsetWidth-oContent.offsetWidth)*iScale+"px";
					iScale = iL / maxL;			
					return false
				};		
				document.onmouseup = function ()
				{
					
					document.onmousemove = null;
					document.onmouseup = null
				};
				return false
			};
			
			
			
			
			oBox.onmouseover = function (event)
			{
				event = event || window.event;		
				function mouseWheel(event)
				{
					var delta = event.wheelDelta ? event.wheelDelta : -event.detail * 40
					var iTarget = delta > 0 ? -30 : 30;
					
					
					
					//console.log(oBar.offsetLeft + iTarget)
					togetherMove(oBar.offsetLeft + iTarget)
					 stopEventBubble(event);
				}
				//addHandler(this, "mousewheel", mouseWheel);
				//addHandler(this, "DOMMouseScroll", mouseWheel);
			};	
			
			oscrollline.onclick = function (event)
			{
				var iTarget = (event || window.event).clientX - oBox.offsetLeft - this.offsetLeft - oBar.offsetWidth / 2;
				togetherMove(iTarget)
			};

			
			
			function togetherMove(iTarget)
			{
				if (iTarget <= 0)
				{
					iTarget = 0
				}
				else if (iTarget >= maxL)
				{
					iTarget	= maxL
				}
				iScale = iTarget / maxL;
				oInner.style.marginLeft=-(oInner.offsetWidth-oContent.offsetWidth)*iScale+"px";
				oBar.style.left = iTarget + "px";
			}
			function addHandler(element, type, handler)
			{
				return element.addEventListener ? element.addEventListener(type, handler, false) : element.attachEvent("on" + type, handler)
			};
			function stopEventBubble(event){
		        var e=event || window.event;
		
		        if (e && e.stopPropagation){
		            e.stopPropagation();    
		        }
		        else{
		            e.cancelBubble=true;
		        }
		   };
