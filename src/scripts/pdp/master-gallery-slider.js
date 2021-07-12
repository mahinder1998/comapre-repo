const MediaGallery = (() => {
    return {
        init: () => {
            $('.pdp__media__master__slider').slick({
                dots: false,
                arrows: true,
                fade: true,
                prevArrow: $('.pdp__media__master__slider__arrow.pdp__media__master__slider__arrow-prev'),
                nextArrow: $('.pdp__media__master__slider__arrow.pdp__media__master__slider__arrow-next')
            });

            $('.pdp__media__thumbs__slider').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                dots: false,
                arrows: false,
                asNavFor: '.pdp__media__master__slider',
                focusOnSelect: true,
            });
        }
    }
})();

window.MediaGallery = MediaGallery;
export default MediaGallery;