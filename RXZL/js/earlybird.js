	
var isMobile = false;

if ((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera))
   isMobile = true;   
   
function initClocks() {
   setInterval( function() {
      var seconds = new Date().getUTCSeconds();
      var sdegree = seconds * 6;
      var srotate = "rotate(" + sdegree + "deg)";
      
      $(".sec").css({ "transform": srotate });
             
   }, 1000 );
         
   setInterval( function() {
      
      $("ul.clock").each(function () {
         $t = $(this);
         
         var hours = new Date().getUTCHours();
         var mins = new Date().getUTCMinutes();
         hours = hours + parseInt($t.data("difference"));
         var hdegree = hours * 30 + (mins / 2);
         var hrotate = "rotate(" + hdegree + "deg)";
         
         $t.find(".hour").css({ "transform": hrotate});
      });
          
   }, 1000 );

   setInterval( function() {
      var mins = new Date().getUTCMinutes();
      var mdegree = mins * 6;
      var mrotate = "rotate(" + mdegree + "deg)";
      
      $(".min").css({ "transform" : mrotate });
          
   }, 1000 );      
}

var arr = [];

   var zeros = 11;
   var pos = zeros - 10;
var scaler = 5;
   
function billionCounter() {
   for(i = 0; i < zeros; i++)
      arr[i] = 0;
   
   billionTick();
}

function billionTick() {

   for(i = pos; i < zeros; i++) {
   
      arr[i] += (i - pos + 1) / scaler;

      if (arr[i] >= 10) {

         if (i == pos) {
            pos--;
            arr[pos]++;
            scaler -= 0.5;
            if (scaler <= 1) scaler = 1;
         }
      
         arr[i] -= 10;
      }
   }
      
   drawBillion();
      
   if (pos != 0)
      setTimeout(billionTick, 5);
      
   else {
       $n = $("#counter").empty().html("<strong style='font-weight:normal;'><span class='rmb' style=' padding-left:27px;'><img src='img/rmb.png' /></span><span class='xm2'>" + 600 + "</span><span class='xm1' style='font-size:40px; margin-top:75px; font-family:幼圆; '>万</span></strong>");
   }

   

}

function drawBillion() {

   str = "";
   for(i = 0; i < zeros; i++) 
      str += Math.floor(arr[i]);
   
   $n = $("#counter").html(str);
}
  
function doNothing() {}   
   
function trig_selfQualificatio($self) {
    if ($self.offset().top < ($(window).scrollTop() + 900)) {
        $("#big-suitcase3").delay(600).animate({ opacity: '1' }, 200, function () {
            $("#big-suitcase3 img").delay(200).animate({ opacity: '1', height: '70%' }, 300);
            $("#big-suitcase3 span").delay(200).animate({ opacity: '1' }, 300);
        });
    }

}
function trig_selfQualificatio1($self) {
    if ($self.offset().top < ($(window).scrollTop() + 900)) {
        $("#big-suitcase2").delay(900).animate({ opacity: '1' }, 200, function () {
            $("#big-suitcase2 img").delay(200).animate({ opacity: '1', height: '70%' }, 300);
            $("#big-suitcase3 span").delay(200).animate({ opacity: '1' }, 300);
        });
    }
}

function trig_hq4($self) {

    if ($self.offset().top < ($(window).scrollTop() + 600)) {
            $("#trigger_09").animate({ opacity: '1' }, 200, function () {

                $("#big-suitcase2").delay(200).animate({ opacity: '1' }, 200, function () {
                    $("#big-suitcase2 img").delay(200).animate({ height: '70%' }, 300);
                });
       
            });
    }

}
function trig_slowdown($self, parameter) {
    if ($self.offset().top < ($(window).scrollTop() + 600)) {
        $self.find(parameter).each(function (i) {
            $(this).delay(i * 200).animate({
                opacity: 1,
                top: 0,

            }, 500)
        })
    }
}



