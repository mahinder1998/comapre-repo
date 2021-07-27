const MediaGallery = (() => {

    function renderSlide(slide) {
        // console.log(slide);
        const slideHTML = `
            <div class="pdp__media__master__slide">
                <img src="${slide?.src}" alt="" class="pdp__media__master__slide__img">
            </div>
        `;

        document.querySelector('.pdp__media__master__slider').insertAdjacentHTML("beforeend", slideHTML);
    }

    function renderThumb(slide) {
        const slideHTML = `
            <div class="pdp__media__thumbs__slide">
                <img src="${slide?.src}" alt="" class="pdp__media__master__slide__img">
            </div>
        `;

        document.querySelector('.pdp__media__thumbs__slider').insertAdjacentHTML("beforeend", slideHTML);
    }

    function renderMasterSlides(images) {
        document.querySelector('.pdp__media__master__slider').innerHTML = "";
        images.forEach(slide => renderSlide(slide))
    }

    function renderThumbSlides(images) {
        document.querySelector('.pdp__media__thumbs__slider').innerHTML = "";
        images.forEach(slide => renderThumb(slide))

    }

    function initSlides() {
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


    function showSlides() {
        document.querySelector('.pdp__media__shimmer').style.display = "none";
        document.querySelector('.pdp__media__master').style.display = "block";
        document.querySelector('.pdp__media__thumbs').style.display = "block";
    }

    return {
        init: () => {
            if(objectData.product) {
                if(objectData.hasOnlyDefaultVariant) {
                    initSlides();
                    showSlides();
                }else {
                    const medias = objectData?.product?.media;
                    const currentAlt = objectData?.selectedVaraint?.featured_image?.alt;
                    const currentVariantImages = medias?.filter(media => media.alt == currentAlt);

                    renderMasterSlides(currentVariantImages);
                    renderThumbSlides(currentVariantImages);

                    initSlides();
                    showSlides();
                }            
            }
        }
    }
})();

window.MediaGallery = MediaGallery;
export default MediaGallery;

