import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import MonacoEditor from 'react-monaco-editor';

const EditorComponent = (questionInfo) => {
    
    const [code, setCode] = useState('');

    useEffect(() => {
        console.log(questionInfo.language.toLowerCase())

    }, [questionInfo])

    const handleExecute = async () => {
        const response = await fetch('http://localhost:8080/fifo-back/question/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                questionNo: questionInfo.questionNo,
                language: questionInfo.language.toLowerCase(),
                code: code
            })
        });
        const result = await response.json();
        console.log(result)
    };

    return (
        <>
        <MonacoEditor
            height="600"
            language={questionInfo.language.toLowerCase()}
            theme="vs"
            options={{
                fontSize: 20,
                minimap: { enabled: false },
                scrollbar: {
                    vertical: 'auto',
                    horizontal: 'auto'
                }
            }}
            value={code}
            onChange={(newValue) => setCode(newValue)}
        />
        <button onClick={handleExecute}>Execute</button>
        </>
    )
}

export default EditorComponent