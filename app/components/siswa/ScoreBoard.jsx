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
  stage,
}) => {
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
        <Link to={`/course/${stage.course._id}`} className="btn btn-secondary">
          Kembali
        </Link>
        <button type="button" className="btn btn-secondary">
          Main lagi
        </button>
        {(function() {
          if (stage.index < stage.course.stages.length) {
            const next = stage.course.stages.find(
              data => data.index === stage.index + 1,
            );
            return (
              <Link to={`/play/${next._id}`} className="btn btn-primary">
                Lanjut
              </Link>
            );
          }
          return '';
        })()}
      </div>
    </Modal>
  );
};

ScoreBoard.propTypes = {
  show: PropTypes.bool.isRequired,
  life: PropTypes.number.isRequired,
  timer: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  stars: PropTypes.array.isRequired,
  onClickBackdrop: PropTypes.func.isRequired,
};

export default ScoreBoard;
