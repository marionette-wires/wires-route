import {Class} from 'wires-metal';
import Events from 'wires-events';

/**
 * [Route description]
 * @public
 * @class Route
 * @mixes Events
 */
var Route = Class.extend({

  /**
   * @public
   * @method enter
   * @returns {Promise}
   */
  enter() {
    this.trigger('before:enter before:fetch', this);

    return Promise.resolve()
      .then(() => this.fetch(...arguments))
      .then(() => this.trigger('fetch before:render', this))
      .then(() => this.render(...arguments))
      .then(() => this.trigger('render enter', this))
      .catch(err => this.trigger('error', this, err));
  },

  /**
   * @public
   * @method exit
   * @returns {Promise}
   */
  exit() {
    this.trigger('before:exit before:destroy', this);
    return Promise.resolve()
      .then(() => this.destroy(...arguments))
      .then(() => this.trigger('destroy exit', this))
      .catch(err => this.trigger('error', this, err));
  },

  /**
   * @public
   * @abstract
   * @method fetch
   */
  fetch() {},

  /**
   * @public
   * @abstract
   * @method render
   */
  render() {},

  /**
   * @public
   * @abstract
   * @method destroy
   */
  destroy() {}

});

Route.mixin(Events);

export default Route;
