import Modal from 'react-bootstrap4-modal';
import React from 'react';
import styled from 'styled-components';
import Stars from './Stars';

const StyledStars = styled(Stars)`
  text-align: center;
`;
const ScoreBoard = ({ show, life, timer, score, stars, onClickBackdrop }) => {
  return (
    <Modal visible={show} onClickBackdrop={onClickBackdrop}>
      <div className="modal-header">
        <h5 className="modal-title">
          {life > 0 ? 'CONGRATULATION' : 'ANDA GAGAL COBA LAGI'}
        </h5>
      </div>
      <div className="modal-body">
        <StyledStars value={stars} />
        SCORE : {life > 0 ? score : '0'}
        <br />
        TIME : {timer}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary">
          Main lagi
        </button>
        <button type="button" className="btn btn-secondary">
          Kembali
        </button>
      </div>
    </Modal>
  );
};

export default ScoreBoard;
