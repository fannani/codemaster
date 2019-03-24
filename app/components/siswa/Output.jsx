import React from 'react';
import styled from 'styled-components';
const Button = styled.button`
  border-radius: 0px !important;
  background-color: #4891e3;
  margin: 5px;
  color: white;
`;
const Output = ({ show = true, onClick, size, onExpandClick }) => (
  <div
    className={!show ? 'col-sm-1' : `col-sm-${size}`}
    style={{ paddingLeft: '0px', paddingRight: '0px' }}
    onClick={onClick}
  >
    <div style={{ height: '50px', visibility: show ? 'visible' : 'hidden' }}>
      <Button
        type="button"
        onClick={onExpandClick}
        className="btn btn-right"
        style={{ float: 'right' }}
      >
        Expand
      </Button>
    </div>
    <iframe
      title="output"
      id="output"
      style={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: 'calc(100% - 50px)',
        visibility: show ? 'visible' : 'hidden'
      }}
      frameBorder="0"
    />
  </div>
);

export default Output;
