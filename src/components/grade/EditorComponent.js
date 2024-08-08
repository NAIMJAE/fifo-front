import React, { useEffect, useState } from 'react'
import MonacoEditor from 'react-monaco-editor';

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
        if(checkCode){
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

        props.socketObj.current = new WebSocket('ws://localhost:8080/fifo-back/question');
        props.socketObj.current.onopen = () => {
            console.log("aa");
            const sendMessage = JSON.stringify({
                questionNo: props.questionInfo.questionNo,
                userno: props.userno,
                language: props.language.toLowerCase(),
                code: code
            })
            props.socketObj.current.send(sendMessage)
        }

        /*
        const response = await fetch('http://localhost:8080/fifo-back/question/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                questionNo: props.questionInfo.questionNo,
                language: questionInfo.language.toLowerCase(),
                code: code
            })
        });
        const result = await response.json();
        console.log(result)
        */
        props.navigator("record")

    };

    return (
        <>
            <MonacoEditor
                height="600"
                language={props.language.toLowerCase()}
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