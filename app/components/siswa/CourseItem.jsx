import React from 'react';
import { Link } from 'react-router-dom'

const CourseItem  = ({item}) => {
  return(
    <div className="card" style={{'width': '18rem'}}>
      {/*<img className="card-img-top" src=".../100px180/" alt="Card image cap" />*/}
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.desc}</p>
        <Link className="btn btn-primary" to={`/course/${item._id}`}>   <a href="#" >Start</a></Link>
      </div>
    </div>
  )}


export default CourseItem;