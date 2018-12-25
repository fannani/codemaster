import React from 'react';
import { Link } from "react-router-dom";
import { BASE_URL } from "../../config/config";
import styled from "styled-components";


const StageItem = ({className,stage}) => {
  return (
    <Link className={className} to={`/play/${stage._id}`} >
      <div className="d-flex flex-wrap stageitem">
      <div className="circle" >

      </div>
      <h4>{stage.title}</h4>
      </div>
    </Link>
  )
}

const StyledStageItem = styled(StageItem)`
.stageitem {
  height:100px;
  margin-top:20px;
}
h4{
 height:100%;
    display: inline-block;
    line-height: 100px;
    margin-left:20px;

}
  .circle {
 margin-left:100px;
    background-color:white;
    width:100px;
    height:100px;
    border: 6px  solid #DDDDDD;
    
    border-radius:100px;
  }
`

export default StyledStageItem;