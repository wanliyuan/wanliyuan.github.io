// JavaScript Document


$(function(){
	
	  $(".navigation li").click(function() {
        $(this).siblings().removeClass("item-active");
        $(this).addClass("item-active");
        //$(this).siblings().find("a").css("opacity", 0);
        //$(this).find("a").css("opacity", 1);
    });
 
 
	function toshowbtn(id,maxlength){
		var oShowContent=$("#"+id);
		var olength = oShowContent.find("li").length;
		oShowContent.hover(function(){
			if(olength>maxlength){
		    	$(this).find(".abtn").show();
			}
		},function(){
			$(this).find(".abtn").hide();		
		})		
	};
	
    //$("#slide_1 li:eq(0)").mouseover(function () {
    //    $("#slide_1").find(".aleft").show();
	//})
		

	

	function toactive(theobj, showclass) {
	    theobj.on("mouseover", "li", function () {
	        $(this).siblings().removeClass(showclass);
	        $(this).addClass(showclass);
	    })
	};
	function toactive_3(theobj, showclass) {
	    theobj.on("mouseover", "img", function () {
	        $(this).siblings().removeClass(showclass);
	        $(this).addClass(showclass);
	    })
	    theobj.on("mouseout", "img", function () {
	        $(this).removeClass(showclass);
	    })
	};
	
	function toactive_2(theobj,showclass){
	    theobj.on("mouseover", "li", function () {
	        $(this).siblings().removeClass(showclass);
	        $(this).addClass(showclass);
	    });
	    theobj.on("mouseout", "li", function () {
	        $(this).removeClass(showclass);
	    })
	};
		
	toactive($("#slide_1"), "active");
	toactive($("#slide_2"), "active2");
	toactive($("#slide_4"), "active2");
	toactive($("#certificateUl_1"), "active");
    toactive_3($("#project_img"), "img-active");
    toactive_3($("#projectManagerUl"), "img_cur");
    toactive($("#projectUl"),"project_website");
    toactive($("#wzlist"), "project_website_1");
	toshowbtn('slide_2', 3,".abtn");
	toshowbtn('slide_1', 3, ".abtn");
	toshowbtn('slide_3', 3, ".abtn");
	toshowbtn('slide_4', 3, ".abtn");
	toshowbtn('slide_5', 4,".abtn_3");
	toshowbtn('shili', 4, ".abtn_1");
	//toshowbtn('slide_6');
	toshowbtn('slide_23', 3);
	show_content2();
	
	$("#website").on("mouseover", "li", function () {
	    $(this).siblings().find(".project_name1").removeClass("website_active");
	    $(this).find(".project_name1").addClass("website_active");
	    $(".parentli  .add_project").hide();
	    $(".parentli  .add_project").eq($(this).index()).show();
	});

	


	$("#website_detail").on("mouseover", ".projectscene", function () {
	    $(this).find(".abtn").show();
	})
	$("#website_detail").on("mouseout", ".projectscene", function () {
	    $(this).find(".abtn").hide();
	})


    
	$("#subcompanyUl").on("mouseover", ".li_img", function () {
	    $(".li_img").show();
	    $(this).hide();
	    $(this).parent().siblings().find(".details").hide();
	    $(this).parent().find(".details").show();
	})
	
	
	 $("#slide_1").scrollImg({
                                    obox: "#slide_1", boxId: "#certificateUl", scrollTag: "li", auto: false, iSpeed: 3000, nextBtnId: "#certificate_right", prevBtnId: "#certificate_left", margin: 17, scrollsl: 3});
                                $("#slide_2").scrollImg({
                                    obox: "#slide_2", boxId: "#drawingsUl", scrollTag: "li", auto: false, iSpeed: 3000, nextBtnId: "#drawings_right", prevBtnId: "#drawings_left", margin: 17, scrollsl : 3 });
                                $("#slide_3").scrollImg({
                                    obox: "#slide_3", boxId: "#certificateUl_1", scrollTag: "li", auto: false, iSpeed: 3000, nextBtnId: "#certificate_right1", prevBtnId: "#certificate_left1", margin: 17, scrollsl: 3 });
                                $("#slide_4").scrollImg({
                                    obox: "#slide_4", boxId: "#drawingsUl_1", scrollTag: "li", auto: false, iSpeed: 3000, nextBtnId: "#drawings_right1", prevBtnId: "#drawings_left1", margin: 17, scrollsl: 3});
								 $("#slide_5").scrollImg({ obox: "#slide_5", boxId: "#projectManagerUl", scrollTag: "li", auto: false, iSpeed: 3000, nextBtnId: "#projectManager_right", prevBtnId: "#projectManager_left", margin: 20, scrollsl: 4 });
								  $("#shili").scrollImg({
                                    obox: "#shili", boxId: "#shiliUl", scrollTag: "li", auto: false, iSpeed: 3000, nextBtnId: "#shili_right", prevBtnId: "#shili_left", margin: 5, scrollsl: 4});
                                                                                                                           
                                                                                                                            $("#slide_23").scrollImg({ obox: "#slide_23", boxId: "#simpleprojectUl", scrollTag: "li", auto: false, iSpeed: 3000, nextBtnId: "#simpleproject_right", prevBtnId: "#simpleproject_left", margin: 15, scrollsl: 3 });
                                                                                                                            show_opacity3();
								
	scroll_2();
	   trig_hq2($("#website"));
	  // scrollclass($("#website_detail .website_detail_project"));
	 countWidth($(".main-case"));
	 scrollclass($(".add_img1"));
	 
	 show_opacity();
	 show_opacity2();
	 show_opacity3();
	$(window).scroll(function () {
		 trig_slowdown($("#designerUl"), ".show-opacity");
         
		 trig_hq11($("#maincaseUl"));
		  trig_hq9($("#projectManagerUl"), "20px");
		if ($("#wzlist").offset().top < ($(window).scrollTop() + 300)) {
			  //  alert(432);
				$("#wzlist").find("li").each(function (index, item) {
					$(item).delay(100 * index).animate({ opacity: 1 }, 200, function () { $(this).addClass('rotate') });//.addClass('rotate');//
				});
			}
			 trig_hq9($("#shiliUl"), "5px");
			  trig_hq11($("#subcompanyUl"));
		 trig_hq8($("#certificateUl"));
		trig_hq10($("#drawingsUl"));
		trig_hq8($("#certificateUl_1"));
		trig_hq10($("#drawingsUl_1"));
	    trig_hq2($("#website"));
	    trig_hq4($("#trigger_09"));
	    trig_globe3($("#trigger_1"));
		trig_hq20($("#xcandiv"));
		trig_hq20($("#fwzldiv"));
		trig_hq20($("#ryjgdiv"));
		trig_hq20($("#gchjdiv"));
		 trig_hq7($("#simpleprojectUl"));
		trig_hq7($("#projectUl"));
		
		  trig_selfQualificatio1($("#trigger_09"));
	  trig_stdNumber1($("#nationalities1"));
	   trig_header3($("#tips6"));
	   trig_header3($("#tips5"));
	   	    trig_stdNumber2($("#nationalities3"));
			 trig_header3($("#tips8"));
			    trig_stdNumber3($("#tips9"));
					    trig_stdNumber3($("#tips10"));
	    trig_header3($("#tips11"));
		 trig_header3($("#tips12"));   
		 trig_circles($("#trigger_02"));
		 trig_stdNumber2($("#nationalities5"));	    trig_header3($("#tips14"));	    trig_globe2($("#zg_sc_images")); trig_header3($("#tips15"));  trig_header3($("#tips16")); trig_stdNumber2($("#nationalities7"));
		    trig_stdNumber4($("#nationalities10"));  trig_slowdown($("#sld1"), ".material");trig_selfQualificatio($("#big-suitcase3"));     trig_header31($("#tips1")); trig_hq15($("#showtext01"));trig_stages2($("#stage01"));	   trig_header3($("#tips17"));     trig_header3($("#tips18"));	    trig_header3($("#tips19"));   trig_footer2($("#tips21"));	    trig_header3($("#tips22"));    trig_header3($("#tips20")); trig_stages2($("#stage02"));  trig_stdNumber1($("#nationalities13"));  trig_header3($("#star01"));
	    trig_header3($("#star02"));
	    trig_header3($("#star03"));
	    trig_header3($("#star04"));	       trig_header4($("#out_material"));	 

	    
	    trig_hq19($("#detect_img")); 
		trig_hq19($("#detection_container"));
	    trig_hq19($("#detection_container1"));
	    trig_hq19($("#detection_container2"));
	   
	    trig_header3($("#tips28"));
	    trig_header3($("#tips29"));
	
	/*     trig_globe3($("#trigger_1"));

	 

	   */
	   

	 

	   
	   
    
	
	 
	


	
	    trig_header3($("#tips23"));
	    trig_header3($("#tips24"));
	    trig_header3($("#tips25"));
	    trig_header3($("#tips26"));

	    trig_header3($("#tips30"));  
		/*
	  
	


	  


	   
	    
	    trig_hq12($("#imgs_web01"));
	    */	 
		   
		


	/*  

	    trig_footer2($("#tips27"));*/
	

	    trig_logos($("#logos"));
	    //trig_globe4($("#geographical-activities2"));

	    trig_stdfooter2($("#ruixiang"));
	    trig_hq11($("#footUl"));
	    //trig_changeTop("#nationalities4");

	    changeTop($(".top_c"),30,304);
	    changeTop($(".top_c1"), 30, 274);
	    changeTop($(".top_c2"), 30, 304);
	    changeTop($(".top_c3"), 50, 274);
	    changeTop($(".top_c4"), 30, 304);
			    trig_position($("#intro"), $(".item1"));
	    trig_position($("#nationalities1"), $(".item2"));
	    trig_position($("#nationalities"), $(".item3"));
	    trig_position($("#nationalities4"), $(".item4"));
	    trig_position($("#nationalities3"), $(".item5"));
	    trig_position($("#nationalities7"), $(".item6"));
	    trig_position($("#nationalities5"), $(".item7"));
	    trig_position($("#nationalities9"), $(".item8"));
	    trig_position($("#nationalities11"), $(".item9"));
	    trig_position($("#nationalities14"), $(".item10"));
	});
	 trig_hq9($("#projectManagerUl"), "20px");
	 trig_slowdown($("#designerUl"), ".show-opacity");
     trig_hq11($("#maincaseUl"));
	 trig_hq9($("#shiliUl"), "5px");
	  trig_hq11($("#subcompanyUl"));
	trig_hq8($("#certificateUl"));
	trig_hq10($("#drawingsUl"));
	trig_hq8($("#certificateUl_1"));
	trig_hq10($("#drawingsUl_1"));
	trig_hq4($("#trigger_09"));
	trig_globe3($("#trigger_1"));
	trig_hq20($("#xcandiv"));
	trig_hq20($("#fwzldiv"));
	trig_hq20($("#ryjgdiv"));
	trig_hq20($("#gchjdiv"));
	 trig_hq7($("#simpleprojectUl"));
	trig_hq7($("#projectUl"));
	
	  trig_selfQualificatio1($("#trigger_09"));
	    trig_stdNumber1($("#nationalities1"));
		    trig_header3($("#tips6"));
					trig_header3($("#tips5"));
			 trig_stdNumber2($("#nationalities3"));
			     trig_header3($("#tips8"));
				     trig_stdNumber3($("#tips9"));
					     trig_stdNumber3($("#tips10"));
	    trig_header3($("#tips11"));
		 trig_header3($("#tips12"));  
		 trig_circles($("#trigger_02"));  
		 trig_stdNumber2($("#nationalities5"));   
		 trig_header3($("#tips14"));	    
		 trig_globe2($("#zg_sc_images"));    
		 trig_header3($("#tips15")); 
		 trig_header3($("#tips16"));  
		 trig_stdNumber2($("#nationalities7"));
		 trig_stdNumber4($("#nationalities10"));  
		 trig_slowdown($("#sld1"), ".material");
		 trig_selfQualificatio($("#big-suitcase3"));  
		 trig_header31($("#tips1"));
		 trig_hq15($("#showtext01"));  
		 trig_stages2($("#stage01"));   
		 trig_header3($("#tips17"));  
		 trig_header3($("#tips18"));     
		 trig_header3($("#tips19"));	 	   
		 trig_footer2($("#tips21"));	    
		 trig_header3($("#tips22"));   
		 trig_header3($("#tips20"));
		  trig_stages2($("#stage02"));
		
	  trig_stdNumber1($("#nationalities13")); 
	    trig_header3($("#star01"));
	    trig_header3($("#star02"));
	    trig_header3($("#star03"));
	    trig_header3($("#star04")); 	
		trig_header4($("#out_material"));

	   
	  
	   trig_hq19($("#detect_img")); 
	    
	   trig_hq19($("#detection_container"));
	    trig_hq19($("#detection_container1"));
	    trig_hq19($("#detection_container2"));
	    trig_header3($("#tips28"));
	    trig_header3($("#tips29"));	  
		
	 /*     trig_globe3($("#trigger_1"));

	  

	
	
	 
	
		*/
	   
	
	 
	  
	


	  
	


	    trig_header3($("#tips23"));
	    trig_header3($("#tips24"));
	    trig_header3($("#tips25"));
	    trig_header3($("#tips26"));

	    trig_header3($("#tips30"));
		/*
	  
	   

	
	    


	   
	   
	    trig_hq12($("#imgs_web01"));
	    */
	     
	   /* 

	    trig_footer2($("#tips27"));*/
	  

	    trig_logos($("#logos"));
	    //trig_globe4($("#geographical-activities2"));

	    trig_stdfooter2($("#ruixiang"));
	    trig_hq11($("#footUl"));
	    //trig_changeTop("#nationalities4");

	    changeTop($(".top_c"),30,304);
	    changeTop($(".top_c1"), 30, 274);
	    changeTop($(".top_c2"), 30, 304);
	    changeTop($(".top_c3"), 50, 274);
	    changeTop($(".top_c4"), 30, 304);
			    trig_position($("#intro"), $(".item1"));
	    trig_position($("#nationalities1"), $(".item2"));
	    trig_position($("#nationalities"), $(".item3"));
	    trig_position($("#nationalities4"), $(".item4"));
	    trig_position($("#nationalities3"), $(".item5"));
	    trig_position($("#nationalities7"), $(".item6"));
	    trig_position($("#nationalities5"), $(".item7"));
	    trig_position($("#nationalities9"), $(".item8"));
	    trig_position($("#nationalities11"), $(".item9"));
	    trig_position($("#nationalities14"), $(".item10"));
   
	
})