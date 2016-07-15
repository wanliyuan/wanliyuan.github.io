(function($){
    $.fn.extend({
        "scrollImg":function(options,fn){
            var defaults={
				obox:"#J_slide",
				boxId:"#minlist",
				scrollTag:"li",
				auto:false,  //鏄惁瑕佽嚜鍔ㄦ挱鏀�
                iSpeed:5000, //鑷姩鎾斁鐨勯棿闅旀椂闂�
				nextBtnId:"#J_next",
				prevBtnId:"#J_prev",
				margin:0,
				scrollsl:1,
            };
            var opts=$.extend(defaults,options);
			var theTag=$(opts.boxId).find(opts.scrollTag)
			var oWidth=theTag.eq(0).width()+opts.margin;
			var oLength=theTag.length
			var aWidth=oWidth*oLength;
			var iNum=0;
			var textindex=0;
			var ydTimer=null;
			
			$(opts.boxId).css("width", aWidth + 'px');
			$(opts.nextBtnId).click(function(){
				tonext();
			});
			$(opts.prevBtnId).click(function(){
				if(!$(opts.boxId).is(":animated")){

					if(iNum==0){
						
					}
					else
					{
						iNum-=opts.scrollsl;
						$(opts.boxId).animate({"marginLeft":-oWidth*iNum+'px'},500);
					}
				};
			});
			function tonext(){
				
				if(!$(opts.boxId).is(":animated")){
					iNum+=opts.scrollsl;	
					if(iNum>=oLength){
						$(opts.boxId).animate({"marginLeft":0+'px'},500);
						iNum=0;
					}
					else
					{
						
						//$(opts.boxId).animate({"marginLeft":-oWidth*iNum+'px'},500);
						if(oLength-iNum<opts.scrollsl){
							$(opts.boxId).animate({"marginLeft":-oWidth*(oLength-opts.scrollsl)+'px'},500);	
   						}	
						else{
						$(opts.boxId).animate({"marginLeft":-oWidth*iNum+'px'},500);	
						
						}

					}
				};
			};
			if(opts.auto){
				ydTimer=setInterval(tonext,opts.iSpeed);
				$(opts.obox).hover(function(){
					clearInterval(ydTimer);
				},function(){
					ydTimer=setInterval(tonext,opts.iSpeed);
				});	
			};		
        },
		"fadeImg":function(options){
			var defaults={
				theboxId:"#play",
				theullsit:"#showul li",
				theollist:"#titleshow li",
				toclass:"hover",
				moverclass:"hover2",
				autoplay:true,
				iSpeed:5000 //鑷姩鎾斁鐨勯棿闅旀椂闂�
            };
			var showNum=0;
			var fadetimer=null;
            var opts=$.extend(defaults,options);
			var aUli=$(opts.theullsit);
			var aOli=$(opts.theollist);
			aOli.hover(function(){
				aOli.removeClass(opts.moverclass);
				$(this).addClass(opts.moverclass);	
			},function(){
				$(this).removeClass(opts.moverclass);
			});
			aOli.click(function(){
				aOli.removeClass(opts.toclass);
				$(this).addClass(opts.toclass);
				aUli.stop(true,true).fadeOut("slow");
				aUli.eq($(this).index()).stop(true,true).fadeIn("slow");
				showNum=$(this).index();	
			});
			if(opts.autoplay){
				fadetimer=setInterval(automove,opts.iSpeed);	
			};
			function automove(){
				showNum<aOli.length-1?showNum++ : showNum=0;		
				aOli.removeClass(opts.toclass);	
				aOli.eq(showNum).addClass(opts.toclass);
				aUli.stop(true,true).fadeOut("slow");
				aUli.eq(showNum).stop(true,true).fadeIn("slow");	
			};
			$(opts.theboxId).hover(function(){clearInterval(fadetimer)},function(){fadetimer=setInterval(automove,opts.iSpeed);});	
		}  
    });
})(jQuery);