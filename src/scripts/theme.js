import * as cart from '@shopify/theme-cart';

import Currency from './money-format';
import MediaGallery from './pdp/master-gallery-slider';
import PDPListeners from './pdp/pdp-listeners';
import SparxScripts from './sparx/sparx-scripts'

window.Cart = cart;

document.addEventListener('DOMContentLoaded', function() {
  MediaGallery.init();
  SparxScripts.init();
  PDPListeners.init();
});