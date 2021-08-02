
import "regenerator-runtime/runtime";


import * as cart from '@shopify/theme-cart';
import lazyload from './lazyload';

import Currency from './money-format';
import MediaGallery from './pdp/master-gallery-slider';
import PDPListeners from './pdp/pdp-listeners';
import HeaderListeners from './listeners/header-listeners';
import RelatedProductSlider from './pdp/related-product-slider';
import SparxScripts from './sparx/sparx-scripts'
import HomeSliderSparx from "./sparx/homeSlider";

import {state, getAllProductsWithType} from './model'

import RelatedProductsView from './views/RelatedProductsView'

window.Cart = cart;

document.addEventListener('DOMContentLoaded', function() {
  lazyload();
  SparxScripts.init();
  HeaderListeners.init();
  HomeSliderSparx.init();

  if(window.objectData.template == 'product') {
    MediaGallery.init();
    RelatedProductSlider.init();
    PDPListeners.init();
  }

});


const controlRelatedProducts = async () => {
  try {
    // 1. Get the Current product type 
    const currentType = window.objectData.product?.type;
    await getAllProductsWithType("en", currentType);
    console.log(state.relatedProducts);

    RelatedProductsView.render(state.relatedProducts);
    RelatedProductsView.initSlider();

  }catch(err) {
    console.log(err.message);
  }
}


function init() {  
  if(window.objectData.template == 'product') {
    controlRelatedProducts();
  }
}

init();