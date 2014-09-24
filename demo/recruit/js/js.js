(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

$(document).ready(function(){
	
	var page_index=1;
	var sub_page_index=0;
	
	//触摸触发事件
	/*$("body").touchwipe({
		wipeDown: function() { 
			
		 },
		 wipeUp: function() { 
			
		 },
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});*/
	
	
	//切换 详细岗位列表
	function SwitchSubList(wrap,index){
		var list=$(wrap).children(".tear_page_wrap");
		if(index==0){
			$(wrap).removeClass("detail_wrap_show");
			$(list[i]).removeClass("wrap_before").addClass("wrap_after");
			$(wrap).children(".poster_wrap").removeClass("wrap_before");
		}else{
			$(wrap).addClass("detail_wrap_show");
			for(var i=0;i<list.length;i++){
				if($(list[i]).data("index")<index){
					$(list[i]).removeClass("wrap_after").addClass("wrap_before");
				}
				else if($(list[i]).data("index")>index){
					$(list[i]).addClass("wrap_after").removeClass("wrap_before");
				}
				else if($(list[i]).data("index")==index){
					$(list[i]).removeClass("wrap_after").removeClass("wrap_before");
				}
			}
			$(wrap).children(".poster_wrap").addClass("wrap_before");
		}
		
		sub_page_index=index;
	}
	
	//绑定切换详细岗位事件
	function BindTabEvent(list,wrap){ 
	 	var tabList=$(list).children("li").children(".tab_item");
		for(var i=0;i<tabList.length;i++){
			(function(){
				var index=i;
				$(tabList[index]).bind("click",function(){
					SwitchSubList(wrap,index+1);
					
					$(list).children("li").removeClass("current");
					$(this).parent().addClass("current");
				});
			})();
		}
		
		/*$(".con_wrap_1 .detail_title").bind("click",function(){
			$(".con_wrap_1").addClass("tearing");
		});
		
		$(".con_wrap_1 .surrender_tips").bind("click",function(){
			$(".con_wrap_1").addClass("tearing");
		});*/
		$(wrap).find(".detail_title").bind("click",function(){
			$(this).parents(".con_wrap").addClass("tearing");
			$(".email_wrap").addClass("tearing");
		})
		
		$(wrap).find(".surrender_tips").bind("click",function(){
			$(this).parents(".con_wrap").addClass("tearing");
			$(".email_wrap").addClass("tearing");
		})
	}
	
	BindTabEvent($("#tab_list_1"),$(".con_wrap_1"));
	BindTabEvent($("#tab_list_2"),$(".con_wrap_2"));
	BindTabEvent($("#tab_list_3"),$(".con_wrap_3"));
	BindTabEvent($("#tab_list_4"),$(".con_wrap_4"));
	
	/*$(".con_wrap_1").find(".detail_title").bind("click",function(){
		$(this).parentsUntil("con_wrap").addClass("tearing");
	})*/
	
	/*$(".tab_list_1 .tab_item_1").bind("click",function(){
		var sub_list=$(".con_wrap_1 .tear_page_wrap");
		SwitchSubList(sub_list,1);
		
		$(".tab_list_1 li").removeClass("current");
		$(this).parent().addClass("current");
	});
	
	$(".tab_list_1 .tab_item_2").bind("click",function(){
		var sub_list=$(".con_wrap_1 .tear_page_wrap");
		SwitchSubList(sub_list,2);
		
		$(".tab_list_1 li").removeClass("current");
		$(this).parent().addClass("current");
	});
	$(".tab_list_1 .tab_item_3").bind("click",function(){
		var sub_list=$(".con_wrap_1 .tear_page_wrap");
		SwitchSubList(sub_list,3);
		
		$(".tab_list_1 li").removeClass("current");
		$(this).parent().addClass("current");
	});
	$(".tab_list_1 .tab_item_4").bind("click",function(){
		var sub_list=$(".con_wrap_1 .tear_page_wrap");
		SwitchSubList(sub_list,4);
		
		$(".tab_list_1 li").removeClass("current");
		$(this).parent().addClass("current");
	});
	$(".tab_list_1 .tab_item_5").bind("click",function(){
		var sub_list=$(".con_wrap_1 .tear_page_wrap");
		SwitchSubList(sub_list,5);
		
		$(".tab_list_1 li").removeClass("current");
		$(this).parent().addClass("current");
	});*/
	
	function ResetWrapState(){
		$(".poster_wrap").removeClass("wrap_before");
		$(".tear_page_wrap").removeClass("wrap_before").addClass("wrap_after");
		$(".tab_list li").removeClass("current");
		$(".con_wrap").removeClass("detail_wrap_show");
		$(".email_wrap").removeClass("tearing");
	}
	
	
	
	//触摸触发事件
	$("body").touchwipe({
		wipeDown: function() { 
			if(page_index==1){
				$(".cover_wrap").addClass("wrap_hide");
				$(".con_wrap_1").addClass("wrap_show");
				
				var timer=setTimeout(function(){
					$(".cover_wrap").removeClass("wrap_show");
					$(".con_wrap_1").removeClass("wrap_prepare");
					
					ResetWrapState();
					page_index=2;
					clearTimeout(timer);
					$(".static .txt").html(page_index);
					
				},300);
				$(".static .txt").html(page_index);
			}
			else if(page_index>1&&page_index<5){
				$(".con_wrap_"+(page_index-1)).addClass("wrap_hide");
				$(".con_wrap_"+page_index).addClass("wrap_show");
				
				var str_name_1=".con_wrap_"+(page_index-1);
				var str_name_2=".con_wrap_"+page_index;
				
				page_index+=1;
				$(".static .txt").html(page_index);
				
				var timer=setTimeout(function(){
					$(str_name_1).removeClass("wrap_show");
					$(str_name_2).removeClass("wrap_prepare");
					
					ResetWrapState();
					clearTimeout(timer);
					$(".static .txt").html(page_index);
					
				},300);
			}
			else{
					
			}
			
		 },
		 wipeUp: function() { 
			if(page_index==2){
				$(".cover_wrap").removeClass("wrap_hide").addClass("wrap_show");
				$(".con_wrap_1").removeClass("wrap_show").addClass("wrap_prepare");
				
				ResetWrapState();
				page_index=1;
				$(".static .txt").html(page_index);
			}
			else if(page_index>2&&page_index<=5){
				var str_name_1=".con_wrap_"+(page_index-1);
				var str_name_2=".con_wrap_"+page_index;
				
				$(str_name_1).removeClass("wrap_hide").addClass("wrap_show");
				$(str_name_2).removeClass("wrap_show").addClass("wrap_prepare");
				
				ResetWrapState();
				page_index-=1;
				$(".static .txt").html(page_index);
				$(".static .txt").html(str_name_1+" "+str_name_2);
			}
			else{
				
			}
		 },
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});
	
	$(".cover_wrap .hook_down").bind("click",function(){
		$(".cover_wrap").addClass("wrap_hide");
		$(".con_wrap_1").addClass("wrap_show");
		
		var timer=setTimeout(function(){
			$(".cover_wrap").removeClass("wrap_show");
			$(".con_wrap_1").removeClass("wrap_prepare");
			ResetWrapState();
		},300);
	});
	
	$(".con_wrap_1 .hook_down").bind("click",function(){
		$(".con_wrap_1").addClass("wrap_hide");
		$(".con_wrap_2").addClass("wrap_show");
		var timer=setTimeout(function(){
			$(".con_wrap_1").removeClass("wrap_show");
			$(".con_wrap_2").removeClass("wrap_prepare");
			ResetWrapState();
		},300);
	});
	$(".con_wrap_2 .hook_down").bind("click",function(){
		$(".con_wrap_2").addClass("wrap_hide");
		$(".con_wrap_3").addClass("wrap_show");
		var timer=setTimeout(function(){
			$(".con_wrap_2").removeClass("wrap_show");
			$(".con_wrap_3").removeClass("wrap_prepare");
			ResetWrapState();
		},300);
	});
	$(".con_wrap_3 .hook_down").bind("click",function(){
		$(".con_wrap_3").addClass("wrap_hide");
		$(".con_wrap_4").addClass("wrap_show");
		var timer=setTimeout(function(){
			$(".con_wrap_3").removeClass("wrap_show");
			$(".con_wrap_4").removeClass("wrap_prepare");
			ResetWrapState();
		},300);
	});
	
	$(".con_wrap_1 .hook_up").bind("click",function(){
		$(".cover_wrap").removeClass("wrap_hide").addClass("wrap_show");
		$(".con_wrap_1").removeClass("wrap_show").addClass("wrap_prepare");
		ResetWrapState();
	});
	$(".con_wrap_2 .hook_up").bind("click",function(){
		$(".con_wrap_1").removeClass("wrap_hide").addClass("wrap_show");
		$(".con_wrap_2").removeClass("wrap_show").addClass("wrap_prepare");
		ResetWrapState();
	});
	$(".con_wrap_3 .hook_up").bind("click",function(){
		$(".con_wrap_2").removeClass("wrap_hide").addClass("wrap_show");
		$(".con_wrap_3").removeClass("wrap_show").addClass("wrap_prepare");
		ResetWrapState();
	});
	$(".con_wrap_4 .hook_up").bind("click",function(){
		$(".con_wrap_3").removeClass("wrap_hide").addClass("wrap_show");
		$(".con_wrap_4").removeClass("wrap_show").addClass("wrap_prepare");
		ResetWrapState();
	});
	
	$(".tab_list_3 .tab_item_8").bind("click",function(){
		$(".cover_wrap").removeClass("wrap_hide").addClass("wrap_show");
		$(".con_wrap").removeClass("wrap_show").addClass("wrap_prepare");
		
		var timer=setTimeout(function(){
			$(".con_wrap").removeClass("wrap_hide").removeClass("wrap_show").removeClass("tearing").removeClass("detail_wrap_show").addClass("wrap_prepare");
			ResetWrapState();
		},300);
	});
	
	
	/*微信转发图片*/
	
	var imgUrl = 'http://sunnyzhen.github.io/demo/calendar/images/calendar.jpg';
	var lineLink = location.href;
	var descContent = "腾讯2015校园招聘火热启动！送你一本小鹅历，助你校招大丰收！";
	var shareTitle = document.title;
	var appid = '';
	
	function shareFriend() {
		WeixinJSBridge.invoke('sendAppMessage',{
			"appid": appid,
			"img_url": imgUrl,
			"img_width": "200",
			"img_height": "200",
			"link": lineLink,
			"desc": descContent,
			"title": shareTitle
		}, function(res) {
			//_report('send_msg', res.err_msg);
		})
	}
	function shareTimeline() {
		WeixinJSBridge.invoke('shareTimeline',{
			"img_url": imgUrl,
			"img_width": "200",
			"img_height": "200",
			"link": lineLink,
			"desc": descContent,
			"title": shareTitle
		}, function(res) {
			   //_report('timeline', res.err_msg);
		});
	}
	function shareWeibo() {
		WeixinJSBridge.invoke('shareWeibo',{
			"content": descContent,
			"url": lineLink,
		}, function(res) {
			//_report('weibo', res.err_msg);
		});
	}
	// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		// 发送给好友
		WeixinJSBridge.on('menu:share:appmessage', function(argv){
			shareFriend();
		});
		// 分享到朋友圈
		WeixinJSBridge.on('menu:share:timeline', function(argv){
			shareTimeline();
		});
		// 分享到微博
		WeixinJSBridge.on('menu:share:weibo', function(argv){
			shareWeibo();
		});
	}, false);
	
	
});




















