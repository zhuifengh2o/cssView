$(window).load(function () {
	$ALL=$("*");
	window.$my =
	{
		// 初始化所有可能会不止一次要使用的查询
		HTML : $("html"),
		HEAD : $("head"),
		DOCUMENT : $(document),
		WINDOW : $(window)
	};
	$my.HTML.append("<script src='file://localhost/C:/operajs/jquery.min.js'></script>");
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
            style: "",
            script: ""
        },
        5: {
            url: "image.baidu.com",
            style: ".mod-img{box-shadow:0 0 4px #000;} .mod-pic-show img{box-shadow:0 0 4px #000;}",
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
        }
    }
    var urlnow = document.location.toString();
    for (e in setstyles) {
        if (urlnow.indexOf(setstyles[e].url) != -1) {
            $("html").append("<style type='text/css'>" + setstyles[e].style + "</style><script type='text/javascript'>" + setstyles[e].script + "</script>");
        }
    }
	//广告屏蔽
    var adword = ['tanx','ad', 'AD','Ad', 'BAIDU_DUP', 'cproIframe', 'jd_banner', '_haibao_openwindow', 'optimusPrimeContentId'];//屏蔽id,class关键字
    var notadword = ['read','load', 'head','Head','sinaads','play','HEAD','shadow','ready','padding','radius','trade'];//不要屏蔽的id class关键字
    var removead=$("*").each(function () {
        var idName = $(this).attr('id');
        var adclassName = $(this).attr('class');
        if ((typeof (idName) == 'undefined') & (typeof (adclassName) == 'undefined')) {
            return;
        } else {
            for (var x in adword) {
                var adwordn = adword[x];
				var reg="^"+adwordn+"$";
				var patt1=new RegExp(reg);
                var stringNow = ''; //存储idName和adclassName
                if (typeof (idName) != 'undefined') {
					if(patt1.test(idName)){//如果完全匹配则删除
						$(this).remove();
						return;
					};
                    stringNow = idName;
                };
                if (typeof (adclassName) != 'undefined') {
					if(patt1.test(adclassName)){//如果完全匹配则删除
						$(this).remove();
						return;
					};
                    stringNow += ',' + adclassName;
                };
                if (stringNow.indexOf(adwordn) != -1) {
                    var hasnotadword = false;
                    for (var y in notadword) {
                        var notadwordn = notadword[y]
                        if (stringNow.indexOf(notadwordn) != -1) {
                            hasnotadword = true;
                        }
                    }
                    if (!hasnotadword) {
                        $(this).remove()
                    }
                };
            }
        }
    });
//	setInterval(removead,2000)
//鼠标放上显示该节点的父级节点，直到html节点及各个节点对应样式；
var styleSrc="";
for(var x in document.styleSheets){
	if(document.styleSheets[x].href){
	styleSrc+=x+"."+document.styleSheets[x].href+";<br/>";
	}
};
$my.HTML.append("<div style='opacity:1;position:fixed;left:-1000px;top:0;width:100px;overflow:hidden;' id='LpsDomViewHtmlCon'></div><input type='text' value='' id='LpsDomViewHtml' style='opacity:1;position:fixed;left:-1000px;top:0;width:100px;'/><div class='LpsDomView LpsDomViewStyle'></div><style>.showDomArea{box-shadow:0 0 3px #f050a0;text-shadow:0 0 1px #ddd;} .LpsDomViewStyle{display:none;text-align:left;color:#000;background:rgba(248,248,248,0.8);line-height:18px;padding:4px;z-index:99999999;white-space:normal,word-break:break-all;box-shadow:0 0 2px #008000;color:#484848;font-family:'sans-serif';font-size:14px;position:absolute}</style>");
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
								for(i=1; i<$objParents.length+1;i++){
									var $objParentsi=$objParents[i-1];
									if($objParentsi.className){
										tagNameN=$objParentsi.tagName.toLowerCase()+"."+$objParentsi.className
									}else{
										tagNameN=$objParentsi.tagName.toLowerCase()
									}
									tagNameAll[i]=tagNameN;
										};
								tagNameAll.reverse();//数组翻转;
								tagNameAllN+="</br> -> "+tagNameAll.join("</br> -> ");
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
})
