import React, { useEffect, useState } from 'react'
import MonacoEditor from 'react-monaco-editor';

const EditorComponent = (questionInfo) => {

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
        console.log(questionInfo.language.toLowerCase())
        console.log(questionInfo.userno)
    }, [questionInfo])

    const handleExecute = async () => {

        questionInfo.socketObj.current = new WebSocket('ws://localhost:8080/fifo-back/question');
        questionInfo.socketObj.current.onopen = () => {
            console.log("aa");
            const sendMessage = JSON.stringify({
                questionNo: questionInfo.questionNo,
                userno: questionInfo.userno,
                language: questionInfo.language.toLowerCase(),
                code: code
            })
            questionInfo.socketObj.current.send(sendMessage)
        }

        /*
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
        */
        questionInfo.navigator("record")

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