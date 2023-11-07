class HomepageHeroSliderView {
  initSlider() {
    jQuery(".h__slider").slick({
      speed: 1000,
      slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: 10000,
      slidesToScroll: 1,
      dots: true,
      arrows: true,
      adaptiveHeight: true,
    });
  }

  addHandlerClicks(handler) {
    window.addEventListener("load", () => {
      const videos = document.querySelectorAll(".h__slide__video");
      videos &&
        videos.forEach((video) => {
          video.addEventListener("click", (e) => handler(e));
        });
    });
  }
}

export default new HomepageHeroSliderView();

//  Return to Hompage script
let return_hp = document.querySelector(".return_to_hp");
return_hp.addEventListener("click", () => {
  document.querySelector(".mb-burger-icon").click();
});