function trig_header($self, completeFunc) {

    if (typeof completeFunc === "undefined")
      completeFunc = doNothing;
   $self.find(".icon").animate({ opacity: 1, marginRight: 0 }, 100, function() {
      
       $(this).parent().find(".line").animate({ opacity: 1, height: 45 }, 100, function () {
         $(this).parent().find("h2").animate({ opacity: 1, paddingLeft: 10 }, 100, completeFunc);
      });
   });
}
function trig_header3($self, completeFunc) {
    if ($self.offset().top < ($(window).scrollTop() + 600)) {
        if (typeof completeFunc === "undefined")
            completeFunc = doNothing;
        $self.find(".icon").animate({ opacity: 1, marginRight: 0 }, 100, function () {

            $(this).parent().find(".line").animate({ opacity: 1, height: 45 }, 100, function () {
                $(this).parent().find("h2").animate({ opacity: 1, paddingLeft: 10 }, 100);
            });
        });
    }
}

function trig_position($self,obj) {
    if ($self.offset().top < ($(window).scrollTop() + 300)) {

        obj.siblings().removeClass("item-active");
    //.find("a").css("opacity", 0);
        obj.addClass("item-active");
    }
}

function trig_header31($self, completeFunc) {
    if ($self.offset().top < ($(window).scrollTop() + 600)) {
        if (typeof completeFunc === "undefined")
            completeFunc = doNothing;
        $self.find(".icon").animate({ opacity: 1, marginRight: 0 }, 100, function () {

            $(this).parent().find(".line").animate({ opacity: 1, height: 45 }, 100, function () {
                $(this).parent().find("h2").animate({ opacity: 1, paddingLeft: 10 }, 100, function () {
                    $(this).parent().parent().find(".fix-txt").animate({ opacity: 1, paddingLeft: 0 });
                });
            });
        });
    }
}

function trig_header003($self, completeFunc) {
    if ($self.offset().top < ($(window).scrollTop() + 700)) {
        if (typeof completeFunc === "undefined")
            completeFunc = doNothing;
        $self.find(".icon").animate({ opacity: 1, marginRight: 0 }, 100, function () {

            $(this).parent().find(".line").animate({ opacity: 1, height: 45 }, 100, function () {
                $(this).parent().find("h2").animate({ opacity: 1, paddingLeft: 10 }, 100, completeFunc);
            });
        });
    }
}

function trig_header13($self, completeFunc) {
    if ($self.offset().top < ($(window).scrollTop() + 400)) {
        if (typeof completeFunc === "undefined")
            completeFunc = doNothing;
        $self.find(".icon").animate({ opacity: 1, marginRight: 0 }, 100, function () {

            $(this).parent().find(".line").animate({ opacity: 1, height: 45 }, 100, function () {
                $(this).parent().find("h2").animate({ opacity: 1, paddingLeft: 10 }, 100, completeFunc);
            });
        });
    }
}
function trig_header7($self) {
    if ($self.offset().top < ($(window).scrollTop() + 300)) {

        $self.find(".icon").animate({ opacity: 1, marginRight: 0 }, 100, function () {

            $(this).parent().find(".line").animate({ opacity: 1, height: 45 }, 100, function () {
                $(this).parent().find("h2").animate({ opacity: 1, paddingLeft: 10 }, 100);
            });
        });
    }
}
function trig_header4($self, completeFunc) {
    if ($self.offset().top < ($(window).scrollTop() + 600)) {
        if (typeof completeFunc === "undefined")
            completeFunc = doNothing;
        $self.find(".icon").animate({ opacity: 1, marginRight: 0 }, 100, function () {

            $(this).parent().find(".line").animate({ opacity: 1, height: 45 }, 100, function () {
                $(this).parent().find("h2").animate({ opacity: 1, paddingLeft: 10 }, 100, completeFunc);
                $(this).parent().find("a").animate({ opacity: 1, paddingLeft: 10 }, 100, completeFunc);
            });
        });
    }
}


function trig_header2($self, completeFunc) {
    if ($self.offset().top < ($(window).scrollTop() + 300)) {
        if (typeof completeFunc === "undefined")
            completeFunc = doNothing;
        $self.find(".icon").animate({ opacity: 1, marginRight: 0 }, 100, function () {

            $(this).parent().find(".line").animate({ opacity: 1, height: 45 }, 100, function () {
                $(this).parent().find("h2").animate({ opacity: 1, paddingLeft: 10 }, 100, completeFunc);
            });
        });
    }
}


