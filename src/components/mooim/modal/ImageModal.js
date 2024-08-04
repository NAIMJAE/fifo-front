import React, { useState } from 'react'

const ImageModal = ({ zoomImgUrl, zoomModal }) => {

    const [scale, setScale] = useState(1);

    const handleScaleChange = (e) => {
        setScale(e.target.value);
    };

  return (
    <div className='ImageModalBox' onClick={zoomModal}>
        <div className='ImageModal'>
            <img
                src={zoomImgUrl}
                alt=""
                style={{ transform: `scale(${scale})` }}
                onClick={(e) => e.stopPropagation()}
            />
            <div className='SliderContainer' onClick={(e) => e.stopPropagation()}>
                <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.1"
                    value={scale}
                    onChange={handleScaleChange}
                />
            </div>
        </div>
    </div>
  )
}

export default ImageModal