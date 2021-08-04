const RelatedProductSlider = (() => {
    return {
        init: function() {
            $('.pdp-like__slider').slick({
                slidesToShow: 5,
                dots: false,
                arrows: true,
                prevArrow: $('.pdp-like__slider__arrow.pdp-like__slider__arrow-prev'),
                nextArrow: $('.pdp-like__slider__arrow.pdp-like__slider__arrow-next'),
                responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                      }
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                      }
                    }
                ]
            });
        }
    }
})();


export default RelatedProductSlider;