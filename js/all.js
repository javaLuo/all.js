;(function($){
	"use strict";
		
	var allobj = {
		/* -- 页面初始化 -- */
		init:function(){
			
			/*============================
			
				 当窗口大小被改变时触发 
			
			============================*/
			
			$(window).on("resize",function(){
				//自适应字体大小设置
				var windowWidth = $(window).width();
				var htmlSize = windowWidth / 6.4;
			
				if(windowWidth<=640){
					$("html").css("font-size",htmlSize+"px");	
				}else{
					$("html").css("font-size","100px");
				}
			}).resize();
			//1rem = 64px;
			//1px = 0.015625rem;
			//10px = 0.15625rem;
			//14px = 0.21875rem;
			//16px = 0.25rem;
			
			/*============================
			
			 	如果是火狐浏览器或IE浏览器，变换盒模型
				
			============================*/
			
			if(isFireFox() || isIe()){
				$(".all_box_h").addClass("all_flex_h").removeClass("all_box_h");
				$(".all_box_s").addClass("all_flex_s").removeClass("all_box_s");	
			}
			
			
			/*============================
			
				模态框插件
				拥有all_model_close类的元素拥有关闭当前所在模态框的功能（加在幕布和关闭按钮上）
				
			============================*/
			
			$(".all_model_close").on("click",function(){
				var $t = $(this);
				if($t.hasClass("all_model")){
					var $t2 = $t.find(".all_model_box");
					$t.fadeOut(300);
					$t2.css("margin-top","0").stop().animate({"margin-top":"-0.2rem"},300);	
				}else{
					var $tp = $t.parents(".all_model");
					var $tb = $tp.children(".all_model_box");
					$tp.fadeOut(300);
					$tb.css("margin-top","0").animate({"margin-top":"-0.2rem"},300);
				}
			});
			//阻止点击模态框本身，误点击到幕布而导致模态框关闭
			$(".all_model_box").on("click",function(e){
				e.stopPropagation();
			});
			
			/*============================
			
				通用tab选项卡插件
			
			============================*/
			$(".u_tabs .u_tabsop").on("click",function(){
				var $t = $(this);
				var $p = $t.parents(".u_tabs");
				
				var page = $t.data("page");
				
				$p.find(".u_tabsop").removeClass("check");
				$p.find(".u_tabspage").removeClass("all_block");
				$t.addClass("check");
				$p.find(".u_tabspage[data-page='"+page+"']").addClass("all_block");
			});
			
			/*============================
			
				通用tab选项卡插件(有动画效果)
			
			============================*/
			$(".u_tabshand .u_tabsop").on("click",function(){
				var $t = $(this);
				var $p = $t.parents(".u_tabshand");
				
				var page = $t.data("page");
	
				var pageold = $(".u_tabshand .u_tabsop.check").data("page");
				if(page == pageold){return;}
				var thefx = "margin-left";
				$p.find(".u_tabsop").removeClass("check");
				$p.find(".u_tabspage").css("display","none");
				$t.addClass("check");
				
				if(page>pageold){//即将出现的page在pageold的右边，应该左移动
					$p.find(".u_tabspage[data-page='"+page+"']").css({"margin":"0","left":"0"}).css("margin-left",".5rem").stop().animate({"margin-left":"0","opacity":"show"},200);
				}
				else{//即将出现的page在pageold的左边，应该右移动
					$p.find(".u_tabspage[data-page='"+page+"']").css({"margin":"0","left":"0"}).css("left","-.5rem").stop().animate({"left":"0","opacity":"show"},200);
				}
				
				$p.find(".u_tabline").css("left",$t.position().left+"px");
			});
			
			/*============================
				多个选项点选效果，可取消
				不用touchend是因为 在一个按钮上按下，手指移动到另一个按钮放开，仍然会触发touchend
				全用click,引入fastclick.js
				
			============================*/
			
			//多个选项点选效果(单选)
			$(".u_dian .dian").on("click",function(){
				var $t = $(this);
				if($t.hasClass("check")){
					$t.removeClass("check");
				}else{
					var $p = $t.parents(".u_dian");
					$p.find(".dian").removeClass("check");
					$t.addClass("check");
				}
			});
			//多个选项点选效果(多选)
			$(".u_dian .dian_duo").on("click",function(){
				var $t = $(this);
				if($t.hasClass("check")){
					$t.removeClass("check");
				}else{
					$t.addClass("check");	
				}
			});
			//多个选项点选效果(多选 最多选两个)
			$(".u_dian .dian_2").on("click",function(){
				var $t = $(this);
				var $p = $t.parents(".u_dian");
				if($t.hasClass("check")){
					$t.removeClass("check check_1 check_2");
					$p.find(".check_2").addClass("check_1").removeClass("check_2");
				}else{
					$p.find(".check_2").removeClass("check check_2");
					$p.find(".check_1").addClass("check_2").removeClass("check_1");
					$t.addClass("check check_1");
				}
			});
		
			/*============================
			
				superradio 超级单选框
				单选框也能取消选择
				(最好用于假的经过包装的选择框，点击radio本身是不能取消选择的)
				
			============================*/
			//superradio绑定在label上
			$(".superradio").on("click",function(){
				var $t = $(this);
				var $i = $t.find("input");
				
				if($i.is(":checked")){
					$i.get(0).checked = false;
					return false;
				}
			});
			$(".superradio input").on("click",function(e){
				e.stopPropagation();
			});
		
			/*============================
			
				包装选择框 JS实现方式
				
			============================*/
			$(".all_label_js").on("click",function(){
				var $t = $(this);
				var $i = $t.find("input");
				
				if($i.is(":checked")){
					if($i.attr("type") == "radio" && !$t.hasClass("superradio_js")){//如果是单选框但不是超级单选框，不允许取消选择的
						return;
					}
					$i.get(0).checked = false;
				}else{
					$i.get(0).checked = true;
				}
			});
			
			/*============================
			
				获取手机验证码按钮被点击
			
			============================*/
			$(".all_markbtn").on("click",function(){
				var $t = $(this);
				if($t.hasClass("marking")){return;}
				
				var alltime = parseInt($t.data("alltime"));
				if(!alltime || alltime<=0){alltime=60;}
				$t.addClass("marking");
				phoneSecurityTime($t,alltime);
			});
		
			/*============================
			
				全部初始化完毕，显示页面
				
			============================*/
			$("img").attr("draggable","false");
			$(".all_boss").css("visibility","visible");
			$(".all_loading").remove();
		},
		/* -- 模态框出现 -- */
		modelShow:function(id){
			var $t = $(".all_model").eq(0);
			if(id){
				$t = $("#"+id);	
			}
			$t.fadeIn(300);
			$t.find(".all_model_box").css("margin-top",".2rem").stop().animate({"margin-top":"0"},300);
		},
		/* -- 模态框隐藏 -- */
		modelHide:function(id){
			var $t = $(".all_model").eq(0);
			if(id){
				$t = $("#"+id);	
			}
			$t.fadeOut(300);
			$t.find(".all_model_box").css("margin-top","0").stop().animate({"margin-top":"-0.2rem"},300);
		},
		/* -- 通用倒计时插件 -- */
		//time:倒计时剩余时间（秒）
		//$t:将剩余时间显示在此对象中
		//callback:时间到了时执行的函数
		timeToZero:function(time,$t,callback){
			$t.text(time);
			if(time<=0){
				if(callback){callback();}
				return;
			}
			time--;
			setTimeout(function(){
				allobj.timeToZero(time,$t,callback);
			},1000);
		},
		/* -- 提示信息 -- */
		toast:function(msg){
			var $t = $("<div class='all_toast all_warp all_b'>"+msg+"</div>");
			$("body").append($t);
			$t.animate({"top":"50%"},200,function(){
				setTimeout(function(){
					$t.animate({"top":"48%"},200,function(){
						$t.remove();	
					});	
				},1500);	
			});		
		},
		/* -- 分钟倒计时 -- */
		//m:分钟
		//s:秒钟
		//t:某个元素，程序将把剩余的时间数显示在此元素中
		//callback:时间到0时的回调函数
		mToZero:function(m,s,t,callback) 
		{ 
			if(!m){
				m=0;	
			}
			if(!s){
				s=0;	
			}
			
			m = parseFloat(m);
			s = parseInt(s);
			
			var time = parseInt(m*60+s);
			m = parseInt(time/60);
			s = parseInt(time-m*60);
			s--;
			if(s<0){
				m--;
				s=59;
			}else if(s<10){
				s="0"+s;	
			}
			$(t).text(m+":"+s);
			
			if(m<=0 && parseInt(s)<=0){
				if(callback){
					callback();	
				}
				return;	
			}else{
				setTimeout(function(){
					allobj.mToZero(m,s,t,callback);
				},1000);
			}
		},
		/* -- 小时倒计时 -- */
		//h:小时
		//m:分钟
		//s:秒钟
		//t:某个元素，程序将把剩余的时间数显示在此元素中
		//callback:时间到0时的回调函数
		hToZero:function(h,m,s,t,callback) 
		{ 
			if(!m){
				m=0;	
			}
			if(!s){
				s=0;	
			}
			
			h = parseFloat(h);
			m = parseFloat(m);
			s = parseInt(s);
			
			var time = parseInt(h*60*60+m*60+s);
			h = parseInt(time/(60*60));
			m = parseInt((time-h*60*60)/60);
			s = parseInt(time-h*60*60-m*60);
			s--;
			if(s<0){
				m--;
				if(m<0){
					h--;
					m=59;	
				}
				s=59;
			}
			
			if(s<10){s="0"+s;}
			if(m<10){m="0"+m;}
			if(h<10){h="0"+h;}
			
			$(t).text(h+"时"+m+"分"+s+"秒");
			
			if(h<=0 && m<=0 && parseInt(s)<=0){
				if(callback){
					callback();	
				}
				return;	
			}else{
				setTimeout(function(){
					allobj.hToZero(h,m,s,t,callback);
				},1000);
			}
		},
		/* -- 天数倒计时 -- */
		//day:天数
		//h:小时
		//m:分钟
		//s:秒钟
		//t:某个元素，程序将把剩余的时间数显示在此元素中
		//callback:时间到0时的回调函数
		dToZero:function(day,h,m,s,t,callback) 
		{ 
			if(!m){
				m=0;	
			}
			if(!s){
				s=0;	
			}
			
			day = parseFloat(day);
			h = parseFloat(h);
			m = parseFloat(m);
			s = parseInt(s);
			
			var time = parseInt(day*24*60*60+h*60*60+m*60+s);
			day = parseInt(time/(60*60*24));
			h = parseInt((time-day*60*60*24)/(60*60));
			m = parseInt((time-day*60*60*24-h*60*60)/60);
			s = parseInt(time-day*60*60*24-h*60*60-m*60);
			s--;
			if(s<0){
				m--;
				if(m<0){
					h--;
					if(h<0){
						day--;
						h=23;	
					}
					m=59;	
				}
				s=59;
			}
			
			if(s<10){s="0"+s;}
			if(m<10){m="0"+m;}
			if(h<10){h="0"+h;}
			
			$(t).text(day+"天"+h+"时"+m+"分"+s+"秒");
			
			if(day<=0 && h<=0 && m<=0 && parseInt(s)<=0){
				if(callback){
					callback();	
				}
				return;	
			}else{
				setTimeout(function(){
					allobj.mToZero(day,h,m,s,t,callback);
				},1000);
			}
		},
		/*
			滚动监听导航
		*/
		initNav:function(){
			var $nav = $('.u_nav');					//导航box
			var $navp = $('.u_sec');				//导航对应的区域box
			var $sec = $nav.find(".u_navb");		//导航中的每一个小圆圈
			var $secp = $navp.find(".u_secp");		//每一个区域
		
			updateNavigation($secp,$nav);
			$(window).on('scroll', function(){
				updateNavigation($secp,$nav);
			});
		
			//点击小圆圈时平滑滚动
			$sec.on('click', function(){
				var $secp = $navp.find(".u_secp[data-p='"+$(this).data("p")+"']");
				if($secp){
					smoothScroll($secp);
				}
			});
		},
		/*
			全屏遮罩提示
			可用于ajax时锁屏
			a:需提示的文字
			b:持续时间，如果为空，表示不会消失
		*/
		sToast:function(a,b){
			if(a){
				$(".all_stoast>div>div").text(a);
			}else{
				$(".all_stoast>div>div").text("请稍后...");
			}
			
			$(".all_stoast").fadeIn(300);
			if(b){
				setTimeout(function(){
					$(".all_stoast").stop().fadeOut(300);	
				},b);	
			}
		},
		sToastHide:function(){
			$(".all_stoast").stop().fadeOut(300);
		},
		/*
			图片预加载
			a:图片完整路径
			b:元素ID 或 元素本身
			如果页面中的img直接使用懒加载，可能此时allobj还没有被加载，将报错
			这种方法适合ajax加载的图片
			或者用手动加载的方法：imglazeload2();
			用手动加载的图片应该是这样的：<img class="all_lazeimg" src="nothing.png" data-src="真实图片路径">
			不要用onload=...
		*/
		imglazeload:function(a,b){
			var img=new Image();
			var t;
			if(typeof(b) == "object"){
				t = $(b);	
			}else{
				t = $("#"+b);	
			}
			//加载完毕时触发
			img.onload = function(){
				img.onload = null;
				t.css({"background-image":"none","background-color":"transparent"}).attr("src",this.src);
				img = null;
			}
			
			//加载出错时触发
			img.onerror = function(){
				img = null;
			}
			
			img.src=a;

			//如果图片已经加载成功 则直接返回
			if(img.complete){
				//img = null; 如果已有缓存 此处直接就为true,但还没有执行img.onload方法，浏览器再执行img.onload
				return;
			}
		
		},
		/*
			手动启动图片预加载
			在页面加载完毕后调用allobj.imglazeload2();
			将找到所有.all_lazeimg，这些元素上如果有data-src属性，则会被懒加载
		*/
		imglazeload2:function(){
			$(".all_lazeimg").each(function(index, element) {
				var src = $(element).data("src");
				if(src){
					allobj.imglazeload(src,element);
				}
			});	
		},
		/* rem to px */
		rem2px:function(a){
			return parseFloat($("html").css("font-size"))*a;
		},
		/*
			生成两个数之间的随机正整数
			min:最小数
			max:最大数
		*/
		random:function(min,max){
			return Math.floor(Math.random()*(max-min+1)+min);
		},
		/* -- 表单验证初始化 -- */
		//需要将容器div设置为class="locheck"
		//lo_int:必须为整数
		//lo_phone:正确的手机号码
		//lo_nonull:非空验证
		//lo_pwd:密码位数验证（非空6-18位）
		//lo_pwdr:密码重复验证
		//lo_checked:多选框或单选框是否已选中验证
		//lo_email:正确的邮箱
		//lo_yzm:两个验证码的值是否相同，需将正确验证码的值绑定到当前input上：data-yzm="正确验证码"
		
		//.lodiv(input组合容器,里面应该包括input,正确的提示，错误的提示)
		//.loisok(正确提示的容器)
		//.loisno(错误提示的容器)
		locheckInit:function(){
			var $lo = $(".locheck");
			$lo.find(".lo_int").on("keyup blur",function(){loint(this);});
			$lo.find(".lo_phone").on("keyup blur",function(){lophone(this);});
			$lo.find(".lo_nonull").on("keyup blur change",function(){lononull(this);});
			$lo.find(".lo_pwd").on("keyup blur",function(){lopwd(this);});
			$lo.find(".lo_pwdr").on("keyup blur",function(){lopwdr(this);});
			$lo.find(".lo_checked").on("change",function(){lochecked(this);});
			$lo.find(".lo_email").on("keyup blur",function(){loemail(this);});
			$lo.find(".lo_yzm").on("keyup blur",function(){loyzm(this);});
			
			$lo.find(".loisok,.loisno").addClass("all_none");
		},
		//对当前整个locheck区域进行验证
		lobegincheck:function(t){
			var $t = $(t);
			var $p = $t.parents(".locheck");
			$p.find(".lo_int,.lo_phone,.lo_nonull,.lo_pwd,.lo_pwdr,.lo_email,.lo_yzm").trigger("keyup");
			$p.find(".lo_checked").trigger("change");
			
			var $temp = $p.find(".lonopass");
			if($temp.length<=0){
				return true;	
			}else{
				return false;	
			}
		}
	};
	
	/* ---- 私有方法 和 私有属性 ---- */
	
	//是否是火狐浏览器
	function isFireFox(){
		var r = /firefox/;
		return r.test(navigator.userAgent.toLowerCase());	
	}
	//是否是IE浏览器
	function isIe(){
		return ("ActiveXObject" in window);
	}
	var j=0;
	/* -- 下面是表单验证的相关方法 -- */
	//是否是整数
	function loint(t){
		var v = $(t).val();
		var reg =/^-?[1-9]\d*$/;
		var isok = !!reg.test(v);
		loshow(t,isok);
		j++;
		return isok;
	}
	//是否是正确的手机号码
	function lophone(t){
		var v = $(t).val();
		var reg = /^[1][358][0-9]{9}$/g;
		var isok = !!reg.test(v);
		loshow(t,isok);
		return isok;	
	}
	//是否为非空(非空返回true,空返回false)
	function lononull(t){
		var v = $(t).val();
		var isok = !!v;
		loshow(t,isok);
		return isok;
	}
	//密码位数验证(自动去掉空格)
	function lopwd(t){
		var v = $(t).val();
		var reg = /^[^\s]{8,20}$/g;
		var isok = !!reg.test(v);
		
		//关联触发密码repeat验证
		$(t).parents(".locheck").find(".lo_pwdr").trigger("keyup");
		loshow(t,isok);
		return isok;
	}
	//密码repeat验证
	function lopwdr(t){
		var $t = $(t);
		var $t2 = $t.parents(".locheck").find(".lo_pwd").eq(0);
		var v1 = $(t).val();
		var v2 = $t2.val();
		if(v1 && v1 == v2){
			loshow(t,true);
			return true;
		}else{
			loshow(t,false);
			return false;	
		}
	}
	//单选框或复选框是否已选中
	function lochecked(t){
		var isok = $(t).is(':checked');
		loshow(t,isok);
		return isok;
	}
	//正确的邮箱
	function loemail(t){
		var v = $(t).val();
		var reg  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var isok = !!reg.test(v);
		loshow(t,isok);
		return isok;
	}
	//两个验证码是否相同
	function loyzm(t){
		var $t = $(t);
		var yzm = $t.data("yzm");
		var v = $t.val();
		if(yzm == v){
			loshow(t,true);
			return true;	
		}else{
			loshow(t,false);
			return false;	
		}
	}
	
	/* -- 验证过后自动改变效果 -- */
	function loshow(t,isok){
		var $t = $(t);
		var $p = $t.parents(".lodiv");
		if(isok){
			$p.find(".loisok").removeClass("all_none");
			$p.find(".loisno").addClass("all_none");
			$t.removeClass("lonopass");
		}else{
			$p.find(".loisok").addClass("all_none");
			$p.find(".loisno").removeClass("all_none");
			$t.addClass("lonopass");
		}
	}
	
	/* -- 滚动监听导航专用 -- */
	function updateNavigation($secp,$nav) {
		$secp.each(function(){
			var $t = $(this);
			var $b = $nav.find(".u_navb[data-p='"+$t.data("p")+"']");
			if ( ( $t.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $t.offset().top + $t.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
				$b.addClass('check');
			}else {
				$b.removeClass('check');
			}
		});
	}
	function smoothScroll(target) {
		$('body,html').animate({'scrollTop':target.offset().top},600);
	}
	
	/* -- 手机验证码按钮倒计时效果 -- */
	function phoneSecurityTime(o,p) {//o为按钮的对象，p为倒计时剩余时间
		if (p <= 0){ 
			o.removeClass("marking"); 
			o.text("重新获取");//改变按钮中value的值 
		}else{ 
			o.addClass("marking");//倒计时过程中禁止点击按钮 
			o.text("重新获取("+p+")");//改变按钮中value的值 
			p--; 
			setTimeout(function(){phoneSecurityTime(o,p);}, 1000);
		} 
	}
	
	window.top.allobj = allobj;
})(jQuery);


/* -- 页面加载完毕时触发 -- */
$(function(){
	//页面各种初始化
	allobj.init();
	//有表单的页面启动表单验证
	allobj.locheckInit();
	//初始化滚动监听菜单
	allobj.initNav();
	
	//allobj.mToZero(2.5,40.5,document.getElementById("ss"));
});
