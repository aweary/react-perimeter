export const uuid = () => {
  function _p8(s) {
    const p = (Math.random().toString(16) + '000000000').substr(2, 8);
    return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
  }

  return _p8() + _p8(true) + _p8(true) + _p8();
};