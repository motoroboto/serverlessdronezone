import React from "react";
import { Carousel } from "react-responsive-carousel";

export default () => (
  <Carousel autoPlay>
    <div>
      <img 
      	alt="testimage"
		src="/testimage.png"
		/>
      <p className="legend">Test Image</p>
    </div>
    <div>
      <img 
      	alt="testimage2"
		src="/testimage2.jpg"
		/>
      <p className="legend">Test Image</p>
    </div>
    <div>
      <img 
      	alt="testimage3"
		src="/testimage3.jpg"
		/>
      <p className="legend">Test Image</p>
    </div>
    <div>
      <img 
      	alt="testimage4"
		src="/testimage4.png"
		/>
      <p className="legend">Test Image</p>
    </div>
    <div>
      <img 
      	alt="testimage5"
		src="/testimage5.jpg"
		/>
      <p className="legend">Test Image</p>
    </div>
    <div>
      <img 
      	alt="testimage6"
		src="/testimage6.jpg"
		/>
      <p className="legend">Test Image</p>
    </div>
  </Carousel>
);