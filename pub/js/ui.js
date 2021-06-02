$(function(){
    gnbActive();
    mainSlide();
    scrollActive();
	todayPopup()
    thumbHover();
    flowerAct();
    popupUI();
	$( "#progressbar" ).progressbar({
      value: 37
    });
	btnActive();
  })
var cookiedata = document.cookie;
function setCookie(name, value, expiredays) {
var todayDate = new Date();
todayDate.setDate(todayDate.getDate() + expiredays);
cookiedata = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}
function todayPopup() {
	var $speed = 500;
	var popList = [];
	if ($('.pop_today').length > 0) {
		$('.pop_today').each(function() {
			var $id = $(this).attr('id');
			popList.push($id);
		});
	}
	$('.pop_today .btn_close').click(function(e) {
		e.preventDefault();
		var chk = $(this).closest('.pop_today').find('.todayChk'), 
			$id = $(this).closest('.pop_today').attr('id');

		if (chk.is(':checked')) {
			setCookie($id, 'done', 1);
		}
		popClose($('#' + $id))
	});
	for (var i in popList) {
		var $tar = $('#' + popList[i]);
		if (cookiedata.indexOf(popList[i] + '=done') < 0) {
			popOpen($tar);
			}
		}
		
	}
 function gnbActive(){
     var $gnbBtn = $('.btn_gnb'),
		 $gnb = $('.main_gnb'),
         $gnbLi =  $('.main_gnb > li'),
         $gnbDiv = $('.main_gnb > li > div'),
         $mSize = 760,
		 $gnb_1depth = $('.gnb_1depth'),
         $gnbA = $('.main_gnb > li > a'),
         $this = $(this);

		
		$gnb_1depth.bind('mouseenter focus',function(){
			var $wid = $(window).width();
			if($wid > 760){
				var $this = $(this);
				gnbReset();
				$this.siblings('.gnb_depth2').show();
			}
		});
		$gnb_1depth.bind('click',function(e){
			var $wid = $(window).width();
			
			if($wid < 760){
				$this = $(this);
				e.preventDefault();
				//$gnb_1depth.removeClass('web_1depth');	
				
				$this.parent('li').toggleClass('mdepth1_on');
				
				$this.siblings('.gnb_depth2').slideToggle();
				$('.gnb_depth2:visible').not($this.siblings('.gnb_depth2')).slideUp(function(){
					$(this).parents('.gnb_depth1').removeClass('mdepth1_on');
				});
			}
		});
		$gnb.mouseleave(function(){
			gnbReset();
		});

		function gnbReset(){
			var $wid = $(window).width();
			if($wid > 760){
				var $gnb_1depth = $('.gnb_1depth');
				$('.gnb_depth2').hide();
			}
		};

		/*
         $(window).bind('load resize',function() {
                $gnbLi.bind('mouseover',function(){
					$gnbDiv.hide();
					$(this).find('div').show();
                })
                $gnbLi.bind('mouseleave',function(){
					$gnbDiv.hide();
                })
        })*/
        $gnbBtn.bind('click',function(e){
            e.preventDefault();
			$('body').toggleClass('gnb_open');
        })
 }
 function mainSlide(){
     $(".owl-carousel").owlCarousel({
         loop:true,
         nav:true,
		 center:true,
		 margin:10,
         items:1,
         autoplay:true,
         autoplayTimeout:2000,
         autoplayHoverPause:true,
		 autoWidth:true
     })
 }
 function scrollActive(){
     var $quick = $('.quick'),
         $hd = $('header'),
         $body = $('body'),
         $mSize = 760;
		$(window).on('load scroll resize',function() {
			if($(window).width() > $mSize){
			//console.log($(window).scrollTop())
			if ($(window).scrollTop() > $hd.innerHeight()){
				$body.addClass('sticky')
				return false;
			} else { 
				$body.removeClass('sticky')
			}
		}
		})
         
 }
