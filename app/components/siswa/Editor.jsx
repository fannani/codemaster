import React from 'react';
import AceEditor from "react-ace";

const Editor = ({checkResult,script,onChange}) => (
  <div className="col-sm-4" style={{ height: 'calc(100vh - 50px)' }}>
    <div style={{ height: "50px" }}>
      <button
        type="button"
        id="run"
        onClick={checkResult}
        className="btn btn-primary"
      >
        Periksa
      </button>
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

export default Editor;
