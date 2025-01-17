import "regenerator-runtime/runtime";

import * as cart from '@shopify/theme-cart';
import lazyload from './lazyload';

import Currency from './money-format';
import MediaGallery from './pdp/master-gallery-slider';
import PDPListeners from './pdp/pdp-listeners';
import HeaderListeners from './listeners/header-listeners';
import RelatedProductSlider from './pdp/related-product-slider';
import SparxScripts from './sparx/sparx-scripts'

import {state, getAllProductsWithType} from './model'

import RelatedProductsView from './views/RelatedProductsView'

window.Cart = cart;

document.addEventListener('DOMContentLoaded', function() {
  lazyload();
  MediaGallery.init();
  RelatedProductSlider.init();
  SparxScripts.init();
  PDPListeners.init();
  HeaderListeners.init();
});

const controlRelatedProducts = async () => {
  try {
    await getAllProductsWithType('mens');
    RelatedProductsView.render(state.relatedProducts);
    RelatedProductsView.initSlider();
  }catch(err) {
    console.log(err.message);
  }
}


function init() {
  console.log("Running from MVC")
  controlRelatedProducts();
}

init();