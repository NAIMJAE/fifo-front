import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/grade.scss'
import '../../components/grade/LanguageButtonComponent'
import QuestionContentsComponent from '../../components/grade/QuestionContentsComponent'
import axios from 'axios'

const QuestionListPage = () => {

    const language = useRef(new URLSearchParams(window.location.search).get("language"));
    const [questionList, setQuestionList] = useState([]);

    /** 선택 언어 문제 리스트 조회 */
    useEffect(() => {
        axios.get(`http://localhost:8080/fifo-back/question/list/${language.current}`)
            .then((res) => {
                console.log(res.data)
                setQuestionList(res.data)
            })
    }, [])

    return (
        <MainLayout>
            <p id='languageTitle'>{language.current}</p>
            
            <div id='questionList'>
                {questionList.map((question, index) => {
                    return (
                        <QuestionContentsComponent key={index} question={question} />
                    )
                })}
            </div>
        </MainLayout>
    )
}

export default QuestionListPage