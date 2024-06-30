import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/grade.scss'
import '../../components/grade/LanguageButtonComponent'
import LanguageButtonComponent from '../../components/grade/LanguageButtonComponent'
import axios from 'axios'

const QuestionListPage = () => {

    const [language, setLanguages] = useState(new URLSearchParams(window.location.search).get("language"));
    const [questionList, setQuestionList] = useState([]);

    /** 선택 언어 문제 리스트 조회 */
    useEffect(()=>{
        axios.get('http://localhost:8080/fifo-back' + '/question/list/'+language)
        .then((res)=>{
            console.log(res.data)
            setQuestionList(res.data)
        })
    },[language])

    return (
        <MainLayout>
            <p>{language}</p>
            {questionList.map((question)=>{
                return(
                    <div id='questionList' key={question.questionno}>
                    <p>{question.title}</p>
                </div>
                )
            })}
        </MainLayout>
    )
}

export default QuestionListPage