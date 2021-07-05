$(document).ready(function() {
  
    $('li.has-subs').hover(
       function () {
         $('html').addClass('nav-is-ready');
         $(this).addClass('link-is-active');
       }, 
       function () {
          $('html').removeClass('nav-is-ready');
          $(this).removeClass('link-is-active');
       }
    );
          
    
     /* Mobile Nav */
  
      $('.mb-burger-icon').click(function(e) {
  
          $('html').toggleClass('overh');
          $('#MobileNav').toggleClass('hide show');
          $('a[nav-lvl-three="ok"]').parent().parent().addClass('show');
          $('a[nav-lvl-three="ok"]').parent().parent().parent().find('.togglenewmob.lvltwomob span.mobile-nav__label').addClass('bold');
          $('a[nav-lvl-three="ok"]').parent().parent().parent().find('.togglenewmob.lvltwomob .mobile-nav__icon').addClass('mobchiv-up');
          $('a[nav-lvl-two="ok"]').parent().parent().addClass('show');
          $('a[nav-lvl-a="ok"][aria-current="page"]').parent().parent().parent('.li-lvlone').find('.togglenewmob.lvlonemob span.mobile-nav__label').addClass('bold');
          $('a[nav-lvl-a="ok"][aria-current="page"]').parent().parent().parent('.li-lvlone').find('.togglenewmob.lvlonemob .mobile-nav__icon').addClass('mobchiv-up');
          $('a[nav-lvl-a="ok"][aria-current="page"]').parent().parent().parent('.li-lvlone').find('ul.innercontent[data-level="2"]').addClass('show');
          $('a[nav-lvl-a="ok"][aria-current="page"]').parent().parent().parent('.li-lvlone').find('ul.innercontent[data-level="2"] li').siblings('.li-lvltwo').first().find('.togglenewmob.lvltwomob .mobile-nav__icon').addClass('mobchiv-up');
          $('a[nav-lvl-a="ok"][aria-current="page"]').parent().parent().parent('.li-lvlone').find('ul.innercontent[data-level="2"] li').siblings('.li-lvltwo').first().find('.togglenewmob.lvltwomob span.mobile-nav__label').addClass('bold');
          $('a[nav-lvl-a="ok"][aria-current="page"]').parent().parent().parent('.li-lvlone').find('ul.innercontent[data-level="2"] li').siblings('.li-lvltwo').first().find('ul.innercontent[data-level="3"]').addClass('show');
      });
  
      $('#mob-mnu-close').click(function(e) {
          $('html').toggleClass('overh');
          $('#MobileNav').toggleClass('hide show');        
      });
  
      $('.togglenewmob').click(function(e) {
          e.preventDefault();       
          let $this = $(this);
          if ($this.next().hasClass('show')) {
              $this.next().removeClass('show');
          } else {
              $this.parent().parent().find('li .innercontent').removeClass('show');
              $this.next().toggleClass('show');
          }
      });
  
      $('.lvlonemob').click(function(e) {
          e.preventDefault();
          $('.li-lvltwo span.mobile-nav__label').removeClass("bold");
          $('.li-lvltwo .lvltwomob-chiv').removeClass('mobchiv-up');
          if ( $(this).find('.lvlonemob-chiv').hasClass('mobchiv-up') ) { 
              $('.mobile-nav__label').removeClass("bold");
              $('.lvlonemob-chiv').removeClass('mobchiv-up');
          }
          else {
              $('.lvlonemob-chiv').removeClass('mobchiv-up');
              $('.lvlonemob .mobile-nav__label').removeClass("bold");
              $(this).find('.mobile-nav__label').addClass("bold");
              $(this).find('.lvlonemob-chiv').addClass("mobchiv-up");
  
          };
          $(this).parent('.li-lvlone').find('ul.innercontent[data-level="2"] li').siblings('.li-lvltwo').first().find('ul.innercontent[data-level="3"]').addClass('show');
          $(this).parent('.li-lvlone').find('ul.innercontent[data-level="2"] li').siblings('.li-lvltwo').first().find('.togglenewmob.lvltwomob .mobile-nav__label').addClass('bold');
          $(this).parent('.li-lvlone').find('ul.innercontent[data-level="2"] li').siblings('.li-lvltwo').first().find('.togglenewmob.lvltwomob .mobile-nav__icon').addClass('mobchiv-up');       
      });
  
      $('.lvltwomob').click(function(e) {
          e.preventDefault();        
          if ( $(this).find('.lvltwomob-chiv').hasClass('mobchiv-up') ) { 
              $('.lvltwomob .mobile-nav__label').removeClass("bold");
              $('.lvltwomob-chiv').removeClass('mobchiv-up');
          }
          else {
              $('.lvltwomob-chiv').removeClass('mobchiv-up');
              $('.lvltwomob .mobile-nav__label').removeClass("bold");
              $(this).find('.mobile-nav__label').addClass("bold");
              $(this).find('.lvltwomob-chiv').addClass("mobchiv-up");
          };       
      });
  
   /* End Mobile Nav */  
    
  
  $(function(e)
  {
      $(".addqty").click(function()
      {
          var currentVal = parseInt($(this).prev(".qtycart").val());
          if (currentVal != NaN)
          {
              $(this).prev(".qtycart").val(currentVal + 1);
          }
      });
  
      $(".minusqty").click(function()
      {
          var currentVal = parseInt($(this).next(".qtycart").val());
          if (currentVal != NaN)
          {
              if(currentVal > 0){
                      $(this).next(".qtycart").val(currentVal - 1);
                  }
  
          }
      });
  });
    
    
    $('.mb-cart-flex').click(function(){
    
        $('.mini-cart-content').toggleClass('hide');
    
    });
    
  });/* End Doc ready */  
    