function thumbHover(){
    var $thumbWrap = $('.join_people ul li span'); 
    $('.join_people li a').hover(function(){
        var $this = $(this),
            currentImg = $this.children('img').attr('src'),
            currentPerson = $this.children('img').attr("alt");
            
        $thumbWrap.removeClass('active');
        $this.parents('span').addClass('active');
        $('.join_people_detail img').attr('src',currentImg).removeClass('animated_faster flipInY2').addClass('animated_faster flipInY2');
        $('.join_people_detail strong').html(currentPerson);
    },function(){
       // $('.join_people_detail img').removeClass('animated_faster flipInY2');
        $thumbWrap.removeClass('active');
    })
}
function flowerAct(){
    setTimeout(function(){
        //Start the snow default options you can also make it snow in certain elements, etc.
        var bannerImages=["/etc/images/flower_01.png", "/etc/images/flower_04.png", "/etc/images/flower_03.png"];
        var winWidth = $(window).width();
        if(winWidth > 500){
            $(".menu3").snowfall({
                image :bannerImages[0], minSize: 15, maxSize:32, flakeCount:6, maxSpeed:2
            }).snowfall({
                image :bannerImages[1], minSize: 15, maxSize:32, flakeCount:6, maxSpeed:2
            }).snowfall({
                image :bannerImages[2], minSize: 15, maxSize:32, flakeCount:3, maxSpeed:2
            });
        }else{
            $(".menu3").snowfall({
                image :bannerImages[0], minSize: 10, maxSize:20, flakeCount:4, maxSpeed:1
            }).snowfall({
                image :bannerImages[1], minSize: 10, maxSize:20, flakeCount:4, maxSpeed:1
            }).snowfall({
                image :bannerImages[2], minSize: 10, maxSize:20, flakeCount:2, maxSpeed:1
            });
        }
    });
}

//팝업
var $popSpeed = 300,
	$popEase = 'easeOutQuart',
	$popOpenBtn = '';
var popupUI = function(){
	$('.pop_open').on('click',function(e) {
		e.preventDefault();
		var $pop = $(this).attr('href');
		popOpen($pop,this);
	});
	$('.pop_close').on('click',function(e) {
		e.preventDefault();
		var $pop = $(this).closest('.pop_bg');
		popClose($pop);
	});
	
	$('.pop_bg').on('click',function(){
		var $pop = $(this);
		if(!$pop.hasClass('close_none')){popClose($pop);}
	}).on('click','.pop_wrap',function(e) {
		e.stopPropagation();
	});

	$(window).on('load',function(){
		$('.pop_open').each(function(){
			if($(this).hasClass('pop_load')){
				$(this).trigger('click');
			}
		});
	});
};
var popOpen = function(tar,btn){
	var $visible = $('.pop_bg:visible').size();

	if(btn != null || btn != window)$popOpenBtn = $(btn);
	if($visible > 0){
		$(tar).css('z-index','+='+$visible);
	}else{
		$('body').addClass('hidden');	
	}	
	$(tar).fadeIn($popSpeed,function(){
		if(btn != null)$(this).attr({'tabindex':0}).focus();
	});
	popPositin(tar,$popSpeed);
	$(window).on('resizeEnd',function(){
		popPositin(tar,$popSpeed);
	});
};
var popClose = function(tar){
	var $visible = $('.pop_bg:visible').size();
	if($visible == 1){
		$('body').removeClass('hidden');
	}
	$(tar).find('.pop_wrap').animate({'margin-top':0},$popSpeed,function(){
		$(this).removeAttr('style');
	});
	$(tar).fadeOut($popSpeed,function(){
		$(tar).removeAttr('style tabindex');
		if($popOpenBtn != ''){
			if($popOpenBtn != window){				
				$popOpenBtn.focus();
			}
			$popOpenBtn = '';
		}
	});
};
var popPositin = function(tar,speed){
	var $wrapH = $(tar).height(),
		$pop = $(tar).find('.pop_wrap'),
		$popH = $pop.outerHeight(),
		$mT = Math.max(0,($wrapH-$popH)/2);

	if(speed > 100){
		$pop.stop().animate({'margin-top':$mT},speed);
	}else{
		$pop.css({'margin-top':$mT});
	}
};

function btnActive() {
	$('.button').click(function(e){
		var $btnEl = $(this),
			$delay = 650;

		if(!$btnEl.hasClass('disabled')){
			if($btnEl.find('.btn-click-in').length == 0) $btnEl.prepend('<i class="btn-click-in"></i>');
			var $btnIn = $btnEl.find('.btn-click-in'),
				$btnMax = Math.max($btnEl.outerWidth(),$btnEl.outerHeight()),
				$btnX = e.pageX - $btnEl.offset().left - $btnMax/2,
				$btnY = e.pageY - $btnEl.offset().top - $btnMax/2;
				
				$btnIn.css({
					'left':$btnX,
					'top':$btnY,
					'width':$btnMax,
					'height':$btnMax
				}).addClass('animate').delay($delay).queue(function(next){
					$btnIn.remove();
					next();
				})
		}
	})
}
