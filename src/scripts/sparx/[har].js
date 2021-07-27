const HAR = (function () {
    return {
        init: function () {
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
                            for (i = 0; i < pro_length; i++) {
                                if (show_counter <= 3) {
                                    $(".search-result-weap").show();
                                    var firstProductSuggestion = productSuggestions[i];
                                    str +=
                                        '<a href="' +
                                        firstProductSuggestion.url +
                                        '" class="search-result-items"><div class="get-product-image"><img src="' +
                                        firstProductSuggestion.image +
                                        '"></div>' +
                                        '<div class="get-product-title">' +
                                        firstProductSuggestion.title +
                                        "</div>" +
                                        '<div class="get-product-price">' +
                                        firstProductSuggestion.price +
                                        "</div></a>";
                                    //console.log("The title of the first product suggestion is: " + firstProductSuggestion.id);
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

            $(function() {
                jQuery(".Home_slideshow").slick({
                  speed: 1000,
                  slidesToShow:1,
                  //autoplay:true,
                  //autoplaySpeed: 10000,   
                  //slidesToScroll: 1,
                  dots: true,
                  arrows:false
                });
              
              }); 
              
              
              $(document).on("click", ".videoPoster", function(ev) {
                "use strict";
                ev.preventDefault();
                videoStop();
                var $poster = $(this).closest('.video-containerss');
                videoPlay($poster);
              });
              
              // play the targeted video (and hide the poster frame)
              function videoPlay($wrapper) {
                "use strict";
                var $iframe = $wrapper.prev();
                $wrapper.hide();
                $wrapper.parent('.vides-padding').addClass("stopVid");
              
                $iframe.css('height',$wrapper.parent('.vides-padding').css('height'));
                $iframe.show();
                $iframe[0].play();
              
              }
              
              
              function videoStop() {
                "use strict";
                $(".video-containerss").show();
                $('.vides-padding').removeClass("stopVid");
                $('.responsive-iframe').hide();
                var elems1 = document.getElementsByClassName('responsive-iframe');
                for(let i = 0; i < elems1.length; i++) {
                  elems1[i].style.height = 0;
                  elems1[i].pause(); 
                  elems1[i].currentTime = 0;
                }
              }
              
              
              $(".Home_slideshow").on("beforeChange", function(event,slick,currentSlide,nextSlide) 
                                      {
                videoStop();
              })
              
              var elems1 = document.getElementsByClassName('responsive-iframe');
              for(let i = 0; i < elems1.length; i++) {
                elems1[i].onplay = function() {
                  $('.Home_slideshow').slick('slickPause');
                }
              
                elems1[i].onpause = function() {
                  console.log("paused");
                  $('.Home_slideshow').slick('slickPlay');
                }
              }
              
              
              var parent = $('.vides-padding'),
                  child = parent.children('.responsive-iframe');
              
              if (child.height() < parent.height()) {
                parent.height(child.height());
              }
              
              
              $(document).ready(function() {
                var divHeight = $('.iner-two').height(); 
                $('.responsive-iframe').css('min-height', divHeight+'px');
              });  
              /**
                 *
                 *  Show/hide customer address forms
                 *
                 */
              var address_list_container = document.getElementById('cus_address-list');
              
              var newAddressForm = document.getElementById('AddressNewForm');
              var newAddressFormButton = document.getElementById('AddressNewButton');
              
              //     if (!newAddressForm) {
              //       return;
              //     }
              
              // Initialize observers on address selectors, defined in shopify_common.js
              //     if (Shopify) {
              //       // eslint-disable-next-line no-new
              //       new Shopify.CountryProvinceSelector(
              //         'AddressCountryNew',
              //         'AddressProvinceNew',
              //         {
              //           hideElement: 'AddressProvinceContainerNew'
              //         }
              //       );
              //     }
              
              /*
                  // Initialize each edit form's country/province selector
                  document
                    .querySelectorAll('.address-country-option')
                    .forEach(function(option) {
                      var formId = option.dataset.formId;
                      var countrySelector = 'AddressCountry_' + formId;
                      var provinceSelector = 'AddressProvince_' + formId;
                      var containerSelector = 'AddressProvinceContainer_' + formId;
              
                      // eslint-disable-next-line no-new
                      new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
                        hideElement: containerSelector
                      });
                    });
              */
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
                });
              });
              
              document.querySelectorAll('.address-delete').forEach(function(button) {
                button.addEventListener('click', function(evt) {
                  var target = evt.target.dataset.target;
                  var confirmMessage = evt.target.dataset.confirmMessage;
              
                  // eslint-disable-next-line no-alert
                  if (
                    confirm(
                      confirmMessage || 'Are you sure you wish to delete this address?'
                    )
                  ) {
                    Shopify.postLink(target, {
                      parameters: { _method: 'delete' }
                    });
                  }
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
              
              
          

        }
    }
})();

export default HAR;