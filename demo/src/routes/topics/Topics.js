import React from 'react';
import Loadable from 'react-loadable';
import Perimeter from '../../../src';
import Loader from 'halogen/PulseLoader';

const AsyncTopicsList = Loadable({
  loader: () => System.import('./TopicList.js'),
  LoadingComponent: Loader
})

class About extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
    }
  }

  render() {
    return (
      <div>
        <
      </div>
    )
  }
}