const PDPListeners = (function (){
    // Selectors
    const selectors = {
        headerCartBubble: ".mcart-count",
        addToCartButtonLoading: ".pdp__content__control__add-to-cart-btn__loading",
        addToCartButtonLabel: ".pdp__content__control__add-to-cart-btn__label",

        qtyElem: ".pdp__content__control__qty__value",

        accordionItem: ".pdp__content__accordions__item",
        accordionBody: ".pdp__content__accordions__item__body",
        accordionHeading: ".pdp__content__accordions__item__heading",
        accordionArrow: ".pdp__content__list__heading__arrow",

        miniCartContainer: ".mini-cart-list",
        miniCartItem: ".single-mcart-item"
    }



    // Update the variant
    function resetCount() {
        if(document.querySelector(selectors.qtyElem)) {
            document.querySelector(selectors.qtyElem).innerHTML = 1;
        }
    }

    //Update the header cart count.
    function updateBubble(quantity) {
        let currentCount = null;
        if(document.querySelector(selectors.headerCartBubble)) {
            currentCount = parseInt(document.querySelector(selectors.headerCartBubble).innerHTML)
            // console.log("current count " + currentCount)
            if(quantity) {
                const newCount = currentCount + quantity;
                document.querySelector(selectors.headerCartBubble).innerHTML = newCount;
            }else {
                document.querySelector(selectors.headerCartBubble).innerHTML = currentCount;
            }

        }
    }

    // Show error message
    function showError(message) {
        const errorBox = document.querySelector('.pdp__content__error');
        const errorText = document.querySelector('.pdp__content__error__text')

        errorText.innerHTML = message || "There was an errro adding product to the cart."
        errorBox.style.display = "flex";
    }


    // Hide error message 
    function hideError() {
        const errorBox = document.querySelector('.pdp__content__error');
        errorBox.style.display = "none";
    }

    // Show Add to cart button laoder 
    function showLoaderAddToCartButton() {
        if(document.querySelector(selectors.addToCartButtonLabel)) {
            document.querySelector(selectors.addToCartButtonLabel).style.display = "none";
        }
        if(document.querySelector(selectors.addToCartButtonLoading)) {
            document.querySelector(selectors.addToCartButtonLoading).style.display = "block";
        }
    }

    // Hide loader in add to cart button.
    function hideLoaderAddToCartButton() {
        if(document.querySelector(selectors.addToCartButtonLabel)) {
            document.querySelector(selectors.addToCartButtonLabel).style.display = "block";
        }

        if(document.querySelector(selectors.addToCartButtonLoading)) {
            document.querySelector(selectors.addToCartButtonLoading).style.display = "none";
        }
    }

    // Open Added to cart modal.
    function openAddedtoCartModal(title,image,quantity, price, compare_price, size) {
        if(title && document.querySelector('.pdpmodal-addedtocart__modal__body__content__title')) {
            document.querySelector('.pdpmodal-addedtocart__modal__body__content__title').innerHTML = title;
        }

        if(image && document.querySelector('.pdpmodal-addedtocart__modal__body__media__img')) {
            document.querySelector('.pdpmodal-addedtocart__modal__body__media__img').src = image;
        }

        if(quantity && document.querySelector('.pdpmodal-addedtocart__modal__body__content__qty__value')) {
            document.querySelector('.pdpmodal-addedtocart__modal__body__content__qty__value').innerHTML = quantity;
        }

        if(price && document.querySelector('.pdpmodal-addedtocart__modal__body__content__price__original')) {
            document.querySelector('.pdpmodal-addedtocart__modal__body__content__price__original').innerHTML = price;
        }

        if(compare_price) {
            if(document.querySelector('.pdpmodal-addedtocart__modal__body__content__price__compare')) {
                document.querySelector('.pdpmodal-addedtocart__modal__body__content__price__compare').innerHTML = compare_price;
            }
        }else {
            if(document.querySelector('.pdpmodal-addedtocart__modal__body__content__price__compare')) {
                document.querySelector('.pdpmodal-addedtocart__modal__body__content__price__compare').innerHTML = "";
            }
        }

        if(size && document.querySelector('.pdpmodal-addedtocart__modal__body__content__size__value')) {
            document.querySelector('.pdpmodal-addedtocart__modal__body__content__size__value').innerHTML = size;
            document.querySelector('.pdpmodal-addedtocart__modal__body__content__size').style.display = "flex";
        };
        
        document.querySelector('.pdpmodal-addedtocart__overlay').style.display = "block"
        document.querySelector('.pdpmodal-addedtocart__modal').style.display = "block"
    }


    function renderItemtoMinicart(variant) {
        if(document.querySelector(".mini-cart-list")) {
            const minicartItemHTML = `
                <div class="single-mcart-item">
                    <div class="mcart-thumb">
                        <a href="/products/${variant?.handle}"> 
                        <img src="${ variant?.image || variant?.featured_image?.url}" alt="${variant?.featured_image?.alt}"></a>
                    </div>
                    <div class="mcart-content">
                        <p class="mcart-single-title"><a href="/products/${variant?.handle}">${variant?.product_title}</a></p>
                        <p class="mcart-single-price"><b>${Currency.formatMoney(variant?.final_line_price)}</b></p>

                    </div>
                </div>
            `;
            document.querySelector(".mini-cart-list").insertAdjacentHTML('beforeend', minicartItemHTML);
        }
    }


    function addToCart() {

        // Add to cart button click
        if(document.querySelector('.pdp__content__control__add-to-cart-btn')) {
            document.querySelector('.pdp__content__control__add-to-cart-btn').addEventListener('click', function(e) {
                    // Show loader
                    hideError();
                    showLoaderAddToCartButton();
    
                    //Get id and quantity
                    const variantIdString = e.target.dataset.id || e?.target?.closest('.pdp__content__control__add-to-cart-btn').dataset?.id;
                    const variantId = parseInt(variantIdString)
                    const quantityString = document.querySelector(selectors.qtyElem).innerHTML;
                    const quantity = quantityString ? parseInt(quantityString) : 1;
    
                    // Add item to the cart.
                    Cart.addItem(variantId, {quantity: quantity})
                    .then(res => {
                        // console.log(res);
    
                        const title = res.product_title;
                        const image = res.featured_image.url || res.image;
                        const price = Currency.formatMoney(parseFloat(res.price) * parseFloat(quantity));
                        const compare_unit_price = getVariantComparePrice(variantId);
                        const compare_price = compare_unit_price ? Currency.formatMoney(parseFloat(compare_unit_price) * parseFloat(quantity)) : null;
                        console.log(compare_price)
                        let size = null;
    
    
                        if(!res.product_has_only_default_variant) {
                            size = res.variant_options[0];
                        }
    
                        // Reset counter 
                        resetCount();

                        
                        // Update the bubble
                        updateBubble(quantity);
    
                        // Show added modal
                        openAddedtoCartModal(title,image,quantity, price, compare_price, size);

                        // Update the mincart.
                        Cart.getState().then(cart => {
                            document.querySelector(".mini-cart-list").innerHTML = "";
                            cart?.items.forEach(item => renderItemtoMinicart(item))
                        }).catch(error => {
                            console.log("Error on current cart fetch.")
                            console.log(error)
                        })
                                
                        // Hide loader 
                        hideLoaderAddToCartButton();
       
                    }).catch(err => {
                        //Error
                        console.log("Error adding the product.")
                        console.log(err);
    
                        // Hide loader 
                        hideLoaderAddToCartButton();
                        showError();
                    }); 
            })
        }


        // Added to cart overlay click - close
        if(document.querySelector('.pdpmodal-addedtocart__overlay')) {
            document.querySelector('.pdpmodal-addedtocart__overlay').addEventListener('click', function() {
                document.querySelector('.pdpmodal-addedtocart__overlay').style.display = "none"
                document.querySelector('.pdpmodal-addedtocart__modal').style.display = "none"
            })
        }

        // Close button in the modal click.
        if(document.querySelector('.pdpmodal-addedtocart__modal__close-btn')) {
            document.querySelector('.pdpmodal-addedtocart__modal__close-btn').addEventListener('click', () => {
                console.log('clicked')
                document.querySelector('.pdpmodal-addedtocart__overlay').style.display = "none"
                document.querySelector('.pdpmodal-addedtocart__modal').style.display = "none"
            })
        }

        // Disable click on modal from closing
        if(document.querySelector('.pdpmodal-addedtocart__modal')) {
            document.querySelector('.pdpmodal-addedtocart__modal').addEventListener('click', function() {})
        }
    }


    function pdpAddedToCartModalListeners() {
        if(document.querySelector('.pdpmodal-addedtocart__modal__checkout')) {
            document.querySelector('.pdpmodal-addedtocart__modal__checkout').addEventListener('click', function() {
                location.assign('/cart')
            })
        }

        if(document.querySelector('.pdpmodal-addedtocart__modal__continue')) {
            document.querySelector('.pdpmodal-addedtocart__modal__continue').addEventListener('click', function() {
                document.querySelector('.pdpmodal-addedtocart__overlay').style.display = "none"
                document.querySelector('.pdpmodal-addedtocart__modal').style.display = "none"
            })
        }
    }

    function countListeners() {

        const countAdd = document.querySelector('.pdp__content__control__qty__next')
        const countRemove = document.querySelector('.pdp__content__control__qty__prev')
        const countValue = document.querySelector('.pdp__content__control__qty__value')

        countAdd && countAdd.addEventListener('click', function() {
            let currentCount = parseInt(countValue.innerHTML.slice())
            currentCount = currentCount + 1;
            countValue.innerHTML = currentCount;
        })
        countRemove && countRemove.addEventListener('click', function() {
            let currentCount = parseInt(countValue.innerHTML.slice())
            if(currentCount != 1) {
                currentCount = currentCount - 1;
                countValue.innerHTML = currentCount;
            }
        })
    }

    // const masterGalleryHTMLString = `
    //     <div class="pdp__media__master__slide">
    //         <img src="{{ image | img_url: '500x', scale: 2 }}" alt="" class="pdp__media__master__slide__img">
    //     </div>
    // `;

    function showLoader() {
        const shimmer = document.querySelector('.pdp__media__shimmer');
        shimmer.style.display = "block";
    }

    function hideLoader() {
        const shimmer = document.querySelector('.pdp__media__shimmer');
        shimmer.style.display = "none";
    }

    function hideSlides() {
        document.querySelector('.pdp__media__master').style.opacity = 0;
        document.querySelector('.pdp__media__master').style.visibility = "hidden";
        document.querySelector('.pdp__media__thumbs').style.opacity = 0;
        document.querySelector('.pdp__media__thumbs').style.visibility = "hidden";
    }

    function showSlides() {
        document.querySelector('.pdp__media__master').style.opacity = 1;
        document.querySelector('.pdp__media__master').style.visibility = "visible";
        document.querySelector('.pdp__media__thumbs').style.opacity = 1;
        document.querySelector('.pdp__media__thumbs').style.visibility = "visible";
    }

    function renderVideoSources (slide) {
        if(!slide) return;
        return slide.sources.map(source => {
            return `<source src="${  source.url }" type="${ source.mime_type }"/>`
        }).join('');
    }
    
    function swatchListeners() {
        const swatches = document.querySelectorAll('.pdp__content__swatches__item');
        swatches && swatches.forEach(swatch => {
            swatch.addEventListener('click', function(e) {
                // Hide slides and show loader
                showLoader();
                hideSlides();

                const selectedOption = e.target.dataset.option
                // console.log("Selected Option is : " + selectedOption);

                // Get Selected Variant using data-option attribute.
                const variants = window.objectData.product && window.objectData.product.variants;
                const selectedVariant = variants.find(v => v.option1 == selectedOption);
                // console.log("Selected Varaint is ") 
                // console.log(selectedVariant);

                //Change the swatch active.
                swatches.forEach(swatch => {
                    swatch.classList.remove('active');
                })
                this.classList.add('active');

                //Change the title, size, price.
                document.querySelector('.pdp__content__price__original').innerHTML = Currency.formatMoney(selectedVariant.price);

                
                if(selectedVariant.compare_at_price) {
                    document.querySelector('.pdp__content__price__compare').innerHTML = Currency.formatMoney(selectedVariant.compare_at_price);
                }else {
                    document.querySelector('.pdp__content__price__compare').innerHTML = "";
                }

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
                // console.log(selectedImages)

                let masterGalleryHTMLString = "";

                selectedImages.forEach(slide => {
                    if(slide.media_type === "image") {
                        const slideHTML = `
                            <div class="pdp__media__master__slide">
                                <img src="${slide?.src}" alt="${slide?.alt}" class="pdp__media__master__slide__img">
                            </div>
                        `;
                        masterGalleryHTMLString = masterGalleryHTMLString + slideHTML;
                    }
            
                    if(slide.media_type === "video") {
                        const slideHTML = `
                            <div class="pdp__media__master__slide">
                            <div class="pdp__media__master__slide__video-playbox">
                                <img src="https://cdn.shopify.com/s/files/1/0575/8517/2679/files/playbutton2.png?v=1627570945" alt="" class="pdp__media__master__slide__video-playbox__img">
                            </div>
                                <video width="100%" muted controls>${renderVideoSources(slide)}</video>
                            </div>
                        `;
                        masterGalleryHTMLString = masterGalleryHTMLString + slideHTML;
                    }
                })

                let thumbsGalleryHTMLString = "";
                selectedImages.forEach(slide => {
                    if(slide.media_type === "image") {
                        const slideHTML = `
                            <div class="pdp__media__thumbs__slide">
                                <img src="${slide?.src}" alt="" class="pdp__media__master__slide__img">
                            </div>
                        `;
                        thumbsGalleryHTMLString = thumbsGalleryHTMLString + slideHTML;
                    }
            
                    if(slide.media_type === "video") {
                        const slideHTML = `
                            <div class="pdp__media__thumbs__slide">
                                <div class="pdp__media__thumbs__slide__video-playbox">
                                    <img src="https://cdn.shopify.com/s/files/1/0575/8517/2679/files/playbutton2.png?v=1627570945" alt="" class="pdp__media__thumbs__slide__video-playbox__img">
                                </div>
                                <img src="${slide?.preview_image?.src}" alt="${slide?.preview_image?.alt}" class="pdp__media__master__slide__img">
                            </div>
                        `;
                        thumbsGalleryHTMLString = thumbsGalleryHTMLString + slideHTML;
                    }
                })



                if(masterGalleryHTMLString) {
                    $('.pdp__media__master__slider').slick('unslick');
                    $('.pdp__media__thumbs__slider').slick('unslick');

                    document.querySelector('.pdp__media__master__slider').innerHTML = masterGalleryHTMLString;
                    document.querySelector('.pdp__media__thumbs__slider').innerHTML = thumbsGalleryHTMLString;

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

                    const allImgs = document.querySelectorAll('.pdp__media__master__slide__img')
                    const allImgsLength = allImgs.length;
                    let counter = 0;

                    [].forEach.call(allImgs, function(img) {
                        if(img.complete){
                            countPlus();
                        }else {
                            img.addEventListener('load', countPlus, false);
                        }
                    });

                    function countPlus() {
                        counter = counter + 1;
                        if(counter === allImgsLength) {
                            console.log("All Images loaded!")

                                showSlides();
                                hideLoader();
                        }
                    }

                    // console.log(allImgs);
                    // allImgs.forEach(img => {
                    //     img.addEventListener('load', () => console.log("hello laodded."))
                    // })

                    

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

    // PDP accordion
    function accordion() {

        const customAccordions = document.querySelectorAll(selectors.accordionHeading);
        // console.log(customAccordions)

        customAccordions && customAccordions.forEach(accordion => {
            accordion.addEventListener('click', function(e) {
                // console.log(e.target);

                const body = e.target.closest(selectors.accordionItem).querySelector(selectors.accordionBody);
                if(body.classList.contains('active')) {
                    body.classList.remove('active');
                    gsap.to(body, {height: 0})
                }else {
                    body.classList.add('active');
                    gsap.to(body, {height: "auto"})
                }
            })
        })
    }

    return {
        init: () => {
            countListeners();
            swatchListeners();
            pdpAddedToCartModalListeners();
            addToCart();
            accordion();
        }
    }
})();

export default PDPListeners;
