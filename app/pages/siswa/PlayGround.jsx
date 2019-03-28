import React, { useState } from 'react';
import {
  // Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHighlightPlugin from '../../components/plugins/highlightPlugin';
import addLinkPlugin from '../../components/plugins/addLinkPlugin';

const highlightPlugin = createHighlightPlugin();

const PlayGround = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const plugins = [highlightPlugin, addLinkPlugin];

  const onChange = state => {
    setEditorState(state);
  };

  const handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onUnderlineClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const onStrikeThroughClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
  };

  const onHighlight = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));
  };

  // onLinkClick = () => {
  // 	onChange(RichUtils.toggleLink(editorState));
  // };

  return (
    <div className="editorContainer">
      <button className="underline" onClick={onUnderlineClick}>
        U
      </button>
      <button className="bold" onClick={onBoldClick}>
        <b>B</b>
      </button>
      <button className="italic" onClick={onItalicClick}>
        <em>I</em>
      </button>
      <button className="strikethrough" onClick={onStrikeThroughClick}>
        abc
      </button>
      <button className="highlight" onClick={onHighlight}>
        <span style={{ background: 'yellow', padding: '0.3em' }}>H</span>
      </button>
      <div className="editors">
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          plugins={plugins}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default PlayGround;
