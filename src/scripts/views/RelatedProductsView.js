import Currency from "../money-format";

class RelatedProductsView {
  parentElJQuery = $(".pdp-like__slider");
  parentEl = document.querySelector(".pdp-like__slider");
  _data;

  initSlider() {
    this.parentElJQuery.slick({
      slidesToShow: 5,
      dots: false,
      arrows: true,
      prevArrow: $(".pdp-like__slider__arrow.pdp-like__slider__arrow-prev"),
      nextArrow: $(".pdp-like__slider__arrow.pdp-like__slider__arrow-next"),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    });
  }

  render(prods) {
    this._data = prods;
    if (!this._data || this._data.length < 1) return;

    this.parentElJQuery.slick("unslick");
    this.parentEl.innerHTML = "";

    const markup = this._generateMarkup();
    this.parentEl.insertAdjacentHTML("afterbegin", markup);
    let api = new Yotpo.API(window.yotpo);  api.refreshWidgets();
    console.log('recomendation loaded')
  }

  _clean() {
    this.parentEl.innerHTML = "";
  }

  _generateMarkup() {
    return this._data.map((prod) => this._generateMarkupSlide(prod)).join("");
  }

  _getComparePrice(min, max) {
    if (min >= max) {
      return "";
    } else {
      return max ? Currency.formatMoney(max + "0") : "";
    }
  }

  _generateMarkupSlide(prod) {
    var inputString = prod?.id;
    var regex = /(\d+)/;
    var match = inputString.match(regex);
    if (match) {
      var productIdNumber = match[0];
    } else {
      console.log("No number found in the string");
    }
    return `                     
          <a href="/products/${prod.handle}" class="pdp-like__slider__item ${
      prod.variants?.availableForSale
    }">
              <figure class="pdp-like__slider__item__imgbox">
                  <img src="${prod.image?.originalSrc}" alt="${
      prod.image?.altText ? prod.image?.altText : ""
    }" class="pdp-like__slider__item__img"/>
              </figure>

              <div class="pdp-like__slider__item__title">${prod?.title}</div>
              <div class="pdp-like__slider__item__price">
                  <div class="pdp-like__slider__item__price__original">${
                    prod?.productMinPrice
                      ? Currency.formatMoney(prod?.productMinPrice + "0")
                      : ""
                  }</div>                
                  <div class="pdp-like__slider__item__price__compare">${this._getComparePrice(
                    prod?.productMinPrice,
                    prod?.productMaxPrice
                  )}</div>                
              </div>
              <div class="review-rating-widgets">
              <div class="yotpo bottomLine" data-product-id="${productIdNumber}"></div>
                </div>
          </a>
        `;
  }

  addHandlerLoad(handler) {
    document.addEventListener("DOMContentLoaded", function () {
      handler();
    });
  }
}

export default new RelatedProductsView();
