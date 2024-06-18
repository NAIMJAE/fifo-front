import React from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/grade.scss'
import '../../components/grade/LanguageButtonComponent'
import LanguageButtonComponent from '../../components/grade/LanguageButtonComponent'

const QuestionListPage = () => {

    let getParameter = (key) => {
        return new URLSearchParams(window.location.search).get(key);
    };

    return (
        <MainLayout>
            <p>{getParameter("language")}</p>
        </MainLayout>
    )
}

export default QuestionListPage