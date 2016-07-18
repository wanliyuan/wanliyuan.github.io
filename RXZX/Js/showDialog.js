// JavaScript Document
var alertIframe=window.parent.document.getElementById('alert');
function showDialog(name){
$('.showBox').css('display','none');
$(alertIframe).css('display','block');
$(alertIframe).contents().find('#fast_div_'+name).css('display','block');
}




function upload(idname){ 
var aLi=$('#'+idname+' .imgshow ul li');
var oUl=$('#'+idname+' .imgshow ul').eq(0);
var oTitleWidth=$('#'+idname+' .imgshow').width();
var oneLiwidth=aLi.eq(0).width();
if(oneLiwidth==0){oneLiwidth=730}
var oWidth=aLi.size()*oneLiwidth;
var left=0;
var right=0;
var i=0;
var j=0;
oUl.css('width',oWidth);
$('#'+idname+' .prev').click(function(){
if(left!=0 && i>0)
{
    i--;
	right=(-1)*i*oneLiwidth;	
	left=right;
	oUl.animate({marginLeft:right},"slow");
	$('#'+idname+' .pagelist .current').removeClass('current');
	$('#'+idname+' .pagelist a').eq(i).addClass('current');
}else{
		//alert('第一张');
		i=aLi.size();
		right=(-1)*i*oneLiwidth+oneLiwidth;	
		i--;
		left=right;
	    oUl.animate({marginLeft:right},"slow");
	    $('#'+idname+' .pagelist .current').removeClass('current');
	    $('#'+idname+' .pagelist a').eq(i).addClass('current');
	}	
});
$('#'+idname+' .next').click(function(){
if(-left+oneLiwidth<oWidth && i<aLi.size())	
{
    i++;
	left=-1*i*oneLiwidth;
	oUl.animate({marginLeft:left},"slow");
	$('#'+idname+' .pagelist .current').removeClass('current');
	$('#'+idname+' .pagelist a').eq(i).addClass('current');
}else{
		//alert('最后一张');
		i=0;
		left=-1*i*oneLiwidth;
	    oUl.animate({marginLeft:left},"slow");
	    $('#'+idname+' .pagelist .current').removeClass('current');
	    $('#'+idname+' .pagelist a').eq(i).addClass('current');
		
	}
});
$('#'+idname+' .close').click(function(){
	$(this).parent('.showBox').css('display','none');
	$(alertIframe).css('display','none');
});
	
}