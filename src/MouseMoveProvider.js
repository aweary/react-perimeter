// @flow
import React, { Component, PropTypes } from 'react';
import invariant from 'invariant';

type subscription = () => void;
type subscriptionArray = [subscription];

export default class MouseMoveProvider extends Component {
  subs: subscriptionArray = [];
  hasSubs: boolean = false;

  static propTypes = {
    children: PropTypes.node
  };

  static childContextTypes = {
    mouseMove: PropTypes.object.isRequired
  };

  getChildContext() {
    const { subscribe, unsubscribe } = this;
    return {
      mouseMove: {
        subscribe,
        unsubscribe
      }
    };
  }

  componentWillMount() {
    const { children } = this.props;
    invariant(
      children === null || React.Children.count(children) === 1,
      'A <MouseMoveProvider> may have only one child element'
    );
  }

  componentWillUnmount() {
    this.removeListener();
  }

  subscribe = callback => {
    this.subs = this.subs.concat([callback]);
    if (!this.hasSubs) {
      this.hasSubs = true;
      this.registerListener();
    }
  };

  unsubscribe = callback => {
    this.subs = this.subs.filter(fn => fn !== callback);
    if(!this.subs.length){
      this.hasSubs = false;
      this.removeListener();
    }
  };

  registerListener = () => {
    const { handleMouseMove } = this;
    window.addEventListener('mousemove', handleMouseMove);
  };

  removeListener = () => {
    const { handleMouseMove } = this;
    window.removeEventListener('mousemove', handleMouseMove);
  };

  handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    this.subs.forEach(callback => callback({ clientX, clientY }));
  };

  render() {
    const { children } = this.props;
    return children ? React.Children.only(children) : null;
  }
}
