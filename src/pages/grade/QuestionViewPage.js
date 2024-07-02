import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/grade.scss'
import '../../components/grade/LanguageButtonComponent'
import QuestionContentsComponent from '../../components/grade/QuestionContentsComponent'
import axios from 'axios'

const QuestionViewPage = () => {
    
    const questionNo = useRef(new URLSearchParams(window.location.search).get("no"));

    /** 선택 언어 문제 리스트 조회 */
    useEffect(() => {
        axios.get(`http://localhost:8080/fifo-back/question/${questionNo.current}`)
        .then((res) => {
            console.log(res.data)
            
        })
    }, [])

    return (
        <MainLayout>
            
            <div id='questionView'>

            </div>
        </MainLayout>
    )
}

export default QuestionViewPage