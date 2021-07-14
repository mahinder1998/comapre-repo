import * as cart from '@shopify/theme-cart';

import Currency from './money-format';
import MediaGallery from './pdp/master-gallery-slider';
import PDPListeners from './pdp/pdp-listeners';
import HeaderListeners from './listeners/header-listeners';
import RelatedProductSlider from './pdp/related-product-slider';
import SparxScripts from './sparx/sparx-scripts'

window.Cart = cart;

document.addEventListener('DOMContentLoaded', function() {
  MediaGallery.init();
  RelatedProductSlider.init();
  SparxScripts.init();
  PDPListeners.init();
  HeaderListeners.init();
});

