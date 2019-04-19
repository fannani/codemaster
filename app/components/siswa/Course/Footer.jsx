import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import styled from 'styled-components';

const SiswaCourseFooter = ({ className, course, stage }) => {
  const leftDisable = stage.index === 1;
  const rightDisable = stage.index === course.stages.length;

  return (
    <div
      className={classnames(className, 'row', 'flex-xl-nowrap')}
      style={{ height: '50px', backgroundColor: '#343A40' }}
    >
      <div className="col-4">
        <button className="btn btn-primary-outline btn-menu" type="button">
          <span className="menu-icon">
            <FontAwesomeIcon icon="bars" />
          </span>
          <span className="course-title">{stage.index}. {stage.title}</span>
        </button>
      </div>
      <div className="col-4 level-nav">
        <button className="btn float-left " disabled={leftDisable}>
          Back
        </button>
        <span className="level-text">
          {stage.index}/{course.stages.length}
        </span>
        <button className="btn float-right " disabled={rightDisable}>
          Next
        </button>
      </div>
    </div>
  );
};

const StyleCourseFooter = styled(SiswaCourseFooter)`
  .btn-menu {
    color: #ebebeb;
    height: 100%;
  }
  .course-title {
    margin-left: 10px;
  }
  .level-nav {
    color: #ebebeb;
    text-align: center;
    height: 50px;
  }
  .level-nav .btn {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .level-text {
    line-height: 50px;
    width: 100px;
  }
`;

export default StyleCourseFooter;
