const PDPListeners = (function (){

    function countListeners() {
        const countAdd = document.querySelector('.pdp__content__control__qty__next')
        const countRemove = document.querySelector('.pdp__content__control__qty__prev')
        const countValue = document.querySelector('.pdp__content__control__qty__value')

        countAdd.addEventListener('click', function() {
            let currentCount = parseInt(countValue.innerHTML.slice())
            currentCount = currentCount + 1;
            countValue.innerHTML = currentCount;
        })
        countRemove.addEventListener('click', function() {
            let currentCount = parseInt(countValue.innerHTML.slice())
            if(currentCount != 1) {
                currentCount = currentCount - 1;
                countValue.innerHTML = currentCount;
            }
        })
    }

    function accordionListeners() {
        const buttons = document.querySelectorAll('.pdp__content__accordion__header');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // remove is-open from all the bodies
                document.querySelectorAll('.pdp__content__accordion__body').forEach(body => {
                    body.classList.remove('is-open');
                })
                document.querySelectorAll('.pdp__content__accordion__icon').forEach(icon => {
                    icon.classList.remove('is-open');
                })


                // add is-open to selected body
                const body = this.nextElementSibling;
                body && body.classList.add('is-open');

                const cloestArrowIcon = this.querySelector('.pdp__content__accordion__icon');
                cloestArrowIcon && cloestArrowIcon.classList.add('is-open')
                
            });
        });
    }

    const masterGalleryHTMLString = `
        <div class="pdp__media__master__slide">
            <img src="{{ image | img_url: '500x', scale: 2 }}" alt="" class="pdp__media__master__slide__img">
        </div>
    `;
    


    function swatchListeners() {
        const swatches = document.querySelectorAll('.pdp__content__swatches__item');
        swatches && swatches.forEach(swatch => {
            swatch.addEventListener('click', function(e) {

                const selectedOption = e.target.dataset.option
                console.log("Selected Option is : " + selectedOption);

                // Get Selected Variant using data-option attribute.
                const variants = window.objectData.product && window.objectData.product.variants;
                const selectedVariant = variants.find(v => v.option1 == selectedOption);
                console.log("Selected Varaint is ") 
                console.log(selectedVariant);

                //Change the swatch active.
                swatches.forEach(swatch => {
                    swatch.classList.remove('active');
                })
                this.classList.add('active');

                //Change the title, size, price.
                document.querySelector('.pdp__content__price').innerHTML = Currency.formatMoney(selectedVariant.price);
                document.querySelector('.pdp__content__size').innerHTML = selectedVariant.option1;

                // Change the size label in mobile
                document.querySelector('.pdp__info-mobile__size').innerHTML = selectedVariant.option1;


                //Change data-id on CTAButtons;

                document.querySelector('.pdp__content__control__add-to-cart-btn') ? document.querySelector('.pdp__content__control__add-to-cart-btn').dataset.id = selectedVariant.id : null;
                document.querySelector('.pdp__content__control__notify-me-btn') ? document.querySelector('.pdp__content__control__notify-me-btn').dataset.id = selectedVariant.id: null;

                //Update the Sliders.
                const medias = window.objectData.product.media;
                const meidaFilterText = `__${selectedOption}__`;
                const selectedImages = medias.filter(item => item.alt && item.alt.includes(meidaFilterText))
                console.log(selectedImages)

                let masterGalleryHTMLString = "";
                selectedImages.forEach(img => {
                    const htmlString = `
                        <div class="pdp__media__master__slide">
                            <img src="${img.src}" alt="" class="pdp__media__master__slide__img">
                        </div>
                    `;

                    masterGalleryHTMLString = masterGalleryHTMLString + htmlString;
                })

                if(masterGalleryHTMLString) {
                    $('.pdp__media__master__slider').slick('unslick');
                    $('.pdp__media__thumbs__slider').slick('unslick');

                    document.querySelector('.pdp__media__master__slider').innerHTML = masterGalleryHTMLString;
                    document.querySelector('.pdp__media__thumbs__slider').innerHTML = masterGalleryHTMLString;

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

                };

                // Update the CTA button on variant availablity
                const ctaHolder = document.querySelector('.pdp__content__control');
                const ctaAddToCart = document.querySelector('.pdp__content__control__add-to-cart-btn');
                const ctaNotifyMe = document.querySelector('.pdp__content__control__notify-me-btn');

                if(selectedVariant.available) {
                    ctaNotifyMe.style.display = "none";
                    ctaAddToCart.style .display = "grid";
                }else {
                    ctaAddToCart.style .display = "none";
                    ctaNotifyMe.style.display = "grid"
                }





            });
        })
    }

    return {
        init: () => {
            countListeners();
            accordionListeners();
            swatchListeners();
        }
    }
})();

export default PDPListeners;
