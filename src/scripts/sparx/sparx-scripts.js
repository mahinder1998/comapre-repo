const SparxScripts = (() => {
    return {

        init: function() {

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
                      $('#mb-mob-nav-cont').toggleClass('hide show');
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
                
              
               $(function (e) {
                $(".addqty").click(function () {
                  var currentVal = parseInt($(this).prev(".qtycart").val());
    
                  if (currentVal != NaN) {
                    $(this).prev(".qtycart").val(currentVal + 1);
                  }
                });
                $(".minusqty").click(function () {
                  var currentVal = parseInt($(this).next(".qtycart").val());
    
                  if (currentVal != NaN) {
                    if (currentVal > 1) {
                      $(this).next(".qtycart").val(currentVal - 1);
                    }
                  }
                });
              });
                
                
                $('.mb-cart-flex').click(function(){
                    $('.mini-cart-content').toggleClass('hide'); 
                });
                  
                // $('.mb-cart-flex').click(function () {
                //     if($('.mini-cart-content').hasClass("hide")) {
                //       $('.mini-cart-content').removeClass('hide');
                //     } else {
                //       $('.mini-cart-content').addClass('hide');
                //     } 
                // });
                    
                // $(document).on("click",".mb-cart-flex",function(event) {
                //   event.stopPropagation();
                //   event.stopImmediatePropagation();
                //   event.preventDefault();
                // });

                // $(".mb-dt-nav-cont li").hover(function() {
                //   jQuery(".mini-cart-content").addClass("hide");
                // });
                
                

            });/* End Doc ready */  
              
            
            // Sahid 
            $(document).ready(function(){
                if($(window).width()<750){
                  $(".footer-header").click(function () {
                    
                    if($(this).parents(".footer-item").hasClass("active-item")) {
                      $(".footer-item").removeClass("active-item");
                      $(".footer-body").slideUp("slow");
                    } else {
                     
                      $(".footer-item").removeClass("active-item");
                      $(".footer-body").slideUp("slow");
                      $(this).parents(".footer-item").addClass("active-item");
                      $(this).next(".footer-body").slideDown("slow");
              
                    }
                  });
                }
                
                // Account address code here
                $("#AddressNewButton").click(function () {
                      $("#AddressNewForm").toggle();
                  });
              }); 
            
            
            
            // Harshita 
            $(document).ready(function () {
              
              
                // search box toggle js
                  $("#searchbar .search-label").on("click", function (e) {
                      e.preventDefault();
                      $("#searchbar").toggleClass("collapsed");
                  });
                
                // product search js
                  $(".search-input").bind("keyup", function (e) {
                      if (this.value.length < 3) {
                          // console.log(this.value.length);
                          //$("#productData").html('');
                          //$("#viewResults").html('');
                          $(".search-result-weap").hide();
                      } else if (this.value.length >= 3) {
                          var searchKeyword = this.value;
                          //$(".search-result-weap").show();
                      }
              
                      jQuery
                          .getJSON("/search/suggest.json", {
                              q: searchKeyword,
                              resources: {
                                  type: "product",
                                  options: {
                                      unavailable_products: "last",
                                      fields: "title,product_type,variants.title",
                                  },
                              },
                          })
                          .done(function (response) {
                              var productSuggestions = response.resources.results.products;
                              var pro_length = productSuggestions.length;
                              //var finalColldata = productSuggestionsColl[0];
                              var notFoundmessage = 0;
                              //console.log(finalColldata.id);
                              if (productSuggestions.length > 0) {
                                  var str = "";
                                  var show_counter = 1;
                                  for (var i = 0; i < pro_length; i++) {
                                    if (show_counter <= 3) {
                                      $(".search-result-weap").show();
                                      var firstProductSuggestion = productSuggestions[i];
                                      str += '<a href="' + firstProductSuggestion.url + '" class="search-result-items"><div class="get-product-image"><img src="' + firstProductSuggestion.image + '"></div>' + '<div class="get-product-title">' + firstProductSuggestion.title + "</div>" + '<div class="get-product-price">' + firstProductSuggestion.price + "</div></a>"; //console.log("The title of the first product suggestion is: " + firstProductSuggestion.id);
                                      //console.log(firstProductSuggestion.title);
                  
                                      show_counter = show_counter + 1;
                                    }
                                  }
                                  $(".productData").html(str);
              
                                  if (pro_length > 3) {
                                      $(".viewResults").html("More Results");
                                  }
                                  $(".customSearchredirect").attr("href", "https://molton-dev.myshopify.com/search?q=" + searchKeyword + "&type=product");
                              } else {
                                  notFoundmessage = notFoundmessage + 1;
                                  //$("#productData").html('Sorry no result found');
                              }
                          });
                  });
                
                 // account page tab js
                   $(".tabs-main li").click(function () {
                        var tab_id = $(this).attr("data-tab");
              
                        $(".tabs-main li").removeClass("current");
                        $(".tabs-items").removeClass("current");
                        $(this).addClass("current");
                        $("." + tab_id).addClass("current");
                    });
              
                    $(".template-customers-addresses .tabs-main li.current").click(function () {
                        $(".template-customers-addresses .my_address").addClass("current");
                    });
              
                    // customer order tab
                    var url = window.location.href;
                    var pageURL = url.split("#").pop();
                    var splitvalue = pageURL.split("+");
                    //alert(pageURL);
                    if (pageURL == "my_order") {
                        $(".tab-link").removeClass("current");
                        $(".tabs-items").removeClass("current");
                        $("#my_order").parent().addClass("current");
                        $(".my_order").addClass("current");
                    }
               
                
                
                
              });
            
            
            // Deepak
            $( document ).ready(function() {
                $(".toggle-password").click(function() {
                  $(this).toggleClass("fa-eye fa-eye-slash");
                  var input = $('.password-splash');
                  if (input.attr("type") == "password") {
                    input.attr("type", "text");
                  } else {
                    input.attr("type", "password");
                  }
                });
              
              
                $(".toggle-password-conf").click(function() {
                  $(this).toggleClass("fa-eye fa-eye-slash");
                  var input = $('.password-splash-conf');
                  if (input.attr("type") == "password") {
                    input.attr("type", "text");
                  } else {
                    input.attr("type", "password");
                  }
                });
              
              
                var inputError=false;
                $(".password-splash-conf").on('keyup',function(event){
                  if(event.target.value!=document.getElementById('RegisterForm-password').value){
                    console.log('ppp');
                    inputError=true;
                  } else{
                    inputError=false;
                    $('error-msg').hide();
              
                  }
                });
              
                $(document).on('click',function(event){
              
                  if(inputError){
                    $('.error-msg').show();
                  }
                });                            
                // cart page cart note count
                $("#CartSpecialInstructions").on('keyup', function() {
                  $("#countcharacter").text((250 - $(this).val().length) + " Characters");
                });
              
              
              });
              window.Currency = window.Currency || {};

              jQuery(document).on("click",".updateqty",function(event){
                    var value = $(this).siblings('.cart-quantity').val();
                    var itemIndex = $(this).attr('qty-index');
                  _updateItemQuantity(itemIndex,value);
              });
              function _updateItemQuantity(itemIndex,value) {                            
                  $.getJSON('/cart.js').then(function(cart) {
                      $.ajax({
                            type: 'POST',
                            url: '/cart/change.js',
                                  data: { quantity: value, line: itemIndex },
                              dataType: 'json', 
                                  success: function (item) {
                                    console.log(JSON.stringify(item));
                              $('.mcart-count').html(item.item_count);
                                                var up_total_price = Currency.formatMoney( item.total_price);
                                            var item_price = Currency.formatMoney( item.items[itemIndex-1].line_price);
                                            $('.cart_subtotal').html(up_total_price);
                                            $("[item-loop=item-"+itemIndex+"]").find('.cart-item-price p').html(item_price);
                                            $("[item-loop=item-"+itemIndex+"]").find('.price-cart-mob').html(item_price);
                                  } 
                        }); 
                });                 
              }  

              $(document).ready(function () {
              // accordion js start
              $(".accordion_header").click(function () {
                    if($(this).parents(".accordion_items").hasClass("active-item")) {
                      $(".accordion_items").removeClass("active-item");
                      $(".accordion_body").slideUp("slow");
                    } else {
                      $(".accordion_items").removeClass("active-item");
                      $(".accordion_body").slideUp("slow");
                      $(this).parents(".accordion_items").addClass("active-item");
                      $(this).next(".accordion_body").slideDown("slow");
                    }
                  });
              });


              
              // jQuery(document).on("click",".register-footer .btn",function(event) {
              //   event.stopPropagation();
              //   jQuery(".register-overlay").show().addClass("open");
              //   jQuery(".model-content.reg-modal").show();
              
              // });
              
              jQuery(document).on("click",".model-content.reg-modal .close-modal,.register-overlay",function(event){
                event.stopPropagation();
                jQuery(".register-overlay").hide().removeClass("open");
                jQuery(".model-content.reg-modal").hide();
              });              
              
        }
     }
})();

export default SparxScripts;