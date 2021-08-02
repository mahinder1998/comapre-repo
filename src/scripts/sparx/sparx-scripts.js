const SparxScripts = (() => {
  return {
    init: function init() {
      $(document).ready(function () {

        //Scroll top fixed nav
        var previousScroll = 0; 
        jQuery(window).scroll(function (e) {
          var i = $(this).scrollTop();
          i < previousScroll ? i > 300 && (
            $('body').addClass('nav-is-fixed'), $('.mb-top-logo, .mb-dt-nav-cont').addClass('animate__animated animate__fadeInDown'))
          : (i > 300 &&  $('.mb-top-logo, .mb-dt-nav-cont').removeClass('animate__animated animate__fadeInDown'), $('body').removeClass('nav-is-fixed')),
            (previousScroll = i);
        });

        $('li.has-subs').hover(function () {
          $('html').addClass('nav-is-ready');
          $(this).addClass('link-is-active');
        }, function () {
          $('html').removeClass('nav-is-ready');
          $(this).removeClass('link-is-active');
        });
        /* Mobile Nav */

        $('.mb-burger-icon').click(function (e) {
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
        $('#mob-mnu-close').click(function (e) {
          $('html').toggleClass('overh');
          $('#MobileNav').toggleClass('hide show');
        });
        $('.togglenewmob').click(function (e) {
          e.preventDefault();
          var $this = $(this);

          if ($this.next().hasClass('show')) {
            $this.next().removeClass('show');
          } else {
            $this.parent().parent().find('li .innercontent').removeClass('show');
            $this.next().toggleClass('show');
          }
        });
        $('.lvlonemob').click(function (e) {
          e.preventDefault();
          $('.li-lvltwo span.mobile-nav__label').removeClass("bold");
          $('.li-lvltwo .lvltwomob-chiv').removeClass('mobchiv-up');

          if ($(this).find('.lvlonemob-chiv').hasClass('mobchiv-up')) {
            $('.mobile-nav__label').removeClass("bold");
            $('.lvlonemob-chiv').removeClass('mobchiv-up');
          } else {
            $('.lvlonemob-chiv').removeClass('mobchiv-up');
            $('.lvlonemob .mobile-nav__label').removeClass("bold");
            $(this).find('.mobile-nav__label').addClass("bold");
            $(this).find('.lvlonemob-chiv').addClass("mobchiv-up");
          }

          $(this).parent('.li-lvlone').find('ul.innercontent[data-level="2"] li').siblings('.li-lvltwo').first().find('ul.innercontent[data-level="3"]').addClass('show');
          $(this).parent('.li-lvlone').find('ul.innercontent[data-level="2"] li').siblings('.li-lvltwo').first().find('.togglenewmob.lvltwomob .mobile-nav__label').addClass('bold');
          $(this).parent('.li-lvlone').find('ul.innercontent[data-level="2"] li').siblings('.li-lvltwo').first().find('.togglenewmob.lvltwomob .mobile-nav__icon').addClass('mobchiv-up');
        });
        $('.lvltwomob').click(function (e) {
          e.preventDefault();

          if ($(this).find('.lvltwomob-chiv').hasClass('mobchiv-up')) {
            $('.lvltwomob .mobile-nav__label').removeClass("bold");
            $('.lvltwomob-chiv').removeClass('mobchiv-up');
          } else {
            $('.lvltwomob-chiv').removeClass('mobchiv-up');
            $('.lvltwomob .mobile-nav__label').removeClass("bold");
            $(this).find('.mobile-nav__label').addClass("bold");
            $(this).find('.lvltwomob-chiv').addClass("mobchiv-up");
          }
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
        $('.mb-cart-flex').click(function () {
          $('.mini-cart-content').toggleClass('hide');
        }); // $('.mb-cart-flex').click(function () {
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
      });
      /* End Doc ready */
      // Sahid 

      $(document).ready(function () {
        if ($(window).width() < 750) {
          $(".footer-header").click(function () {
            if ($(this).parents(".footer-item").hasClass("active-item")) {
              $(".footer-item").removeClass("active-item");
              $(".footer-body").slideUp("slow");
            } else {
              $(".footer-item").removeClass("active-item");
              $(".footer-body").slideUp("slow");
              $(this).parents(".footer-item").addClass("active-item");
              $(this).next(".footer-body").slideDown("slow");
            }
          });
        } // Account address code here

      }); // Harshita 

      $(document).ready(function () {
        // search box toggle js
        $("#searchbar .search-label").on("click", function (e) {
          e.preventDefault();
          $("#searchbar").toggleClass("collapsed");
        }); // product search js

        $(".search-input").bind("keyup", function (e) {
          if (this.value.length < 3) {
            // console.log(this.value.length);
            //$("#productData").html('');
            //$("#viewResults").html('');
            $(".search-result-weap").hide();
          } else if (this.value.length >= 3) {
            var searchKeyword = this.value; //$(".search-result-weap").show();
          }

          jQuery.getJSON("/search/suggest.json", {
            q: searchKeyword,
            resources: {
              type: "product",
              options: {
                unavailable_products: "last",
                fields: "title,product_type,variants.title"
              }
            }
          }).done(function (response) {
            var productSuggestions = response.resources.results.products;
            var pro_length = productSuggestions.length; //console.log(finalColldata.id);

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

              $(".customSearchredirect").attr("href", "/search?q=" + searchKeyword + "&type=product");
            }
          });
        }); // account page tab js

        $(".tabs-main li").click(function () {
          var tab_id = $(this).attr("data-tab");
          $(".tabs-main li").removeClass("current");
          $(".tabs-items").removeClass("current");
          $(this).addClass("current");
          $("." + tab_id).addClass("current");
        });
        $(".template-customers-addresses .tabs-main li.current").click(function () {
          $(".template-customers-addresses .my_address").addClass("current");
        }); // customer order tab

        var url = window.location.href;
        var pageURL = url.split("#").pop();
        pageURL.split("+");

        if (pageURL == "my_order") {
          $(".tab-link").removeClass("current");
          $(".tabs-items").removeClass("current");
          $("#my_order").parent().addClass("current");
          $(".my_order").addClass("current");
        }
      }); // Deepak

      $(document).ready(function () {
        $(".toggle-password").click(function () {
          $(this).toggleClass("fa-eye fa-eye-slash");
          var input = $('.password-splash');

          if (input.attr("type") == "password") {
            input.attr("type", "text");
          } else {
            input.attr("type", "password");
          }
        });
        $(".toggle-password-conf").click(function () {
          $(this).toggleClass("fa-eye fa-eye-slash");
          var input = $('.password-splash-conf');

          if (input.attr("type") == "password") {
            input.attr("type", "text");
          } else {
            input.attr("type", "password");
          }
        });
        var inputError = false;
        $(".password-splash-conf").on('keyup', function (event) {
          if (event.target.value != document.getElementById('RegisterForm-password').value) {
            console.log('ppp');
            inputError = true;
          } else {
            inputError = false;
            $('.error-msg').hide();
          }
        });
        $(document).on('click', function (event) {
          if (inputError) {
            $('.error-msg').show();
          }
          else {
            $('.error-msg').hide();
          }
        }); // cart page cart note count

        $("#CartSpecialInstructions").on('keyup', function () {
          $("#countcharacter").text(250 - $(this).val().length + " Characters");
        });
      });


      $(document).ready(function () {
        // accordion js start
        $(".accordion_header").click(function () {
          if ($(this).parents(".accordion_items").hasClass("active-item")) {
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

      jQuery(document).on("click", ".model-content.reg-modal .close-modal,.register-overlay", function (event) {
        event.stopPropagation();
        jQuery(".register-overlay").hide().removeClass("open");
        jQuery(".model-content.reg-modal").hide();
      });
      /**
   *
   *  Show/hide customer address forms
   *
   */
var address_list_container = document.getElementById('cus_address-list');

var newAddressForm = document.getElementById('AddressNewForm');
var newAddressFormButton = document.getElementById('AddressNewButton');
var deletedTarget;


// Toggle new/edit address forms
document.querySelectorAll('.address-new-toggle').forEach(function(button) {
  button.addEventListener('click', function() {
    var isExpanded =
        newAddressFormButton.getAttribute('aria-expanded') === 'true';

    newAddressForm.classList.toggle('hide');
    address_list_container.classList.toggle('show');
    newAddressFormButton.setAttribute('aria-expanded', !isExpanded);
    newAddressFormButton.focus();
  });
});

document.querySelectorAll('.address-edit-toggle').forEach(function(button) {
  button.addEventListener('click', function(evt) {
    var formId = evt.target.dataset.formId;
    var editButton = document.getElementById('EditFormButton_' + formId);
    var editAddress = document.getElementById('EditAddress_' + formId);
    var isExpanded = editButton.getAttribute('aria-expanded') === 'true';

    editAddress.classList.toggle('hide');
    editButton.setAttribute('aria-expanded', !isExpanded);
    editButton.focus();
    $('#default_'+formId+' input[type=checkbox]').prop('checked','checked'); 
  });
});

var fountHtm = setInterval(function() {
  if(document.getElementById("address-remove")) {
    clearInterval(fountHtm);
    document.getElementById("address-remove").addEventListener("click", function() {
      Shopify.postLink(deletedTarget, {
        parameters: { _method: 'delete' }
      });
    });
  }
},1000);

document.querySelectorAll('.address-delete').forEach(function(button) {
  button.addEventListener('click', function(evt) {
    var target = evt.target.dataset.target;
    var confirmMessage = evt.target.dataset.confirmMessage;
    deletedTarget = target;
    //console.log("555555555555555555555555555555");
    $("#cnf-msg").show();
    $(".address_popup_overlay").show();
  });
});



// custom filter code 27-07-2021

$( document ).ready(function() {
  if($(window).width()<=768) {
    $(document).on("click",".custom-boots h5 svg",function() {
      $(this).parents(".custom-boots").hide();		
		$(".boost-pfs-filter-sort-active").removeClass("boost-pfs-filter-sort-active");
		$(".boost-pfs-filter-filter-dropdown").hide();
    });
  }
});

$( "#view-order-d" ).click(function() {
  $( "a#my_order" ).click();
});
$( "#view-order-m" ).click(function() {
  $( "a#my_order" ).click();
});
// harshita cart page 30-7
$('.giftyes').click(function() {
  if( $(this).is(':checked')) {
      $(".gift_msg").fadeIn();
  } else {
      $(".gift_msg").fadeOut();
  }
});
// remove js popup modal

$(".address-cancle-btn").click(function() {
  $("#cnf-msg").hide();
  $(".address_popup_overlay").hide();
});

$( ".address_popup_close" ).click(function() {
 $( ".address-cancle-btn" ).click();
});

// andrew cart page coopen 
$('#redemDevPromo').on('click', function(event){
  //disable the button event
  event.preventDefault();
  //write the url format
  var theUrl = '/checkout?discount=';
  //grab the discount code from the input
  var theDiscount = $('#promo_coupon').val();
  //full url to redirect to checkout with promo code
  if( !theDiscount) {
    $('.errormessage').text('Please Enter Valid Coupon Code');
    $('#promo_coupon').addClass('error-promo');
  }
  else{
    var toRedirect = theUrl+theDiscount;
    console.log(toRedirect);
    //redirect
    window.location.href = toRedirect;
  }
});

jQuery(".promo-title").click(function(){
  jQuery(".promo-body").slideToggle();
});
// harshita 2 aug
$( document ).ready(function() {
  $("a#RecoverPassword").click(function(){
     $("div#recover_form").show();
     $("form#customer_login").hide();
 });
 $("a#HideRecoverPasswordLink").click(function(){
     $("div#recover_form").hide();
     $("form#customer_login").show();
 });
});
// deepak 2 aug
$("document").ready(function(){
  $(".find-store,.language").hover(function() {
    $(this).find(".uae-select").addClass("open");
  },function() {
    $(this).find(".uae-select").removeClass("open");
  });
});

    }
  };
})();

export default SparxScripts;