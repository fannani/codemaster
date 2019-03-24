import React, { useState } from 'react';
import AceEditor from 'react-ace';
import styled from 'styled-components';
import classNames from 'classnames';
import 'brace/mode/html';
import 'brace/theme/tomorrow';

const Button = styled.button`
  border-radius: 0px !important;
  background-color: #4891e3;
  margin: 5px;
  color: white;
`;

const Editor = ({
  checkResult,
  initialScript,
  className,
  size = 4,
  onExpandClick,
  onClick,
  show,
}) => {
  const [script, setScript] = useState(initialScript);
  const onChange = value => {
    const idoc = document.getElementById('output').contentWindow.document;
    setScript(value);
    idoc.open();
    idoc.write(value);
    idoc.close();
  };
  return (
    <div
      onClick={onClick}
      className={classNames(className, show ? `col-sm-${size}` : 'col-sm-1')}
      style={{ height: 'calc(100vh - 100px)' }}
    >
      {(function() {
        if (show)
          return (
            <>
              <div style={{ height: '50px' }}>
                <Button
                  type="button"
                  id="run"
                  onClick={checkResult(script)}
                  className="btn "
                >
                  Periksa
                </Button>
                <Button
                  onClick={onExpandClick}
                  type="button"
                  className="btn btn-right"
                >
                  Expand
                </Button>
              </div>
              <AceEditor
                mode="html"
                theme="tomorrow"
                value={script}
                width="100%"
                style={{ height: 'calc(100% - 50px)' }}
                setOptions={{
                  fontSize: '12pt',
                  vScrollBarAlwaysVisible: true,
                }}
                onChange={onChange}
              />
            </>
          );
        else return '';
      })()}
    </div>
  );
};

const StyledEditor = styled(Editor)`
  padding-left: 0 !important;
  padding-right: 0 !important;
  background-color: #ebebeb;
  .btn-right {
    float: right;
  }
`;

export default StyledEditor;
