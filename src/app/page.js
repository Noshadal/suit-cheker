'use client';
import Image from "next/image";
import suit from "./suit (1).png";
import suit1 from "./suit (2).png";
import suit2 from "./suit (3).png";
import suit3 from "./suit (4).png";
import suit4 from "./suit (5).png";
import suit5 from "./suit (6).png";
import suit6 from "./suit (7).png";
import suit7 from "./suit (8).png";
import suit8 from "./suit (9).png";
import up from "./14426.png";
import { useState, useRef } from "react";

const images = [
  suit,
  suit1,
  suit2,
  suit3,
  suit4,
  suit5,
  suit6,
  suit7,
  suit8,
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [face, setFace] = useState(null); 
  const [dragging, setDragging] = useState(false); 
  const [position, setPosition] = useState({ x: 0, y: 0 }); 
  const [scale, setScale] = useState(1); 
  const imgRef = useRef(null); 

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFace(reader.result); 
        setPosition({ x: 0, y: 0 }); 
      };
      reader.readAsDataURL(file); 
    }
  };

  // Handle mouse down event
  const handleMouseDown = (event) => {
    setDragging(true);
    imgRef.current.startX = event.clientX - position.x; 
    imgRef.current.startY = event.clientY - position.y; 
  };

  const handleMouseMove = (event) => {
    if (dragging) {
      setPosition({
        x: event.clientX - imgRef.current.startX,
        y: event.clientY - imgRef.current.startY,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  // Scale up and down functions
  const scaleUp = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  const scaleDown = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.1)); // Prevent scaling below 0.1
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col h-[90vh] bg-gray-400">  
        <input type="file" accept="image/* "id="submit" className="hidden" onChange={handleFileChange} />
     
      <div
        className="flex justify-center items-center h-[90vh] gap-9 relative"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves the area
      >
        {face && (
          <Image
          ref={imgRef}
          src={face}
          height={350 * scale} 
            width={250 * scale} 
            alt="Profile"
            className="mg"
            style={{ position: 'absolute', left: position.x, top: position.y }}
            onMouseDown={handleMouseDown}
            />
          )}
        <button onClick={previousImage} className= "text-[7vh] font-semibold">Back</button>
        <Image
          src={images[currentIndex]}
          height={350}
          width={250}
          alt="Suit"
        />
        <button onClick={nextImage} className="text-[7vh] font-semibold">Next</button>
      </div>
          <label for="submit"><Image src= {up} width={50} height={80} className="bg-slate-50"/></label>
          </div>
      <div className="flex justify-center p-3 bg-gray-800">
        <button onClick={scaleDown} className="text-white bg-red-600 px-4 py-2">Scale Down</button>
        <button onClick={scaleUp} className="text-white bg-green-600 px-4 py-2 ml-2">Scale Up</button>
      </div>
    </>
  );
}
