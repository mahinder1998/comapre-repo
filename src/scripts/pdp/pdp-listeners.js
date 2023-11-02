import Currency from "../money-format";

const PDPListeners = (function () {
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
    miniCartItem: ".single-mcart-item",
  };

  // Update the variant
  function resetCount() {
    if (document.querySelector(selectors.qtyElem)) {
      document.querySelector(selectors.qtyElem).innerHTML = 1;
    }
  }

  //Update the header cart count.
  function updateBubble(quantity) {
    let currentCount = null;
    if (document.querySelector(selectors.headerCartBubble)) {
      currentCount = parseInt(
        document.querySelector(selectors.headerCartBubble).innerHTML
      );
      // console.log("current count " + currentCount)
      if (quantity) {
        const newCount = currentCount + quantity;
        document.querySelector(selectors.headerCartBubble).innerHTML = newCount;
      } else {
        document.querySelector(selectors.headerCartBubble).innerHTML =
          currentCount;
      }
    }
  }

  // Show error message
  function showError(message) {
    const errorBox = document.querySelector(".pdp__content__error");
    const errorText = document.querySelector(".pdp__content__error__text");

    errorText.innerHTML =
      message || "There was an error adding product to the cart.";
    errorBox.style.display = "flex";
  }

  // Hide error message
  function hideError() {
    const errorBox = document.querySelector(".pdp__content__error");
    errorBox.style.display = "none";
  }

  // Show Add to cart button laoder
  function showLoaderAddToCartButton() {
    if (document.querySelector(selectors.addToCartButtonLabel)) {
      document.querySelector(selectors.addToCartButtonLabel).style.display =
        "none";
    }
    if (document.querySelector(selectors.addToCartButtonLoading)) {
      document.querySelector(selectors.addToCartButtonLoading).style.display =
        "block";
    }
  }

  // Hide loader in add to cart button.
  function hideLoaderAddToCartButton() {
    if (document.querySelector(selectors.addToCartButtonLabel)) {
      document.querySelector(selectors.addToCartButtonLabel).style.display =
        "block";
    }

    if (document.querySelector(selectors.addToCartButtonLoading)) {
      document.querySelector(selectors.addToCartButtonLoading).style.display =
        "none";
    }
  }

  // Open Added to cart modal.
  function openAddedtoCartModal(
    title,
    image,
    quantity,
    price,
    compare_price,
    size
  ) {
    if (
      title &&
      document.querySelector(
        ".pdpmodal-addedtocart__modal__body__content__title"
      )
    ) {
      document.querySelector(
        ".pdpmodal-addedtocart__modal__body__content__title"
      ).innerHTML = title;
    }

    if (
      image &&
      document.querySelector(".pdpmodal-addedtocart__modal__body__media__img")
    ) {
      document.querySelector(
        ".pdpmodal-addedtocart__modal__body__media__img"
      ).src = image;
    }

    if (
      quantity &&
      document.querySelector(
        ".pdpmodal-addedtocart__modal__body__content__qty__value"
      )
    ) {
      document.querySelector(
        ".pdpmodal-addedtocart__modal__body__content__qty__value"
      ).innerHTML = quantity;
    }

    if (
      price &&
      document.querySelector(
        ".pdpmodal-addedtocart__modal__body__content__price__original"
      )
    ) {
      document.querySelector(
        ".pdpmodal-addedtocart__modal__body__content__price__original"
      ).innerHTML = price;
    }

    if (compare_price && compare_price > price) {
      if (
        document.querySelector(
          ".pdpmodal-addedtocart__modal__body__content__price__compare"
        )
      ) {
        document.querySelector(
          ".pdpmodal-addedtocart__modal__body__content__price__compare"
        ).innerHTML = compare_price;
      }
    } else {
      if (
        document.querySelector(
          ".pdpmodal-addedtocart__modal__body__content__price__compare"
        )
      ) {
        document.querySelector(
          ".pdpmodal-addedtocart__modal__body__content__price__compare"
        ).innerHTML = "";
      }
    }

    if (
      size &&
      document.querySelector(
        ".pdpmodal-addedtocart__modal__body__content__size__value"
      )
    ) {
      document.querySelector(
        ".pdpmodal-addedtocart__modal__body__content__size__value"
      ).innerHTML = size;
      document.querySelector(
        ".pdpmodal-addedtocart__modal__body__content__size"
      ).style.display = "flex";
    }

    document.querySelector(".pdpmodal-addedtocart__overlay").style.display =
      "block";
    document.querySelector(".pdpmodal-addedtocart__modal").style.display =
      "block";
  }

  async function renderItemtoMinicart(variant, comparePrice) {
    const compare_variant_unit_price = await getVariantComparePrice(
      variant?.handle,
      variant?.variant_id
    );
    const varinatComparePrice = compare_variant_unit_price
      ? compare_variant_unit_price * variant?.quantity
      : null;

    if (document.querySelector(".mini-cart-list")) {
      const minicartItemHTML = `
                <div class="single-mcart-item">
                    <div class="mcart-thumb">
                    <a href="/products/${variant?.handle}"
                        title="${variant?.title}">
                        <img src="${
                          variant?.image || variant?.featured_image?.url
                        }" alt="${variant?.featured_image?.alt}">
                    </a>
                    </div>
                    <div class="mcart-content">
                    <p class="mcart-single-title"><a href="/products/${
                      variant?.handle
                    }">${variant?.title}</a></p>
                    <p class="mcart-single-price">
                        <span class="mcart-compare-price">${
                          varinatComparePrice
                            ? Currency.formatMoney(varinatComparePrice)
                            : ""
                        } </span>
                        <span><b>${Currency.formatMoney(
                          variant?.final_line_price
                        )}</b></span>
                    </p>
                    </div>
                </div>
            `;
      document
        .querySelector(".mini-cart-list")
        .insertAdjacentHTML("beforeend", minicartItemHTML);
    }
  }

  async function getVariantComparePrice(handle, variantId) {
    if (!handle || !variantId) return;
    const productFromHandle = await axios.get(`/products/${handle}.js`);
    const productFromHandleVariants = productFromHandle?.data?.variants;
    const giveVariant = productFromHandleVariants.find(
      (variant) => variant.id == variantId
    );
    const givenVariantComparePrice = giveVariant
      ? giveVariant.compare_at_price
      : null;
    return giveVariant?.price >= givenVariantComparePrice
      ? null
      : givenVariantComparePrice;
  }

  let stringToHTML = (str) => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    return doc.body;
  };

  function addToCart() {
    // Add to cart button click
    if (document.querySelector(".pdp__content__control__add-to-cart-btn")) {
      document
        .querySelector(".pdp__content__control__add-to-cart-btn")
        .addEventListener("click", async function (e) {
          // Show loader
          hideError();
          showLoaderAddToCartButton();

          //Get id and quantity
          const variantIdString =
            e.target.dataset.id ||
            e?.target?.closest(".pdp__content__control__add-to-cart-btn")
              .dataset?.id;
          const variantId = parseInt(variantIdString);
          const quantityString = document.querySelector(
            selectors.qtyElem
          ).innerHTML;
          const quantity = quantityString ? parseInt(quantityString) : 1;

          if (quantity > 10) {
            hideLoaderAddToCartButton();
            showError("Cannot add more than 10 products.");
            if (document.querySelector(".pdp__content__control__qty__value")) {
              document.querySelector(
                ".pdp__content__control__qty__value"
              ).innerHTML = 1;
            }
            return;
          }

          let cartData = JSON.parse(
            document.querySelector("#cartJson").textContent
          );

          const variantInCart = cartData?.items.find(
            (item) => item.id == variantId
          );

          if (variantInCart) {
            if (variantInCart.quantity + quantity > 10) {
              hideLoaderAddToCartButton();
              showError("Cannot add more than 10 products");
              if (
                document.querySelector(".pdp__content__control__qty__value")
              ) {
                document.querySelector(
                  ".pdp__content__control__qty__value"
                ).innerHTML = 1;
              }
              return;
            }
          }
          // Add item to the cart.
          let formData = {
            items: [
              {
                id: variantId,
                quantity: quantity,
              },
            ],
            sections: "cart-json",
          };
          //Cart.addItem(variantId, { quantity: quantity })
          await fetch("/cart/add.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((response) => response.json())
            .then(async (res) => {
              let responseData = res;
              res = res.items[0];

              const handle = res?.handle;
              const title = res.product_title;
              const image = res.featured_image.url || res.image;
              let size = null;

              const oPrice = quantity ? res.price * quantity : res.price * 1;
              const compare_unit_price = await getVariantComparePrice(
                handle,
                variantId
              );
              // console.log('variantId', variantId);
              // console.log('compare_unit_price :', compare_unit_price)
              const oComparePrice = compare_unit_price
                ? compare_unit_price * quantity
                : null;
              const price = oPrice ? Currency.formatMoney(oPrice) : null;
              const compare_price = oComparePrice
                ? Currency.formatMoney(oComparePrice)
                : null;

              if (!res.product_has_only_default_variant) {
                size = res.variant_options[0];
              }

              // Update the mincart.
              Cart.getState()
                .then((cart) => {
                  if (document.querySelector(".mini-cart-list")) {
                    document.querySelector(".mini-cart-list").innerHTML = "";
                  }
                  cart?.items.forEach((item) =>
                    renderItemtoMinicart(item, oComparePrice)
                  );

                  // Hide no cart
                  if (
                    !document
                      .querySelector(".cartempty_text")
                      .classList.contains("hide")
                  ) {
                    document
                      .querySelector(".cartempty_text")
                      .classList.add("hide");
                  }

                  // cart title
                  if (
                    document
                      .querySelector(".mini-cart-title")
                      .classList.contains("hide")
                  ) {
                    document
                      .querySelector(".mini-cart-title")
                      .classList.remove("hide");
                  }

                  // Show the cart buttton
                  if (
                    document
                      .querySelector(".mcart-go-cart")
                      .classList.contains("hide")
                  ) {
                    document
                      .querySelector(".mcart-go-cart")
                      .classList.remove("hide");
                  }
                })
                .catch((error) => {
                  console.log("Error on current cart fetch.");
                  console.log(error);
                });

              // Reset counter
              resetCount();

              // Update the bubble
              updateBubble(quantity);

              // Show added modal
              openAddedtoCartModal(
                title,
                image,
                quantity,
                price,
                compare_price,
                size
              );

              // Hide loader
              hideLoaderAddToCartButton();

              // update cart-json section data on PDP
              let cartData = stringToHTML(responseData.sections["cart-json"]);
              document.querySelector("#shopify-section-cart-json").innerHTML =
                cartData.querySelector("#shopify-section-cart-json").innerHTML;
            })
            .catch((err) => {
              //Error
              console.log("Error adding the product.");
              console.log(err);

              // Hide loader
              hideLoaderAddToCartButton();
              showError("Available quantity limit reached");
            });
        });
    }

    // Added to cart overlay click - close
    if (document.querySelector(".pdpmodal-addedtocart__overlay")) {
      document
        .querySelector(".pdpmodal-addedtocart__overlay")
        .addEventListener("click", function () {
          document.querySelector(
            ".pdpmodal-addedtocart__overlay"
          ).style.display = "none";
          document.querySelector(".pdpmodal-addedtocart__modal").style.display =
            "none";
        });
    }

    // Close button in the modal click.
    if (document.querySelector(".pdpmodal-addedtocart__modal__close-btn")) {
      document
        .querySelector(".pdpmodal-addedtocart__modal__close-btn")
        .addEventListener("click", () => {
          document.querySelector(
            ".pdpmodal-addedtocart__overlay"
          ).style.display = "none";
          document.querySelector(".pdpmodal-addedtocart__modal").style.display =
            "none";
        });
    }

    // Disable click on modal from closing
    if (document.querySelector(".pdpmodal-addedtocart__modal")) {
      document
        .querySelector(".pdpmodal-addedtocart__modal")
        .addEventListener("click", function () {});
    }
  }

  function pdpAddedToCartModalListeners() {
    if (document.querySelector(".pdpmodal-addedtocart__modal__checkout")) {
      document
        .querySelector(".pdpmodal-addedtocart__modal__checkout")
        .addEventListener("click", function () {
          location.assign("/cart");
        });
    }

    if (document.querySelector(".pdpmodal-addedtocart__modal__continue")) {
      document
        .querySelector(".pdpmodal-addedtocart__modal__continue")
        .addEventListener("click", function () {
          document.querySelector(
            ".pdpmodal-addedtocart__overlay"
          ).style.display = "none";
          document.querySelector(".pdpmodal-addedtocart__modal").style.display =
            "none";
        });
    }
  }

  function countListeners() {
    const countAdd = document.querySelector(
      ".pdp__content__control__qty__next"
    );
    const countRemove = document.querySelector(
      ".pdp__content__control__qty__prev"
    );
    const countValue = document.querySelector(
      ".pdp__content__control__qty__value"
    );

    countAdd &&
      countAdd.addEventListener("click", function () {
        let currentCount = parseInt(countValue.innerHTML.slice());
        currentCount = currentCount + 1;
        countValue.innerHTML = currentCount;
      });
    countRemove &&
      countRemove.addEventListener("click", function () {
        let currentCount = parseInt(countValue.innerHTML.slice());
        if (currentCount != 1) {
          currentCount = currentCount - 1;
          countValue.innerHTML = currentCount;
        }
      });
  }

  // const masterGalleryHTMLString = `
  //     <div class="pdp__media__master__slide">
  //         <img src="{{ image | img_url: '500x', scale: 2 }}" alt="" class="pdp__media__master__slide__img">
  //     </div>
  // `;

  function showLoader() {
    const shimmer = document.querySelector(".pdp__media__shimmer");
    shimmer.style.display = "block";
  }

  function hideLoader() {
    const shimmer = document.querySelector(".pdp__media__shimmer");
    shimmer.style.display = "none";
  }

  function hideSlides() {
    document.querySelector(".pdp__media__master").style.opacity = 0;
    document.querySelector(".pdp__media__master").style.visibility = "hidden";
    document.querySelector(".pdp__media__thumbs").style.opacity = 0;
    document.querySelector(".pdp__media__thumbs").style.visibility = "hidden";
  }

  function showSlides() {
    document.querySelector(".pdp__media__master").style.opacity = 1;
    document.querySelector(".pdp__media__master").style.visibility = "visible";
    document.querySelector(".pdp__media__thumbs").style.opacity = 1;
    document.querySelector(".pdp__media__thumbs").style.visibility = "visible";
  }

  function renderVideoSources(slide) {
    if (!slide) return;
    return slide.sources
      .map((source) => {
        return `<source src="${source.url}" type="${source.mime_type}"/>`;
      })
      .join("");
  }

  function swatchListeners() {
    const swatches = document.querySelectorAll(".pdp__content__swatches__item");
    swatches &&
      swatches.forEach((swatch) => {
        swatch.addEventListener("click", function (e) {
          // Hide slides and show loader
          showLoader();
          hideSlides();

          // Reset the counter
          if (document.querySelector(".pdp__content__control__qty__value")) {
            document.querySelector(
              ".pdp__content__control__qty__value"
            ).innerHTML = "1";
          }

          const selectedOption = e.target.dataset.option;
          // console.log("Selected Option is : " + selectedOption);

          // Get Selected Variant using data-option attribute.
          const variants =
            window.objectData.product && window.objectData.product.variants;
          const selectedVariant = variants.find(
            (v) => v.option1 == selectedOption
          );
          // console.log("Selected Varaint is ")
          // console.log(selectedVariant);

          //Change the swatch active.
          swatches.forEach((swatch) => {
            swatch.classList.remove("active");
          });
          this.classList.add("active");

          //Change the title, size, price.
          document.querySelector(".pdp__content__price__original").innerHTML =
            Currency.formatMoney(selectedVariant.price);

          if (
            selectedVariant.compare_at_price &&
            selectedVariant.compare_at_price > selectedVariant.price
          ) {
            document.querySelector(".pdp__content__price__compare").innerHTML =
              Currency.formatMoney(selectedVariant.compare_at_price);
          } else {
            document.querySelector(".pdp__content__price__compare").innerHTML =
              "";
          }

          document.querySelector(".pdp__content__size").innerHTML =
            selectedVariant.option1;

          // Change the size label in mobile
          document.querySelector(".pdp__info-mobile__size").innerHTML =
            selectedVariant.option1;

          //Change data-id on CTAButtons;
          document.querySelector(".pdp__content__control__add-to-cart-btn")
            ? (document.querySelector(
                ".pdp__content__control__add-to-cart-btn"
              ).dataset.id = selectedVariant.id)
            : null;
          document.querySelector(".pdp__content__control__notify-me-btn")
            ? (document.querySelector(
                ".pdp__content__control__notify-me-btn"
              ).dataset.id = selectedVariant.id)
            : null;
          document.querySelector(".pdp_notify_button")
            ? (document.querySelector(".pdp_notify_button").dataset.id =
                selectedVariant.id)
            : null;

          //Update the Sliders.
          const medias = window.objectData.product.media;
          const meidaFilterText = `_${selectedOption}_`;
          const selectedImages = medias.filter(
            (item) => item.alt && item.alt.includes(meidaFilterText)
          );

          let masterGalleryHTMLString = "";

          selectedImages.forEach((slide) => {
            if (slide.media_type === "image") {
              const slideHTML = `
                            <div class="pdp__media__master__slide">
                                <img src="${slide?.src}" alt="${slide?.alt}" class="pdp__media__master__slide__img">
                            </div>
                        `;
              masterGalleryHTMLString = masterGalleryHTMLString + slideHTML;
            }

            if (slide.media_type === "video") {
              const slideHTML = `
                            <div class="pdp__media__master__slide">
                            <div class="pdp__media__master__slide__video-playbox">
                                <img src="https://cdn.shopify.com/s/files/1/0575/8517/2679/files/playbutton2.png?v=1627570945" alt="" class="pdp__media__master__slide__video-playbox__img">
                            </div>
                                <video width="100%" muted controls>${renderVideoSources(
                                  slide
                                )}</video>
                            </div>
                        `;
              masterGalleryHTMLString = masterGalleryHTMLString + slideHTML;
            }
          });

          let thumbsGalleryHTMLString = "";
          selectedImages.forEach((slide) => {
            if (slide.media_type === "image") {
              const slideHTML = `
                            <div class="pdp__media__thumbs__slide">
                                <img src="${slide?.src}" alt="" class="pdp__media__master__slide__img">
                            </div>
                        `;
              thumbsGalleryHTMLString = thumbsGalleryHTMLString + slideHTML;
            }

            if (slide.media_type === "video") {
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
          });

          if (masterGalleryHTMLString) {
            $(".pdp__media__master__slider").slick("unslick");
            $(".pdp__media__thumbs__slider").slick("unslick");

            document.querySelector(".pdp__media__master__slider").innerHTML =
              masterGalleryHTMLString;
            document.querySelector(".pdp__media__thumbs__slider").innerHTML =
              thumbsGalleryHTMLString;

            $(".pdp__media__master__slider").slick({
              dots: false,
              arrows: true,
              fade: true,
              prevArrow: $(
                ".pdp__media__master__slider__arrow.pdp__media__master__slider__arrow-prev"
              ),
              nextArrow: $(
                ".pdp__media__master__slider__arrow.pdp__media__master__slider__arrow-next"
              ),
            });

            $(".pdp__media__thumbs__slider").slick({
              slidesToShow: 4,
              slidesToScroll: 1,
              dots: false,
              arrows: false,
              asNavFor: ".pdp__media__master__slider",
              focusOnSelect: true,
            });

            const allImgs = document.querySelectorAll(
              ".pdp__media__master__slide__img"
            );
            const allImgsLength = allImgs.length;
            let counter = 0;

            [].forEach.call(allImgs, function (img) {
              if (img.complete) {
                countPlus();
              } else {
                img.addEventListener("load", countPlus, false);
              }
            });

            function countPlus() {
              counter = counter + 1;
              if (counter === allImgsLength) {
                // console.log("All Images loaded!")
                showSlides();
                hideLoader();
              }
            }

            // console.log(allImgs);
            // allImgs.forEach(img => {
            //     img.addEventListener('load', () => console.log("hello laodded."))
            // })
          }

          // Update the CTA button on variant availablity
          const ctaHolder = document.querySelector(".pdp__content__control");
          const ctaAddToCart = document.querySelector(
            ".pdp__content__control__add-to-cart-btn"
          );
          const ctaNotifyMe = document.querySelector(
            ".pdp__content__control__notify-me-btn"
          );

          const ctaNotifyMeApp = document.querySelector(".pdp_notify_button");

          if (selectedVariant.available) {
            ctaNotifyMe.style.display = "none";
            ctaAddToCart.style.display = "grid";
            ctaNotifyMeApp.style.display = "none";
          } else {
            ctaAddToCart.style.display = "none";
            ctaNotifyMe.style.display = "grid";
            ctaNotifyMeApp.style.display = "flex";
          }
        });
      });
  }

  // PDP accordion
  function accordion() {
    const customAccordions = document.querySelectorAll(
      selectors.accordionHeading
    );
    // console.log(customAccordions)

    customAccordions &&
      customAccordions.forEach((accordion) => {
        accordion.addEventListener("click", function (e) {
          // console.log(e.target);

          const body = e.target
            .closest(selectors.accordionItem)
            .querySelector(selectors.accordionBody);
          if (body.classList.contains("active")) {
            body.classList.remove("active");
            gsap.to(body, { height: 0 });
          } else {
            body.classList.add("active");
            gsap.to(body, { height: "auto" });
          }
        });
      });
  }

  return {
    init: () => {
      countListeners();
      swatchListeners();
      pdpAddedToCartModalListeners();
      addToCart();
      accordion();
    },
  };
})();

export default PDPListeners;
