// JavaScript Document

  
  
  
 $(function(){
	var left=$("#move_left");
	var right=$("#move_right");
	var obj=$(".banner_nav_con ul");
	var w=obj.find("li").innerWidth();
	//var oLi=obj.find("li");
	var oCon=$(".banner_con");
	var oImg=$(".banner_con ul");
	var oImgW=oImg.find("li").innerWidth();
	
	left.click(function(){
		obj.find("li:last").prependTo(obj);
		obj.css("margin-left",-w);
		obj.animate({"margin-left": 0});
		
		oImg.find("li:last").prependTo(oImg);
		oImg.css("margin-left",-oCon);
		oImg.animate({"margin-left": 0});
	});

	right.click(function(){
		    obj.animate({"margin-left": -w},function(){
			obj.find("li:first").appendTo(obj);
			obj.css("margin-left","0");
		})	
			oImg.animate({"margin-left": -oCon},function(){
			oImg.find("li:first").appendTo(oImg);
			oImg.css("margin-left","0");
		});
	});
	//$(".banner_nav_con li").each(function(index){
//	   $(this).mouseover(function(){	   
//	   
//		   $(".banner_nav_con li").removeClass("active");
//		   $(".banner_con li").css("display","none");
//		   $(this).addClass("active");
//		   $(".banner_con li").eq(index).css("display","block");
//		})

	//自动滚动变化图片
	var moving=setInterval(function(){left.click()},2000);
	obj.hover(function(){
		clearInterval(moving);			   
		},function(){
			 moving=setInterval(function(){left.click()},2000);
			})
	oImg.hover(function(){
		clearInterval(moving);			   
		},function(){
			 moving=setInterval(function(){left.click()},2000);
			})
})