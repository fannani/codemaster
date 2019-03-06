import React from 'react';

const Output = ({ show = true }) => (
  <>
 { (show) ? 
    <iframe
      className={!show ? 'col-sm-1' : 'col-sm-4'}
      title="output"
      id="output"
      style={{ backgroundColor: '#ffffff' }}
      frameBorder="0"
    /> :
    <></>
 }
  </>
);

export default Output;
