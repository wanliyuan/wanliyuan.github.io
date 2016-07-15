
function countWidth(obj) {
   var Lwidth = (obj.width()-30)/ parseInt(obj.find("li").length);
   obj.find("li").css("width", Lwidth);
}

function toshowbtn(id, maxlength,btnClass) {
    var oShowContent = $("#" + id);
    //  alert(oShowContent.html());
    var olength = oShowContent.find("li").length;

    oShowContent.hover(function () {
        if (olength > maxlength) {
            $(this).find(btnClass).show();
        }
    }, function () {
        $(this).find(btnClass).hide();
    })
};

function changeTop(obj, value,max) {
    var offsetTop = obj.offset().top + value;
    var scrollTop = $(window).scrollTop();
    console.log(offsetTop);
    console.log(scrollTop);
    var result = scrollTop - offsetTop ;
    if ((offsetTop < scrollTop) && (result < max)) {
        obj.find(".bg-image").stop(true,true).animate({ "top": result }, 300);
    }
    if (offsetTop +550 < scrollTop) {
        obj.find(".bg-image").stop(true,true).animate({ "top": "0px" }, 300);
    }
}


function scrollclass(objs) {
        var scrollMargin = 4;
        objs.each(function (i) {

            var oscrollTag = objs.eq(i).find('li');
            
            var oscrollBox = objs.eq(i).find('.imglist').eq(0);
            var oscWidth = oscrollTag.eq(0).width() + scrollMargin;
            var oscLength = oscrollTag.length;
            var ascWidth = oscWidth * oscLength;
            var oScleftbtn = objs.eq(i).find('.aleft_7');
            var oScrightbtn = objs.eq(i).find('.aright_7');
            var sciNum = 0;
            var scscrollges = 5;
            oscrollBox.css("width", ascWidth + 'px');
			if(oscLength>5){
				oScleftbtn.show();	
				oScrightbtn.show();	
			}
            oScleftbtn.click(function () {
                if (!oscrollBox.is(":animated")) {

                    if (sciNum == 0) {

                    }
                    else {
                        sciNum -= scscrollges;
                        oscrollBox.animate({ "marginLeft": -oscWidth * sciNum + 'px' }, 500);
                    }
                };
            })
            oScrightbtn.click(function () {
                tonext2();
            });

            function tonext2() {

                if (!oscrollBox.is(":animated")) {
                    sciNum += scscrollges;
                    if (sciNum >= oscLength) {
                        oscrollBox.animate({ "marginLeft": 0 + 'px' }, 500);
                        sciNum = 0;
                    }
                    else {

                       // oscrollBox.animate({ "marginLeft": -oscWidth * sciNum + 'px' }, 500);
					   if(oscLength-sciNum<scscrollges){
							oscrollBox.animate({"marginLeft":-oscWidth*(oscLength-scscrollges)+'px'},500);	
   						}
						else{
						oscrollBox.animate({"marginLeft":-oscWidth*sciNum+'px'},500);	
						
						}
                    }
                };
            };
        });
    }
	



    function scroll_2() {
        var ali_shiza = $("#designerUl li");
        var li_length = ali_shiza.length;
        var oUl_width = ali_shiza.width() * ali_shiza.length;
        var iNum = 0;
        var ali_shiza2 = $("#maincaseUl li");
        $("#designerUl").width(oUl_width);
        var slideWidth = ali_shiza.width();
        var scrollwidth = 0;
        var thesumNum = ali_shiza2.length - 1;
     
        $("#designer_right").click(function () {

            if (iNum < thesumNum) {
                iNum++;
                scrollwidth = ali_shiza.width() * iNum;
                $("#designerUl").css("marginLeft", -scrollwidth);
                ali_shiza2.removeClass('main-case_current');
                ali_shiza2.eq(iNum).addClass('main-case_current');
            }
            else {
                return false;
            }
        });
        $("#designer_left").click(function () {
            if (iNum > 0) {
                iNum--;
                scrollwidth = ali_shiza.width() * iNum;
                $("#designerUl").css("marginLeft", -scrollwidth);
                ali_shiza2.removeClass('main-case_current');
                ali_shiza2.eq(iNum).addClass('main-case_current');
            }
            else {
                return false;
            }
        });
        ali_shiza2.click(function () {
            ali_shiza2.removeClass('main-case_current');
            $(this).addClass('main-case_current');
            iNum = $(this).index();
            $("#designerUl").css("marginLeft", -ali_shiza.width() * iNum);

        });
    }

    function show_opacity() {
        $(".case-opacity").mouseover(function () {
            $(this).find(".opacitybg").show();
            $(this).find(".case_name").show();
        });
        $(".case-opacity").mouseout(function () {
            $('.case_img').find(".opacitybg").hide();
            $('.case_img').find(".case_name").hide();
        });
    }

    function show_opacity2(){
        $(".show-opacity").hover(function () {
            $(this).find("div.opacitybg").show();
            $(this).find("div.topname").show();
            $(this).find(".material_infor").hide();
        },
        function () {
            $("#designerUl").find("div.opacitybg").hide();
            $("#designerUl").find("div.topname").hide();
            $(this).find(".material_infor").show();
        })
    }
    function show_opacity3() {
        $("#simpleprojectUl li").each(function (index) {
            $(this).hover(function(){
                $(this).find("div.opacitybg").show();
                $(this).find("div.proname").show();
            },
             function (){
                 $("#simpleprojectUl li").find("div.opacitybg").hide();
                 $("#simpleprojectUl li").find("div.proname").hide();
             })
        })
    }

    function show_content2() {
        $(".material").hover(function () {
            $(this).find(".material_infor").addClass("mater-opacity").show();
        },
        function () {
            $("#nationalities12").find(".material_infor").hide();
            $(this).find(".material_infor").removeClass("mater-opacity").hide();
        })
    }