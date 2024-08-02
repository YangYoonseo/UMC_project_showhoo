import React, { useRef, useState, useEffect } from 'react';
import '../../styles/editableDiv.css';
import Bold from '../../assets/img_Ready/Bold.svg';
import Picture from '../../assets/img_Ready/Picture.svg';
import Palette from '../../assets/img_Ready/Palette.svg';
import textSize from '../../assets/img_Ready/textSize.svg';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';

const EditableDiv = () => {
  const contentRef = useRef(null);
  const [isBold, setIsBold] = useState(false);
  const [color, setColor] = useState('#000');
  const [fontSize, setFontSize] = useState(16);
  const [imageSrc, setImageSrc] = useState(null);
  const [showSizeSelector, setShowSizeSelector] = useState(false);

  const toggleBold = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      document.execCommand('bold');
      setIsBold(!isBold); // 상태를 반영
    }
  };

  const handlePictureClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageSrc(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const handlePaletteClick = () => {
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = color;
    colorInput.oninput = (e) => {
      setColor(e.target.value);
      document.execCommand('foreColor', false, e.target.value);
    };
    colorInput.click();
  };

  const handleTextSizeChange = (e) => {
    const size = e.target.value;
    setFontSize(size);
    document.execCommand('fontSize', false, '7');
    const fontElements = document.getElementsByTagName('font');
    for (let i = 0; i < fontElements.length; i++) {
      if (fontElements[i].size === '7') {
        fontElements[i].removeAttribute('size');
        fontElements[i].style.fontSize = `${size}px`;
      }
    }
    setShowSizeSelector(false); // 선택 박스 숨기기
  };

  const handleSizeSelectorClick = () => {
    setShowSizeSelector(!showSizeSelector);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && document.activeElement === contentRef.current) {
      const selection = window.getSelection();
      if (selection && selection.focusNode) {
        const node = selection.focusNode;
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'IMG') {
          node.remove();
          e.preventDefault();
        }
      }
    }
  };

  useEffect(() => {
    const editableContent = contentRef.current;
    if (editableContent) {
      editableContent.addEventListener('drop', handleDrop);
      editableContent.addEventListener('dragover', handleDragOver);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        editableContent.removeEventListener('drop', handleDrop);
        editableContent.removeEventListener('dragover', handleDragOver);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);

  return (
    <div className="editableDiv">
      <div className="edit_bar">
        <img
          className={`Bold Bold_${isBold ? 'active' : ''}`}
          src={Bold}
          alt="Bold"
          onClick={toggleBold}
        />
        <img
          className="Picture"
          src={Picture}
          alt="Picture"
          onClick={handlePictureClick}
        />
        <img
          className="Palette"
          src={Palette}
          alt="Palette"
          onClick={handlePaletteClick}
        />
        <div className="textSize">
          <img
            src={textSize}
            alt="textSize"
            onClick={handleSizeSelectorClick}
          />
          {showSizeSelector && (
            <select
              value={fontSize}
              onChange={handleTextSizeChange}
            >
              <option value={12}>작게</option>
              <option value={16}>중간</option>
              <option value={20}>크게</option>
            </select>
          )}
        </div>
      </div>
      <div
        className="edit_content"
        contentEditable
        ref={contentRef}
        style={{ fontWeight: isBold ? 'bold' : 'normal', color: color, fontSize: `${fontSize}px` }}
      >
        이 텍스트를 편집할 수 있습니다. 이미지를 추가하려면 위의 이미지 아이콘을 클릭하세요.
        {imageSrc && (
          <Draggable>
            <ResizableBox
              width={100}
              height={100}
              minConstraints={[50, 50]}
              maxConstraints={[500, 500]}
              onResizeStop={(e, data) => {
                // 이미지 크기 조절 후 처리
              }}
            >
              <img src={imageSrc} alt="User uploaded" className="draggableImage" />
            </ResizableBox>
          </Draggable>
        )}
      </div>
    </div>
  );
};

export default EditableDiv;


