$(function() {
  // $(document).foundation();

  const $sidebar = $('#sidebar');
  if ($sidebar.length) {
    const $docs = $('#docs');
    const $nav = $sidebar.find('nav');

    //
    // Setup sidebar navigation
    const traverse = new Traverse($nav, {
      threshold: 10,
      barOffset: $sidebar.position().top,
    });

    $nav.on('update.traverse', function(event, element) {
      $nav.find('section').removeClass('expand');
      const $section = element.parents('section:first');
      if ($section.length) {
        $section.addClass('expand');
      }
    });

    //
    // Bind the drawer layout
    const $drawerLayout = $('.drawer-layout');
    const $drawer = $drawerLayout.find('.drawer');
    const closeDrawer = function() {
      $drawer.removeClass('slide-right slide-left');
      $drawer.find('.drawer-overlay').remove();
      $drawerLayout.removeClass('drawer-open drawer-slide-left-large drawer-slide-right-large');
      return false;
    };

    // Drawer open buttons
    $drawerLayout.find('[data-drawer-slide]').click(function(e) {
      const $this = $(this);
      const direction = $this.data('drawer-slide');
      $drawerLayout.addClass('drawer-open');
      $drawer.addClass('slide-' + direction);

      const $overlay = $('<a href="#" class="drawer-overlay"></a>');
      $drawer.append($overlay);
      $overlay.click(closeDrawer);

      return false;
    });

    // Drawer close buttons
    $drawerLayout.find('[data-drawer-close]').click(closeDrawer);
  }
});

/**
 * Creates a new instance of Traverse.
 * @class
 * @fires Traverse#init
 * @param {Object} element - jQuery object to add the trigger to.
 * @param {Object} options - Overrides to the default plugin settings.
 */
function Traverse(element, options) {
  this.$element = element;
  this.options = $.extend({}, Traverse.defaults, this.$element.data(), options);

  this._init();
}

/**
 * Default settings for plugin
 */
Traverse.defaults = {
  /**
   * Amount of time, in ms, the animated scrolling should take between locations.
   * @option
   * @example 500
   */
  animationDuration: 500,
  /**
   * Animation style to use when scrolling between locations.
   * @option
   * @example 'ease-in-out'
   */
  animationEasing: 'linear',
  /**
   * Number of pixels to use as a marker for location changes.
   * @option
   * @example 50
   */
  threshold: 50,
  /**
   * Class applied to the active locations link on the traverse container.
   * @option
   * @example 'active'
   */
  activeClass: 'active',
  /**
   * Allows the script to manipulate the url of the current page, and if supported, alter the history.
   * @option
   * @example true
   */
  deepLinking: false,
  /**
   * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
   * @option
   * @example 25
   */
  barOffset: 0,
};

/**
 * Initializes the Traverse plugin and calls functions to get equalizer functioning on load.
 * @private
 */
Traverse.prototype._init = function() {
  const id = this.$element[0].id; // || Foundation.GetYoDigits(6, 'traverse'),
  const _this = this;
  this.$targets = $('[data-traverse-target]');
  this.$links = this.$element.find('a');
  this.$element.attr({
    'data-resize': id,
    'data-scroll': id,
    'id': id,
  });
  this.$active = $();
  this.scrollPos = parseInt(window.pageYOffset, 10);

  this._events();
};

/**
 * Calculates an array of pixel values that are the demarcation lines between locations on the page.
 * Can be invoked if new elements are added or the size of a location changes.
 * @function
 */
Traverse.prototype.calcPoints = function() {
  const _this = this;
  const body = document.body;
  const html = document.documentElement;

  this.points = [];
  this.winHeight = Math.round(Math.max(window.innerHeight, html.clientHeight));
  this.docHeight = Math.round(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight));

  this.$targets.each(function() {
    const $tar = $(this);
    const pt = $tar.offset().top; // Math.round($tar.offset().top - _this.options.threshold);
    $tar.targetPoint = pt;
    _this.points.push(pt);
  });
};

/**
 * Initializes events for Traverse.
 * @private
 */
Traverse.prototype._events = function() {
  const _this = this;
  const $body = $('html, body');
  const opts = {
    duration: _this.options.animationDuration,
    easing: _this.options.animationEasing,
  };

  $(window).one('load', function() {
    _this.calcPoints();
    _this._updateActive();

    $(this).resize(function(e) {
      _this.reflow();
    }).scroll(function(e) {
      _this._updateActive();
    });
  });

  this.$element.on('click', 'a[href^="#"]', function(e) { // 'click.zf.traverse'
    e.preventDefault();
    const arrival = this.getAttribute('href').replace(/\./g, '\\.');
    const scrollPos = $(arrival).offset().top - _this.options.barOffset; // - _this.options.threshold / 2 - _this.options.barOffset;

    $body.stop(true).animate({
      scrollTop: scrollPos,
    }, opts);
  });
};

/**
 * Calls necessary functions to update Traverse upon DOM change
 * @function
 */
Traverse.prototype.reflow = function() {
  this.calcPoints();
  this._updateActive();
};

/**
 * Updates the visibility of an active location link,
 * and updates the url hash for the page, if deepLinking enabled.
 * @private
 * @function
 * @fires Traverse#update
 */
Traverse.prototype._updateActive = function() {
  const winPos = parseInt(window.pageYOffset, 10);
  let curIdx;

  if (winPos + this.winHeight === this.docHeight) {
    curIdx = this.points.length - 1;
  } else if (winPos < this.points[0]) {
    curIdx = 0;
  } else {
    const isDown = this.scrollPos < winPos;
    const _this = this;
    const curVisible = this.points.filter(function(p, i) {
      return isDown ?
             p <= (winPos + _this.options.barOffset + _this.options.threshold) :
             (p - (_this.options.barOffset + _this.options.threshold)) <= winPos;
      //   p <= (winPos - (offset - _this.options.threshold)) :
      //   (p - (-offset + _this.options.threshold)) <= winPos;
    });
    curIdx = curVisible.length ? curVisible.length - 1 : 0;
  }

  const $prev = this.$active;
  const $next = this.$links.eq(curIdx);
  this.$active.removeClass(this.options.activeClass);
  this.$active = $next.addClass(this.options.activeClass);

  if (this.options.deepLinking) {
    const hash = this.$active[0].getAttribute('href');
    if (window.history.pushState) {
      window.history.pushState(null, null, hash);
    } else {
      window.location.hash = hash;
    }
  }

  this.scrollPos = winPos;

  // Fire event if the active element was changed
  const changed = $prev[0] !== $next[0];
  if (changed) {
    this.$element.trigger('update.traverse', [this.$active]);
  }
};
