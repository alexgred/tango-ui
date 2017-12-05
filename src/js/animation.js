(function ($) {
  'use strict';

  $.fn.viewportChecker = function (useroptions) {

    // Define options and extend with user
    var options = {
      classToAdd: 'visible',
      offset: 100,
      scrollBox: window
    };
    $.extend(options, useroptions);

    var $elem = this;
    var boxSize = {height: $(options.scrollBox).height(), width: $(options.scrollBox).width()};

    /*
      * Main method
      */
    this.checkElements = function () {
      var viewportStart;
      var viewportEnd;

      // Set vars to check
      if (!options.scrollHorizontal) {
        viewportStart = Math.max(
          $('html').scrollTop(),
          $('body').scrollTop(),
          $(window).scrollTop()
        );
        viewportEnd = (viewportStart + boxSize.height);
      }
      else {
        viewportStart = Math.max(
          $('html').scrollLeft(),
          $('body').scrollLeft(),
          $(window).scrollLeft()
        );
        viewportEnd = (viewportStart + boxSize.width);
      }

      // Loop through all given dom elements
      $elem.each(function () {
        var $obj = $(this);
        var objOptions = {};
        var attrOptions = {};

        if ($obj.data('vp-add-class')) {
          attrOptions.classToAdd = $obj.data('vp-add-class');
        }
        if ($obj.data('vp-offset')) {
          attrOptions.offset = $obj.data('vp-offset');
        }

        $.extend(objOptions, options);
        $.extend(objOptions, attrOptions);

        // If class already exists; quit
        if ($obj.data('vp-animated')) {
          return;
        }

        // Check offset is percentage based
        if (String(objOptions.offset).indexOf('%') > 0) {
          objOptions.offset = (parseInt(objOptions.offset) / 100) * boxSize.height;
        }

        // Get the raw start and end positions
        var rawStart = $obj.offset().top;

        // Add the defined offset
        var elemStart = Math.round(rawStart) + objOptions.offset;
        var elemEnd = elemStart + $obj.height();

        // Add class if in viewport
        if ((elemStart < viewportEnd) && (elemEnd > viewportStart)) {
          $obj.addClass(objOptions.classToAdd);
          $obj.data('vp-animated', true);
        }
      });
    };

    // Select events
    if ('ontouchstart' in window || 'onmsgesturechange' in window) {
      // Device with touchscreen
      $(document).bind('touchmove MSPointerMove pointermove', this.checkElements);
    }

    $(options.scrollBox).bind('load scroll', this.checkElements);

    $(window).resize(function (e) {
      boxSize = {height: $(options.scrollBox).height(), width: $(options.scrollBox).width()};
      $elem.checkElements();
    });

    this.checkElements();

    return this;
  };

})(jQuery);
