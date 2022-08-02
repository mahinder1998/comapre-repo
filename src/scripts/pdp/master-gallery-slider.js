const MediaGallery = (() => {
  const parentEl = document.querySelector(".pdp__media");

  function renderVideoSources(slide) {
    if (!slide) return;
    return slide.sources
      .map((source) => {
        return `<source src="${source.url}" type="${source.mime_type}"/>`;
      })
      .join("");
  }

  function renderSlide(slide) {
    if (slide.media_type === "image") {
      const slideHTML = `
                <div class="pdp__media__master__slide">
                    <img src="${slide?.src}" alt="${slide?.alt}" class="pdp__media__master__slide__img">
                </div>
            `;
      document
        .querySelector(".pdp__media__master__slider")
        .insertAdjacentHTML("beforeend", slideHTML);
    }

    if (slide.media_type === "video") {
      const slideHTML = `
                <div class="pdp__media__master__slide">
                    <div class="pdp__media__master__slide__video-playbox">
                    <img src="https://cdn.shopify.com/s/files/1/0575/8517/2679/files/playbutton2.png?v=1627570945" alt="" class="pdp__media__master__slide__video-playbox__img">
                    </div>
                    <video width="100%" muted controls preload="metadata">${renderVideoSources(
                      slide
                    )}</video>
                </div>
            `;
      document
        .querySelector(".pdp__media__master__slider")
        .insertAdjacentHTML("beforeend", slideHTML);
    }
  }

  function renderThumb(slide) {
    if (slide.media_type === "image") {
      const slideHTML = `
                <div class="pdp__media__thumbs__slide">
                    <img src="${slide?.src}" alt="" class="pdp__media__master__slide__img">
                </div>
            `;
      document
        .querySelector(".pdp__media__thumbs__slider")
        .insertAdjacentHTML("beforeend", slideHTML);
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
      document
        .querySelector(".pdp__media__thumbs__slider")
        .insertAdjacentHTML("beforeend", slideHTML);
    }
  }

  function renderMasterSlides(images) {
    document.querySelector(".pdp__media__master__slider").innerHTML = "";
    images.forEach((slide) => renderSlide(slide));
  }

  function renderThumbSlides(images) {
    document.querySelector(".pdp__media__thumbs__slider").innerHTML = "";
    images.forEach((slide) => renderThumb(slide));
  }

  function initSlides() {
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
  }

  function addListeners() {
    if (!parentEl) return;

    const videos = parentEl.querySelectorAll("video");
    if (!videos) return;

    videos.forEach((v) => {
      v.addEventListener("play", (event) => {
        event.target
          .closest(".pdp__media__master__slide")
          .querySelector(
            ".pdp__media__master__slide__video-playbox"
          ).style.display = "none";
      });
      v.addEventListener("pause", (event) => {
        event.target
          .closest(".pdp__media__master__slide")
          .querySelector(
            ".pdp__media__master__slide__video-playbox"
          ).style.display = "block";
      });
    });
  }

  function showSlides() {
    document.querySelector(".pdp__media__shimmer").style.display = "none";
    document.querySelector(".pdp__media__master").style.opacity = 1;
    document.querySelector(".pdp__media__master").style.visibility = "visible";
    document.querySelector(".pdp__media__thumbs").style.opacity = 1;
    document.querySelector(".pdp__media__thumbs").style.visibility = "visible";
  }

  return {
    init: () => {
      if (objectData.product) {
        if (objectData.hasOnlyDefaultVariant) {
          initSlides();
          setTimeout(() => {
            showSlides();
          }, 300);
        } else {
          const medias = objectData?.product?.media;
          const currentAlt = objectData?.selectedVaraint?.featured_image?.alt;
          const currentVariantImages = medias?.filter((media) => {
            if (media.alt === null) {
              return medias;
            } else {
              return media.alt;
            }
          });

          renderMasterSlides(currentVariantImages);
          renderThumbSlides(currentVariantImages);

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

              initSlides();
              showSlides();
            }
          }
        }
      }
      addListeners();
    },
  };
})();

window.MediaGallery = MediaGallery;
export default MediaGallery;
