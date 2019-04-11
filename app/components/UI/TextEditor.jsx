import React, { useState, useCallback, useEffect } from 'react';
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

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onImageClick = () => {
    setShowModal(true);
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
