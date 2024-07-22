import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/grade.scss'
import EditorComponent from '../../components/grade/EditorComponent'
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios'

const QuestionViewPage = () => {

    const questionNo = useRef(parseInt(new URLSearchParams(window.location.search).get("no")));
    const [language, setLanguage] = useState('');
    const [questionInfo, setQuestionInfo] = useState({});
    const [output, setOutput] = useState('출력');
    const [navigator, setNavigator] = useState('info');

    /** 선택 언어 문제 리스트 조회 */
    useEffect(() => {
        axios.get(`http://localhost:8080/fifo-back/question/${questionNo.current}`)
            .then((res) => {
                console.log(res.data)
                setQuestionInfo(res.data)
                setLanguage(res.data.languagename)
            })
    }, [])

    useEffect(() => {

    }, [navigator])

    const navHandle = (e) => {
        console.log(e)
        setNavigator(e.target.id)
    }

    return (
        <MainLayout>



            <div id='questionView'>
                <nav className="navbar">
                    <ul className="navbar-links">
                        <li
                            className={navigator === 'info' ? 'clicked' : null}
                            id={'info'}
                            onClick={navHandle}
                        >
                            {questionInfo.questionno}번
                        </li>
                        <li
                            className={navigator === 'code' ? 'clicked' : null}
                            id={'code'}
                            onClick={navHandle}
                        >
                            문제풀기
                        </li>
                        <li
                            className={navigator === 'record' ? 'clicked' : null}
                            id={'info'}
                            onClick={navHandle}
                        >
                            풀이기록
                        </li>
                        <li
                            className={navigator === 'another' ? 'clicked' : null}
                            id={'info'}
                            onClick={navHandle}
                        >
                            다른풀이보기
                        </li>
                    </ul>
                </nav>

                {navigator === 'info' &&
                    <div id='questionInfo'>
                        <h2>{questionInfo.title}</h2>
                        <h3>문제</h3>
                        <p>{questionInfo.explanation}</p>
                        <h3>입력</h3>
                        <p>{questionInfo.input}</p>
                        <h3>출력</h3>
                        <p>{questionInfo.output}</p>
                        <h3>입력 예제</h3>
                        <p>{questionInfo.output}</p>
                        <h3>출력 예제</h3>
                        <p>{questionInfo.output}</p>
                    </div>}
                {navigator === 'code' && <EditorComponent language={language} questionNo={questionInfo.questionno}/>}
            </div>
        </MainLayout>
    )
}

export default QuestionViewPage