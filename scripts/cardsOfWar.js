// Create all cards of the game
let deck = [
  { name: 'CHAMAELEON', description: 'THE CHAMELEON', power: 3, damage: 2, element: 'EARTH', img: 'CHAMAELEON.png', status: true },
  { name: 'PARDALIS', description: 'THE GIRAFFE', power: 4, damage: 2, element: 'EARTH', img: 'PARDALIS.png', status: true },
  { name: 'CORVUS', description: 'THE RAVEN', power: 8, damage: 5, element: 'WIND', img: 'CORVUS.png', status: true },
  { name: 'VULPECULA', description: 'THE LITTLE FOX', power: 2, damage: 4, element: 'EARTH', img: 'VULPECULA.png', status: true },
  { name: 'LACERTA', description: 'THE LIZARD', power: 5, damage: 2, element: 'EARTH', img: 'LACERTA.png', status: true },
  { name: 'CETUS', description: 'THE WHALE', power: 5, damage: 2, element: 'WATER', img: 'CETUS.png', status: true },
  { name: 'INDUS', description: 'THE INDIAN', power: 5, damage: 3, element: 'EARTH', img: 'INDUS.png', status: true },
  { name: 'VOLANS', description: 'THE FLYING FISH', power: 7, damage: 2, element: 'WATER', img: 'VOLANS.png', status: true },
  { name: 'PAVO', description: 'THE PEACOCK', power: 7, damage: 2, element: 'EARTH', img: 'PAVO.png', status: true },
  { name: 'OCTANS', description: 'THE OCTANT', power: 5, damage: 4, element: 'WATER', img: 'OCTANS.png', status: true },
  { name: 'OPHIUCHUS', description: 'THE SERPENT HOLDER', power: 5, damage: 4, element: 'EARTH', img: 'OPHIUCHUS.png', status: true },
  { name: 'DORADO', description: 'THE DOLPHINFISH', power: 5, damage: 4, element: 'WATER', img: 'DORADO.png', status: true },
  { name: 'MUSCA', description: 'THE FLY', power: 4, damage: 5, element: 'WIND', img: 'MUSCA.png', status: true },
  { name: 'CANES VENATICI', description: 'THE HUNTING DOGS', power: 8, damage: 2, element: 'EARTH', img: 'CANES VENATICI.png', status: true },
  { name: 'APUS', description: 'THE BIRD OF PARADISE', power: 7, damage: 3, element: 'WIND', img: 'APUS.png', status: true },
  { name: 'CYGNUS', description: 'THE SWAN', power: 7, damage: 3, element: 'WATER', img: 'CYGNUS.png', status: true },
  { name: 'EQUULEUS', description: 'THE LITTLE HORSE', power: 7, damage: 4, element: 'EARTH', img: 'EQUULEUS.png', status: true },
  { name: 'SAGITTARIUS', description: 'THE ARCHER', power: 6, damage: 3, element: 'EARTH', img: 'SAGITTARIUS.png', status: true },
  { name: 'ORION', description: 'THE HUNTER', power: 6, damage: 5, element: 'EARTH', img: 'ORION.png', status: true },
  { name: 'DRACO', description: 'THE DRAGON', power: 6, damage: 5, element: 'FIRE', img: 'DRACO.png', status: true },
  { name: 'CEPHEUS', description: 'THE KING', power: 10, damage: 2, element: 'EARTH', img: 'CEPHEUS.png', status: true },
  { name: 'MONOCEROS', description: 'THE UNICORN', power: 9, damage: 3, element: 'EARTH', img: 'MONOCEROS.png', status: true },
  { name: 'PEGASUS', description: 'THE WINGED HORSE', power: 9, damage: 3, element: 'WIND', img: 'PEGASUS.png', status: true },
  { name: 'LYRA', description: 'THE HARP', power: 9, damage: 3, element: 'EARTH', img: 'LYRA.png', status: true },
  { name: 'PERSEUS', description: 'THE GREEK HERO', power: 8, damage: 4, element: 'WIND', img: 'PERSEUS.png', status: true },
  { name: 'LUPUS', description: 'THE WOLF', power: 8, damage: 4, element: 'EARTH', img: 'LUPUS.png', status: true },
  { name: 'LEO', description: 'THE LION', power: 7, damage: 5, element: 'EARTH', img: 'LEO.png', status: true },
  { name: 'AQUILA', description: 'THE EAGLE', power: 9, damage: 4, element: 'WIND', img: 'AQUILA.png', status: true },
  { name: 'TAURUS', description: 'THE BULL', power: 9, damage: 4, element: 'EARTH', img: 'TAURUS.png', status: true },
  { name: 'SCORPIUS', description: 'THE SCORPION', power: 8, damage: 5, element: 'EARTH', img: 'SCORPIUS.png', status: true },
  { name: 'HYDRA', description: 'THE WATER SERPENT', power: 8, damage: 5, element: 'WATER', img: 'HYDRA.png', status: true },
  { name: 'PHOENIX', description: 'THE FIREBIRD', power: 9, damage: 5, element: 'FIRE', img: 'PHOENIX.png', status: true },
  { name: 'COLUMBA', description: 'THE DOVE', power: 9, damage: 5, element: 'WIND', img: 'COLUMBA.png', status: true },
  { name: 'AQUARIUS', description: 'THE WATER BEARER', power: 9, damage: 5, element: 'WATER', img: 'AQUARIUS.png', status: true },
  { name: 'CENTAURUS', description: 'THE CENTAUR', power: 10, damage: 5, element: 'EARTH', img: 'CENTAURUS.png', status: true },
  { name: 'HERCULES', description: 'THE STRONG MAN', power: 9, damage: 5, element: 'EARTH', img: 'HERCULES.png', status: true },
  { name: 'ZEUS', description: 'THE THUNDER GOD', power: 10, damage: 5, element: 'WIND', img: 'ZEUS.png', status: true }
];

