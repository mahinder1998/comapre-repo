const HomeSliderSparx = (function () {
    return {
        init: () => {
            jQuery(".Home_slideshow").slick({
                speed: 1000,
                slidesToShow: 1,
                //autoplay:true,
                //autoplaySpeed: 10000,   
                //slidesToScroll: 1,
                dots: true,
                arrows: false
            });


            $(document).on("click", ".videoPoster", function (ev) {
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

                $iframe.css('height', $wrapper.parent('.vides-padding').css('height'));
                $iframe.show();
                $iframe[0].play();

            }


            function videoStop() {
                "use strict";
                $(".video-containerss").show();
                $('.vides-padding').removeClass("stopVid");
                $('.responsive-iframe').hide();
                var elems1 = document.getElementsByClassName('responsive-iframe');
                for (let i = 0; i < elems1.length; i++) {
                    elems1[i].style.height = 0;
                    elems1[i].pause();
                    elems1[i].currentTime = 0;
                }
            }


            $(".Home_slideshow").on("beforeChange", function (event, slick, currentSlide, nextSlide) {
                videoStop();
            })

            var elems1 = document.getElementsByClassName('responsive-iframe');
            for (let i = 0; i < elems1.length; i++) {
                elems1[i].onplay = function () {
                    $('.Home_slideshow').slick('slickPause');
                }

                elems1[i].onpause = function () {
                    console.log("paused");
                    $('.Home_slideshow').slick('slickPlay');
                }
            }


            var parent = $('.vides-padding'),
                child = parent.children('.responsive-iframe');

            if (child.height() < parent.height()) {
                parent.height(child.height());
            }


            $(document).ready(function () {
                var divHeight = $('.iner-two').height();
                $('.responsive-iframe').css('min-height', divHeight + 'px');
            });
        }
    }
})();


//header padding navigation

window.onresize = function() {  
  let tabby = document.getElementById('shopify-section-header-top-tabby').offsetHeight;
  let header_section = document.getElementById('shopify-section-header').offsetHeight;
  let nav_padding = (tabby + header_section) - 1 ;
  document.getElementById('mb-mob-nav-cont').style.top = nav_padding + 'px' ;
}
export default HomeSliderSparx;

