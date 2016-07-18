//图片滚动
function scroll(omaindiv,uldiv,prev,next,leo){
 var obox=document.getElementById(omaindiv);
	var oLi=document.getElementById(uldiv).getElementsByTagName('li');
	var oprev=document.getElementById(prev);
	var onext=document.getElementById(next);
	var odiv=getclass(obox,leo);
	var timer=null;
	var onow=0;
	for(var i=0;i<oLi.length;i++)
	{
	  oLi[i].index=i;
	  oLi[i].onmouseover=function()
	  {
	  	for(var i=0;i<oLi.length;i++)
		{
			oLi[i].className='';
			odiv[i].style.display='none';
		}
		 onow=this.index;
		this.className="active";
		odiv[this.index].style.display='block';	 
	  }
	    onext.onclick=function()
		{
		   if(onow<oLi.length-1)
		   {
		     onow++;
		   }else{onow=0;}
		   for(var i=0;i<oLi.length;i++)
		   {
		      oLi[i].className='';
			  odiv[i].style.display='none';
		   }
		   oLi[onow].className="active";
		   odiv[onow].style.display='block';
		}
		oprev.onclick=function()
		{
		  if(onow>0)
		  {
		     onow--;
		  }else{onow=oLi.length-1;}
		  for(var i=0;i<oLi.length;i++)
		  {
		    oLi[i].className='';
			  odiv[i].style.display='none';
		  } 
		  oLi[onow].className="active";
		   odiv[onow].style.display='block';
		}
    }
	//timer=setInterval(onext.onclick,3000);
	obox.onmouseover=function()
	{
	  oprev.style.display='block';
	  onext.style.display='block';
	  //clearInterval(timer);
	}
	obox.onmouseout=function()
	{
	  oprev.style.display='none';
	  onext.style.display='none';
	 // timer=setInterval(onext.onclick,3000);
	}
function getclass(oparent,oclass)
{
  var Ele=oparent.getElementsByTagName('*');
  var arr=[];
  for(var i=0;i<Ele.length;i++)
  {
    if(Ele[i].className==oclass)
	{
	   arr.push(Ele[i]);
	}
  }
  return arr;	
}

};
//选项卡
function tab(ulclass,tabdiv,active){
	$("."+ulclass+" li").each(function(i){
		$(this).click(function(){
			$("."+active).removeClass(active);
			$(this).addClass(active);
			$("."+tabdiv).css("display","none");
			$("."+tabdiv).eq(i).css("display","block");
		});
	});
}

