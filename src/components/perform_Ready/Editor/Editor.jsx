import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Editor.css';

const Editor = () => {
    return (
        <div className="edit">
            <CKEditor
                editor={ClassicEditor}
                config={{
                    ckfinder: {
                        uploadUrl: 'https://ckeditor.com/docs/ckeditor5/latest/examples/file-upload.html', // 테스트용 URL
                        options: {
                            resourceType: 'Images'
                        }
                    },
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