function trig_footer($self, completeFunc) {
  
        if (typeof completeFunc === "undefined")
            completeFunc = doNothing;
        $self.find("h2").animate({ opacity: 1 }, 100, function () {
            $(this).parent().find(".color_1").animate({ opacity: 1 }, 100, function () {
                $(this).parent().find(".color_2").animate({ opacity: 1 }, 100, completeFunc);
            });
        });
  
}
function trig_footer2($self) {
    if ($self.offset().top < ($(window).scrollTop() + 500)) {
        $self.find("h2").animate({ opacity: 1 }, 100, function () {
            $(this).parent().find(".color_1").animate({ opacity: 1 }, 100, function () {
                $(this).parent().find(".color_2").animate({ opacity: 1 }, 100);
            });
        });
    }
}




function trig_stdNumber($self, completeFunc) {
    if (typeof completeFunc === "undefined")
      completeFunc = doNothing;

   trig_header($self, function() {
      $(this).parent().find("p").animate({ opacity: 1, paddingLeft: 0 }, 300, completeFunc);
   });
}

function trig_stdNumber3($self, completeFunc) {
    
    if ($self.offset().top < ($(window).scrollTop() + 600)) {
        if (typeof completeFunc === "undefined")
            completeFunc = doNothing;
        $self.find(".icon").animate({ opacity: 1, marginRight: 0 }, 100, function () {

            $(this).parent().find(".line").animate({ opacity: 1, height: 45 }, 100, function () {
                $(this).parent().find("h2").animate({ opacity: 1, paddingLeft: 10 }, 100, function() {
                    $(this).parent().find("p").animate({ opacity: 1, paddingLeft: 0 }, 300, completeFunc);
                });
            });
        });
    }
}


function trig_stdSuitcase($self) {

    $self.find(".suitcase2").each(function (i) {
        $(this).delay(i * 300).animate({ opacity: 1, paddingLeft: 0 }, 300);
        $("#small-suitcase1").animate({ opacity: '1' }, 200, function () {
            $("#big-suitcase1").delay(200).animate({ opacity: '1' }, 200, function () {
                $("#big-suitcase1 img").delay(200).animate({ height: '250px' }, 300);
            });
        });
    })
}

function trig_stdNumber1($self) {
    
    if ($self.offset().top < ($(window).scrollTop() + 300)) {
        $self.find("p").each(function (i) {
            $(this).animate({ opacity: 1, paddingLeft: 0 }, 300);
        })
    } 
}


function trig_stdNumber2($self) {

    if ($self.offset().top < ($(window).scrollTop() + 300)) {

        $self.find("h2").animate({ opacity: 1, paddingLeft: 0 }, 300);

        $self.find("p").each(function (i) {
            $(this).animate({ opacity: 1, paddingLeft: 0 }, 300);
        })
    
    }
}

function trig_stdfooter2($self) {

    if ($self.offset().top < ($(window).scrollTop() + 300)) {

        $self.find("h3").animate({ opacity: 1, paddingLeft: 0 }, 300);

        $self.find("p").each(function (i) {
            $(this).animate({ opacity: 1, paddingLeft: 0 }, 300);
        })

        $self.find("img").animate({ opacity: 1, paddingLeft: 0 }, 300);

    }
}

function trig_stdNumber4($self) {

    if ($self.offset().top < ($(window).scrollTop() + 300)) {

        $self.find("h2").animate({ opacity: 1, paddingLeft: 0 }, 300);

        $self.find("h3").each(function (i) {
            $(this).animate({ opacity: 1, paddingLeft: 0 }, 300);
        })

    }
}


function trig_billionCount($self) {

   trig_stdNumber($self, billionCounter);
}

function trig_globe_percent(id, initDelay) {

   var $t = $(id);
    

   if ($t.find(".percent .number").html() == "") {
       var upto = 20;
   }
   else {
       
       var upto = parseInt($t.find(".percent .number").html());
  }
         
   $t.find("h3").delay(initDelay).animate({ opacity: 1 }, 150, function() {
      $t.find(".percent").animate(
         { opacity: 1, countNum: upto}, 
         {  duration: 500, 
            step: function() {
               $t.find('.percent .number').text(Math.round(this.countNum));
            },
            complete: function () {
         
               $t.find("img").delay(100).animate({ opacity: 1 }, 100, function() {
                  $t.find(".alt").delay(100).animate({ left: 0, opacity: 1 }, 200);
               });
            }
         }
      );
   });
}
function trig_globe_percent1(id, initDelay) {

    var $t = $(id);


    if ($t.find(".percent .number").html() == "") {
        var upto = 20;
    }
    else {

        var upto = parseInt($t.find(".percent .number").html());
    }
    $t.delay(initDelay).animate({ opacity: 1 }, 150);
    $t.find("h3").delay(initDelay).animate({ opacity: 1 }, 150, function () {
        $t.find(".percent").animate(
           { opacity: 1, countNum: upto },
           {
               duration: 500,
               step: function () {
                   $t.find('.percent .number').text(Math.round(this.countNum));
               },
               complete: function () {

                   //$t.find("img").delay(100).animate({ opacity: 1 }, 100, function () {
                   //    $t.find(".alt").delay(100).animate({ left: 0, opacity: 1 }, 200);
                   //});
               }
           }
        );
    });
}

