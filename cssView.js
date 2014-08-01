//鼠标放上显示该节点的父级节点，直到html节点及各个节点对应样式；
var styleSrc="";
for(var x in document.styleSheets){
	if(document.styleSheets[x].href!=null){
	styleSrc+=x+"."+document.styleSheets[x].href+";<br/>";
	}
};
$("html").append("<input type='text' value='' id='LpsDomViewHtml' style='opacity:1;position:fixed;left:-1000px;top:0;width:100px;'/><div class='LpsDomView LpsDomViewStyle'></div><style>.showDomArea{box-shadow:0 0 3px #f00;text-shadow:0 0 1px #ddd;} .LpsDomViewStyle{text-align:left;color:#000;background:rgba(248,248,248,0.8);line-height:18px;padding:4px;z-index:99999999;white-space:normal,word-break:break-all;box-shadow:0 0 2px #008000;color:#484848;font-family:'sans-serif';font-size:14px;position:absolute}</style>");
var $lpsdomview=$(".LpsDomView");//显示选中Dom样式的容器；
var $alldom=$("*");//获取所有Dom；
var $document=$(document);
var $window=$(window);
var $LpsDomViewHtml=$("#LpsDomViewHtml");//选中Dom的容器;
$document.mousemove(function(e){
	$lpsdomview.empty();
	$lpsdomview.css({"left":"auto","right":"auto","top":"auto","bottom":"auto"});
		var obj=e.target;
		$alldom.removeClass('showDomArea');
		//for(var xx in window.localStorage){alert(window.localStorage[xx]);};
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
			tagNameAllN+="<br/>width:"+$(obj).outerWidth()+"px;";//目标宽度;
			tagNameAllN+="<br/>hegiht:"+$(obj).outerHeight()+"px;";//目标高度;
			tagNameAllN+="<br/>color:"+$(obj).css("color")+";";//;
			tagNameAllN+="<br/>background-color:"+$(obj).css("background-color")+";";//;
			tagNameAllN+="<br/>background-image:"+$(obj).css("background-image")+";";//;
			for(var x in tagNameAll){
				tagNameAllN+="</br> -> "+tagNameAll[x];
			};
			$lpsdomview.append(tagNameAllN);	

			$lpsdomview.css({"top":e.pageY+50+"px","left":e.pageX+20+"px"});
			if($window.width()-10<($lpsdomview.offset().left+$lpsdomview.width())){
				//$(".LpsDomView").css({"right":$(window).width()-e.pageX+60+"px","left":"auto"});//沿鼠标翻转；
				$lpsdomview.css({"right":20+"px","left":"auto"});
				};
			if($window.height()-10<($lpsdomview.offset().top-$window.scrollTop()+$lpsdomview.height())){
				$lpsdomview.css({"top":(e.pageY-$lpsdomview.height()-30)+"px"});
				};
					$(obj).addClass('showDomArea');//高亮显示目标节点
		})
			$document.bind("keydown",function(e){if(e.keyCode==27){$lpsdomview.css("display","none");};})
			$document.delegate(".showDomArea","mousemove",function(e){
//						$("#LpsDomViewHtml").val('');//input装入新的内容
/***旧方法获取选中Dom的html代码开始
					var obj=$(this)[0];
					var objTagName=obj.tagName.toLowerCase();
					var objClassName=obj.className;
					if(objTagName=='img'||(objTagName=='input')){
						var objHtml="<"+objTagName;
						if(obj.className.length!=0){//加上class
							if(objClassName!="showDomArea"){
								objClassName=objClassName.replace(/ showDomArea/,'');
							objHtml+=" class=\""+objClassName+"\"";
							}
						}
						if(obj.id.length!=0){//加上id
							objHtml+=" id=\""+obj.id+"\"";
						}
						if(obj.src){objHtml+=" src=\""+obj.src+"\""};
						if(obj.alt){objHtml+=" alt=\""+obj.alt+"\""};
						if(obj.value){objHtml+=" value=\""+obj.value+"\""}
						objHtml+=" />"

					}else{
						var objHtml="<"+objTagName;
						if(obj.className.length!=0){//加上class
							if(objClassName!="showDomArea"){
								objClassName=objClassName.replace(/ showDomArea/,'');
							objHtml+=" class=\""+objClassName+"\"";
							}
						}
						if(obj.id.length!=0){//加上id
							objHtml+=" id=\""+obj.id+"\"";
						}
						objHtml+=">"
						objHtml+=$(obj).html()+"</"+objTagName+">";
						$("#LpsDomViewHtml").val(objHtml);//input装入新的内容
						$("#LpsDomViewHtml").select();
					};
旧方法获取选中Dom的html代码结束；***/

//新方法获取选中Dom的html代码开始
						var objHtml=$(this).prop('outerHTML').toString();
						if($(this).attr('class').indexOf("showDomArea")!=-1){
							objHtml=objHtml.replace(/showDomArea/,'');
						}
						$LpsDomViewHtml.val(objHtml);//input装入新的内容
						$LpsDomViewHtml.select();
			});
			$document.delegate("html","mouseleave",function(){
						var objHtml=$(this).prop('outerHTML').toString();
						$LpsDomViewHtml.val(objHtml);//input装入新的内容
						$LpsDomViewHtml.select();
			})
//鼠标放上显示该节点的父级节点，直到html节点及各个节点对应样式结束；
