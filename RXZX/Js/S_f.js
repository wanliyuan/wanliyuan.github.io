function accordion(Id,Tag,Long,Short){
 var Div=document.getElementById(Id);
 var Divs=Div.getElementsByTagName(Tag);
 var i=0;
 var t=null;
 for(i=0;i<Divs.length;i++){
  Divs[i].index=i;
  Divs[i].onmouseover=function (){
   var index=this.index;
   if(t){clearInterval(t);}
   t=setInterval(function (){
    var iWidth=Long;
    for(i=0;i<Divs.length;i++){
     if(index!=Divs[i].index){
      var iSpeed=(Short-Divs[i].offsetWidth)/5;
      iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
      Divs[i].style.width=Divs[i].offsetWidth+iSpeed+'px';
      iWidth-=Divs[i].offsetWidth;
     };
    };
    Divs[index].style.width=iWidth+'px';
   }, 30);
  };
 }
}
accordion("imageMenu","li",909,126)///////////////参数1传入 ID  参数2传入标签名  参数3传入总宽度   参数4  传入收缩版宽度。