function trig_globe($self) {

   trig_header($self, function() {
   
      $self.find("#img-globe").animate({ opacity: 1 }, 1200);
      $self.find("#img-globe-line").delay(200).animate({ opacity: 1, transform: "rotate(720deg)" }, 1200);
      
      $self.find("#img-globe-orange").delay(1600).animate({ opacity: 1 }, 400);
      trig_globe_percent("#percent-bg", 1150);
      
      $self.find("#img-globe-dark-blue").delay(2450).animate({ opacity: 1 }, 400);
      trig_globe_percent("#percent-sy", 2000);
      
      $self.find("#img-globe-light-blue").delay(3150).animate({ opacity: 1 }, 400);
      trig_globe_percent("#percent-cy", 2700);

      $self.find("#img-globe-light-blue").delay(3850).animate({ opacity: 1 }, 400);


      trig_globe_percent("#percent-jd", 3000);


   });
}

function trig_globe4($self) {

        $self.find("#img-globe").animate({ opacity: 1 }, 1200);
        $self.find("#img-globe-line").delay(600).animate({ opacity: 1, transform: "rotate(720deg)" }, 1200);
        $self.find("#img-globe-orange").delay(2100).animate({ opacity: 1 }, 400);
        trig_globe_percent("#percent-bg", 1150);
       $self.find("#img-globe-dark-blue").delay(2750).animate({ opacity: 1 }, 400);
        trig_globe_percent("#percent-sy", 2000);
        $self.find("#img-globe-light-blue").delay(3750).animate({ opacity: 1 }, 400);
        trig_globe_percent("#percent-cy", 2700);

        trig_globe_percent("#percent-jd", 3000);
        $self.find("#img-globe-deep-blue11").delay(4350).animate({ opacity: 1 }, 400);

}

var globed = true;
function trig_globe3($self) {
    if( globed == true){
        if ($self.offset().top < ($(window).scrollTop() + 500)) {

            $self.find("#graphic-primary-1").animate({ opacity: 1 }, 1200);
            $self.find("#graphic-primary-2").delay(600).animate({ opacity: 1, transform: "rotate(720deg)" }, 1200);
     

            trig_globe_percent1("#Span1", 1500);
       
       
            $self.find("#graphic-primary-3").delay(1950).animate({ opacity: 1 }, 400);
            trig_globe_percent1("#Span2", 2300);

            $self.find("#graphic-primary-4").delay(2950).animate({ opacity: 1 }, 400);
            trig_globe_percent1("#Span3", 3900);

            $self.find("#graphic-primary-5").delay(3250).animate({ opacity: 1 }, 400);
            trig_globe_percent1("#Span4", 3800);
            globed = false;
        }
    }

}






