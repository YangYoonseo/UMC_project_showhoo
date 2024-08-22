import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Editor.css';

const Editor = ({ onContentChange, setImgData }) => {

    const handleImageUpload = (loader) => {
        return new Promise((resolve, reject) => {
            loader.file.then((file) => {
                // 이미지 파일을 부모 컴포넌트로 전달
                setImgData(file);

                // FileReader는 미리보기용 Base64 인코딩 이미지를 생성하는데 사용될 수 있음
                const reader = new FileReader();
                reader.onload = () => {
                    // 여기서 reader.result는 Base64 인코딩된 이미지 URL입니다.
                    const imageUrl = reader.result;

                    // 에디터에 이미지를 미리보기로 표시
                    resolve({ default: imageUrl });
                };
                reader.onerror = (error) => {
                    reject(error);
                };
                reader.readAsDataURL(file); // 파일을 Base64 URL로 읽음
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
                }}
            />
        </div>
    );
};

export default Editor;