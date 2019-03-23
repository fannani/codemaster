import React from 'react';

const Output = ({ show = true }) => (
  <div className={!show ? 'col-sm-1' : 'col-sm-4'} style={{paddingLeft: '0px',paddingRight: '0px' }}>
    <iframe
      title="output"
      id="output"
      style={{ backgroundColor: '#ffffff', width:'100%', height:'100%' }}
      frameBorder="0"
    />
  </div>
);

export default Output;
