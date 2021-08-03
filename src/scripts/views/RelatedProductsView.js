import Currency from '../money-format';

class RelatedProductsView {
    parentElJQuery = $('.pdp-like__slider');
    parentEl = document.querySelector('.pdp-like__slider')
    _data;

    initSlider() {
        this.parentElJQuery.slick({
            slidesToShow: 5,
            dots: false,
            arrows: true,
            prevArrow: $('.pdp-like__slider__arrow.pdp-like__slider__arrow-prev'),
            nextArrow: $('.pdp-like__slider__arrow.pdp-like__slider__arrow-next'),
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
            ]
        });
    }

    render(prods) {
        // console.log(prods)
        this._data = prods;
        if(!this._data || this._data.length < 1) return;

        this.parentElJQuery.slick('unslick')
        this.parentEl.innerHTML = "";

        // console.log(this.parentEl)

        const markup = this._generateMarkup();
        this.parentEl.insertAdjacentHTML('afterbegin', markup)
    }

    _clean() {
        this.parentEl.innerHTML = "";
    }

    _generateMarkup() {
        return this._data.map(prod => this._generateMarkupSlide(prod)).join('')
    }

    _getComparePrice(min, max) {
      if(min >= max) {
        return "";
      }else {
        return max ? Currency.formatMoney(max+"0") : "";
      }
    }

    _generateMarkupSlide(prod) {
        return `
          <a href="/products/${prod.handle}" class="pdp-like__slider__item">
              <figure class="pdp-like__slider__item__imgbox">
                  <img src="${prod.image?.originalSrc}" alt="${prod.image?.altText ? prod.image?.altText : ""}" class="pdp-like__slider__item__img"/>
              </figure>

              <div class="pdp-like__slider__item__title">${prod?.title}</div>
              <div class="pdp-like__slider__item__price">
                  <div class="pdp-like__slider__item__price__original">${prod?.productMinPrice ? Currency.formatMoney(prod?.productMinPrice + "0") : ""}</div>                
                  <div class="pdp-like__slider__item__price__compare">${
                    this._getComparePrice(prod?.productMinPrice, prod?.productMaxPrice)
                  }</div>                
              </div>
          </a>
        `;
    }

    addHandlerLoad(handler) {
      window.addEventListener('load', handler);
    }

}

export default new RelatedProductsView();


