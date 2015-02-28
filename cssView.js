(function(){
	//var $ALL=$("*");
$(function(){
	var $my =
	{
		// 初始化所有可能会不止一次要使用的查询
		DOCUMENT : $(document),
		WINDOW : $(window),
		HTML : function(){return this.DOCUMENT.find("html")},
		HEAD : function(){return this.DOCUMENT.find("head")}
	};
    var setstyles = {
        1: {
            url: "v.baidu.com",
            style: ".videoitem{box-shadow:0 0 4px #888;} .focuspicarea li{box-shadow:0 0 4px #2b2b2b;}",
            script: ""
        },
        2: {
            url: "www.iqiyi.com",
            style: "#flashbox{box-shadow:0 5px 10px #000;} #flashArea{background:#fff}"
        },
        3: {
            url: "www.sina.com.cn",
            style: "#bgRightAd{display:none;} #bgLeftAd{display:none;}"
        },
        4: {
            url: "www.xiaolinsi.com",
            style: ".tao_ad,.right_ad,.left_ad,ins{visibility:hidden;}",
            script: ""
        },
        5: {
            url: "image.baidu.com",
            style: "html,body{background:none;}.mod-img{border:1px solid #ccc;padding:4px;} .mod-img:hover{position:relative;z-index:999;} .mod-pic-show img{box-shadow:0 0 4px #000;} img:hover{transform:scale(1.5,1.5);}",
			script:""
        },
        6: {
            url: "www.baidu.com",
            style: "",
			script:""
        },
        7: {
            url: "http://192.168.35.39:8886/",
            style: "",
			script:""
        },
		8:{
			url:"http://zhuifengh2o.7958.com/",
			style:"",
			script:""
		}
    }
    var urlnow = document.location.toString();
    for (var e in setstyles) {
        if (urlnow.indexOf(setstyles[e].url) != -1) {
            $my.HTML().append("<style type='text/css'>" + setstyles[e].style + "</style><script type='text/javascript'>" + setstyles[e].script + "</script>");
        }
    }
	//广告屏蔽
    var adword = ['tanx','ad', 'AD','Ad', 'BAIDU_DUP', 'cproIframe', 'jd_banner', '_haibao_openwindow', 'optimusPrimeContentId'];//屏蔽id,class关键字
    var notadword = ['read','load', 'head','Head','sinaads','play','HEAD','shadow','ready','padding','radius','trade'];//不要屏蔽的id class关键字
  // 		console.log($(this));
$my.HTML().find("*").filter(function(){
	var className=$(this).attr("class");
	var idName=$(this).attr("id");
	if(!~($.inArray(className,notadword))&&(!~($.inArray(idName,notadword)))){
		var hasword=false;
		for(var x in adword){
			if(~((className+","+idName).indexOf(adword[x]))){hasword=true}
			}
		if(hasword){return true;}
		}
	}).css('visibility','hidden');
//按‘esc’启用，再次按‘esc’键关闭。鼠标放上显示该节点的父级节点，直到html节点及各个节点对应样式；
var styleSrc="";
for(var x in document.styleSheets){
	if(document.styleSheets[x].href){
	styleSrc+=x+"."+document.styleSheets[x].href+";<br/>";
	}else{
	styleSrc+="含有页面样式;<br/>"
	}
};
$my.HTML().append("<div style='opacity:1;position:fixed;left:-1000px;top:0;width:100px;overflow:hidden;' id='LpsDomViewHtmlCon'></div><input type='text' value='' id='LpsDomViewHtml' style='opacity:1;position:fixed;left:-1000px;top:0;width:100px;'/><div class='LpsDomView LpsDomViewStyle'></div><style>.showDomArea{box-shadow:0 0 3px #f050a0;text-shadow:0 0 1px #ddd;} .LpsDomViewStyle{display:none;text-align:left;color:#000;background:rgba(248,248,248,0.8);line-height:18px;padding:4px;z-index:99999999;white-space:normal,word-break:break-all;box-shadow:0 0 2px #008000;color:#484848;font-family:'sans-serif';font-size:14px;position:absolute}</style>");
var $lpsdomview=$(".LpsDomView");//显示选中Dom样式的容器；
var $LpsDomViewHtml=$("#LpsDomViewHtml");//选中Dom的容器;
var $LpsDomViewHtmlCon=$("#LpsDomViewHtmlCon");//选中Dom的容器;
	$my.DOCUMENT.bind("keydown",function(e){if(e.keyCode==27){
					if($lpsdomview.css("display")=="none"){$lpsdomview.css("display","block")
					$my.DOCUMENT.bind("mousemove.showDomAttr",function(e){
						$lpsdomview.empty();
						$LpsDomViewHtmlCon.empty();
						$lpsdomview.css({"left":"auto","right":"auto","top":"auto","bottom":"auto"});
							var obj=e.target;
							var $obj=$(obj);
							$("*").removeClass('showDomArea');
							//for(var xx in window.localStorage){alert(window.localStorage[xx]);};
								tagNameAllN=styleSrc+"dom层级:"+($obj.parents().length+1);//dom个数;
								if(obj.tagName=="IMG"){tagNameAllN+="<br/>图片地址："+$obj.attr('src')+";";}
								if($obj.css("background-image")!="none"){
									var objBgImg=$obj.css("background-image").match(/["]([^"]+)["]/);
									tagNameAllN+="<br/>背景图片地址："+objBgImg[1]+";";
								};
								tagNameAllN+="<br/>width:"+$obj.outerWidth()+"px;";//目标宽度;
								tagNameAllN+="<br/>hegiht:"+$obj.outerHeight()+"px;";//目标高度;
								tagNameAllN+="<br/>color:"+$obj.css("color")+";";//;
								tagNameAllN+="<br/>background-color:"+$obj.css("background-color")+";";//;
								tagNameAllN+="<br/>background-image:"+$obj.css("background-image")+";";//;
								var tagNameAll=[];
								tagNameAll[0]
								if(obj.className){
									tagNameAll[0]=obj.tagName.toLowerCase()+"."+obj.className;
								}else{
									tagNameAll[0]=obj.tagName.toLowerCase();
								}
								var i=0;
									var $objParents=$obj.parents();
								/***for(i=1; i<$objParents.length+1;i++){
									var $objParentsi=$objParents[i-1];
									if($objParentsi.className){
										tagNameN=$objParentsi.tagName.toLowerCase()+"."+$objParentsi.className
									}else{
										tagNameN=$objParentsi.tagName.toLowerCase()
									}
									tagNameAll[i]=tagNameN;
										};
								tagNameAll.reverse();//数组翻转;
								tagNameAllN+="</br> -> "+tagNameAll.join("</br> -> ");***/
								for(i=$objParents.length-1;i>-1;i--){
										var $objParentsi=$objParents[i];
										tagNameAllN+="<br />-> "+$objParentsi.tagName.toLowerCase();
									if($objParentsi.className){
										tagNameAllN+="."+$objParentsi.className;
									}
								}
								tagNameAllN+="<br /> -> "+tagNameAll[0];
								$lpsdomview.append(tagNameAllN);	

								$lpsdomview.css({"top":e.pageY+50+"px","left":e.pageX+20+"px"});
								if($my.WINDOW.width()-10<($lpsdomview.offset().left+$lpsdomview.width())){
									//$(".LpsDomView").css({"right":$(window).width()-e.pageX+60+"px","left":"auto"});//沿鼠标翻转；
									$lpsdomview.css({"right":20+"px","left":"auto"});
									};
								if($my.WINDOW.height()-10<($lpsdomview.offset().top-$my.WINDOW.scrollTop()+$lpsdomview.height())){
									$lpsdomview.css({"top":(e.pageY-$lpsdomview.height()-30)+"px"});
									};
										$(obj).addClass('showDomArea');//高亮显示目标节点
										/****备选，复制时候,有些不支持delegate和prop("outerHTML"),可以用此方法；
										$LpsDomViewHtml.val($LpsDomViewHtmlCon.append($(obj).clone()).html().replace(/showDomArea/,''));
										$LpsDomViewHtml.select();****/
							})
			}else{$lpsdomview.css("display","none");
						$my.DOCUMENT.unbind("mousemove.showDomAttr");
						$("*").removeClass('showDomArea');
					}
				};});

			$my.DOCUMENT.delegate(".showDomArea","mousemove",function(e){
						var objHtml=$(this).prop('outerHTML').toString();
							objHtml=objHtml.replace(/showDomArea/,'');
						$LpsDomViewHtml.val(objHtml);//input装入新的内容
						$LpsDomViewHtml.select();
			});
			$my.DOCUMENT.delegate("html","mouseleave",function(){
						var objHtml=$(this).prop('outerHTML').toString();
						$LpsDomViewHtml.val(objHtml);//input装入新的内容
						$LpsDomViewHtml.select();
			})
//鼠标放上显示该节点的父级节点，直到html节点及各个节点对应样式结束；


})})()