var globed2 = true;
function trig_globe2($self) {
    if (globed2 == true) {
        if ($self.offset().top < ($(window).scrollTop() + 400)) {
            $self.find("#zg_solidqiu").animate({ opacity: 1 }, 1200);
            if (!$.support.leadingWhitespace) {
                $self.find("#zg_scimg1").delay(400).animate({ opacity: 1 }, 1200);
            }
            else {
            $self.find("#zg_scimg1").delay(400).animate({ opacity: 1, transform: "rotate(720deg)" }, 1200);
            }

            $self.find("#zg_scimgico").delay(1600).animate({ opacity: 1 }, 1200);
            $self.find("#zg_scimg2").delay(2000).animate({ opacity: 1 }, 1200);
            $self.find("#zg_scimg3").delay(2400).animate({ opacity: 1 }, 1200);
            $self.find("#zg_scimg4").delay(2800).animate({ opacity: 1 }, 1200);
            $self.find("#zg_scimg5").delay(3200).animate({ opacity: 1 }, 1200);
            $self.find("#zg_scimg6").delay(3600).animate({ opacity: 1 }, 1200);
            $self.find("#zg_scimg7").delay(4000).animate({ opacity: 1 }, 1200);
            $self.find("#scimg1sm").delay(4400).animate({ opacity: 1 }, 1200);
            $self.find("#scimg2sm").delay(4800).animate({ opacity: 1 }, 1200);
            $self.find("#scimg3sm").delay(5200).animate({ opacity: 1 }, 1200);
            $self.find("#scimg4sm").delay(5600).animate({ opacity: 1 }, 1200);
            $self.find("#scimg5sm").delay(6000).animate({ opacity: 1 }, 1200);
            $self.find("#scimg6sm").delay(6400).animate({ opacity: 1 }, 1200);
            $self.find("#scimg7sm").delay(6800).animate({ opacity: 1 }, 1200);
            $self.find("#scimg1sm").find("span").delay(4400).animate({ opacity: 1 }, 1200);
            $self.find("#scimg2sm").find("span").delay(4800).animate({ opacity: 1 }, 1200);
            $self.find("#scimg3sm").find("span").delay(5200).animate({ opacity: 1 }, 1200);
            $self.find("#scimg4sm").find("span").delay(5600).animate({ opacity: 1 }, 1200);
            $self.find("#scimg5sm").find("span").delay(6000).animate({ opacity: 1 }, 1200);
            $self.find("#scimg6sm").find("span").delay(6400).animate({ opacity: 1 }, 1200);
            $self.find("#scimg7sm").find("span").delay(6800).animate({ opacity: 1 }, 1200);

            globed2 = false;
        }
    }
} 

function trig_hq($self) {

   trig_header($self, function() {
      $self.find("li").each(function (index, item) {
         $(item).delay(100*index).animate({ opacity: 1 }, 200, function(){$(this).addClass('rotate')});//.addClass('rotate');//
      });
   });
}
function trig_hq2($self) {
 
    if ($self.offset().top < ($(window).scrollTop() + 600)) {
  
        $self.find(".parentli").each(function (index, item) {
            $(item).delay(100 * index).animate({ opacity: 1 }, 200, function () { $(this).addClass('rotate') });//.addClass('rotate');//
          
        });
    }
    
}
function trig_hq7($self) {

    if ($self.offset().top < ($(window).scrollTop() + 600)) {

        $self.find("li").each(function (index, item) {
            $(item).delay(150 * index).animate({ opacity: 1 }, 200, function () { $(this).addClass('rotate') });//.addClass('rotate');//

        });
    }

}
function trig_hq11($self) {

    if ($self.offset().top < ($(window).scrollTop() + 600)) {

        $self.find("li").each(function (index, item) {
            $(item).delay(150 * index).animate({ opacity: 1 }, 200, function () { $(this).addClass('rotate') });//.addClass('rotate');//

        });
    }

}

function trig_hq8($self) {

    if ($self.offset().top < ($(window).scrollTop() + 500)) {

        $self.find("li").each(function (index, item) {
            $(item).delay(150 * index).animate({ opacity: 1,marginRight:"17px" },300);

        });
    }

}
function trig_hq10($self) {

    if ($self.offset().top < ($(window).scrollTop() + 500)) {

        $self.find("li").each(function (index, item) {
            $(item).delay(150 * index).animate({ opacity: 1, marginRight: "17px" }, 300);

        });
    }

}
function trig_hq9($self,x1) {

    if ($self.offset().top < ($(window).scrollTop() + 500)) {

        $self.find("li").each(function (index, item) {
            $(item).delay(300 * index).animate({ opacity: 1, marginRight: x1 }, 500);

        });
    }

}
function trig_hq19($self) {

    if ($self.offset().top < ($(window).scrollTop() + 600)) {

        $self.find("img").each(function (index, item) {
            $(item).delay(500 * index).animate({ opacity: 1,marginLeft:"0px"}, 300);

        });
    }

}
function trig_hq20($self) {

    if ($self.offset().top < ($(window).scrollTop() + 600)) {

        $self.find("img").each(function (index, item) {
            $(item).delay(100 * index).animate({ opacity: 1,marginLeft:"0px"}, 300);

        });
    }

}
function trig_hq3($self) {

    if ($self.offset().top < ($(window).scrollTop() + 300)) {
        
        $self.find("img").each(function (index, item) {
            $(item).delay(100 * index).animate({ opacity: 1 }, 200, function () { $(this).addClass('rotate') });//.addClass('rotate');//

        });
    }

}
function trig_hq17($self) {

    if ($self.offset().top < ($(window).scrollTop()+700)) {

        $self.find("img").each(function (index, item) {
            $(item).delay(100 * index).animate({ opacity: 1 }, 200, function () { $(this).addClass('rotate') });//.addClass('rotate');//
            img-globe
        });
    }

}
function trig_hq12($self) {

    if ($self.offset().top < ($(window).scrollTop()+200 )) {

        $self.find("img").each(function (index, item) {
            $(item).delay(100 * index).animate({ opacity: 1 }, 200, function () { $(this).addClass('rotate') });//.addClass('rotate');//

        });
        $self.find("p").delay(400).animate({ opacity: 1 }, 200);
    }

}
function trig_hq15($self) {

    if ($self.offset().top < ($(window).scrollTop() +500 )) {

        $self.find(".show_div03").each(function (index, item) {
           $(item).delay(800 * index).animate({ opacity: 1, marginLeft: "0px" },200);

        });
    }

}

