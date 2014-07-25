$("body").append("<script src='http://cdn.staticfile.org/jquery/1.11.1/jquery.min.js'></script>");
vvar styleSrc="";
for(var x in document.styleSheets){
	if(document.styleSheets[x].href!=null){
	styleSrc+=x+"."+document.styleSheets[x].href+";<br/>";
	}
};
$("html").append("<input type='text' value='' id='LpsDomViewHtml' style='opacity:0;'/><div class='LpsDomView LpsDomViewStyle'></div><style>.showDomArea{box-shadow:0 0 3px #f00;} .LpsDomViewStyle{text-align:left;color:#000;background:rgba(248,248,248,0.8);line-height:18px;padding:4px;z-index:99999999;white-space:normal,word-break:break-all;box-shadow:0 0 2px #008000;color:#484848;font-family:'sans-serif';font-size:14px;position:absolute}</style>");
$(document).mousemove(function(e){
	$(".LpsDomView").empty();
	$(".LpsDomView").css({"left":"auto","right":"auto","top":"auto","bottom":"auto"});
		var obj=e.target;
		$("*").removeClass('showDomArea');
		//for(var xx in window.localStorage){alert(window.localStorage[xx]);};
		$("#LpsDomViewHtml").val('');//清空input
		$("#LpsDomViewHtml").val($(obj).html());//input装入新的内容
		$("#LpsDomViewHtml").select();
		var tagNameAll=[];
		tagNameAll[0]
		if(obj.className.length!=0){
			tagNameAll[0]=obj.tagName.toLowerCase()+"."+obj.className;
		}else{
			tagNameAll[0]=obj.tagName.toLowerCase();
		}
		var i=0;//计算dom深度,并保存样式名字
			for(i=1,n=obj;n=n.parentNode;i++){
				if(typeof(n.tagName)!='undefined'){
					if(n.className.length!=0){
						tagNameN=n.tagName.toLowerCase()+"."+n.className;
					}else{
						tagNameN=n.tagName.toLowerCase();
					}				
					tagNameAll[i]=tagNameN;
					//tagNameAll[i]=tagNameN+" > ";
				};
			}
			tagNameAll.reverse();//数组翻转;
			tagNameAllN=styleSrc+"dom层级:"+(i-1);//dom个数;
			if(obj.tagName=="IMG"){tagNameAllN+="<br/>图片地址："+$(obj).attr('src')+";";}
			tagNameAllN+="<br/>width:"+($(obj).width()+parseInt($(obj).css("padding-left"))*1+parseInt($(obj).css("padding-right"))*1)+"px;";//目标宽度;
			tagNameAllN+="<br/>hegiht:"+($(obj).height()+parseInt($(obj).css("padding-top"))*1+parseInt($(obj).css("padding-bottom"))*1)+"px;";//目标高度;
			tagNameAllN+="<br/>color:"+$(obj).css("color")+";";//;
			tagNameAllN+="<br/>background-color:"+$(obj).css("background-color")+";";//;
			tagNameAllN+="<br/>background-image:"+$(obj).css("background-image")+";";//;
			for(var x in tagNameAll){
				tagNameAllN+="</br> -> "+tagNameAll[x];
			};
			$(".LpsDomView").append(tagNameAllN);	

			$(".LpsDomView").css({"top":e.pageY+50+"px","left":e.pageX+20+"px"});
			if($(window).width()-10<($(".LpsDomView").offset().left+$(".LpsDomView").width())){
				//$(".LpsDomView").css({"right":$(window).width()-e.pageX+60+"px","left":"auto"});//沿鼠标翻转；
				$(".LpsDomView").css({"right":20+"px","left":"auto"});
				};
			if($(window).height()-10<($(".LpsDomView").offset().top-$(window).scrollTop()+$(".LpsDomView").height())){
				$(".LpsDomView").css({"top":(e.pageY-$(".LpsDomView").height()-30)+"px"});
				};
					$(obj).addClass('showDomArea');//高亮显示目标节点
		})
			$(document).bind("keydown",function(e){if(e.keyCode==27){$(".LpsDomView").css("display","none");};})
