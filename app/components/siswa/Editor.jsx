import React from 'react';
import AceEditor from "react-ace";
import styled from "styled-components";
import classNames from 'classnames';
import 'brace/mode/html';
import 'brace/theme/tomorrow';

const Button = styled.button`
  border-radius: 0px!important;
  background-color:#4891E3;
  margin:5px;
  color:white;
`

const Editor = ({checkResult,script,onChange,className, size = 4}) => (
  <div className={classNames(className,"col-sm-"+size)} style={{ height: 'calc(100vh - 100px)' }}>
    <div style={{ height: "50px" }}>
      <Button
        type="button"
        id="run"
        onClick={checkResult}
        className="btn "
      >
        Periksa
      </Button>
      <Button
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
      style={{ height: "calc(100% - 50px)" }}
      setOptions={{
        fontSize: '12pt',
        vScrollBarAlwaysVisible: true,
      }}
      onChange={onChange}
    />
  </div>
);

const StyledEditor = styled(Editor)`
  padding-left:0!important;
  padding-right:0!important;
  background-color:#EBEBEB;
  .btn-right {
    float:right;
  }
`

export default StyledEditor;
