$(document).ready(function() {
    var _acco = $('.hillAccodion');
    var panelWid = 970;
  
    //사이즈에 변화가 생길때 마다 pc/mobile 버전을 체크하여 body.pc / body.mobile 이라고 함
    $(window).on('resize', function () {
      var winWidth = $(window).width();
      if (winWidth > 1080) {  //pc일 경우
        $('body').removeClass('mobile').addClass('pc');
        //다른 버전에서 스크립트를 통해 스타일을 적용시킨 것을 초기화 한다
        _acco.find('.accopanel').removeAttr('style');
        //활성화된 버튼과 인접한 패널은 열어주고 시작한다
        _acco.find('.complex.on + .accopanel').show().css({width: panelWid});
      } else {    //모바일일 경우
        $('body').removeClass('pc').addClass('mobile');
        //다른 버전에서 스크립트를 통해 스타일을 적용시킨 것을 초기화 한다
        _acco.find('.accopanel').removeAttr('style');
        //활성화된 버튼과 인접한 패널은 열어주고 시작한다
        _acco.find('.complex.on + .accopanel').show();
      }
    });
    $(window).trigger('resize');
  
    //1) 로딩 설정
    _acco.find('.complex:first').addClass('on').next().show().attr('tabIndex', 0);
    _acco.find('.complex:first .accoheader').attr({'aria-expanded': true, 'aria-disabled': true}).parent().siblings('.complex').children().attr('aria-expanded', false);
  
    //pc일 경우만 가로 크기를 0에서 지정한 사이즈로 넓혀 준다
    if ( $('body').hasClass('pc') ) {
      _acco.find('.accopanel:first').css({width: panelWid});
    }
  
    //2) 키보드 제어는 동일함 keydown : 왼쪽37, 오른쪽39 / 상단38, 하단40, home36, end35, spacebar enter(click 이벤트로 대체->a나button 일 때만 되는것 같음)
    _acco.find('.complex .accoheader').on('keydown', function (e) {
        var key = e.keyCode;
        console.log(key);
  
        switch (key) {
          case 39:    //오른쪽 방향키
          case 40:    //하단 방향키
            e.preventDefault();
            if ($(this).hasClass('last')) $(this).closest('.hillAccodion').find('.complex .first').focus();
            else $(this).parent().next().next().children().focus();
            break;
          case 37:    //왼쪽 방향키
          case 38:    //상단 방향키
            e.preventDefault();
            if ($(this).hasClass('first')) $(this).closest('.hillAccodion').find('.complex .last').focus();
            else $(this).parent().prev().prev().children().focus();
            break;
          case 36:    //home방향키
            e.preventDefault();
            $(this).closest('.hillAccodion').find('.complex .first').focus();
            break;
          case 35:    //end방향키
            e.preventDefault();
            $(this).closest('.hillAccodion').find('.complex .last').focus();
            break;
        }
    });
  
    //3 마우스 제어 : 다시 클릭시 닫겨지지 않음 => 부모 .complex가 .on을 가지지 않을 경우만 제어
    _acco.find('.complex .accoheader').on('click', function () {
      if ( !$(this).parent().hasClass('on') ) {
        $(this).attr({'aria-expanded': true, 'aria-disabled': true}).parent().addClass('on').siblings('.complex.on').removeClass('on').children().attr('aria-expanded', false).removeAttr('aria-disabled');
  
        //아코디언 패널은 pc와 모바일 버전 각기 다르게 작성한다
        if ( $('body').hasClass('pc') ) {
          $(this).parent().next().css('display', 'block').stop().animate({width: panelWid}, 'fast').attr('tabIndex', 0).siblings('.accopanel').stop().animate({width: 0}, 'fast', function () {
            $(this).css('display', 'none').attr('tabIndex', -1);
          });
        } else {
          $(this).parent().next().stop().slideDown('fast').attr('tabIndex', 0).siblings('.accopanel').stop().slideUp('fast').attr('tabIndex', -1);
        }
      }
    });
  });