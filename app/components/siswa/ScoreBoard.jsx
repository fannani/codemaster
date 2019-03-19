import Modal from 'react-bootstrap4-modal';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Stars from './Stars';

const StyledStars = styled(Stars)`
  text-align: center;
`;
const ScoreBoard = ({
  show,
  life,
  timer,
  score,
  stars,
  onClickBackdrop,
  courseid,
}) => (
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
      <Link to={`/course/${courseid}`} className="btn btn-secondary">
        Kembali
      </Link>
    </div>
  </Modal>
);

ScoreBoard.propTypes = {
  show: PropTypes.bool.isRequired,
  life: PropTypes.number.isRequired,
  timer: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  stars: PropTypes.array.isRequired,
  onClickBackdrop: PropTypes.func.isRequired,
  courseid: PropTypes.string.isRequired,
};

export default ScoreBoard;