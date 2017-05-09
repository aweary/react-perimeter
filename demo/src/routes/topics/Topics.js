import React, { Component } from 'react';
import Loadable from 'react-loadable';
import Perimeter from '../../../src';

const AsyncTopicsList = Loadable({
  loader: () => System.import('./TopicList.js'),
  LoadingComponent: () => <div>Loading...</div>
});

class Topics extends Component {
  constructor() {
    super();
    this.state = {
      load: false
    };
  }

  render() {
    return (
      <div>
        <h1>Topics</h1>
        <AsyncTopicsList />
      </div>
    );
  }
}

export default Topics;
