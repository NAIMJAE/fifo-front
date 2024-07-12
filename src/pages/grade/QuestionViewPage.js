import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/grade.scss'
import '../../components/grade/LanguageButtonComponent'
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios'

const QuestionViewPage = () => {

    const questionNo = useRef(parseInt(new URLSearchParams(window.location.search).get("no")));
    const [language, setLanguage] = useState('');
    const [code, setCode] = useState('');
    const [questionInfo, setQuestionInfo] = useState({});
    const [output, setOutput] = useState('출력');

    const handleExecute = async () => {
        setOutput("")
        const response = await fetch('http://localhost:8080/fifo-back/question/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                questionNo: questionInfo.questionno,
                language: language,
                code: code
            })
        });
        const result = await response.json();
        setOutput(result.output);
        console.log(result)
    };

    /** 선택 언어 문제 리스트 조회 */
    useEffect(() => {
        axios.get(`http://localhost:8080/fifo-back/question/${questionNo.current}`)
            .then((res) => {
                console.log(res.data)
                setQuestionInfo(res.data)
                setLanguage('java')
            })
    }, [])

    return (
        <MainLayout>
            <div id='questionInfo'>
                <h2>{questionInfo.questionno} {questionInfo.title}</h2>
            </div>

            <div id='questionView'>
                <MonacoEditor
                    height="400"
                    language={language}
                    theme="vs-dark"
                    value={code}
                    onChange={(newValue) => setCode(newValue)}
                />
                <button onClick={handleExecute}>Execute</button>
                <div>
                    {output}
                </div>
            </div>
        </MainLayout>
    )
}

export default QuestionViewPage