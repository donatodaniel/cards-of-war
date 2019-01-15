// Create all cards of the game
let deck = [
  { name: 'CHAMAELEON', description: 'THE CHAMELEON', power: 3, damage: 2, element: 'EARTH', img: 'CHAMAELEON.PNG', status: true },
  { name: 'PARDALIS', description: 'THE GIRAFFE', power: 4, damage: 2, element: 'EARTH', img: 'PARDALIS.PNG', status: true },
  { name: 'CORVUS', description: 'THE RAVEN', power: 8, damage: 5, element: 'WIND', img: 'CORVUS.PNG', status: true },
  { name: 'VULPECULA', description: 'THE LITTLE FOX', power: 2, damage: 4, element: 'EARTH', img: 'VULPECULA.PNG', status: true },
  { name: 'LACERTA', description: 'THE LIZARD', power: 5, damage: 2, element: 'EARTH', img: 'LACERTA.PNG', status: true },
  { name: 'CETUS', description: 'THE WHALE', power: 5, damage: 2, element: 'WATER', img: 'CETUS.PNG', status: true },
  { name: 'INDUS', description: 'THE INDIAN', power: 5, damage: 3, element: 'EARTH', img: 'INDUS.PNG', status: true },
  { name: 'VOLANS', description: 'THE FLYING FISH', power: 7, damage: 2, element: 'WATER', img: 'VOLANS.PNG', status: true },
  { name: 'PAVO', description: 'THE PEACOCK', power: 7, damage: 2, element: 'EARTH', img: 'PAVO.PNG', status: true },
  { name: 'OCTANS', description: 'THE OCTANT', power: 5, damage: 4, element: 'WATER', img: 'OCTANS.PNG', status: true },
  { name: 'OPHIUCHUS', description: 'THE SERPENT HOLDER', power: 5, damage: 4, element: 'EARTH', img: 'OPHIUCHUS.PNG', status: true },
  { name: 'DORADO', description: 'THE DOLPHINFISH', power: 5, damage: 4, element: 'WATER', img: 'DORADO.PNG', status: true },
  { name: 'MUSCA', description: 'THE FLY', power: 4, damage: 5, element: 'WIND', img: 'MUSCA.PNG', status: true },
  { name: 'CANES VENATICI', description: 'THE HUNTING DOGS', power: 8, damage: 2, element: 'EARTH', img: 'CANES VENATICI.PNG', status: true },
  { name: 'APUS', description: 'THE BIRD OF PARADISE', power: 7, damage: 3, element: 'WIND', img: 'APUS.PNG', status: true },
  { name: 'CYGNUS', description: 'THE SWAN', power: 7, damage: 3, element: 'WATER', img: 'CYGNUS.PNG', status: true },
  { name: 'EQUULEUS', description: 'THE LITTLE HORSE', power: 7, damage: 4, element: 'EARTH', img: 'EQUULEUS.PNG', status: true },
  { name: 'SAGITTARIUS', description: 'THE ARCHER', power: 6, damage: 3, element: 'EARTH', img: 'SAGITTARIUS.PNG', status: true },
  { name: 'ORION', description: 'THE HUNTER', power: 6, damage: 5, element: 'EARTH', img: 'ORION.PNG', status: true },
  { name: 'DRACO', description: 'THE DRAGON', power: 6, damage: 5, element: 'FIRE', img: 'DRACO.PNG', status: true },
  { name: 'CEPHEUS', description: 'THE KING', power: 10, damage: 2, element: 'EARTH', img: 'CEPHEUS.PNG', status: true },
  { name: 'MONOCEROS', description: 'THE UNICORN', power: 9, damage: 3, element: 'EARTH', img: 'MONOCEROS.PNG', status: true },
  { name: 'PEGASUS', description: 'THE WINGED HORSE', power: 9, damage: 3, element: 'WIND', img: 'PEGASUS.PNG', status: true },
  { name: 'LYRA', description: 'THE HARP', power: 9, damage: 3, element: 'EARTH', img: 'LYRA.PNG', status: true },
  { name: 'PERSEUS', description: 'THE GREEK HERO', power: 8, damage: 4, element: 'WIND', img: 'PERSEUS.PNG', status: true },
  { name: 'LUPUS', description: 'THE WOLF', power: 8, damage: 4, element: 'EARTH', img: 'LUPUS.PNG', status: true },
  { name: 'LEO', description: 'THE LION', power: 7, damage: 5, element: 'EARTH', img: 'LEO.PNG', status: true },
  { name: 'AQUILA', description: 'THE EAGLE', power: 9, damage: 4, element: 'WIND', img: 'AQUILA.PNG', status: true },
  { name: 'TAURUS', description: 'THE BULL', power: 9, damage: 4, element: 'EARTH', img: 'TAURUS.PNG', status: true },
  { name: 'SCORPIUS', description: 'THE SCORPION', power: 8, damage: 5, element: 'EARTH', img: 'SCORPIUS.PNG', status: true },
  { name: 'HYDRA', description: 'THE WATER SERPENT', power: 8, damage: 5, element: 'WATER', img: 'HYDRA.PNG', status: true },
  { name: 'PHOENIX', description: 'THE FIREBIRD', power: 9, damage: 5, element: 'FIRE', img: 'PHOENIX.PNG', status: true },
  { name: 'COLUMBA', description: 'THE DOVE', power: 9, damage: 5, element: 'WIND', img: 'COLUMBA.PNG', status: true },
  { name: 'AQUARIUS', description: 'THE WATER BEARER', power: 9, damage: 5, element: 'WATER', img: 'AQUARIUS.PNG', status: true },
  { name: 'CENTAURUS', description: 'THE CENTAUR', power: 10, damage: 5, element: 'EARTH', img: 'CENTAURUS.PNG', status: true },
  { name: 'HERCULES', description: 'THE STRONG MAN', power: 9, damage: 5, element: 'EARTH', img: 'HERCULES.PNG', status: true },
  { name: 'ZEUS', description: 'THE THUNDER GOD', power: 10, damage: 5, element: 'WIND', img: 'ZEUS.PNG', status: true }
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

