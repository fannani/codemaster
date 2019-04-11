import React, { useState, useCallback } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import firebase from 'firebase/app';
import 'firebase/storage';
import shortid from 'shortid';
import { useDropzone } from 'react-dropzone';
import 'draft-js-focus-plugin/lib/plugin.css';
import Modal from 'react-bootstrap4-modal';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();

const decorator = composeDecorators(
  focusPlugin.decorator,
  resizeablePlugin.decorator,
);
const imagePlugin = createImagePlugin({ decorator });

const plugins = [focusPlugin, resizeablePlugin, imagePlugin];

const storageRef = firebase.storage().ref();

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showModal, setShowModal] = useState(false);
  const onDrop = useCallback(acceptedFiles => {
    const childRef = storageRef.child(shortid.generate());
    childRef.put(acceptedFiles[0]).then(() => {
      childRef
        .getDownloadURL()
        .then(url => {
          setShowModal(false);
          onChange(imagePlugin.addImage(editorState, url));
        })
        .catch(() => {});
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onChange = state => {
    setEditorState(state);
  };
  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onImageClick = () => {
    setShowModal(true);
    // onChange(
    //   imagePlugin.addImage(editorState, 'http://localhost:3000/js/energy.png'),
    // );
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
      <div>
        <button type="button" className="bold" onClick={onBoldClick}>
          <b>B</b>
        </button>
        <button type="button" className="bold" onClick={onImageClick}>
          Image
        </button>
      </div>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        plugins={plugins}
      />

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
            {isDragActive ? (
              <p>Drop</p>
            ) : (
              <p>Drag</p>
            )}
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