// Create the levels of the game

$(function () {
  // Bind events and initialize plugin
  $('.explode')
    .on('pixellate-exploded', function () {
      var self = this;
      setTimeout(function () {
        $(self).pixellate('in');
      }, 500);
    })
    .on('pixellate-imploded', function () {
      var self = this;
      setTimeout(function () {
        $(self).pixellate('out');
      }, 500);
    })
    .pixellate()
});


var pluginName = 'pixellate',
  defaults = {
    // Grid divisions
    columns: 10,
    rows: 10,

    // Duration of explosion animation
    duration: 1000,

    // Direction of explosion animation ('out', 'in', or 'none')
    direction: 'out',

    // Resize pixels during animation
    scale: true,

    // Coordinates representing the source of the explosion force
    //(e.g. [-1, 1] makes the explodey bits go up and to the right)
    explosionOrigin: [0, 0]
  };

function Plugin(el, options) {
  this.$el = $(el);
  this.options = $.extend({}, defaults, options);
  this._defaults = defaults;
  this._name = pluginName;

  this.init();
};

Plugin.prototype = {
  init: function () {
    if (!this.$el.find('.pixellate-pixel').length) {
      var $img = this.$el.find('img:first-child'),
        img = new Image();

      this.$el
        .data('pixellate-image', $img.attr('src'))
        .addClass('pixellate-lock');
      $img.css('visibility', 'hidden');

      $(img).one('load', $.proxy(this.createPixels, this));

      img.src = this.$el.data('pixellate-image');
      if (img.complete) $(img).trigger('load');
    } else {
      this.stylePixels();
    }
  },

  createPixels: function () {
    this.$el.append(new Array((this.options.rows * this.options.columns) + 1).join('<span class="pixellate-pixel"></span>'));

    this.stylePixels(true);
  },

  stylePixels: function (initializeStyles) {
    var self = this,
      w = this.$el.width(),
      h = this.$el.height(),
      columns = this.options.columns,
      rows = this.options.rows,
      $pixels = this.$el.find('.pixellate-pixel');

    var styles = initializeStyles ? {
      'position': 'absolute',
      'width': (w / columns),
      'height': (h / rows),
      'background-image': 'url(' + this.$el.data('pixellate-image') + ')',
      'background-size': w,
      'backface-visibility': 'hidden'
    } : {};

    for (var idx = 0; idx < $pixels.length; idx++) {
      var pixelStyles = {};

      if (initializeStyles) {
        var x = (idx % columns) * styles.width,
          y = (Math.floor(idx / rows)) * styles.height;

        $.extend(pixelStyles, styles, {
          'left': x,
          'top': y,
          'background-position': (-x) + 'px ' + (-y) + 'px'
        });
      }

      if (self.options.direction == 'out') {
        var randX = (Math.random() * 300) - 150 - (self.options.explosionOrigin[0] * 150),
          randY = (Math.random() * 300) - 150 - (self.options.explosionOrigin[1] * 150);

        var transformString = 'translate(' + randX + 'px, ' + randY + 'px)';
        if (self.options.scale) {
          transformString += ' scale(' + (Math.random() * 2.0 + 0.2) + ')';
        }

        $.extend(pixelStyles, {
          'transform': transformString,
          'opacity': 0,
          'transition': self.options.duration + 'ms ease-out'
        });
      } else if (self.options.direction == 'in') {
        $.extend(pixelStyles, {
          'transform': 'none',
          'opacity': 1,
          'transition': self.options.duration + 'ms ease-in-out'
        });
      }

      $pixels.eq(idx).css(pixelStyles);
    }

    // Use rAF to ensure styles are set before class is modified
    requestAnimationFrame(function () {
      if (self.options.direction == 'out') {
        self.$el.removeClass('pixellate-lock');
      } else if (self.options.direction == 'in') {
        self.$el.one('pixellate-imploded', function () {
          self.$el.addClass('pixellate-lock');
        });
      }
    });

    // Fire plugin events after animation completes
    // TODO: Use transition events when supported
    setTimeout(function () {
      if (self.options.direction == 'out')
        self.$el.trigger('pixellate-exploded');
      else if (self.options.direction == 'in')
        self.$el.trigger('pixellate-imploded');
    }, this.options.duration);
  }
};

$.fn[pluginName] = function (options) {
  return this.each(function () {
    if (!$.data(this, "plugin_" + pluginName)) {
      $.data(this, "plugin_" + pluginName, new Plugin(this, options));
    } else if (typeof options === 'string') {
      $.data(this, "plugin_" + pluginName).options.direction = options;
      $.data(this, "plugin_" + pluginName).init();
    }
  });
};


// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
  window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame)
  window.requestAnimationFrame = function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () { callback(currTime + timeToCall); },
      timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };

if (!window.cancelAnimationFrame)
  window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };


//rotating
//   var imgWrapper = $("#img-wrapper"),
//   images = $(".rotating-img"),
//   tl = new TimelineMax({repeat:1});

// TweenLite.set(imgWrapper, {perspective:500});
// TweenLite.set(images, {rotationY:180});
// TweenLite.set(images[0], {rotationY:0});

// for(var i = 0; i < images.length; i++)
// {
// var nextImage = (i+1) == images.length ? images[0] : images[i+1];
// tl
//   .to(images[i], 2, {rotationY:'-180_ccw'}, (2 * i))
//   .to(nextImage, 2, {rotationY:'0_ccw'}, (2 * i));
// }