;(function ($) {
  class Modal{
    constructor(element, options) {
      this.modal = element;
      this.defaultOptions = {
        closeClass: ".close-modal",
        overlayOpacity: 0.7,
        duration: 500,
        autoClose: false,
        autoCloseTime: 1000
      };
      this.options = $.extend(this.defaultOptions, options);
      this.autoCloseModal = setTimeout(() => this.closeModal(),  this.options.autoClose ? this.options.autoCloseTime : 2000);
    }

    init() {
      // показываем overlay
      this.showOverlay()
      // показываем модальное окно
            .then( () => this.showModal());
      // Установить события
      this.setEvents();
      this.autoCloseModal;
    }

    showOverlay() {
      return new Promise((resolve) => {
        // скрываем у body боковой скролл
       $("body").css({"overflow-y": "hidden"});

       const overlay = $("<div class='overlay'></div>").css({
           "display": "block",
           "position": "fixed",
           "top": 0,
           "left": 0,
           "width": "100%",
           "height": "100%",
           "z-index": 999,
           "opacity": 0,
           "background-color": `rgba(0, 0, 0, ${this.options.overlayOpacity})`
       });

       this.modal.before(overlay);

       resolve();
      })
    }

    showModal() {
      return new Promise((resolve) => {
        // get width and height of modal window
        const {halfWidth, halfHeight} = this.calcModalSize();

        // show overlay
        $('.overlay').animate({
            'opacity': 1
        }, this.options.duration);

        // show modal window
        this.modal.css({
            'display': 'block',
            'position': 'fixed',
            'top': '50%',
            'left': '50%',
            'z-index': '1000',
            'opacity': 0,
            'margin-top': `-${halfHeight}px`,
            'margin-left': `-${halfWidth}px`
        }).animate({'opacity': 1},this.options.duration);

        resolve();
      });
    };

    setEvents() {
      $(".overlay").on("click", (e) => this.closeModal());
      $(this.options.closeClass).on("click", (e) => this.closeModal());
    }

    clearEvents() {
      $(".overlay").off("click");
      $(this.options.closeClass).off("click");

    }

    closeModal() {
      $("body").css({"overflow-y": "auto"});
      // удаляем overlay
      $(".overlay")
        .animate({"opacity": 0}, this.options.duration, () => $(".overlay").remove());

      // скрываем модальное окно
      this.modal.animate({
        "opacity": 0
      }, this.options.duration, () => this.modal.css({"display": "none"}));

      // удаляем события
      this.clearEvents();
      // удаляем autoClose event
      clearTimeout(this.autoCloseModal);
    }

    calcModalSize() {
      const halfWidth = this.modal.outerWidth() / 2;
      const halfHeight = this.modal.outerHeight() / 2;

      return {
        halfWidth,
        halfHeight
      }
    }
  }

  $.fn.easyModal = function (options) {
    new Modal(this, options).init();
  }
})(jQuery);

;(function ($) {
    class Plugin {
        constructor(element, options) {
            this.elements = element;
            this.options = options;
        }

        init() {
            if($(this.elements).css('opacity') == 1) this.animation(0, 0);
            else this.animation(1, '120px');
        }

        animation(opacity, height) {
            this.elements.animate({
                'opacity': opacity,
                'height': height
            }, 2000);
        }
    }
    $.fn.myPlugin = function (options) {
        new Plugin(this, options).init();
    }
}) (jQuery);
