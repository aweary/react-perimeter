// @flow
import React, { Component, PropTypes } from 'react';
import { uuid } from './utils';
import invariant from 'invariant';

type Subscription = { uuid: string, callback: () => void };
type SubscriptionArray = [Subscription];

export default class MouseMoveProvider extends Component {
  subs: SubscriptionArray = [];
  hasSubs: Boolean = false;
  initialOffset: Number = window.pageYOffset;

  static propTypes = {
    children: PropTypes.node
  };

  static childContextTypes = {
    mouseMove: PropTypes.object.isRequired
  };

  getChildContext() {
    const { subscribe } = this;
    return {
      mouseMove: {
        subscribe
      }
    };
  }

  componentWillMount() {
    const { children } = this.props;
    invariant(children === null || React.Children.count(children) === 1, 'A <MouseMoveProvider> may have only one child element');
  }

  componentWillUnmount() {
    this.subs = [];
    this.removeListener();
  }

  subscribe = callback => {
    const sub_id: string = uuid();
    this.subs = this.subs.concat([{ sub_id, callback }]);
    if (!this.hasSubs) {
      this.hasSubs = true;
      this.registerListener();
    }
    return () => {
      this.subs = this.subs.filter((sub: Subscription) => sub.uuid !== sub_id);
      if (this.subs.length === 0) {
        this.hasSubs = false;
        this.removeListener();
      }
    };
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
    this.subs.forEach(({ callback }) => callback({ clientX, clientY }));
  };

  render() {
    const { children } = this.props;
    return children ? React.Children.only(children) : null;
  }
}
