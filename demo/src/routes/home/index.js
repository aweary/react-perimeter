import React from 'react';
import Loadable from 'react-loadable';
import Loader from 'halogen/PulseLoader';

function fakeDelay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export default Loadable({
  loader: () => fakeDelay(2000).then(() => System.import('./Home')),
  LoadingComponent: () => <Loader color="#333333" size="16px" />
})
