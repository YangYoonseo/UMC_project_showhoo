//Pop_Image.jsx
/* image panel 등록 로직에 대한 이해 매우 부족 ==> 겨우 구현해놓은 상태 건들면 안됨.. */
import React, { useState } from 'react';
import '../../styles/VenueRegisterPage_Introduce/Pop_Image.css';
import image_register_panel1 from '../../assets/images/venueregisterpage_introduce/image_register_panel1.svg';
import image_register_panel2 from '../../assets/images/venueregisterpage_introduce/image_register_panel2.svg';

const Pop_Image = ({ isOpen, onClose, onConfirm }) => {
  const [images, setImages] = useState(Array(6).fill(null));

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...images];
        newImages[index] = e.target.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDrop = (index, event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...images];
        newImages[index] = e.target.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    onConfirm(images);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay3">
      <div className="modal-container3">
        <h2>사진 등록하기</h2>
        <p className='p'>사진은 최소 6개 등록해주세요</p>
        
        <div className="image-grid3">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="image-panel33" 
              onDrop={(event) => handleImageDrop(index, event)}
              onDragOver={(event) => event.preventDefault()}
            >
              {image ? (
                <img src={image} alt={`Uploaded ${index + 1}`} />
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageUpload(index, event)}
                    style={{ display: 'none' }}
                    id={`image-upload-${index}`}
                  />
                  <label htmlFor={`image-upload-${index}`} className="upload-label">
                    {index === 0 ? (
                      <>
                        <img src={image_register_panel1} alt="Upload" />
                      </>
                    ) : (
                      <img src={image_register_panel2} alt="Upload" />
                    )}
                  </label>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>뒤로 가기</button>
          <button className="confirm-button" onClick={handleConfirm}>등록</button>
        </div>
      </div>
    </div>
  );
};

export default Pop_Image;
