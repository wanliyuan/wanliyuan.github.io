/*
	By sean at 2010.07,  modified on 2010.09.10;
	
	Example:
	$(".productshow").xslider({//.productshow鏄绉诲姩瀵硅薄鐨勫妗�;
		unitdisplayed:3,//鍙鐨勫崟浣嶄釜鏁�   蹇呴渶椤�;
		movelength:1,//瑕佺Щ鍔ㄧ殑鍗曚綅涓暟    蹇呴渶椤�;
		maxlength:null,//鍙瀹藉害鎴栭珮搴�    榛樿鏌ユ壘瑕佺Щ鍔ㄥ璞″灞傜殑瀹芥垨楂樺害;
		scrollobj:null,//瑕佺Щ鍔ㄧ殑瀵硅薄     榛樿鏌ユ壘productshow涓嬬殑ul;
		unitlen:null,//绉诲姩鐨勫崟浣嶅鎴栭珮搴�     榛樿鏌ユ壘li鐨勫昂瀵�;
		nowlength:null,//绉诲姩鏈€闀垮鎴栭珮锛堣绉诲姩瀵硅薄鐨勫搴︽垨楂樺害锛�   榛樿鐢眑i涓暟涔樹互unitlen鎵€寰楃殑绉�;
		dir:"H",//姘村钩绉诲姩杩樻槸鍨傜洿绉诲姩锛岄粯璁涓烘按骞崇Щ鍔紝浼犲叆V鎴栧叾浠栧瓧绗﹀垯琛ㄧず鍨傜洿绉诲姩;
		autoscroll:1000//鑷姩绉诲姩闂撮殧鏃堕棿     榛樿null涓嶈嚜鍔ㄧЩ鍔�;
	});
*/
jQuery.extend(jQuery.easing,{
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	}
});
(function($){	
	$.fn.xslider=function(settings){
		settings=$.extend({},$.fn.xslider.defaults,settings);
		this.each(function(){
			var scrollobj=settings.scrollobj || $(this).find("ul");
			var maxlength=settings.maxlength || (settings.dir=="H" ? scrollobj.parent().width() : scrollobj.parent().height());//length of the wrapper visible;
			var scrollunits=scrollobj.find("li");//units to move;
			var unitlen=settings.unitlen || (settings.dir=="H" ? scrollunits.eq(0).outerWidth() : scrollunits.eq(0).outerHeight());
			var unitdisplayed=settings.unitdisplayed;//units num displayed;
			var nowlength=settings.nowlength || scrollunits.length*unitlen;//length of the scrollobj;
			var offset=0;
			var sn=0;
			var movelength=unitlen*settings.movelength;
			var moving=false;//moving now?;
			var btnright=$(this).find("a.aright");
			var btnleft=$(this).find("a.aleft");
			
			if(settings.dir=="H"){
				scrollobj.css("left","0px");
			}else{
				scrollobj.css("top","0px");
			}
			if(nowlength>maxlength){
				btnleft.addClass("agrayleft");
				btnright.removeClass("agrayright");
				offset=nowlength-maxlength;
			}else{
				btnleft.addClass("agrayleft");
				btnright.addClass("agrayright");
			}

			btnleft.click(function(){
				if($(this).is("[class*='agrayleft']")){return false;}
				if(!moving){
					moving=true;
					sn-=movelength;
					if(sn>unitlen*unitdisplayed-maxlength){
						jQuery.fn.xslider.scroll(scrollobj,-sn,settings.dir,function(){moving=false;});
					}else{
						jQuery.fn.xslider.scroll(scrollobj,0,settings.dir,function(){moving=false;});
						sn=0;
						$(this).addClass("agrayleft");
					}
					btnright.removeClass("agrayright");
				}
				return false;
			});
			btnright.click(function(){
				if($(this).is("[class*='agrayright']")){return false;}
				if(!moving){
					moving=true;
					sn+=movelength;
					if(sn<offset-(unitlen*unitdisplayed-maxlength)){
						jQuery.fn.xslider.scroll(scrollobj,-sn,settings.dir,function(){moving=false;});
					}else{
						jQuery.fn.xslider.scroll(scrollobj,-offset,settings.dir,function(){moving=false;});//婊氬姩鍒版渶鍚庝竴涓綅缃�;
						sn=offset;
						$(this).addClass("agrayright");
					}
					btnleft.removeClass("agrayleft");
				}
				return false;
			});
			
			if(settings.autoscroll){
				jQuery.fn.xslider.autoscroll($(this),settings.autoscroll);
			}
			
		})
	}
})(jQuery);

jQuery.fn.xslider.defaults = {
	maxlength:0,
	scrollobj:null,
	unitlen:0,
	nowlength:0,
	dir:"H",
	autoscroll:null
};
jQuery.fn.xslider.scroll=function(obj,w,dir,callback){
	if(dir=="H"){
		obj.animate({
			left:w
		},500,"easeInSine",callback);
	}else{
		obj.animate({
			top:w
		},500,"easeInSine",callback);	
	}
}
jQuery.fn.xslider.autoscroll=function(obj,time){
	var  vane="right";
	function autoscrolling(){
		if(vane=="right"){
			if(!obj.find("a.agrayright").length){
				obj.find("a.aright").trigger("click");
			}else{
				vane="left";
			}
		}
		if(vane=="left"){
			if(!obj.find("a.agrayleft").length){	
				obj.find("a.aleft").trigger("click");
			}else{
				vane="right";
			}
		}
	}
	var scrollTimmer=setInterval(autoscrolling,time);
	obj.hover(function(){
		clearInterval(scrollTimmer);
	},function(){
		scrollTimmer=setInterval(autoscrolling,time);
	});
}