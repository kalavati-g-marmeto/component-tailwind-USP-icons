class Carousel extends HTMLElement {
  constructor() {
    super();
    this.carouselElement = this;

    // Carousel element should have class splide
    if (!this.carouselElement.classList.contains('splide')) return;

    this.desktopPerPage = this.carouselElement.dataset['desktopperpage'] || 4;
    this.mobilePerPage = this.carouselElement.dataset['mobileperpage'] || 1;
    this.focus = this.carouselElement.dataset['focus'] || 'left';
    this.type = this.carouselElement.dataset['type'] || 'loop';
    this.gap = this.carouselElement.dataset['gapbetweenslides'] || 10;
    this.mobileGap = this.carouselElement.dataset['mobilegapbetweenslides'] || 10;
    this.autoplaySpeed = parseInt(this.dataset['autoplaySpeed']) || 3000;

    // Data attribute string matching for correct boolean value
    // The fallback is used if the developer make mistake the code is forgiving
    this.showarrows = this.carouselElement.dataset['showarrows'] === 'true' || false;
    this.autoplay = this.carouselElement.dataset['autoplay'] === 'true' || false;
    this.showarrowsonmobile = this.carouselElement.dataset['showarrowsonmobile'] === 'true' || false;
    this.showdots = this.carouselElement.dataset['showdots'] === 'true' || false;
    this.showdotsonmobile = this.carouselElement.dataset['showdotsonmobile'] === 'true' || false;
    this.isNavigation = this.carouselElement.dataset['isnavigation'] === 'true' || false;
    this.disableDrag = this.carouselElement.dataset['disabledrag'] === 'true' || false;
    this.omitend = this.carouselElement.dataset['omitend'] === 'true' || false;
    this.slideShow = this.querySelector('.slide-show__banner')
    this.fixedwidth = this.carouselElement.dataset['fixedwidth'] || null;
    this.fixedmobilewidth = this.carouselElement.dataset['fixedmobilewidth'] || null;
    this.autoWidth = this.carouselElement.dataset['autowidth'] || false;
    this.nodrag = this.carouselElement.dataset['nodrag'] || null;

    this.sync = this.carouselElement.dataset['carouselsyncselector'] || false;

    this.initCarousel();
  }

  initCarousel() {
    console.log(this.mobilePerPage)
    // More option available here https://splidejs.com/documents/
    // This slider can be customized as require check the above doc before adding any new 
    // Slider library.
    this.carousel = new Splide(this.carouselElement, {
      perPage: this.desktopPerPage,
      perMove: 1,
      type: this.type,
      focus: this.focus,
      autoplay: this.autoplay,
      interval: this.autoplaySpeed,
      gap: this.gap,
      arrows: this.showarrows,
      pagination: this.showdots,
      isNavigation: this.isNavigation,
      drag: !this.disableDrag,
      fixedWidth: this.fixedwidth,
      noDrag: this.nodrag,
      omitEnd: this.omitend,
      autoWidth : this.autoWidth,
      breakpoints: {
        767: {
          perPage: this.mobilePerPage,
          arrows: this.showarrowsonmobile,
          gap: this.mobileGap,
          fixedWidth: this.fixedmobilewidth,
          pagination: this.showdotsonmobile
        }
      },
    });
    const carousel = this.carousel
    const slideShow = this.slideShow
    if (slideShow) {
      carousel.on('mounted move', function () {
        promoViewEvent();
      });
    }

    if (this.sync) {
      this.initCarouselSync()
    } else {
      this.carousel.mount();
    }
  }

  initCarouselSync() {
    this.syncElement = document.querySelector(this.sync);

    this.carouselSync = new Splide(this.sync, {
      updateOnMove: true,
      perPage: this.syncElement.dataset['desktopperpage'] || 5,
      type: this.syncElement.dataset['type'] || 'loop',
      focus: this.syncElement.dataset['focus'] || 'center',
      isNavigation: this.syncElement.dataset['isnavigation'] === 'true' || false,
      pagination: false,
      arrows: this.syncElement.dataset['showarrows'] === 'true' || false,
    });

    this.carousel.sync(this.carouselSync);
    this.carousel.mount();
    this.carouselSync.mount();
  };

  refreshSlider() {
    this.carousel.refresh();
    if (this.carouselSync) {
      this.carouselSync.refresh();
    }
  }
}

customElements.define('carousel-component', Carousel);
