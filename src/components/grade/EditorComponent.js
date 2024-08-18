import React, { useEffect, useState } from 'react'
import MonacoEditor, { useMonaco } from '@monaco-editor/react';
import { Host, RootUrl } from '../../api/RootUrl';

const rootURL = RootUrl();

const EditorComponent = (props) => {

    const [code, setCode] = useState(`
import java.util.Scanner;

public class Main {
	public static void main(String[] args) {
		
		Scanner sc = new Scanner(System.in);
		
		int a = sc.nextInt();
		int b = sc.nextInt();
		
		System.out.println(a+b);
	}

}
`);

    useEffect(() => {
        console.log(props.language.toLowerCase())
        console.log(props.userno)
        const checkCode = props.questionInfo.hasOwnProperty('code');
        if (checkCode) {
            setCode(props.questionInfo.code)
            const resetInfo = {
                ...props.questionInfo
            }
            delete resetInfo['code']
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
            <button className='hvLgBtn maR10' onClick={handleExecute}>Execute</button>
        </>
    )
}

export default EditorComponent