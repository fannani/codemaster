import React from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../config/config';
import styled from 'styled-components';
import lock from '../../assets/images/lock.png';

const StageItem = ({ className, stage, unlock }) => {
  const child = (
    <div className="d-flex flex-wrap stageitem">
      <div
        className="circle"
        style={{
          backgroundImage: `url("${BASE_URL}uploads/${stage.imageid}")`,
        }}
      >
        {!unlock ? (
          <div>
            <div className="circle-back" /> <img src={lock} alt="" />
          </div>
        ) : (
          <div />
        )}
      </div>
      <h4>{stage.title}</h4>
    </div>
  );
  return unlock ? (
    <Link className={className} to={`/play/${stage._id}`}>
      {child}
    </Link>
  ) : (
    <div className={className}>{child}</div>
  );
};

const StyledStageItem = styled(StageItem)`
  .stageitem {
    height: 100px;
    margin-top: 20px;
  }
  h4 {
    height: 100%;
    display: inline-block;
    line-height: 100px;
    margin-left: 20px;
  }
  .circle-back {
    background-color: black;
    width: 87px;
    height: 87px;
    position: absolute;
    border-radius: 100px;
    opacity: 0.5;
  }
  .circle {
    margin-left: 100px;
    background-color: white;
    background-position: center;
    background-size: cover;
    width: 100px;
    height: 100px;
    border: 6px solid #dddddd;
    border-radius: 100px;
  }
  img {
    width: 35px;
    position: absolute;
    left: 147px;
    margin-top: 18px;
  }
`;

export default StyledStageItem;
