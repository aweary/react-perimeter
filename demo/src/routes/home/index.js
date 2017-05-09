import React from 'react';
import Loadable from 'react-loadable';

function fakeDelay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export default Loadable({
  loader: () => fakeDelay(2000).then(() => System.import('./Home')),
  LoadingComponent: () => <div>Loading...</div>
});
