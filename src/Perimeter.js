// @flow
import React, { Component, PropTypes } from 'react';

// We listen to resize events too, but don't actually
// use the event object so this is typed fine for now
type EventListener = (MouseEvent) => void;

type Props = {
  onBreach: () => void,
  once?: boolean,
  padding: number,
  mapListeners?: (EventListener) => EventListener,
  children?: React$Element<*>
};

export default class Perimeter extends Component {
  props: Props;
  node: null | HTMLElement;
  bounds: null | ClientRect;
  initialOffset: number;
  breached: boolean;
  listening: boolean;
  constructor(props: Props) {
    const { mapListeners } = props;
    super(props);
    // The HTML element used as the perimeter center
    this.node = null;
    // The result of calling getBoundingClientRect on this.node
    this.bounds = null;
    // Initial pageYOffset, required since pages may be scrolled on load
    // and getBoundingClientRect will take that into consideration when
    // calculating the top offset
    this.initialOffset = 0;
    // Whether the mouse is within the perimeter
    this.breached = false;
    // If we're still listening for mousemove/resize events
    this.listening = false;
    // If a mapListeners function is provided, update the instance event
    // handlers to be the returned mapped versions. Common use case would be
    // debounced or throttled listeners.
    if (mapListeners) {
      this.handleMouseMove = mapListeners(this.handleMouseMove);
      this.handleResize = mapListeners(this.handleResize);
    }
  }

  static propTypes = {
    onBreach: PropTypes.func.isRequired,
    once: PropTypes.bool,
    padding: PropTypes.number.isRequired,
    mapListeners: PropTypes.func
  };

  static contextTypes = {
    mouseMove: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
    })
  };

  /**
   * When the component mounts we calculate the ClientRect
   * for the target node and attach event listeners for:
   *   - `mousemove` for checking perimeter breaches
   *   - `resize` for recalculating ClientRect
   */
  componentDidMount() {
    const { handleMouseMove, handleResize, node } = this;
    if (node) {
      this.bounds = node.getBoundingClientRect();
      this.initialOffset = window.pageYOffset;
      if(this.context && this.context.mouseMove && this.context.mouseMove.subscribe){
        this.mouseMoveUnsub = this.context.mouseMove.subscribe(handleMouseMove)
      } else {
        window.addEventListener('mousemove', handleMouseMove);
      }
      window.addEventListener('resize', handleResize);
      this.listening = true;
    }
  }

  /**
   * Remove event listeners on unmount if we are still
   * listening.
   */
  componentWillUnmount() {
    if (this.listening) {
      this.removeEventListeners();
    }
  }

  /**
   * Removes the `mousemove` and `resize` listeners. May
   * be called on unmount, or after `onBreach` is called
   * if the `once` prop is set to `true`
   */
  removeEventListeners() {
    if(this.mouseMoveUnsub && this.context && this.context.mouseMove && this.context.mouseMove.subscribe){
      this.mouseMoveUnsub()
    } else {
      window.removeEventListener('mousemove', this.handleMouseMove);
    }
    window.removeEventListener('resize', this.handleResize);
    this.listening = false;
  }

  /**
   * An element's position may change on resize, so we recalculate
   * the ClientRect for the node.
   * @todo debounce
   */
  handleResize = () => {
    if (this.node) {
      this.bounds = this.node.getBoundingClientRect();
    }
  };

  /**
   * Called on `mousemove`, using `clientX` and `clientY`
   * event properties to determine the position of the cursor.
   * The perimeter is then calculated from the ClientRect and the
   * `padding` prop. If the mouse is within the perimeter,
   * and its not already breached (tracked on `this.breached`)
   * @param {MouseEvent} event mouse event
   */
  handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    const { initialOffset, props, bounds } = this;
    /**
     * There should be no situation where the `mousemove` handler
     * is called and `bounds` is not calculated, but flow demands
     * this check since the initial property value is `null`
     */
    if (!bounds) return;
    const offsetY = window.pageYOffset - initialOffset;
    const { padding, onBreach, once } = props;
    const { top, right, bottom, left } = bounds;
    if (
      // Cursor is not too far left
      clientX > left - padding &&
      // Cursor is not too far right
      clientX < right + padding &&
      // Cursor is not too far up
      clientY > top - offsetY - padding &&
      // Cursor is not too far down
      clientY < bottom - offsetY + padding
    ) {
      if (this.breached) {
        return;
      }
      onBreach();
      this.breached = true;
      if (once) {
        this.removeEventListeners();
      }
    } else {
      this.breached = false;
    }
  };

  /**
   * Ref callback used to populate this.node. If
   * a render callback is provided then it will be passed
   * to that callback with the expectation of it then
   * being passed to an element via the `ref` prop somewhere.
   * Otherwise the default `span` is rendered and populated.
   */
  attachRef = (node: HTMLElement) => {
    this.node = node;
  };

  render() {
    const { children } = this.props;
    return typeof children === 'function' ? children(this.attachRef) : <span ref={this.attachRef}>{children}</span>;
  }
}
