import React from 'react';

/** 파일 input 태그 (파일종류, onChange 함수) */
const HiddenInputFile = ({ accept, onChange }) => (
    <input
        type="file"
        accept={accept}
        onChange={onChange}
        style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            margin: '-1px',
            padding: 0,
            overflow: 'hidden',
            border: 0,
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            clipPath: 'inset(100%)'
        }}
    />
);

export default HiddenInputFile;
