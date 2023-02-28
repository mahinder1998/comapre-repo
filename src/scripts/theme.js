import "regenerator-runtime/runtime";

import * as cart from "@shopify/theme-cart";
import lazyload from "./lazyload";

import Currency from "./money-format";
import MediaGallery from "./pdp/master-gallery-slider";
import PDPListeners from "./pdp/pdp-listeners";
import HeaderListeners from "./listeners/header-listeners";
import RelatedProductSlider from "./pdp/related-product-slider";
import SparxScripts from "./sparx/sparx-scripts";
import HomeSliderSparx from "./sparx/homeSlider";
import HomepageHeroSliderView from "./views/HomepageHeroSliderView";

import { state, getAllProductsWithType } from "./model";

import RelatedProductsView from "./views/RelatedProductsView";

window.Cart = cart;

document.addEventListener("DOMContentLoaded", function () {
  lazyload();
  SparxScripts.init();
  HeaderListeners.init();
  HomeSliderSparx.init();

  if (
    window.objectData.template == "product" ||
    window.objectData.template == "product.th-bundle"
  ) {
    MediaGallery.init();
    RelatedProductSlider.init();
    PDPListeners.init();
  }
});

const controlRelatedProducts = async () => {
  try {
    // 1. Get the Current product type
    const currentType = window.objectData.product?.type;
    if (langify) {
      if (langify.locale.iso_code === "ar") {
        await getAllProductsWithType("ar", currentType);
      } else {
        await getAllProductsWithType("en", currentType);
      }
    } else {
      await getAllProductsWithType("en", currentType);
    }
    RelatedProductsView.render(state.relatedProducts);
    RelatedProductsView.initSlider();
  } catch (err) {
    console.log(err.message);
  }
};

const controlHomepageHeroBannerVideos = (e) => {
  const parentEl = e.target.closest(".h__slide__inner");
  const allChildren = parentEl ? Array.from(parentEl.children) : null;
  if (!allChildren || allChildren.length < 1) return;
  const allVideoChildrens = allChildren.filter(
    (child) => child.localName == "video"
  );

  allVideoChildrens &&
    allVideoChildrens.forEach((v) => {
      if (v.paused) {
        v.play();
        v.closest(".h__slide__inner")
          .querySelector(".h__slide__play-icon")
          .classList.add("hide");
      } else {
        v.pause();
        v.closest(".h__slide__inner")
          .querySelector(".h__slide__play-icon")
          .classList.remove("hide");
      }
    });
};

function init() {
  HomepageHeroSliderView.addHandlerClicks(controlHomepageHeroBannerVideos);
  HomepageHeroSliderView.initSlider();

  if (
    window.objectData.template == "product" ||
    window.objectData.template == "product.th-bundle"
  ) {
    RelatedProductsView.addHandlerLoad(controlRelatedProducts);
  }
}
window.$th_bundle_addtocart_callback = function () {
  $(".pdpmodal-addedtocart__modal").show();
  $(".pdpmodal-addedtocart__overlay").show();
  $("#shopify-section-header").load(location.href + " #shopify-section-header");
};
$(
  ".pdpmodal-addedtocart__modal__close-btn, .pdpmodal-addedtocart__modal__continue"
).click(function () {
  $(".pdpmodal-addedtocart__modal").hide();
  $(".pdpmodal-addedtocart__overlay").hide();
});
jQuery(document).on("click", ".mb-cart-flex", function () {
  $(".mini-cart-content").toggleClass("hide");
});

init();
