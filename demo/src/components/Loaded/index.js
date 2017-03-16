import React from 'react';
import Loadable from 'react-loadable';

function fakeDelay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export default Loadable({
  loader: () => fakeDelay(600).then(() => System.import('./Loaded')),
  LoadingComponent: () => <div>Loading...</div>
})
