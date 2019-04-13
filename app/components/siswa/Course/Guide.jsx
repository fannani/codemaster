import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw, EditorState } from 'draft-js';
import ReactHtmlParser from 'react-html-parser';

const SiswaCourseGuide = ({
  mission,
  result,
  className,
  title,
  teory,
  show = true,
  onClick,
}) => {
  const editorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(teory)),
  );
  const generatedTeory = stateToHTML(editorState.getCurrentContent());
  const missionList = mission.map((misi, index) => {
    let active = false;
    if (typeof result[index] !== 'undefined') {
      active = !!result[index].result;
    }
    const missionClass = classNames({
      'mission-list': true,
      'list-group-item': true,
      active,
    });
    return (
      <li key={index} className={missionClass}>
        {misi.quest}
      </li>
    );
  });

  return (
    <div
      onClick={onClick}
      id="guide"
      className={classNames(className, !show ? 'col-sm-1' : 'col-sm-4')}
      style={{ overflowY: 'scroll', height: 'calc(100vh - 100px)' }}
    >
      {show ? (
        <>
          <div className="row" id="teory">
            <div className=" col-sm-12">
              <h3>{title}</h3>
              {ReactHtmlParser(generatedTeory)}
            </div>
          </div>

          <div className="row" id="mission">
            <div className="title col-sm-12">
              <h3>Misi</h3>
            </div>
          </div>
          <div className="row">
            <ul className="list-group col-sm" style={{ paddingRight: '0px' }}>
              {missionList}
            </ul>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

SiswaCourseGuide.propTypes = {
  mission: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  teory: PropTypes.string.isRequired,
};

const StyledGuide = styled(SiswaCourseGuide)`
  background-color: white;
  #teory {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  #mission {
    padding-top: 20px;
  }
  #mission .title {
    background-color: #ebebeb;
  }
  #mission .title h3 {
    margin-top: 5px;
    font-size: 20px;
    margin-bottom: 0px;
  }
  .separator {
    background-color: #343a40;
    height: 10px;
  }
  .list-group-item {
    border-radius: 0px;
  }
  .list-group-item:first-child {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .list-group-item.active {
    background-color: #07bc0c;
    border-color: #07bc0c;
  }
`;

export default StyledGuide;
