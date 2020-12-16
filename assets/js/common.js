$(document).ready(function () {
  var _pcGnb = $('#pcGnb  > ul');
  var _dep2Ul = _pcGnb.find('li ul'); //gnb : depth2 ul
  var _mGnb = $('#mHeader .mgnb_wrap');
  var _m_dep1 = _mGnb.find('.m_menu > ul');

  //네비게이션
  // $(window).on('resize', function () {
  //   var winWidth = $(window).width();
  //   if (winWidth > 1080) {  //pc일 경우
  //     $('#wrap').children().find('#mHeader').css({display : 'none'});
  //   } else {    //모바일일 경우
  //     $('#wrap').children().find('#pcHeader').css({display : 'none'});
  //   }
  // });
  // $(window).trigger('resize');

  //pc 네비 on
  $('#pcHeader').on({
    mouseenter: function () {
      $(this).addClass('on');
    },
    mouseleave: function () {
      $(this).removeClass('on');
    }
  });

  //pc 네비게이션
  //1) depth2 ul  모두 숨기고 시작
  _dep2Ul.hide();
  //2)depth1 ul에 마우스 진입과 나가기
  _pcGnb.hover(
    function () { //moseenter
      _dep2Ul.stop().slideDown();
    },
    function () { //mouseleave
      _dep2Ul.stop().slideUp(function () {
        gnbReturn()
      });
    }
  );
  //3)depth1 li에 마우스, 포커스 진입
  _pcGnb.children().on('mouseenter focusin', function () {
    _dep2Ul.stop().slideDown(); //포커스제어 필요
    $(this).addClass('on').siblings().removeClass('on');
  });

  function gnbReturn() {
    //열려진 컨텐츠 초기화, li.on 제거
    _dep2Ul.stop().slideUp();
    _pcGnb.find('>li.on').removeClass('on');
  }
  //5)첫번째와 마지막 a 에서 포커스가 떠나기
  _pcGnb.find('a:first, a:last').on('blur', function () {
    setTimeout(function () {
      if (!_pcGnb.find('a').is(':focus')) gnbReturn();
    }, 10);
  });

  // 모바일 네비게이션
  // $(window).on('scroll', function () {
  //   var scrollY = $(this).scrollTop();
  //   console.log(scrollY);
  //   if (scrollY > 0) $('#mHeader').addClass('on');
  //   else $('#mHeader').removeClass('on');
  // });

  //모바일 네비게이션
  _mGnb.find('.dep2').hide();
  $('#mHeader .on_top button').on('click', function () {
    //모바일 on off
    $(this).parent().parent().toggleClass('on'); //#mHeader.on
    if ($(this).hasClass('on')) { //열려진 경우라면
      _mGnb.stop().animate({
        left: '-100%'
      }, 300, function () {
        $(this).css({
          visibility: 'hidden'
        }).find('.dep1 > li.on').removeClass('on').children('.dep2').hide();
        
      });
      $(this).removeClass('on').children('.blind-b').text('메뉴 열기');
    } else { //닫겨진 경우라면
      $(this).addClass('on').children('.blind-b').text('메뉴 닫기');
      var _first = _mGnb.find('.mgnb_wrap .first');
      var _last = _mGnb.find('.mgnb_wrap .last');

      _mGnb.css({
        visibility: 'visible'
      }).stop().animate({
        left: 0
      }, 300, function () {
        _first.focus(); //대상 엘리먼트에 포커스를 강제로 이동
      });
    }

    _m_dep1.find('>li>a').on('click', function () {
      if ($(this).next().size() === 0) { //depth1 <a>만 있는 경우
        location.href = $(this).attr("href");
      } else { //depth2 <ul>도 있는 경우
        //초기화 : 미리 열려진 컨텐츠 처음으로 되돌리기
        $(this).parent().siblings().removeClass('on').find('ul').stop().slideUp(600);
        $(this).next().stop().slideToggle(600).parent().toggleClass('on');
      }
      return false;
    });

    // _m_dep1.find('> li > a').on('click', function (e) {
    //   e.preventDefault ();
    //   if(!$('_m_dep1>li').hasClass('on')) {
    //     if($('_m_dep1>li').next().hasClass('dep2')) {
    //      _m_dep1.find('>li.on').removeClass('on').children('ul').stop().slideUp('fast');
    //      _m_dep1.find('.dep2 > li.on').removeClass('on').children('ul').stop().slideUp('fast');
    //     }
    //     else{
    //      _m_dep1.find('.dep2 > li.on').removeClass('on').parent('ul').stop().slideUp('fast');
    //     }
    //     $(this).next().stop().slideDown('fast').parent().addClass('on');
    //   }
    //   else{
    //     $(this).next().stop().slideToggle('fast').parent().toggleClass('on');
    //   }
    // });

    var _first = _mGnb.find('.first');
    var _last = _mGnb.find('.last');
    _first.on('keydown', function (e) {
      // console.log(e.keyCode); tab키
      if (e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        _last.focus();
      }
    });
    _last.on('keydown', function (e) {
      if (!e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        _first.focus();
      }
    });
  });
});