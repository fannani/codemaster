import React from 'react';
import AceEditor from "react-ace";
import styled from "styled-components";
import classNames from 'classnames';
import 'brace/mode/html';
import 'brace/theme/monokai';

const Button = styled.button`
  border-radius: 0px!important;
  background-color:#FFC107;
  margin:5px;
  color:#343A40;
`

const Editor = ({checkResult,script,onChange,className}) => (
  <div className={classNames(className,"col-sm-4")} style={{ height: 'calc(100vh - 50px)' }}>
    <div style={{ height: "50px" }}>
      <Button
        type="button"
        id="run"
        onClick={checkResult}
        className="btn "
      >
        Periksa
      </Button>
    </div>
    <AceEditor
      mode="html"
      theme="monokai"
      value={script}
      width="100%"
      style={{ height: "calc(100% - 50px)" }}
      setOptions={{
        fontSize: '16pt',
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
`

export default StyledEditor;
