import React from 'react';
import { Link } from 'react-router-dom'
import { BASE_URL } from "../../config/config";
import styled from "styled-components";
import classnames from "classnames";

const CourseItem  = ({className,item}) => {
  return(
    <Link className={classnames(className,'m-2')} to={`/course/${item._id}`}>
    <div className="card" >
      <img className="card-img-top" src={`${BASE_URL}uploads/${item.imageid}`} />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.desc}</p>
      </div>
    </div>
    </Link>
  )}

const StyledCourseItem = styled(CourseItem)`
  .card {
    width:200px;
    border-radius:10px !important;
    text-align:center;
    border: 0;
    
    
  }
  h5{
    font-style:bold;
    font-size:18px;
    font-family:sans-serif;
  }
  a {
    
  }
  img {
    display: block;
  width: 70%;
  margin-left:auto;
  margin-right:auto;
  margin-top:20px;
  height: auto;
  }
`
export default StyledCourseItem;