(function(){
    var aDiv = document.getElementsByTagName('div');
    var arrDiv = [];
    var o = null;
    for (var i=0; i<aDiv.length; i++) {
        if (aDiv[i].className == 'module') {
            arrDiv.push(aDiv[i]);
        }
    }
    for (var i=0; i<arrDiv.length; i++) {
        o = arrDiv[i];
        o.children[o.children.length-1].style.border = 'none';

        o.height = o.offsetHeight;
        o.style.height = o.height + 'px';
        o.onOff = true;
        //getElementByTagsName("h3")[0].
        o.onclick = function (e) {
            if(e.target.tagName=="H3"){
                this.style.height = this.onOff?'40px':this.height+'px';
                this.onOff = !this.onOff;
            }
        };
    }
})();
window.addEventListener("load",function()
{
	var oNew=document.getElementById("new");
	var oNewC=document.getElementById("newC");
	if (!oNewC) return;
	var aDl=oNewC.getElementsByTagName("dl");

	for(var i=0;i<aDl.length;i++)
	{
		aDl[i].style.transition="1s "+(1.5+i*.2)+"s cubic-bezier(0.175, 0.885, 0.320, 1.075)";
		aDl[i].style.top="0";
		aDl[i].style.opacity="1";
	}
	oNew.style.height="222px";
	oNewC.style.opacity="1";
	oNewC.style.filter="alpha(opacity=100)";
},false);

(function(){
    var oLine = document.getElementById('line');
	if (!oLine)return;
    var aLi = oLine.getElementsByTagName('li');
    
    for(var i=0; i<aLi.length; i++){
        aLi[i].style.top = 40 + i*120 + 'px';
    }
})();

(function(){
    var oCatalog = document.getElementById('catalog');
	if (!oCatalog)return;
    var aUl = oCatalog.getElementsByTagName('ul');
    var aLi = null;
    var arrPos = [0,0,1,3,3];
    var arrLi = [];

    for (var i = 0; i < aUl.length; i++) {
        aUl[i].style.top = i*120 + 'px';

        aLi = aUl[i].getElementsByTagName('li');
        for (var j = 0; j < aLi.length; j++) {

            arrLi.push(aLi[j]);

            aLi[j].style.left = arrPos[i]*120 + j*120 + 'px';

            aLi[j].onmouseover = function () {
                for (var i=0; i<arrLi.length; i++) {
                    arrLi[i].style.zIndex = 1;
                }
                this.style.zIndex = 3;
            };
        }
    }
})();

