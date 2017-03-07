import React from 'react';


const Qr = (props) => (
  <svg className="qr" xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 32 32" aria-labelledby="title">
    <path d={props.qr_svg}/>
  </svg>
) 

export default Qr;