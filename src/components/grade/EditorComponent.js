import React, { useEffect, useState } from 'react'
import MonacoEditor, { useMonaco } from '@monaco-editor/react';
import { Host, RootUrl } from '../../api/RootUrl';

const rootURL = RootUrl();

const EditorComponent = (props) => {

    const [isWriter, setIsWriter] = useState(true);
    const [code, setCode] = useState(`

public class Main {
	public static void main(String[] args) {
		
	}
}
`);

    useEffect(() => {
        console.log(props.language.toLowerCase())
        console.log(props.userno)
        const checkCode = props.questionInfo.hasOwnProperty('code');
        const checkWriter = props.questionInfo.hasOwnProperty('writer');

        if (checkCode) {
            setCode(props.questionInfo.code)
            const resetInfo = {
                ...props.questionInfo
            }
            delete resetInfo['code']
            console.log(resetInfo)
            props.setQuestionInfo(resetInfo)
        }

        if (checkWriter) {
            console.log(props.questionInfo)
            if(props.userno != props.questionInfo.writer){
                setIsWriter(false)
            }
            const resetInfo = {
                ...props.questionInfo
            }
            delete resetInfo['writer']
            console.log(resetInfo)
            props.setQuestionInfo(resetInfo)
        }

    }, [props])

    const handleExecute = async () => {

        props.socketObj.current = new WebSocket(`ws://${Host}:8080/fifo-back/question`);
        props.socketObj.current.onopen = () => {
            console.log("aa");
            const sendMessage = JSON.stringify({
                questionNo: props.questionInfo.questionno,
                userno: props.userno,
                language: props.language.toLowerCase(),
                level: props.questionInfo.level,
                code: code
            })
            props.socketObj.current.send(sendMessage)
        }
        props.navigator("record")
    };

    return (
        <>
            <div className='editor'>
                <MonacoEditor
                    height="100%"
                    language={props.language.toLowerCase()}
                    theme="vs"
                    options={{
                        fontSize: 18,
                        minimap: { enabled: false },
                        scrollbar: {
                            vertical: 'auto',
                            horizontal: 'auto'
                        }
                    }}
                    value={code}
                    onChange={(newValue) => setCode(newValue)}
                />

            </div>
            {isWriter && <button className='hvLgBtn maR10' onClick={handleExecute}>제출하기</button>}
        </>
    )
}

export default EditorComponent