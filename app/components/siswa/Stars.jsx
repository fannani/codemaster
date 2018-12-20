import React from 'react';
import star from "../../assets/images/star.png";
import styled from "styled-components";

const Star = styled.img`
  margin-left:5px;
`

const Stars = ({className,value}) => {
  let starImg = [];
  for (let i = 0; i < value; i++) {
    starImg.push(<Star width="50px" key={i} src={star} />);
  }

  return (
    <div className={className}>
      {starImg}
    </div>
  )
}


export default Stars;