//var circ_count = 0;
function trig_new_circle($self, $last_child, classes, circ_count) {

   if (circ_count >= classes.length) {
      $self.find("#num").delay(1000).animate({ opacity: 1 }, 100);
      return;
   }
   
   $last_child = $("<div class='circ "+classes[circ_count]+"'></div>").appendTo($last_child);
   
   setTimeout(function() {$last_child.addClass('active')}, 10); 
   
   circ_count++;
   
  // setTimeout(trig_new_circle, 100);
   setTimeout(function() { trig_new_circle($self, $last_child, classes, circ_count) }, 100);
}

var finished = true;
function trig_circles($self) {

    if (finished) {
        if ($self.offset().top < ($(window).scrollTop() + 400)) {
            if ($self.attr('id') == 'trigger_02')
                classes = ["blue", "white", "white", "orange", "white", "white", "white", "lorange", "white", "white", "white", "blue", "white"];

            else
                classes = ["white", "dkblue", "dkblue", "orange", "dkblue", "dkblue", "dkblue", "blue", "dkblue", "dkblue", "dkblue", "white", "dkblue"];

            trig_new_circle($self, $self.find(".circles"), classes, 0);
            finished = false;
        }
     
    }
 
}

function trig_suitcases($self) {
   trig_stdNumber($self, function() {
      $self.find("#small-suitcase").animate({ opacity: '1' }, 200, function () {
         $self.find("#big-suitcase").delay(200).animate({ opacity: '1' }, 200, function () {
            $self.find("#big-suitcase img").delay(200).animate({ height: '90%' }, 300);
         });
      });
   });
}
   
function trig_stages($self) {
   
   trig_header($self, function() {
      
      $self.find("#stages-graph img").each(function (index, item) {
         newMarg = 0;
         $(item).delay(500*index).animate({ opacity: 1, marginLeft: newMarg }, 300);
      });     
	  
	  $self.find("#stages-graph_2 img").each(function (index, item) {
         newMarg = 0;
         $(item).delay(500*index).animate({ opacity: 1, marginLeft: newMarg }, 300);
      }); 
	  
	  $self.find("#stages-graph_3 img").each(function (index, item) {
         newMarg = 0;
         $(item).delay(500*index).animate({ opacity: 1, marginLeft: newMarg }, 300);
      }); 
      
      $self.find(".graph-text").each(function (index, item) {
         $(item).delay(500*index + 300).animate({ opacity: 1 }, 300);
      });     
	  
	         
   });
}
function trig_stages2($self) {

    if ($self.offset().top < ($(window).scrollTop() + 500)) {
        $self.find("#stages-graph img").each(function (index, item) {
            newMarg = 0;
            $(item).delay(500 * index).animate({ opacity: 1, marginLeft: newMarg }, 300);
        });

        $self.find("#stages-graph_2 img").each(function (index, item) {
            newMarg = 0;
            $(item).delay(500 * index).animate({ opacity: 1, marginLeft: newMarg }, 300);
        });

        $self.find("#stages-graph_3 img").each(function (index, item) {
            newMarg = 0;
            $(item).delay(500 * index).animate({ opacity: 1, marginLeft: newMarg }, 300);
        });

        $self.find(".graph-text").each(function (index, item) {
            $(item).delay(500 * index + 300).animate({ opacity: 1 }, 300);
        });

    }
}

