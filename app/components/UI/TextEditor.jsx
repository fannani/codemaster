import React, { useState, useCallback, useEffect } from 'react';
import { EditorState, RichUtils, convertToRaw } from 'draft-js';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import firebase from 'firebase/app';
import 'firebase/storage';
import shortid from 'shortid';
import { useDropzone } from 'react-dropzone';
import 'draft-js-focus-plugin/lib/plugin.css';
import Modal from 'react-bootstrap4-modal';
import Prism from 'prismjs';
import createPrismPlugin from 'draft-js-prism-plugin';
import PrismDecorator from 'draft-js-prism';

import 'prismjs/themes/prism.css';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const prismPlugin = createPrismPlugin({
  prism: Prism,
});
const prismDecorator = new PrismDecorator({
  // Provide your own instance of PrismJS
  prism: Prism,
});

const decorator = composeDecorators(
  focusPlugin.decorator,
  resizeablePlugin.decorator,
  blockDndPlugin.decorator,
);
const imagePlugin = createImagePlugin({ decorator });

const plugins = [focusPlugin, resizeablePlugin, imagePlugin, blockDndPlugin];

const storageRef = firebase.storage().ref();
let childRef;

const TextEditor = ({ value, onChange }) => {
  const [loadingImage, setLoadingImage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    childRef = storageRef.child(shortid.generate());
    childRef.put(acceptedFiles[0]).then(() => {
      setLoadingImage(true);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  useEffect(
    () => {
      if (loadingImage) {
        childRef
          .getDownloadURL()
          .then(url => {
            setShowModal(false);
            onChange(imagePlugin.addImage(value, url));
          })
          .catch(() => {});
        setLoadingImage(false);
      }
    },
    [loadingImage],
  );

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(value, 'BOLD'));
  };
  const onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(value, 'ITALIC'));
  };
  const onUnderlineClick = () => {
    onChange(RichUtils.toggleInlineStyle(value, 'UNDERLINE'));
  };

  const onImageClick = () => {
    setShowModal(true);
  };

  const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      marginBottom: '-10px',
      padding: 2,
    },
  };
  const onScriptClick = () => {
    // const selection = value.getSelection();
    // let currentContent = value.getCurrentContent();
    // if (
    //   currentContent.getBlockForKey(selection.getStartKey()).getKey() !==
    //   'code-block'
    // ) {
    //   currentContent = Modifier.setBlockType(
    //     currentContent,
    //     selection,
    //     'code-block',
    //   );
    //
    //   const blockMap = currentContent.getBlockMap();
    //   const block = currentContent.getBlockForKey(selection.getStartKey());
    //
    //   const data = block.getData().merge({ language: 'javascript' });
    //   const newBlock = block.merge({ data });
    //   const newContentState = currentContent.merge({
    //     blockMap: blockMap.set(block.getKey(), newBlock),
    //     selectionAfter: selection,
    //   });
    //
    //   setEditorState(
    //     EditorState.push(value, newContentState, 'change-block-data'),
    //   );
    // } else {
    onChange(RichUtils.toggleBlockType(value, 'code-block'));
    // }
  };

  const onTitleClick = () => {
    onChange(RichUtils.toggleBlockType(value, 'header-four'));
  };

  const handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(value, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };
  return (
    <>
      <div className="editorContainer">
        <div
          className="btn-toolbar"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onBoldClick}
            >
              <b>B</b>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onItalicClick}
            >
              <i>I</i>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onUnderlineClick}
            >
              <u>U</u>
            </button>
          </div>
          <div
            className="btn-group mr-2"
            role="group"
            aria-label="Second group"
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onTitleClick}
            >
              <b>Title</b>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onImageClick}
            >
              Image
            </button>
            <button
              type="button"
              className="btn  btn-secondary"
              onClick={onScriptClick}
            >
              Script (Alpha)
            </button>
          </div>
        </div>
        <div className="editors">
          <Editor
            editorState={value}
            customStyleMap={styleMap}
            handleKeyCommand={handleKeyCommand}
            onChange={onChange}
            plugins={plugins}
          />
        </div>
      </div>

      <Modal
        visible={showModal}
        onClickBackdrop={() => {
          setShowModal(false);
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title">Add Image</h5>
        </div>
        <div className="modal-body">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop</p> : <p>Drag</p>}
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary">
            OK
          </button>
        </div>
      </Modal>
    </>
  );
};

export default TextEditor;
