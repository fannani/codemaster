import Modal from 'react-bootstrap4-modal';
import React from 'react';

const EnergyModal = ({ showModal, onClickBackdrop }) => (
  <Modal visible={showModal} onClickBackdrop={onClickBackdrop}>
    <div className="modal-header">
      <h5 className="modal-title">Menambah Energy</h5>
    </div>
    <div className="modal-body">
      <div className="row">
        <div className="col-6">
          <button
            type="button"
            style={{ width: '100%' }}
            className="btn btn-primary"
          >
            Lihat Video
          </button>
        </div>
        <div className="col-6">
          <button
            type="button"
            style={{ width: '100%' }}
            className="btn btn-primary"
          >
            Kerjakan Latihan
          </button>
        </div>
      </div>
    </div>
  </Modal>
);

export default EnergyModal;