//function trig_changeTop($self) {
//    if ($self.offset().top < ($(window).scrollTop() + 300)) {
//        $self.find(".bg-image").animate({"top":"220px"}, 300);
//    }
//}


function trig_focus($self) {
   
   trig_header($self, function() {
      
      $self.find("img.chart").animate({ opacity: 1 }, 2000);
      
      $self.find(".text .prim-text").each(function (index, item) {
         $(item).delay(500*index + 300).animate({ opacity: 1 }, 300);
      });      
   });
}

function trig_countries($self) {
   
   //trig_stdNumber($self, function() {
      
    $self.find("img").each(function (index, item) {
         $(item).delay(100*index).animate({ opacity: 1 }, 300);
      });      
   //});
}

function trig_experience($self) {

   trig_header($self, function() {
      $self.find(".images img").each(function (index, item) {
         $(item).delay(600*index).animate({ opacity: 1, left: 0 }, 400,function(){
	 	$("#"+$(this).attr("id")+"-s").delay(900).animate({ opacity: 1, left: 0 }, 400);
	 });
      });    
   });
}

function trig_clock($self) {

   trig_header($self, function() {
   
      $self.find(".clock").each(function (index, item) {
         $(item).delay(400*index).animate({ opacity: 1, marginLeft: 20, transform: 'rotate(-360deg)' }, 600);
      });      
   });
}

function trig_logos($self) {

    if ($self.offset().top < ($(window).scrollTop() + 600)) {

        $self.find("img").each(function (index, item) {
            $(item).delay(100 * index).animate({ opacity: 1 }, 200, function () { $(this).addClass('rotate') });//.addClass('rotate');//         
        });
    }
}
   
var s;
var triggers = [];   



$(function() {

   initClocks();
      
   s = skrollr.init(); 

   $("#to-top").click(function() {
      s.animateTo(0, { duration: 2000, easing: "quadratic", done: function() {
         location.reload(); 
      } });
      
   }); 
   
   $("#to-first").click(function() {
      s.animateTo(0, { duration: 2000, easing: "quadratic" });
   });
      
   
   $("#to-second").click(function() {
      var d = s.relativeToAbsolute(document.getElementById("nationalities"), 'center', 'center');   
      s.animateTo(d, { duration: 1500, easing: "quadratic" });
   });  
   
   $("#to-third").click(function() {
      var d = s.relativeToAbsolute(document.getElementById("nationalities4"), 'center', 'center');   
      s.animateTo(d, { duration: 1000, easing: "quadratic" });
   });
   
    $("#to-fouth").click(function() {
      var d = s.relativeToAbsolute(document.getElementById("nationalities9"), 'center', 'center');   
      s.animateTo(d, { duration: 1000, easing: "quadratic" });
   });  
	$("#to-fifth").click(function() {
      var d = s.relativeToAbsolute(document.getElementById("nationalities14"), 'center', 'center');   
      s.animateTo(d, { duration: 1000, easing: "quadratic" });
   });  
        
   
   $("#loader").animate({ transform: 'rotate(1800deg)'}, { duration: 20000, easing: "linear" });
   
   $(".trigger").each(function() {
      _id = $(this).attr("id");
      _offset = s.relativeToAbsolute(document.getElementById(_id), 'center', 'top');      
      _func = "trig_" + $(this).data("trigger");
      
      triggers.push({
         id: _id,
         offset: _offset,
         func: _func,         
         flag: false
      });
   });

   s.on("render", function (params) {

      for(i in triggers) {
      
         trig = triggers[i];
        if (params.curTop > trig.offset && trig.flag == false) {
         
            trig.flag = true;
            $n = $("#"+trig.id)
            window[trig.func]($n);
         }            
      }   
   });
});   

// once everything is loaded
$(window).load(function() {

   s.refresh();
   
   $("#loader").stop().animate({ opacity: 0, transform: 'rotate(90deg)' }, { duration: 500, easing: "linear" });
   
   $('html').css({overflow: "auto"});
   

   
});