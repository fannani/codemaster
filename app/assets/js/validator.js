(function($) {
  $.fn.isAfter = function(sel) {
    return this.prevAll().filter(sel).length !== 0;
  };

  $.fn.isBefore = function(sel) {
    return this.nextAll().filter(sel).length !== 0;
  };
})(jQuery);
