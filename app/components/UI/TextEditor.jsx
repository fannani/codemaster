import React, { useState, useCallback, useEffect } from 'react';
import { EditorState, RichUtils, Modifier, convertToRaw } from 'draft-js';
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

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loadingImage, setLoadingImage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const onChange = state => {
    setEditorState(state);
  };

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
            onChange(imagePlugin.addImage(editorState, url));
          })
          .catch(() => {});
        setLoadingImage(false);
      }
    },
    [loadingImage],
  );

  const onSaveClick = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    const editorJson = JSON.stringify(raw);
    console.log(editorJson);
  };

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
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
    // const selection = editorState.getSelection();
    // let currentContent = editorState.getCurrentContent();
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
    //     EditorState.push(editorState, newContentState, 'change-block-data'),
    //   );
    // } else {
    onChange(RichUtils.toggleBlockType(editorState, 'code-block'));
    // }
  };

  const onTitleClick = () => {
    onChange(RichUtils.toggleBlockType(editorState, 'header-one'));
  };

  const handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };
  return (
    <>
      <div className="editorContainer">
        <div className="toolbar">
          <button type="button" className="btn" onClick={onBoldClick}>
            <b>B</b>
          </button>
          <button type="button" className="btn" onClick={onTitleClick}>
            <b>Title</b>
          </button>
          <button type="button" className="btn" onClick={onImageClick}>
            Image
          </button>
          <button type="button" className="btn" onClick={onScriptClick}>
            Script (Alpha)
          </button>
          <button type="button" className="btn" onClick={onSaveClick}>
            Save To Server
          </button>
        </div>
        <div className="editors">
          <Editor
            editorState={editorState}
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
