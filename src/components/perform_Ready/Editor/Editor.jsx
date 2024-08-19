import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Editor.css';

const Editor = ({ onContentChange, setImgData }) => {
    const handleImageUpload = (loader) => {
        return new Promise((resolve, reject) => {
            loader.file.then((file) => {
                // FormData에 이미지 파일 추가
                setImgData((prevImgData) => {
                    prevImgData.append("img", file); // 'image'는 서버에서 기대하는 필드 이름
                    return prevImgData;
                });

                // 이미지를 에디터에 미리보기로 표시하기 위한 처리
                const reader = new FileReader();
                reader.onload = () => {
                    resolve({ default: reader.result });
                };
                reader.onerror = (error) => {
                    reject(error);
                };
                reader.readAsDataURL(file);
            });
        });
    };

    function MyCustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return {
                upload: () => handleImageUpload(loader),
                abort: () => {
                    console.log("Upload aborted");
                }
            };
        };
    }

    return (
        <div className="edit">
            <CKEditor
                editor={ClassicEditor}
                config={{
                    extraPlugins: [MyCustomUploadAdapterPlugin],
                    toolbar: [
                        'heading', '|',
                        'bold', 'italic', 'link', '|',
                        'bulletedList', 'numberedList', '|',
                        'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed', '|',
                        'undo', 'redo'
                    ],
                    image: {
                        toolbar: ['toggleImageCaption', 'imageTextAlternative']
                    }
                }}
                data="<p>내용을 입력하세요...</p>"
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onContentChange(data);
                    console.log({ data });
                }}
                onBlur={(event, editor) => {
                    console.log('Blur event', editor.getData());
                }}
                onFocus={(event, editor) => {
                    console.log('Focus event', editor.getData());
                }}
            />
        </div>
    );
};

export default Editor;






